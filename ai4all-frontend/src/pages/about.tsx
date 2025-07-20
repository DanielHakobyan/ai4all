import { motion } from "framer-motion";
import { Users, Star, Heart, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

export default function About() {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 gap-2 sm:gap-0">
          <div className="flex items-center gap-4 sm:gap-8 w-full sm:w-auto justify-between">
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
          {/* Projects Button on the far right, responsive */}
          <div className="w-full sm:w-auto flex justify-center sm:justify-end mt-2 sm:mt-0">
            <Link to="/projects" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 px-6 py-2 rounded-xl text-base">
                Մեր ծրագրերը
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="space-y-10 px-2 sm:px-4 md:px-8 pt-10 md:pt-16 pb-8 md:pb-12 bg-gradient-to-br from-[#f5f6fa] via-[#e9eafc] to-[#f5f6fa] min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative text-center py-16 overflow-hidden"
      >
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-300/20 blur-3xl rounded-full z-0" />
        <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">
        AI4ALL-ի մասին
        </h1>
        <p className="relative z-10 mt-6 text-lg text-gray-700 max-w-2xl mx-auto font-medium">
        Իմացեք ավելին մեր անցած ճանապարհի, առաքելության և այն հրաշալի թիմի մասին, որը կառուցում է արհեստական ինտելեկտի ապագան բոլորի համար։
        </p>
      </motion.section>

      {/* Our Story */}
      <motion.section
        className="flex flex-col md:flex-row items-center gap-6 md:gap-12 bg-white/70 rounded-3xl shadow-xl p-4 sm:p-6 md:p-12 backdrop-blur-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="w-full max-w-xs mx-auto p-4 rounded-xl bg-gradient-to-br from-purple-100 via-blue-100 to-white shadow-lg border border-purple-100">
          <img
            src="https://dl.dropboxusercontent.com/scl/fi/cgn8gvrly13uciql1j0z1/ai4all_logo.png?rlkey=n92cuxtv2wsg6g0xxalnmck16&st=41uq0jni"
            alt="Our Story"
            className="w-48 max-w-xs rounded-xl shadow-lg"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-6 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full" />
            Մեր պատմությունը
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
          AI4ALL-ը մեկնարկեց մի նպատակի շուրջ՝ տալ բոլորին հնարավորություն կիրառելու արհեստական բանականությունը սովորելու, ստեղծագործելու և զարգանալու համար։
          </p>
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        className="relative bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white p-8 md:p-12 rounded-3xl shadow-2xl text-center overflow-hidden max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="absolute -top-16 right-10 w-48 h-48 bg-white/10 blur-2xl rounded-full z-0" />
        <Star className="mx-auto w-12 h-12 mb-4 text-white/80 animate-pulse z-10 relative" />
        <h2 className="text-3xl font-bold mb-4 z-10 relative">ՄԵր հեռանկարները</h2>
        <p className="text-lg max-w-3xl mx-auto z-10 relative">
        Մենք ձգտում ենք մի աշխարհի, որտեղ արհեստական բանականությունը հասանելի է յուրաքանչյուրի համար՝ անկախ վայրից կամ մասնագիտությունից։ AI4ALL-ը նպատակ ունի զարգացնել հմտություններ, որոնք կնպաստեն ստեղծարարության, կրթության և աշխատաշուկայում մրցունակության աճին։ Մենք հավատում ենք՝ տեխնոլոգիան պետք է ծառայի մարդուն՝ ընդլայնելով նրա հնարավորությունները։
        </p>
      </motion.section>

      {/* Team Section Placeholder */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="pt-4"
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-purple-600" />
          Ահա և մեր թիմը!
        </h2>
        <p className="text-gray-700 text-lg mb-8 max-w-2xl">
        Մենք տարբեր ոլորտների մասնագետներ ենք, ովքեր փորձում են ԱԲ գործիքներով փոխանցել օգտակար հմտություններ և խթանել նորարար մտածողությունը։
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 bg-white/70 rounded-3xl shadow-lg p-4 sm:p-6">
          {[
            {
              name: "Izabella Khanzratyan",
              role: "International Project Coordinator & Specialist | AI4ALL",
              photoUrl: "https://www.dl.dropboxusercontent.com/scl/fi/82j6iqx4hteurl0bgogxv/Izabella.jpg?rlkey=rem4vfq4ohu22stcvbkuopbrr&st=rpto4jng&dl=0"
            },
            {
              name: "Bagrat Yengibaryan",
              role: "CEO at EIF | EIF",
              photoUrl: "https://www.dl.dropboxusercontent.com/scl/fi/jbbuujrup56rv0aywd4ec/Bagrat.jpg?rlkey=syj02ht7oxmmu1jyqpn6siopq&st=9f9ga5vt&dl=0"
            },
            {
              name: "Greta Khachatryan",
              role: "Project manager | AI4ALL",
              photoUrl: "https://www.dl.dropboxusercontent.com/scl/fi/25tlj8a7jxvjw83gfrw33/Greta.jpg?rlkey=9f1pmi7iweips25bp15kejoam&st=ej3a3mdb&dl=0"
            }
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white/90 rounded-xl shadow p-6 text-center border-2 border-transparent hover:border-purple-400 hover:shadow-xl transition-all duration-300 flex flex-col items-center"
            >
              <img
                src={member.photoUrl}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover shadow-md border-2 border-white group-hover:scale-105 transition-transform"
              />
              <h3 className="font-semibold text-lg text-gray-800">{member.name}</h3>
              <p className="text-sm text-purple-600 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="text-center py-10 bg-gradient-to-br from-purple-100 via-blue-100 to-white rounded-3xl shadow-lg mt-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <Heart className="w-8 h-8 mx-auto text-pink-500 mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold mb-2">Շնորհակալություն!</h2>
        <p className="text-gray-700 max-w-xl mx-auto mb-6">
        Շնորհակալ ենք, որ մեզ հետ եք այս ճանապարհին:

        </p>
        <Link to="/projects">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:from-purple-700 hover:to-blue-700">
            Միացեք հիմա
          </Button>
        </Link>
      </motion.section>
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
    </div>
    </>
  );
}
