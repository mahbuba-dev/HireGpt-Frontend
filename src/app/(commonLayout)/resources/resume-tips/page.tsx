import React from "react";

export default function ResumeTipsPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-white via-blue-50 to-blue-100 flex flex-col items-center justify-start py-16 px-4">
      <section className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl p-10 border border-blue-100">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4 text-center tracking-tight">Resume Tips for Modern Professionals</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl mx-auto">
          Elevate your job search with a resume that stands out. These expert-backed tips are inspired by industry leaders and the Wellfound platform, designed to help you land your next big opportunity.
        </p>
        <ul className="space-y-6">
          <li className="flex items-start gap-4">
            <span className="inline-block bg-blue-100 text-blue-700 rounded-full p-2 mt-1">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
            </span>
            <div>
              <h2 className="text-xl font-semibold text-blue-800">Tailor Your Resume for Each Role</h2>
              <p className="text-gray-600">Customize your resume to match the job description. Highlight relevant skills and achievements that align with the company’s needs.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="inline-block bg-blue-100 text-blue-700 rounded-full p-2 mt-1">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
            </span>
            <div>
              <h2 className="text-xl font-semibold text-blue-800">Showcase Impact, Not Just Duties</h2>
              <p className="text-gray-600">Use quantifiable results and action verbs. Employers want to see the impact you made, not just your responsibilities.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="inline-block bg-blue-100 text-blue-700 rounded-full p-2 mt-1">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
            </span>
            <div>
              <h2 className="text-xl font-semibold text-blue-800">Keep It Concise & Readable</h2>
              <p className="text-gray-600">Limit your resume to one or two pages. Use clear headings, bullet points, and plenty of white space for easy scanning.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="inline-block bg-blue-100 text-blue-700 rounded-full p-2 mt-1">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
            </span>
            <div>
              <h2 className="text-xl font-semibold text-blue-800">Highlight Tech & Soft Skills</h2>
              <p className="text-gray-600">Balance your technical expertise with soft skills like communication, leadership, and adaptability—qualities top companies value.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="inline-block bg-blue-100 text-blue-700 rounded-full p-2 mt-1">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
            </span>
            <div>
              <h2 className="text-xl font-semibold text-blue-800">Design for Modern ATS</h2>
              <p className="text-gray-600">Use a clean, simple layout with standard fonts. Avoid graphics or tables that can confuse Applicant Tracking Systems.</p>
            </div>
          </li>
        </ul>
        <div className="mt-10 text-center">
          <a href="/resources/resume-template" className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200">Download Premium Resume Template</a>
        </div>
      </section>
      <footer className="mt-16 text-gray-400 text-sm text-center">
        Inspired by Wellfound. Crafted for your career success.
      </footer>
    </main>
  );
}
