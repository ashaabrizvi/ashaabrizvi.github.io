# ashaabrizvi.com

Personal portfolio of Ashaab Rizvi, Associate, DataOps & Business Analytics. Live at [ashaabrizvi.com](https://ashaabrizvi.com).

## Stack

- Jekyll on GitHub Pages, served from the `main` branch with a custom domain (`CNAME`)
- One page: `index.html`, styled by `assets/css/portfolio.css`, made interactive by `assets/js/portfolio.js` (plain JavaScript, no frameworks)
- Content data in `_data/`: `books.yml` (reading list), `reading.yml` (current reads and favourites), `certs.yml` (certifications)
- Site settings in `_config.yml`: resume toggle, Kaggle link, analytics code

## Run locally

```sh
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

## Common updates

- **Resume:** add `assets/resume/Ashaab_Rizvi_Resume.pdf`, then set `resume_ready: true` in `_config.yml`
- **Certifications:** add or edit entries in `_data/certs.yml` (tier: featured, more or other)
- **Reading:** edit `_data/reading.yml`; new books go in `_data/books.yml`
