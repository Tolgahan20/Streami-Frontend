export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

export function setCookie(name: string, value: string, options?: { expiresMs?: number; path?: string }) {
  if (typeof document === "undefined") return;
  const { expiresMs = 15 * 60 * 1000, path = "/" } = options || {};
  const expires = new Date(Date.now() + expiresMs).toUTCString();
  const isProd = typeof window !== "undefined" && window.location.protocol === "https:";
  const parts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `Path=${path}`,
    `Expires=${expires}`,
    "SameSite=Lax",
    isProd ? "Secure" : "",
  ].filter(Boolean);
  document.cookie = parts.join("; ");
}

export function deleteCookie(name: string, path: string = "/") {
  if (typeof document === "undefined") return;
  document.cookie = `${encodeURIComponent(name)}=; Path=${path}; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}


