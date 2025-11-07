'use client';

import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to AI Quiz Builder 🎓</h1>
      <p className="text-lg text-gray-500 mb-6">
        Create, share, and take AI-generated quizzes easily.
      </p>
      <a
        href="/signin"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Get Started
      </a>
    </div>
  );
}
