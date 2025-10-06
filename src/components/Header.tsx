import { useState } from "react";
import { Search, MessageCircle, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { MobileBottomNav } from "./MobileBottomNav";

export const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const showMobileNav = !(location.pathname.startsWith('/student') || location.pathname.startsWith('/superadmin'));

  const handleLogin = (email: string, password: string) => {
    const ok = login(email, password);
    if (!ok) return;
    // Navigate rules: superadmin -> admin panel; student -> student panel
    if (email === 'superadmin@sudoteach.com') {
      navigate('/superadmin');
    } else {
      navigate('/student');
    }
  };

  const handleAdminAccess = () => {
    if (user?.role === 'superadmin') {
      navigate('/superadmin');
    } else if (user?.role === 'student') {
      navigate('/student');
    }
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-card/10 border-b border-border/20 backdrop-blur supports-[backdrop-filter]:bg-card/10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Mobile top bar: logo + long search */}
          <div className="md:hidden flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}
              aria-label="Bosh sahifa">
              <img src="https://i.ibb.co/4g0pxg2Q/logo.png" alt="Avaz Coder logo" className="w-9 h-9 rounded-lg object-cover" />
              <span className="font-bold text-primary">Avaz Coder</span>
            </div>
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Kurs qidirish..."
                  className="pl-10 w-full"
                />
              </div>
            </div>
          </div>

          {/* Desktop header */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                <img src="https://i.ibb.co/4g0pxg2Q/logo.png" alt="Avaz Coder logo" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                <span className="font-bold text-primary">Avaz Coder</span>
              </div>
              <nav className="flex items-center gap-6">
                <Button variant="ghost" className="flex items-center gap-2" onClick={() => navigate('/contact')}>
                  Bog'lanish
                </Button>
                <Button variant="ghost" className="flex items-center gap-2" asChild>
                  <a href="https://t.me/avazcoder_bot" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" />
                    Telegram
                  </a>
                </Button>
              </nav>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Kurs qidirish..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{user.name}</span>
                    {(user.role === 'superadmin' || user.role === 'student') && (
                      <Badge variant="secondary">{user.role === 'superadmin' ? 'Admin' : 'Talaba'}</Badge>
                    )}
                  </div>
                  {(user.role === 'superadmin' || user.role === 'student') && (
                    <Button variant="outline" onClick={handleAdminAccess}>
                      Boshqaruv paneli
                    </Button>
                  )}
                  <Button variant="ghost" onClick={logout}>
                    Chiqish
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setIsAuthModalOpen(true)}>
                    Ro'yxatdan o'tish
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2" onClick={() => setIsAuthModalOpen(true)}>
                    <LogIn className="w-4 h-4" />
                    Kirish
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth modal remains global */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Mobile bottom navigation */}
      {showMobileNav && <MobileBottomNav />}
    </>
  );
};