import axios from "axios";

/**
 * Routes publiques (guest)
 */
const guestRoutes = [
  "/auth",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/complete-profile",
];

/**
 * Routes système où on NE DOIT JAMAIS rediriger
 */
const ignoredRoutes = ["/", "/404", "/500", "/not-found"];

const isGuestRoute = (path: string) => {
  return guestRoutes.some((route) => path.startsWith(route));
};

const isIgnoredRoute = (path: string) => {
  return ignoredRoutes.includes(path);
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const currentPath = window.location.pathname;

    // pas de status = erreur réseau
    if (!status) {
      return Promise.reject(error);
    }

    // laisser Next gérer 404
    if (status === 404) {
      return Promise.reject(error);
    }

    // NE JAMAIS rediriger sur routes système
    if (isIgnoredRoute(currentPath)) {
      return Promise.reject(error);
    }

    // routes guest
    if (status === 401 && !isGuestRoute(currentPath)) {
      window.location.href = "/auth";
      return;
    }

    return Promise.reject(error);
  },
);
