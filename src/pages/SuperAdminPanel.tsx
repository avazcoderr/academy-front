import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/superadmin/AdminSidebar";
import { Filter, Plus, Search as SearchIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { getAdminCourses, toggleCoursePublish } from "@/services/api";
import { toast } from "sonner";
import EditCourseDialog, { AdminCourseRow } from "@/components/superadmin/EditCourseDialog";

export const SuperAdminPanel = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    document.title = "Super Admin Dashboard | Avaz Academy";
    const metaDesc = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!metaDesc) {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Super Admin dashboard for Avaz Academy: manage uploads, highlights and clips.";
      document.head.appendChild(m);
    }
    if (!canonical) {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = window.location.href;
      document.head.appendChild(link);
    }
  }, []);

  const [rows, setRows] = useState<any[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<AdminCourseRow | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAdminCourses();
        setRows(data || []);
      } catch (e) {
        // ignore demo
      }
    })();
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />

        <div className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-card/60 backdrop-blur border-b border-border">
            <div className="px-4 h-14 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <span className="text-sm text-muted-foreground">clipmatic.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">Super Admin</Badge>
                <span className="text-sm text-muted-foreground">{user?.name}</span>
                <Button variant="outline" size="sm" onClick={logout}>Chiqish</Button>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="px-4 py-6 space-y-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>

            {/* Gradient CTA card */}
            <Card className="p-6 border-border bg-gradient-to-r from-primary to-primary/70 text-primary-foreground shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Generate automated highlights</h2>
                  <p className="text-primary-foreground/80 text-sm mt-1">
                    Upload a game or livestream link. We'll detect all the key moments for you.
                  </p>
                </div>
                <Button variant="secondary">
                  <Plus className="w-4 h-4 mr-2" /> Generate New Highlights
                </Button>
              </div>
            </Card>

            {/* Tabs */}
            <div className="flex items-center justify-between">
              <Tabs defaultValue="completed">
                <TabsList>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search files..." className="pl-9 w-56" aria-label="Search files" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" /> Upload
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kurs</TableHead>
                    <TableHead>Qo'shilgan vaqti</TableHead>
                    <TableHead>Foydalanuvchilar</TableHead>
                    <TableHead>Holati</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img src={r.thumbnail || "/placeholder.svg"} alt={`${r.title} kursining rasmi`} className="w-10 h-10 rounded object-cover" loading="lazy" />
                          <span className="font-medium">{r.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{r.createdAt}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{r.enrolledCount} ta o'quvchi</Badge>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={!!r.published}
                          onCheckedChange={async (checked) => {
                            try {
                              await toggleCoursePublish(r.id, checked);
                              setRows((prev) => prev.map((x) => (x.id === r.id ? { ...x, published: checked } : x)));
                              toast.success(checked ? "Kurs sotuvga qo'yildi" : "Kurs tez orada boshlanadi");
                            } catch (e: any) {
                              toast.error(e.message || "Xatolik");
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="link" className="px-0" onClick={() => window.open(`/superadmin/course/${r.id}`, "_blank") }>
                          View Highlights
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};