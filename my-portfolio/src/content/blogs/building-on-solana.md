# Building on Solana: Lessons from the Mainnet

**Published:** November 8, 2025
**Tags:** Web3, Solana, Blockchain, Development

---

## Introduction

Six months ago, I shipped my first decentralized application to Solana's mainnet. Not a testnet experiment, not a hackathon demo—a real dApp handling real transactions on a live blockchain. The experience was humbling, exhilarating, and full of lessons that no tutorial could have taught me. This is the story of what I learned when theory met reality.

## Why Solana?

When most people think blockchain, they think Ethereum. And for good reason—it's battle-tested, well-documented, and has a massive ecosystem. But I chose Solana for three compelling reasons:

### 1. **Speed That Actually Matters**

Solana's theoretical 65,000 TPS isn't just a marketing number. When you're building a real-time application where users expect instant feedback, sub-second finality changes everything. The difference between a 15-second Ethereum transaction and a 400ms Solana transaction isn't just technical—it's experiential.

```rust
// Solana transaction confirmation feels instant
let signature = send_transaction(&transaction).await?;
let confirmation = connection
    .confirm_transaction(&signature)
    .await?;
// Typically confirms in 400-800ms
```

### 2. **Cost Economics**

Transaction fees on Solana average $0.00025. Not $25. Not $2.50. Twenty-five hundredths of a cent. This fundamentally changes what you can build. Microtransactions become viable. User onboarding doesn't require explaining gas fees. You can actually build products for normal people.

### 3. **The Rust Factor**

Solana programs are written in Rust. While this has a steeper learning curve than Solidity, Rust's compiler is like having a paranoid security expert review your code. If it compiles, you've already avoided entire classes of bugs that plague smart contracts.

## The Reality Check: What Nobody Tells You

### Transaction Optimization Is Everything

My first dApp worked perfectly on devnet. Then I deployed to mainnet, and reality hit:

**The Problem:** Each transaction was failing with "Transaction too large" errors.

**The Cause:** I was naively serializing entire structs, including unused fields and redundant data.

**The Solution:** Aggressive data optimization.

```rust
// Before: 1,232 bytes per transaction (TOO LARGE)
#[derive(BorshSerialize, BorshDeserialize)]
pub struct UserProfile {
    pub user: Pubkey,
    pub username: String,        // 32 bytes, mostly wasted
    pub created_at: i64,
    pub last_updated: i64,
    pub metadata: Vec<String>,   // Variable, unpredictable
    pub stats: UserStats,        // Entire nested struct
}

// After: 184 bytes per transaction (OPTIMIZED)
#[derive(BorshSerialize, BorshDeserialize)]
pub struct UserProfile {
    pub user: Pubkey,            // 32 bytes
    pub username_hash: [u8; 8],  // 8 bytes (hash instead of string)
    pub timestamp: u32,          // 4 bytes (Unix timestamp)
    pub stats_hash: [u8; 16],    // 16 bytes (critical stats only)
}
```

**Lesson:** On Solana, every byte costs. Design your data structures like you're writing firmware for a microcontroller.

### Account Management Is Your Job

Ethereum abstracts away storage. Solana doesn't. You explicitly create, manage, and pay for every account (storage) your program needs.

```rust
// Creating a PDA (Program Derived Address)
let (pda, bump_seed) = Pubkey::find_program_address(
    &[b"user_profile", user.key.as_ref()],
    program_id,
);

// You must calculate rent exemption
let space = 1000; // bytes needed
let rent = Rent::get()?;
let lamports = rent.minimum_balance(space);

// And explicitly allocate it
invoke(
    &system_instruction::create_account(
        payer.key,
        &pda,
        lamports,
        space as u64,
        program_id,
    ),
    &[/* account_infos */],
)?;
```

**Lesson:** Budget for rent-exempt storage. A 1KB account costs ~0.00089 SOL to keep alive forever. Plan your storage architecture accordingly.

### Network Congestion Is Real

Solana's speed comes with trade-offs. During NFT drops or high-traffic events, you'll see:

- **Transaction drops:** Not all transactions make it to a block
- **Priority fees:** Sometimes necessary to get included
- **RPC rate limits:** Free endpoints throttle you fast

**My Solution:**

```typescript
// Implement robust retry logic with exponential backoff
async function sendWithRetry(
  transaction: Transaction,
  maxRetries: number = 5
): Promise<string> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      // Add recent blockhash for each attempt
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;

      // Add priority fee during congestion
      if (i > 2) {
        transaction.add(
          ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: 1000 * (i - 1), // Increase fee
          })
        );
      }

      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payer],
        { commitment: 'confirmed' }
      );

      return signature;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(1000 * Math.pow(2, i)); // Exponential backoff
    }
  }
  throw new Error('Max retries exceeded');
}
```

