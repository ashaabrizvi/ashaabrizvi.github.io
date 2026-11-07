---
title: 'Projects'
layout: single
permalink: /projects/
author_profile: true
excerpt: 'Selected data engineering and analytics work.'
---

<div class="project-card">
  <h3>AI-Assisted Delivery Automation</h3>
  <p><strong>Challenge:</strong> Monthly data deliveries followed long, manual, multi-step runbooks.</p>
  <p><strong>Solution:</strong> Packaged the runbooks as reusable Snowflake Cortex Code skills, with phased runs that can be paused, checked and resumed, and next month's SQL generated from the previous month's template.</p>
  <p><strong>Impact:</strong> A full delivery run now starts from a single prompt, with every output reviewed and approved by a human.</p>
  <div class="project-tech">
    <span class="skill-badge">Snowflake</span>
    <span class="skill-badge">Cortex Code</span>
    <span class="skill-badge">SQL</span>
    <span class="skill-badge">Python</span>
  </div>
</div>

<div class="project-card">
  <h3>Automated Data Quality Checks</h3>
  <p><strong>Challenge:</strong> Trend breaks and bad refreshes needed to be caught before reaching the client.</p>
  <p><strong>Solution:</strong> Post-run checks on row counts, nulls, distinct values and schema profiles, saved as JSON summaries and compared against the previous refresh to flag outliers and direction changes.</p>
  <p><strong>Impact:</strong> Issues surface during the run instead of after delivery.</p>
  <div class="project-tech">
    <span class="skill-badge">Snowflake</span>
    <span class="skill-badge">SQL</span>
    <span class="skill-badge">Python</span>
    <span class="skill-badge">Data Quality</span>
  </div>
</div>

<div class="project-card">
  <h3>Data Integration for Healthcare Vendor</h3>
  <p><strong>Challenge:</strong> Integrate and manage massive healthcare datasets in a streamlined AWS environment while keeping data secure.</p>
  <p><strong>Solution:</strong> Scalable AWS pipelines with token-based API authentication and automated ETL into Redshift.</p>
  <p><strong>Impact:</strong> Better data accessibility and integrity for critical healthcare decisions.</p>
  <div class="project-impact">20TB+ data managed &nbsp;|&nbsp; 40% query efficiency improvement</div>
  <div class="project-tech">
    <span class="skill-badge">AWS S3</span>
    <span class="skill-badge">Redshift</span>
    <span class="skill-badge">Python</span>
    <span class="skill-badge">ETL</span>
  </div>
</div>

<div class="project-card">
  <h3>Commercial Sales Data Analytics</h3>
  <p><strong>Challenge:</strong> Turn complex, multi-source sales data into insight that drives strategy.</p>
  <p><strong>Solution:</strong> Python and Power BI analysis of trends, KPIs and segment performance.</p>
  <p><strong>Impact:</strong> Targeted insights that informed strategy changes.</p>
  <div class="project-impact">15% increase in sales through data-driven targeting</div>
  <div class="project-tech">
    <span class="skill-badge">Power BI</span>
    <span class="skill-badge">Python</span>
    <span class="skill-badge">Pandas</span>
  </div>
</div>

<div class="project-card">
  <h3>Covid-19 Dashboard</h3>
  <p>A live Streamlit dashboard on Johns Hopkins CSSE data. <a href="{{ site.baseurl }}/blog/">See the write-up on the blog</a>.</p>
  <div class="project-tech">
    <span class="skill-badge">Streamlit</span>
    <span class="skill-badge">Plotly</span>
    <span class="skill-badge">Pandas</span>
  </div>
</div>
