---
layout: post
title: "Introducing Manga Mode: A Playful Twist on My Professional Portfolio"
date: 2026-05-14
author: Riaz Raza
tags: [design, portfolio, eleventy, webdev, fun]
excerpt: "I rebuilt riazraza.me to be clean and professional by default — but now, if you're feeling playful, you can unlock a hidden Manga Mode with subtle anime-inspired accents, animated tech badges, and even a Konami code easter egg. Here's how and why."
cover: /assets/img/blog/manga-mode-hero.jpg
---

## Professional by Default. Playful by Choice.

When I redesigned **riazraza.me**, I had a clear goal: create a portfolio that feels polished, minimalist, and focused on my work in AI, SaaS, and web development. No distractions. Just clean typography, thoughtful spacing, and fast performance.

But I also have hobbies. I love manga. I geek out over game UI design. And I believe professional doesn't have to mean *personality-free*.

So I built something different: **a toggle**.

By default, you see the professional site. But if you click the 🎌 **"Manga Mode"** button in the navigation? The site subtly transforms.

## What Changes in Manga Mode?

Nothing breaks. Nothing gets loud. But if you look closely:

| Feature | Default | Manga Mode |
|---------|---------|------------|
| **Project Cards** | Clean hover lift | Tech badges "unlock" with a soft pop + glow |
| **Quotes/Testimonials** | Standard blockquote | Manga-style speech bubble with panel border |
| **Background** | Solid/gradient | Subtle 5% screentone pattern (like manga paper) |
| **Typography** | System sans-serif | Headings swap to a playful accent font |
| **Easter Egg** | None | Konami code ↑↑↓↓←→←→BA triggers a hidden animation |

> **Important**: Manga Mode is *opt-in only*. It never auto-activates. Your experience — and your client's — stays professional unless you choose otherwise.

## Why Build This?

1. **Delight without distraction**: Visitors who share my interests get a fun layer; others see a crisp portfolio.
2. **Technical showcase**: It demonstrates conditional UI, CSS variables, localStorage persistence, and performance-conscious animation — all in a real project.
3. **Personal branding**: It reflects who I am: serious about craft, but never too serious to have fun.

## How It Works (The Short Version)

- A toggle button in the nav adds `?theme=manga` to the URL and saves preference to `localStorage`.
- CSS variables scoped to `body.manga-mode` override colors, radii, and backgrounds.
- Animations use CSS `@keyframes` (no heavy libraries) and respect `prefers-reduced-motion`.
- The Konami code listener only activates when Manga Mode is ON.

```css
/* Achievement-unlock animation for tech badges */
body.manga-mode .tech-badge {
  transition: transform 0.2s ease;
}
body.manga-mode .tech-badge:hover {
  animation: unlockPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 0 12px rgba(255, 105, 180, 0.3);
}
@keyframes unlockPop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.15) translateY(-4px); }
  100% { transform: scale(1); }
}
```
