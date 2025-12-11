"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CreateQuizPage() {
  const router = useRouter();
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
      .insert([{ title, teacher_id: user.id }])
      .select()
      .single();

    for (const q of questions) {
      await supabase.from("questions").insert([
        {
          quiz_id: quiz.id,
          question: q.question,
          answer: q.answer,
        },
      ]);
    }

    alert("Quiz created!");
    router.push("/teacher");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
      
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {questions.map((q, i) => (
        <div key={i} className="mb-4">
          <input
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[i].question = e.target.value;
              setQuestions(newQuestions);
            }}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Answer"
            value={q.answer}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[i].answer = e.target.value;
              setQuestions(newQuestions);
            }}
            className="border p-2 w-full"
          />
        </div>
      ))}

      <button
        onClick={handleAddQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Add Question
      </button>

      <button
        onClick={handleCreateQuiz}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Create Quiz
      </button>
    </div>
  );
}