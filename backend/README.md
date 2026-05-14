# Peacky API — Gestion de Déchets

API REST — Laravel 13 | Signalements & Actualités

## Stack

- **Laravel 13** / PHP 8.3+
- **PostgreSQL**
- **Laravel Sanctum** — authentification par token Bearer
- **Laravel Socialite** — OAuth Google & Facebook
- **Stockage fichiers** — `php artisan storage:link` requis pour les images

## Installation

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan storage:link
php artisan serve
```

## Variables d'environnement clés

| Variable                  | Description                          | Exemple                         |
| ------------------------- | ------------------------------------ | ------------------------------- |
| `APP_URL`                 | URL du backend                       | `http://localhost`              |
| `DB_*`                    | Connexion PostgreSQL                 | voir `.env`                     |
| `CORS_ALLOWED_ORIGINS`    | Origines autorisées                  | `http://localhost:3000`         |
| `GOOGLE_CLIENT_ID`        | Client ID Google OAuth               | `xxx.apps.googleusercontent.com`|
| `GOOGLE_CLIENT_SECRET`    | Client secret Google OAuth           | `GOCSPX-xxx`                    |
| `GOOGLE_REDIRECT_URL`     | Callback Google                      | `http://localhost/api/auth/google/callback` |
| `FACEBOOK_CLIENT_ID`      | App ID Facebook OAuth                | `1234567890`                    |
| `FACEBOOK_CLIENT_SECRET`  | App secret Facebook OAuth            | `abc123`                        |
| `FACEBOOK_REDIRECT_URL`   | Callback Facebook                    | `http://localhost/api/auth/facebook/callback` |

---

## Système d'authentification — Sanctum (Bearer Token)

1. L'utilisateur crée un compte (`POST /api/auth/register`) ou se connecte (`POST /api/auth/login`) → le backend retourne un **access_token**
2. Ce token est stocké dans `localStorage` côté frontend
3. Chaque requête protégée l'envoie dans le header `Authorization: Bearer {token}`
4. Au rechargement de la page : relire le token depuis `localStorage` → appeler `GET /api/auth/me` pour restaurer la session
5. **Durée de vie** : `remember_me = true` → 1 an | `remember_me = false` → 24h

### Connexion sociale (Google / Facebook)

Le flux OAuth est stateless (adapté aux SPA / apps mobiles) :

1. Appeler `GET /api/auth/google/redirect` (ou `/facebook/redirect`) → reçoit un `redirect_url`
2. Rediriger l'utilisateur vers cette URL (page de consentement Google/Facebook)
3. Après consentement, Google/Facebook redirige vers le callback backend → le backend retourne le même objet `{ access_token, user }`
4. Si `user.profile_completed = false`, rediriger vers l'écran "Compléter le profil" pour renseigner le numéro de téléphone (et optionnellement un mot de passe)

---

## Headers obligatoires (toutes les requêtes)

```
Accept: application/json
```

Pour les routes protégées, ajouter :

```
Authorization: Bearer {access_token}
```

> Pour les uploads d'images, ne pas mettre `Content-Type: application/json` — laisser Postman gérer automatiquement `multipart/form-data`.

---

## Tableau des endpoints

