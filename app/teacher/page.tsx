import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function TeacherPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Teacher Dashboard</h1>
      </div>
    </ProtectedRoute>
  );
}
