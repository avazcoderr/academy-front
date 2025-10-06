import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { updateCourse, deleteCourse } from "@/services/api";
import { toast } from "sonner";

export interface AdminCourseRow {
  id: string | number;
  title: string;
  thumbnail?: string;
  imageUrl?: string;
  price?: string;
  discount?: string;
  description?: string;
  published?: boolean;
  is_active?: boolean;
}

interface EditCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: AdminCourseRow | null;
  onSaved: (updated: Partial<AdminCourseRow> & { id: string | number }) => void;
  onDeleted?: (id: string | number) => void;
}

export default function EditCourseDialog({ open, onOpenChange, course, onSaved, onDeleted }: EditCourseDialogProps) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (course) {
      setTitle(course.title || "");
      setImageUrl(course.imageUrl || course.thumbnail || "");
      setPrice(course.price || "");
      setDiscount(course.discount || "");
      setIsActive(Boolean(course.is_active ?? course.published));
    }
  }, [course, open]);

  const handleSave = async () => {
    if (!course) return;
    try {
      setSaving(true);
      const payload = { title, imageUrl, price, discount, is_active: isActive } as const;
      await updateCourse(course.id, payload);
      toast.success("Kurs yangilandi");
      onSaved({ id: course.id, ...payload });
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e.message || "Yangilashda xatolik");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!course) return;
    const ok = confirm("Rostdan ham o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.");
    if (!ok) return;
    try {
      await deleteCourse(course.id);
      toast.success("Kurs o'chirildi");
      onDeleted?.(course.id);
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e.message || "O'chirishda xatolik");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kursni tahrirlash</DialogTitle>
          <DialogDescription>Kurs ma'lumotlarini o'zgartiring va saqlang.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="text-sm font-medium">Kurs nomi</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masalan: Python Pro" />
          </div>
          <div>
            <label className="text-sm font-medium">Kurs rasmi (URL)</label>
            <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Narxi</label>
              <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Masalan: 499 000" />
            </div>
            <div>
              <label className="text-sm font-medium">Chegirma (%)</label>
              <Input value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Masalan: 20" />
            </div>
          </div>
          <div className="flex items-center justify-between border rounded-md p-3">
            <div>
              <label className="text-sm font-medium">Holati</label>
              <p className="text-xs text-muted-foreground">Aktiv bo'lsa, foydalanuvchilarga ko'rinadi</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isActive ? "secondary" : "outline"}>{isActive ? "Aktiv" : "Aktiv emas"}</Badge>
              <Switch checked={isActive} onCheckedChange={setIsActive} />
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between gap-3">
          <Button variant="destructive" type="button" onClick={handleDelete} disabled={saving}>O'chirish</Button>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)} disabled={saving}>Bekor qilish</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? "Saqlanmoqda..." : "Saqlash"}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