| Méthode | Endpoint                          | Auth | Description                        |
| ------- | --------------------------------- | ---- | ---------------------------------- |
| POST    | `/api/auth/register`              | Non  | Créer un compte                    |
| POST    | `/api/auth/login`                 | Non  | Se connecter                       |
| GET     | `/api/auth/google/redirect`       | Non  | URL de connexion Google            |
| GET     | `/api/auth/google/callback`       | Non  | Callback Google (géré par backend) |
| GET     | `/api/auth/facebook/redirect`     | Non  | URL de connexion Facebook          |
| GET     | `/api/auth/facebook/callback`     | Non  | Callback Facebook (géré par backend)|
| POST    | `/api/auth/forgot-password`       | Non  | Envoyer lien reset mot de passe    |
| POST    | `/api/auth/reset-password`        | Non  | Réinitialiser le mot de passe      |
| GET     | `/api/auth/me`                    | Oui  | Voir son profil                    |
| POST    | `/api/auth/logout`                | Oui  | Se déconnecter                     |
| POST    | `/api/auth/complete-profile`      | Oui  | Compléter le profil (après OAuth)  |
| PATCH   | `/api/profile`                    | Oui  | Mettre à jour son profil           |
| DELETE  | `/api/profile`                    | Oui  | Supprimer son compte               |
| GET     | `/api/reports`                    | Non  | Lister tous les signalements       |
| GET     | `/api/reports/{id}`               | Non  | Voir un signalement                |
| POST    | `/api/reports`                    | Oui  | Créer un signalement               |
| POST    | `/api/reports/{id}`               | Oui  | Modifier son signalement           |
| DELETE  | `/api/reports/{id}`               | Oui  | Supprimer son signalement          |
| GET     | `/api/news`                       | Non  | Lister toutes les actualités       |
| GET     | `/api/news/{id}`                  | Non  | Voir une actualité                 |
| POST    | `/api/news`                       | Oui  | Créer une actualité                |
| POST    | `/api/news/{id}`                  | Oui  | Modifier son actualité             |
| DELETE  | `/api/news/{id}`                  | Oui  | Supprimer son actualité            |

---

## Structures de réponse — Interfaces TypeScript

```ts
interface User {
  id: number
  first_name: string
  last_name: string
  name: string                   // first_name + last_name
  email: string
  phone: string | null
  profile_completed: boolean     // false si inscrit via OAuth sans avoir complété son profil
  has_password: boolean          // false si compte créé via OAuth uniquement
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

interface AuthResponse {
  message: string
  data: {
    access_token: string
    token_type: 'Bearer'
    user: User
  }
}

interface Report {
  id: number
  user?: User                    // présent sur show / store / update — absent sur index
  category: 'dechet' | 'infra' | 'incendie'
  type: string | null            // requis si category = 'infra'
  status: string | null          // requis si category = 'infra'
  image_urls: string[]           // tableau d'URLs, vide [] si aucune image
  latitude: number
  longitude: number
  location_name: string
  created_at: string             // ISO8601
  updated_at: string             // ISO8601
}

interface Article {
  id: number
  user?: User                    // présent sur show / store / update — absent sur index
  type: 'evenement' | 'divers'
  date: string                   // format: "YYYY-MM-DD"
  title: string
  description: string
  image_urls: string[]           // tableau d'URLs, vide [] si aucune image
  latitude: number | null        // requis si type = 'evenement'
  longitude: number | null       // requis si type = 'evenement'
  location_name: string | null   // requis si type = 'evenement'
  created_at: string
  updated_at: string
}
```

---

## Réponses JSON détaillées

### Réponses Auth

**POST /api/auth/register** → `201`
```json
{
    "message": "Compte créé avec succès.",
    "data": {
        "access_token": "1|abcdefgh...",
        "token_type": "Bearer",
        "user": {
            "id": 1,
            "first_name": "Jean",
            "last_name": "Dupont",
            "name": "Jean Dupont",
            "email": "jean@example.com",
            "phone": "+261341234567",
            "profile_completed": true,
            "has_password": true,
            "email_verified_at": null,
            "created_at": "2026-05-14T08:00:00.000000Z",
            "updated_at": "2026-05-14T08:00:00.000000Z"
        }
    }
}
```

**POST /api/auth/login** → `200`
```json
{
    "message": "Connexion réussie.",
    "data": {
        "access_token": "2|xyz...",
        "token_type": "Bearer",
        "user": { "...": "même structure que register" }
    }
}
```

**GET /api/auth/google/redirect** → `200`
```json
{
    "redirect_url": "https://accounts.google.com/o/oauth2/auth?..."
}
```

