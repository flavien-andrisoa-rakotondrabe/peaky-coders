# Peacky API — Gestion de Déchets

API REST — Laravel 13 | Signalements & Actualités

## Stack

- **Laravel 13** / PHP 8.3+
- **PostgreSQL**
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

| Variable                     | Description                             | Exemple                 |
| ---------------------------- | --------------------------------------- | ----------------------- |
| `APP_URL`                    | URL du backend                          | `http://localhost`      |
| `DB_*`                       | Connexion PostgreSQL                    | voir `.env`             |
| `CORS_ALLOWED_ORIGINS`       | Origines autorisées                     | `http://localhost:3000` |
| `CITIZEN_TOKEN_TTL_MINUTES`  | Durée de vie du token citizen (minutes) | `1440` (= 24h)          |

---

## Système d'identification — Citizen Token

Pas de login classique. L'identification fonctionne ainsi :

1. L'utilisateur fournit son nom → le backend crée un **Citizen** et retourne un **UUID token**
2. Ce token est stocké dans `localStorage` côté navigateur
3. Chaque requête protégée envoie ce token dans le header `X-Citizen-Token`
4. Le token expire après **24h** (configurable via `CITIZEN_TOKEN_TTL_MINUTES` dans `.env`). Quand il expire, refaire l'étape 1

---

## Headers obligatoires (toutes les requêtes)

```
Accept: application/json
```

Pour les routes protégées, ajouter :

```
X-Citizen-Token: {ton-uuid-token}
```

> Pour les uploads d'images, ne pas mettre `Content-Type: application/json` — Postman le gère automatiquement en `multipart/form-data`.

---

## Tableau des endpoints

| Méthode | Endpoint                  | Auth | Description                  |
| ------- | ------------------------- | ---- | ---------------------------- |
| POST    | `/api/citizens`           | Non  | Créer un citizen             |
| GET     | `/api/citizens/me`        | Oui  | Voir son profil citizen       |
| GET     | `/api/reports`            | Non  | Lister tous les signalements  |
| GET     | `/api/reports/{id}`       | Non  | Voir un signalement           |
| POST    | `/api/reports`            | Oui  | Créer un signalement          |
| POST    | `/api/reports/{id}`       | Oui  | Modifier son signalement      |
| DELETE  | `/api/reports/{id}`       | Oui  | Supprimer son signalement     |
| GET     | `/api/news`               | Non  | Lister toutes les actualités  |
| GET     | `/api/news/{id}`          | Non  | Voir une actualité            |
| POST    | `/api/news`               | Oui  | Créer une actualité           |
| POST    | `/api/news/{id}`          | Oui  | Modifier son actualité        |
| DELETE  | `/api/news/{id}`          | Oui  | Supprimer son actualité       |

---

## Structures de réponse — Report & Article

### Interfaces TypeScript

```ts
interface Citizen {
  id: number
  name: string
  expires_at: string  // ISO8601, ex: "2027-05-14T07:00:00.000000Z"
}

interface Report {
  id: number
  citizen?: Citizen         // présent sur show / store / update — absent sur index
  category: 'dechet' | 'infra' | 'incendie'
  type: string | null       // requis si category = 'infra'
  status: string | null     // requis si category = 'infra'
  image_url: string | null  // ex: "http://localhost/storage/reports/abc.jpg"
  latitude: number
  longitude: number
  location_name: string
  created_at: string        // ISO8601
  updated_at: string        // ISO8601
}

interface Article {
  id: number
  citizen?: Citizen            // présent sur show / store / update — absent sur index
  type: 'evenement' | 'divers'
  title: string
  description: string
  image_url: string | null
  latitude: number | null      // requis si type = 'evenement'
  longitude: number | null     // requis si type = 'evenement'
  location_name: string | null // requis si type = 'evenement'
  created_at: string
  updated_at: string
}
```

---

### Réponses par endpoint — Reports

