import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-transparent border-t border-border/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
              aria-label="Bosh sahifa"
            >
              <img
                src="https://i.ibb.co/4g0pxg2Q/logo.png"
                alt="Avaz Coder logo"
                className="w-9 h-9 rounded-lg object-cover"
              />
              <span className="font-bold text-primary">Avaz Coder</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Sanoat ekspertlaridan amaliy kurslar bilan onlayn dasturlash
              maktabi.
            </p>
            <div className="flex gap-4">
              <a
                href="https://t.me/avazcoder_bot?start"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              <a
                href="mailto:itbrain.denov@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>

              <a
                href="tel:+998994104879"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Kurslar</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Yangi boshlovchilar uchun Python
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Web-dasturlash
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Ma'lumotlar bazalari
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Telegram botlar
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Discord botlar
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Yordam</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Yordam
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Ko'p beriladigan savollar
              </a>
              <a
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Bog'lanish
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Xato haqida xabar berish
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Qoidalar
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Bog'lanish</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>itbrain.denov@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+998 (99) 410-48-79</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Surxondaryo, O'zbekiston</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Avaz Coder. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Maxfiylik siyosati
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Foydalanish shartlari
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
