import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';

const Pinjaman = ({ content }) => {
  const pinjaman = content?.sections?.pinjaman_page;
  const layananProducts = content?.products?.filter(p => p.category === 'layanan') || [];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-full px-5 py-2 mb-6">
              <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
                {pinjaman?.subtitle || 'Layanan Pembiayaan'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#00529C] mb-8 leading-tight">
              {pinjaman?.title || 'Pinjaman KMMA'}
            </h1>
            <div className="prose prose-lg text-slate-600 whitespace-pre-wrap mb-8">
              {pinjaman?.content || 'Layanan pinjaman koperasi kami dirancang untuk membantu anggota mencapai tujuan finansial mereka.'}
            </div>
            <a 
              href="#daftar-pinjaman"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#00529C] text-white rounded-full font-bold text-base hover:bg-[#003d75] transition-all hover:-translate-y-1 shadow-lg shadow-blue-900/20"
            >
              Lihat Produk Pinjaman
              <HiArrowRight size={18} />
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img 
              src={pinjaman?.image_url || 'https://placehold.co/800x800/00529C/ffffff?text=Pinjaman+KMMA'} 
              alt="Pinjaman KMMA"
              className="w-full h-auto rounded-3xl shadow-2xl object-cover"
            />
          </motion.div>
        </div>

        {/* Product List */}
        <div id="daftar-pinjaman" className="pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-black text-[#00529C] mb-4">Produk Pembiayaan Kami</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Pilih produk pinjaman yang paling sesuai dengan kebutuhan Anda saat ini.</p>
          </motion.div>

          {layananProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {layananProducts.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group cursor-pointer"
                >
                  <div className="relative bg-slate-50 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/80 transition-all duration-500 h-full flex flex-col border border-slate-200">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={product.image_url || `https://placehold.co/600x400/00529C/ffffff?text=${encodeURIComponent(product.name)}`} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00529C]/90 via-[#00529C]/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h4 className="text-xl font-black text-white leading-tight drop-shadow-lg">
                          {product.name}
                        </h4>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                        {product.description}
                      </p>
                      {/* Action button removed for informational mode */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="text-slate-400 text-lg">Belum ada produk layanan pembiayaan yang tersedia.</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Pinjaman;