**GET /api/reports** → `200`
```json
{
    "data": [
        {
            "id": 1,
            "citizen": { "id": 1, "name": "Jean Dupont", "expires_at": "2027-05-14T07:00:00.000000Z" },
            "category": "dechet",
            "type": null,
            "status": null,
            "image_url": "http://localhost/storage/reports/xyz.jpg",
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
        "citizen": { "id": 1, "name": "Jean Dupont", "expires_at": "2027-05-14T07:00:00.000000Z" },
        "category": "dechet",
        "type": null,
        "status": null,
        "image_url": "http://localhost/storage/reports/xyz.jpg",
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
        "citizen": { "id": 1, "name": "Jean Dupont", "expires_at": "2027-05-14T07:00:00.000000Z" },
        "category": "infra",
        "type": "Route endommagée",
        "status": "En attente de réparation",
        "image_url": "http://localhost/storage/reports/xyz.jpg",
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
    "data": {
        "id": 1,
        "citizen": { "id": 1, "name": "Jean Dupont", "expires_at": "2027-05-14T07:00:00.000000Z" },
        "category": "dechet",
        "type": null,
        "status": null,
        "image_url": "http://localhost/storage/reports/xyz.jpg",
        "latitude": -18.9103,
        "longitude": 47.5362,
        "location_name": "Ampefiloha",
        "created_at": "2026-05-14T08:00:00.000000Z",
        "updated_at": "2026-05-14T09:00:00.000000Z"
    }
}
```

**DELETE /api/reports/{id}** → `200`
```json
{
    "message": "Report deleted."
}
```

---

### Réponses par endpoint — Articles (endpoint : `/api/news`)

**GET /api/news** → `200`
```json
{
    "data": [
        {
            "id": 1,
            "citizen": { "id": 1, "name": "Jean Dupont", "expires_at": "2027-05-14T07:00:00.000000Z" },
            "type": "evenement",
            "title": "Journée de nettoyage",
            "description": "Grande journée de nettoyage au parc...",
            "image_url": "http://localhost/storage/articles/img.jpg",
            "latitude": -18.9103,
            "longitude": 47.5362,
            "location_name": "Parc Tsimbazaza",
            "created_at": "2026-05-14T08:00:00.000000Z",
            "updated_at": "2026-05-14T08:00:00.000000Z"
        }
    ]
}
```

**GET /api/news/{id}** → `200`
```json
{
    "data": {
        "id": 1,
        "citizen": { "id": 1, "name": "Jean Dupont", "expires_at": "2027-05-14T07:00:00.000000Z" },
        "type": "evenement",
        "title": "Journée de nettoyage",
        "description": "Grande journée de nettoyage au parc...",
        "image_url": "http://localhost/storage/articles/img.jpg",
        "latitude": -18.9103,
        "longitude": 47.5362,
        "location_name": "Parc Tsimbazaza",
        "created_at": "2026-05-14T08:00:00.000000Z",
        "updated_at": "2026-05-14T08:00:00.000000Z"
    }
}
```

**POST /api/news** → `201`
```json
{
    "message": "Article created.",
    "data": {
        "id": 2,
        "citizen": { "id": 1, "name": "Jean Dupont", "expires_at": "2027-05-14T07:00:00.000000Z" },
        "type": "divers",
        "title": "Nouvelle règle de tri des déchets",
        "description": "Dès ce mois-ci, les plastiques doivent...",
        "image_url": null,
        "latitude": null,
        "longitude": null,
        "location_name": null,
        "created_at": "2026-05-14T08:00:00.000000Z",
        "updated_at": "2026-05-14T08:00:00.000000Z"
    }
}
```

**POST /api/news/{id}** → `200`
```json
{
    "message": "Article updated.",
    "data": {
        "id": 1,
        "citizen": { "id": 1, "name": "Jean Dupont", "expires_at": "2027-05-14T07:00:00.000000Z" },
        "type": "evenement",
        "title": "Journée de nettoyage MAJ",
        "description": "Grande journée de nettoyage au parc...",
        "image_url": "http://localhost/storage/articles/img.jpg",
        "latitude": -18.9103,
        "longitude": 47.5362,
        "location_name": "Parc Tsimbazaza",
        "created_at": "2026-05-14T08:00:00.000000Z",
        "updated_at": "2026-05-14T09:00:00.000000Z"
    }
}
```

**DELETE /api/news/{id}** → `200`
```json
{
    "message": "Article deleted."
}
```

---

## Guide de test Postman — Étape par étape

---

### PARTIE 1 — Citizen (Identification)

---

#### 1.1 — Créer un citizen

**POST** `http://localhost/api/citizens`

Header :
```
Accept: application/json
```

Body → `raw` → `JSON` :
```json
{
    "name": "Jean Dupont"
}
```

