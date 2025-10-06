import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, MessageCircle, Send, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Frontend form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Xatolik",
        description: "Iltimos, barcha majburiy maydonlarni to'ldiring",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Xabar yuborildi!",
      description: "Sizning xabaringiz muvaffaqiyatli yuborildi. Tez orada javob beramiz."
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Biz bilan bog'laning</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Savollaringiz bormi? Yordam kerakmi? Biz doimo sizga yordam berishga tayyormiz. 
            Quyidagi shakl orqali bizga xabar yuboring yoki to'g'ridan-to'g'ri bog'laning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Xabar yuborish
              </CardTitle>
              <CardDescription>
                Formani to'ldiring va biz tez orada sizga javob beramiz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ism familiya *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ismingizni kiriting"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email manzil *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Mavzu</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Xabar mavzusi"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Xabar *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Xabaringizni shu yerga yozing..."
                    rows={6}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Xabar yuborish
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Bog'lanish ma'lumotlari
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">itbrain.denov@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Telefon</p>
                    <p className="text-sm text-muted-foreground">+998 (99) 410-48-79</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Manzil</p>
                    <p className="text-sm text-muted-foreground">Surxondaryo, O'zbekiston</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Ish vaqti</p>
                    <p className="text-sm text-muted-foreground">Dush-Shan: 9:00 - 21:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Telegram orqali bog'laning</CardTitle>
                <CardDescription>
                  Eng tez javob olish uchun Telegram botimiz orqali bog'laning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://t.me/avazcoder_bot?start=message" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Telegram botni ochish
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tez-tez beriladigan savollar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium text-sm mb-1">Kurslar qanday o'tiladi?</p>
                  <p className="text-xs text-muted-foreground">Barcha kurslar online formatda video darslar orqali o'tiladi.</p>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">Sertifikat beriladimi?</p>
                  <p className="text-xs text-muted-foreground">Ha, kursni muvaffaqiyatli tugatganingizdan so'ng sertifikat beriladi.</p>
                </div>
                <div>
                  <p className="font-medium text-sm mb-1">To'lov qanday amalga oshiriladi?</p>
                  <p className="text-xs text-muted-foreground">To'lovni Telegram bot orqali amalga oshirishingiz mumkin.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};