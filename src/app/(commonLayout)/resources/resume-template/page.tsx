import React from "react";

export default function ResumeTemplatePage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-white via-purple-50 to-purple-100 flex flex-col items-center justify-start py-16 px-4">
      <section className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl p-10 border border-purple-100">
        <h1 className="text-4xl font-extrabold text-purple-900 mb-4 text-center tracking-tight">Premium Resume Template</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl mx-auto">
          Download a modern, ATS-friendly resume template designed for SaaS professionals. Make your application stand out with a clean, professional layout and industry-standard formatting.
        </p>
        <div className="flex flex-col items-center gap-6">
          <a href="/downloads/premium-resume-template.docx" className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200">Download .docx Template</a>
          <a href="/downloads/premium-resume-template.pdf" className="inline-block bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold py-3 px-8 rounded-full shadow transition-all duration-200 border border-purple-200">Download PDF Template</a>
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-purple-800 mb-2">How to Use</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Open the template in your preferred editor (Word, Google Docs, etc.).</li>
            <li>Customize your details, achievements, and skills.</li>
            <li>Export as PDF for best results when applying online.</li>
          </ul>
        </div>
      </section>
      <footer className="mt-16 text-gray-400 text-sm text-center">
        Designed for modern SaaS job seekers. Inspired by Wellfound.
      </footer>
    </main>
  );
}
