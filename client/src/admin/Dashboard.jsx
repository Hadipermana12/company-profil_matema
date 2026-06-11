import { useState, useEffect } from 'react';
import { HiCog8Tooth, HiPhoto, HiSquares2X2, HiChatBubbleLeftRight, HiInboxStack, HiArrowDownOnSquare, HiCheckCircle, HiArrowLeftOnRectangle, HiGlobeAlt, HiTrash, HiPlus, HiUser, HiNewspaper } from 'react-icons/hi2';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/content`)
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      });
  }, []);

  const showSuccessAlert = (title) => {
    Swal.fire({
      title: title,
      text: 'Data berhasil diperbarui!',
      icon: 'success',
      confirmButtonColor: '#00529C',
      background: '#ffffff',
      backdrop: `rgba(0,82,156,0.4)`
    });
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/settings`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(content.settings)
      });
      if (res.ok) {
        showSuccessAlert('Settings Saved!');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Gagal menyimpan pengaturan', 'error');
    }
    setSaving(false);
  };

  const handleUpdateSection = async (name) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/sections/${name}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(content.sections[name])
      });
      if (res.ok) {
        showSuccessAlert(`Section ${name} Updated!`);
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Gagal memperbarui section', 'error');
    }
    setSaving(false);
  };

  const handleImageUpload = async (file, callback) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      setSaving(true);
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        callback(data.imageUrl);
        Swal.fire({
          title: 'Upload Berhasil!',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Upload gagal', 'error');
    }
    setSaving(false);
  };

  // FAQ CRUD
  const handleAddFaq = () => {
    const newFaqs = [...(content.faqs || []), { question: '', answer: '', sort_order: (content.faqs?.length || 0) }];
    setContent({ ...content, faqs: newFaqs });
  };

  const handleRemoveFaq = (index) => {
    const newFaqs = content.faqs.filter((_, i) => i !== index);
    setContent({ ...content, faqs: newFaqs });
  };

  const handleSaveFaqs = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/faqs`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ faqs: content.faqs })
      });
      if (res.ok) {
        showSuccessAlert('FAQs Saved!');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Gagal menyimpan FAQ', 'error');
    }
    setSaving(false);
  };

  // Products CRUD
  const handleAddProduct = () => {
    const newProducts = [...(content.products || []), { name: '', description: '', category: 'produk', sort_order: (content.products?.length || 0) }];
    setContent({ ...content, products: newProducts });
  };

  const handleRemoveProduct = (index) => {
    const newProducts = content.products.filter((_, i) => i !== index);
    setContent({ ...content, products: newProducts });
  };

  const handleSaveProducts = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/products`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ products: content.products })
      });
      if (res.ok) {
        showSuccessAlert('Products Saved!');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Gagal menyimpan produk', 'error');
    }
    setSaving(false);
  };

  // News CRUD Handlers
  const handleSaveNews = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const isNew = !editingNews.id;
      const url = isNew 
        ? `${import.meta.env.VITE_API_URL}/admin/news`
        : `${import.meta.env.VITE_API_URL}/admin/news/${editingNews.id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingNews)
      });
      
      const data = await res.json();
      if (res.ok) {
        showSuccessAlert(isNew ? 'Berita Ditambahkan!' : 'Berita Diperbarui!');
        if (isNew) {
          setContent({
            ...content,
            news: [...(content.news || []), { ...editingNews, id: data.id, created_at: new Date().toISOString() }]
          });
        } else {
          setContent({
            ...content,
            news: content.news.map(n => n.id === editingNews.id ? editingNews : n)
          });
        }
        setEditingNews(null);
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Gagal menyimpan berita', 'error');
    }
    setSaving(false);
  };

  const handleDeleteNews = async (id) => {
    const confirm = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Berita ini akan dihapus secara permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/news/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          setContent({
            ...content,
            news: content.news.filter(n => n.id !== id)
          });
          Swal.fire('Terhapus!', 'Berita telah dihapus.', 'success');
        }
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Gagal menghapus berita', 'error');
      }
    }
  };


  if (loading) return <div className="p-10">Loading admin panel...</div>;

  const mainTabs = [
    { id: 'settings', label: 'Settings', icon: <HiCog8Tooth size={20} /> },
    { id: 'hero', label: 'Hero Section', icon: <HiPhoto size={20} /> },
    { id: 'about', label: 'About Us', icon: <HiSquares2X2 size={20} /> },
    { id: 'products', label: 'Products', icon: <HiInboxStack size={20} /> },
    { id: 'faq', label: 'FAQ', icon: <HiChatBubbleLeftRight size={20} /> },
  ];

  const pageTabs = [
    { id: 'tentang_sejarah', label: 'Sejarah', icon: <HiSquares2X2 size={20} /> },
    { id: 'tentang_struktur', label: 'Struktur Organisasi', icon: <HiUser size={20} /> },
    { id: 'beasiswa_page', label: 'Program Beasiswa', icon: <HiPhoto size={20} /> },
    { id: 'beasiswa_pengumuman', label: 'Pengumuman Beasiswa', icon: <HiCheckCircle size={20} /> },
    { id: 'pinjaman_page', label: 'Program Pembiayaan', icon: <HiInboxStack size={20} /> },
    { id: 'news', label: 'Berita & Kegiatan', icon: <HiNewspaper size={20} /> },
  ];

  const getTabLabel = (id) => {
    const tab = [...mainTabs, ...pageTabs].find(t => t.id === id);
    return tab ? tab.label : id;
  };

  // Reusable Image Upload Component
  const ImageUploadField = ({ label, currentUrl, onUpload, hint }) => (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-white/80">{label}</label>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input 
            type="file" 
            accept="image/png, image/jpeg, image/webp, image/svg+xml"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) handleImageUpload(file, onUpload);
            }}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4CAF50] file:text-white hover:file:bg-[#388E3C] cursor-pointer"
          />
        </div>
        {currentUrl && (
          <img src={currentUrl} alt="Preview" className="w-16 h-16 object-cover rounded-xl border border-white/10 shadow-sm" />
        )}
      </div>
      <p className="text-xs text-slate-400 italic">
        {hint || 'Format: PNG, JPG, WEBP, SVG. Ukuran maks: 5MB.'}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-white" style={{background: 'linear-gradient(135deg, #001a3d 0%, #002d6b 35%, #003a1a 70%, #004d22 100%)'}}>
      {/* Sidebar */}
      <div className="w-full lg:w-72 bg-black/20 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-white/10 text-white p-6 flex flex-col lg:h-screen shrink-0 lg:sticky top-0 z-20">
        <h1 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tight">
          <div className="w-9 h-9 bg-white text-[#00529C] rounded-xl flex items-center justify-center font-bold shadow-md">K</div>
          KMMA Admin
        </h1>
        
        <nav className="flex lg:flex-col gap-2 lg:gap-6 overflow-x-auto lg:overflow-y-auto lg:pr-1 pb-2 lg:pb-0 scrollbar-hide">
          <div>
            <p className="text-[10px] font-extrabold uppercase text-white/40 tracking-widest mb-3 px-3">Konten Utama</p>
            <div className="space-y-1.5">
              {mainTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm font-medium ${
                    activeTab === tab.id ? 'bg-white/25 font-bold shadow-inner' : 'hover:bg-white/10 text-white/80'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-extrabold uppercase text-white/40 tracking-widest mb-3 px-3">Halaman Khusus</p>
            <div className="space-y-1.5">
              {pageTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm font-medium ${
                    activeTab === tab.id ? 'bg-white/25 font-bold shadow-inner' : 'hover:bg-white/10 text-white/80'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
        
        <div className="pt-6 border-t border-white/10 space-y-1.5 shrink-0 mt-6">
          <a href="/" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-xs font-semibold text-blue-200 hover:bg-white/10 hover:text-white">
            <HiGlobeAlt size={18} />
            Lihat Website
          </a>
          <button 
            onClick={() => { localStorage.removeItem('adminToken'); localStorage.removeItem('adminUser'); window.location.href = '/admin/login'; }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-xs font-semibold text-red-200 hover:bg-red-500/20 hover:text-white"
          >
            <HiArrowLeftOnRectangle size={18} />
            Keluar
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-6 lg:p-10 lg:overflow-y-auto lg:h-screen">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 lg:mb-10 gap-4">
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Manajemen <span className="text-[#4CAF50]">{getTabLabel(activeTab)}</span></h2>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-[24px] lg:rounded-[32px] shadow-2xl p-5 md:p-8 border border-white/20">
          
          {/* ===== SETTINGS TAB ===== */}
          {activeTab === 'settings' && (
            <form onSubmit={handleUpdateSettings} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-white/80 mb-2">Site Name</label>
                  <input type="text" value={content.settings.site_name || ''} onChange={(e) => setContent({...content, settings: {...content.settings, site_name: e.target.value}})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/80 mb-2">Contact Phone</label>
                  <input type="text" value={content.settings.contact_phone || ''} onChange={(e) => setContent({...content, settings: {...content.settings, contact_phone: e.target.value}})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/80 mb-2">Playstore Link</label>
                  <input type="text" value={content.settings.playstore_link || ''} onChange={(e) => setContent({...content, settings: {...content.settings, playstore_link: e.target.value}})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/80 mb-2">Contact Email</label>
                  <input type="email" value={content.settings.contact_email || ''} onChange={(e) => setContent({...content, settings: {...content.settings, contact_email: e.target.value}})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/80 mb-2">Contact Address</label>
                  <input type="text" value={content.settings.contact_address || ''} onChange={(e) => setContent({...content, settings: {...content.settings, contact_address: e.target.value}})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2">Site Description</label>
                <textarea rows="3" value={content.settings.site_description || ''} onChange={(e) => setContent({...content, settings: {...content.settings, site_description: e.target.value}})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30"></textarea>
              </div>
              
              {/* Logo Upload */}
              <ImageUploadField 
                label="Logo Website" 
                currentUrl={content.settings.logo_url}
                onUpload={(url) => setContent({...content, settings: {...content.settings, logo_url: url}})}
                hint="Format: PNG atau SVG (latar transparan). Ukuran ideal: 200x60 px."
              />

              <button disabled={saving} className="bg-[#4CAF50] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#43a047] transition-all">
                <HiArrowDownOnSquare size={20} />
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </form>
          )}

          {/* ===== SECTION TABS ===== */}
          {(['hero', 'about', 'tentang_sejarah', 'tentang_struktur', 'beasiswa_page', 'pinjaman_page', 'beasiswa_pengumuman'].includes(activeTab)) && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2">Title</label>
                <input type="text" value={content.sections[activeTab]?.title || ''} onChange={(e) => setContent({...content, sections: {...content.sections, [activeTab]: {...content.sections[activeTab], title: e.target.value}}})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30" />
              </div>
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2">Subtitle</label>
                <input type="text" value={content.sections[activeTab]?.subtitle || ''} onChange={(e) => setContent({...content, sections: {...content.sections, [activeTab]: {...content.sections[activeTab], subtitle: e.target.value}}})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30" />
              </div>
              <div>
                <label className="block text-sm font-bold text-white/80 mb-2">Content</label>
                <textarea rows="5" value={content.sections[activeTab]?.content || ''} onChange={(e) => setContent({...content, sections: {...content.sections, [activeTab]: {...content.sections[activeTab], content: e.target.value}}})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30"></textarea>
              </div>

              <ImageUploadField 
                label={activeTab === 'hero' ? 'Banner Image' : 'Gambar Section (Card Besar)'}
                currentUrl={content.sections[activeTab]?.image_url}
                onUpload={(url) => setContent({...content, sections: {...content.sections, [activeTab]: {...content.sections[activeTab], image_url: url}}})}
                hint={activeTab === 'hero' 
                  ? 'Format: JPG atau PNG. Resolusi ideal: 1920x800 px (landscape lebar).' 
                  : 'Format: JPG atau PNG. Resolusi ideal: 800x520 px (portrait/landscape). Gambar ini ditampilkan di card besar sebelah kiri.'}
              />

              <button onClick={() => handleUpdateSection(activeTab)} disabled={saving} className="bg-[#00529C] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#003d75] transition-all">
                <HiArrowDownOnSquare size={20} />
                {saving ? 'Saving...' : `Update ${activeTab} Section`}
              </button>
            </div>
          )}

          {/* ===== FAQ TAB ===== */}
          {activeTab === 'faq' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-white/60 text-sm">Kelola daftar pertanyaan yang sering diajukan.</p>
                <button onClick={handleAddFaq} className="bg-[#4CAF50] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm hover:bg-[#43a047] transition-all">
                  <HiPlus size={18} /> Tambah FAQ
                </button>
              </div>

              {content.faqs?.map((faq, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 relative">
                  <div className="flex justify-between items-start">
                    <span className="bg-[#00529C] text-white text-xs font-bold px-3 py-1 rounded-lg">FAQ #{index + 1}</span>
                    <button onClick={() => handleRemoveFaq(index)} className="text-red-400 hover:text-red-600 transition-colors p-1">
                      <HiTrash size={18} />
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-1">Pertanyaan</label>
                    <input type="text" value={faq.question || ''} onChange={(e) => {
                      const newFaqs = [...content.faqs];
                      newFaqs[index] = {...newFaqs[index], question: e.target.value};
                      setContent({...content, faqs: newFaqs});
                    }} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-1">Jawaban</label>
                    <textarea rows="3" value={faq.answer || ''} onChange={(e) => {
                      const newFaqs = [...content.faqs];
                      newFaqs[index] = {...newFaqs[index], answer: e.target.value};
                      setContent({...content, faqs: newFaqs});
                    }} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30"></textarea>
                  </div>
                </div>
              ))}

              <button onClick={handleSaveFaqs} disabled={saving} className="bg-[#00529C] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#003d75] transition-all">
                <HiArrowDownOnSquare size={20} />
                {saving ? 'Saving...' : 'Save All FAQs'}
              </button>
            </div>
          )}

          {/* ===== PRODUCTS TAB ===== */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Products Section Header */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h4 className="text-sm font-bold text-[#00529C]">Section Header</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1">Title</label>
                    <input type="text" value={content.sections?.products?.title || ''} onChange={(e) => setContent({...content, sections: {...content.sections, products: {...content.sections?.products, title: e.target.value}}})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/80 mb-1">Subtitle</label>
                    <input type="text" value={content.sections?.products?.subtitle || ''} onChange={(e) => setContent({...content, sections: {...content.sections, products: {...content.sections?.products, subtitle: e.target.value}}})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30 text-sm" />
                  </div>
                </div>
                <button onClick={() => handleUpdateSection('products')} disabled={saving} className="bg-[#00529C] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#003d75] transition-all">
                  Update Section Header
                </button>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-white/60 text-sm">Kelola daftar produk & layanan koperasi.</p>
                <button onClick={handleAddProduct} className="bg-[#4CAF50] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm hover:bg-[#43a047] transition-all">
                  <HiPlus size={18} /> Tambah Produk
                </button>
              </div>

              {content.products?.map((product, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 relative">
                  <div className="flex justify-between items-start">
                    <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-lg">Produk #{index + 1}</span>
                    <button onClick={() => handleRemoveProduct(index)} className="text-red-400 hover:text-red-600 transition-colors p-1">
                      <HiTrash size={18} />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-1">Kategori</label>
                      <select value={product.category || 'produk'} onChange={(e) => {
                        const newProducts = [...content.products];
                        newProducts[index] = {...newProducts[index], category: e.target.value};
                        setContent({...content, products: newProducts});
                      }} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30">
                        <option value="produk">📦 Produk Fisik</option>
                        <option value="layanan">💳 Layanan Pembiayaan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-1">Nama Produk/Layanan</label>
                      <input type="text" value={product.name || ''} onChange={(e) => {
                        const newProducts = [...content.products];
                        newProducts[index] = {...newProducts[index], name: e.target.value};
                        setContent({...content, products: newProducts});
                      }} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-1">Deskripsi</label>
                    <textarea rows="2" value={product.description || ''} onChange={(e) => {
                      const newProducts = [...content.products];
                      newProducts[index] = {...newProducts[index], description: e.target.value};
                      setContent({...content, products: newProducts});
                    }} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30"></textarea>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <ImageUploadField 
                      label="Gambar Produk" 
                      currentUrl={product.image_url}
                      onUpload={(url) => {
                        const newProducts = [...content.products];
                        newProducts[index] = {...newProducts[index], image_url: url};
                        setContent({...content, products: newProducts});
                      }}
                      hint="Format: PNG/JPG (latar transparan disarankan). Ukuran: 500x500 px."
                    />
                  </div>
                </div>
              ))}

              <button onClick={handleSaveProducts} disabled={saving} className="bg-[#00529C] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#003d75] transition-all">
                <HiArrowDownOnSquare size={20} />
                {saving ? 'Saving...' : 'Save All Products'}
              </button>
            </div>
          )}

          {/* ===== NEWS TAB ===== */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              {editingNews ? (
                <form onSubmit={handleSaveNews} className="space-y-6 bg-white/5 border border-white/10 rounded-3xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {editingNews.id ? '✏️ Edit Berita' : '✨ Tambah Berita Baru'}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">Judul Berita</label>
                      <input 
                        type="text" 
                        required
                        value={editingNews.title || ''} 
                        onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })} 
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30" 
                        placeholder="Contoh: Margin Pembiayaan Spesial..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">Kategori</label>
                      <select 
                        value={editingNews.category || 'Promo'} 
                        onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })} 
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30"
                      >
                        <option value="Promo">Promo</option>
                        <option value="Kegiatan">Kegiatan</option>
                        <option value="Pengumuman">Pengumuman</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2">Isi Berita</label>
                    <textarea 
                      rows="8" 
                      required
                      value={editingNews.content || ''} 
                      onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })} 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30"
                      placeholder="Tulis detail berita/artikel di sini..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <ImageUploadField 
                      label="Thumbnail Berita (Gambar)" 
                      currentUrl={editingNews.image_url}
                      onUpload={(url) => setEditingNews({ ...editingNews, image_url: url })}
                      hint="Format: JPG/PNG/WEBP. Ukuran disarankan: 800x500 px."
                    />
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">Urutan Tampil (Sort Order)</label>
                      <input 
                        type="number" 
                        value={editingNews.sort_order || 0} 
                        onChange={(e) => setEditingNews({ ...editingNews, sort_order: parseInt(e.target.value) || 0 })} 
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#4CAF50] outline-none text-white placeholder-white/30" 
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    <button 
                      type="submit" 
                      disabled={saving} 
                      className="bg-[#00529C] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#003d75] transition-all flex items-center gap-2"
                    >
                      <HiArrowDownOnSquare size={18} />
                      {saving ? 'Menyimpan...' : 'Simpan Berita'}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setEditingNews(null)} 
                      className="bg-slate-200 text-white/80 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-300 transition-all"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <p className="text-white/60 text-sm">Kelola daftar berita, promo, dan kegiatan koperasi KMMA.</p>
                    <button 
                      onClick={() => setEditingNews({ title: '', category: 'Promo', content: '', image_url: '', sort_order: 0 })} 
                      className="bg-[#4CAF50] text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 text-sm hover:bg-[#43a047] transition-all shadow-md shadow-green-950/10"
                    >
                      <HiPlus size={18} /> Tambah Berita Baru
                    </button>
                  </div>

                  <div className="grid gap-4">
                    {content.news && content.news.length > 0 ? (
                      content.news.map((item, index) => (
                        <div key={item.id || index} className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl gap-4 hover:bg-white/10 transition-colors">
                          <div className="flex items-center gap-4 flex-1">
                            {item.image_url ? (
                              <img src={item.image_url} alt="" className="w-20 h-16 object-cover rounded-xl border border-white/10 shrink-0" />
                            ) : (
                              <div className="w-20 h-16 bg-slate-200 rounded-xl shrink-0 flex items-center justify-center text-slate-400 font-bold text-xs">No Image</div>
                            )}
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full text-white ${
                                  item.category === 'Promo' ? 'bg-[#4CAF50]' : 
                                  item.category === 'Kegiatan' ? 'bg-[#00529C]' : 'bg-[#eab308]'
                                }`}>
                                  {item.category}
                                </span>
                                <span className="text-xs text-slate-400">Sort: {item.sort_order}</span>
                              </div>
                              <h4 className="font-bold text-slate-800 line-clamp-1">{item.title}</h4>
                              <p className="text-xs text-white/60 line-clamp-1">{item.content}</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 shrink-0 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
                            <button 
                              onClick={() => setEditingNews(item)} 
                              className="px-4 py-2 border border-white/20 text-white/80 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-all"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteNews(item.id)} 
                              className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-sm font-bold transition-all flex items-center gap-1"
                            >
                              <HiTrash size={16} /> Hapus
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 text-white/50 italic">
                        Belum ada berita yang diterbitkan.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
