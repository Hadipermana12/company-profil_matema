import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiArrowRight } from 'react-icons/hi2';

const Products = ({ products, content }) => {
  const displayProducts = products || [];
  const [activeCategory, setActiveCategory] = useState('produk');

  // Group products by category
  const produkFisik = displayProducts.filter(p => !p.category || p.category === 'produk');
  const layananPembiayaan = displayProducts.filter(p => p.category === 'layanan');

  const activeProducts = activeCategory === 'produk' ? produkFisik : layananPembiayaan;

  return (
    <section id="products" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-block bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-full px-5 py-2 mb-6">
              <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
                {content?.subtitle || 'Produk & Layanan'}
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#00529C] leading-tight">
              {content?.title || 'Kami memfasilitasi hari ini untuk langkah cepat esok hari'}
            </h3>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 max-w-md text-base leading-relaxed md:pb-2"
          >
            Temukan solusi simpanan dan pinjaman yang sesuai dengan kebutuhan Anda di koperasi kami.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 mb-12">
          <button
            onClick={() => setActiveCategory('produk')}
            className={`px-8 py-3 rounded-full font-bold text-sm tracking-wider transition-all duration-300 border-2 ${
              activeCategory === 'produk' 
                ? 'bg-[#00529C] text-white border-[#00529C] shadow-lg shadow-blue-900/20' 
                : 'bg-white text-[#00529C] border-[#00529C]/20 hover:border-[#00529C]/50'
            }`}
          >
            Produk
          </button>
          <button
            onClick={() => setActiveCategory('layanan')}
            className={`px-8 py-3 rounded-full font-bold text-sm tracking-wider transition-all duration-300 border-2 ${
              activeCategory === 'layanan' 
                ? 'bg-[#00529C] text-white border-[#00529C] shadow-lg shadow-blue-900/20' 
                : 'bg-white text-[#00529C] border-[#00529C]/20 hover:border-[#00529C]/50'
            }`}
          >
            Layanan Pembiayaan
          </button>
        </div>

        {/* Product Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeProducts.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/80 hover:shadow-xl hover:shadow-slate-300/80 transition-all duration-500 h-full flex flex-col border border-slate-100">
                      {/* Image Area */}
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={product.image_url || `https://placehold.co/600x400/00529C/ffffff?text=${encodeURIComponent(product.name)}`} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00529C]/80 via-[#00529C]/20 to-transparent" />
                        
                        {/* Category badge */}
                        <div className="absolute top-4 left-4 bg-[#4CAF50] text-white text-[11px] font-bold px-4 py-1.5 rounded-full tracking-wider uppercase">
                          {activeCategory === 'produk' ? 'Produk' : 'Layanan'}
                        </div>

                        {/* Title on image */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h4 className="text-xl font-black text-white leading-tight drop-shadow-lg">
                            {product.name}
                          </h4>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <span className="text-[#00529C] font-bold text-sm group-hover:text-[#4CAF50] transition-colors">
                            Lihat Lebih Lanjut
                          </span>
                          <div className="w-10 h-10 bg-[#00529C] rounded-full flex items-center justify-center group-hover:bg-[#4CAF50] transition-all duration-300 group-hover:translate-x-1">
                            <HiArrowRight className="text-white" size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
                <div className="text-slate-400 text-lg">
                  {activeCategory === 'produk' 
                    ? 'Belum ada produk yang ditambahkan.' 
                    : 'Belum ada layanan pembiayaan yang ditambahkan.'}
                </div>
                <p className="text-slate-400 text-sm mt-2">Tambahkan melalui Admin Panel.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Products;
