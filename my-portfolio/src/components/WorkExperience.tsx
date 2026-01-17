import React from "react";
import Image from "next/image";

// Structured professional experience entries
const experiences = [
  {
    logo: "/stealth.webp",
    company: "Stealth Startup",
    role: "Backend Engineer",
    date: "Oct 2025 - Jan 2026",
    location: "Remote",
   description: [
  "Worked on backend services for a production platform, contributing to APIs, data flows, and system reliability.",
  "Gained hands-on experience with CI/CD pipelines, Docker, and AWS (ECS, S3, ECR) in a fast-paced startup environment.",
  "Collaborated cross-functionally while learning real-world trade-offs between rapid iteration and maintainable system design.",
],

  },
];


export const WorkExperience = () => {
  return (
    <section className="space-y-8">
      {experiences.map((exp) => (
        <div key={exp.company} className="flex gap-4">
          <Image src={exp.logo} alt={`${exp.company} logo`} width={40} height={40} className="rounded-full h-10 w-10 mt-1" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-foreground">{exp.company}</h3>
                <p className="text-sm text-foreground/70">{exp.role}</p>
              </div>
              <p className="text-xs text-foreground/50 text-right">
                {exp.date}
                <br />
                {exp.location}
              </p>
            </div>
            <ul className="mt-2 list-disc list-outside pl-4 space-y-1 text-sm text-foreground/60">
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
