Voici une version améliorée en prenant en compte la séparation entre **frontend** et **backend** :

---

## **📌 Gestion des branches Git**

💡 **Nous utilisons une stratégie de branches pour organiser le développement efficacement, avec une séparation claire entre le frontend et le backend.**

### **🌍 Structure du projet**

Le projet est organisé en deux sous-dossiers :

```
/exam-management-system
  ├── frontend/  → Code du front (React/Vite)
  ├── backend/   → Code du back (Spring Boot)
```

### **📍 Workflow recommandé**

1️⃣ **Se positionner à la racine du projet et récupérer les dernières modifications :**

```bash
cd exam-management-system
git pull origin dev
```

2️⃣ **Aller dans le dossier correspondant au projet sur lequel on travaille :**

🔹 **Si tu travailles sur le frontend :**

```bash
cd frontend
```

🔹 **Si tu travailles sur le backend :**

```bash
cd backend
```

3️⃣ **Créer une nouvelle branche spécifique à la fonctionnalité :**

```bash
git checkout -b feature/nom-de-la-fonctionnalité
```

4️⃣ **Développer et valider les changements :**

```bash
git add .
git commit -m "Ajout de la fonctionnalité X"
```

5️⃣ **Pousser la branche sur le dépôt distant :**

```bash
git push origin feature/nom-de-la-fonctionnalité
```
