# Templates — champs JSON

Copie l’exemple dans « Fields (JSON) » d’un post Notion et change les textes. Les champs absents reprennent la valeur de l’exemple.

## search-story
Type : video (8s) · format 1080×1920
```json
{
  "headline": "Someone is looking for you right now.",
  "query": "carwash near me",
  "result1Title": "Your competitor",
  "result1Sub": "Shows up first. Gets the call.",
  "result2Title": "You",
  "result2Sub": "Somewhere on page two.",
  "closing": "Let’s make sure your name comes up first."
}
```

## tasks-story
Type : video (9s) · format 1080×1920
```json
{
  "headline": "Things a computer could do for you",
  "tasks": [
    "Answering “open on Sunday?”",
    "Copying emails into Excel",
    "Chasing quotes and reminders",
    "Rebooking the same client"
  ],
  "closing": "You get your time back.",
  "sub": "AI consulting · unixcreativestudio.com"
}
```

## quiz-story
Type : video (9s) · format 1080×1920
```json
{
  "headline": "Not sure where to start?",
  "sub": "That’s okay, most people aren’t.",
  "label": "Quiz",
  "questions": [
    {
      "q": "Do you have a website?",
      "options": [
        "Not yet",
        "Yes, but I don’t love it",
        "Yes, and I love it"
      ],
      "pick": 1
    },
    {
      "q": "What would help you most?",
      "options": [
        "More time, less busywork",
        "New clients",
        "An app for my clients"
      ],
      "pick": 1
    },
    {
      "q": "When would you like to start?",
      "options": [
        "As soon as possible",
        "In 1–2 months",
        "No rush"
      ],
      "pick": 0
    }
  ],
  "cta": "Take it on unixcreativestudio.com",
  "note": "No call needed."
}
```

## marquee-reel
Type : video (12s) · format 1080×1920
```json
{
  "words": [
    "Bloom your business",
    "Get found",
    "Get clients",
    "Save time",
    "Stress less"
  ],
  "tagline": "Websites · AI · Apps"
}
```

## signs-carousel
Type : carousel · format 1080×1350
```json
{
  "cover": {
    "title": "3 signs your website is losing you clients",
    "sub": "And how to fix each one.",
    "swipe": "Swipe"
  },
  "section": "Website check",
  "items": [
    {
      "title": "It’s hard to use on a phone.",
      "body": "Most people look you up on their phone. If they need to zoom in to read your prices, they leave.",
      "fix": "The fix: design for the phone first"
    },
    {
      "title": "Nobody can find it.",
      "body": "When someone searches for what you do on Google or asks ChatGPT, your name should come up. If it doesn’t, they pick someone else.",
      "fix": "The fix: say clearly what you do and where"
    },
    {
      "title": "There’s no clear next step.",
      "body": "In a few seconds, visitors should know how to book, call or ask for a price. One clear button beats ten links.",
      "fix": "The fix: one obvious button on every page"
    }
  ],
  "cta": {
    "title": "Recognised one?",
    "body": "We fix that. Clear prices, no tech talk, no stress.",
    "button": "unixcreativestudio.com",
    "note": "Not sure? Take the 3-question quiz. No call needed."
  }
}
```

## before-after-carousel
Type : carousel · format 1080×1350
```json
{
  "cover": {
    "tag": "AI consulting",
    "title": "What can AI do for a small business?",
    "sub": "Three real examples. No robots, no tech talk.",
    "swipe": "Swipe"
  },
  "labels": {
    "item": "Example",
    "before": "Before",
    "after": "After"
  },
  "items": [
    {
      "before": "Answering the same questions all day.",
      "after": "An assistant on your website answers them, day and night, in your words."
    },
    {
      "before": "Writing every quote by hand.",
      "after": "Your client fills in a short form. The quote is ready for you to check and send."
    },
    {
      "before": "Copying info from emails into a spreadsheet.",
      "after": "The spreadsheet fills itself in. You just take a look."
    }
  ],
  "cta": {
    "title": "Start with one task.",
    "body": "We find your biggest time-waster and build the AI system that takes it off your plate.",
    "button": "unixcreativestudio.com",
    "note": "You don’t need to know anything about AI."
  }
}
```

