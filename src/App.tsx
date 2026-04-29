import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Interview } from "./pages/Interview";
import { Resume } from "./pages/Resume";
import { Questions } from "./pages/Questions";
import { Resources } from "./pages/Resources";
import { Coding } from "./pages/Coding";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="interview" element={<Interview />} />
          <Route path="resume" element={<Resume />} />
          <Route path="resources" element={<Resources />} />
          <Route path="questions" element={<Questions />} />
          <Route path="coding" element={<Coding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