Réponse **201** :
```json
{
    "message": "Citizen registered.",
    "data": {
        "citizen": {
            "id": 1,
            "name": "Jean Dupont",
            "expires_at": "2027-05-14T07:00:00.000000Z"
        },
        "token": "550e8400-e29b-41d4-a716-446655440000"
    }
}
```

> **Copier le `token`** et le garder pour toutes les requêtes suivantes.

---

#### 1.2 — Vérifier son profil citizen (token valide)

**GET** `http://localhost/api/citizens/me`

Headers :
```
Accept: application/json
X-Citizen-Token: 550e8400-e29b-41d4-a716-446655440000
```

Réponse **200** :
```json
{
    "data": {
        "id": 1,
        "name": "Jean Dupont",
        "expires_at": "2027-05-14T07:00:00.000000Z"
    }
}
```

---

#### 1.3 — Vérifier son profil sans token (doit échouer)

**GET** `http://localhost/api/citizens/me`

Sans header `X-Citizen-Token`

Réponse **401** :
```json
{
    "message": "Unauthenticated."
}
```

---

### PARTIE 2 — Signalement (Report)

Un signalement a trois catégories : `dechet`, `infra`, `incendie`

- `dechet` et `incendie` : localisation + image
- `infra` : localisation + image + `type` (texte libre) + `status` (texte libre)

---

#### 2.1 — Lister tous les signalements (public)

**GET** `http://localhost/api/reports`

Header :
```
Accept: application/json
```

Réponse **200** :
```json
{
    "data": [
        {
            "id": 1,
            "citizen": { "id": 1, "name": "Jean Dupont", "expires_at": "..." },
            "category": "dechet",
            "type": null,
            "status": null,
            "image_url": "http://localhost/storage/reports/image.jpg",
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
X-Citizen-Token: 550e8400-e29b-41d4-a716-446655440000
```

Body → `form-data` :

| Clé            | Type | Valeur                   |
| -------------- | ---- | ------------------------ |
| `category`     | Text | `dechet`                 |
| `latitude`     | Text | `-18.9103`               |
| `longitude`    | Text | `47.5362`                |
| `location_name`| Text | `Antananarivo Centre`    |
| `image`        | File | (sélectionner un fichier)|

Réponse **201** :
```json
{
    "message": "Report created.",
    "data": {
        "id": 1,
        "citizen": { "id": 1, "name": "Jean Dupont", "expires_at": "..." },
        "category": "dechet",
        "type": null,
        "status": null,
        "image_url": "http://localhost/storage/reports/xyz.jpg",
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

**POST** `http://localhost/api/reports`

Headers :
```
Accept: application/json
X-Citizen-Token: 550e8400-e29b-41d4-a716-446655440000
```

Body → `form-data` :

| Clé            | Type | Valeur              |
| -------------- | ---- | ------------------- |
| `category`     | Text | `incendie`          |
| `latitude`     | Text | `-18.8792`          |
| `longitude`    | Text | `47.5079`           |
| `location_name`| Text | `Ivandry`           |
| `image`        | File | (sélectionner)      |

---

#### 2.4 — Créer un signalement — catégorie `infra`

**POST** `http://localhost/api/reports`

Headers :
```
Accept: application/json
X-Citizen-Token: 550e8400-e29b-41d4-a716-446655440000
```

Body → `form-data` :

| Clé            | Type | Valeur                     |
| -------------- | ---- | -------------------------- |
| `category`     | Text | `infra`                    |
| `type`         | Text | `Route endommagée`         |
| `status`       | Text | `En attente de réparation` |
| `latitude`     | Text | `-18.9200`                 |
| `longitude`    | Text | `47.5400`                  |
| `location_name`| Text | `Analakely`                |
| `image`        | File | (sélectionner)             |

---

#### 2.5 — Créer un signalement `infra` sans `type` (doit échouer)

**POST** `http://localhost/api/reports`

Body → `form-data` :

| Clé         | Type | Valeur    |
| ----------- | ---- | --------- |
| `category`  | Text | `infra`   |
| `latitude`  | Text | `-18.91`  |
| `longitude` | Text | `47.53`   |

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

Body → `form-data` :

| Clé         | Type | Valeur    |
| ----------- | ---- | --------- |
| `category`  | Text | `bidon`   |
| `latitude`  | Text | `-18.91`  |
| `longitude` | Text | `47.53`   |

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

