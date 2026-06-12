import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const displayFaqs = faqs || [];

  return (
    <section id="faq" className="py-24 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #002a5c 0%, #003d75 35%, #004d30 70%, #006640 100%)'}} data-aos="fade-up" data-aos-duration="1000">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#4CAF50]/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00529C]/20 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-block bg-[#4CAF50]/20 border border-[#4CAF50]/40 rounded-full px-5 py-2 mb-6">
            <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
              FAQ
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white">
            Pertanyaan yang{' '}
            <span className="text-[#4CAF50]">Sering Diajukan</span>
          </h3>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {displayFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? 'border-[#4CAF50]/40 bg-white/10 shadow-lg shadow-black/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20'
              }`}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
                >
                  <span className={`font-bold text-base transition-colors ${
                    openIndex === index ? 'text-[#4CAF50]' : 'text-white'
                  }`}>
                    {faq.question}
                  </span>
                  <span className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-[#4CAF50] text-white rotate-180'
                      : 'bg-white/10 text-white/60'
                  }`}>
                    <HiChevronDown size={18} />
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-white/75 leading-relaxed border-t border-white/10 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
