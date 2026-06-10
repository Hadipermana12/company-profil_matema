import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';

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
import Pinjaman from './pages/Pinjaman';

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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#00529C]/20 border-t-[#00529C] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-[#00529C] font-bold text-xl">K</div>
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
const PinjamanPage = () => {
  const { content } = useOutletContext();
  return <Pinjaman content={content} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="tentang-kami" element={<TentangKamiPage />} />
          <Route path="beasiswa" element={<BeasiswaPage />} />
          <Route path="pembiayaan" element={<PinjamanPage />} />
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
