"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";


export default function QuizBuilder() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const handleCreateQuiz = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return alert("Not logged in");

    const { data: quiz } = await supabase
      .from("quizzes")
      .insert({
        title,
        teacher_id: user.id,
      })
      .select()
      .single();

    for (let q of questions) {
      await supabase.from("questions").insert({
        quiz_id: quiz.id,
        question: q.question,
        answer: q.answer,
      });
    }

    alert("Quiz created!");
    alert("Quiz created!");
    router.push("/teacher");

  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Create a New Quiz</h1>

      <input
        className="p-2 border w-full mb-4"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {questions.map((q, i) => (
        <div key={i} className="mb-4">
          <input
            className="p-2 border w-full mb-2"
            placeholder="Question"
            value={q.question}
            onChange={(e) => {
              const updated = [...questions];
              updated[i].question = e.target.value;
              setQuestions(updated);
            }}
          />
          <input
            className="p-2 border w-full"
            placeholder="Answer"
            value={q.answer}
            onChange={(e) => {
              const updated = [...questions];
              updated[i].answer = e.target.value;
              setQuestions(updated);
            }}
          />
        </div>
      ))}

      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={handleAddQuestion}
      >
        + Add Question
      </button>

      <button
        className="p-2 bg-green-600 text-white rounded ml-4"
        onClick={handleCreateQuiz}
      >
        Create Quiz
      </button>
    </div>
  );
}
