import { useEffect, useMemo, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/superadmin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { createCourse, uploadCourseVideo } from "@/services/api";

const SuperAdminUpload = () => {
  useEffect(() => {
    document.title = "Upload Course | Super Admin";
    const desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Create a new course: info, topics, pricing, and upload videos.";
      document.head.appendChild(m);
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = window.location.href;
      document.head.appendChild(link);
    }
  }, []);

  const [step, setStep] = useState<1 | 2>(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topicInput, setTopicInput] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
const [imageUrl, setImageUrl] = useState("");
const [isActive, setIsActive] = useState(true);

 type VideoRow = { id: string; title: string; topic: string; file: File | null };
 const [videos, setVideos] = useState<VideoRow[]>([{ id: crypto.randomUUID(), title: "", topic: "", file: null }]);
 const [createdCourseId, setCreatedCourseId] = useState<string | null>(null);
 const [saving, setSaving] = useState(false);

  const canGoNext = useMemo(() => title.trim() && description.trim() && price.trim(), [title, description, price]);

  const addTopic = () => {
    const t = topicInput.trim();
    if (!t) return;
    setTopics((prev) => Array.from(new Set([...prev, t])));
    setTopicInput("");
  };
  const removeTopic = (t: string) => setTopics((prev) => prev.filter((x) => x !== t));

  const addVideoRow = () => setVideos((prev) => [...prev, { id: crypto.randomUUID(), title: "", topic: "", file: null }]);
  const removeVideoRow = (id: string) => setVideos((prev) => (prev.length === 1 ? prev : prev.filter((v) => v.id !== id)));
  const updateVideo = (id: string, patch: Partial<VideoRow>) => setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));

  const handleCreate = async () => {
    if (saving) return;
    try {
      setSaving(true);
      let cid = createdCourseId;
      if (!cid) {
        const created = await createCourse({ title, description, topics, price, discount, imageUrl, is_active: isActive });
        cid = String(created.id ?? created.course?.id ?? "");
        setCreatedCourseId(cid);
      }
      if (!cid) throw new Error("Course ID topilmadi");

      for (const v of videos) {
        if (v.file) {
          await uploadCourseVideo(cid, { file: v.file, title: v.title, topic: v.topic });
        }
      }

      toast.success("Kurs va videolar yuklandi");
    } catch (e: any) {
      toast.error(e.message || "Xatolik yuz berdi");
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
                <span className="text-sm text-muted-foreground">Kurs yaratish</span>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 space-y-6">
            <h1 className="text-2xl font-semibold">Upload</h1>

            {/* Steps indicator */}
            <div className="flex items-center gap-2 text-sm">
              <span className={step === 1 ? "font-medium text-foreground" : "text-muted-foreground"}>1. Kurs ma'lumotlari</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className={step === 2 ? "font-medium text-foreground" : "text-muted-foreground"}>2. Video darsliklar</span>
            </div>

            {step === 1 && (
              <Card className="p-6 space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Kurs nomi</label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masalan: Python Pro" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Narxi</label>
                    <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Masalan: 499 000" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Chegirma (%)</label>
                    <Input value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Masalan: 20" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Kurs rasmi (URL)</label>
                    <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Kurs tavsifi</label>
                  <textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Kurs haqida qisqacha ma'lumot" />
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <label className="text-sm font-medium">Holati</label>
                    <p className="text-xs text-muted-foreground">Kurs faol bo'lsa, o'quvchilarga ko'rinadi</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={isActive ? "secondary" : "outline"}>{isActive ? "Aktiv" : "Aktiv emas"}</Badge>
                    <Switch checked={isActive} onCheckedChange={setIsActive} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Mavzular</label>
                  <div className="flex gap-2 mt-2">
                    <Input value={topicInput} onChange={(e) => setTopicInput(e.target.value)} placeholder="Mavzu nomi" className="flex-1" />
                    <Button type="button" onClick={addTopic}><Plus className="w-4 h-4 mr-1" />Qo'shish</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {topics.map((t) => (
                      <span key={t} className="inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs">
                        {t}
                        <button className="text-muted-foreground hover:text-foreground" onClick={() => removeTopic(t)}>×</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="secondary" onClick={handleCreate} disabled={!canGoNext || saving}>
                    {saving ? "Yaratilmoqda..." : "Kursni yaratish"}
                  </Button>
                  <Button onClick={() => canGoNext && setStep(2)} disabled={!canGoNext}>
                    Keyingi bosqich
                  </Button>
                </div>
              </Card>
            )}

            {step === 2 && (
              <Card className="p-6 space-y-5">
                <div className="space-y-4">
                  {videos.map((v, idx) => (
                    <div key={v.id} className="grid md:grid-cols-12 gap-3 items-end border rounded-md p-3">
                      <div className="md:col-span-5">
                        <label className="text-sm font-medium">Video nomi</label>
                        <Input value={v.title} onChange={(e) => updateVideo(v.id, { title: e.target.value })} placeholder={`Dars ${idx + 1} nomi`} />
                      </div>
                      <div className="md:col-span-4">
                        <label className="text-sm font-medium">Video fayl</label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => updateVideo(v.id, { file: e.target.files?.[0] || null })}
                          className="block w-full text-sm file:mr-3 file:rounded-md file:border file:bg-secondary file:px-3 file:py-1.5"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium">Mavzu</label>
                        <Input value={v.topic} onChange={(e) => updateVideo(v.id, { topic: e.target.value })} placeholder="Masalan: Kirish" />
                      </div>
                      <div className="md:col-span-1 flex gap-2">
                        <Button variant="outline" className="w-full" onClick={() => removeVideoRow(v.id)} disabled={videos.length === 1}>
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>Orqaga</Button>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={addVideoRow}><Plus className="w-4 h-4 mr-1" />Yana video</Button>
                    <Button onClick={handleCreate}>Kursni yaratish</Button>
                  </div>
                </div>
              </Card>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SuperAdminUpload;