## review-post
Type : image · format 1080×1350
```json
{
  "label": "What our client says",
  "quote": "Best designer in town, good job, good person, always listening. Thanks to Unix we have a lot more views from all over.",
  "author": "InessCoach",
  "role": "Founder · Football mental coaching",
  "footer": "unixcreativestudio.com"
}
```

## list-linkedin
Type : image · format 1080×1080
```json
{
  "kicker": "Our work",
  "title": "Businesses we’ve helped grow",
  "items": [
    {
      "name": "Brussels Summit Academy",
      "label": "Football academy"
    },
    {
      "name": "Shiynelly Lashes",
      "label": "Lash studio"
    },
    {
      "name": "Entraide Bruxelles",
      "label": "Non-profit"
    },
    {
      "name": "Yaniswash",
      "label": "Carwash"
    },
    {
      "name": "InessCoach",
      "label": "Football mental coaching"
    }
  ]
}
```

## cards-linkedin
Type : image · format 1080×1080
```json
{
  "title": "You run it.\nWe help it grow.",
  "cards": [
    {
      "title": "Web design & development",
      "body": "So people find you, and choose you."
    },
    {
      "title": "AI consulting",
      "body": "So the boring tasks stop being yours."
    },
    {
      "title": "Mobile app",
      "body": "So your clients come back to you, not someone else."
    }
  ],
  "footer": "Clear prices · No tech talk · No stress"
}
```

# Vidéos sans visage (nouvelles)

