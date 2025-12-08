"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CreateQuizPage() {
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
  };

  return (
    <div>
      <h1>Create Quiz</h1>

      <input
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {questions.map((q, i) => (
        <div key={i}>
          <input
            placeholder="Question"
            value={q.question}
            onChange={(e) => {
              const copy = [...questions];
              copy[i].question = e.target.value;
              setQuestions(copy);
            }}
          />
          <input
            placeholder="Answer"
            value={q.answer}
            onChange={(e) => {
              const copy = [...questions];
              copy[i].answer = e.target.value;
              setQuestions(copy);
            }}
          />
        </div>
      ))}

      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleCreateQuiz}>Create Quiz</button>
    </div>
  );
}
