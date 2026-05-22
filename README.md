# NOREST

Site de la marque NOREST.
Pour l'instant, contient uniquement la slide **« Notre histoire »**, avec trois longueurs de récit (longue / moyenne / courte) commutables via des boutons, chacune avec son propre langage d'animation.

---

## Installer et lancer le site (pas à pas, aucun pré-requis GitHub)

### 1. Installer Node.js (une fois pour toutes)

Va sur **[https://nodejs.org](https://nodejs.org)** et clique sur le gros bouton vert **« LTS »**. Installe avec les options par défaut (Suivant → Suivant → Suivant). C'est tout.

> Pour vérifier que c'est bon, ouvre PowerShell (touche Windows → tape `powershell`) et tape `node --version`. Si ça affiche un numéro genre `v22.x.x`, c'est bon.

### 2. Récupérer le projet

Deux façons, prends la plus simple :

**A. La façon facile — télécharger un zip**

1. Va sur **[https://github.com/StyuDEV/norest](https://github.com/StyuDEV/norest)**
2. Clique sur le bouton vert **« Code »** en haut à droite
3. Clique sur **« Download ZIP »**
4. Dézippe le fichier où tu veux (par exemple sur le Bureau)

**B. Avec Git (si tu l'as déjà installé)**

```bash
git clone https://github.com/StyuDEV/norest.git
```

### 3. Lancer le site

Une fois le dossier `norest` (ou `norest-main` si c'est un zip) sur ta machine, **double-clique sur le fichier `start.bat`** qui est dedans.

Une fenêtre noire s'ouvre, ça télécharge des trucs (la première fois ça prend 1–2 minutes), puis ça lance le site. Le site est dispo à l'adresse :

→ **[http://localhost:3000](http://localhost:3000)**

Ouvre-la dans ton navigateur, tu verras la slide.

Pour arrêter le site, ferme simplement la fenêtre noire.

---

## Où éditer quoi

| Tu veux modifier… | Fichier |
| --- | --- |
| Le **texte** d'une des trois versions | `src/data/histoire.ts` |
| L'**animation** d'une version (longue / moyenne / courte) | `src/components/notre-histoire.tsx` (sections `LongueView`, `MoyenneView`, `CourteView`) |
| Le **sélecteur de version** (les pilules) | `src/components/notre-histoire.tsx` → `VersionSwitcher` |
| Le **fond / la mise en page globale** de la slide | `src/components/notre-histoire.tsx` → `NotreHistoire` |
| Les **polices** ou le **fond du site** | `src/app/layout.tsx`, `src/app/globals.css` |

## Logique des animations

Trois langages, de plus en plus marqués au fur et à mesure que le récit raccourcit :

- **Longue** — lecture calme, fade simple, peu de mouvement (on lit, on ne joue pas).
- **Moyenne** — paragraphes en cascade, flou qui se résorbe.
- **Courte** — révélation mot par mot, ressort, typographie grande échelle. C'est le mode « punchline ».

Le halo de fond derrière le texte s'intensifie aussi quand la version raccourcit.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · [Motion](https://motion.dev) (ex-Framer Motion).
