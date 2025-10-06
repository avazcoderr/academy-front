import React, { useEffect, useMemo, useRef, useState } from "react";
// Sidebar removed for custom responsive layout
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { courses, CourseItem, getCourseById } from "@/data/courses";
import { toast } from "sonner";
import { BookOpen, Library, User as UserIcon, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { StudentBottomNav } from "@/components/student/StudentBottomNav";
import { StudentProfileCard } from "@/components/student/StudentProfileCard";
import { PurchasedCourseCard } from "@/components/student/PurchasedCourseCard";
import { CoursePlayer } from "@/components/student/CoursePlayer";

// Local storage keys
const LS_PURCHASES = "purchased_course_ids";
const LS_PROFILE = "student_profile";

type TabKey = "my-courses" | "profile";

type StudentProfile = {
  avatar?: string;
  fullName?: string;
  phone?: string;
  username?: string;
};

// Lessons and playback moved to CoursePlayer component

export const StudentPanel: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [active, setActive] = useState<TabKey>("my-courses");
  const [purchases, setPurchases] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem(LS_PURCHASES);
      if (raw) {
        const parsed = JSON.parse(raw) as number[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      const defaultIds = (courses || []).slice(0, 2).map((c) => c.id);
      localStorage.setItem(LS_PURCHASES, JSON.stringify(defaultIds));
      return defaultIds;
    } catch {
      const fallback = (courses || []).slice(0, 2).map((c) => c.id);
      return fallback;
    }
  });
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  // Profile state
  const initialProfile: StudentProfile = useMemo(() => {
    try {
      const saved = localStorage.getItem(LS_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      fullName: user?.name,
      username: user?.email?.split("@")[0] ?? "",
      phone: "",
    };
  }, [user]);

  const [profile, setProfile] = useState<StudentProfile>(initialProfile);
  const [editing, setEditing] = useState(false);

  const purchasedCourses: CourseItem[] = useMemo(
    () =>
      purchases.map((id) => getCourseById(id)).filter(Boolean) as CourseItem[],
    [purchases]
  );

  const notPurchasedCourses: CourseItem[] = useMemo(
    () => courses.filter((c) => !purchases.includes(c.id)),
    [purchases]
  );

  useEffect(() => {
    document.title = "O'quvchi paneli | Avaz Academy";
  }, []);

  const handleBuy = (id: number) => {
    if (purchases.includes(id)) return;
    const next = [...purchases, id];
    setPurchases(next);
    localStorage.setItem(LS_PURCHASES, JSON.stringify(next));
    toast.success("Kurs sotib olindi!");
  };

  const handleSaveProfile = () => {
    localStorage.setItem(LS_PROFILE, JSON.stringify(profile));
    setEditing(false);
    toast.success("Profil muvaffaqiyatli saqlandi");
  };

  const selectedCourse = selectedCourseId
    ? getCourseById(selectedCourseId)
    : null;

  return (
    <div className="w-full min-h-screen">
      <header className="flex items-center gap-3 border-b h-12 px-3">
        <h1 className="text-lg font-semibold">
          {active === "my-courses"
            ? "Mening kurslarim"
            : "Akkount ma'lumotlari"}
        </h1>
      </header>

      <main
        className={`max-w-7xl mx-auto w-full px-4 py-6 ${
          isMobile ? "pb-24" : ""
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-[320px,1fr] gap-6">
          {!isMobile && (
            <StudentProfileCard
              name={profile.fullName || user?.name || "Foydalanuvchi"}
              active={active}
              onNavigate={(t) => setActive(t)}
              onLogout={() => {
                logout();
                navigate("/");
              }}
            />
          )}
          <div>
            {active === "my-courses" && (
              !selectedCourse ? (
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {purchasedCourses.length === 0 ? (
                    <Card>
                      <CardContent className="p-6 text-center text-muted-foreground">
                        Hali kurs sotib olinmagan.
                      </CardContent>
                    </Card>
                  ) : (
                    purchasedCourses.map((c) => (
                      <PurchasedCourseCard key={c.id} course={c} onView={setSelectedCourseId} />
                    ))
                  )}
                </section>
              ) : (
                <section>
                  <CoursePlayer course={selectedCourse} onBack={() => setSelectedCourseId(null)} />
                </section>
              )
            )}

            {active === "profile" && (
              <section className="max-w-2xl">
                <Card>
                  <CardHeader>
                    <CardTitle>Profil ma'lumotlari</CardTitle>
                    <CardDescription>
                      Shaxsiy ma'lumotlaringizni yangilashingiz mumkin.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!editing ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <span className="text-sm text-muted-foreground">
                            To‘lovlar
                          </span>
                          <span className="col-span-2 font-medium">
                            {purchasedCourses.reduce((sum, c) => {
                              const price = Number(
                                (c.currentPrice || "").replace(/[^0-9]/g, "")
                              );
                              return sum + (isNaN(price) ? 0 : price);
                            }, 0)}{" "}
                            ₽
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <span className="text-sm text-muted-foreground">
                            Ism Familiya
                          </span>
                          <span className="col-span-2">
                            {profile.fullName || user?.name}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <span className="text-sm text-muted-foreground">
                            Telefon
                          </span>
                          <span className="col-span-2">
                            {profile.phone || "—"}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <span className="text-sm text-muted-foreground">
                            Username
                          </span>
                          <span className="col-span-2">{profile.username}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <span className="text-sm text-muted-foreground">
                            Parol
                          </span>
                          <span className="col-span-2">********</span>
                        </div>
                        <div className="pt-2 flex gap-2">
                          <Button onClick={() => setEditing(true)}>
                            O'zgartirish
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              logout();
                              navigate("/");
                            }}
                          >
                            Chiqish
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <form
                        className="space-y-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSaveProfile();
                        }}
                      >
                        <div className="grid gap-2">
                          <Label htmlFor="fullName">Ism Familiya</Label>
                          <Input
                            id="fullName"
                            value={profile.fullName ?? ""}
                            onChange={(e) =>
                              setProfile((p) => ({
                                ...p,
                                fullName: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Telefon</Label>
                          <Input
                            id="phone"
                            value={profile.phone ?? ""}
                            onChange={(e) =>
                              setProfile((p) => ({
                                ...p,
                                phone: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={profile.username ?? ""}
                            onChange={(e) =>
                              setProfile((p) => ({
                                ...p,
                                username: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button type="submit">Saqlash</Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setEditing(false)}
                          >
                            Bekor qilish
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => {
                              logout();
                              navigate("/");
                            }}
                          >
                            Chiqish
                          </Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </section>
            )}
          </div>
        </div>
      </main>
      {isMobile && (
        <StudentBottomNav
          active={active}
          onChange={setActive}
          onLogout={() => {
            logout();
            navigate("/");
          }}
        />
      )}
    </div>
  );
};


export default StudentPanel;
