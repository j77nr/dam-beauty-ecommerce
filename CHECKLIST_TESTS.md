# ✅ Checklist de Tests - DAM Beauty & Cosmetics

## Avant de Commencer
- [ ] Dépendances installées (`npm install`)
- [ ] Base de données créée (`npm run db:push`)
- [ ] Données de test peuplées (`npm run db:seed`)
- [ ] Serveur de développement lancé (`npm run dev`)

---

## 🔐 Tests d'Authentification

### Inscription
- [ ] Aller sur `/inscription`
- [ ] Remplir le formulaire avec de nouvelles données
- [ ] Vérifier la création du compte
- [ ] Vérifier la redirection vers `/compte`

### Connexion
- [ ] Aller sur `/connexion`
- [ ] Se connecter avec : `client@example.com` / `Client123!`
- [ ] Vérifier la redirection vers `/compte`
- [ ] Vérifier que le nom apparaît dans le header

### Déconnexion
- [ ] Cliquer sur "Déconnexion" depuis `/compte`
- [ ] Vérifier la redirection vers l'accueil
- [ ] Vérifier que "Connexion" réapparaît dans le header

---

## 🛒 Tests du Panier

### Utilisateur Invité
- [ ] Ne pas être connecté
- [ ] Aller sur `/catalogue`
- [ ] Cliquer sur un produit
- [ ] Cliquer sur "Ajouter au panier"
- [ ] Vérifier le toast de confirmation
- [ ] Vérifier le compteur du panier dans le header

### Page Panier
- [ ] Cliquer sur l'icône panier dans le header
- [ ] Vérifier l'affichage des produits ajoutés
- [ ] Augmenter la quantité d'un produit
- [ ] Vérifier la mise à jour du total
- [ ] Diminuer la quantité
- [ ] Supprimer un article
- [ ] Vérifier que le compteur dans le header se met à jour

### Fusion du Panier à la Connexion
- [ ] Ajouter des produits au panier en tant qu'invité
- [ ] Se connecter
- [ ] Vérifier que le panier est conservé
- [ ] Ajouter d'autres produits
- [ ] Vérifier que tout est dans le même panier

---

## 📦 Tests de Commande

### Processus de Checkout
- [ ] Avoir au moins 1 produit dans le panier
- [ ] Cliquer sur "Passer la commande"
- [ ] Vérifier la redirection vers `/commander`
- [ ] Vérifier l'affichage du récapitulatif
- [ ] Remplir toutes les informations requises :
  - [ ] Nom et prénom
  - [ ] Email
  - [ ] Téléphone
  - [ ] Adresse complète
  - [ ] Ville (tester Lomé et une autre ville)
- [ ] Vérifier le calcul des frais de livraison
  - [ ] Gratuit si Lomé
  - [ ] 2000 FCFA si autre ville
- [ ] Choisir un mode de paiement
- [ ] Ajouter une note (optionnel)
- [ ] Cliquer sur "Confirmer la commande"

### Page de Confirmation
- [ ] Vérifier la redirection vers `/commande-confirmee`
- [ ] Vérifier l'affichage du numéro de commande
- [ ] Vérifier l'affichage du total
- [ ] Vérifier l'affichage des articles commandés
- [ ] Cliquer sur "Voir mes commandes"

### Historique des Commandes
- [ ] Aller sur `/compte`
- [ ] Vérifier l'affichage de la commande passée
- [ ] Vérifier le numéro de commande
- [ ] Vérifier le total
- [ ] Vérifier le statut
- [ ] Cliquer sur "Voir les détails"
- [ ] Vérifier l'affichage complet de la commande

---

## 👨‍💼 Tests Admin

### Accès Admin
- [ ] Se déconnecter
- [ ] Se connecter avec `admin@damcosmetics.tg` et le mot de passe configuré via `ADMIN_SEED_PASSWORD`
- [ ] Aller sur `/compte`
- [ ] Vérifier la présence de la section "Administration"
- [ ] Cliquer sur "Accéder au panel admin"

### Dashboard Admin
- [ ] Aller sur `/admin`
- [ ] Vérifier l'affichage des statistiques :
  - [ ] Revenus totaux
  - [ ] Nombre de commandes
  - [ ] Commandes en attente
  - [ ] Nombre de produits
- [ ] Vérifier l'affichage des dernières commandes

### Gestion des Commandes
- [ ] Aller sur `/admin/commandes`
- [ ] Vérifier l'affichage de toutes les commandes
- [ ] Tester le filtre par statut :
  - [ ] Toutes les commandes
  - [ ] En attente
  - [ ] Confirmée
  - [ ] En préparation
  - [ ] En livraison
  - [ ] Livrée
  - [ ] Annulée
- [ ] Changer le statut d'une commande
- [ ] Vérifier le toast de confirmation
- [ ] Cliquer sur "Détails" d'une commande
- [ ] Vérifier l'affichage de toutes les informations :
  - [ ] Client
  - [ ] Articles
  - [ ] Total
  - [ ] Statut