Les templates avec `url` filment le vrai site tout seul (scroll sur téléphone). `broll-text` utilise tes clips de `assets/broll`.
Champs « style » : `box` (texte dans des cases blanches, comme l'outil texte de TikTok) ou `plain` (texte blanc avec contour).
Champs « position » : `top`, `center`, `bottom`.

## client-showcase
Type : video (15s) · format 1080×1920
```json
{
  "url": "https://yaniswash.be",
  "business": "Yaniswash",
  "sector": "Carwash · Brussels",
  "hook": "This carwash had no website.",
  "before": "People called all day just to ask the price.",
  "after": "Now the prices are online. One button to book.",
  "closing": "Small business, big bloom."
}
```

## site-review
Type : video (15s) · format 1080×1920
```json
{
  "url": "https://unixcreativestudio.com/en",
  "hook": "This website says it all in 4 seconds.",
  "points": [
    "One clear sentence on top",
    "Soft colours, one style",
    "Prices and next step, no hunting"
  ],
  "credit": "Example site · credit the studio that made it",
  "closing": "Good ideas work for small businesses too."
}
```

## site-fix
Type : video (16s) · format 1080×1920
```json
{
  "url": "https://yaniswash.be",
  "hook": "You sent us your website. 3 small fixes.",
  "site": "yaniswash.be",
  "fixes": [
    {
      "title": "Prices higher up",
      "body": "Most people scroll for the price. Show it in the first screen."
    },
    {
      "title": "One button, always visible",
      "body": "“Book a wash” should follow you down the page."
    },
    {
      "title": "Say where you work",
      "body": "Add “Brussels and around” so Google and ChatGPT know."
    }
  ],
  "closing": "Want yours checked? Send it on our website."
}
```

## explainer-reel
Type : video (13s) · format 1080×1920
```json
{
  "term": "SEO",
  "object": "🥐",
  "hook": "SEO explained with a croissant.",
  "lines": [
    "You’re the best bakery in town… in a back street.",
    "SEO is the sign on the main street: croissants this way.",
    "Say what you do, where you are, and load fast on a phone."
  ],
  "closing": "No tech talk. That’s the whole thing."
}
```

## ai-demo
Type : video (14s) · format 1080×1920
```json
{
  "hook": "Hairdressers: stop answering “open on Sunday?”",
  "business": "Your salon",
  "messages": [
    {
      "from": "client",
      "text": "Hi! Are you open on Sunday?"
    },
    {
      "from": "ai",
      "text": "Hi! We’re closed on Sundays, but Saturday at 10:00 is free. Shall I book it?"
    },
    {
      "from": "client",
      "text": "Yes please!"
    },
    {
      "from": "ai",
      "text": "Done ✓ See you Saturday at 10:00."
    }
  ],
  "label": "Demo · an AI assistant on your website",
  "closing": "You get your Sundays back."
}
```

## price-breakdown
Type : video (13s) · format 1080×1920
```json
{
  "hook": "What’s really inside a website price?",
  "title": "A website for a small business",
  "items": [
    {
      "label": "A plan for what your clients need",
      "price": ""
    },
    {
      "label": "Design that looks like you",
      "price": ""
    },
    {
      "label": "Words that say what you do",
      "price": ""
    },
    {
      "label": "Built to load fast on a phone",
      "price": ""
    },
    {
      "label": "Found on Google and ChatGPT",
      "price": ""
    }
  ],
  "total": "Fixed price, in writing, within 48 hours",
  "closing": "Clear prices. No surprises."
}
```

## founder-diary
Type : video (15s) · format 1080×1920
```json
{
  "day": "Day 1",
  "url": "https://unixcreativestudio.com/en",
  "lines": [
    "I just graduated. Today I’m starting a design studio in Brussels.",
    "No investors. One laptop. One idea:",
    "help small businesses get found, without the tech talk.",
    "I’ll share everything here: the wins, the mistakes, the numbers."
  ],
  "sign": "Building Unix",
  "closing": "Follow along. Day by day."
}
```

## broll-text
Type : video (9s) · format 1080×1920
```json
{
  "clips": [
    "sample-desk.mp4",
    "sample-scroll.mp4"
  ],
  "lines": [
    "pov: you finally have a website that brings clients",
    "not a fancy one.",
    "just clear prices, one button and your name on google",
    "that’s literally it 🌸"
  ],
  "style": "box",
  "position": "center"
}
```

## screen-native
Type : video (10s) · format 1080×1920
```json
{
  "url": "https://yaniswash.be",
  "lines": [
    "we made a website for a carwash in brussels",
    "prices right there. no calling to ask.",
    "one button to book",
    "small business, big bloom 🌸"
  ],
  "style": "box",
  "position": "top"
}
```

## Règles d'écriture (pour toi et pour l'agent)
- Anglais par défaut, phrases courtes, zéro jargon tech, ton calme avec une pointe d'humour.
- Stories : titre ≤ 7 mots ; tâches (tasks-story) ≤ 30 caractères chacune, 3 à 5 tâches ; requête (search-story) ≤ 22 caractères.
- Carrousels : 3 à 5 items ; titre d'item ≤ 35 caractères ; texte ≤ 140 caractères.
- review-post : uniquement de vrais avis clients, jamais inventés.
- list-linkedin : 3 à 6 lignes ; cards-linkedin : exactement 3 cartes.
- Pas de chiffres ou statistiques inventés.
- Vidéos organiques (`broll-text`, `screen-native`) : texte style TikTok du moment, en minuscules, phrases très courtes (≤ 60 caractères par ligne), 3 à 5 lignes, 1 emoji maximum (🌸 de préférence). Formats qui marchent : « pov: … », « things nobody tells you about … », « small business owners when … », « day 12 of building a studio ». Toujours le ton Unix : calme, gentil, zéro jargon, zéro hype, pas de « link in bio NOW ».
- `client-showcase` : uniquement des clients de la base Clientes avec « Permiso para mostrar » coché. Rien d'inventé.
- `site-fix` : uniquement des sites envoyés par leur propriétaire.
- `site-review` : toujours créditer le studio qui a fait le site.
- `price-breakdown` : pas de prix sauf les vrais prix Unix donnés par Laura.
- `founder-diary` : uniquement des notes de la base Diario.
- `ai-demo` : toujours marqué « Demo ».
