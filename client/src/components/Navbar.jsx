import { useState, useEffect } from 'react';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ settings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    { name: 'PEMBIAYAAN', href: '/pembiayaan' },
    { name: 'BEASISWA', href: '/beasiswa' },
    { name: 'BERITA', href: '/#news' },
    { name: 'PRODUK', href: '/#products' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'HUBUNGI KAMI', href: '/#contact' },
  ];

  // Smart handler for hash links — uses React Router navigate instead of hard browser reload
  const handleHashLink = (e, href) => {
    e.preventDefault();
    const hash = href.substring(2); // e.g. "/#products" -> "products"
    if (location.pathname === '/') {
      // Already on home page — scroll directly to element
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Navigate to home with hash — App.jsx useEffect will scroll after mount
      navigate(href);
    }
    setIsMenuOpen(false);
  };

  const linkClass = (href) => {
    const isActive = href.includes('#')
      ? location.pathname === '/' && location.hash === href.replace('/', '')
      : location.pathname === href;
    return isActive
      ? 'bg-gradient-to-r from-[#00529C] to-[#4CAF50] text-white shadow-lg'
      : 'text-white/80 hover:bg-white/10 hover:text-white';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b ${
      isScrolled 
        ? 'bg-[#001a3d]/95 backdrop-blur-md border-white/10 shadow-2xl shadow-black/50 py-2 md:py-3' 
        : 'bg-transparent border-transparent py-3 md:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate('/'); setIsMenuOpen(false); }}
              className="flex items-center gap-2 md:gap-4 group cursor-pointer"
            >
              {settings?.logo_url ? (
                <img 
                  src={settings.logo_url} 
                  alt="Logo" 
                  className={`w-auto object-contain transition-all duration-500 ${isScrolled ? 'h-10 md:h-16' : 'h-14 md:h-24 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:scale-105'}`} 
                />
              ) : (
                <div className="flex items-center gap-2 md:gap-3">
                  <div className={`bg-gradient-to-br from-[#00529C] to-[#4CAF50] rounded-xl md:rounded-2xl flex items-center justify-center text-white font-black shadow-[0_0_20px_rgba(76,175,80,0.4)] transition-all duration-500 ${
                    isScrolled ? 'w-9 h-9 md:w-14 md:h-14 text-lg md:text-2xl' : 'w-12 h-12 md:w-20 md:h-20 text-2xl md:text-4xl group-hover:scale-105'
                  }`}>
                    K
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className={`font-black text-white tracking-tight drop-shadow-md transition-all duration-500 ${
                      isScrolled ? 'text-xl md:text-3xl' : 'text-2xl md:text-4xl'
                    }`}>
                      {settings?.site_name || 'KMMA'}
                    </span>
                    <span className={`font-bold uppercase text-[#4CAF50] drop-shadow-sm transition-all duration-500 ${
                      isScrolled ? 'text-[8px] md:text-[11px] tracking-[0.15em] md:tracking-[0.2em]' : 'text-[9px] md:text-sm tracking-[0.18em] md:tracking-[0.25em]'
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
                  onClick={(e) => handleHashLink(e, link.href)}
                  className={`px-5 py-2.5 text-[13px] font-bold tracking-wider rounded-full transition-all duration-300 ${linkClass(link.href)}`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-5 py-2.5 text-[13px] font-bold tracking-wider rounded-full transition-all duration-300 ${linkClass(link.href)}`}
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

      {/* Mobile Menu - animated */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#001a3d]/98 backdrop-blur-xl border-t border-white/10 shadow-2xl absolute w-full"
          >
            <div className="px-4 pt-3 pb-5 space-y-1">
              {navLinks.map((link) => (
                link.href.includes('#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleHashLink(e, link.href)}
                    className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-bold tracking-wider transition-colors ${linkClass(link.href)}`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-bold tracking-wider transition-colors ${linkClass(link.href)}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
