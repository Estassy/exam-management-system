# Exam Management System

## 📌 Description

Exam Management System est une application complète permettant de gérer des examens en ligne. Elle comprend un backend développé en **Spring Boot + PostgreSQL** et un frontend en **React + Vite**. L'objectif est d'offrir une solution efficace pour l'administration des examens, la gestion des utilisateurs, et l'automatisation des notifications.

## 📂 Structure du Projet

Le projet est organisé en deux principales parties :

```
exam-management-system/
├── backend/     # API REST avec Spring Boot
│   ├── src/
│   ├── pom.xml
│   ├── application.yml
│   └── ...
├── frontend/    # Interface utilisateur avec React
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── README.md    # Documentation du projet
└── .gitignore
```

## 🛠 Technologies Utilisées

### 🔹 Backend : Spring Boot + PostgreSQL

- **Spring Boot** (Web, Security, JPA, Mail, WebSockets)
- **PostgreSQL** (Base de données principale)
- **Lombok** (Simplification du code Java)
- **JWT (JSON Web Tokens)** (Authentification sécurisée)
- **Swagger** (Documentation de l'API REST)
- **Docker** (Optionnel pour la base de données)

### 🔹 Frontend : React + Vite

- **React.js** (Framework principal du frontend)
- **Vite** (Optimisation du développement)
- **React Router** (Gestion de la navigation)
- **Axios** (Appels API vers le backend)
- **TailwindCSS** (Stylisation moderne)

## ⚙️ Fonctionnalités Principales

### 🛡️ Authentification & Sécurité

- Gestion des utilisateurs (**Admin, Enseignant, Étudiant**)
- Sécurisation avec **JWT + Spring Security**

### 📚 Gestion des Examens

- CRUD des **examens** (Créer, Modifier, Supprimer, Lister)
- Association des **enseignants et étudiants** aux examens
- Génération de **codes d'examen uniques**

### 📋 Gestion des Quiz

- Création et modification des **quiz/questions**
- Association des **quiz aux examens**
- Correction automatique des réponses

### 📢 Notifications & Emails

- **Emails automatiques** lors de l’inscription à un examen
- Notifications en **temps réel avec WebSockets**

### 🔎 Recherche & Filtres avancés

- Recherche des examens par **enseignant, date, statut**
- Filtrage par **étudiants inscrits**

## 🚀 Installation & Démarrage

### 🔹 Backend (Spring Boot)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 🔹 Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

## ✅ Roadmap & Évolutions Futures

- 📜 **Export des examens en PDF**
- 📊 **Ajout de statistiques et graphiques dans le dashboard**
- 🎓 **Mode test en ligne pour les étudiants**
- 🔑 **Clés d’inscription aux examens**
- 🌙 **Mode sombre pour le frontend**

## 📜 Licence

Ce projet est sous licence **MIT**. Libre d’utilisation et de modification.

