import { newsItems } from "../data/news";
import { motion } from "framer-motion";
import { Newspaper, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function News() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  const location = useLocation();
  const navLinks = [
    { name: "Գլխավոր", path: "/" },
    { name: "Մեր մասին", path: "/about" },
  ];
  const [highlightContact, setHighlightContact] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);


  return (
    <>
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
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors duration-200 text-sm md:text-base hover:text-purple-700 hover:bg-purple-100 cursor-pointer`}
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
                Կապ մեզ հետ
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="min-h-screen bg-gradient-to-br from-[#232946] via-[#181c2a] to-[#232946] px-2 sm:px-4 py-8 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <Newspaper className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
              Լուրեր
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {newsItems.map((item) => (
              <motion.div
                key={item.title}
                className="bg-white/90 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition group border hover:border-blue-400"
                whileHover={{ y: -4, scale: 1.03 }}
              >
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors mb-2">
                  {item.title}
                </h2>
                <a
                  href={item.link}
                  className="text-blue-600 text-sm hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Իմացեք ավելին →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Modern Footer Section (with animated contact info) */}
      <footer id="contact-footer" className="bg-gradient-to-br from-[#181c2a] via-[#232946] to-[#181c2a] py-10 px-4 text-gray-200 mt-16">
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
            <Link to="/" className="hover:text-purple-400 transition-colors">Գլխավոր</Link>
            <Link to="/about" className="hover:text-purple-400 transition-colors">Մեր մասին</Link>
            <Link to="/projects" className="hover:text-purple-400 transition-colors">Մեր ծրագրերը</Link>
            <a
              href="#contact-footer"
              className="hover:text-purple-400 transition-colors cursor-pointer"
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
              Կապ մեզ հետ
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
    </>
  );
} 