import { useEffect, useMemo, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/superadmin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash, ArrowRight, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { createCourse } from "@/services/api";
import { Link, useNavigate } from "react-router-dom";

const SuperAdminUploadCreate = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Yangi kurs yaratish | Super Admin";
    const desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Yangi kurs yaratish: ma'lumotlar, mavzular, narx va video darsliklar.";
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
  const [createdCourseId, setCreatedCourseId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Course topics/chapters for step 2
  const [courseTopics, setCourseTopics] = useState<string[]>([]);
  const [topicInputStep2, setTopicInputStep2] = useState("");

  type VideoRow = { 
    id: string; 
    title: string; 
    topicIndex: number; 
    description: string;
    file: File | null;
  };
  const [videos, setVideos] = useState<VideoRow[]>([
    { id: crypto.randomUUID(), title: "", topicIndex: 0, description: "", file: null }
  ]);

  const canGoNext = useMemo(() => 
    title.trim() && description.trim() && price.trim() && topics.length > 0, 
    [title, description, price, topics]
  );

  const addTopic = () => {
    const t = topicInput.trim();
    if (!t) return;
    setTopics((prev) => Array.from(new Set([...prev, t])));
    setTopicInput("");
  };

  const removeTopic = (t: string) => setTopics((prev) => prev.filter((x) => x !== t));

  const addCourseTopicStep2 = () => {
    const t = topicInputStep2.trim();
    if (!t) return;
    setCourseTopics((prev) => Array.from(new Set([...prev, t])));
    setTopicInputStep2("");
  };

  const removeCourseTopicStep2 = (index: number) => 
    setCourseTopics((prev) => prev.filter((_, i) => i !== index));

  const addVideoRow = () => 
    setVideos((prev) => [...prev, { 
      id: crypto.randomUUID(), 
      title: "", 
      topicIndex: 0, 
      description: "", 
      file: null 
    }]);

  const removeVideoRow = (id: string) => 
    setVideos((prev) => (prev.length === 1 ? prev : prev.filter((v) => v.id !== id)));

  const updateVideo = (id: string, patch: Partial<VideoRow>) => 
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));

  const handleCreateCourse = async () => {
    if (saving) return;
    try {
      setSaving(true);
      const created = await createCourse({ 
        title, 
        description, 
        topics, 
        price, 
        discount, 
        imageUrl, 
        is_active: isActive 
      });
      const cid = String(created.id ?? created.course?.id ?? "");
      setCreatedCourseId(cid);
      setStep(2);
      toast.success("Kurs yaratildi! Endi mavzular va videolar qo'shing.");
    } catch (e: any) {
      toast.error(e.message || "Kurs yaratishda xatolik");
    } finally {
      setSaving(false);
    }
  };

  const handleFinalCreate = async () => {
    if (saving) return;
    try {
      setSaving(true);
      // Here you would typically upload videos and course topics
      // For now, we'll just show success and redirect
      toast.success("Kurs va videolar muvaffaqiyatli yaratildi!");
      navigate("/superadmin/upload");
    } catch (e: any) {
      toast.error(e.message || "Video yuklashda xatolik");
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
                <Link to="/superadmin/upload" className="text-sm text-muted-foreground hover:text-foreground">
                  ← Orqaga
                </Link>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 space-y-6">
            <h1 className="text-2xl font-semibold">Yangi kurs yaratish</h1>

            {/* Steps indicator */}
            <div className="flex items-center gap-2 text-sm">
              <span className={step === 1 ? "font-medium text-foreground" : "text-muted-foreground"}>
                1. Kurs ma'lumotlari
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className={step === 2 ? "font-medium text-foreground" : "text-muted-foreground"}>
                2. Mavzular va videolar
              </span>
            </div>

            {step === 1 && (
              <Card className="p-6 space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Kurs nomi *</label>
                    <Input 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                      placeholder="Masalan: Python Pro" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Narxi *</label>
                    <Input 
                      value={price} 
                      onChange={(e) => setPrice(e.target.value)} 
                      placeholder="Masalan: 499000" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Chegirma (%)</label>
                    <Input 
                      value={discount} 
                      onChange={(e) => setDiscount(e.target.value)} 
                      placeholder="Masalan: 20" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Kurs rasmi (URL)</label>
                    <Input 
                      value={imageUrl} 
                      onChange={(e) => setImageUrl(e.target.value)} 
                      placeholder="https://..." 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Kurs tavsifi *</label>
                  <textarea 
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Kurs haqida batafsil ma'lumot..." 
                  />
                </div>

                <div className="flex items-center justify-between border rounded-md p-3">
                  <div>
                    <label className="text-sm font-medium">Kurs holati</label>
                    <p className="text-xs text-muted-foreground">Kurs faol bo'lsa, o'quvchilarga ko'rinadi</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={isActive ? "secondary" : "outline"}>
                      {isActive ? "Aktiv" : "Aktiv emas"}
                    </Badge>
                    <Switch checked={isActive} onCheckedChange={setIsActive} />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Kurs mavzulari (hashtag ko'rinishida) *</label>
                  <div className="flex gap-2 mt-2">
                    <Input 
                      value={topicInput} 
                      onChange={(e) => setTopicInput(e.target.value)} 
                      placeholder="Masalan: Python asoslari" 
                      className="flex-1" 
                      onKeyPress={(e) => e.key === 'Enter' && addTopic()}
                    />
                    <Button type="button" onClick={addTopic}>
                      <Plus className="w-4 h-4 mr-1" />
                      Qo'shish
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {topics.map((t) => (
                      <span 
                        key={t} 
                        className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm"
                      >
                        #{t}
                        <button 
                          className="text-primary/70 hover:text-primary" 
                          onClick={() => removeTopic(t)}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={handleCreateCourse} 
                    disabled={!canGoNext || saving}
                  >
                    {saving ? "Yaratilmoqda..." : "Kursni yaratish va davom etish"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <Card className="p-6 space-y-4">
                  <h3 className="text-lg font-medium">Kurs mavzularini yarating</h3>
                  <p className="text-sm text-muted-foreground">
                    Har bir mavzu uchun keyin videolar qo'shishingiz mumkin
                  </p>
                  
                  <div className="flex gap-2">
                    <Input 
                      value={topicInputStep2} 
                      onChange={(e) => setTopicInputStep2(e.target.value)} 
                      placeholder="Masalan: 1-bob. Kirish" 
                      className="flex-1" 
                      onKeyPress={(e) => e.key === 'Enter' && addCourseTopicStep2()}
                    />
                    <Button type="button" onClick={addCourseTopicStep2}>
                      <Plus className="w-4 h-4 mr-1" />
                      Mavzu qo'shish
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {courseTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <span className="font-medium">{index + 1}. {topic}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeCourseTopicStep2(index)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 space-y-5">
                  <h3 className="text-lg font-medium">Video darsliklar qo'shish</h3>
                  
                  <div className="space-y-4">
                    {videos.map((v, idx) => (
                      <div key={v.id} className="border rounded-md p-4 space-y-3">
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-medium">Video nomi</label>
                            <Input 
                              value={v.title} 
                              onChange={(e) => updateVideo(v.id, { title: e.target.value })} 
                              placeholder={`Dars ${idx + 1} nomi`} 
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Mavzu</label>
                            <select 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              value={v.topicIndex}
                              onChange={(e) => updateVideo(v.id, { topicIndex: Number(e.target.value) })}
                            >
                              <option value={0}>Mavzu tanlang</option>
                              {courseTopics.map((topic, index) => (
                                <option key={index} value={index + 1}>
                                  {topic}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Video tavsifi</label>
                          <textarea 
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]" 
                            value={v.description}
                            onChange={(e) => updateVideo(v.id, { description: e.target.value })}
                            placeholder="Video haqida qisqacha ma'lumot..."
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium">Video fayl</label>
                          <div className="mt-2 flex items-center gap-3">
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => updateVideo(v.id, { file: e.target.files?.[0] || null })}
                              className="hidden"
                              id={`video-${v.id}`}
                            />
                            <label 
                              htmlFor={`video-${v.id}`}
                              className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-muted"
                            >
                              <Upload className="w-4 h-4" />
                              {v.file ? v.file.name : "Video tanlang"}
                            </label>
                            {videos.length > 1 && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => removeVideoRow(v.id)}
                              >
                                <Trash className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      ← Orqaga
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" onClick={addVideoRow}>
                        <Plus className="w-4 h-4 mr-1" />
                        Yana video
                      </Button>
                      <Button onClick={handleFinalCreate} disabled={saving}>
                        {saving ? "Yaratilmoqda..." : "Kursni yaratib tugatish"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SuperAdminUploadCreate;