## User Experience Challenges

### The Wallet Onboarding Problem

Web3 UX is still primitive. Getting users to:
1. Install Phantom/Solflare
2. Fund their wallet
3. Understand transaction signing
4. Not panic at "Approve transaction"

...is harder than building the dApp itself.

**What Worked:**
- **Progressive disclosure:** Don't show wallet connect until they want to interact
- **Test mode:** Let users explore with a demo wallet before committing real SOL
- **Clear messaging:** "This transaction will cost $0.0003" is better than "0.00127 SOL"

### Mobile Is An Afterthought

Solana wallet support on mobile is inconsistent. Phantom works well, but deeplinks are flaky, and the UX of mobile dApp interaction needs work.

**Workaround:** Built a responsive web app that works on mobile browsers, but kept expectations realistic about the mobile experience.

## The Debugging Nightmare

Solana error messages are... cryptic.

```
Error: failed to send transaction: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x1
```

Translation: "Something went wrong. Good luck."

**My Debugging Stack:**

1. **Solana Explorer:** Essential. Always check your transaction hash there first.
2. **`solana logs` command:** Pipe program logs in real-time.
3. **`msg!()` macro:** Rust's `println!` for on-chain debugging.
4. **Local validator:** Test everything locally before mainnet.

```rust
// Defensive programming with detailed logs
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Starting instruction processing");
    msg!("Program ID: {:?}", program_id);

    let instruction = UserInstruction::try_from_slice(instruction_data)
        .map_err(|_| {
            msg!("Failed to deserialize instruction");
            ProgramError::InvalidInstructionData
        })?;

    msg!("Instruction type: {:?}", instruction);
    // ... rest of logic
}
```

## Cost Analysis: What Did It Actually Cost?

**Development:**
- Devnet testing: $0 (free SOL from faucet)
- Mainnet deployment: ~0.5 SOL ($50 at time of launch)
- Transaction testing: ~0.1 SOL ($10)
- **Total:** $60

**Ongoing:**
- Monthly transactions (1,000 users): ~$2.50
- Account rent: $0 (rent-exempt)
- RPC costs: $0 (using free QuickNode tier)

Compare this to Ethereum where deployment alone can cost $500-2000 depending on gas. Solana's economics make experimentation viable.

## What I'd Do Differently

### 1. Start with Anchor Framework

I went raw Rust for my first project to "learn the fundamentals." Noble, but inefficient. Anchor provides:
- Automatic account validation
- Built-in error handling
- Testing utilities
- Much cleaner code

```rust
// Raw Solana: 50 lines to validate accounts
// Anchor: 5 lines
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 1000)]
    pub user_account: Account<'info, UserProfile>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
```

### 2. Invest in Better Tooling Early

- **Metaplex Sugar:** For NFT projects, this saves weeks
- **Solana Playground:** Browser-based IDE that's actually good
- **GenesysGo Shadow Drive:** Decentralized storage that integrates seamlessly

### 3. Build with Composability in Mind

Solana's program composability (Cross-Program Invocation) is powerful but requires upfront design. I had to refactor after launch to make my program composable with others.

## The Bottom Line

Building on Solana taught me that blockchain development isn't just smart contract coding—it's:

- **Systems programming:** Optimizing for constrained resources
- **Distributed systems:** Handling eventual consistency
- **Product design:** Making complex tech feel simple
- **Economics:** Understanding tokenomics and incentives

**Was it worth it?** Absolutely. The constraints forced me to write better code. The speed enabled UX patterns impossible on other chains. The cost structure made my product viable.

**Would I recommend it?** Yes, but with eyes open. Solana is powerful but unforgiving. The documentation is improving but has gaps. The ecosystem is vibrant but still maturing.

## Resources That Actually Helped

1. **Solana Cookbook:** Practical code snippets > theoretical docs
2. **Anchor Book:** Essential if using Anchor
3. **SolDev.app:** Interactive tutorials that don't suck
4. **Program Examples:** Reading Metaplex's source code taught me more than any course
5. **Discord Communities:** Solana StackExchange is hit-or-miss; Discord is where the real help lives

## Final Thoughts

Six months in, my dApp has processed over 50,000 transactions, supports 1,000+ users, and costs less to operate than my Netflix subscription. That's the promise of Solana—not theoretical, but actual.

The future of blockchain isn't just about decentralization—it's about building things that feel as responsive as Web2 while delivering Web3's benefits. Solana gets us closer to that future than anything else I've tried.

Now go build something. Break things. Learn. Ship.

---

*Have questions about building on Solana? Find me on [Twitter](https://x.com/AdityaPat_) or check out my [GitHub](https://github.com/AdityaP700) for code examples.*
