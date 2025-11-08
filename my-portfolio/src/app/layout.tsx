// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; // Import the provider
import { Analytics } from "@vercel/analytics/next";
import BackgroundWrapper from "@/components/BackgroundWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aditya",
  description: "Always learning, always building.",
  icons:{
    icon:"/Logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black`}>
        {/* Enhanced Background */}
        <div className="fixed inset-0 z-[-1] bg-black dotted-background">
          <div
            className="absolute inset-0 z-[-1]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(120, 119, 198, 0.1), transparent 70%)",
            }}
          />
          <div
            className="absolute top-0 left-0 w-full h-full z-[-1]"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.1), transparent 70%)",
            }}
          />
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundWrapper>
            {children}
            <Analytics />
          </BackgroundWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}