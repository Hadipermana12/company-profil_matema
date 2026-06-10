import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiUser, HiLockClosed, HiArrowRightOnRectangle, HiEye, HiEyeSlash } from 'react-icons/hi2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/content`)
      .then(res => res.json())
      .then(data => {
        if (data?.settings) setSettings(data.settings);
      })
      .catch(err => console.error('Error fetching settings:', err));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        navigate('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{background: 'linear-gradient(135deg, #001a3d 0%, #002d6b 35%, #003a1a 70%, #004d22 100%)'}}>
      
      {/* Decorative Circles & Grid Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#00529C]/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[#4CAF50]/15 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-[#00b4d8]/5 rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="max-w-md w-full px-6 relative z-10">
        <div className="bg-white/8 backdrop-blur-xl border border-white/15 rounded-[32px] p-8 md:p-10 shadow-2xl shadow-black/40">
          <div className="text-center mb-8">
            {/* Logo area */}
            <div className="flex justify-center mb-5">
              {settings?.logo_url ? (
                <img 
                  src={settings.logo_url} 
                  alt="Logo" 
                  className="h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-pulse" 
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-[#00529C] to-[#4CAF50] rounded-2xl flex items-center justify-center text-white font-black shadow-[0_0_25px_rgba(76,175,80,0.3)] text-3xl">
                  K
                </div>
              )}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {settings?.site_name ? `${settings.site_name} Admin` : 'Admin Login'}
            </h1>
            <p className="text-white/60 text-xs md:text-sm mt-2 uppercase tracking-widest font-bold">
              Sinergi Untuk Sejahtera
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3.5 rounded-2xl text-xs md:text-sm mb-6 text-center font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/30 group-focus-within:text-[#4CAF50] transition-colors">
                <HiUser size={20} />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="block w-full pl-14 pr-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/40 focus:border-[#4CAF50]/40 transition-all text-sm md:text-base"
              />
            </div>

            {/* Password Input with Show/Hide toggle */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/30 group-focus-within:text-[#4CAF50] transition-colors">
                <HiLockClosed size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block w-full pl-14 pr-14 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/40 focus:border-[#4CAF50]/40 transition-all text-sm md:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <HiEyeSlash size={20} /> : <HiEye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00529C] to-[#4CAF50] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/35 disabled:opacity-50 disabled:hover:scale-100 mt-2"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              {!loading && <HiArrowRightOnRectangle size={22} />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="/" className="text-white/40 hover:text-white text-xs md:text-sm transition-colors font-bold tracking-wider uppercase">
              &larr; Back to Landing Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
