import React from 'react';
import { X, Download, Printer, FileText, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../Icons';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const cvText = `
DHILSHAN MOHAMED (DHILSHAN MOHAMED S.E.)
Software Engineering Undergraduate (3rd Year, 2025–2028)
NSBM Green University, Sri Lanka
Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub: ${PERSONAL_INFO.github}

==================================================
SUMMARY
==================================================
Software Engineering Undergraduate seeking Software Engineering & Full-Stack Development Internship Opportunities. Passionate about building robust backend microservices with Java Spring Boot and ASP.NET Core 8, paired with high-performance React and TypeScript frontends.

==================================================
EDUCATION
==================================================
- BSc (Hons) Software Engineering (2025 - 2028)
  NSBM Green University, Homagama, Sri Lanka
  Key Modules: Enterprise Architecture, Web Development, Database Engineering, Software Design Patterns

- IT & English Dual Diploma (2023)
  IDM Eastern Campus, Sri Lanka
  Graduated with Distinction in Full-Stack Web Development Fundamentals

==================================================
TECHNICAL SKILLS
==================================================
- Languages: Java, JavaScript, TypeScript, C#, SQL, HTML5, CSS3
- Frontend: React 19, Vite, Tailwind CSS, Next.js, Bootstrap
- Backend: Spring Boot, ASP.NET Core 8, REST APIs, Microservices, JPA/Hibernate
- Databases: PostgreSQL, MySQL, SQL Server
- Tools: Git, GitHub, Postman, Docker, Figma

==================================================
KEY PROJECTS
==================================================
1. Travel to Heaven (Full-Stack Travel Platform)
   React, TypeScript, Spring Boot, PostgreSQL, JPA/Hibernate, Tailwind CSS

2. RecruitSphere AI (AI Talent Platform)
   React, TypeScript, ASP.NET Core 8, Candidate Scoring Algorithms

3. Goodreads Mobile App Redesign (UI/UX Case Study)
   Figma, HCI Research, Voice Search, Prototyping

4. FindMyMeds (Pharmacy Inventory Finder)
   React, Spring Boot, MySQL, Geolocation Search
    `;

    const blob = new Blob([cvText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Dhilshan_Mohamed_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel border border-cyan-500/40 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
        
        {/* Modal Header Actions */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/90 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                Curriculum Vitae — Dhilshan Mohamed
              </h3>
              <p className="text-xs font-mono text-cyan-400">
                Software Engineering Undergraduate (NSBM Green University)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors text-xs font-mono flex items-center gap-1.5"
              title="Print CV"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 hover:brightness-110 shadow-[0_0_15px_#00f0ff]"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted Resume Body */}
        <div className="p-6 sm:p-10 bg-[#070a13] space-y-8 text-slate-200">
          
          {/* Resume Header */}
          <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white font-heading">
                DHILSHAN MOHAMED
              </h1>
              <p className="text-sm font-mono text-cyan-400 font-semibold mt-1">
                SOFTWARE ENGINEERING UNDERGRADUATE (3RD YEAR, 2025–2028)
              </p>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                NSBM Green University, Homagama, Sri Lanka
              </p>
            </div>

            <div className="space-y-1.5 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>dhilshan-mohamed</span>
              </div>
              <div className="flex items-center gap-2">
                <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>github.com/Dhilshan02</span>
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div>
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold mb-2">
              // PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              Third-year Software Engineering undergraduate at NSBM Green University with hands-on experience designing and delivering full-stack web applications. Proficient in **Java Spring Boot**, **ASP.NET Core 8**, and **React with TypeScript**. Adept at constructing clean microservices, relational database schemas, and intuitive glassmorphic user interfaces. Seeking an intensive Software Engineering Internship to contribute to production codebases.
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
              // EDUCATION & QUALIFICATIONS
            </h2>
            <div className="space-y-4 font-sans text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="flex justify-between items-start font-heading font-bold text-white text-base">
                  <span>BSc (Hons) Software Engineering</span>
                  <span className="font-mono text-xs text-cyan-400 font-normal">2025 – 2028 (3rd Year)</span>
                </div>
                <p className="text-xs font-mono text-slate-400 mt-0.5">NSBM Green University — Homagama, Sri Lanka</p>
                <p className="text-xs text-slate-300 mt-2">
                  Specialized Modules: Enterprise Application Architecture, Web Application Development, Database Engineering (PostgreSQL/MySQL), Object-Oriented Analysis & Design, Agile Methods.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="flex justify-between items-start font-heading font-bold text-white text-base">
                  <span>IT & English Dual Diploma</span>
                  <span className="font-mono text-xs text-purple-400 font-normal">2023</span>
                </div>
                <p className="text-xs font-mono text-slate-400 mt-0.5">IDM Eastern Campus — Sri Lanka</p>
                <p className="text-xs text-slate-300 mt-2">
                  Awarded Distinction in Programming Fundamentals, Web Development Basics, and Business Communication.
                </p>
              </div>
            </div>
          </div>

          {/* Core Technical Skills Grid */}
          <div>
            <h2 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
              // TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">Languages & Core:</span>
                Java, TypeScript, JavaScript (ES6+), C#, SQL, HTML5/CSS3
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">Frontend Engineering:</span>
                React 19, Vite, Tailwind CSS, Next.js, Bootstrap, Glassmorphic Design
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">Backend & APIs:</span>
                Spring Boot, ASP.NET Core 8, RESTful APIs, Spring Data JPA, JWT Auth
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">Databases & Tools:</span>
                PostgreSQL, MySQL, MS SQL Server, Git/GitHub, Postman, Docker, Figma
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
