import { useState, useEffect } from 'react';
import { HiBars3, HiXMark, HiArrowDownTray } from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ settings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'TENTANG KAMI', href: '/tentang-kami' },
    { name: 'PINJAMAN', href: '/pinjaman' },
    { name: 'BEASISWA', href: '/beasiswa' },
    { name: 'PRODUK', href: '/#products' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'HUBUNGI KAMI', href: '/#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-sm py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center gap-3 group cursor-pointer">
              {settings?.logo_url ? (
                <img src={settings.logo_url} alt="Logo" className="h-14 w-auto object-contain group-hover:scale-105 transition-transform" />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#00529C] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">K</div>
                  <div className="flex flex-col leading-tight">
                    <span className="font-black text-2xl text-[#00529C] tracking-tight">{settings?.site_name || 'KMMA'}</span>
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#4CAF50]">Sinergi Untuk Sejahtera</span>
                  </div>
                </div>
              )}
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.href.includes('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-[13px] font-bold tracking-wider rounded-lg transition-all duration-300 ${
                    location.pathname === '/' && location.hash === link.href.replace('/', '') 
                      ? 'bg-[#00529C] text-white' 
                      : 'text-[#00529C] hover:bg-[#00529C] hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 text-[13px] font-bold tracking-wider rounded-lg transition-all duration-300 ${
                    location.pathname === link.href 
                      ? 'bg-[#00529C] text-white' 
                      : 'text-[#00529C] hover:bg-[#00529C] hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#00529C] focus:outline-none p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isMenuOpen ? <HiXMark size={28} /> : <HiBars3 size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-1">
            {navLinks.map((link) => (
              link.href.includes('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-bold tracking-wider transition-colors ${
                    location.pathname === '/' && location.hash === link.href.replace('/', '') 
                      ? 'bg-[#00529C]/10 text-[#00529C]' 
                      : 'text-[#00529C] hover:bg-[#00529C]/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-bold tracking-wider transition-colors ${
                    location.pathname === link.href 
                      ? 'bg-[#00529C]/10 text-[#00529C]' 
                      : 'text-[#00529C] hover:bg-[#00529C]/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
