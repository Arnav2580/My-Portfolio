(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // ── Theme ────────────────────────────────────────────────
    var savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
      });
    }

    // ── Active nav link ──────────────────────────────────────
    var pathname = window.location.pathname;
    var filename = pathname.split('/').pop();
    if (!filename || filename === '') filename = 'index.html';

    document.querySelectorAll('.nav-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === filename) {
        link.classList.add('active');
      }
    });

    // ── Sidebar collapse ─────────────────────────────────────
    var sidebar = document.getElementById('sidebar');
    var collapseBtn = document.getElementById('sidebar-toggle');

    if (sidebar && localStorage.getItem('sidebar-collapsed') === 'true') {
      sidebar.classList.add('collapsed');
    }

    if (collapseBtn && sidebar) {
      collapseBtn.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
        var isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebar-collapsed', String(isCollapsed));
        collapseBtn.textContent = isCollapsed ? '›' : '‹';
      });

      // Restore correct arrow direction on load
      if (sidebar.classList.contains('collapsed')) {
        collapseBtn.textContent = '›';
      }
    }
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var icon = document.querySelector('.theme-icon');
    var label = document.querySelector('.theme-label');
    if (icon)  icon.textContent  = theme === 'dark' ? '☀' : '☾';
    if (label) label.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  }
}());
