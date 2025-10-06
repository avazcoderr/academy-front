import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/superadmin/AdminSidebar";
import { useParams } from "react-router-dom";
import { adminCourses } from "@/data/adminCourses";

const SuperAdminCourseDetail = () => {
  const { id } = useParams();
  const course = adminCourses.find((c) => String(c.id) === id);

  useEffect(() => {
    document.title = course ? `${course.title} — Lessons | Super Admin` : "Course not found";
    const desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = course ? `${course.title} video darsliklar ro'yxati` : "Course detail page";
      document.head.appendChild(m);
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = window.location.href;
      document.head.appendChild(link);
    }
  }, [course]);

  if (!course) {
    return <div className="p-6">Course not found</div>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1">
          <header className="sticky top-0 z-40 bg-card/60 backdrop-blur border-b border-border">
            <div className="px-4 h-14 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <span className="text-sm text-muted-foreground">{course.title}</span>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 space-y-6">
            <h1 className="text-2xl font-semibold">{course.title} — Video darsliklar</h1>
            <p className="text-sm text-muted-foreground">Qo'shilgan vaqti: {course.createdAt} • {course.enrolledCount} ta o'quvchi</p>

            <div className="space-y-6">
              {course.videos.map((v) => (
                <article key={v.id} className="space-y-2">
                  <h4 className="font-medium">{v.title}</h4>
                  <video src={v.url} controls className="w-full rounded border border-border" />
                </article>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SuperAdminCourseDetail;