**GET /api/auth/google/callback** (après consentement Google) — redirige vers le frontend avec token dans l'URL ou retourne :
```json
{
    "message": "Connexion réussie.",
    "data": {
        "access_token": "3|abc...",
        "token_type": "Bearer",
        "user": {
            "id": 2,
            "first_name": "Marie",
            "last_name": "Martin",
            "name": "Marie Martin",
            "email": "marie@gmail.com",
            "phone": null,
            "profile_completed": false,
            "has_password": false,
            "email_verified_at": null,
            "created_at": "2026-05-14T08:00:00.000000Z",
            "updated_at": "2026-05-14T08:00:00.000000Z"
        }
    }
}
```

> Si `profile_completed = false`, rediriger vers l'écran "Compléter le profil".

**POST /api/auth/complete-profile** → `200`
```json
{
    "message": "Profil complété avec succès.",
    "data": {
        "id": 2,
        "first_name": "Marie",
        "last_name": "Martin",
        "name": "Marie Martin",
        "email": "marie@gmail.com",
        "phone": "+261331234567",
        "profile_completed": true,
        "has_password": true,
        "email_verified_at": null,
        "created_at": "2026-05-14T08:00:00.000000Z",
        "updated_at": "2026-05-14T08:10:00.000000Z"
    }
}
```

---

### Réponses Report

**GET /api/reports** → `200`
```json
{
    "data": [
        {
            "id": 1,
            "user": { "id": 1, "first_name": "Jean", "last_name": "Dupont", "name": "Jean Dupont", "email": "jean@example.com", "phone": "+261341234567", "profile_completed": true, "has_password": true, "email_verified_at": null, "created_at": "...", "updated_at": "..." },
            "category": "dechet",
            "type": null,
            "status": null,
            "image_urls": ["http://localhost/storage/reports/xyz.jpg"],
            "latitude": -18.9103,
            "longitude": 47.5362,
            "location_name": "Antananarivo Centre",
            "created_at": "2026-05-14T08:00:00.000000Z",
            "updated_at": "2026-05-14T08:00:00.000000Z"
        }
    ]
}
```

**GET /api/reports/{id}** → `200`
```json
{
    "data": {
        "id": 1,
        "user": { "id": 1, "first_name": "Jean", "last_name": "Dupont", "name": "Jean Dupont", "...": "..." },
        "category": "dechet",
        "type": null,
        "status": null,
        "image_urls": ["http://localhost/storage/reports/xyz.jpg"],
        "latitude": -18.9103,
        "longitude": 47.5362,
        "location_name": "Antananarivo Centre",
        "created_at": "2026-05-14T08:00:00.000000Z",
        "updated_at": "2026-05-14T08:00:00.000000Z"
    }
}
```

**POST /api/reports** → `201`
```json
{
    "message": "Report created.",
    "data": {
        "id": 1,
        "user": { "...": "..." },
        "category": "infra",
        "type": "Route endommagée",
        "status": "En attente de réparation",
        "image_urls": ["http://localhost/storage/reports/xyz.jpg"],
        "latitude": -18.9103,
        "longitude": 47.5362,
        "location_name": "Antananarivo Centre",
        "created_at": "2026-05-14T08:00:00.000000Z",
        "updated_at": "2026-05-14T08:00:00.000000Z"
    }
}
```

**POST /api/reports/{id}** → `200`
```json
{
    "message": "Report updated.",
    "data": { "...": "même structure" }
}
```

**DELETE /api/reports/{id}** → `200`
```json
{ "message": "Report deleted." }
```

---

### Réponses Article (endpoint : `/api/news`)

**GET /api/news** → `200`
```json
{
    "data": [
        {
            "id": 1,
            "user": { "id": 1, "first_name": "Jean", "last_name": "Dupont", "...": "..." },
            "type": "evenement",
            "date": "2026-06-01",
            "title": "Journée de nettoyage",
            "description": "Grande journée de nettoyage au parc...",
            "image_urls": ["http://localhost/storage/articles/img.jpg"],
            "latitude": -18.9103,
            "longitude": 47.5362,
            "location_name": "Parc Tsimbazaza",
            "created_at": "2026-05-14T08:00:00.000000Z",
            "updated_at": "2026-05-14T08:00:00.000000Z"
        }
    ]
}
```

