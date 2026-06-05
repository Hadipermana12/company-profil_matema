import { motion } from 'framer-motion';

const TentangKami = ({ content }) => {
  const sejarah = content?.sections?.tentang_sejarah;
  const struktur = content?.sections?.tentang_struktur;

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sejarah Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-full px-5 py-2 mb-6">
              <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
                {sejarah?.subtitle || 'Sejarah Kami'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#00529C] mb-8 leading-tight">
              {sejarah?.title || 'Perjalanan KMMA'}
            </h1>
            <div className="prose prose-lg text-slate-600 whitespace-pre-wrap">
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
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Struktur Organisasi Section */}
        <div className="pt-16 border-t border-slate-100">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-full px-5 py-2 mb-6">
              <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
                {struktur?.subtitle || 'Tim Pengurus'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#00529C] mb-6 leading-tight">
              {struktur?.title || 'Struktur Organisasi'}
            </h2>
            <div className="prose prose-lg text-slate-600 max-w-3xl mx-auto whitespace-pre-wrap">
              {struktur?.content || 'Dipimpin oleh para profesional yang berdedikasi tinggi dan berpengalaman dalam industri keuangan dan pemberdayaan masyarakat.'}
            </div>
          </motion.div>

          {/* Org Chart UI (No Photos) */}
          <div className="max-w-4xl mx-auto pt-8 pb-16 flex flex-col items-center">
            
            {/* Level 1: Kepala Koperasi */}
            <div className="relative flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white px-10 py-5 rounded-2xl shadow-xl shadow-slate-200/50 border-2 border-[#00529C]/10 text-center w-64 z-10"
              >
                <h3 className="font-black text-[#00529C] text-xl mb-1">Budi Santoso</h3>
                <p className="text-[#4CAF50] text-sm font-bold uppercase tracking-wider">Kepala Koperasi</p>
              </motion.div>
              {/* Line going down from Kepala */}
              <div className="w-0.5 h-10 bg-[#00529C]/20"></div>
            </div>

            {/* Level 2 Container (Sekretaris & Ketua) */}
            <div className="relative flex justify-center w-[600px]">
              {/* Horizontal connecting line */}
              <div className="absolute top-0 left-[25%] right-[25%] h-0.5 bg-[#00529C]/20"></div>
              
              <div className="flex w-full justify-between relative">
                {/* Sekretaris Branch */}
                <div className="flex flex-col items-center w-1/2">
                  <div className="w-0.5 h-8 bg-[#00529C]/20"></div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-white px-8 py-5 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 text-center w-56 z-10"
                  >
                    <h3 className="font-bold text-[#00529C] text-lg mb-1">Diana Sari</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Sekretaris</p>
                  </motion.div>
                </div>

                {/* Ketua Branch */}
                <div className="flex flex-col items-center w-1/2 relative">
                  <div className="w-0.5 h-8 bg-[#00529C]/20"></div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-white px-8 py-5 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 text-center w-56 z-10"
                  >
                    <h3 className="font-bold text-[#00529C] text-lg mb-1">Siti Aminah</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Ketua Koperasi</p>
                  </motion.div>
                  
                  {/* Line going down from Ketua */}
                  <div className="w-0.5 h-10 bg-[#00529C]/20"></div>

                  {/* Level 3: Admin (Under Ketua) */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-white px-8 py-5 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 text-center w-56 z-10"
                  >
                    <h3 className="font-bold text-[#00529C] text-lg mb-1">Rina Kusuma</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Admin</p>
                  </motion.div>

                  {/* Line going down from Admin */}
                  <div className="w-0.5 h-10 bg-[#00529C]/20 relative"></div>

                  {/* Level 4 Container (3 Staf under Admin) */}
                  <div className="relative flex justify-center w-[480px]">
                    {/* Horizontal connecting line for Stafs */}
                    <div className="absolute top-0 left-[16.66%] right-[16.66%] h-0.5 bg-[#00529C]/20"></div>
                    
                    <div className="flex w-full justify-between">
                      {/* Staf 1 */}
                      <div className="flex flex-col items-center w-1/3">
                        <div className="w-0.5 h-6 bg-[#00529C]/20"></div>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                          className="bg-white px-4 py-4 rounded-xl shadow-md border border-slate-100 text-center w-32"
                        >
                          <h3 className="font-bold text-[#00529C] text-[15px] mb-1">Dimas A.</h3>
                          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Staf</p>
                        </motion.div>
                      </div>

                      {/* Staf 2 */}
                      <div className="flex flex-col items-center w-1/3">
                        <div className="w-0.5 h-6 bg-[#00529C]/20"></div>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 }}
                          className="bg-white px-4 py-4 rounded-xl shadow-md border border-slate-100 text-center w-32"
                        >
                          <h3 className="font-bold text-[#00529C] text-[15px] mb-1">Rizky P.</h3>
                          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Staf</p>
                        </motion.div>
                      </div>

                      {/* Staf 3 */}
                      <div className="flex flex-col items-center w-1/3">
                        <div className="w-0.5 h-6 bg-[#00529C]/20"></div>
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 }}
                          className="bg-white px-4 py-4 rounded-xl shadow-md border border-slate-100 text-center w-32"
                        >
                          <h3 className="font-bold text-[#00529C] text-[15px] mb-1">Nadia W.</h3>
                          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Staf</p>
                        </motion.div>
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
