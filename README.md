# unix-social 🌸

Automatisation des réseaux sociaux de **Unix Studio**.

```
Agent tendances (chaque lundi, Claude)
   └─► Notion « Tendances »  +  posts prêts dans Notion « Posts » (statut To review)
                                     │  tu relis / modifies → Approved
                                     ▼
unix-social (ce repo, sur ton Coolify, toutes les 10 min)
   ├─ génère les visuels aux couleurs Unix : PNG (posts, carrousels) ou MP4 (stories, reels animés)
   ├─ les envoie à Postiz et programme la publication (Instagram, TikTok, LinkedIn)
   └─ repasse le post en « Scheduled » dans Notion (ou « Error » avec le message)
```

Les 9 designs validés sont devenus 9 templates (`templates/`). Les champs de chaque template sont dans
[`TEMPLATES.md`](TEMPLATES.md) et dans la page Notion « Templates — référence ».

---

## Installation (une seule fois)

### 1. Postiz sur Coolify
1. Coolify → **+ New Resource → Service** → cherche **Postiz** → déploie-le, par exemple sur `postiz.unixcreativestudio.com`.
2. Ouvre Postiz, crée ton compte, puis ajoute la variable `DISABLE_REGISTRATION=true` au service et redéploie, pour que personne d'autre ne puisse s'inscrire.
3. Postiz → **Settings → Public API** → copie la clé API.

### 2. Connecter tes comptes dans Postiz
Comme Postiz est auto-hébergé, chaque réseau demande une « app développeur » à toi (gratuite). Les étapes exactes par réseau :
https://docs.postiz.com/providers

| Réseau | Ce qu'il faut | À savoir |
|---|---|---|
| Instagram | Compte **Pro** (Business ou Créateur) + app Meta Developers | Stories, posts, carrousels et reels OK. |
| TikTok | App TikTok for Developers avec *Content Posting API* | Tant que TikTok n'a pas audité ton app, les posts ne peuvent être que **privés**. Mets `TIKTOK_PRIVACY=SELF_ONLY` en attendant, puis demande l'audit. |
| LinkedIn | App LinkedIn Developers | Profil perso : immédiat. **Page entreprise** : demande l'accès *Community Management API* (validation par LinkedIn). |

Après chaque connexion, le réseau apparaît comme « channel » dans Postiz. Le robot le trouve tout seul.

### 3. Notion
1. https://www.notion.so/my-integrations → **New integration** (interne) → copie le token.
2. Dans Notion, ouvre la page **Unix — Social Studio** → `•••` → **Connections** → ajoute ton intégration.

### 4. Déployer ce repo sur Coolify
1. Pousse ce dossier dans un repo GitHub privé (`unix-social`).
2. Coolify → **+ New Resource → Private Repository** → choisis le repo → Build pack **Dockerfile**.
3. Pas de domaine ni de port (c'est un worker).
4. Variables d'environnement : copie `.env.example` et remplis `NOTION_TOKEN`, `POSTIZ_URL`, `POSTIZ_API_KEY`.
5. Deploy. Dans les logs tu dois voir `[cron] unix-social worker started`.

---

## Au quotidien
1. Le lundi, l'agent remplit **Tendances** et crée 3 à 5 posts en **To review**.
2. Tu relis : textes du visuel dans **Fields (JSON)**, légende dans **Caption**, date dans **Publish at**, réseaux dans **Platforms**.
3. Tu passes en **Approved** → dans les 10 minutes, le post est généré et programmé → **Scheduled** (avec un lien **Preview**).
4. Si quelque chose ne va pas → statut **Error** et le message dans **Error**. Corrige, puis remets en **Approved**.

Une date sans heure = publication à 10:00 (heure de Bruxelles). Une date passée = publication dans 10 minutes.

## Prévisualiser en local
Il faut Node 20+ et ffmpeg.
```bash
npm install
npx playwright install chromium
npm run preview                                  # les 9 templates avec les textes d'exemple
node src/preview.js quiz-story mes-textes.json   # un template avec tes propres textes
```
Résultat dans `out/preview/`.

## Ajouter ou modifier un template
- Un fichier par template dans `templates/` : `kind` (`image` | `carousel` | `video`), `size`, `duration` (vidéo), `example` (textes par défaut) et `build(fields)` qui renvoie le HTML.
- Les vidéos sont des animations CSS : le moteur les met en pause et les avance image par image (30 fps), donc le rendu est toujours identique.
- Règles de marque dans `src/brand.js` : pattern blob uniquement bleu sur fond #94ADFF, mascotte aux yeux transparents (#CEDAFF ou translucide).
- Ajoute le nom du template dans `templates/index.js` et dans la liste « Template » de la base Notion Posts.
