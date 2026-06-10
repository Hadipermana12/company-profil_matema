import { useState, useEffect } from 'react';
import { HiBars3, HiXMark } from 'react-icons/hi2';
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
    { name: 'BERITA', href: '/#news' },
    { name: 'PRODUK', href: '/#products' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'HUBUNGI KAMI', href: '/#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${
      isScrolled 
        ? 'bg-[#001a3d]/90 backdrop-blur-md border-white/10 shadow-2xl shadow-black/50 py-3' 
        : 'bg-transparent border-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/#home" className="flex items-center gap-4 group cursor-pointer">
              {settings?.logo_url ? (
                <img 
                  src={settings.logo_url} 
                  alt="Logo" 
                  className={`w-auto object-contain transition-all duration-500 ${isScrolled ? 'h-16' : 'h-28 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:scale-105'}`} 
                />
              ) : (
                <div className="flex items-center gap-3">
                  <div className={`bg-gradient-to-br from-[#00529C] to-[#4CAF50] rounded-2xl flex items-center justify-center text-white font-black shadow-[0_0_20px_rgba(76,175,80,0.4)] transition-all duration-500 ${
                    isScrolled ? 'w-14 h-14 text-2xl' : 'w-20 h-20 text-4xl group-hover:scale-105'
                  }`}>
                    K
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className={`font-black text-white tracking-tight drop-shadow-md transition-all duration-500 ${
                      isScrolled ? 'text-3xl' : 'text-4xl'
                    }`}>
                      {settings?.site_name || 'KMMA'}
                    </span>
                    <span className={`font-bold uppercase text-[#4CAF50] drop-shadow-sm transition-all duration-500 ${
                      isScrolled ? 'text-[11px] tracking-[0.2em]' : 'text-sm tracking-[0.25em]'
                    }`}>
                      Sinergi Untuk Sejahtera
                    </span>
                  </div>
                </div>
              )}
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-2 py-1 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            {navLinks.map((link) => (
              link.href.includes('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-5 py-2.5 text-[13px] font-bold tracking-wider rounded-full transition-all duration-300 ${
                    location.pathname === '/' && location.hash === link.href.replace('/', '') 
                      ? 'bg-gradient-to-r from-[#00529C] to-[#4CAF50] text-white shadow-lg' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-5 py-2.5 text-[13px] font-bold tracking-wider rounded-full transition-all duration-300 ${
                    location.pathname === link.href 
                      ? 'bg-gradient-to-r from-[#00529C] to-[#4CAF50] text-white shadow-lg' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
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
              className="text-white focus:outline-none p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-colors backdrop-blur-sm"
            >
              {isMenuOpen ? <HiXMark size={28} /> : <HiBars3 size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#001a3d]/95 backdrop-blur-lg border-t border-white/10 shadow-2xl absolute w-full mt-3">
          <div className="px-4 pt-4 pb-6 space-y-1">
            {navLinks.map((link) => (
              link.href.includes('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={`block px-5 py-4 rounded-xl text-sm font-bold tracking-wider transition-colors ${
                    location.pathname === '/' && location.hash === link.href.replace('/', '') 
                      ? 'bg-gradient-to-r from-[#00529C] to-[#4CAF50] text-white' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block px-5 py-4 rounded-xl text-sm font-bold tracking-wider transition-colors ${
                    location.pathname === link.href 
                      ? 'bg-gradient-to-r from-[#00529C] to-[#4CAF50] text-white' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
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