**POST /api/news** → `201`
```json
{
    "message": "Article created.",
    "data": {
        "id": 2,
        "user": { "...": "..." },
        "type": "divers",
        "date": "2026-05-20",
        "title": "Nouvelle règle de tri des déchets",
        "description": "Dès ce mois-ci, les plastiques doivent...",
        "image_urls": [],
        "latitude": null,
        "longitude": null,
        "location_name": null,
        "created_at": "2026-05-14T08:00:00.000000Z",
        "updated_at": "2026-05-14T08:00:00.000000Z"
    }
}
```

**DELETE /api/news/{id}** → `200`
```json
{ "message": "Article deleted." }
```

---

## Guide de test Postman — Étape par étape

---

### PARTIE 1 — Authentification

---

#### 1.1 — Créer un compte

**POST** `http://localhost/api/auth/register`

Header :
```
Accept: application/json
```

Body → `raw` → `JSON` :
```json
{
    "first_name": "Jean",
    "last_name": "Dupont",
    "phone": "+261341234567",
    "email": "jean@example.com",
    "password": "motdepasse",
    "password_confirmation": "motdepasse",
    "remember_me": false
}
```

Réponse **201** :
```json
{
    "message": "Compte créé avec succès.",
    "data": {
        "access_token": "1|abcdefgh...",
        "token_type": "Bearer",
        "user": {
            "id": 1,
            "first_name": "Jean",
            "last_name": "Dupont",
            "name": "Jean Dupont",
            "email": "jean@example.com",
            "phone": "+261341234567",
            "profile_completed": true,
            "has_password": true,
            "email_verified_at": null,
            "created_at": "2026-05-14T08:00:00.000000Z",
            "updated_at": "2026-05-14T08:00:00.000000Z"
        }
    }
}
```

> **Copier le `access_token`** et le garder pour toutes les requêtes suivantes.

---

#### 1.2 — Se connecter

**POST** `http://localhost/api/auth/login`

Body → `raw` → `JSON` :
```json
{
    "email": "jean@example.com",
    "password": "motdepasse",
    "remember_me": false
}
```

Réponse **200** : même structure que le register.

---

#### 1.3 — Voir son profil

**GET** `http://localhost/api/auth/me`

Headers :
```
Accept: application/json
Authorization: Bearer 1|abcdefgh...
```

Réponse **200** :
```json
{
    "data": {
        "id": 1,
        "first_name": "Jean",
        "last_name": "Dupont",
        "name": "Jean Dupont",
        "email": "jean@example.com",
        "phone": "+261341234567",
        "profile_completed": true,
        "has_password": true,
        "email_verified_at": null,
        "created_at": "2026-05-14T08:00:00.000000Z",
        "updated_at": "2026-05-14T08:00:00.000000Z"
    }
}
```

---

#### 1.4 — Connexion Google

**GET** `http://localhost/api/auth/google/redirect`

Réponse **200** :
```json
{
    "redirect_url": "https://accounts.google.com/o/oauth2/auth?..."
}
```

Ouvrir cette URL dans un navigateur → l'utilisateur autorise → Google redirige vers le callback → le backend retourne `{ access_token, user }`.

Si `user.profile_completed = false`, appeler l'endpoint `complete-profile`.

---

#### 1.5 — Compléter le profil (après OAuth)

**POST** `http://localhost/api/auth/complete-profile`

Headers :
```
Accept: application/json
Authorization: Bearer 3|abc...
```

Body → `raw` → `JSON` :
```json
{
    "phone": "+261331234567",
    "password": "motdepasse",
    "password_confirmation": "motdepasse"
}
```

> `password` est optionnel — l'utilisateur peut vouloir conserver uniquement la connexion Google/Facebook.

Réponse **200** :
```json
{
    "message": "Profil complété avec succès.",
    "data": { "...": "User complet avec profile_completed: true" }
}
```

---

#### 1.6 — Se déconnecter

**POST** `http://localhost/api/auth/logout`

Headers :
```
Authorization: Bearer 1|abcdefgh...
```

