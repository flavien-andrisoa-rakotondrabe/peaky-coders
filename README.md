# CV Matching

Système intelligent de matching entre CV et offres d'emploi basé sur NLP et embeddings.

---

## 📁 Structure du projet

```bash

├── frontend/ (Next.js)
├── backend/ (Laravel)
└── ai-service/ (FastAPI)
│
└── README.md

```

---

## ⚙️ Fonctionnalités

- Upload de CV (PDF / DOCX)
- Création d'offres d'emploi
- Analyse automatique des CV
- Matching IA entre CV et job
- Score de compatibilité
- Détails des compétences matchées / manquantes

---

## 🔄 Flux global

1. L'utilisateur upload un CV ou une offre
2. Laravel stocke et orchestre la demande
3. FastAPI analyse et calcule le score
4. Résultat retourné à Laravel
5. Frontend affiche les résultats

---

## 🚀 Lancer le projet

### 1. Backend Laravel

```bash
cd backend
composer install
php artisan migrate
php artisan serve

```

2. Frontend Next.js

```bash
cd frontend
npm install
npm run dev

```

3. AI Service FastAPI

```bash

cd ai-service

Windows: .venv\Scripts\activate | Linux: source .venv/Scripts/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 9000

```
