import { HiEnvelope, HiPhone, HiMapPin, HiPaperAirplane } from 'react-icons/hi2';
import { motion } from 'framer-motion';

const Contact = ({ settings }) => {
  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-block bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-full px-5 py-2 mb-6">
            <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
              Hubungi Kami
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-[#00529C] mb-4">
            Ada Pertanyaan?
          </h3>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
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
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg shadow-slate-100/80 hover:shadow-xl hover:border-[#00529C]/10 transition-all group"
          >
            <div className="w-14 h-14 bg-[#00529C]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#00529C] transition-colors">
              <HiPhone size={26} className="text-[#00529C] group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-bold text-[#00529C] text-lg mb-2">Telepon</h4>
            <p className="text-slate-600 text-sm">{settings?.contact_phone || '+62 21 1234 5678'}</p>
          </motion.div>

          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg shadow-slate-100/80 hover:shadow-xl hover:border-[#4CAF50]/10 transition-all group"
          >
            <div className="w-14 h-14 bg-[#4CAF50]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#4CAF50] transition-colors">
              <HiEnvelope size={26} className="text-[#4CAF50] group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-bold text-[#00529C] text-lg mb-2">Email</h4>
            <p className="text-slate-600 text-sm">{settings?.contact_email || 'info@kmma.co.id'}</p>
          </motion.div>

          {/* Address Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg shadow-slate-100/80 hover:shadow-xl hover:border-[#00529C]/10 transition-all group"
          >
            <div className="w-14 h-14 bg-[#00529C]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#00529C] transition-colors">
              <HiMapPin size={26} className="text-[#00529C] group-hover:text-white transition-colors" />
            </div>
            <h4 className="font-bold text-[#00529C] text-lg mb-2">Alamat Kantor</h4>
            <p className="text-slate-600 text-sm">{settings?.contact_address || 'Jl. Raya Koperasi No. 123, Jakarta Selatan'}</p>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-lg shadow-slate-100/80 max-w-3xl mx-auto"
        >
          <h4 className="text-xl font-bold text-[#00529C] mb-6 text-center">Kirim Pesan</h4>
          <form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-slate-700 text-sm font-bold mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama Anda"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00529C] focus:ring-2 focus:ring-[#00529C]/10 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-slate-700 text-sm font-bold mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="Masukkan email Anda"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00529C] focus:ring-2 focus:ring-[#00529C]/10 transition-all text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-700 text-sm font-bold mb-2">Pesan</label>
              <textarea 
                rows="4"
                placeholder="Tuliskan pesan Anda..."
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00529C] focus:ring-2 focus:ring-[#00529C]/10 transition-all text-sm"
              ></textarea>
            </div>
            <button className="w-full py-4 bg-[#00529C] text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#003d75] transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 active:scale-[0.98]">
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
