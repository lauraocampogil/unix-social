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

## Règles d'écriture (pour toi et pour l'agent)
- Anglais par défaut, phrases courtes, zéro jargon tech, ton calme avec une pointe d'humour.
- Stories : titre ≤ 7 mots ; tâches (tasks-story) ≤ 30 caractères chacune, 3 à 5 tâches ; requête (search-story) ≤ 22 caractères.
- Carrousels : 3 à 5 items ; titre d'item ≤ 35 caractères ; texte ≤ 140 caractères.
- review-post : uniquement de vrais avis clients, jamais inventés.
- list-linkedin : 3 à 6 lignes ; cards-linkedin : exactement 3 cartes.
- Pas de chiffres ou statistiques inventés.
