import React from "react";

// Structured professional experience entries
const experiences = [
  {
    company: "Stealth Startup",
    role: "Backend Engineer",
    date: "Sep 2025 - Present",
    location: "Remote",
    description: [
      "Building and maintaining scalable server-side services for the core platform.",
      "Collaborating across product + frontend to refine API contracts and performance.",
    ],
  },
  // Future roles or internships can be appended here following the same shape.
];

export const WorkExperience = () => {
  return (
    <section className="space-y-8">
      {experiences.map((exp) => (
        <div key={exp.company} className="flex gap-4">
          {/* Optional company logo */}
          {/* <Image src={exp.logo} alt={`${exp.company} logo`} width={40} height={40} className="rounded-full h-10 w-10 mt-1" /> */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-white">{exp.company}</h3>
                <p className="text-sm text-white/70">{exp.role}</p>
              </div>
              <p className="text-xs text-white/50 text-right">
                {exp.date}
                <br />
                {exp.location}
              </p>
            </div>
            <ul className="mt-2 list-disc list-outside pl-4 space-y-1 text-sm text-white/60">
              {exp.description.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default WorkExperience;
