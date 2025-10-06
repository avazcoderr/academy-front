import React from "react";
import { CourseCard } from "./CourseCard";

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  originalPrice?: string;
  currentPrice: string;
  isFree?: boolean;
  published?: boolean;
}

interface CourseSectionProps {
  title: string;
  icon?: React.ReactNode;
  courses: Course[];
}

export const CourseSection = ({ title, icon, courses }: CourseSectionProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="rounded-2xl border border-border/20 bg-card/10 backdrop-blur p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          {icon ? (
            <div className="w-8 h-8 flex items-center justify-center text-primary" aria-hidden>
              {icon}
            </div>
          ) : null}
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              image={course.image}
              originalPrice={course.originalPrice}
              currentPrice={course.currentPrice}
              isFree={course.isFree}
              published={course.published}
            />
          ))}
        </div>
      </div>
    </div>
  );
};