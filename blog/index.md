---
layout: default
title: Blog — Riaz Raza
---
<style>
  .blog-hero { text-align: center; padding: 2.5rem 0 1.5rem; }
  .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0 4rem; }
  .blog-card {
    border: 1px solid #d0d7de;
    border-radius: 10px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  }
  .blog-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); border-color: #1976d2; text-decoration: none; }
  .blog-card__cover { width: 100%; height: 180px; object-fit: cover; background: #f6f8fa; }
  .blog-card__cover-placeholder { width: 100%; height: 180px; background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%); display: flex; align-items: center; justify-content: center; font-size: 3rem; }
  .blog-card__body { padding: 1.1rem 1.25rem 1.25rem; flex: 1; display: flex; flex-direction: column; }
  .blog-card__tags { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.6rem; }
  .blog-card__tag { font-size: 0.72rem; font-weight: 700; padding: 1px 7px; border-radius: 999px; background: #ddf4ff; border: 1px solid #54aeff; color: #0550ae; }
  .blog-card__title { font-size: 1rem; font-weight: 700; margin: 0 0 0.5rem; font-family: 'Gentium Book Basic', serif; line-height: 1.35; }
  .blog-card__excerpt { font-size: 0.85rem; color: #57606a; margin: 0 0 0.75rem; flex: 1; line-height: 1.5; }
  .blog-card__meta { font-size: 0.78rem; color: #57606a; }
  body.manga-mode .blog-card:hover { border-color: var(--rr-border-ink); box-shadow: 4px 4px 0 rgba(0,0,0,0.8); transform: translate(-2px,-2px); }
  body.manga-mode .blog-card__tag { background: rgba(230,0,38,0.07); border-color: var(--rr-accent-manga); color: var(--rr-accent-manga); }
</style>

<div class="container-lg px-3">
  <div class="blog-hero rr-reveal">
    <h1 class="h1" style="font-family:'Gentium Book Basic',serif;font-weight:900;">Blog</h1>
    <p class="f4 color-text-secondary" style="max-width:480px;margin:0.5rem auto 0;">
      Writing about AI research, building products, and the occasional manga tangent.
    </p>
  </div>

  <hr class="rr-divider" style="margin:1rem 0 0.5rem;">

  <div class="blog-grid">
    {% assign posts = collections.posts | reverse %}
    {% for post in posts %}
    <a href="{{ post.url }}" class="blog-card rr-reveal">
      {% if post.data.cover %}
        <img src="{{ post.data.cover }}" alt="{{ post.data.title }}" class="blog-card__cover" loading="lazy">
      {% else %}
        <div class="blog-card__cover-placeholder">✍</div>
      {% endif %}
      <div class="blog-card__body">
        {% if post.data.tags %}
        <div class="blog-card__tags">
          {% for tag in post.data.tags %}
          <span class="blog-card__tag">#{{ tag }}</span>
          {% endfor %}
        </div>
        {% endif %}
        <h2 class="blog-card__title">{{ post.data.title }}</h2>
        {% if post.data.excerpt %}
        <p class="blog-card__excerpt">{{ post.data.excerpt }}</p>
        {% endif %}
        <span class="blog-card__meta">{{ post.data.date | date: "%B %d, %Y" }}{% if post.data.author %} · {{ post.data.author }}{% endif %}</span>
      </div>
    </a>
    {% endfor %}
  </div>
</div>
