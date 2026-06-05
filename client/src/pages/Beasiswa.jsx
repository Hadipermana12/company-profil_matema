import { motion } from 'framer-motion';

const Beasiswa = ({ content }) => {
  const beasiswa = content?.sections?.beasiswa_page;
  const pengumuman = content?.sections?.beasiswa_pengumuman;

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-full px-5 py-2 mb-6">
              <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
                {beasiswa?.subtitle || 'Beasiswa Pendidikan'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#00529C] mb-8 leading-tight">
              {beasiswa?.title || 'Program Beasiswa KMMA'}
            </h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl overflow-hidden shadow-2xl mb-16 relative"
        >
          <img 
            src={beasiswa?.image_url || 'https://placehold.co/1200x600/00529C/ffffff?text=Beasiswa+KMMA'} 
            alt="Beasiswa KMMA"
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="prose prose-lg text-slate-600 whitespace-pre-wrap bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
            {beasiswa?.content || 'Belum ada informasi beasiswa.'}
          </div>
        </motion.div>

        {/* Announcement Section */}
        {pengumuman && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-4xl mx-auto mt-16"
          >
            <div className="bg-gradient-to-br from-[#00529C] to-[#0072bc] rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
              {/* Glow blobs */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#4CAF50]/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#4CAF50]/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="inline-block bg-[#4CAF50] text-white text-xs font-bold uppercase tracking-wider rounded-full px-4 py-1.5 mb-6 shadow-md">
                  {pengumuman.subtitle || 'Penerima Beasiswa'}
                </div>
                
                <h2 className="text-2xl md:text-3xl font-black mb-6 drop-shadow-md">
                  {pengumuman.title || 'Pengumuman Lolntos Seleksi'}
                </h2>
                
                <div className="prose prose-invert max-w-none text-white/90 whitespace-pre-wrap leading-relaxed">
                  {pengumuman.content || 'Daftar pengumuman lolos seleksi beasiswa sedang dipersiapkan.'}
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Beasiswa;
