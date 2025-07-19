import About from "./pages/about";
import Contact from "./pages/contact";
import Projects from "./pages/projects";
import Media from "./pages/media";
import News from "./pages/news";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/media" element={<Media />} />
      <Route path="/news" element={<News />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
