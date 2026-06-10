import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCalendar, HiClock, HiXMark } from 'react-icons/hi2';

const News = ({ news }) => {
  const newsList = news || [];
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = ['Semua', 'Promo', 'Kegiatan', 'Pengumuman'];

  // Filter news based on selected tab
  const filteredNews = selectedCategory === 'Semua' 
    ? newsList 
    : newsList.filter(item => item.category === selectedCategory);

  // Helper to format date
  const formatDate = (dateStr) => {
    try {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateStr).toLocaleDateString('id-ID', options);
    } catch (e) {
      return dateStr;
    }
  };

  // Helper to calculate reading time
  const calculateReadTime = (text) => {
    if (!text) return '1 min baca';
    const words = text.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 150)); // 150 words per minute
    return `${minutes} min baca`;
  };

  return (
    <section id="news" className="py-24 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #002050 0%, #003080 35%, #003d20 70%, #005028 100%)'}}>
      
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-0 w-[500px] h-[500px] rounded-full bg-[#4CAF50]/15 blur-[100px]" />
        <div className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-full bg-[#00529C]/20 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/3 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-[#4CAF50]/20 border border-[#4CAF50]/40 rounded-full px-5 py-2 mb-6">
              <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
                Berita & Kegiatan
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Highlight Informasi <span className="text-[#4CAF50]">KMMA</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Ikuti terus perkembangan, kegiatan sosial, promo produk pembiayaan, dan pengumuman resmi dari Koperasi Astra KMMA.
            </p>
          </motion.div>
        </div>

        {/* Categories Tabs Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider transition-all uppercase ${
                selectedCategory === cat
                  ? 'bg-[#4CAF50] text-white shadow-lg scale-105'
                  : 'bg-white/10 text-white/80 border border-white/20 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredNews.length > 0 ? (
              filteredNews.map((item, index) => (
                <motion.div
                  layout
                  key={item.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => setSelectedArticle(item)}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md shadow-slate-100 hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 cursor-pointer flex flex-col h-full hover:-translate-y-1"
                >
                  {/* Thumbnail */}
                  <div className="relative h-52 overflow-hidden bg-slate-100 shrink-0">
                    {item.image_url ? (
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#00529C]/10 to-[#4CAF50]/10 flex items-center justify-center text-[#00529C] font-black text-xl">
                        KMMA News
                      </div>
                    )}
                    <span className={`absolute top-4 left-4 text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full text-white shadow-md z-10 ${
                      item.category === 'Promo' ? 'bg-[#4CAF50]' : 
                      item.category === 'Kegiatan' ? 'bg-[#00529C]' : 'bg-[#eab308]'
                    }`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta info */}
                      <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <HiCalendar size={13} />
                          {formatDate(item.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <HiClock size={13} />
                          {calculateReadTime(item.content)}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-800 line-clamp-2 leading-snug mb-3 group-hover:text-[#00529C] transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-3 mb-6">
                        {item.content}
                      </p>
                    </div>

                    <span className="text-[#00529C] text-sm font-bold flex items-center gap-1 group-hover:underline">
                      Baca Selengkapnya &rarr;
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-white/15 text-white/50">
                Belum ada berita dalam kategori {selectedCategory}.
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white w-full max-w-3xl max-h-[80vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col border border-slate-100"
            >
              {/* Modal Header Actions */}
              <div className="flex justify-between items-center px-8 py-4 border-b border-slate-100 shrink-0 bg-slate-50">
                <span className={`text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full text-white ${
                  selectedArticle.category === 'Promo' ? 'bg-[#4CAF50]' : 
                  selectedArticle.category === 'Kegiatan' ? 'bg-[#00529C]' : 'bg-[#eab308]'
                }`}>
                  {selectedArticle.category}
                </span>
                
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="w-8 h-8 bg-slate-200/50 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors"
                >
                  <HiXMark size={18} />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="overflow-y-auto p-6 md:p-10 space-y-5 flex-1">
                {/* Meta details */}
                <div className="flex items-center gap-5 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <HiCalendar size={14} />
                    {formatDate(selectedArticle.created_at)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <HiClock size={14} />
                    {calculateReadTime(selectedArticle.content)}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-3xl font-black text-slate-800 leading-tight">
                  {selectedArticle.title}
                </h2>

                {/* Big Image Banner */}
                {selectedArticle.image_url && (
                  <div className="rounded-2xl overflow-hidden shadow-sm max-h-[300px] bg-slate-50">
                    <img 
                      src={selectedArticle.image_url} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content body */}
                <div className="prose prose-sm md:prose-base max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap pt-2">
                  {selectedArticle.content}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-8 py-4 border-t border-slate-100 bg-slate-50 flex justify-end shrink-0">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 bg-[#00529C] hover:bg-[#003d75] text-white rounded-xl text-xs md:text-sm font-bold transition-all"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default News;
