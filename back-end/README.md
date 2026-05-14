# Peaky API

API d'authentification — Laravel 13 + Sanctum

## Stack

- **Laravel 13** / PHP 8.3+
- **PostgreSQL**
- **Laravel Sanctum** — authentification par token
- **Mailpit** — capture des emails en local (`http://localhost:8025`)

## Installation

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

## Variables d'environnement clés

| Variable                  | Description                                         | Exemple                 |
| ------------------------- | --------------------------------------------------- | ----------------------- |
| `APP_URL`                 | URL du backend                                      | `http://localhost`      |
| `APP_FRONTEND_URL`        | URL du frontend — utilisée dans les emails de reset | `http://localhost:3000` |
| `DB_*`                    | Connexion PostgreSQL                                | voir `.env`             |
| `MAIL_HOST` / `MAIL_PORT` | Serveur SMTP local (Mailpit)                        | `localhost` / `1025`    |
| `CORS_ALLOWED_ORIGINS`    | Origines autorisées (séparées par virgule)          | `http://localhost:3000` |

> `APP_FRONTEND_URL` contrôle le lien dans l'email de réinitialisation de mot de passe.
> Modifie-le si l'URL de ton frontend change.

---

## Routes API

Base URL : `http://localhost/api`

| Méthode | Endpoint                | Auth    | Description                       |
| ------- | ----------------------- | ------- | --------------------------------- |
| POST    | `/auth/register`        | Non     | Inscription                       |
| POST    | `/auth/login`           | Non     | Connexion                         |
| POST    | `/auth/forgot-password` | Non     | Envoie le lien de reset par email |
| POST    | `/auth/reset-password`  | Non     | Réinitialise le mot de passe      |
| GET     | `/auth/me`              | Sanctum | Utilisateur connecté              |
| POST    | `/auth/logout`          | Sanctum | Déconnexion                       |

---

## Headers obligatoires (toutes les requêtes)

```
Accept: application/json
Content-Type: application/json
```

Les routes protégées nécessitent en plus :

```
Authorization: Bearer {access_token}
```

---

## Guide de test Postman

### Étape 1 — Register (sans remember_me)

**POST** `/api/auth/register`

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

Réponse **201** :

```json
{
    "message": "Compte créé avec succès.",
    "data": {
        "access_token": "1|abc...",
        "token_type": "Bearer",
        "user": { "id": 1, "name": "John Doe", "email": "john@example.com" }
    }
}
```

Copier le `access_token` pour les étapes suivantes.

---

### Étape 2 — Me (vérifier le token)

**GET** `/api/auth/me`
Header : `Authorization: Bearer {access_token}`

Réponse **200** :

```json
{
    "data": { "id": 1, "name": "John Doe", "email": "john@example.com" }
}
```

---

### Étape 3 — Logout

**POST** `/api/auth/logout`
Header : `Authorization: Bearer {access_token}`

Réponse **200** :

```json
{ "message": "Déconnexion réussie." }
```

Refaire `/me` avec le même token → **401** ✅

---

### Étape 4 — Login sans remember_me (token 24h)

**POST** `/api/auth/login`

```json
{
    "email": "john@example.com",
    "password": "password123",
    "remember_me": false
}
```

---

### Étape 5 — Login avec remember_me (token 1 an)

**POST** `/api/auth/login`

```json
{
    "email": "john@example.com",
    "password": "password123",
    "remember_me": true
}
```

> Pour vérifier : table `personal_access_tokens`, colonne `expires_at` — comparer les deux tokens.

---

### Étape 6 — Forgot Password

**POST** `/api/auth/forgot-password`

```json
{
    "email": "john@example.com"
}
```

Réponse **200** :

```json
{ "message": "We have emailed your password reset link!" }
```

Ouvrir **Mailpit** → `http://localhost:8025`

L'email contient un lien :

```
http://localhost:3000/reset-password?token=XXXXXXXX&email=john%40example.com
```

Copier la valeur du paramètre `token`.

---

### Étape 7 — Reset Password

**POST** `/api/auth/reset-password`

```json
{
    "token": "XXXXXXXX",
    "email": "john@example.com",
    "password": "nouveaumotdepasse",
    "password_confirmation": "nouveaumotdepasse"
}
```

Réponse **200** :

```json
{ "message": "Your password has been reset!" }
```

Vérifier avec un login → **200** avec nouveau token ✅

---

## Cas d'erreur

| Scénario                    | Endpoint              | Réponse              |
| --------------------------- | --------------------- | -------------------- |
| Email déjà pris             | POST /register        | 422 + `errors.email` |
| Mauvais mot de passe        | POST /login           | 422 + `errors.email` |
| Requête sans token          | GET /me               | 401                  |
| Token reset invalide/expiré | POST /reset-password  | 422                  |
| Email inexistant            | POST /forgot-password | 422                  |
