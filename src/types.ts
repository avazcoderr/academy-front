export type CourseAdmin = {
  id: string | number;
  title: string;
  description?: string;
  thumbnail?: string;
  imageUrl?: string;
  price?: string;
  discount?: string;
  topics?: string[];
  enrolledCount?: number;
  createdAt?: string;
  published?: boolean;
};

export type CourseVideo = {
  id: string | number;
  title: string;
  topic?: string;
  url?: string; // backend returns public URL
};

export type SiteSettings = {
  siteName: string;
  address?: string;
  logoUrl?: string;
  telegramBotToken?: string;
  telegramChatId?: string;
};
