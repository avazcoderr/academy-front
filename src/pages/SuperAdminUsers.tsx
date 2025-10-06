import { useEffect, useMemo, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/superadmin/AdminSidebar";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const mockUsers = [
  { id: 1, name: "Aliyev Bek", username: "bek", phone: "+998 90 123 45 67", purchased: 2, totalSpent: 998000, joinedAt: "2025-06-10" },
  { id: 2, name: "Olimova Laylo", username: "laylo", phone: "+998 99 777 77 77", purchased: 0, totalSpent: 0, joinedAt: "2025-06-28" },
  { id: 3, name: "Karimov Jasur", username: "jasur", phone: "+998 97 555 55 55", purchased: 5, totalSpent: 3499000, joinedAt: "2025-05-21" },
];

const SuperAdminUsers = () => {
  useEffect(() => {
    document.title = "Users | Super Admin";
    const desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = "Users management: buyers and visitors with filters.";
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

  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    let rows = mockUsers;
    if (tab === "buyers") rows = rows.filter((u) => u.purchased > 0);
    if (tab === "visitors") rows = rows.filter((u) => u.purchased === 0);
    if (q.trim()) rows = rows.filter((u) => u.name.toLowerCase().includes(q.toLowerCase()) || u.username.toLowerCase().includes(q.toLowerCase()));
    return rows;
  }, [tab, q]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1">
          <header className="sticky top-0 z-40 bg-card/60 backdrop-blur border-b border-border">
            <div className="px-4 h-14 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <span className="text-sm text-muted-foreground">Foydalanuvchilar</span>
              </div>
              <div className="flex items-center gap-2">
                <input className="h-9 w-56 rounded-md border border-input bg-background px-3 text-sm" placeholder="Qidirish..." value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
            </div>
          </header>

          <main className="px-4 py-6 space-y-6">
            <h1 className="text-2xl font-semibold">Users</h1>

            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="all">Barchasi</TabsTrigger>
                <TabsTrigger value="buyers">Sotib olganlar</TabsTrigger>
                <TabsTrigger value="visitors">Sotib olmaganlar</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Foydalanuvchi</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Sotib olgan kurslari</TableHead>
                    <TableHead>Jami to'lov</TableHead>
                    <TableHead>Qo'shilgan sana</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>{u.name}</TableCell>
                      <TableCell className="text-muted-foreground">{u.username}</TableCell>
                      <TableCell>{u.phone}</TableCell>
                      <TableCell>
                        {u.purchased > 0 ? (
                          <Badge variant="secondary">{u.purchased} ta kurs</Badge>
                        ) : (
                          <Badge variant="outline">Yo'q</Badge>
                        )}
                      </TableCell>
                      <TableCell>{u.totalSpent.toLocaleString()} so'm</TableCell>
                      <TableCell className="text-muted-foreground">{u.joinedAt}</TableCell>
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

export default SuperAdminUsers;
