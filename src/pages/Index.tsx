import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { CourseSection } from "@/components/CourseSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";

import pythonLogo from "@/assets/python.svg";

const Index = () => {
  const discountCourses = [
    {
      id: 1,
      title: "Python dasturlash tili",
      description: "Noldan boshlab Python asoslari va amaliy loyihalar bilan o'rganing.",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=150&h=150&fit=crop",
      currentPrice: "Tez orada",
      published: false
    },
    {
      id: 2,
      title: "Aiogram 3 – Telegram bot",
      description: "Aiogram 3 bilan zamonaviy Telegram botlar yaratishni boshlang.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=150&fit=crop&crop=face",
      currentPrice: "Tez orada",
      published: false
    },
    {
      id: 3,
      title: "SQL bilan ishlash",
      description: "Praktik misollar orqali SQL asoslari va murakkab so'rovlar.",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=150&h=150&fit=crop",
      currentPrice: "Tez orada",
      published: false
    },
    {
      id: 4,
      title: "Flask",
      description: "Flask yordamida yengil va tezkor web-ilovalar yarating.",
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=150&h=150&fit=crop",
      currentPrice: "Tez orada",
      published: false
    },
    {
      id: 5,
      title: "FastAPI",
      description: "FastAPI bilan yuqori samarali API larni ishga tushiring.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=150&h=150&fit=crop",
      currentPrice: "Tez orada",
      published: false
    },
    {
      id: 6,
      title: "DRF + Django",
      description: "Django REST Framework bilan kuchli backend API lar yarating.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=150&fit=crop",
      currentPrice: "Tez orada",
      published: false
    }
  ];




  return (
    <div className="min-h-screen bg-background pt-20 pb-16 md:pb-0">
      <Header />
      <HeroBanner />
      
      <CourseSection 
        title="Kurslar"
        icon={<img src={pythonLogo} alt="Python logo" className="w-6 h-6" />}
        courses={discountCourses}
      />
      
      <div className="bg-muted/30 py-2">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            Maktab tug'ilgan kuni munosabati bilan!
          </p>
        </div>
      </div>
      
      <TestimonialsSection />
      
      <Footer />
    </div>
  );
};

export default Index;
