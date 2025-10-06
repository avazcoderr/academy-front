import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/superadmin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Upload, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const SuperAdminUploadVideos = () => {
  const { courseId } = useParams();
  
  useEffect(() => {
    document.title = "Video qo'shish | Super Admin";
    const desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Kurs uchun video darsliklar qo'shish va boshqarish";
      document.head.appendChild(m);
    }
  }, []);

  // Mock course data
  const [course] = useState({
    id: courseId,
    title: courseId === "1" ? "Python Pro – to'liq kurs" : 
           courseId === "2" ? "Telegram Bot yaratish" : "Python Masalalar",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=150&h=150&fit=crop"
  });

  type VideoRow = { 
    id: string; 
    title: string; 
    topic: string; 
    description: string;
    file: File | null;
    url?: string;
  };

  const [videos, setVideos] = useState<VideoRow[]>([
    { 
      id: crypto.randomUUID(), 
      title: "", 
      topic: "", 
      description: "", 
      file: null 
    }
  ]);

  const [saving, setSaving] = useState(false);

  const addVideoRow = () => 
    setVideos((prev) => [...prev, { 
      id: crypto.randomUUID(), 
      title: "", 
      topic: "", 
      description: "", 
      file: null 
    }]);

  const removeVideoRow = (id: string) => 
    setVideos((prev) => (prev.length === 1 ? prev : prev.filter((v) => v.id !== id)));

  const updateVideo = (id: string, patch: Partial<VideoRow>) => 
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));

  const handleSaveVideos = async () => {
    if (saving) return;
    
    const validVideos = videos.filter(v => v.title.trim() && v.topic.trim());
    if (validVideos.length === 0) {
      toast.error("Kamida bitta to'liq to'ldirilgan video bo'lishi kerak");
      return;
    }

    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`${validVideos.length} ta video muvaffaqiyatli qo'shildi!`);
    } catch (error) {
      toast.error("Video qo'shishda xatolik yuz berdi");
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
                <Link 
                  to="/superadmin/upload" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Upload bo'limiga qaytish
                </Link>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-semibold">{course.title}</h1>
                <p className="text-muted-foreground">Kurs uchun video darsliklar qo'shish</p>
              </div>
            </div>

            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Video darsliklar</h2>
                <Button onClick={addVideoRow} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Yangi video
                </Button>
              </div>

              <div className="space-y-4">
                {videos.map((video, index) => (
                  <div key={video.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Dars {index + 1}</h3>
                      {videos.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeVideoRow(video.id)}
                        >
                          <Trash className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium block mb-2">
                          Dars nomi *
                        </label>
                        <Input 
                          value={video.title} 
                          onChange={(e) => updateVideo(video.id, { title: e.target.value })} 
                          placeholder={`Dars ${index + 1} nomi`}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">
                          Mavzu/Bo'lim *
                        </label>
                        <Input 
                          value={video.topic} 
                          onChange={(e) => updateVideo(video.id, { topic: e.target.value })} 
                          placeholder="Masalan: Kirish, Asoslar, Amaliyot"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-2">
                        Dars tavsifi
                      </label>
                      <textarea 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]" 
                        value={video.description}
                        onChange={(e) => updateVideo(video.id, { description: e.target.value })}
                        placeholder="Dars haqida batafsil ma'lumot, o'rganiluvchi mavzular..."
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-2">
                        Video fayl *
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => updateVideo(video.id, { file: e.target.files?.[0] || null })}
                          className="hidden"
                          id={`video-file-${video.id}`}
                        />
                        <label 
                          htmlFor={`video-file-${video.id}`}
                          className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          {video.file ? video.file.name : "Video faylni tanlang"}
                        </label>
                        {video.file && (
                          <span className="text-sm text-muted-foreground">
                            {(video.file.size / (1024 * 1024)).toFixed(1)} MB
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Link to="/superadmin/upload">
                  <Button variant="outline">
                    Bekor qilish
                  </Button>
                </Link>
                <Button 
                  onClick={handleSaveVideos}
                  disabled={saving}
                >
                  {saving ? (
                    <>Saqlanmoqda...</>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Videolarni saqlash
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SuperAdminUploadVideos;