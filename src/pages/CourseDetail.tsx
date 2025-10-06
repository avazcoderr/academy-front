import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { getCourseById } from "@/data/courses";
import { buildTelegramBuyLink } from "@/config";
import { toast } from "sonner";

const parsePrice = (price?: string) => {
  if (!price) return undefined;
  const digits = price.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : undefined;
};

const CourseDetail = () => {
  const { id } = useParams();
  const courseId = Number(id);
  const course = useMemo(() => getCourseById(courseId), [courseId]);

  useEffect(() => {
    if (!course) return;
    const prevTitle = document.title;
    const title = `${course.title} — Полная информация о курсе`;
    document.title = title;

    // Meta description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      `${course.title}: программа, темы и цена. Узнайте подробности и начните обучение.`
    );

    // Canonical
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.href);

    // Structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    const price = parsePrice(course.currentPrice);
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      name: course.title,
      description: course.description,
      provider: { "@type": "Organization", name: "SudoTeach" },
      hasCourseInstance: {
        "@type": "CourseInstance",
        offers: price
          ? {
              "@type": "Offer",
              priceCurrency: "RUB",
              price: price,
              availability: "https://schema.org/InStock",
            }
          : undefined,
      },
    });
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      document.head.removeChild(script);
    };
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold">Курс не найден</h1>
          <p className="text-muted-foreground mt-2">
            Похоже, такого курса пока нет или он был удалён.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const isFree = course.isFree;
  const priceNow = course.currentPrice;
  const priceOld = course.originalPrice;

  const onBuy = () => {
    const link = buildTelegramBuyLink(course.id, course.title);
    toast.success("Открываем Telegram для оформления", {
      description: `${course.title}`,
    });
    window.open(link, "_blank");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-10">
        <article className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <nav aria-label="breadcrumb" className="mb-4 text-sm text-muted-foreground">
              <Link to="/" className="hover:underline">Главная</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{course.title}</span>
            </nav>

            <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
            <p className="text-muted-foreground mb-4">{course.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {course.level && <Badge variant="secondary">Уровень: {course.level}</Badge>}
              {course.duration && <Badge variant="secondary">Длительность: {course.duration}</Badge>}
              {typeof course.lessons === 'number' && <Badge variant="secondary">Уроков: {course.lessons}</Badge>}
              {typeof course.students === 'number' && <Badge variant="secondary">Студентов: {course.students}</Badge>}
            </div>

            <img
              src={course.bannerImage || course.image}
              alt={`${course.title} – изображение курса`}
              loading="lazy"
              className="w-full h-72 object-cover rounded-xl"
            />

            {course.learn && course.learn.length > 0 && (
              <section className="mt-8">
                <h2 className="text-xl font-semibold mb-3">Что вы изучите</h2>
                <ul className="grid md:grid-cols-2 gap-2 list-disc pl-5">
                  {course.learn.map((item, i) => (
                    <li key={i} className="text-sm text-foreground">{item}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-3">Программа курса</h2>
              <Accordion type="single" collapsible className="w-full">
                {(course.curriculum && course.curriculum.length > 0
                  ? course.curriculum
                  : [{ title: "Содержание курса", lessons: course.topics }]
                ).map((sec, i) => (
                  <AccordionItem value={`item-${i}`} key={i}>
                    <AccordionTrigger>{sec.title}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 list-disc pl-5">
                        {sec.lessons.map((l, idx) => (
                          <li key={idx} className="text-sm">{l}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {(course.requirements?.length || course.forWho?.length) && (
              <section className="mt-8 grid md:grid-cols-2 gap-6">
                {course.requirements?.length ? (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Требования</h2>
                    <ul className="space-y-2 list-disc pl-5 text-sm">
                      {course.requirements.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {course.forWho?.length ? (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Кому подойдёт</h2>
                    <ul className="space-y-2 list-disc pl-5 text-sm">
                      {course.forWho.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>
            )}

            {course.author && (
              <section className="mt-10">
                <h2 className="text-lg font-semibold mb-3">Автор курса</h2>
                <div className="flex items-center gap-4 rounded-xl border border-border/20 bg-card/10 backdrop-blur p-4">
                  <Avatar>
                    <AvatarImage src={course.author.avatar} alt={course.author.name} />
                    <AvatarFallback>{course.author.name?.[0] ?? "A"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{course.author.name}</div>
                    {course.author.title && (
                      <div className="text-sm text-muted-foreground">{course.author.title}</div>
                    )}
                  </div>
                </div>
              </section>
            )}
          </section>

          <aside className="lg:col-span-1">
            <div className="rounded-xl border bg-card/40 backdrop-blur text-card-foreground p-6 sticky top-24">
              <div className="mb-4">
                {priceOld && !isFree && (
                  <div className="text-sm line-through text-muted-foreground">{priceOld}</div>
                )}
                <div className={`text-3xl font-bold ${isFree ? "text-success" : ""}`}>
                  {isFree ? "Бесплатно" : priceNow}
                </div>
              </div>
              <Button size="lg" className="w-full" onClick={onBuy}>
                {isFree ? "Записаться" : "Купить курс"}
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Оплата и доступ оформляются через Telegram-бот. После перехода бот получит ID курса и подскажет шаги.
              </p>
              {course.duration && (
                <div className="mt-4 text-sm text-muted-foreground">Длительность: {course.duration}</div>
              )}
              {typeof course.lessons === 'number' && (
                <div className="text-sm text-muted-foreground">Уроков: {course.lessons}</div>
              )}
              {typeof course.students === 'number' && (
                <div className="text-sm text-muted-foreground">Студентов: {course.students}</div>
              )}
            </div>
          </aside>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;
