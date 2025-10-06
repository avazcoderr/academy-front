export type AdminVideo = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

export type AdminCourse = {
  id: number;
  title: string;
  createdAt: string; // human readable
  enrolledCount: number;
  thumbnail?: string;
  videos: AdminVideo[];
};

export const adminCourses: AdminCourse[] = [
  {
    id: 2,
    title: "Задачник Python",
    createdAt: "2025-07-01 08:10",
    enrolledCount: 1200,
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=150&h=150&fit=crop&crop=face",
    videos: [
      { id: "v1", title: "Введение и установка", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "v2", title: "Типы данных и операции", url: "https://www.w3schools.com/html/movie.mp4" },
    ],
  },
  {
    id: 1,
    title: "Ботостроение Telegram",
    createdAt: "2025-06-20 14:30",
    enrolledCount: 860,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=150&fit=crop&crop=face",
    videos: [
      { id: "v1", title: "Bot API обзор", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "v2", title: "Создание первого бота", url: "https://www.w3schools.com/html/movie.mp4" },
    ],
  },
  {
    id: 4,
    title: "Python Pro – полный курс",
    createdAt: "2025-05-12 10:05",
    enrolledCount: 2100,
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=150&h=150&fit=crop",
    videos: [
      { id: "v1", title: "Основы синтаксиса", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "v2", title: "Условия и циклы", url: "https://www.w3schools.com/html/movie.mp4" },
      { id: "v3", title: "Функции", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
];
