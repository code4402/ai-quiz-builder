import ProtectedRoute from "../components/ProtectedRoute";


export default function TeacherDashboard() {
  return (
    <ProtectedRoute role="teacher">
      <div className="p-10">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
      </div>
    </ProtectedRoute>
  );
}