Réponse **200** :
```json
{
    "message": "Déconnexion réussie."
}
```

---

#### 1.7 — Requête sans token (doit échouer)

Sans header `Authorization`

Réponse **401** :
```json
{
    "message": "Unauthenticated."
}
```

---

### PARTIE 2 — Signalement (Report)

Un signalement a trois catégories : `dechet`, `infra`, `incendie`

- `dechet` et `incendie` : localisation + image(s)
- `infra` : localisation + image(s) + `type` (texte libre) + `status` (texte libre)

---

#### 2.1 — Lister tous les signalements (public)

**GET** `http://localhost/api/reports`

Réponse **200** :
```json
{
    "data": [
        {
            "id": 1,
            "user": { "id": 1, "first_name": "Jean", "last_name": "Dupont", "...": "..." },
            "category": "dechet",
            "type": null,
            "status": null,
            "image_urls": ["http://localhost/storage/reports/image.jpg"],
            "latitude": -18.9103,
            "longitude": 47.5362,
            "location_name": "Antananarivo Centre",
            "created_at": "2026-05-14T08:00:00.000000Z",
            "updated_at": "2026-05-14T08:00:00.000000Z"
        }
    ]
}
```

---

#### 2.2 — Créer un signalement — catégorie `dechet`

**POST** `http://localhost/api/reports`

Headers :
```
Accept: application/json
Authorization: Bearer 1|abcdefgh...
```

Body → `form-data` :

| Clé            | Type | Valeur                        |
| -------------- | ---- | ----------------------------- |
| `category`     | Text | `dechet`                      |
| `latitude`     | Text | `-18.9103`                    |
| `longitude`    | Text | `47.5362`                     |
| `location_name`| Text | `Antananarivo Centre`         |
| `images[]`     | File | (sélectionner 1 à 5 fichiers) |

Réponse **201** :
```json
{
    "message": "Report created.",
    "data": {
        "id": 1,
        "user": { "...": "..." },
        "category": "dechet",
        "type": null,
        "status": null,
        "image_urls": ["http://localhost/storage/reports/xyz.jpg"],
        "latitude": -18.9103,
        "longitude": 47.5362,
        "location_name": "Antananarivo Centre",
        "created_at": "...",
        "updated_at": "..."
    }
}
```

---

#### 2.3 — Créer un signalement — catégorie `incendie`

Body → `form-data` :

| Clé            | Type | Valeur                        |
| -------------- | ---- | ----------------------------- |
| `category`     | Text | `incendie`                    |
| `latitude`     | Text | `-18.8792`                    |
| `longitude`    | Text | `47.5079`                     |
| `location_name`| Text | `Ivandry`                     |
| `images[]`     | File | (sélectionner 1 à 5 fichiers) |

---

#### 2.4 — Créer un signalement — catégorie `infra`

Body → `form-data` :

| Clé            | Type | Valeur                        |
| -------------- | ---- | ----------------------------- |
| `category`     | Text | `infra`                       |
| `type`         | Text | `Route endommagée`            |
| `status`       | Text | `En attente de réparation`    |
| `latitude`     | Text | `-18.9200`                    |
| `longitude`    | Text | `47.5400`                     |
| `location_name`| Text | `Analakely`                   |
| `images[]`     | File | (sélectionner 1 à 5 fichiers) |

---

#### 2.5 — Créer un signalement `infra` sans `type` (doit échouer)

Réponse **422** :
```json
{
    "message": "The type field is required when category is infra.",
    "errors": {
        "type": ["The type field is required when category is infra."],
        "status": ["The status field is required when category is infra."]
    }
}
```

---

#### 2.6 — Créer un signalement avec une catégorie invalide (doit échouer)

Réponse **422** :
```json
{
    "message": "The selected category is invalid.",
    "errors": {
        "category": ["The selected category is invalid."]
    }
}
```

---

#### 2.7 — Créer un signalement sans être connecté (doit échouer)

Réponse **401** :
```json
{ "message": "Unauthenticated." }
```

---

#### 2.8 — Voir un signalement (public)

**GET** `http://localhost/api/reports/1`

