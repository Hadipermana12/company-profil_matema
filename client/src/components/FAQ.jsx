import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const displayFaqs = faqs || [];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-block bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-full px-5 py-2 mb-6">
            <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
              FAQ
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-[#00529C]">
            Pertanyaan yang Sering Diajukan
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
              <div className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                openIndex === index 
                  ? 'border-[#00529C]/20 bg-[#00529C]/[0.03] shadow-lg shadow-blue-900/5' 
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4"
                >
                  <span className={`font-bold text-base transition-colors ${
                    openIndex === index ? 'text-[#00529C]' : 'text-slate-700'
                  }`}>
                    {faq.question}
                  </span>
                  <span className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-[#00529C] text-white rotate-180' 
                      : 'bg-slate-100 text-slate-500'
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
                      <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
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
