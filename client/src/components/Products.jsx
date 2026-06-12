import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiArrowRight, HiXMark } from 'react-icons/hi2';

const Products = ({ products, content }) => {
  const displayProducts = products || [];
  const [activeCategory, setActiveCategory] = useState('layanan');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Group products by category
  const produkFisik = displayProducts.filter(p => !p.category || p.category === 'produk');
  const layananPembiayaan = displayProducts.filter(p => p.category === 'layanan');

  const activeProducts = activeCategory === 'produk' ? produkFisik : layananPembiayaan;

  return (
    <section id="products" className="py-24 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #001a3d 0%, #002d6b 40%, #003a1a 75%, #004d22 100%)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-block bg-[#4CAF50]/20 border border-[#4CAF50]/40 rounded-full px-5 py-2 mb-6">
              <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
                {content?.subtitle || 'Produk & Layanan'}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              {content?.title || 'Kami memfasilitasi hari ini untuk langkah cepat esok hari'}
            </h3>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-md text-base leading-relaxed md:pb-2"
          >
            Temukan solusi simpanan dan pembiayaan yang sesuai dengan kebutuhan Anda di koperasi kami.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          <button
            onClick={() => setActiveCategory('produk')}
            className={`px-8 py-3 rounded-full font-bold text-sm tracking-wider transition-all duration-300 border-2 ${
              activeCategory === 'produk' 
                ? 'bg-[#00529C] text-white border-[#00529C] shadow-lg' 
                : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:border-white/40'
            }`}
          >
            Produk
          </button>
          <button
            onClick={() => setActiveCategory('layanan')}
            className={`px-8 py-3 rounded-full font-bold text-sm tracking-wider transition-all duration-300 border-2 ${
              activeCategory === 'layanan' 
                ? 'bg-[#4CAF50] text-white border-[#4CAF50] shadow-lg' 
                : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:border-white/40'
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
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {activeProducts.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative bg-white/8 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/15 shadow-lg hover:bg-white/12 hover:border-[#4CAF50]/30 transition-all duration-500 h-full flex flex-col hover:-translate-y-1">
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
                        <p className="text-white/70 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <span className="text-[#4CAF50] font-bold text-sm group-hover:text-white transition-colors">
                            Lihat Lebih Lanjut
                          </span>
                          <div className="w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center group-hover:bg-[#00529C] transition-all duration-300 group-hover:translate-x-1">
                            <HiArrowRight className="text-white" size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 md:py-16 bg-white/5 rounded-3xl border border-white/15">
                <div className="text-white/40 text-base md:text-lg">
                  {activeCategory === 'produk' 
                    ? 'Belum ada produk yang ditambahkan.' 
                    : 'Belum ada layanan pembiayaan yang ditambahkan.'}
                </div>
                <p className="text-white/30 text-sm mt-2">Tambahkan melalui Admin Panel.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#001a3d] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-colors"
              >
                <HiXMark size={24} />
              </button>

              {/* Image Header */}
              <div className="relative h-64 sm:h-80 shrink-0">
                <img
                  src={selectedProduct.image_url || `https://placehold.co/800x600/00529C/ffffff?text=${encodeURIComponent(selectedProduct.name)}`}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001a3d] via-[#001a3d]/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-[#4CAF50] inline-block text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                    {selectedProduct.category === 'produk' ? 'Produk' : 'Layanan'}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight drop-shadow-md">
                    {selectedProduct.name}
                  </h3>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 sm:p-8 overflow-y-auto scrollbar-hide flex-1 text-white/80 leading-relaxed bg-[#001a3d]">
                <p className="whitespace-pre-wrap text-base sm:text-lg">
                  {selectedProduct.description}
                </p>
                
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <p className="text-sm text-white/50 text-center sm:text-left">
                    Tertarik dengan {selectedProduct.category === 'produk' ? 'produk' : 'layanan'} ini?
                  </p>
                  <a 
                    href="/#contact"
                    onClick={() => setSelectedProduct(null)}
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#00529C] to-[#4CAF50] text-white font-bold rounded-full text-center hover:scale-105 transition-transform"
                  >
                    Hubungi Kami
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Products;
