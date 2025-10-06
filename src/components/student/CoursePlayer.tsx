import React, { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { CourseItem } from "@/data/courses";
import { Badge } from "@/components/ui/badge";
import { Maximize2 } from "lucide-react";

interface CoursePlayerProps {
  course: CourseItem;
  onBack?: () => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({ course, onBack }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const lessons = useMemo(
    () => (course.topics || []).map((t, i) => ({
      title: t,
      // Demo URLs — will be replaced with Supabase signed URLs later
      url: i % 2 === 0
        ? "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
        : "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
    })),
    [course]
  );

  const [activeIdx, setActiveIdx] = useState(0);
  const activeLesson = lessons[activeIdx] ?? lessons[0];

  return (
    <article className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6">
      <aside className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <h2 className="text-base font-semibold">Mavzular</h2>
          <p className="text-xs text-muted-foreground">{course.title}</p>
        </div>
        <nav aria-label="Kurs mavzulari" className="max-h-[60vh] overflow-auto p-2">
          <ul className="space-y-1">
            {lessons.map((l, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full text-left px-3 py-2 rounded-md transition ${
                    idx === activeIdx ? "bg-muted font-medium" : "hover:bg-muted/50"
                  }`}
                  aria-current={idx === activeIdx ? "true" : undefined}
                >
                  <span className="text-sm line-clamp-1">{l.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <section>
        <Card>
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-lg">{activeLesson?.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {onBack ? (
                <Button variant="outline" size="sm" onClick={onBack} aria-label="Ortga qaytish">
                  Ortga
                </Button>
              ) : null}
              <Button
                size="icon"
                variant="secondary"
                onClick={() => videoRef.current?.requestFullscreen?.()}
                aria-label="To‘liq ekran"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative rounded-lg overflow-hidden border">
              <video
                ref={videoRef}
                src={activeLesson?.url}
                controls
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                className="w-full h-auto bg-black"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Mavzular</h3>
              <div className="flex flex-wrap gap-2">
                {(course.topics || []).map((t, i) => (
                  <Badge key={i} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </article>
  );
};
