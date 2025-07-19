import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Search, Filter } from "lucide-react";
import { useRef } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const placeholderProjects = [
  { title: "AI & Project Management", desc: "Առցանց ուսուցման դասընթացներ", color: "from-purple-500 to-blue-500" },
  { title: "AI and Graphic Design", desc: "Առցանց ուսուցման դասընթացներ", color: "from-pink-500 to-yellow-500" },
  { title: "AI and Marketing", desc: "Առցանց ուսուցման դասընթացներ", color: "from-green-400 to-cyan-500" },
  { title: "Creative Coding & Character Design & AI", desc: "Ստեղծարար աշխատարաններ՝ խորացված և կիրառական գիտելիքների ձեռքբերում։", color: "from-indigo-500 to-fuchsia-500" },
  { title: "AI for teachers", desc: "Արհեստական բանականությունը մանկավարժների համար", color: "from-orange-400 to-red-500" },
];

export default function Projects() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [highlightContact, setHighlightContact] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  // Filtered projects (placeholder logic)
  const filtered = placeholderProjects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col">
      {/* Top Navbar */}
      <nav className="w-full bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <span className="font-extrabold text-xl text-purple-700 tracking-tight">AI4ALL</span>
            <div className="flex gap-2 md:gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors duration-200 text-sm md:text-base
                    ${location.pathname === link.path
                      ? "bg-purple-700 text-white shadow"
                      : "text-gray-700 hover:bg-purple-100 hover:text-purple-700"}
                  `}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="#contact-footer"
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors duration-200 text-sm md:text-base
                  ${location.hash === '#contact-footer' ? 'bg-purple-700 text-white shadow' : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700'}
                  cursor-pointer`}
                onClick={e => {
                  e.preventDefault();
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  setHighlightContact(true);
                  setTimeout(() => setHighlightContact(false), 1300);
                  setTimeout(() => {
                    if (contactRef.current) {
                      contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }, 600);
                }}
              >
                Contact
              </a>
            </div>
          </div>
          {/* Projects Button on the far right */}
          <Link to="/projects">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 px-6 py-2 rounded-xl text-base">
              Our Projects!
            </Button>
          </Link>
        </div>
      </nav>
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative py-24 px-4 text-center flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-4"
          >
            <Sparkles className="w-14 h-14 text-purple-400 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Explore Our Projects
            </h1>
            <p className="max-w-xl text-lg text-white/80 mb-4">
              Discover what we've done for our country!
            </p>
          </motion.div>
          {/* Animated background shapes */}
          <motion.div
            className="absolute top-10 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl z-0"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 8 }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl z-0"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 10 }}
          />
        </section>

        {/* Search & Filter Bar */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-4 px-4 mb-10 z-10">
          <div className="flex items-center bg-white/10 rounded-xl px-4 py-2 gap-2 shadow-md w-full max-w-xs">
            <Search className="w-5 h-5 text-purple-300" />
            <input
              className="bg-transparent outline-none text-white flex-1 placeholder:text-purple-200"
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 shadow-md">
            <Filter className="w-5 h-5 text-purple-300" />
            <select
              className="bg-transparent text-white outline-none"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option>All</option>
              <option>AI</option>
              <option>Web</option>
              <option>Data</option>
            </select>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="flex-1 flex flex-col items-center px-4 pb-20">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {filtered.length === 0 ? (
              <motion.div
                className="col-span-full text-center text-lg text-white/70 py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No projects found. More coming soon!
              </motion.div>
            ) : (
              filtered.map((project, idx) => (
                <motion.div
                  key={project.title}
                  className={`relative rounded-3xl p-8 shadow-xl bg-gradient-to-br ${project.color} group cursor-pointer overflow-hidden hover:scale-105 transition-transform duration-300`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.07 }}
                >
                  <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-lg flex items-center gap-2">
                    {project.title}
                    <span className="inline-block animate-bounce text-yellow-200">★</span>
                  </h2>
                  <p className="text-white/90 mb-4 min-h-[48px]">{project.desc}</p>
                  {/* Animated floating shapes */}
                  <motion.div
                    className="absolute -top-8 -right-8 w-20 h-20 bg-white/10 rounded-full blur-2xl z-0"
                    animate={{ y: [0, 10, 0], x: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 6, delay: idx * 0.2 }}
                  />
                </motion.div>
              ))
            )}
          </motion.div>
          {/* Call to action for future projects */}
          <div className="mt-16 text-center">
            <p className="text-white/70 mb-4">Want to see your project here?</p>
            <button
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 px-8 py-3 rounded-xl text-lg"
              onClick={() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                setHighlightContact(true);
                setTimeout(() => setHighlightContact(false), 1300);
                setTimeout(() => {
                  if (contactRef.current) {
                    contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }, 600);
              }}
            >
              Contact Us
            </button>
          </div>
        </section>
      </div>
      {/* Modern Footer Section */}
      <footer id="contact-footer" className="bg-gradient-to-br from-[#181c2a] via-[#232946] to-[#181c2a] py-10 px-4 text-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div
            ref={contactRef}
            className={`flex flex-col items-center md:items-start gap-2 relative transition-all duration-300 ${highlightContact ? 'contact-highlight-animate' : ''}`}
          >
            <span className="font-extrabold text-xl text-purple-400 tracking-tight">AI4ALL</span>
            <span className="text-xs text-purple-200 mt-1">Հայաստանի Հանրապետություն, Երևան 0062, Բագրևանդի փ․ 21/1, «Ինժեներական պլազա»</span>
            <span className="text-xs text-purple-200">+374 11 21 97 97</span>
            <span className="text-xs text-purple-200">info@eif.am</span>
          </div>
          <nav className="flex gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-purple-400 transition-colors">About</Link>
            <Link to="/projects" className="hover:text-purple-400 transition-colors">Projects</Link>
            <a
              href="#contact-footer"
              className="hover:text-purple-400 transition-colors cursor-pointer"
              onClick={e => {
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }}
            >
              Contact
            </a>
          </nav>
          <div className="text-xs text-gray-500 text-center md:text-right flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-4 justify-center mb-1">
            <a href="https://www.facebook.com/AI4ALLbyEIF" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/ai4allbyeif/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/company/enterpriseincubatorfoundation/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
            &copy; {new Date().getFullYear()} Daniel Hakobyan. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}