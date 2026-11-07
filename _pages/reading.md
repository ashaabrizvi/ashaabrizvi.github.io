---
title: 'Reading List'
layout: single
permalink: /readinglist/
author_profile: true
excerpt: 'Books that shaped how I think, work and build. Updated from my personal reading tracker.'
---
{% assign books = site.data.books %}
{% assign read = books | where: "status", "read" %}
{% assign reading = books | where: "status", "reading" %}
{% assign next = books | where: "status", "next" %}
{% assign pages = 0 %}
{% for b in read %}{% assign pages = pages | plus: b.pages %}{% endfor %}

<div class="stat-row">
  <div class="stat"><strong>{{ read.size }}</strong><span>books read</span></div>
  <div class="stat"><strong>{{ pages }}</strong><span>pages (where known)</span></div>
  <div class="stat"><strong>{{ reading.size }}</strong><span>reading now</span></div>
  <div class="stat"><strong>{{ next.size }}</strong><span>up next</span></div>
</div>

## Reading now

<div class="book-grid">
{% for b in reading %}
  <div class="book-card book-card--now">
    <strong>{{ b.title }}</strong>
    <span>{{ b.author }}</span>
    <em class="book-theme">{{ b.theme }}</em>
  </div>
{% endfor %}
</div>

## Read

<div class="book-grid">
{% for b in read %}
  <div class="book-card">
    <strong>{{ b.title }}</strong>
    <span>{{ b.author }}</span>
    <em class="book-theme">{{ b.theme }}</em>
    {% if b.rating %}<span class="book-stars" aria-label="{{ b.rating }} out of 5">{% assign full = b.rating | floor %}{% for i in (1..full) %}★{% endfor %}{% if b.rating > full %}½{% endif %}</span>{% endif %}
  </div>
{% endfor %}
</div>

## Up next

<div class="book-grid">
{% for b in next %}
  <div class="book-card book-card--next">
    <strong>{{ b.title }}</strong>
    <span>{{ b.author }}</span>
    <em class="book-theme">{{ b.theme }}</em>
  </div>
{% endfor %}
</div>
