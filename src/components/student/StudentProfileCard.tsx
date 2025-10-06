import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User as UserIcon } from "lucide-react";

export type StudentTabKey = "my-courses" | "profile";

interface Props {
  name: string;
  active: StudentTabKey;
  onNavigate: (tab: StudentTabKey) => void;
  onLogout: () => void;
}

export function StudentProfileCard({ name, active, onNavigate, onLogout }: Props) {
  const isActive = (tab: StudentTabKey) => active === tab;

  return (
    <aside className="hidden md:block">
      <Card className="overflow-hidden">
        <div className="bg-primary text-primary-foreground p-6">
          <div className="w-16 h-16 rounded-full bg-background/20 grid place-items-center mb-3">
            <UserIcon className="w-8 h-8" />
          </div>
          <p className="text-sm opacity-80">Assalomu alaykum</p>
          <h2 className="text-xl font-semibold leading-tight">{name}</h2>
          <p className="text-xs opacity-80 mt-1">Umumiy reyting: —</p>
        </div>
        <CardContent className="p-4 space-y-3">
          <Button
            className="w-full justify-between"
            variant={isActive("my-courses") ? "default" : "secondary"}
            onClick={() => onNavigate("my-courses")}
          >
            Mening kurslarim <span className="ml-2">›</span>
          </Button>
          <Button
            className="w-full justify-between"
            variant={isActive("profile") ? "default" : "secondary"}
            onClick={() => onNavigate("profile")}
          >
            Akkount ma'lumotlari <span className="ml-2">›</span>
          </Button>
          <div className="pt-1">
            <Button variant="destructive" className="w-full" onClick={onLogout}>
              Chiqish
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

export default StudentProfileCard;
