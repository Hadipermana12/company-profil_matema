import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa6';
import { HiArrowDownTray } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const Footer = ({ settings }) => {
  return (
    <footer className="relative">
      {/* Floating CTA Card Removed for Informational Mode */}

      {/* Main Footer */}
      <div className="text-white pt-16 md:pt-24 pb-10" style={{background: 'linear-gradient(135deg, #001a3d 0%, #002d6b 35%, #003a1a 70%, #004d22 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                {settings?.logo_url ? (
                  <img src={settings.logo_url} alt="Logo" className="h-12 object-contain brightness-0 invert" />
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#00529C] font-bold text-xl">K</div>
                    <span className="text-white font-bold text-2xl tracking-tight">{settings?.site_name || 'KMMA'}</span>
                  </div>
                )}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Platform koperasi digital terdepan, menghadirkan layanan keuangan inklusif bagi seluruh anggota.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#4CAF50] transition-colors"><FaFacebookF size={16} /></a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#4CAF50] transition-colors"><FaInstagram size={16} /></a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#4CAF50] transition-colors"><FaTwitter size={16} /></a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#4CAF50] transition-colors"><FaYoutube size={16} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase text-white mb-6">Tautan</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><Link to="/" className="hover:text-[#4CAF50] transition-colors">Home</Link></li>
                <li><Link to="/tentang-kami" className="hover:text-[#4CAF50] transition-colors">Tentang Kami</Link></li>
                <li><a href="/#news" className="hover:text-[#4CAF50] transition-colors">Berita</a></li>
                <li><a href="/#products" className="hover:text-[#4CAF50] transition-colors">Produk</a></li>
                <li><a href="/#faq" className="hover:text-[#4CAF50] transition-colors">FAQ</a></li>
                <li><a href="/#contact" className="hover:text-[#4CAF50] transition-colors">Hubungi Kami</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase text-white mb-6">Layanan</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><Link to="/pembiayaan" className="hover:text-[#4CAF50] transition-colors">Pembiayaan</Link></li>
                <li><Link to="/beasiswa" className="hover:text-[#4CAF50] transition-colors">Beasiswa</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-bold tracking-wider uppercase text-white mb-6">Ada Pertanyaan?</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>{settings?.contact_phone || '+62 21 1234 5678'}</li>
                <li>{settings?.contact_email || 'info@kmma.co.id'}</li>
                <li className="leading-relaxed">{settings?.contact_address || 'Jl. Raya Koperasi No. 123, Jakarta Selatan'}</li>
              </ul>
            </div>
          </div>

          {/* Divider + Copyright */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-xs">
                © {new Date().getFullYear()} <span className="text-slate-400 font-medium">{settings?.site_name || 'KMMA'}</span> — All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-xs text-slate-500">
                <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
                <span className="w-1 h-1 bg-slate-700 rounded-full" />
                <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
