import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CourseItem } from "@/data/courses";

interface PurchasedCourseCardProps {
  course: CourseItem;
  onView: (id: number) => void;
}

export const PurchasedCourseCard: React.FC<PurchasedCourseCardProps> = ({ course, onView }) => {
  return (
    <Card className="overflow-hidden h-full">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={course.image}
            alt={`Kurs rasmi: ${course.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-4 flex flex-col gap-2 flex-1">
          <h3 className="font-semibold leading-snug line-clamp-2">{course.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
          <div className="mt-auto pt-2">
            <Button className="w-full" onClick={() => onView(course.id)} aria-label={`${course.title} kursini ko‘rish`}>
              Ko‘rish
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
