// 后端 API 地址（Express + MongoDB），构建时从 VITE_API_URL 注入
export const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:3000").replace(/\/+$/, "");
