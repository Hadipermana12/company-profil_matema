import { motion } from 'framer-motion';
import { HiUsers, HiUser, HiCheckCircle, HiCog8Tooth, HiBriefcase, HiShoppingCart, HiHome, HiChartBar } from 'react-icons/hi2';

const TentangKami = ({ content }) => {
  const sejarah = content?.sections?.tentang_sejarah;
  const struktur = content?.sections?.tentang_struktur;

  const defaultOrgData = {
    dewan_penasehat: [
      "Evi Sulistyorini",
      "Noer Rachman E"
    ],
    dewan_pengurus: [
      { role: "Ketua", name: "Arif TW" },
      { role: "Sekretaris", name: "Hendro W" },
      { role: "Bendahara", name: "Anindita Irnilaningtyas" }
    ],
    dewan_pengawas: [
      "Putu RS",
      "Dian Krisita",
      "Dian H"
    ],
    units: [
      { title: "SOSIAL & KEANGGOTAAN", name: "Tumarni" },
      { title: "UNIT PEMBIAYAAN & OPERASIONAL ASSET", name: "Slamet W" },
      { title: "UNIT METEMA", name: "Aditya AH" },
      { title: "UNIT PENGEMBANGAN BISNIS", name: "Tri Laksana Saputra" },
      { title: "UNIT RETAIL & COMMERCIAL", name: "Arkhi Nur Cahyono" }
    ],
    retail_sub: {
      kepala_toko: "Agus",
      admin: "Fadlan",
      kasir: [
        "Rohim",
        "Rahmat",
        "Hermansyah"
      ]
    }
  };

  let orgData = defaultOrgData;
  try {
    const raw = content?.sections?.tentang_struktur_data?.content;
    if (raw) {
      orgData = typeof raw === 'string' ? JSON.parse(raw) : raw;
    }
  } catch (e) {
    console.error("Gagal parse tentang_struktur_data:", e);
  }

  return (
    <div className="pt-20 sm:pt-24 lg:pt-32 pb-16 md:pb-24 min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #001a3d 0%, #002d6b 35%, #003a1a 70%, #004d22 100%)' }}>
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-[#00529C]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-[#4CAF50]/12 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Sejarah Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-[#4CAF50]/20 border border-[#4CAF50]/40 rounded-full px-5 py-2 mb-5 md:mb-6">
              <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
                {sejarah?.subtitle || 'Sejarah Kami'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 md:mb-8 leading-tight">
              {sejarah?.title || 'Perjalanan'}{' '}
              <span className="text-[#4CAF50]">KMMA</span>
            </h1>
            <div className="text-white/75 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
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
              className="w-full h-auto max-h-[280px] md:max-h-none rounded-2xl md:rounded-3xl shadow-2xl object-cover"
            />
          </motion.div>
        </div>

        {/* Struktur Organisasi Section */}
        <div className="pt-12 md:pt-16 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <div className="inline-block bg-[#4CAF50]/20 border border-[#4CAF50]/40 rounded-full px-5 py-2 mb-6">
              <span className="text-[#4CAF50] text-sm font-bold tracking-wider uppercase">
                {struktur?.subtitle || 'Tim Pengurus'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">
              {struktur?.title || 'Struktur'}{' '}
              <span className="text-[#4CAF50]">Organisasi</span>
            </h2>
            <div className="text-white/70 max-w-3xl mx-auto whitespace-pre-wrap leading-relaxed text-sm md:text-base">
              {struktur?.content || 'Dipimpin oleh para profesional yang berdedikasi tinggi dan berpengalaman dalam industri keuangan dan pemberdayaan masyarakat.'}
            </div>
          </motion.div>

          {/* Org Chart — Mobile: card list, Desktop: tree */}
          <div className="max-w-6xl mx-auto pb-12 md:pb-16">

            {/* Mobile Org Chart (vertical cards) */}
            <div className="flex flex-col gap-6 md:hidden text-slate-800">
              {/* 1. Rapat Anggota */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-md"
              >
                <div className="w-10 h-10 rounded-full bg-[#00529C] text-white flex items-center justify-center shrink-0">
                  <HiUsers size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#00529C] text-sm tracking-wide uppercase">RAPAT ANGGOTA</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Koperasi KMMA</p>
                </div>
              </motion.div>

              {/* Arrow spacer */}
              <div className="flex justify-center -my-3">
                <div className="w-0.5 h-6 bg-slate-300/40"></div>
              </div>

              {/* 2. Dewan Penasehat */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden"
              >
                <div className="bg-[#0b5466] px-4 py-3 flex items-center gap-2 text-white">
                  <HiUsers size={16} />
                  <span className="font-extrabold text-xs tracking-wider">DEWAN PENASEHAT</span>
                </div>
                <div className="p-4 space-y-2 text-sm bg-slate-50/50">
                  {orgData.dewan_penasehat.map((name, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700">
                      <span className="font-bold text-teal-600">{i + 1}.</span>
                      <span className="font-semibold">{name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Arrow spacer */}
              <div className="flex justify-center -my-3">
                <div className="w-0.5 h-6 bg-slate-300/40"></div>
              </div>

              {/* 3. Dewan Pengurus */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden"
              >
                <div className="bg-[#0b5466] px-4 py-3 flex items-center gap-2 text-white">
                  <HiUser size={16} />
                  <span className="font-extrabold text-xs tracking-wider">DEWAN PENGURUS</span>
                </div>
                <div className="p-4 space-y-3 text-sm bg-slate-50/50">
                  {orgData.dewan_pengurus && orgData.dewan_pengurus.length > 0 ? (
                    orgData.dewan_pengurus.map((member, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                        <span className="text-slate-500 font-medium">{member.role}</span>
                        <span className="font-extrabold text-slate-800">{member.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-slate-400 py-2 text-xs italic">Belum ada data pengurus.</div>
                  )}
                </div>
              </motion.div>

              {/* Arrow spacer */}
              <div className="flex justify-center -my-3">
                <div className="w-0.5 h-6 bg-slate-300/40"></div>
              </div>

              {/* 4. Dewan Pengawas */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden"
              >
                <div className="bg-[#2e7d32] px-4 py-3 flex items-center gap-2 text-white">
                  <HiCheckCircle size={16} />
                  <span className="font-extrabold text-xs tracking-wider">DEWAN PENGAWAS</span>
                </div>
                <div className="p-4 space-y-2 text-sm bg-slate-50/50">
                  {orgData.dewan_pengawas.map((name, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700">
                      <span className="font-bold text-green-600">{i + 1}.</span>
                      <span className="font-semibold">{name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Arrow spacer */}
              <div className="flex justify-center -my-3">
                <div className="w-0.5 h-6 bg-slate-300/40"></div>
              </div>

              {/* 5. Unit-Unit Operasional */}
              <div className="space-y-4">
                <div className="text-center py-2">
                  <span className="text-xs font-black text-white/60 uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/10">UNIT OPERASIONAL</span>
                </div>

                {orgData.units.map((unit, i) => {
                  const getUnitIcon = (index) => {
                    switch (index) {
                      case 0: return <HiUsers size={16} className="text-white" />;
                      case 1: return <HiCog8Tooth size={16} className="text-white" />;
                      case 2: return <HiChartBar size={16} className="text-white" />;
                      case 3: return <HiBriefcase size={16} className="text-white" />;
                      case 4: return <HiShoppingCart size={16} className="text-white" />;
                      default: return <HiUsers size={16} className="text-white" />;
                    }
                  };

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center shrink-0 shadow-sm">
                        {getUnitIcon(i)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-teal-600 font-extrabold uppercase tracking-wide truncate">{unit.title}</p>
                        <p className="font-bold text-slate-800 text-sm mt-0.5 truncate">{unit.name}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Arrow spacer */}
              <div className="flex justify-center -my-3">
                <div className="w-0.5 h-6 bg-slate-300/40"></div>
              </div>

              {/* 6. Sub-level Unit Retail & Commercial */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden"
              >
                <div className="bg-[#0b7e80] px-4 py-3 flex items-center gap-2 text-white">
                  <HiHome size={16} />
                  <span className="font-extrabold text-xs tracking-wider">UNIT RETAIL SUB-LEVEL</span>
                </div>
                <div className="p-4 space-y-3 text-sm bg-slate-50/50">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Kepala Toko</span>
                    <span className="font-extrabold text-slate-800">{orgData.retail_sub.kepala_toko}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Admin</span>
                    <span className="font-extrabold text-slate-800">{orgData.retail_sub.admin}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-slate-500 font-medium mb-1.5 block">Kasir:</span>
                    <div className="space-y-1.5 pl-3">
                      {orgData.retail_sub.kasir.map((name, idx) => (
                        <div key={idx} className="font-bold text-slate-800 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center text-[10px]">{idx + 1}</span>
                          <span>{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Desktop Org Chart (tree view) */}
            <div className="hidden md:block bg-slate-50 border border-slate-200 rounded-[32px] p-10 shadow-2xl relative overflow-x-auto w-full">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-45 pointer-events-none rounded-[32px]" />

              <div className="min-w-[1020px] flex flex-col items-center relative z-10 text-slate-800">

                {/* Level 1: Rapat Anggota */}
                <div className="flex flex-col items-center relative mb-1">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-3 bg-white border border-slate-200 px-10 py-4 rounded-full shadow-lg z-10 hover:border-teal-500 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#00529C] text-white flex items-center justify-center shadow-md">
                      <HiUsers size={18} />
                    </div>
                    <span className="font-black text-[#00529C] tracking-wider text-[15px]">RAPAT ANGGOTA</span>
                  </motion.div>
                  {/* Line down to row 2 */}
                  <div className="w-0.5 h-10 bg-teal-600/70"></div>
                </div>

                {/* Level 2: Penasehat, Pengurus, Pengawas */}
                <div className="relative flex justify-center w-full mb-10">
                  {/* Horizontal Line connecting them */}
                  <div className="absolute top-0 left-[20%] right-[20%] h-0.5 flex">
                    {/* Left half: dashed line for Penasehat */}
                    <div className="w-1/2 border-t-2 border-dashed border-teal-600/70"></div>
                    {/* Right half: solid line for Pengawas */}
                    <div className="w-1/2 border-t-2 border-solid border-teal-600/70"></div>
                  </div>

                  <div className="flex w-full justify-around items-start relative">
                    {/* 1. Dewan Penasehat (Left) */}
                    <div className="flex flex-col items-center w-1/4 relative">
                      <div className="w-0.5 h-6 border-l-2 border-dashed border-teal-600/70"></div>
                      <motion.div
                        whileHover={{ y: -4, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                        className="bg-white border border-slate-200 rounded-3xl shadow-xl w-64 overflow-hidden hover:border-[#0b5466] transition-colors"
                      >
                        <div className="bg-[#0b5466] px-5 py-3.5 flex items-center gap-2.5 text-white">
                          <HiUsers className="text-white shrink-0" size={18} />
                          <span className="font-black text-[11px] tracking-widest uppercase">DEWAN PENASEHAT</span>
                        </div>
                        <div className="p-5 space-y-2.5 text-left bg-slate-50/50">
                          {orgData.dewan_penasehat.map((name, i) => (
                            <div key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                              <span className="font-bold text-teal-600">{i + 1}.</span>
                              <span className="font-semibold text-slate-700">{name}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* 2. Dewan Pengurus (Center) */}
                    <div className="flex flex-col items-center w-1/3 relative">
                      <div className="w-0.5 h-6 bg-teal-600/70"></div>
                      <motion.div
                        whileHover={{ y: -4, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                        className="bg-white border border-slate-200 rounded-3xl shadow-xl w-80 overflow-hidden hover:border-[#0b5466] transition-colors"
                      >
                        <div className="bg-[#0b5466] px-5 py-3.5 flex items-center justify-center gap-2.5 text-white">
                          <HiUser className="text-white shrink-0" size={18} />
                          <span className="font-black text-[11px] tracking-widest uppercase">DEWAN PENGURUS</span>
                        </div>
                        <div className="p-6 space-y-4 text-left text-sm bg-slate-50/50">
                          {orgData.dewan_pengurus && orgData.dewan_pengurus.length > 0 ? (
                            orgData.dewan_pengurus.map((member, idx) => (
                              <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                                <span className="text-slate-500 font-semibold flex items-center gap-2">
                                  <HiUser className="text-teal-600" size={16} /> {member.role}
                                </span>
                                <span className="font-black text-slate-800">{member.name}</span>
                              </div>
                            ))
                          ) : (
                            <div className="text-center text-slate-400 py-4 text-xs italic">Belum ada data pengurus.</div>
                          )}
                        </div>
                      </motion.div>

                      {/* Vertical line going down from Dewan Pengurus to the Unit horizontal line */}
                      <div className="w-0.5 h-12 bg-teal-600/70"></div>
                    </div>

                    {/* 3. Dewan Pengawas (Right) */}
                    <div className="flex flex-col items-center w-1/4 relative">
                      <div className="w-0.5 h-6 bg-teal-600/70"></div>
                      <motion.div
                        whileHover={{ y: -4, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                        className="bg-white border border-slate-200 rounded-3xl shadow-xl w-64 overflow-hidden hover:border-[#2e7d32] transition-colors"
                      >
                        <div className="bg-[#2e7d32] px-5 py-3.5 flex items-center gap-2.5 text-white">
                          <HiCheckCircle className="text-white shrink-0" size={18} />
                          <span className="font-black text-[11px] tracking-widest uppercase">DEWAN PENGAWAS</span>
                        </div>
                        <div className="p-5 space-y-2.5 text-left bg-slate-50/50">
                          {orgData.dewan_pengawas.map((name, i) => (
                            <div key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                              <span className="font-bold text-green-600">{i + 1}.</span>
                              <span className="font-semibold text-slate-700">{name}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Level 3: Unit-Unit */}
                <div className="relative w-full flex flex-col items-center">
                  {/* Horizontal Line spanning across all 5 units */}
                  <div className="absolute top-0 left-[10%] right-[10%] h-0.5 bg-teal-600/70"></div>

                  <div className="flex w-full justify-between items-start relative px-2">
                    {orgData.units.map((unit, i) => {
                      const getUnitIcon = (index) => {
                        switch (index) {
                          case 0: return <HiUsers size={16} className="text-white" />;
                          case 1: return <HiCog8Tooth size={16} className="text-white" />;
                          case 2: return <HiChartBar size={16} className="text-white" />;
                          case 3: return <HiBriefcase size={16} className="text-white" />;
                          case 4: return <HiShoppingCart size={16} className="text-white" />;
                          default: return <HiUsers size={16} className="text-white" />;
                        }
                      };

                      return (
                        <div key={i} className="flex flex-col items-center w-[18%] relative">
                          {/* Short vertical connector line */}
                          <div className="w-0.5 h-6 bg-teal-600/70"></div>

                          <motion.div
                            whileHover={{ y: -4 }}
                            className="bg-white border border-slate-200 rounded-2xl shadow-lg p-5 text-center w-full z-10 min-h-[142px] flex flex-col justify-between hover:border-teal-500 hover:shadow-xl transition-all"
                          >
                            {/* Round Icon */}
                            <div className="mx-auto w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center mb-3 shadow-md">
                              {getUnitIcon(i)}
                            </div>

                            <h5 className="font-black text-[9px] tracking-wide text-[#0b5466] leading-tight uppercase mb-3">
                              {unit.title}
                            </h5>

                            <div className="flex items-center justify-center gap-1.5 mt-auto pt-2 border-t border-slate-100/60">
                              <HiUser size={13} className="text-slate-400 shrink-0" />
                              <span className="font-black text-slate-700 text-xs truncate w-full">{unit.name}</span>
                            </div>
                          </motion.div>

                          {/* Special connector line down from the 5th unit (Retail & Commercial) to Retail Sub-level */}
                          {i === 4 && (
                            <>
                              <div className="w-0.5 h-12 bg-teal-600/70"></div>
                              {/* Retail Sublevel card */}
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-72 overflow-hidden z-10 absolute top-[182px] right-[-24px] hover:border-teal-600 transition-colors"
                              >
                                <div className="bg-[#0b7e80] px-5 py-3 flex items-center gap-2.5 text-white">
                                  <HiHome className="text-white shrink-0" size={16} />
                                  <span className="font-black text-[10px] tracking-widest uppercase">UNIT RETAIL SUB-LEVEL</span>
                                </div>
                                <div className="p-5 space-y-3.5 text-left text-xs bg-slate-50/50">
                                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500 font-semibold flex items-center gap-1.5"><HiUser className="text-teal-600" size={14} /> Kepala Toko</span>
                                    <span className="font-black text-slate-800">{orgData.retail_sub.kepala_toko}</span>
                                  </div>
                                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <span className="text-slate-500 font-semibold flex items-center gap-1.5"><HiUser className="text-teal-600" size={14} /> Admin</span>
                                    <span className="font-black text-slate-800">{orgData.retail_sub.admin}</span>
                                  </div>
                                  <div className="pt-1">
                                    <span className="text-slate-500 font-semibold flex items-center gap-1.5 mb-1.5"><HiUsers className="text-teal-600" size={14} /> Kasir:</span>
                                    <div className="space-y-1 pl-4">
                                      {orgData.retail_sub.kasir.map((name, idx) => (
                                        <div key={idx} className="font-bold text-slate-800 flex items-center gap-1">
                                          <span>{idx + 1}.</span>
                                          <span>{name}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Extra spacer height on the right side under the 5th unit for its absolute sublevel card */}
                <div className="h-44 w-full pointer-events-none" />

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TentangKami;