#### 2.7 — Créer un signalement sans être identifié (doit échouer)

Sans header `X-Citizen-Token`

Réponse **401** :
```json
{
    "message": "Unauthenticated."
}
```

---

#### 2.8 — Voir un signalement (public)

**GET** `http://localhost/api/reports/1`

Réponse **200** :
```json
{
    "data": {
        "id": 1,
        "citizen": { "id": 1, "name": "Jean Dupont", "expires_at": "..." },
        "category": "dechet",
        "type": null,
        "status": null,
        "image_url": "http://localhost/storage/reports/xyz.jpg",
        "latitude": -18.9103,
        "longitude": 47.5362,
        "location_name": "Antananarivo Centre",
        "created_at": "...",
        "updated_at": "..."
    }
}
```

---

#### 2.9 — Modifier son signalement

**POST** `http://localhost/api/reports/1`

Headers :
```
Accept: application/json
X-Citizen-Token: 550e8400-e29b-41d4-a716-446655440000
```

Body → `form-data` (envoyer seulement les champs à changer) :

| Clé            | Type | Valeur              |
| -------------- | ---- | ------------------- |
| `location_name`| Text | `Ampefiloha`        |

Réponse **200** :
```json
{
    "message": "Report updated.",
    "data": {
        "id": 1,
        "citizen": { "id": 1, "name": "Jean Dupont", "expires_at": "2027-05-14T07:00:00.000000Z" },
        "category": "dechet",
        "type": null,
        "status": null,
        "image_url": "http://localhost/storage/reports/xyz.jpg",
        "latitude": -18.9103,
        "longitude": 47.5362,
        "location_name": "Ampefiloha",
        "created_at": "2026-05-14T08:00:00.000000Z",
        "updated_at": "2026-05-14T09:00:00.000000Z"
    }
}
```

---

#### 2.10 — Modifier le signalement d'un autre citizen (doit échouer)

Utiliser un token différent de celui qui a créé le signalement.

**POST** `http://localhost/api/reports/1`

Header :
```
X-Citizen-Token: autre-uuid-token
```

Réponse **403** :
```json
{
    "message": "This action is unauthorized."
}
```

---

#### 2.11 — Supprimer son signalement

**DELETE** `http://localhost/api/reports/1`

Headers :
```
Accept: application/json
X-Citizen-Token: 550e8400-e29b-41d4-a716-446655440000
```

Réponse **200** :
```json
{
    "message": "Report deleted."
}
```

---

#### 2.12 — Supprimer un signalement inexistant

**DELETE** `http://localhost/api/reports/9999`

Réponse **404** :
```json
{
    "message": "No query results for model [App\\Models\\Report] 9999"
}
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
            "citizen": { "id": 1, "name": "Jean Dupont", "expires_at": "..." },
            "type": "evenement",
            "title": "Journée de nettoyage",
            "description": "Grande journée de nettoyage au parc...",
            "image_url": "http://localhost/storage/articles/img.jpg",
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
X-Citizen-Token: 550e8400-e29b-41d4-a716-446655440000
```

Body → `form-data` :

| Clé            | Type | Valeur                              |
| -------------- | ---- | ----------------------------------- |
| `type`         | Text | `evenement`                         |
| `title`        | Text | `Journée de nettoyage`              |
| `description`  | Text | `Grande journée de nettoyage...`    |
| `latitude`     | Text | `-18.9103`                          |
| `longitude`    | Text | `47.5362`                           |
| `location_name`| Text | `Parc Tsimbazaza`                   |
| `image`        | File | (sélectionner)                      |

Réponse **201** :
```json
{
    "message": "Article created.",
    "data": {
        "id": 1,
        "citizen": { "id": 1, "name": "Jean Dupont", "expires_at": "..." },
        "type": "evenement",
        "title": "Journée de nettoyage",
        "description": "Grande journée de nettoyage...",
        "image_url": "http://localhost/storage/articles/img.jpg",
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

**POST** `http://localhost/api/news`

Headers :
```
Accept: application/json
X-Citizen-Token: 550e8400-e29b-41d4-a716-446655440000
```

Body → `form-data` :

| Clé           | Type | Valeur                                   |
| ------------- | ---- | ---------------------------------------- |
| `type`        | Text | `divers`                                 |
| `title`       | Text | `Nouvelle règle de tri des déchets`      |
| `description` | Text | `Dès ce mois-ci, les plastiques doivent...` |

