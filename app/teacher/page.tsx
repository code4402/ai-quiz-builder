"use client";
 import ProtectedRoute from "../components/ProtectedRoute";
;

export default function TeacherDashboard() {
  return (
    <ProtectedRoute>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">👩‍🏫 Teacher Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome! Only authenticated users can access this page.
        </p>
      </div>
    </ProtectedRoute>
  );
}