Réponse **200** : même structure que le store.

---

#### 2.9 — Modifier son signalement

**POST** `http://localhost/api/reports/1`

Headers :
```
Accept: application/json
Authorization: Bearer 1|abcdefgh...
```

Body → `form-data` (seulement les champs à changer) :

| Clé            | Type | Valeur       |
| -------------- | ---- | ------------ |
| `location_name`| Text | `Ampefiloha` |

Réponse **200** :
```json
{
    "message": "Report updated.",
    "data": {
        "id": 1,
        "user": { "...": "..." },
        "category": "dechet",
        "type": null,
        "status": null,
        "image_urls": ["http://localhost/storage/reports/xyz.jpg"],
        "latitude": -18.9103,
        "longitude": 47.5362,
        "location_name": "Ampefiloha",
        "created_at": "2026-05-14T08:00:00.000000Z",
        "updated_at": "2026-05-14T09:00:00.000000Z"
    }
}
```

---

#### 2.10 — Modifier le signalement d'un autre utilisateur (doit échouer)

Utiliser un token différent de celui qui a créé le signalement.

Réponse **403** :
```json
{ "message": "This action is unauthorized." }
```

---

#### 2.11 — Supprimer son signalement

**DELETE** `http://localhost/api/reports/1`

Headers :
```
Accept: application/json
Authorization: Bearer 1|abcdefgh...
```

Réponse **200** :
```json
{ "message": "Report deleted." }
```

---

#### 2.12 — Supprimer un signalement inexistant

**DELETE** `http://localhost/api/reports/9999`

Réponse **404** :
```json
{ "message": "No query results for model [App\\Models\\Report] 9999" }
```

---

### PARTIE 3 — Actualité (Article)

Une actualité a deux types : `evenement` (avec localisation) ou `divers` (sans localisation).

---

#### 3.1 — Lister toutes les actualités (public)

**GET** `http://localhost/api/news`

Réponse **200** :
```json
{
    "data": [
        {
            "id": 1,
            "user": { "id": 1, "first_name": "Jean", "last_name": "Dupont", "...": "..." },
            "type": "evenement",
            "date": "2026-06-01",
            "title": "Journée de nettoyage",
            "description": "Grande journée de nettoyage au parc...",
            "image_urls": ["http://localhost/storage/articles/img.jpg"],
            "latitude": -18.9103,
            "longitude": 47.5362,
            "location_name": "Parc Tsimbazaza",
            "created_at": "...",
            "updated_at": "..."
        }
    ]
}
```

---

#### 3.2 — Créer une actualité — type `evenement`

**POST** `http://localhost/api/news`

Headers :
```
Accept: application/json
Authorization: Bearer 1|abcdefgh...
```

Body → `form-data` :

| Clé            | Type | Valeur                           |
| -------------- | ---- | -------------------------------- |
| `type`         | Text | `evenement`                      |
| `date`         | Text | `2026-06-01`                     |
| `title`        | Text | `Journée de nettoyage`           |
| `description`  | Text | `Grande journée de nettoyage...` |
| `latitude`     | Text | `-18.9103`                       |
| `longitude`    | Text | `47.5362`                        |
| `location_name`| Text | `Parc Tsimbazaza`                |
| `images[]`     | File | (sélectionner 1 à 5 fichiers)    |

Réponse **201** :
```json
{
    "message": "Article created.",
    "data": {
        "id": 1,
        "user": { "...": "..." },
        "type": "evenement",
        "date": "2026-06-01",
        "title": "Journée de nettoyage",
        "description": "Grande journée de nettoyage...",
        "image_urls": ["http://localhost/storage/articles/img.jpg"],
        "latitude": -18.9103,
        "longitude": 47.5362,
        "location_name": "Parc Tsimbazaza",
        "created_at": "...",
        "updated_at": "..."
    }
}
```

---

#### 3.3 — Créer une actualité — type `divers` (sans localisation)

Body → `form-data` :

