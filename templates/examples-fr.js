// French default texts for every template (Unix speaks French by default since Nov 2026).
// Fields missing in Notion fall back to these, so a post never shows English by accident.
// Tone: like unixcreativestudio.com/fr — "vous", calm, clear, no tech talk. Organic TikToks may use "tu".
export const EXAMPLES_FR = {
  'search-story': {
    headline: 'Quelqu’un vous cherche en ce moment.',
    query: 'car wash près de moi',
    result1Title: 'Votre concurrent',
    result1Sub: 'Il apparaît en premier. Il reçoit l’appel.',
    result2Title: 'Vous',
    result2Sub: 'Quelque part en page deux.',
    closing: 'Faisons en sorte qu’on vous trouve en premier.'
  },
  'tasks-story': {
    headline: 'Ce qu’un ordinateur pourrait faire pour vous',
    tasks: ['Répondre « ouvert dimanche ? »', 'Copier les mails dans Excel', 'Relancer devis et rappels', 'Reprogrammer le même client'],
    closing: 'Vous récupérez votre temps.',
    sub: 'Consulting IA · unixcreativestudio.com'
  },
  'quiz-story': {
    headline: 'Vous ne savez pas par où commencer ?',
    sub: 'C’est normal, la plupart des gens non plus.',
    label: 'Quiz',
    questions: [
      { q: 'Avez-vous un site web ?', options: ['Pas encore', 'Oui, mais je ne l’aime pas', 'Oui, et je l’adore'], pick: 1 },
      { q: 'Qu’est-ce qui vous aiderait le plus ?', options: ['Plus de temps', 'De nouveaux clients', 'Une app pour mes clients'], pick: 1 },
      { q: 'Quand voulez-vous commencer ?', options: ['Le plus vite possible', 'Dans 1 à 2 mois', 'Pas pressé'], pick: 0 }
    ],
    cta: 'Faites-le sur unixcreativestudio.com',
    note: 'Pas besoin d’appeler.'
  },
  'marquee-reel': {
    words: ['Faites fleurir votre entreprise', 'Soyez trouvé', 'Trouvez des clients', 'Gagnez du temps', 'Moins de stress'],
    tagline: 'Sites web · IA · Apps'
  },
  'signs-carousel': {
    cover: { title: '3 signes que votre site vous fait perdre des clients', sub: 'Et comment régler chacun.', swipe: 'Glissez' },
    section: 'Check du site',
    items: [
      { title: 'Il est difficile à utiliser sur téléphone.', body: 'La plupart des gens vous cherchent sur leur téléphone. S’ils doivent zoomer pour lire vos prix, ils partent.', fix: 'La solution : penser d’abord au téléphone' },
      { title: 'Personne ne le trouve.', body: 'Quand on cherche ce que vous faites sur Google ou ChatGPT, votre nom doit apparaître. Sinon, on choisit quelqu’un d’autre.', fix: 'La solution : dire clairement quoi et où' },
      { title: 'Il n’y a pas d’étape suivante claire.', body: 'En quelques secondes, on doit savoir comment réserver, appeler ou demander un prix. Un bouton clair vaut mieux que dix liens.', fix: 'La solution : un bouton évident sur chaque page' }
    ],
    cta: { title: 'Vous en reconnaissez un ?', body: 'On s’en occupe. Prix clairs, zéro jargon, zéro stress.', button: 'unixcreativestudio.com', note: 'Pas sûr ? Faites le quiz en 3 questions. Pas besoin d’appeler.' }
  },
  'before-after-carousel': {
    cover: { tag: 'Consulting IA', title: 'Que peut faire l’IA pour une petite entreprise ?', sub: 'Trois exemples concrets. Sans robots, sans jargon.', swipe: 'Glissez' },
    labels: { item: 'Exemple', before: 'Avant', after: 'Après' },
    items: [
      { before: 'Répondre aux mêmes questions toute la journée.', after: 'Un assistant sur votre site y répond, jour et nuit, avec vos mots.' },
      { before: 'Écrire chaque devis à la main.', after: 'Votre client remplit un petit formulaire. Le devis est prêt, vous n’avez qu’à vérifier.' },
      { before: 'Recopier les infos des mails dans un tableur.', after: 'Le tableur se remplit tout seul. Vous jetez juste un œil.' }
    ],
    cta: { title: 'Commencez par une seule tâche.', body: 'On trouve ce qui vous fait perdre le plus de temps et on construit le système IA qui s’en charge.', button: 'unixcreativestudio.com', note: 'Pas besoin de rien connaître à l’IA.' }
  },
  'review-post': {
    label: 'Ce que dit notre cliente',
    quote: 'Best designer in town, good job, good person, always listening. Thanks to Unix we have a lot more views from all over.',
    author: 'InessCoach',
    role: 'Fondatrice · Coaching mental football',
    footer: 'unixcreativestudio.com'
  },
  'list-linkedin': {
    kicker: 'Nos projets',
    title: 'Des entreprises qu’on a aidées à grandir',
    items: [
      { name: 'Brussels Summit Academy', label: 'Académie de football' },
      { name: 'Shiynelly Lashes', label: 'Studio de cils' },
      { name: 'Entraide Bruxelles', label: 'Association' },
      { name: 'Yaniswash', label: 'Lavage auto' },
      { name: 'InessCoach', label: 'Coaching mental football' }
    ]
  },
  'cards-linkedin': {
    title: 'Vous la gérez.\nNous l’aidons à grandir.',
    cards: [
      { title: 'Création de site web', body: 'Pour qu’on vous trouve, et qu’on vous choisisse.' },
      { title: 'Consulting IA', body: 'Pour que les tâches ennuyeuses ne soient plus les vôtres.' },
      { title: 'Application mobile', body: 'Pour que vos clients reviennent vers vous, pas vers un autre.' }
    ],
    footer: 'Prix clairs · Zéro jargon · Zéro stress'
  },
  'client-showcase': {
    url: 'https://yaniswash.be',
    business: 'Yaniswash',
    sector: 'Lavage auto · Bruxelles',
    hook: 'Ce car wash n’avait pas de site.',
    before: 'Les gens appelaient toute la journée juste pour le prix.',
    after: 'Maintenant les prix sont en ligne. Un bouton pour réserver.',
    closing: 'Petite entreprise, belle floraison.'
  },
  'site-review': {
    url: 'https://unixcreativestudio.com/fr',
    hook: 'Ce site dit tout en 4 secondes.',
    points: ['Une phrase claire tout en haut', 'Des couleurs douces, un seul style', 'Prix et prochaine étape, sans chercher'],
    credit: 'Site d’exemple · créditer le studio qui l’a fait',
    closing: 'Les bonnes idées marchent aussi pour les petites entreprises.'
  },
  'site-fix': {
    url: 'https://yaniswash.be',
    hook: 'Vous nous avez envoyé votre site. 3 petites corrections.',
    site: 'yaniswash.be',
    fixes: [
      { title: 'Les prix plus haut', body: 'La plupart des gens cherchent le prix. Montrez-le dès le premier écran.' },
      { title: 'Un bouton toujours visible', body: '« Réserver un lavage » doit vous suivre quand vous descendez.' },
      { title: 'Dites où vous travaillez', body: 'Ajoutez « Bruxelles et alentours » pour que Google et ChatGPT le sachent.' }
    ],
    closing: 'Vous voulez qu’on regarde le vôtre ? Envoyez-le sur notre site.'
  },
  'explainer-reel': {
    term: 'SEO',
    object: '🥐',
    tag: 'Zéro jargon',
    hook: 'Le SEO expliqué avec un croissant.',
    lines: [
      'Vous êtes la meilleure boulangerie du quartier… dans une petite rue.',
      'Le SEO, c’est le panneau sur la grande rue : croissants par ici.',
      'Dites ce que vous faites, où vous êtes, et chargez vite sur téléphone.'
    ],
    closing: 'Zéro jargon. C’est tout.'
  },
  'ai-demo': {
    hook: 'Coiffeurs : arrêtez de répondre « ouvert dimanche ? »',
    business: 'Votre salon',
    subtitle: 'répond en quelques secondes · jour et nuit',
    assistant: 'Assistant',
    messages: [
      { from: 'client', text: 'Bonjour ! Vous êtes ouverts dimanche ?' },
      { from: 'ai', text: 'Bonjour ! Nous sommes fermés le dimanche, mais samedi à 10h c’est libre. Je réserve ?' },
      { from: 'client', text: 'Oui, merci !' },
      { from: 'ai', text: 'C’est fait ✓ À samedi, 10h.' }
    ],
    label: 'Démo · un assistant IA sur votre site',
    closing: 'Vous récupérez vos dimanches.'
  },
  'price-breakdown': {
    hook: 'Qu’y a-t-il vraiment dans le prix d’un site ?',
    title: 'Un site pour une petite entreprise',
    docLabel: 'Devis',
    items: [
      { label: 'Un plan selon ce dont vos clients ont besoin', price: '' },
      { label: 'Un design qui vous ressemble', price: '' },
      { label: 'Des textes qui disent ce que vous faites', price: '' },
      { label: 'Rapide sur téléphone', price: '' },
      { label: 'Trouvé sur Google et ChatGPT', price: '' }
    ],
    total: 'Prix fixe, par écrit, en 48 heures',
    closing: 'Prix clairs. Pas de surprises.'
  },
  'founder-diary': {
    day: 'Jour 1',
    url: 'https://unixcreativestudio.com/fr',
    lines: [
      'Je viens d’être diplômée. Aujourd’hui, je lance un studio de design à Bruxelles.',
      'Pas d’investisseurs. Un ordi. Une idée :',
      'aider les petites entreprises à être trouvées, sans jargon.',
      'Je vais tout partager ici : les victoires, les erreurs, les chiffres.'
    ],
    sign: 'Construire Unix',
    closing: 'Suivez l’aventure. Jour après jour.'
  },
  'broll-text': {
    clips: ['sample-desk.mp4', 'sample-scroll.mp4'],
    lines: [
      'pov : tu as enfin un site qui t’amène des clients',
      'pas un site compliqué.',
      'juste des prix clairs, un bouton et ton nom sur google',
      'c’est tout 🌸'
    ],
    style: 'box',
    position: 'center'
  },
  'screen-native': {
    url: 'https://yaniswash.be',
    lines: [
      'on a fait le site d’un car wash à bruxelles',
      'les prix direct. plus besoin d’appeler.',
      'un bouton pour réserver',
      'petite entreprise, belle floraison 🌸'
    ],
    style: 'box',
    position: 'top'
  }
};