> `latitude`, `longitude`, `location_name` optionnels pour `divers`.

Réponse **201** :
```json
{
    "message": "Article created.",
    "data": {
        "id": 2,
        "type": "divers",
        "title": "Nouvelle règle de tri des déchets",
        "description": "Dès ce mois-ci...",
        "image_url": null,
        "latitude": null,
        "longitude": null,
        "location_name": null,
        "created_at": "...",
        "updated_at": "..."
    }
}
```

---

#### 3.4 — Créer un `evenement` sans latitude (doit échouer)

Body → `form-data` :

| Clé           | Type | Valeur          |
| ------------- | ---- | --------------- |
| `type`        | Text | `evenement`     |
| `title`       | Text | `Test`          |
| `description` | Text | `Une description` |

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

#### 3.5 — Créer une actualité avec un type invalide (doit échouer)

Body → `form-data` :

| Clé           | Type | Valeur    |
| ------------- | ---- | --------- |
| `type`        | Text | `autre`   |
| `title`       | Text | `Test`    |
| `description` | Text | `...`     |

Réponse **422** :
```json
{
    "message": "The selected type is invalid.",
    "errors": {
        "type": ["The selected type is invalid."]
    }
}
```

---

#### 3.6 — Créer une actualité sans être identifié (doit échouer)

Sans header `X-Citizen-Token`

Réponse **401** :
```json
{
    "message": "Unauthenticated."
}
```

---

#### 3.7 — Voir une actualité (public)

**GET** `http://localhost/api/news/1`

Réponse **200** : même structure que la création.

---

#### 3.8 — Modifier son actualité

**POST** `http://localhost/api/news/1`

Headers :
```
Accept: application/json
X-Citizen-Token: 550e8400-e29b-41d4-a716-446655440000
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
        "citizen": { "id": 1, "name": "Jean Dupont", "expires_at": "2027-05-14T07:00:00.000000Z" },
        "type": "evenement",
        "title": "Journée de nettoyage MAJ",
        "description": "Grande journée de nettoyage au parc...",
        "image_url": "http://localhost/storage/articles/img.jpg",
        "latitude": -18.9103,
        "longitude": 47.5362,
        "location_name": "Parc Tsimbazaza",
        "created_at": "2026-05-14T08:00:00.000000Z",
        "updated_at": "2026-05-14T09:00:00.000000Z"
    }
}
```

---

#### 3.9 — Modifier l'actualité d'un autre citizen (doit échouer)

Même principe que le report — utiliser un token différent.

Réponse **403** :
```json
{
    "message": "This action is unauthorized."
}
```

---

#### 3.10 — Supprimer son actualité

**DELETE** `http://localhost/api/news/1`

Headers :
```
Accept: application/json
X-Citizen-Token: 550e8400-e29b-41d4-a716-446655440000
```

Réponse **200** :
```json
{
    "message": "Article deleted."
}
```

---

## Récapitulatif des cas d'erreur

| Scénario                                    | Code | Message clé                                         |
| ------------------------------------------- | ---- | --------------------------------------------------- |
| Token absent sur une route protégée         | 401  | `Unauthenticated.`                                  |
| Token expiré                                | 401  | `Unauthenticated.`                                  |
| Modifier/supprimer la ressource d'un autre  | 403  | `This action is unauthorized.`                      |
| Ressource introuvable                       | 404  | `No query results for model...`                     |
| `category` invalide (pas déchet/infra/incendie) | 422 | `The selected category is invalid.`             |
| `type` absent pour `infra`                  | 422  | `The type field is required when category is infra.`|
| `status` absent pour `infra`                | 422  | `The status field is required when category is infra.`|
| `type` invalide pour article                | 422  | `The selected type is invalid.`                     |
| `latitude` absente pour `evenement`         | 422  | `The latitude field is required when type is evenement.`|
| Image trop grande (> 5 MB)                  | 422  | `The image field must not be greater than 5120 kilobytes.`|

---

## Note sur les images

Les images sont stockées dans `storage/app/public/`. Pour qu'elles soient accessibles via URL, le lien symbolique doit exister :

```bash
php artisan storage:link
```

L'URL retournée dans `image_url` sera de la forme :
```
http://localhost/storage/reports/nomfichier.jpg
http://localhost/storage/articles/nomfichier.jpg
```
