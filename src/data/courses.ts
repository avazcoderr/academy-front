export type CourseItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  originalPrice?: string;
  currentPrice: string;
  isFree?: boolean;
  topics: string[];
  // Optional detailed fields for course page
  level?: string;
  duration?: string;
  students?: number;
  lessons?: number;
  learn?: string[];
  requirements?: string[];
  forWho?: string[];
  curriculum?: { title: string; lessons: string[] }[];
  author?: { name: string; title?: string; avatar?: string };
  bannerImage?: string;
};

export const courses: CourseItem[] = [
  {
    id: 1,
    title: "Ботостроение Telegram",
    description:
      "Лёгкий, быстрый и доступный способ познакомиться с миром ботостроения в Telegram. Видео, конспекты, практика и помощь - всё на курсе.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=150&fit=crop&crop=face",
    originalPrice: "2499 ₽",
    currentPrice: "999 ₽",
    topics: [
      "Знакомство с Bot API",
      "Создание бота и токены",
      "Обработка команд",
      "Webhook vs Long Polling",
      "Работа с клавиатурами",
      "Инлайн-режим",
    ],
  },
  {
    id: 2,
    title: "Задачник Python",
    description:
      "От лёгких до сложнейших! От нуля до бесконечности! Самый верный путь - практика. Решите все задачи и смело называйте себя «программист»!",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=600&fit=crop",
    originalPrice: "799 ₽",
    currentPrice: "499 ₽",
    level: "Начальный–Средний",
    duration: "6 недель",
    students: 1200,
    lessons: 48,
    learn: [
      "Решать задачи разного уровня сложности",
      "Освоить алгоритмическое мышление",
      "Использовать структуры данных и функции",
      "Писать читаемый код и отлаживать ошибки",
    ],
    requirements: [
      "Компьютер/ноутбук с доступом в интернет",
      "Установленный Python 3.x",
    ],
    forWho: [
      "Новички в программировании",
      "Школьники и студенты",
      "Все, кто хочет прокачать алгоритмику",
    ],
    author: {
      name: "SudoTeach Team",
      title: "Преподаватель Python",
      avatar:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=128&h=128&fit=crop",
    },
    curriculum: [
      { title: "Основы Python", lessons: ["Синтаксис", "Переменные", "Типы данных"] },
      { title: "Условия и циклы", lessons: ["if/else", "for", "while"] },
      { title: "Функции и модули", lessons: ["def", "Аргументы", "Импорт модулей"] },
      { title: "Структуры данных", lessons: ["Списки", "Словари", "Множества"] },
      { title: "ООП основы", lessons: ["Классы", "Методы", "Наследование"] },
    ],
    topics: [
      "Базовый синтаксис",
      "Условия и циклы",
      "Функции и модули",
      "Структуры данных",
      "ООП основы",
      "Исключения и файлы",
    ],
  },
  {
    id: 3,
    title: "Простой ООП",
    description:
      "Объектно-ориентированное программирование на Python — это не просто парадигма или методология, это стиль написания кода. Освойте этот навык и научите…",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&h=150&fit=crop",
    originalPrice: "2499 ₽",
    currentPrice: "1099 ₽",
    topics: [
      "Классы и объекты",
      "Инкапсуляция",
      "Наследование",
      "Полиморфизм",
      "Абстракции",
      "Паттерны проектирования",
    ],
  },
  {
    id: 4,
    title: "Python Pro – полный курс",
    description:
      "С нуля до профессионального уровня. Подходит для всех. Учитесь каждый день и овладейте самым легким языком программирования.",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=150&h=150&fit=crop",
    currentPrice: "Бесплатно",
    isFree: true,
    topics: [
      "Основы Python",
      "Стандартная библиотека",
      "Работа с сетью",
      "Асинхронность",
      "Тестирование",
      "Деплой проектов",
    ],
  },
  {
    id: 5,
    title: "Основы SQL",
    description:
      "SQL — лучший способ понять, что такое базы данных и как они работают. Бесплатный курс для начинающих разработчиков с практическими заданиями!",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=150&h=150&fit=crop",
    currentPrice: "Бесплатно",
    isFree: true,
    topics: ["SELECT, WHERE", "JOIN и агрегаты", "Индексы", "Нормализация"],
  },
  {
    id: 6,
    title: "Создаем парсер вакансий hh.ru на базе Python",
    description:
      "Процесс сбора информации из всемирной сети интернет является актуальным уже многие годы. И не только сбора, но и систематизации, обработки по различн…",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop",
    currentPrice: "Бесплатно",
    isFree: true,
    topics: [
      "HTTP и requests",
      "Парсинг HTML",
      "Скрапинг динамических страниц",
      "Хранение данных",
    ],
  },
  {
    id: 7,
    title: "Новостной портал на базе FastAPI",
    description:
      "Асинхронный механизм работы приложений все чаще реализуется разработчиками. Он позволяет, не дожидаясь завершения выполнения одних задач, создавать и…",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=150&h=150&fit=crop",
    originalPrice: "5990 ₽",
    currentPrice: "3990 ₽",
    topics: [
      "Введение в FastAPI",
      "Маршруты и схемы",
      "База данных и ORM",
      "Аутентификация",
      "Деплой",
    ],
  },
  {
    id: 8,
    title: "Cайт турагентства на базе фреймворка Django",
    description:
      "Django считается одним из самых популярных фреймворков для разработки веб-приложений на базе языка программирования Python",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=150&fit=crop",
    originalPrice: "5990 ₽",
    currentPrice: "3990 ₽",
    topics: [
      "Django модели",
      "Админ-панель",
      "Шаблоны и формы",
      "Деплой",
    ],
  },
  {
    id: 9,
    title: "Блог на базе фреймворка Python Flask",
    description:
      "Веб-приложения стали частью нашей жизни. Это онлайн-магазины, блоги, различные сервисы. Значительная их часть разрабатывается на базе языка программи…",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=150&h=150&fit=crop",
    originalPrice: "5990 ₽",
    currentPrice: "3990 ₽",
    topics: [
      "Flask маршруты",
      "Шаблоны Jinja",
      "База данных",
      "Авторизация",
    ],
  },
  {
    id: 10,
    title: "Продвинутый SQL",
    description:
      "Базы данных - проще простого! Станьте профессионалом и создавайте структуры для высоконагруженных проектов. Подходит всем.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=150&h=150&fit=crop",
    originalPrice: "999 ₽",
    currentPrice: "499 ₽",
    topics: ["Оптимизация запросов", "План выполнения", "Транзакции", "Views"],
  },
  {
    id: 11,
    title: "Discord Боты с 0 до PRO",
    description:
      "Интересуют Discord Боты? На этом курсе Вы сможете найти ответы на все вопросы! Практика, конспекты и много видеоматериала!",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=150&fit=crop",
    originalPrice: "1999 ₽",
    currentPrice: "999 ₽",
    topics: [
      "Создание бота",
      "События и команды",
      "Работа с API",
      "Деплой и хостинг",
    ],
  },
  {
    id: 12,
    title: "Парсинг Python",
    description:
      "Вы всегда мечтали добывать информацию в огромных объемах? Или самыми первыми? С самых необычных источников? Всё здесь.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=150&fit=crop",
    currentPrice: "Бесплатно",
    isFree: true,
    topics: ["HTTP основы", "BeautifulSoup", "Selenium", "Очереди задач"],
  },
];

export const getCourseById = (id: number) => courses.find((c) => c.id === id);