| Clé           | Type | Valeur                                      |
| ------------- | ---- | ------------------------------------------- |
| `type`        | Text | `divers`                                    |
| `date`        | Text | `2026-05-20`                                |
| `title`       | Text | `Nouvelle règle de tri des déchets`         |
| `description` | Text | `Dès ce mois-ci, les plastiques doivent...` |

> `latitude`, `longitude`, `location_name` sont optionnels pour `divers`.

---

#### 3.4 — Créer un `evenement` sans latitude (doit échouer)

Réponse **422** :
```json
{
    "message": "The latitude field is required when type is evenement.",
    "errors": {
        "latitude": ["The latitude field is required when type is evenement."],
        "longitude": ["The longitude field is required when type is evenement."]
    }
}
```

---

#### 3.5 — Voir une actualité (public)

**GET** `http://localhost/api/news/1`

Réponse **200** : même structure que la création.

---

#### 3.6 — Modifier son actualité

**POST** `http://localhost/api/news/1`

Headers :
```
Accept: application/json
Authorization: Bearer 1|abcdefgh...
```

Body → `form-data` (seulement les champs à changer) :

| Clé     | Type | Valeur                     |
| ------- | ---- | -------------------------- |
| `title` | Text | `Journée de nettoyage MAJ` |

Réponse **200** :
```json
{
    "message": "Article updated.",
    "data": {
        "id": 1,
        "user": { "...": "..." },
        "type": "evenement",
        "date": "2026-06-01",
        "title": "Journée de nettoyage MAJ",
        "description": "Grande journée de nettoyage au parc...",
        "image_urls": ["http://localhost/storage/articles/img.jpg"],
        "latitude": -18.9103,
        "longitude": 47.5362,
        "location_name": "Parc Tsimbazaza",
        "created_at": "2026-05-14T08:00:00.000000Z",
        "updated_at": "2026-05-14T09:00:00.000000Z"
    }
}
```

---

#### 3.7 — Supprimer son actualité

**DELETE** `http://localhost/api/news/1`

Réponse **200** :
```json
{ "message": "Article deleted." }
```

---

## Récapitulatif des cas d'erreur

| Scénario                                         | Code | Message clé                                              |
| ------------------------------------------------ | ---- | -------------------------------------------------------- |
| Token absent sur une route protégée              | 401  | `Unauthenticated.`                                       |
| Token invalide ou révoqué                        | 401  | `Unauthenticated.`                                       |
| Modifier/supprimer la ressource d'un autre       | 403  | `This action is unauthorized.`                           |
| Ressource introuvable                            | 404  | `No query results for model...`                          |
| `category` invalide (pas dechet/infra/incendie)  | 422  | `The selected category is invalid.`                      |
| `type` absent pour `infra`                       | 422  | `The type field is required when category is infra.`     |
| `status` absent pour `infra`                     | 422  | `The status field is required when category is infra.`   |
| `type` invalide pour article                     | 422  | `The selected type is invalid.`                          |
| `latitude` absente pour `evenement`              | 422  | `The latitude field is required when type is evenement.` |
| Image trop grande (> 5 MB)                       | 422  | `The images.0 field must not be greater than 5120 kilobytes.` |
| Email déjà utilisé (register)                    | 422  | `The email has already been taken.`                      |
| Téléphone déjà utilisé (register)                | 422  | `The phone has already been taken.`                      |
| Mauvais email/password (login)                   | 422  | `These credentials do not match our records.`            |

---

## Note sur les images

Les images sont stockées dans `storage/app/public/`. Pour qu'elles soient accessibles via URL, le lien symbolique doit exister :

```bash
php artisan storage:link
```

Les URLs retournées dans `image_urls` seront de la forme :
```
http://localhost/storage/reports/nomfichier.jpg
http://localhost/storage/articles/nomfichier.jpg
```

Envoyer les images en `form-data` avec la clé `images[]` (avec les crochets). Maximum 5 fichiers, 5 MB chacun.

Si de nouvelles images sont envoyées lors d'une mise à jour, les anciennes sont supprimées et remplacées. Si aucune image n'est envoyée, les images existantes sont conservées.
