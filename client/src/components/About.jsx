import { HiArrowRight } from 'react-icons/hi2';
import { motion } from 'framer-motion';

const About = ({ content }) => {
  const stats = [
    { value: '10,000+', label: 'Anggota Aktif' },
    { value: 'Rp 50M+', label: 'Dana Dikelola' },
    { value: '15+', label: 'Tahun Pengalaman' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Green accent label */}
            <div className="inline-block bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-full px-5 py-2 mb-6">
              <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
                {content?.subtitle || 'Tentang Kami'}
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              {content?.title || 'Mewujudkan Kesejahteraan Anggota Koperasi'}
            </h3>

            <p className="text-white/80 text-lg leading-relaxed mb-8">
              {content?.content || 'KMMA merupakan koperasi modern yang berfokus pada kesejahteraan anggota melalui teknologi digital. Kami berkomitmen memberikan solusi finansial yang cerdas dan inklusif.'}
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mb-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-black text-[#4CAF50] mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <a 
              href="#products" 
              className="inline-flex items-center gap-3 text-white font-bold text-base hover:gap-5 transition-all group"
            >
              Lihat Selengkapnya
              <div className="w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#4CAF50] transition-colors">
                <HiArrowRight className="text-current" size={18} />
              </div>
            </a>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative shapes behind image */}
            <div className="absolute -top-6 -right-6 w-full h-full bg-[#4CAF50]/10 rounded-3xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#00529C]/10 rounded-3xl -z-10" />
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50">
              <img 
                src={content?.image_url || "https://images.unsplash.com/photo-1600880212340-053459a11210?auto=format&fit=crop&q=80&w=1000"} 
                alt="Tentang Kami" 
                className="w-full h-[480px] object-cover"
              />
              {/* Overlay card at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#4CAF50] rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0">✓</div>
                    <div>
                      <p className="text-white font-bold text-base">Koperasi Modern Berbasis Digital</p>
                      <p className="text-white/60 text-sm">Melayani anggota dengan teknologi terkini</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;
