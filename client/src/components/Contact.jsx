import { HiEnvelope, HiPhone, HiMapPin, HiPaperAirplane } from 'react-icons/hi2';
import { motion } from 'framer-motion';

const Contact = ({ settings }) => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #001f4d 0%, #002f70 40%, #003d20 75%, #004d28 100%)'}}>
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00529C]/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#4CAF50]/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#00b4d8]/8 blur-[80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-block bg-[#4CAF50]/20 border border-[#4CAF50]/40 rounded-full px-5 py-2 mb-6">
            <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
              Hubungi Kami
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ada <span className="text-[#4CAF50]">Pertanyaan?</span>
          </h3>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Tim kami siap membantu Anda. Hubungi kami melalui saluran berikut.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Phone Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="bg-white/8 backdrop-blur-sm rounded-3xl p-8 border border-white/15 shadow-lg hover:bg-white/12 hover:border-[#4CAF50]/40 transition-all group"
          >
            <div className="w-14 h-14 bg-[#00529C]/40 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#00529C] transition-colors">
              <HiPhone size={26} className="text-white" />
            </div>
            <h4 className="font-bold text-white text-lg mb-2">Telepon</h4>
            <p className="text-white/60 text-sm">{settings?.contact_phone || '+62 21 1234 5678'}</p>
          </motion.div>

          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/8 backdrop-blur-sm rounded-3xl p-8 border border-white/15 shadow-lg hover:bg-white/12 hover:border-[#4CAF50]/40 transition-all group"
          >
            <div className="w-14 h-14 bg-[#4CAF50]/30 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#4CAF50] transition-colors">
              <HiEnvelope size={26} className="text-white" />
            </div>
            <h4 className="font-bold text-white text-lg mb-2">Email</h4>
            <p className="text-white/60 text-sm">{settings?.contact_email || 'info@kmma.co.id'}</p>
          </motion.div>

          {/* Address Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/8 backdrop-blur-sm rounded-3xl p-8 border border-white/15 shadow-lg hover:bg-white/12 hover:border-[#4CAF50]/40 transition-all group"
          >
            <div className="w-14 h-14 bg-[#00529C]/40 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#00529C] transition-colors">
              <HiMapPin size={26} className="text-white" />
            </div>
            <h4 className="font-bold text-white text-lg mb-2">Alamat Kantor</h4>
            <p className="text-white/60 text-sm">{settings?.contact_address || 'Jl. Raya Koperasi No. 123, Jakarta Selatan'}</p>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/8 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/15 shadow-lg max-w-3xl mx-auto"
        >
          <h4 className="text-xl font-bold text-white mb-6 text-center">Kirim <span className="text-[#4CAF50]">Pesan</span></h4>
          <form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/80 text-sm font-bold mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Masukkan nama Anda"
                  className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 transition-all text-sm text-white placeholder-white/30"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 transition-all text-sm text-white placeholder-white/30"
                />
              </div>
            </div>
            <div>
              <label className="block text-white/80 text-sm font-bold mb-2">Pesan</label>
              <textarea
                rows="4"
                placeholder="Tuliskan pesan Anda..."
                className="w-full px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 transition-all text-sm text-white placeholder-white/30"
              ></textarea>
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-[#00529C] to-[#4CAF50] text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-lg active:scale-[0.98]">
              <HiPaperAirplane size={20} />
              Kirim Pesan
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
