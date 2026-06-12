import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import splashLogo from './assets/spalsh-removebg-preview.png';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import News from './components/News';

// Pages
import TentangKami from './pages/TentangKami';
import Beasiswa from './pages/Beasiswa';
import Pembiayaan from './pages/Pembiayaan';

// Admin Components
import AdminDashboard from './admin/Dashboard';
import Login from './admin/Login';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// Wrapper for all public pages that need Navbar & Footer and Content
const PublicLayout = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/content`)
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching content:', err);
        setLoading(false);
      });
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      // Retry up to 20 times (2 seconds total) to wait for element to mount
      let attempts = 0;
      const scrollToTarget = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (attempts < 20) {
          attempts++;
          setTimeout(scrollToTarget, 100);
        }
      };
      setTimeout(scrollToTarget, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-[100svh] flex flex-col items-center justify-center relative overflow-hidden" style={{background: 'linear-gradient(135deg, #001a3d 0%, #002d6b 35%, #003a1a 70%, #004d22 100%)'}}>
        {/* Decorative background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00529C]/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4CAF50]/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:28px_28px]" />
        
        {/* Main Logo Container */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Animated Logo K */}
          <div className="relative mb-10 group">
            {/* Glowing backdrop */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00529C] to-[#4CAF50] blur-[40px] rounded-full animate-pulse opacity-70"></div>
            
            {/* Main Logo block */}
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(76,175,80,0.5)] relative z-10 border border-white/20 p-4 md:p-6 overflow-hidden backdrop-blur-md">
              <img src={splashLogo} alt="KMMA Logo" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-pulse" />
            </div>
            
            {/* Outer spinning rings */}
            <div className="absolute -inset-6 border-2 border-t-[#4CAF50] border-r-transparent border-b-[#00529C] border-l-transparent rounded-[3rem] animate-spin"></div>
          </div>

          {/* Text KMMA ONE */}
          <div className="flex flex-col items-center">
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter drop-shadow-2xl mb-3 flex items-center gap-3">
              KMMA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] to-[#81c784]">ONE</span>
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-[#00529C] via-[#4CAF50] to-[#00529C] rounded-full mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/50 w-1/2 rounded-full animate-[translateX_2s_ease-in-out_infinite] translate-x-[-100%]"></div>
            </div>
            <p className="text-white/70 font-bold tracking-[0.3em] text-sm uppercase drop-shadow-sm animate-pulse">
              Memuat Sistem...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar settings={content?.settings} />
      {/* We pass content down to the rendered child route via Outlet context or cloneElement, but since it's simpler, we can just use Outlet context */}
      <Outlet context={{ content }} />
      <Footer settings={content?.settings} />
    </div>
  );
};

// Home Page Component
import { useOutletContext } from 'react-router-dom';
const HomePage = () => {
  const { content } = useOutletContext();
  return (
    <>
      <Hero content={content?.sections?.hero} settings={content?.settings} />
      <Products products={content?.products} content={content?.sections?.products} />
      <News news={content?.news} />
      <FAQ faqs={content?.faqs} />
      <Contact settings={content?.settings} />
    </>
  );
};

// Wrapper components for the new pages to extract context
const TentangKamiPage = () => {
  const { content } = useOutletContext();
  return <TentangKami content={content} />;
};
const BeasiswaPage = () => {
  const { content } = useOutletContext();
  return <Beasiswa content={content} />;
};
const PembiayaanPage = () => {
  const { content } = useOutletContext();
  return <Pembiayaan content={content} />;
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="tentang-kami" element={<TentangKamiPage />} />
          <Route path="beasiswa" element={<BeasiswaPage />} />
          <Route path="pembiayaan" element={<PembiayaanPage />} />
        </Route>
        
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
