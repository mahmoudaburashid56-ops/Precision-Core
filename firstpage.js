import React, { useCallback } from 'react';
// 1. مكتبات الخلفية الحية
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
// 2. مكتبة الحركات (Animations)
import { motion } from "framer-motion";

const PrecisionCoreSmart = () => {
  // إعدادات الخلفية المتحركة (Particles)
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  // متغيرات الحركة للعناصر (Framer Motion Variants)
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] } }
  };

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-[#060910] text-white font-sans relative overflow-hidden">
      
      {/* 1. الخلفية الحية (Live Particles Background) */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0 opacity-40"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" }, // تتفاعل عند تحريك الماوس فوقها
              resize: true,
            },
            modes: {
              grab: { distance: 140, links: { opacity: 0.5 } },
            },
          },
          particles: {
            color: { value: "#7C3AED" }, // لون الجسيمات (البنفسجي)
            links: { color: "#7C3AED", distance: 150, enable: true, opacity: 0.3, width: 1 },
            collisions: { enable: true },
            move: { enable: true, speed: 1.2, direction: "none", random: false, straight: false, outModes: { default: "out" } },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />

      {/* المحتوى الفعلي للموقع (فوق الخلفية الحية) */}
      <div className="relative z-10">
        
        {/* البار الأساسي العلوي */}
        <nav className="flex justify-between items-center px-8 py-5 bg-[#060910]/70 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-500/20">
              P
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">
              Precision <span className="text-purple-500">Core</span>
            </span>
          </motion.div>

          <motion.div 
            className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="#home" className="hover:text-purple-400 transition-colors relative group">
              HOME
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <button className="bg-white text-[#060910] px-6 py-2.5 rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-xl transform hover:scale-105 active:scale-95">
              CONTACT US
            </button>
          </motion.div>
        </nav>

        {/* قسم الواجهة (Hero Section) بأجزاء متحركة */}
        <motion.section 
          className="relative pt-24 pb-32 px-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer} // تحريك العناصر الابنة واحداً تلو الآخر
        >
          <div className="max-w-6xl mx-auto text-center relative">
            
            <motion.h1 
              className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight tracking-tighter"
              variants={fadeInUp}
            >
              مستقبلك الرقمي، <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-300% animate-gradient">
                بأعلى درجات الذكاء والدقة
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
              variants={fadeInUp}
            >
              في Precision Core، لا نكتفي بتصميم المواقع والتطبيقات؛ بل نبتكر تجارب رقمية ذكية، تفاعلية، ومحمية بأحدث تقنيات الأمان لتنقل مشروعك إلى المستقبل.
            </motion.p>

            <motion.div 
              className="flex flex-col md:flex-row gap-5 justify-center"
              variants={fadeInUp}
            >
              <button className="px-12 py-4 bg-purple-600 rounded-full font-bold text-lg hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/30 transform hover:-translate-y-1">
                ابدأ رحلتك الذكية
              </button>
              <button className="px-12 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all group">
                استكشف أعمالنا الحية 
                <span className="inline-block translate-x-1 group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </motion.div>
          </div>

          {/* قسم الصورة/الموكب الحي */}
          <motion.div 
            className="mt-28 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-white/5 bg-[#0c111d]/50 p-3 backdrop-blur-sm shadow-2xl relative group overflow-hidden">
              {/* تأثير إضاءة خلفي (Glow) */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                alt="Smart Engineering Showcase" 
                className="relative rounded-xl w-full object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
  
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PrecisionCoreSmart />);
export default PrecisionCoreSmart;