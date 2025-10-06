import React from "react";
import { Library, User, LogOut } from "lucide-react";

export type StudentTabKey = "my-courses" | "profile";

interface Props {
  active: StudentTabKey;
  onChange: (tab: StudentTabKey) => void;
  onLogout: () => void;
}

export function StudentBottomNav({ active, onChange, onLogout }: Props) {
  const isActive = (tab: StudentTabKey) => active === tab;

  return (
    <nav
      aria-label="Student bottom navigation"
      className="md:hidden fixed bottom-0 inset-x-0 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-t border-border z-50"
    >
      <ul className="grid grid-cols-3">
        <li>
          <button
            aria-label="Mening kurslarim"
            className={`w-full flex flex-col items-center justify-center py-2 text-xs ${
              isActive("my-courses") ? "text-primary" : "text-muted-foreground"
            }`}
            onClick={() => onChange("my-courses")}
          >
            <Library className="h-5 w-5" />
            <span className="mt-1">Mening kurslarim</span>
          </button>
        </li>
        <li>
          <button
            aria-label="Profil"
            className={`w-full flex flex-col items-center justify-center py-2 text-xs ${
              isActive("profile") ? "text-primary" : "text-muted-foreground"
            }`}
            onClick={() => onChange("profile")}
          >
            <User className="h-5 w-5" />
            <span className="mt-1">Profil</span>
          </button>
        </li>
        <li>
          <button
            aria-label="Chiqish"
            className="w-full flex flex-col items-center justify-center py-2 text-xs text-muted-foreground hover:text-destructive"
            onClick={onLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="mt-1">Chiqish</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
