import { HiArrowRight } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import bannerImg from '../assets/banner.png';

const Hero = ({ content, settings }) => {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-white pt-24 md:pt-16 pb-16 min-h-[100vh] flex items-center">
      
      {/* Aesthetic Abstract Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-white">
        {/* Massive Center Blue Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-[100%] bg-[#00529C]/10 blur-[120px]" />
        
        {/* Intense Blue Blob Top Right */}
        <div className="absolute -top-[10%] -right-[5%] w-[700px] h-[700px] rounded-full bg-[#00529C]/15 blur-[100px]" />
        
        {/* Intense Blue Blob Bottom Left */}
        <div className="absolute -bottom-[10%] -left-[5%] w-[700px] h-[700px] rounded-full bg-[#00529C]/15 blur-[100px]" />
        
        {/* Grid pattern overlay for texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#00529C_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04]" />
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
            <div className="inline-block bg-[#00529C]/10 border border-[#00529C]/20 rounded-full px-5 py-2 mb-6">
              <span className="text-[#00529C] text-sm font-bold tracking-wider uppercase">
                {content?.subtitle || 'Smart Cooperative'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 leading-[1.1] mb-8 tracking-tight">
              {content?.title || 'Membangun Kesejahteraan Bersama'}
            </h1>

            <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              {content?.content || 'Rasakan manfaat menjadi Anggota dengan berbagai layanan dan program yang tersedia. Masa depan lebih terencana bersama KMMA.'}
            </p>
            
            {/* Button removed to make it an informational page only */}
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
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
