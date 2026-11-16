# Portfolio de Mansour Toure

Un site statique responsive en HTML, CSS et JavaScript. Il présente votre profil, le projet Tafuta, votre expérience COSAU 2026, vos compétences, vos certifications et un moyen de contact.

## Ouvrir le site sur votre ordinateur

1. Ouvrez le dossier `Portofolio` dans l’Explorateur de fichiers.
2. Pour un aperçu rapide, double-cliquez sur `index.html`.
3. Pour modifier le site, ouvrez le dossier dans Visual Studio Code : **Fichier → Ouvrir le dossier**.
4. Dans VS Code, ouvrez `index.html`. Pour voir vos changements, enregistrez avec `Ctrl + S` et actualisez la page dans le navigateur.

Pour un aperçu qui se met à jour automatiquement, installez l’extension **Live Server** depuis la galerie d’extensions de VS Code, puis faites un clic droit sur `index.html` et choisissez **Open with Live Server**.

## Modifier le portfolio

- **Textes, coordonnées et sections :** `index.html`.
- **Couleurs, mise en page et apparence mobile :** `styles.css`.
- **Projets affichés au chargement :** le tableau `starterProjects` au début de `app.js`.
- **Adresse GitHub :** le lien de contact dans `index.html`.

Pour ajouter un projet qui sera visible par tous les visiteurs, ajoutez un objet au tableau `starterProjects` dans `app.js`. Exemple :

```js
{
  title: "Mon nouveau projet",
  category: "Développement",
  year: "2026",
  description: "Le problème traité, votre contribution et le résultat.",
  visual: "MON\nPROJET",
  stack: "JavaScript · React · API",
  link: "https://github.com/votre-compte/votre-projet"
}
```

Utilisez les catégories proposées dans le formulaire : `Data & IA`, `Développement` ou `Engagement`.

Le bouton **Ajouter un projet** est un aide-mémoire local : le projet ajouté par ce formulaire reste enregistré dans le navigateur qui l’a saisi. Il n’est pas envoyé au site publié et n’apparaît pas chez les autres visiteurs. Pour publier un projet, ajoutez-le aussi à `starterProjects`, puis republiez les fichiers.

## Publier le site pour y accéder partout

Une option simple est GitHub Pages. Il faut un compte GitHub et un dépôt contenant les fichiers du site. Importez `index.html`, `styles.css` et `app.js` à la racine du dépôt. Dans le dépôt, ouvrez **Settings → Pages**, choisissez **Deploy from a branch**, sélectionnez la branche `main` et le dossier `/(root)`, puis enregistrez. GitHub affichera l’adresse publique du site dans cette page. Les changements envoyés ensuite au dépôt seront publiés par Pages. [Guide officiel de configuration GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Un site GitHub Pages est public sur Internet. Vérifiez les coordonnées et les informations personnelles avant la publication. L’adresse e-mail et la ville affichées sont celles du CV ; le numéro de téléphone n’est pas inclus.
