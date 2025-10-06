import { useState } from "react";
import { Home, MessageCircle, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "./AuthModal";

export function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const goToPanel = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    if (user.role === "superadmin") return navigate("/superadmin");
    if (user.role === "student") return navigate("/student");
    return navigate("/");
  };

  const handleLogin = (email: string, password: string) => {
    const ok = login(email, password);
    if (!ok) return;
    setIsAuthModalOpen(false);
    if (email === "superadmin@sudoteach.com") {
      navigate("/superadmin");
    } else {
      navigate("/student");
    }
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-t border-border z-50">
        <ul className="grid grid-cols-4">
          <li>
            <button
              aria-label="Bosh sahifa"
              className={`w-full flex flex-col items-center justify-center py-2 text-xs ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => navigate("/")}
            >
              <Home className="h-5 w-5" />
              <span className="mt-1">Bosh sahifa</span>
            </button>
          </li>
          <li>
            <button
              aria-label="Bog'lanish"
              className={`w-full flex flex-col items-center justify-center py-2 text-xs ${
                isActive("/contact") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => navigate("/contact")}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="mt-1">Bog'lanish</span>
            </button>
          </li>
          <li>
            <a
              aria-label="Telegram"
              href="https://t.me/avazcoder_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex flex-col items-center justify-center py-2 text-xs text-muted-foreground"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="mt-1">Telegram</span>
            </a>
          </li>
          <li>
            <button
              aria-label="Profil yoki Panel"
              className={`w-full flex flex-col items-center justify-center py-2 text-xs ${
                isActive("/student") || isActive("/superadmin")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
              onClick={goToPanel}
            >
              <User className="h-5 w-5" />
              <span className="mt-1">Profil</span>
            </button>
          </li>
        </ul>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
