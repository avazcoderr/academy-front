import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/superadmin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getSiteSettings, updateSiteSettings } from "@/services/api";

const SuperAdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [siteName, setSiteName] = useState("");
  const [address, setAddress] = useState("");
  const [telegramBotToken, setTelegramBotToken] = useState("");
  const [telegramChatId, setTelegramChatId] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Settings | Super Admin";
    const desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Manage site name, logo, address and Telegram bot settings.";
      document.head.appendChild(m);
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = window.location.href;
      document.head.appendChild(link);
    }

    (async () => {
      try {
        const data = await getSiteSettings();
        setSiteName(data.siteName || "");
        setAddress(data.address || "");
        setTelegramBotToken(data.telegramBotToken || "");
        setTelegramChatId(data.telegramChatId || "");
        if (data.logoUrl) setLogoPreview(data.logoUrl);
      } catch (e: any) {
        // optional: ignore 404 on first run
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSave = async () => {
    try {
      setSaving(true);
      await updateSiteSettings({ siteName, address, telegramBotToken, telegramChatId, logoFile });
      toast.success("Sozlamalar saqlandi");
    } catch (e: any) {
      toast.error(e.message || "Saqlashda xatolik");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1">
          <header className="sticky top-0 z-40 bg-card/60 backdrop-blur border-b border-border">
            <div className="px-4 h-14 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <span className="text-sm text-muted-foreground">Settings</span>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 space-y-6">
            <h1 className="text-2xl font-semibold">Sayt sozlamalari</h1>

            <Card className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Sayt nomi</label>
                  <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="Masalan: Avaz Academy" />
                </div>
                <div>
                  <label className="text-sm font-medium">Manzil</label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Manzil" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Telegram Bot Token</label>
                  <Input value={telegramBotToken} onChange={(e) => setTelegramBotToken(e.target.value)} placeholder="123456:ABC..." />
                </div>
                <div>
                  <label className="text-sm font-medium">Telegram Chat ID</label>
                  <Input value={telegramChatId} onChange={(e) => setTelegramChatId(e.target.value)} placeholder="-100..." />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="text-sm font-medium">Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0] || null;
                      setLogoFile(f);
                      setLogoPreview(f ? URL.createObjectURL(f) : null);
                    }}
                    className="block w-full text-sm file:mr-3 file:rounded-md file:border file:bg-secondary file:px-3 file:py-1.5"
                  />
                </div>
                {logoPreview && (
                  <div className="flex items-center gap-3">
                    <img src={logoPreview} alt="Sayt logosi" className="h-10 w-10 rounded object-cover border" />
                    <span className="text-xs text-muted-foreground">Yangi logoni saqlash uchun Save tugmasini bosing</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button onClick={onSave} disabled={saving || loading}>{saving ? "Saqlanmoqda..." : "Saqlash"}</Button>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SuperAdminSettings;
