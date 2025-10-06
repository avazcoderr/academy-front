import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MessageSquare, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  comment: string;
  course: string;
  rating: number;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Akmal Karimov",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    comment: "Python kursi menga dasturlash dunyosini ochib berdi. Ustoz juda yaxshi tushuntiradi va amaliy mashg'ulotlar foydali.",
    course: "Python dasturlash tili",
    rating: 5,
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "Nilufar Toshmatova",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    comment: "Aiogram kursi orqali o'z bot biznesiimni boshladim. Endi yaxshi daromad qilyapman. Rahmat!",
    course: "Aiogram 3 – Telegram bot",
    rating: 5,
    date: "2024-02-08"
  },
  {
    id: 3,
    name: "Sardor Abdullayev",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    comment: "SQL kursi database bilan ishlashni mukammal o'rgatdi. Ish topishda katta yordam berdi.",
    course: "SQL bilan ishlash",
    rating: 5,
    date: "2024-01-22"
  },
  {
    id: 4,
    name: "Malika Rahimova",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    comment: "Flask kursi web development ga kirishim uchun ajoyib asos bo'ldi. Barcha mavzular aniq va tushunarli.",
    course: "Flask",
    rating: 5,
    date: "2024-02-14"
  },
  {
    id: 5,
    name: "Jasur Yusupov",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    comment: "FastAPI kursi zamonaviy backend yaratishni o'rgatdi. Endi freelance loyihalarda ishlayapman.",
    course: "FastAPI",
    rating: 5,
    date: "2024-03-01"
  }
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // 5 soniyada bir marta

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <MessageSquare className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">O'quvchilar fikrlari</h2>
        </div>
        <p className="text-lg text-muted-foreground">
          Bizning kurslarni bitirgan o'quvchilarning fikr-mulohazalari
        </p>
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className={`pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 transition-all duration-1000 ease-in-out ${
                index === currentIndex ? 'animate-fade-in' : ''
              }`}>
                <Card className="h-full bg-card/50 backdrop-blur border-border/20 hover:bg-card/70 transition-all duration-300 animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.course}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-foreground/90 mb-4 leading-relaxed">
                      "{testimonial.comment}"
                    </p>
                    
                    <p className="text-xs text-muted-foreground">
                      {formatDate(testimonial.date)}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-background/80 backdrop-blur border-border/20" />
          <CarouselNext className="right-0 bg-background/80 backdrop-blur border-border/20" />
        </Carousel>
      </div>
      
      <div className="flex justify-center mt-8 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'
            }`}
            aria-label={`Testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};