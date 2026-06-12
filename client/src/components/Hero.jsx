import { HiArrowRight, HiChevronDoubleDown } from 'react-icons/hi2';
import { FaGooglePlay } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import bannerImg from '../assets/banner.png';

const Hero = ({ content, settings }) => {
  return (
    <section id="home" className="relative w-full overflow-hidden pt-28 sm:pt-24 md:pt-20 pb-16 md:pb-20 min-h-[100svh] flex items-center" style={{background: 'linear-gradient(135deg, #001a3d 0%, #002d6b 35%, #003a1a 70%, #004d22 100%)'}}>
      
      {/* Aesthetic Abstract Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1200px] h-[600px] sm:h-[800px] rounded-[100%] bg-white/5 blur-[120px]" />
        <div className="absolute -top-[10%] -right-[5%] w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] rounded-full bg-[#00529C]/30 blur-[100px]" />
        <div className="absolute -bottom-[10%] -left-[5%] w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] rounded-full bg-[#4CAF50]/25 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[#00b4d8]/10 blur-[80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Text Content - Left */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-8 sm:py-12 lg:py-24 relative z-10 text-center lg:text-left"
          >
            <div className="inline-block bg-gradient-to-r from-[#4CAF50]/20 to-[#00529C]/20 border border-white/40 backdrop-blur-md rounded-full px-5 py-2 mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <span className="text-white text-xs sm:text-sm font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase drop-shadow-md">
                {content?.subtitle || 'Smart Cooperative'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e0f7fa] to-[#4CAF50] leading-[1.1] mb-6 sm:mb-8 tracking-tighter drop-shadow-[0_0_30px_rgba(76,175,80,0.3)]">
              {content?.title || 'Membangun Kesejahteraan Bersama'}
            </h1>

            <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10 font-medium drop-shadow-sm max-w-xl mx-auto lg:mx-0">
              {content?.content || 'Rasakan manfaat menjadi Anggota dengan berbagai layanan dan program yang tersedia. Masa depan lebih terencana bersama KMMA.'}
            </p>
            
            {/* Play Store Download Button */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <a 
                href={settings?.playstore_link || '#'} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-2xl px-5 sm:px-6 py-3 sm:py-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-white/40 group"
              >
                <div className="bg-gradient-to-br from-[#4CAF50] to-[#00529C] w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0">
                  <FaGooglePlay className="text-white text-lg sm:text-xl" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white/80 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5">Dapatkan di</span>
                  <span className="text-white font-black text-lg sm:text-xl leading-none tracking-tight">Google Play</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Image - Right (hidden on small mobile, visible from sm up) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center z-10 mt-4 lg:mt-0"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[80%] h-[80%] bg-[#00529C]/30 rounded-full blur-[80px] -z-10" />
            
            <img 
              src={bannerImg}
              alt="KMMA Banner"
              className="relative z-10 w-full max-w-[260px] sm:max-w-[380px] md:max-w-[450px] lg:max-w-[600px] h-auto object-contain drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-20 lg:bottom-28 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer group"
        onClick={() => {
          const nextSection = document.getElementById('about') || document.getElementById('products');
          if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-white/50 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-2 group-hover:text-white transition-colors">Scroll</span>
        <div className="w-6 h-10 sm:w-8 sm:h-12 rounded-full border-2 border-white/20 flex justify-center p-1 bg-white/5 backdrop-blur-sm group-hover:border-[#4CAF50]/50 transition-colors">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-gradient-to-b from-[#00529C] to-[#4CAF50] rounded-full"
          />
        </div>
      </motion.div>

      {/* Bottom wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#001a3d"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
