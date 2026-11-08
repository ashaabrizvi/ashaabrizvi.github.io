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
    var target = +n.dataset.count, suf = n.dataset.suffix || '', pre = n.dataset.prefix || '';
    if (reduce) { n.textContent = pre + target + suf; return; }
    var t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / 1200);
      n.textContent = pre + Math.round(target * (1 - Math.pow(1 - p, 3))) + suf;
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
    { id: 'Automate', ic: '01', sub: 'Cortex Code', title: 'Automate',
      text: 'Turning 10+ recurring monthly deliveries into reusable, AI-assisted runs.',
      points: ['Delivery workflows automated with Snowflake Cortex Code, with phased runs, checkpoints and resumability', 'Each month\'s SQL workflows generated from reusable templates', 'Turnaround cut by ~60%, with every AI-run step reviewed and approved by me'],
      tags: ['Snowflake Cortex Code', 'SQL', 'Workflow automation', 'GenAI'] },
    { id: 'Optimize', ic: '02', sub: 'SQL, cost', title: 'Optimize',
      text: 'Making the workflows leaner and cheaper to run.',
      points: ['Reviewed SQL workflows and stored procedures, removing redundant operations, repeated table rewrites and unnecessary steps', 'Analyzed query performance and warehouse utilization to improve execution efficiency and compute consumption', 'Reduced processing time and operational cost through workflow simplification and resource optimization'],
      tags: ['Snowflake', 'SQL', 'Process optimization'] },
    { id: 'Validate', ic: '03', sub: 'QC checks', title: 'Validate',
      text: 'A 3-layer QC framework that runs every cycle, before anything reaches a client.',
      points: ['L1 structural: schema drift, column types, row counts vs the prior cycle', 'L2 integrity: nulls, duplicates, key uniqueness, distinct-value shifts', 'L3 business reasonableness: KPI variance vs prior week or month, segment coverage, outliers vs trend', 'Results saved as JSON summaries and compared across cycles'],
      tags: ['Data quality', 'SQL', 'Python', 'PySpark'] },
    { id: 'Investigate', ic: '04', sub: 'KPIs', title: 'Investigate',
      text: 'Finding out why a business metric moved.',
      points: ['Analyzed KPIs such as sales, orders and customer activity across customer segments, fulfilment types and basket sizes', 'Reconciled multiple data sources to tell genuine business trends from data-capture inconsistencies', 'Weekly and monthly comparisons to surface emerging trends, anomalies and the drivers of performance'],
      tags: ['KPI analysis', 'Root-cause analysis', 'Business analytics', 'SQL'] },
    { id: 'Deliver', ic: '05', sub: 'Insights', title: 'Deliver',
      text: 'Turning findings into something clients can act on.',
      points: ['Concise, client-ready weekly and monthly performance summaries', 'Executive updates and presentation storylines covering key trends, performance drivers and recommendations', 'Clear, structured, business-oriented communication that supports data-driven discussions'],
      tags: ['Stakeholder communication', 'Executive updates', 'Recommendations'] }
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
    ['Python', 'Language', 'Languages'], ['SQL', 'Language', 'Languages'], ['PySpark', 'Distributed processing', 'Languages'], ['Oracle PL/SQL', 'Stored procedures', 'Languages'],
    ['Snowflake', 'Including Cortex Code', 'Platforms'], ['Databricks', 'Lakehouse', 'Platforms'], ['AWS', 'S3, Redshift', 'Platforms'],
    ['Data quality', 'Layered QC checks', 'Practices'], ['Business analytics', 'KPI and root-cause analysis', 'Practices'], ['GenAI / LLM integrations', 'AI-assisted automation', 'Practices']
  ];
  var CATS = ['All', 'Languages', 'Platforms', 'Practices'];
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

  /* reading explorer */
  var rToggle = $('#rToggle'), rAll = $('#rAll'), rLabel = rToggle.textContent;
  rToggle.addEventListener('click', function () {
    var show = rAll.hidden;
    rAll.hidden = !show;
    rToggle.setAttribute('aria-expanded', String(show));
    rToggle.textContent = show ? 'Show less' : rLabel;
  });
  var BOOKS = window.BOOKS || [];
  var STATUS = [['all', 'All'], ['read', 'Read'], ['reading', 'Reading now'], ['next', 'Up next']];
  var themes = ['all'];
  BOOKS.forEach(function (b) { if (themes.indexOf(b.theme) < 0) themes.push(b.theme); });
  var st = { status: 'all', theme: 'all', q: '', sort: 'title' };

  function count(status, theme) {
    return BOOKS.filter(function (b) { return (status === 'all' || b.status === status) && (theme === 'all' || b.theme === theme); }).length;
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
      return a.title.localeCompare(b.title);
    });
    var host = $('#books'); host.textContent = '';
    list.forEach(function (b) {
      var c = el('button', 'book'); c.type = 'button'; c.dataset.status = b.status;
      c.appendChild(el('b', null, b.title));
      c.appendChild(el('span', 'by', b.author));
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

  /* hero QC card */
  // Dummy sample values only; [label, clean value, bad-refresh value or null]
  var LAYERS = [
    ['L1 structural', [['Schema drift', 'none', null], ['Column types', 'match', null], ['Rows vs prior', '+1.8%', '-37.4%']]],
    ['L2 integrity', [['New nulls', '0', null], ['Duplicates', '0', '1,284'], ['Key uniqueness', '100%', null], ['Distinct shift', 'stable', null]]],
    ['L3 business', [['KPI vs prior month', '+3.2%', '+41% swing'], ['Segment coverage', '12 / 12', null], ['Outliers vs trend', 'none', null]]]
  ];
  var qcBad = false, qcRunning = false, qcRows = $('#qcRows'), qcStatus = $('#qcStatus'), qcBtn = $('#qcBtn');
  function buildQC() {
    qcRows.textContent = '';
    return LAYERS.map(function (layer) {
      var h = el('div', 'qc-layer');
      h.appendChild(el('span', null, layer[0]));
      var ls = el('span', 'qc-lstat', 'queued');
      h.appendChild(ls);
      qcRows.appendChild(h);
      var ul = el('ul', 'qc-rows');
      var rows = layer[1].map(function (c) {
        var li = el('li', 'pending');
        var mk = el('span', 'mk', '\u00b7'), v = el('span', 'v', '\u2026');
        li.appendChild(mk); li.appendChild(el('span', 'k', c[0])); li.appendChild(v);
        ul.appendChild(li);
        return { li: li, mk: mk, v: v, c: c };
      });
      qcRows.appendChild(ul);
      return { head: h, stat: ls, rows: rows };
    });
  }
  function runQC() {
    if (qcRunning) return;
    qcRunning = true; qcBtn.disabled = true;
    var layers = buildQC(), steps = [];
    qcStatus.className = 'qc-status run'; qcStatus.textContent = 'Running checks\u2026';
    layers.forEach(function (L) {
      var failed = false;
      steps.push(function () { L.stat.textContent = 'running'; L.stat.className = 'qc-lstat run'; });
      L.rows.forEach(function (r) {
        steps.push(function () {
          var bad = qcBad && r.c[2];
          if (bad) failed = true;
          r.li.className = 'done' + (bad ? ' bad' : '');
          r.mk.textContent = bad ? '\u2715' : '\u2713';
          r.v.textContent = bad ? r.c[2] : r.c[1];
        });
      });
      steps.push(function () {
        L.stat.className = 'qc-lstat'; L.stat.textContent = failed ? 'fail' : 'pass';
        L.head.className = 'qc-layer' + (failed ? ' bad' : '');
      });
    });
    steps.push(function () {
      qcStatus.className = 'qc-status' + (qcBad ? ' held' : '');
      qcStatus.textContent = qcBad ? 'Held. 3 checks failed across L1 to L3, caught before delivery.' : 'All 3 layers passed. Cleared for delivery.';
      qcBtn.textContent = qcBad ? 'Reset to a clean refresh' : 'Simulate a bad refresh';
      qcBtn.disabled = false; qcRunning = false;
    });
    if (reduce) { steps.forEach(function (f) { f(); }); return; }
    var i = 0;
    (function next() { if (i < steps.length) { steps[i++](); setTimeout(next, 150); } })();
  }
  if (qcRows) {
    qcBtn.addEventListener('click', function () { qcBad = !qcBad; runQC(); });
    buildQC();
    qcStatus.textContent = 'Waiting to run\u2026';
    qcBtn.disabled = true;
    var qcIO = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { qcIO.disconnect(); setTimeout(runQC, reduce ? 0 : 500); }
    }, { threshold: 0.3 });
    qcIO.observe($('#qc'));
  }

  /* hero line types itself out */
  var lead = $('.hero .lead');
  if (lead && !reduce) {
    var full = lead.textContent;
    var typed = el('span', 'typed');
    typed.setAttribute('aria-hidden', 'true');
    while (lead.firstChild) typed.appendChild(lead.firstChild);
    lead.appendChild(el('span', 'sr-only', full));
    lead.appendChild(typed);
    lead.style.minHeight = lead.offsetHeight + 'px';
    var walker = document.createTreeWalker(typed, NodeFilter.SHOW_TEXT), tn = [], node;
    while ((node = walker.nextNode())) { tn.push([node, node.data]); node.data = ''; }
    var caret = el('span', 'caret');
    typed.appendChild(caret);
    var ti = 0, ci = 0;
    setTimeout(function type() {
      if (ti >= tn.length) { setTimeout(function () { caret.remove(); }, 1600); return; }
      var t = tn[ti];
      t[0].data = t[1].slice(0, ++ci);
      if (t[0].parentNode !== typed) t[0].parentNode.after(caret); else t[0].after(caret);
      if (ci >= t[1].length) { ti++; ci = 0; }
      setTimeout(type, 16);
    }, 350);
  }

  /* data packets through the architecture diagram */
  var flow = $('.arch-flow');
  if (flow && !reduce) {
    var nodes = $$('.node', flow), gateLayers = $$('.layers > span', flow), flowVisible = false;
    nodes.forEach(function (n, i) { if (i < nodes.length - 1) n.appendChild(el('span', 'pkt')); });
    new IntersectionObserver(function (es) { flowVisible = es[0].isIntersecting; }, { threshold: 0.2 }).observe(flow);
    var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
    (async function loop() {
      for (;;) {
        if (!flowVisible) { await wait(400); continue; }
        flow.classList.add('running');
        for (var k = 0; k < nodes.length; k++) {
          nodes[k].classList.add('lit');
          if (nodes[k].classList.contains('gate')) {
            for (var g = 0; g < gateLayers.length; g++) { await wait(320); gateLayers[g].classList.add('lit'); }
          }
          await wait(420);
          var p = nodes[k].querySelector('.pkt');
          if (p) { p.classList.remove('go'); void p.offsetWidth; p.classList.add('go'); await wait(520); }
          if (k < nodes.length - 1) nodes[k].classList.remove('lit');
        }
        await wait(1400);
        nodes.forEach(function (n) { n.classList.remove('lit'); });
        gateLayers.forEach(function (s) { s.classList.remove('lit'); });
        flow.classList.remove('running');
        await wait(700);
      }
    })();
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
