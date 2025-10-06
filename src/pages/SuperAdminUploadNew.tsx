import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/superadmin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Video } from "lucide-react";
import { Link } from "react-router-dom";

const SuperAdminUploadNew = () => {
  useEffect(() => {
    document.title = "Upload | Super Admin";
    const desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Manage courses and add video lessons - Super Admin Upload";
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

  // Mock existing courses data
  const [courses] = useState([
    {
      id: 1,
      title: "Python Pro – to'liq kurs",
      videoCount: 24,
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=150&h=150&fit=crop",
      isActive: true,
    },
    {
      id: 2,
      title: "Telegram Bot yaratish",
      videoCount: 16,
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=150&fit=crop",
      isActive: true,
    },
    {
      id: 3,
      title: "Python Masalalar",
      videoCount: 32,
      thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=150&h=150&fit=crop",
      isActive: false,
    },
  ]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1">
          <header className="sticky top-0 z-40 bg-card/60 backdrop-blur border-b border-border">
            <div className="px-4 h-14 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <span className="text-sm text-muted-foreground">Kurs boshqaruvi</span>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Upload</h1>
              <Link to="/superadmin/upload/create">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Yangi kurs qo'shish
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{course.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Video className="w-4 h-4" />
                          <span>{course.videoCount} ta video</span>
                        </div>
                        <div className="mt-1">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              course.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {course.isActive ? "Aktiv" : "Aktiv emas"}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link 
                        to={`/superadmin/upload/course/${course.id}/videos`}
                        className="flex-1"
                      >
                        <Button variant="outline" className="w-full">
                          <Video className="w-4 h-4 mr-2" />
                          Video qo'shish
                        </Button>
                      </Link>
                      <Link 
                        to={`/superadmin/upload/course/${course.id}/edit`}
                        className="flex-1"
                      >
                        <Button variant="secondary" className="w-full">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Tahrirlash
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SuperAdminUploadNew;