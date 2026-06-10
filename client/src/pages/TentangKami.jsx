import { motion } from 'framer-motion';

const TentangKami = ({ content }) => {
  const sejarah = content?.sections?.tentang_sejarah;
  const struktur = content?.sections?.tentang_struktur;

  return (
    <div className="pt-20 sm:pt-24 lg:pt-32 pb-16 md:pb-24 min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(135deg, #001a3d 0%, #002d6b 35%, #003a1a 70%, #004d22 100%)'}}>
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-[#00529C]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-[#4CAF50]/12 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Sejarah Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-[#4CAF50]/20 border border-[#4CAF50]/40 rounded-full px-5 py-2 mb-5 md:mb-6">
              <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
                {sejarah?.subtitle || 'Sejarah Kami'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 md:mb-8 leading-tight">
              {sejarah?.title || 'Perjalanan'}{' '}
              <span className="text-[#4CAF50]">KMMA</span>
            </h1>
            <div className="text-white/75 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
              {sejarah?.content || 'Belum ada data sejarah.'}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src={sejarah?.image_url || 'https://placehold.co/800x600/00529C/ffffff?text=Sejarah+KMMA'} 
              alt="Sejarah KMMA"
              className="w-full h-auto max-h-[280px] md:max-h-none rounded-2xl md:rounded-3xl shadow-2xl object-cover"
            />
          </motion.div>
        </div>

        {/* Struktur Organisasi Section */}
        <div className="pt-12 md:pt-16 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <div className="inline-block bg-[#4CAF50]/20 border border-[#4CAF50]/40 rounded-full px-5 py-2 mb-6">
              <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
                {struktur?.subtitle || 'Tim Pengurus'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
              {struktur?.title || 'Struktur'}{' '}
              <span className="text-[#4CAF50]">Organisasi</span>
            </h2>
            <div className="text-white/70 max-w-3xl mx-auto whitespace-pre-wrap leading-relaxed text-sm md:text-base">
              {struktur?.content || 'Dipimpin oleh para profesional yang berdedikasi tinggi dan berpengalaman dalam industri keuangan dan pemberdayaan masyarakat.'}
            </div>
          </motion.div>

          {/* Org Chart â€” Mobile: card list, Desktop: tree */}
          <div className="max-w-4xl mx-auto pb-12 md:pb-16">

            {/* Mobile Org Chart (vertical cards) */}
            <div className="flex flex-col gap-4 md:hidden">
              {[
                { name: 'Budi Santoso', role: 'Kepala Koperasi', color: 'from-[#00529C] to-[#003d75]', badge: true },
                { name: 'Diana Sari', role: 'Sekretaris', color: 'from-white/10 to-white/5', badge: false },
                { name: 'Siti Aminah', role: 'Ketua Koperasi', color: 'from-white/10 to-white/5', badge: false },
                { name: 'Rina Kusuma', role: 'Admin', color: 'from-white/10 to-white/5', badge: false },
                { name: 'Dimas A.', role: 'Staf', color: 'from-[#4CAF50]/20 to-[#4CAF50]/10', badge: false },
                { name: 'Rizky P.', role: 'Staf', color: 'from-[#4CAF50]/20 to-[#4CAF50]/10', badge: false },
                { name: 'Nadia W.', role: 'Staf', color: 'from-[#4CAF50]/20 to-[#4CAF50]/10', badge: false },
              ].map((person, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`bg-gradient-to-r ${person.color} border border-white/20 rounded-2xl px-5 py-4 flex items-center justify-between backdrop-blur-sm`}
                >
                  <div>
                    <p className="font-bold text-white text-base">{person.name}</p>
                    <p className={`text-xs font-bold uppercase tracking-wider mt-0.5 ${person.badge ? 'text-[#4CAF50]' : 'text-white/50'}`}>{person.role}</p>
                  </div>
                  {person.badge && (
                    <div className="bg-[#4CAF50]/20 border border-[#4CAF50]/40 rounded-full px-3 py-1">
                      <span className="text-[#4CAF50] text-[10px] font-black uppercase">Pimpinan</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Desktop Org Chart (tree view) */}
            <div className="hidden md:flex flex-col items-center">
              {/* Level 1: Kepala Koperasi */}
              <div className="relative flex flex-col items-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-[#00529C] to-[#003d75] px-10 py-5 rounded-2xl shadow-xl shadow-black/30 border border-white/20 text-center w-64 z-10"
                >
                  <h3 className="font-black text-white text-xl mb-1">Budi Santoso</h3>
                  <p className="text-[#4CAF50] text-sm font-bold uppercase tracking-wider">Kepala Koperasi</p>
                </motion.div>
                <div className="w-0.5 h-10 bg-white/20"></div>
              </div>

              {/* Level 2 Container */}
              <div className="relative flex justify-center w-[600px]">
                <div className="absolute top-0 left-[25%] right-[25%] h-0.5 bg-white/20"></div>
                
                <div className="flex w-full justify-between relative">
                  {/* Sekretaris Branch */}
                  <div className="flex flex-col items-center w-1/2">
                    <div className="w-0.5 h-8 bg-white/20"></div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="bg-white/10 backdrop-blur-sm px-8 py-5 rounded-2xl shadow-lg border border-white/20 text-center w-56 z-10 hover:bg-white/15 transition-colors"
                    >
                      <h3 className="font-bold text-white text-lg mb-1">Diana Sari</h3>
                      <p className="text-white/50 text-xs font-bold uppercase tracking-wider">Sekretaris</p>
                    </motion.div>
                  </div>

                  {/* Ketua Branch */}
                  <div className="flex flex-col items-center w-1/2 relative">
                    <div className="w-0.5 h-8 bg-white/20"></div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/10 backdrop-blur-sm px-8 py-5 rounded-2xl shadow-lg border border-white/20 text-center w-56 z-10 hover:bg-white/15 transition-colors"
                    >
                      <h3 className="font-bold text-white text-lg mb-1">Siti Aminah</h3>
                      <p className="text-white/50 text-xs font-bold uppercase tracking-wider">Ketua Koperasi</p>
                    </motion.div>
                    
                    <div className="w-0.5 h-10 bg-white/20"></div>

                    {/* Level 3: Admin */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/10 backdrop-blur-sm px-8 py-5 rounded-2xl shadow-lg border border-white/20 text-center w-56 z-10 hover:bg-white/15 transition-colors"
                    >
                      <h3 className="font-bold text-white text-lg mb-1">Rina Kusuma</h3>
                      <p className="text-white/50 text-xs font-bold uppercase tracking-wider">Admin</p>
                    </motion.div>

                    <div className="w-0.5 h-10 bg-white/20 relative"></div>

                    {/* Level 4: Staf */}
                    <div className="relative flex justify-center w-[480px]">
                      <div className="absolute top-0 left-[16.66%] right-[16.66%] h-0.5 bg-white/20"></div>
                      
                      <div className="flex w-full justify-between">
                        {[{name:'Dimas A.'},{name:'Rizky P.'},{name:'Nadia W.'}].map((staf, i) => (
                          <div key={i} className="flex flex-col items-center w-1/3">
                            <div className="w-0.5 h-6 bg-white/20"></div>
                            <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 + i * 0.1 }}
                              className="bg-[#4CAF50]/20 backdrop-blur-sm px-4 py-4 rounded-xl shadow-md border border-[#4CAF50]/30 text-center w-32 hover:bg-[#4CAF50]/30 transition-colors"
                            >
                              <h3 className="font-bold text-white text-[15px] mb-1">{staf.name}</h3>
                              <p className="text-[#4CAF50] text-[10px] font-bold uppercase tracking-wider">Staf</p>
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TentangKami;

