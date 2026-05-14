import axios from "axios";

export const api = axios.create({
  // IMPORTANT :
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  // Obligatoire pour Sanctum SPA Authentication
  withCredentials: true,

  // Permet à Axios d'envoyer automatiquement le X-XSRF-TOKEN
  withXSRFToken: true,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Gestion globale des erreurs
api.interceptors.response.use(
  (response) => response,

  (error) => {
    // Redirection si non authentifié
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/auth"
    ) {
      window.location.href = "/auth";
    }

    return Promise.reject(error);
  },
);
