import { useState, useEffect } from 'react';
import { HiCog8Tooth, HiPhoto, HiSquares2X2, HiChatBubbleLeftRight, HiInboxStack, HiArrowDownOnSquare, HiCheckCircle, HiArrowLeftOnRectangle, HiGlobeAlt, HiTrash, HiPlus, HiUser } from 'react-icons/hi2';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/sections/${name}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/upload`, {
        method: 'POST',
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/faqs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  if (loading) return <div className="p-10">Loading admin panel...</div>;

  const tabs = [
    { id: 'settings', label: 'Settings', icon: <HiCog8Tooth size={20} /> },
    { id: 'hero', label: 'Hero Section', icon: <HiPhoto size={20} /> },
    { id: 'about', label: 'About Us', icon: <HiSquares2X2 size={20} /> },
    { id: 'products', label: 'Products', icon: <HiInboxStack size={20} /> },
    { id: 'faq', label: 'FAQ', icon: <HiChatBubbleLeftRight size={20} /> },
    { id: 'tentang_sejarah', label: 'Pg: Sejarah', icon: <HiSquares2X2 size={20} /> },
    { id: 'tentang_struktur', label: 'Pg: Struktur Org', icon: <HiUser size={20} /> },
    { id: 'beasiswa_page', label: 'Pg: Beasiswa', icon: <HiPhoto size={20} /> },
    { id: 'beasiswa_pengumuman', label: 'Pg: Pengumuman', icon: <HiCheckCircle size={20} /> },
    { id: 'pinjaman_page', label: 'Pg: Pinjaman', icon: <HiInboxStack size={20} /> },
  ];

  // Reusable Image Upload Component
  const ImageUploadField = ({ label, currentUrl, onUpload, hint }) => (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-slate-700">{label}</label>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input 
            type="file" 
            accept="image/png, image/jpeg, image/webp, image/svg+xml"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) handleImageUpload(file, onUpload);
            }}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none text-sm"
          />
        </div>
        {currentUrl && (
          <img src={currentUrl} alt="Preview" className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-sm" />
        )}
      </div>
      <p className="text-xs text-slate-400 italic">
        {hint || 'Format: PNG, JPG, WEBP, SVG. Ukuran maks: 5MB.'}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#00529C] text-white p-6 flex flex-col min-h-screen">
        <h1 className="text-2xl font-bold mb-10 flex items-center gap-2">
          <div className="w-8 h-8 bg-white text-[#00529C] rounded flex items-center justify-center">K</div>
          KMMA Admin
        </h1>
        <nav className="flex-1 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-white/20 font-bold' : 'hover:bg-white/10'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/10 space-y-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-blue-200 hover:bg-white/10 hover:text-white">
            <HiGlobeAlt size={20} />
            View Site
          </a>
          <button 
            onClick={() => { localStorage.removeItem('adminToken'); localStorage.removeItem('adminUser'); window.location.href = '/admin/login'; }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-red-200 hover:bg-red-500/20 hover:text-white"
          >
            <HiArrowLeftOnRectangle size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-10 overflow-y-auto h-screen">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 capitalize">{activeTab.replace('_', ' ')} Management</h2>
        </div>

        <div className="bg-white rounded-[32px] shadow-sm p-8 border border-slate-200">
          
          {/* ===== SETTINGS TAB ===== */}
          {activeTab === 'settings' && (
            <form onSubmit={handleUpdateSettings} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Site Name</label>
                  <input type="text" value={content.settings.site_name || ''} onChange={(e) => setContent({...content, settings: {...content.settings, site_name: e.target.value}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Contact Phone</label>
                  <input type="text" value={content.settings.contact_phone || ''} onChange={(e) => setContent({...content, settings: {...content.settings, contact_phone: e.target.value}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Playstore Link</label>
                  <input type="text" value={content.settings.playstore_link || ''} onChange={(e) => setContent({...content, settings: {...content.settings, playstore_link: e.target.value}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Contact Email</label>
                  <input type="email" value={content.settings.contact_email || ''} onChange={(e) => setContent({...content, settings: {...content.settings, contact_email: e.target.value}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Contact Address</label>
                  <input type="text" value={content.settings.contact_address || ''} onChange={(e) => setContent({...content, settings: {...content.settings, contact_address: e.target.value}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Site Description</label>
                <textarea rows="3" value={content.settings.site_description || ''} onChange={(e) => setContent({...content, settings: {...content.settings, site_description: e.target.value}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none"></textarea>
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
                <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                <input type="text" value={content.sections[activeTab]?.title || ''} onChange={(e) => setContent({...content, sections: {...content.sections, [activeTab]: {...content.sections[activeTab], title: e.target.value}}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Subtitle</label>
                <input type="text" value={content.sections[activeTab]?.subtitle || ''} onChange={(e) => setContent({...content, sections: {...content.sections, [activeTab]: {...content.sections[activeTab], subtitle: e.target.value}}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Content</label>
                <textarea rows="5" value={content.sections[activeTab]?.content || ''} onChange={(e) => setContent({...content, sections: {...content.sections, [activeTab]: {...content.sections[activeTab], content: e.target.value}}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none"></textarea>
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
                <p className="text-slate-500 text-sm">Kelola daftar pertanyaan yang sering diajukan.</p>
                <button onClick={handleAddFaq} className="bg-[#4CAF50] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm hover:bg-[#43a047] transition-all">
                  <HiPlus size={18} /> Tambah FAQ
                </button>
              </div>

              {content.faqs?.map((faq, index) => (
                <div key={index} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 relative">
                  <div className="flex justify-between items-start">
                    <span className="bg-[#00529C] text-white text-xs font-bold px-3 py-1 rounded-lg">FAQ #{index + 1}</span>
                    <button onClick={() => handleRemoveFaq(index)} className="text-red-400 hover:text-red-600 transition-colors p-1">
                      <HiTrash size={18} />
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Pertanyaan</label>
                    <input type="text" value={faq.question || ''} onChange={(e) => {
                      const newFaqs = [...content.faqs];
                      newFaqs[index] = {...newFaqs[index], question: e.target.value};
                      setContent({...content, faqs: newFaqs});
                    }} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Jawaban</label>
                    <textarea rows="3" value={faq.answer || ''} onChange={(e) => {
                      const newFaqs = [...content.faqs];
                      newFaqs[index] = {...newFaqs[index], answer: e.target.value};
                      setContent({...content, faqs: newFaqs});
                    }} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none"></textarea>
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
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-4">
                <h4 className="text-sm font-bold text-[#00529C]">Section Header</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Title</label>
                    <input type="text" value={content.sections?.products?.title || ''} onChange={(e) => setContent({...content, sections: {...content.sections, products: {...content.sections?.products, title: e.target.value}}})} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Subtitle</label>
                    <input type="text" value={content.sections?.products?.subtitle || ''} onChange={(e) => setContent({...content, sections: {...content.sections, products: {...content.sections?.products, subtitle: e.target.value}}})} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none text-sm" />
                  </div>
                </div>
                <button onClick={() => handleUpdateSection('products')} disabled={saving} className="bg-[#00529C] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#003d75] transition-all">
                  Update Section Header
                </button>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-slate-500 text-sm">Kelola daftar produk & layanan koperasi.</p>
                <button onClick={handleAddProduct} className="bg-[#4CAF50] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm hover:bg-[#43a047] transition-all">
                  <HiPlus size={18} /> Tambah Produk
                </button>
              </div>

              {content.products?.map((product, index) => (
                <div key={index} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 relative">
                  <div className="flex justify-between items-start">
                    <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-lg">Produk #{index + 1}</span>
                    <button onClick={() => handleRemoveProduct(index)} className="text-red-400 hover:text-red-600 transition-colors p-1">
                      <HiTrash size={18} />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Kategori</label>
                      <select value={product.category || 'produk'} onChange={(e) => {
                        const newProducts = [...content.products];
                        newProducts[index] = {...newProducts[index], category: e.target.value};
                        setContent({...content, products: newProducts});
                      }} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none">
                        <option value="produk">📦 Produk Fisik</option>
                        <option value="layanan">💳 Layanan Pembiayaan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Nama Produk/Layanan</label>
                      <input type="text" value={product.name || ''} onChange={(e) => {
                        const newProducts = [...content.products];
                        newProducts[index] = {...newProducts[index], name: e.target.value};
                        setContent({...content, products: newProducts});
                      }} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Deskripsi</label>
                    <textarea rows="2" value={product.description || ''} onChange={(e) => {
                      const newProducts = [...content.products];
                      newProducts[index] = {...newProducts[index], description: e.target.value};
                      setContent({...content, products: newProducts});
                    }} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00529C] outline-none"></textarea>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
