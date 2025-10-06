// Centralized API client for backend integration
// All functions are thin wrappers around fetch so you can plug your backend easily.

export const API_BASE = "/api"; // adjust if needed

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed with ${res.status}`);
  }
  return res.json();
}

// Types are kept light here; see src/types.ts for richer types

// COURSES (Admin)
export async function getAdminCourses() {
  return handle<any[]>(await fetch(`${API_BASE}/admin/courses`, { credentials: "include" }));
}

export async function createCourse(payload: {
  title: string;
  description: string;
  topics: string[];
  price: string;
  discount?: string;
  imageUrl?: string;
  is_active?: boolean; // optional active flag
}) {
  return handle<any>(
    await fetch(`${API_BASE}/admin/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    })
  );
}

export async function toggleCoursePublish(courseId: string | number, published: boolean) {
  return handle<any>(
    await fetch(`${API_BASE}/admin/courses/${courseId}/publish`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ published }),
    })
  );
}

export async function uploadCourseVideo(
  courseId: string | number,
  params: { file: File; title: string; topic?: string }
) {
  const form = new FormData();
  form.append("file", params.file);
  form.append("title", params.title || "");
  if (params.topic) form.append("topic", params.topic);

  return handle<any>(
    await fetch(`${API_BASE}/admin/courses/${courseId}/videos`, {
      method: "POST",
      credentials: "include",
      body: form,
    })
  );
}

export async function getCourseVideos(courseId: string | number) {
  return handle<any[]>(
    await fetch(`${API_BASE}/admin/courses/${courseId}/videos`, { credentials: "include" })
  );
}

export async function getCourseById(courseId: string | number) {
  return handle<any>(await fetch(`${API_BASE}/admin/courses/${courseId}`, { credentials: "include" }));
}

export async function updateCourse(
  courseId: string | number,
  payload: {
    title?: string;
    description?: string;
    price?: string;
    discount?: string;
    imageUrl?: string;
    is_active?: boolean;
  }
) {
  return handle<any>(
    await fetch(`${API_BASE}/admin/courses/${courseId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    })
  );
}

export async function deleteCourse(courseId: string | number) {
  return handle<any>(
    await fetch(`${API_BASE}/admin/courses/${courseId}`, {
      method: "DELETE",
      credentials: "include",
    })
  );
}

// COURSES (Public)
export async function getPublicCourses() {
  return handle<any[]>(await fetch(`${API_BASE}/courses`));
}

// SETTINGS (Admin)
export async function getSiteSettings() {
  return handle<any>(await fetch(`${API_BASE}/admin/settings`, { credentials: "include" }));
}

export async function updateSiteSettings(payload: {
  siteName?: string;
  address?: string;
  telegramBotToken?: string;
  telegramChatId?: string;
  logoFile?: File | null;
}) {
  const form = new FormData();
  if (payload.siteName !== undefined) form.append("siteName", payload.siteName);
  if (payload.address !== undefined) form.append("address", payload.address);
  if (payload.telegramBotToken !== undefined) form.append("telegramBotToken", payload.telegramBotToken);
  if (payload.telegramChatId !== undefined) form.append("telegramChatId", payload.telegramChatId);
  if (payload.logoFile) form.append("logo", payload.logoFile);

  return handle<any>(
    await fetch(`${API_BASE}/admin/settings`, {
      method: "PUT",
      credentials: "include",
      body: form,
    })
  );
}
