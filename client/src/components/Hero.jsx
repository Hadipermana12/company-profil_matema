import { HiArrowRight } from 'react-icons/hi2';
import { FaGooglePlay } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import bannerImg from '../assets/banner.png';

const Hero = ({ content, settings }) => {
  return (
    <section id="home" className="relative w-full overflow-hidden pt-24 md:pt-16 pb-16 min-h-[100vh] flex items-center" style={{background: 'linear-gradient(135deg, #001a3d 0%, #002d6b 35%, #003a1a 70%, #004d22 100%)'}}>
      
      {/* Aesthetic Abstract Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Massive Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-[100%] bg-white/5 blur-[120px]" />
        
        {/* Blue Blob Top Right */}
        <div className="absolute -top-[10%] -right-[5%] w-[700px] h-[700px] rounded-full bg-[#00529C]/30 blur-[100px]" />
        
        {/* Green Blob Bottom Left */}
        <div className="absolute -bottom-[10%] -left-[5%] w-[700px] h-[700px] rounded-full bg-[#4CAF50]/25 blur-[100px]" />

        {/* Extra teal accent center-bottom */}
        <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] rounded-full bg-[#00b4d8]/10 blur-[80px]" />
        
        {/* Grid pattern overlay for texture */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[600px] md:min-h-[700px]">
          
          {/* Text Content - Left */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-12 md:py-24 relative z-10"
          >
            <div className="inline-block bg-gradient-to-r from-[#4CAF50]/20 to-[#00529C]/20 border border-white/40 backdrop-blur-md rounded-full px-6 py-2.5 mb-8 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <span className="text-white text-sm font-black tracking-[0.2em] uppercase drop-shadow-md">
                {content?.subtitle || 'Smart Cooperative'}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e0f7fa] to-[#4CAF50] leading-[1.1] mb-8 tracking-tighter drop-shadow-[0_0_30px_rgba(76,175,80,0.3)]">
              {content?.title || 'Membangun Kesejahteraan Bersama'}
            </h1>

            <p className="text-white/90 text-lg md:text-xl lg:text-2xl leading-relaxed mb-10 max-w-2xl font-medium drop-shadow-sm">
              {content?.content || 'Rasakan manfaat menjadi Anggota dengan berbagai layanan dan program yang tersedia. Masa depan lebih terencana bersama KMMA.'}
            </p>
            
            {/* Play Store Download Button */}
            <div className="flex items-center gap-4">
              <a 
                href={settings?.playstore_link || '#'} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-2xl px-6 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-white/40 group"
              >
                <div className="bg-gradient-to-br from-[#4CAF50] to-[#00529C] w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <FaGooglePlay className="text-white text-xl" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5">Dapatkan di</span>
                  <span className="text-white font-black text-xl leading-none tracking-tight">Google Play</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Image - Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center h-full z-10"
          >
            {/* Glow behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[80%] h-[80%] bg-[#00529C]/30 rounded-full blur-[80px] -z-10" />
            
            <img 
              src={bannerImg}
              alt="KMMA Banner"
              className="relative z-10 w-full max-w-[500px] lg:max-w-[600px] h-auto object-contain drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
            />
          </motion.div>
        </div>
      </div>

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
