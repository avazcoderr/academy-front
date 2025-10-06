import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

export const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginData.email, loginData.password);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (registerData.password !== registerData.confirmPassword) {
      alert("Parollar mos kelmaydi");
      return;
    }
    onLogin(registerData.email, registerData.password);
    onClose();
  };

  const demoAccounts = [
    { type: "Superadmin", email: "superadmin@sudoteach.com", password: "admin123" },
    { type: "O'qituvchi", email: "teacher@sudoteach.com", password: "teacher123" },
    { type: "O'quvchi", email: "student@sudoteach.com", password: "student123" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Avaz academy ga xush kelibsiz</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Kirish</TabsTrigger>
            <TabsTrigger value="register">Ro'yxatdan o'tish</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({...prev, email: e.target.value}))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Parol</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Parolni kiriting"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({...prev, password: e.target.value}))}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Kirish
              </Button>
            </form>
            
            <div className="space-y-3">
              <p className="text-sm text-center text-muted-foreground">Test uchun demo hisoblar:</p>
              {demoAccounts.map((account, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={() => {
                    setLoginData({ email: account.email, password: account.password });
                  }}
                >
                  <span className="font-medium">{account.type}:</span>
                  <span className="ml-2">{account.email}</span>
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Ism</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Ismingizni kiriting"
                  value={registerData.name}
                  onChange={(e) => setRegisterData(prev => ({...prev, name: e.target.value}))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData(prev => ({...prev, email: e.target.value}))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Parol</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Kamida 6 ta belgi"
                  value={registerData.password}
                  onChange={(e) => setRegisterData(prev => ({...prev, password: e.target.value}))}
                  required
                  minLength={6}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Parolni tasdiqlang</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Parolni qaytaring"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData(prev => ({...prev, confirmPassword: e.target.value}))}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                Ro'yxatdan o'tish
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};