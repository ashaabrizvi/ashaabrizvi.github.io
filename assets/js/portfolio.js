(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* theme */
  $('#themeBtn').addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* reveal on scroll + scroll spy */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  $$('.reveal').forEach(function (n) { io.observe(n); });

  var links = $$('.nav-links a');
  var spy = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(function (s) { spy.observe(s); });

  /* count-up */
  $$('[data-count]').forEach(function (n) {
    var target = +n.dataset.count, suf = n.dataset.suffix || '';
    if (reduce) { n.textContent = target + suf; return; }
    var t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / 1200);
      n.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

  /* cursor spotlight */
  document.addEventListener('pointermove', function (e) {
    var c = e.target.closest && e.target.closest('.spot');
    if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });

  /* accordion */
  $$('.acc-item').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.classList.toggle('open');
      b.setAttribute('aria-expanded', String(open));
    });
  });

  /* pipeline explorer */
  var STAGES = [
    { id: 'Ingest', ic: '01', sub: 'S3, APIs', title: 'Ingest',
      text: 'Getting data in safely and reliably, at volume.',
      points: ['Pipelines in AWS handling 20 TB+ of data', 'Token-authenticated API calls into Amazon Redshift', 'Landing zones on AWS S3 built for high-volume workloads'],
      tags: ['AWS S3', 'AWS Data Pipeline', 'Redshift', 'Python'] },
    { id: 'Transform', ic: '02', sub: 'SQL, Spark', title: 'Transform',
      text: 'Turning raw data into trusted models, fast and cheap to run.',
      points: ['ETL optimization that improved query efficiency by 40%', 'Removed redundant steps and repeated table rewrites in stored-procedure SQL', 'Merged compatible steps and right-sized warehouses to cut runtime and spend'],
      tags: ['SQL', 'PySpark', 'Oracle PL/SQL', 'Process optimization'] },
    { id: 'Automate', ic: '03', sub: 'Workflows, AI', title: 'Automate',
      text: 'Making runs repeatable so a delivery starts from one prompt, not a runbook.',
      points: ['Monthly delivery runbooks turned into reusable Snowflake Cortex Code skills', 'Phased runs that can be paused, checked and resumed', 'Next month\'s SQL generated from the previous month\'s template', 'Automated ETL and maintenance with PL/SQL and batch scripts, 50% more efficient'],
      tags: ['Snowflake Cortex Code', 'Workflow automation', 'Shell', 'Docker'] },
    { id: 'Validate', ic: '04', sub: 'Quality', title: 'Validate',
      text: 'Catching problems before the client does.',
      points: ['Row count, null, distinct value and schema profiling after every run', 'Results saved as JSON summaries for traceability', 'Current vs previous refresh comparisons flag trend breaks, outliers and direction changes'],
      tags: ['Data quality', 'SQL', 'Python', 'JSON'] },
    { id: 'Deliver', ic: '05', sub: 'Serve', title: 'Deliver',
      text: 'Getting trustworthy data to the people who use it.',
      points: ['Monthly deliveries on Snowflake with every AI-run step reviewed and approved by me', 'KPI analysis and root-cause investigation when a metric moves unexpectedly', 'Client-ready summaries, executive updates and clear recommendations'],
      tags: ['Snowflake', 'Redshift', 'KPI analysis', 'Stakeholder delivery'] }
  ];
  var pipe = $('#pipe'), detail = $('#pipeDetail');
  function showStage(i) {
    $$('.stage', pipe).forEach(function (b, j) { b.setAttribute('aria-selected', String(i === j)); });
    var s = STAGES[i];
    detail.textContent = '';
    detail.appendChild(el('h3', null, s.title));
    detail.appendChild(el('p', null, s.text));
    var ul = el('ul');
    s.points.forEach(function (p) { ul.appendChild(el('li', null, p)); });
    detail.appendChild(ul);
    var tg = el('div', 'chips');
    s.tags.forEach(function (t) { tg.appendChild(el('span', null, t)); });
    detail.appendChild(tg);
  }
  STAGES.forEach(function (s, i) {
    var b = el('button', 'stage');
    b.type = 'button'; b.setAttribute('role', 'tab');
    b.appendChild(el('span', 'ic', s.ic));
    b.appendChild(el('span', null, s.id));
    b.appendChild(el('small', null, s.sub));
    b.addEventListener('click', function () { showStage(i); });
    pipe.appendChild(b);
    if (i < STAGES.length - 1) pipe.appendChild(el('span', 'link'));
  });
  showStage(0);

  /* skills */
  var SKILLS = [
    ['Snowflake', 'Warehouse', 'Warehouse'], ['Redshift', 'Warehouse', 'Warehouse'], ['Oracle 12c', 'Warehouse', 'Warehouse'], 
    ['SQL', 'Language', 'Languages'], ['Python', 'Language', 'Languages'], ['PySpark', 'Processing', 'Processing'], ['PL/SQL', 'Language', 'Languages'], ['Shell scripting', 'Language', 'Languages'],
    ['AWS Data Pipeline', 'Orchestration', 'Cloud'], ['Snowflake Cortex Code', 'AI-assisted DataOps', 'AI'], ['Workflow automation', 'DataOps', 'Automation'], ['Data quality', 'Controls', 'Automation'], ['KPI analysis', 'Analytics', 'Analytics'], ['Root-cause analysis', 'Analytics', 'Analytics'], ['Business analytics', 'Analytics', 'Analytics'], ['Process optimization', 'Efficiency', 'Processing'],
    ['AWS S3', 'Storage', 'Cloud'], ['AWS', 'Cloud', 'Cloud'], ['Docker', 'Containers', 'Cloud'],
    ['GenAI / LLM', 'Integrations', 'AI'], ['Machine Learning', 'Foundations', 'AI'], ['Pandas', 'Python data', 'Languages'], ['Streamlit', 'Data apps', 'Languages']
  ];
  var CATS = ['All', 'Warehouse', 'Processing', 'Automation', 'Cloud', 'Languages', 'AI', 'Analytics'];
  var tiles = $('#tiles'), sf = $('#skillFilters');
  SKILLS.forEach(function (s) {
    var t = el('div', 'tile'); t.dataset.cat = s[2];
    t.appendChild(el('b', null, s[0])); t.appendChild(el('span', null, s[1]));
    tiles.appendChild(t);
  });
  CATS.forEach(function (c, i) {
    var b = el('button', 'fchip', c); b.type = 'button';
    b.setAttribute('aria-pressed', String(i === 0));
    b.addEventListener('click', function () {
      $$('.fchip', sf).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      $$('.tile', tiles).forEach(function (t) { t.classList.toggle('dim', c !== 'All' && t.dataset.cat !== c); });
    });
    sf.appendChild(b);
  });

  /* certifications */
  var CERTS = [
    ['Full Stack Engineer Big Data', 'Accenture'], ['GenAI Automation Engineer', 'Accenture'],
    ['AWS Certified Cloud Practitioner', 'Amazon Web Services'], ['Big Data with PySpark', 'DataCamp'],
    ['Oracle Cloud Infrastructure Foundations 2021', 'Oracle'], ['Oracle Cloud AI Foundations 2023', 'Oracle'],
    ['Data Analysis using Python', 'IBM Cognitive Class'], ['Business Metrics for Data-Driven Companies', 'Duke University'],
    ['AI Tools Mastery Program', 'Be10x']
  ];
  var cg = $('#certGrid');
  CERTS.forEach(function (c) {
    var d = el('div', 'cert'); d.appendChild(el('b', null, c[0])); d.appendChild(el('span', null, c[1])); cg.appendChild(d);
  });

  /* reading explorer */
  var BOOKS = window.BOOKS || [];
  var STATUS = [['all', 'All'], ['read', 'Read'], ['reading', 'Reading now'], ['next', 'Up next']];
  var themes = ['all'];
  BOOKS.forEach(function (b) { if (themes.indexOf(b.theme) < 0) themes.push(b.theme); });
  var st = { status: 'all', theme: 'all', q: '', sort: 'rating' };

  function count(status, theme) {
    return BOOKS.filter(function (b) { return (status === 'all' || b.status === status) && (theme === 'all' || b.theme === theme); }).length;
  }
  function stars(r) {
    if (!r) return '';
    var f = Math.floor(r), s = '';
    for (var i = 0; i < f; i++) s += '★';
    return s + (r > f ? '½' : '');
  }
  function chipRow(host, items, key) {
    host.textContent = '';
    items.forEach(function (it) {
      var v = it[0], label = it[1];
      var b = el('button', 'fchip', label); b.type = 'button';
      b.setAttribute('aria-pressed', String(st[key] === v));
      var n = key === 'status' ? count(v, st.theme) : count(st.status, v);
      b.appendChild(el('small', null, String(n)));
      b.addEventListener('click', function () { st[key] = v; renderReading(); });
      host.appendChild(b);
    });
  }
  function renderReading() {
    chipRow($('#rStatus'), STATUS, 'status');
    chipRow($('#rTheme'), themes.map(function (t) { return [t, t === 'all' ? 'All themes' : t]; }), 'theme');
    var q = st.q.toLowerCase();
    var list = BOOKS.filter(function (b) {
      return (st.status === 'all' || b.status === st.status) && (st.theme === 'all' || b.theme === st.theme) &&
        (!q || (b.title + ' ' + b.author).toLowerCase().indexOf(q) >= 0);
    });
    list.sort(function (a, b) {
      if (st.sort === 'title') return a.title.localeCompare(b.title);
      if (st.sort === 'pages') return (b.pages || 0) - (a.pages || 0);
      return (b.rating || 0) - (a.rating || 0) || a.title.localeCompare(b.title);
    });
    var host = $('#books'); host.textContent = '';
    list.forEach(function (b) {
      var c = el('button', 'book'); c.type = 'button'; c.dataset.status = b.status;
      c.appendChild(el('b', null, b.title));
      c.appendChild(el('span', 'by', b.author));
      if (b.rating) { var s = el('div', 'stars', stars(b.rating)); s.setAttribute('aria-label', b.rating + ' out of 5'); c.appendChild(s); }
      var m = el('div', 'more');
      m.textContent = [b.theme, b.pages ? b.pages + ' pages' : null, b.status === 'read' ? 'read' : b.status === 'reading' ? 'reading now' : 'up next'].filter(Boolean).join('  ·  ');
      c.appendChild(m);
      c.addEventListener('click', function () { c.classList.toggle('open'); });
      host.appendChild(c);
    });
    $('#rEmpty').hidden = list.length > 0;
  }
  var read = BOOKS.filter(function (b) { return b.status === 'read'; });
  var pages = read.reduce(function (a, b) { return a + (b.pages || 0); }, 0);
  var rs = $('#rStats');
  [[read.length, 'books read'], [pages.toLocaleString('en-IN'), 'pages'], [count('reading', 'all'), 'reading now'], [count('next', 'all'), 'up next']].forEach(function (x) {
    var d = el('div'); d.appendChild(el('b', null, String(x[0]))); d.appendChild(el('span', null, x[1])); rs.appendChild(d);
  });
  $('#rSearch').addEventListener('input', function (e) { st.q = e.target.value.trim(); renderReading(); });
  $('#rSort').addEventListener('change', function (e) { st.sort = e.target.value; renderReading(); });
  $('#rPick').addEventListener('click', function () {
    var pool = BOOKS.filter(function (b) { return b.status === 'next'; });
    if (!pool.length) return;
    var b = pool[Math.floor(Math.random() * pool.length)];
    var out = $('#rPickOut'); out.hidden = false; out.textContent = '';
    out.appendChild(el('span', 'kicker', 'Up next, picked at random'));
    out.appendChild(el('h3', null, b.title));
    out.appendChild(el('p', 'by', b.author + (b.pages ? '  ·  ' + b.pages + ' pages' : '') + '  ·  ' + b.theme));
  });
  renderReading();

  /* hero terminal */
  var LINES = [
    ['$ ./run_delivery --phase all', 'dim'], ['\u2713 ingest      sources landed', 'ok'], ['\u2713 transform   models built', 'ok'],
    ['\u2713 validate    counts, nulls, schema', 'ok'], ['\u2713 compare     vs previous refresh', 'ok'], ['\u2713 review      approved by human', 'ok'], ['$ delivered. ready for client.', 'dim']
  ];
  var out = $('#termOut');
  if (out) {
    if (reduce) { LINES.forEach(function (l) { var d = el('div', l[1], l[0]); out.appendChild(d); }); }
    else {
      var li = 0;
      (function next() {
        if (li >= LINES.length) { setTimeout(function () { out.textContent = ''; li = 0; next(); }, 4000); return; }
        out.appendChild(el('div', LINES[li][1], LINES[li][0])); li++;
        setTimeout(next, 750);
      })();
    }
  }

  /* copy email */
  var cm = $('#copyMail');
  cm.addEventListener('click', function () {
    var done = function () { cm.textContent = 'Copied'; setTimeout(function () { cm.textContent = 'Copy email'; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(cm.dataset.mail).then(done, function () {});
    else done();
  });
  $('#yr').textContent = new Date().getFullYear();
})();
