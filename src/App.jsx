import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Button } from "./components/ui/Button";

// Pages (Placeholder)
import Login from "./pages/Login/Login";
import TaskList from "./pages/Annotator/TaskList";
import Workspace from "./pages/Annotator/Workspace";
import ReviewQueue from "./pages/Reviewer/ReviewQueue";
import ReviewWorkspace from "./pages/Reviewer/ReviewWorkspace";
import ManagerDashboard from "./pages/Manager/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Role: Annotator */}
        <Route path="/annotator" element={<Navigate to="/annotator/tasks" replace />} />
        <Route path="/annotator/tasks" element={<TaskList />} />
        <Route path="/annotator/task/:taskId" element={<Workspace />} />

        {/* Role: Reviewer */}
        <Route path="/reviewer" element={<Navigate to="/reviewer/queue" replace />} />
        <Route path="/reviewer/queue" element={<ReviewQueue />} />
        <Route path="/reviewer/review/:taskId" element={<ReviewWorkspace />} />

        {/* Role: Manager */}
        <Route path="/manager" element={<Navigate to="/manager/dashboard" replace />} />
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
