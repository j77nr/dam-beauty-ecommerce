# ⚠️ Dépendances Manquantes à Installer

## 📦 Commandes d'Installation

Exécutez ces commandes pour installer toutes les dépendances manquantes :

```bash
# Dépendances runtime requises
npm install bcryptjs drizzle-orm better-sqlite3 nanoid tsx cookie

# Ou en une seule commande :
npm install bcryptjs drizzle-orm better-sqlite3 nanoid tsx cookie
```

---

## 📋 Détails des Dépendances

### bcryptjs
- **Usage** : Hashage des mots de passe
- **Fichiers** : `src/lib/auth.ts`, `src/db/seed.ts`
- **Commande** : `npm install bcryptjs`

### drizzle-orm
- **Usage** : ORM pour la base de données
- **Fichiers** : `src/db/index.ts`, `src/db/schema.ts`, toutes les API routes
- **Commande** : `npm install drizzle-orm`

### better-sqlite3
- **Usage** : Driver SQLite pour Node.js
- **Fichiers** : `src/db/index.ts`
- **Commande** : `npm install better-sqlite3`
- **Note** : Nécessite les outils de build C++ sur Windows

### nanoid
- **Usage** : Génération d'IDs uniques (sessions, numéros de commande)
- **Fichiers** : `src/lib/auth.ts`, `src/routes/api/orders/create.ts`
- **Commande** : `npm install nanoid`

### tsx
- **Usage** : Exécution de scripts TypeScript (seed)
- **Fichiers** : Script npm `db:seed`
- **Commande** : `npm install tsx`

### cookie
- **Usage** : Parsing des cookies
- **Fichiers** : Toutes les API routes qui utilisent `parse()`
- **Commande** : `npm install cookie`
- **Types** : `npm install -D @types/cookie`

---

## 🔧 Alternative : better-sqlite3 vs @libsql/client

Si l'installation de `better-sqlite3` échoue (besoin de Visual Studio Build Tools sur Windows), vous pouvez utiliser `@libsql/client` à la place :

### Option 1 : better-sqlite3 (Recommandé)
```bash
npm install better-sqlite3
```

Nécessite Visual Studio Build Tools sur Windows :
- Télécharger : https://visualstudio.microsoft.com/downloads/
- Installer : "Build Tools for Visual Studio 2022"
- Sélectionner : "Desktop development with C++"

### Option 2 : @libsql/client (Plus simple)
```bash
npm uninstall better-sqlite3
npm install @libsql/client
```

Puis modifier `src/db/index.ts` :

```typescript
// Remplacer :
import Database from "better-sqlite3";
export const sqlite = new Database("sqlite.db");

// Par :
import { createClient } from "@libsql/client";
export const sqlite = createClient({
  url: "file:sqlite.db"
});
```

---

## ✅ Vérification

Après installation, vérifiez que tout fonctionne :

```bash
# 1. Installer
npm install bcryptjs drizzle-orm better-sqlite3 nanoid tsx cookie

# 2. Installer les types
npm install -D @types/cookie

# 3. Vérifier l'installation
npm list bcryptjs drizzle-orm better-sqlite3 nanoid tsx cookie

# 4. Initialiser la base de données
npm run db:push

# 5. Peupler avec des données
npm run db:seed

# 6. Lancer le serveur
npm run dev
```

---

## 🐛 Problèmes Courants

### Erreur: Cannot find module 'bcryptjs'
```bash
npm install bcryptjs
```

### Erreur: Cannot find module 'drizzle-orm'
```bash
npm install drizzle-orm
```

### Erreur: better-sqlite3 needs C++ build tools
**Solution 1** : Installer Visual Studio Build Tools
**Solution 2** : Utiliser @libsql/client (voir ci-dessus)

### Erreur: Cannot find module 'cookie'
```bash
npm install cookie
npm install -D @types/cookie
```

### Erreur: 'tsx' n'est pas reconnu
```bash
npm install tsx
```

---

## 📌 Note Importante

Ces dépendances sont **essentielles** pour le fonctionnement du site. Sans elles :
- ❌ L'authentification ne fonctionnera pas (bcryptjs)
- ❌ La base de données ne sera pas accessible (drizzle-orm, better-sqlite3)
- ❌ Les sessions ne pourront pas être créées (nanoid)
- ❌ Les cookies ne seront pas parsés (cookie)
- ❌ Le script de seed ne pourra pas s'exécuter (tsx)

---

**Une fois toutes les dépendances installées, supprimez ce fichier et suivez `DEMARRAGE_RAPIDE.md`**