### Gestion des Produits
- [ ] Aller sur `/admin/produits`
- [ ] Vérifier l'affichage de tous les produits

#### Créer un Produit
- [ ] Cliquer sur "Nouveau produit"
- [ ] Remplir le formulaire :
  - [ ] Nom
  - [ ] Slug (ex: mon-nouveau-produit)
  - [ ] Sous-titre
  - [ ] Prix
  - [ ] Catégorie
  - [ ] URL de l'image
  - [ ] Description courte
  - [ ] Description complète
  - [ ] Ingrédients (séparés par des virgules)
  - [ ] Mode d'emploi
  - [ ] En stock (coché)
- [ ] Cliquer sur "Créer le produit"
- [ ] Vérifier le toast de confirmation
- [ ] Vérifier que le produit apparaît dans la liste

#### Modifier un Produit
- [ ] Cliquer sur "Modifier" sur un produit
- [ ] Modifier le prix
- [ ] Modifier la description
- [ ] Cliquer sur "Mettre à jour"
- [ ] Vérifier le toast de confirmation
- [ ] Vérifier que les modifications sont affichées

#### Supprimer un Produit
- [ ] Cliquer sur l'icône poubelle d'un produit
- [ ] Confirmer la suppression
- [ ] Vérifier le toast de confirmation
- [ ] Vérifier que le produit a disparu de la liste

---

## 🎨 Tests d'Interface

### Responsive Design
- [ ] Tester sur écran large (desktop)
- [ ] Tester sur tablette (redimensionner le navigateur)
- [ ] Tester sur mobile (redimensionner le navigateur)
- [ ] Vérifier que le menu burger fonctionne sur mobile
- [ ] Vérifier que tous les formulaires sont utilisables

### Navigation
- [ ] Tester tous les liens du header
- [ ] Tester tous les liens du footer
- [ ] Tester le bouton "Retour" des pages
- [ ] Vérifier qu'aucun lien ne mène à une 404

### Toasts/Notifications
- [ ] Vérifier les toasts lors de :
  - [ ] Ajout au panier
  - [ ] Connexion réussie
  - [ ] Erreur de connexion
  - [ ] Création de commande
  - [ ] Modification de statut (admin)
  - [ ] Création/modification de produit (admin)

---

## 🔒 Tests de Sécurité

### Protection des Routes Admin
- [ ] Se déconnecter
- [ ] Essayer d'accéder à `/admin`
- [ ] Vérifier la redirection vers l'accueil
- [ ] Essayer d'accéder à `/admin/commandes`
- [ ] Vérifier la redirection vers l'accueil

### Protection de l'API Admin
- [ ] Se déconnecter ou se connecter en tant que client
- [ ] Ouvrir la console du navigateur
- [ ] Essayer d'appeler `/api/admin/stats`
- [ ] Vérifier le code d'erreur 403 (Accès interdit)

### Sessions
- [ ] Se connecter
- [ ] Fermer le navigateur
- [ ] Rouvrir le navigateur
- [ ] Aller sur le site
- [ ] Vérifier qu'on est toujours connecté

---

## 🐛 Tests d'Erreurs

### Formulaires
- [ ] Essayer de soumettre un formulaire vide
- [ ] Vérifier les messages d'erreur
- [ ] Essayer de créer un compte avec un email invalide
- [ ] Essayer de créer un compte avec un email déjà existant
- [ ] Essayer de se connecter avec de mauvais identifiants

### Panier
- [ ] Essayer de passer commande avec un panier vide
- [ ] Vérifier la redirection vers `/panier`

### Navigation
- [ ] Essayer d'accéder à une URL qui n'existe pas
- [ ] Vérifier l'affichage d'une page 404 (si implémentée)

---

## 📊 Statistiques Admin

### Vérification des Calculs
- [ ] Passer 3 commandes avec différents montants
- [ ] Aller sur `/admin`
- [ ] Vérifier que :
  - [ ] Le nombre total de commandes est correct
  - [ ] Les revenus totaux sont corrects (somme des commandes non annulées)
  - [ ] Le nombre de commandes en attente est correct
  - [ ] Les dernières commandes s'affichent

---

## ✅ Résumé Final

Une fois tous les tests passés :
- [ ] Toutes les fonctionnalités d'authentification fonctionnent
- [ ] Le panier fonctionne pour invités et utilisateurs connectés
- [ ] Le processus de commande fonctionne de bout en bout
- [ ] L'historique des commandes s'affiche correctement
- [ ] Le panel admin est fonctionnel
- [ ] La gestion des commandes fonctionne
- [ ] La gestion des produits (CRUD) fonctionne
- [ ] Les statistiques sont correctes
- [ ] L'interface est responsive
- [ ] Les routes sont protégées
- [ ] Les toasts s'affichent correctement

---

## 📝 Notes de Test

Utilisez cet espace pour noter les problèmes rencontrés :

```
Date du test: __________

Problèmes rencontrés:
- 
- 
- 

Solutions appliquées:
- 
- 
- 
```

---

**🎉 Si tous les tests sont verts, le site est prêt pour la production !**
