import axios from "axios";

/**
 * Routes publiques (guest)
 * → pas de redirection vers /auth
 */
const guestRoutes = [
  "/auth",
  "/forgot-password",
  "/reset-password",
  "/complete-profile",
];

const isGuestRoute = (path: string) => {
  return guestRoutes.some((route) => path.startsWith(route));
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  // Sanctum SPA
  withCredentials: true,
  withXSRFToken: true,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor global
 */
api.interceptors.response.use(
  // SUCCESS
  (response) => response,

  // ERROR
  (error) => {
    const status = error.response?.status;
    const currentPath = window.location.pathname;

    // Si pas de réponse (network error), on laisse passer
    if (!status) {
      return Promise.reject(error);
    }

    // IMPORTANT : laisser Next.js gérer les 404
    if (status === 404) {
      return Promise.reject(error);
    }

    // uniquement auth error
    if (status === 401 && !isGuestRoute(currentPath)) {
      window.location.href = "/auth";
      return;
    }

    return Promise.reject(error);
  },
);
