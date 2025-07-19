// Modernized AI4ALL Homepage with Horizontal Mission Slider
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "../components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { newsItems } from "../data/news";
import CountUp from "react-countup";
import {
  Newspaper,
  Film,
  ArrowRight,
  Target,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
// Chatbot state and logic
import { useCallback } from "react";
import { AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

// To enable the card flip effect in the stats section, add the following CSS to your global stylesheet (e.g., index.css or App.css):
// .perspective { perspective: 1000px; }
// .transform-style-preserve-3d { transform-style: preserve-3d; }
// .rotate-y-180 { transform: rotateY(180deg); }

export default function Home() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const controls = useAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);
  const matrixNewsRef = useRef<HTMLCanvasElement>(null);

  // Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hi! I am the AI4ALL assistant. Ask me anything about this website!" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatAnimating, setChatAnimating] = useState(false);

  // Show chat briefly on page load
  useEffect(() => {
    setChatOpen(true);
    const timer = setTimeout(() => setChatOpen(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Send message to OpenRouter API
  const sendChatMessage = useCallback(async () => {
    if (!chatInput.trim()) return;
    const userMessage = { role: "user", content: chatInput };
    setChatMessages(msgs => [...msgs, userMessage]);
    setChatInput("");
    setChatLoading(true);
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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",
          "HTTP-Referer": window.location.origin,
          "X-Title": "AI4ALL"
        },
        body: JSON.stringify({
          model: "mistralai/mistral-small-3.2-24b-instruct-2506:free",
          messages: [...chatMessages, userMessage],
          max_tokens: 256,
        })
      });
      const data = await res.json();
      console.log('OpenRouter API response:', data);
      if (data.error) {
        setChatMessages(msgs => [...msgs, { role: "assistant", content: `Error: ${data.error.message || data.error}` }]);
        return;
      }
      // Try to find the reply in several possible fields
      let reply = data.choices?.[0]?.message?.content
        || data.choices?.[0]?.text
        || data.choices?.[0]?.message
        || data.choices?.[0]?.content
        || "Sorry, I couldn't get a response.";
      setChatMessages(msgs => [...msgs, { role: "assistant", content: reply }]);
    } catch (e) {
      setChatMessages(msgs => [...msgs, { role: "assistant", content: "Sorry, there was an error connecting to the chatbot." }]);
    } finally {
      setChatLoading(false);
    }
  }, [chatInput, chatMessages]);

  const missionSlides = [
    {
      title: "Նպատակ #1 | Երիտասարդների հզորացում AI հմտություններով",
      content:
        "AI4ALL-ի նպատակն է տրամադրել երիտասարդներին կիրառական արհեստական բանականության հմտություններ՝ enabling them to thrive in ստեղծարար, տեխնոլոգիական և բիզնես ոլորտներում։",
      bg: "bg-gradient-to-br from-[#1a1333] via-[#3f2b96] to-[#0f0c29]",
    },
    {
      title: "Նպատակ #1 | Ուսուցիչների կարողությունների զարգացում",
      content:
        "Ծրագիրը ձգտում է վերազինել ուսուցիչներին՝ AI գործիքների միջոցով դասավանդման արդյունավետությունը բարձրացնելու և կրթությունը համապատասխանեցնելու ժամանակի պահանջներին։",
      bg: "bg-gradient-to-br from-[#141e30] via-[#243b55] to-[#3a3d85]",
    },
  ];

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    const newIndex = currentIndex === 0 ? missionSlides.length - 1 : currentIndex - 1;
    scrollToSlide(newIndex);
  };

  const scrollRight = () => {
    const newIndex = (currentIndex + 1) % missionSlides.length;
    scrollToSlide(newIndex);
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Matrix rain effect for hero section
  useEffect(() => {
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    // Use non-null assertion for ctx since we already check for null
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 18;
    const columns = Math.floor(width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.random() * height / fontSize);
    const texts = Array.from({ length: columns }, () => `${Math.round(Math.random())}${Math.round(Math.random())}`);
    let frame = 0;

    function drawMatrix() {
      ctx!.fillStyle = "rgba(15,12,41,0.25)"; // semi-transparent bg for fade
      ctx!.fillRect(0, 0, width, height);
      ctx!.font = `${fontSize}px monospace`;
      ctx!.fillStyle = "#7c3aed"; // purple matrix color
      for (let i = 0; i < columns; i++) {
        // Only update the text every 6 frames
        if (frame % 6 === 0) {
          texts[i] = `${Math.round(Math.random())}${Math.round(Math.random())}`;
        }
        ctx!.fillText(texts[i], i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.2; // even slower speed
      }
      frame++;
      animationFrameId = requestAnimationFrame(drawMatrix);
    }

    drawMatrix();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 7000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const scrollToMission = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Navbar links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  const [highlightContact, setHighlightContact] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  // Matrix rain effect for news section (behind robot)
  useEffect(() => {
    const canvas = matrixNewsRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    const fontSize = 18;
    const columns = Math.floor(width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.random() * height / fontSize);
    const texts = Array.from({ length: columns }, () => `${Math.round(Math.random())}${Math.round(Math.random())}`);
    let frame = 0;
    function drawMatrix() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(15,12,41,0.25)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = "#7c3aed";
      for (let i = 0; i < columns; i++) {
        if (frame % 6 === 0) {
          texts[i] = `${Math.round(Math.random())}${Math.round(Math.random())}`;
        }
        ctx.fillText(texts[i], i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.2;
      }
      frame++;
      animationFrameId = requestAnimationFrame(drawMatrix);
    }
    drawMatrix();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <>
      <div className="space-y-6">
        {/* Hero Section with Navbar */}
        <section className="relative h-screen pt-16 text-center flex flex-col justify-center items-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden px-4">
          {/* Matrix Rain Canvas */}
          <canvas
            ref={matrixCanvasRef}
            className="absolute inset-0 w-full h-full z-0 opacity-60 mix-blend-lighten pointer-events-none"
          />
          {/* Top Navbar */}
          <nav className="absolute top-0 left-0 w-full bg-white/80 border-b border-gray-200">
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
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute bottom-0 left-0 w-64 h-auto z-10"
          >
            <source src="/animations/robot.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold"
          initial="hidden"
          animate={controls}
          variants={fadeUp}
        >
            Welcome to AI4ALL
        </motion.h1>
        <motion.p
            className="mt-6 text-white/90 text-lg max-w-2xl mx-auto"
            initial="hidden"
            animate={controls}
          variants={fadeUp}
            transition={{ delay: 0.2 }}
        >
            A stronger Armenia with Artificial Intelligence
        </motion.p>
        <motion.div
            className="mt-8 flex justify-center gap-4 flex-wrap"
            initial="hidden"
            animate={controls}
          variants={fadeUp}
            transition={{ delay: 0.4 }}
        >
          <Link to="/about">
              <Button
                size="lg"
                className="bg-purple-700 text-purple-700 hover:bg-white/90"
              >
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          </motion.div>
          <motion.div
            className="absolute bottom-12 cursor-pointer flex flex-col items-center"
            onClick={scrollToMission}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 border-white text-white hover:bg-white/20"
            >
              Explore More <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />
        </section>
        {/* Mission Section Slider */}
        <section className="relative w-full py-20 bg-gradient-to-br from-[#1a1333] via-[#3f2b96] to-[#0f0c29] border-t border-b border-white/70 flex justify-center">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {missionSlides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>

          <div
            ref={scrollRef}
            className="flex w-full max-w-5xl rounded-3xl shadow-lg overflow-x-hidden scroll-smooth snap-x snap-mandatory bg-white/10"
          >
            {missionSlides.map((slide, index) => (
              <motion.div
                key={index}
                className={`min-w-full flex items-center justify-center px-6 md:px-20 text-white snap-start`}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl text-center md:text-left">
                  <Target className="w-16 h-16 text-white/80" />
                  <div>
                    <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-lg max-w-3xl leading-relaxed">{slide.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 p-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 p-2 rounded-full"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </section>
{/* Stats Section */}
<section className="py-20 bg-gradient-to-br from-[#1a1333] via-[#302b63] to-[#0f0c29] text-center text-white border-b border-white/70">


  <motion.h2
    className="text-4xl font-bold mb-6 mt-0"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    AI4ALL in Numbers
  </motion.h2>

  <div className="flex flex-wrap justify-center gap-16 px-6 max-w-5xl mx-auto mt-12 bg-white/10 rounded-3xl shadow-lg py-12">
    {[
      {
        value: 2000,
        label: "Մասնակից",
        suffix: "+",
        info: "Ավելի քան 2000 մասնակից միացել է նախաձեռնությանը"
      },
      {
        value: 500,
        label: "Ուսուցիչ",
        suffix: "",
        info: "500 ուսուցիչ, մանկավարժ ձեռք է բերել նոր հմտություններ ու սկսել է կիրառել AI հիմքով գործիքներ դասավանդման ժամանակ"
      },
    ].map((stat, idx) => {
      const ref = useRef(null);
      const isInView = useInView(ref, { once: true });
      const isFlipped = hoveredStat === idx;
      return (
        <motion.div
          key={idx}
          ref={ref}
          className="w-64 h-48 cursor-pointer perspective flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.2, duration: 0.6 }}
          onMouseEnter={() => setHoveredStat(idx)}
          onMouseLeave={() => setHoveredStat(null)}
        >
          {/* Animated purple arrow and tooltip */}
          <motion.div
            className="flex flex-col items-center mb-2"
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <ArrowDown className="w-5 h-5 text-purple-700" />
            <span className="text-xs text-purple-600 mt-1">Hover me!</span>
          </motion.div>
          <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`} style={{ perspective: '1000px' }}>
            {/* Front */}
            <div className="absolute w-full h-full bg-white rounded-2xl shadow-md flex flex-col items-center justify-center transition-colors group hover:shadow-xl hover:scale-105" style={{ backfaceVisibility: 'hidden' }}>
              <p className="text-5xl font-extrabold text-purple-700 group-hover:text-purple-800 transition-colors">
                {isInView ? (
                  <CountUp end={stat.value} duration={2} separator="," suffix={stat.suffix} />
                ) : (
                  "0"
                )}
              </p>
              <p className="mt-3 text-gray-600 text-lg font-medium">{stat.label}</p>
            </div>
            {/* Back */}
            <div className="absolute w-full h-full bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 border border-purple-200 text-gray-800 transition-colors" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
              <span className="font-semibold text-purple-700 mb-2">{stat.label}</span>
              <span className="text-sm leading-relaxed text-center">{stat.info}</span>
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
      </section>


      {/* Media & News Combined Section */}
      <section className="bg-gradient-to-br from-purple-900 via-blue-800 to-black px-6 md:px-20 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Media Column */}
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-white">
              <Film className="w-6 h-6 text-purple-400" /> Featured Media
            </h2>
            <div className="grid grid-cols-1 gap-6">
          {["egHbkaSYx6w", "s_cEKoK2PwQ", "UgOe4I87YJo"].map((id) => (
            <motion.div
              key={id}
                  className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
              whileHover={{ scale: 1.03 }}
            >
              <iframe
                    className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                  />
            </motion.div>
          ))}
        </div>
            <div className="text-center mt-8">
          <Link to="/media">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 px-8 py-3 rounded-xl text-lg"
                >
                  See All Media
                </Button>
          </Link>
        </div>
          </div>
          {/* News Column */}
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-white">
              <Newspaper className="w-6 h-6 text-blue-300" /> Latest News
            </h2>
            <div className="grid grid-cols-1 gap-6">
          {newsItems.map((item) => (
            <motion.div
              key={item.title}
                  className="bg-white/90 p-6 rounded-xl shadow hover:shadow-xl transition cursor-pointer border hover:border-blue-300"
                  whileHover={{ scale: 1.03 }}
            >
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <a
                href={item.link}
                    className="text-sm text-blue-600 mt-2 inline-block hover:underline"
              >
                Կարդալ ավելին →
              </a>
            </motion.div>
          ))}
        </div>
            <div className="text-center mt-8">
              <Link to="/news">
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 px-8 py-3 rounded-xl text-lg"
                >
                  More News
                </Button>
              </Link>
            </div>
            {/* Robot Video inside News Section */}
            <div className="relative flex justify-center py-20 mt-24 ml-20" style={{ minHeight: '220px', minWidth: '320px' }}>
              {/* Matrix rain canvas behind robot */}
              <canvas
                ref={matrixNewsRef}
                className="absolute inset-0 w-full h-full z-0 opacity-60 mix-blend-lighten pointer-events-none rounded-2xl"
                style={{ minHeight: '220px', minWidth: '320px' }}
              />
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-64 h-auto relative z-10"
              >
                <source src="/animations/robot.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>


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
            <Link to="/projects" className="hover:text-purple-400 transition-colors">Projects</Link> {/* Added Projects link */}
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
      {/* Chatbot Floating Button & Window (separate containers to prevent icon jump) */}
      <div className="fixed bottom-8 right-8 z-50 pointer-events-none">
        <button
          className={`pointer-events-auto bg-purple-700 hover:bg-purple-800 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-opacity duration-300 ${chatOpen || chatAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          onClick={() => { if (!chatOpen && !chatAnimating) setChatOpen(true); }}
          aria-label="Open chat"
        >
          💬
        </button>
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              key="chat-window"
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="pointer-events-auto absolute bottom-0 right-0 w-80 max-w-[90vw] bg-white text-gray-900 rounded-2xl shadow-2xl border border-purple-200 flex flex-col overflow-hidden"
              style={{ originY: 1 }}
              onAnimationStart={() => setChatAnimating(true)}
              onAnimationComplete={() => setChatAnimating(false)}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-purple-700 text-white">
                <span className="font-semibold">AI4ALL Chatbot</span>
                <button type="button" onClick={() => { if (!chatAnimating) setChatOpen(false); }} className="text-white hover:text-purple-200 text-xl">×</button>
              </div>
              <div className="flex-1 flex flex-col gap-2 px-4 py-3 overflow-y-auto max-h-80" style={{ minHeight: 180 }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`text-sm mb-1 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <span className={`inline-block px-3 py-2 rounded-xl ${msg.role === "user" ? "bg-purple-100 text-purple-900" : "bg-gray-100 text-gray-800"}`}>{msg.content}</span>
                  </div>
                ))}
                {chatLoading && <div className="text-xs text-gray-400">AI is typing...</div>}
              </div>
              <form className="flex items-center gap-2 border-t px-3 py-2 bg-gray-50" onSubmit={e => { e.preventDefault(); sendChatMessage(); }}>
                <input
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                  type="text"
                  placeholder="Ask about this website..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  disabled={chatLoading}
                />
                <button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-800 text-white rounded-lg px-3 py-2 text-sm font-semibold disabled:opacity-50"
                  disabled={chatLoading || !chatInput.trim()}
                >
                  Send
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}
