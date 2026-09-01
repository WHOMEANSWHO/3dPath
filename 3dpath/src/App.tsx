import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import Areas from "./pages/Areas";
import ClassPage from "./pages/ClassPage";
import Home from "./pages/Home";
import LessonPage from "./pages/LessonPage";
import NotesLog from "./pages/NotesLog";
import Reference from "./pages/Reference";
import TopicPage from "./pages/TopicPage";

const fileProtocol = typeof window !== "undefined" && window.location.protocol === "file:";
const Router = fileProtocol ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/topics/:topic" element={<TopicPage />} />
          <Route path="/classes/:id" element={<ClassPage />} />
          <Route path="/lessons/:id" element={<LessonPage />} />
          <Route path="/reference" element={<Reference />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/notes" element={<NotesLog />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
