import React from "react";

export default function InterviewPrepPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-white via-green-50 to-green-100 flex flex-col items-center justify-start py-16 px-4">
      <section className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl p-10 border border-green-100">
        <h1 className="text-4xl font-extrabold text-green-900 mb-4 text-center tracking-tight">Interview Prep for Job Seekers</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl mx-auto">
          Ace your next interview with confidence. Explore expert strategies, common questions, and actionable tips to help you stand out—crafted for modern SaaS professionals.
        </p>
        <ul className="space-y-6">
          <li className="flex items-start gap-4">
            <span className="inline-block bg-green-100 text-green-700 rounded-full p-2 mt-1">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
            </span>
            <div>
              <h2 className="text-xl font-semibold text-green-800">Master Behavioral Questions</h2>
              <p className="text-gray-600">Use the STAR method (Situation, Task, Action, Result) to structure compelling answers for behavioral interviews.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="inline-block bg-green-100 text-green-700 rounded-full p-2 mt-1">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
            </span>
            <div>
              <h2 className="text-xl font-semibold text-green-800">Research the Company</h2>
              <p className="text-gray-600">Understand the company’s mission, values, and recent achievements. Tailor your responses to show alignment.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="inline-block bg-green-100 text-green-700 rounded-full p-2 mt-1">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
            </span>
            <div>
              <h2 className="text-xl font-semibold text-green-800">Practice Technical Skills</h2>
              <p className="text-gray-600">Prepare for role-specific technical questions and coding challenges using real-world scenarios.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="inline-block bg-green-100 text-green-700 rounded-full p-2 mt-1">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
            </span>
            <div>
              <h2 className="text-xl font-semibold text-green-800">Ask Insightful Questions</h2>
              <p className="text-gray-600">Prepare thoughtful questions for your interviewers to demonstrate your interest and engagement.</p>
            </div>
          </li>
        </ul>
        <div className="mt-10 text-center">
          <a href="/resources/resume-tips" className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200">Explore Resume Tips</a>
        </div>
      </section>
      <footer className="mt-16 text-gray-400 text-sm text-center">
        Premium guidance for SaaS job seekers.
      </footer>
    </main>
  );
}
