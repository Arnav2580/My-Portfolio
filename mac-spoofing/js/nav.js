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

    // ── Sidebar elements ─────────────────────────────────────
    var sidebar     = document.getElementById('sidebar');
    var collapseBtn = document.getElementById('sidebar-toggle');
    var overlay     = document.getElementById('sidebar-overlay');
    var hamburger   = document.getElementById('hamburger');

    // ── Desktop: restore collapsed state ────────────────────
    if (sidebar && localStorage.getItem('sidebar-collapsed') === 'true') {
      sidebar.classList.add('collapsed');
    }

    // ── Desktop collapse / Mobile close ──────────────────────
    if (collapseBtn && sidebar) {
      collapseBtn.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          closeMobileSidebar();
        } else {
          sidebar.classList.toggle('collapsed');
          var isCollapsed = sidebar.classList.contains('collapsed');
          localStorage.setItem('sidebar-collapsed', String(isCollapsed));
          collapseBtn.textContent = isCollapsed ? '›' : '‹';
        }
      });

      if (sidebar.classList.contains('collapsed')) {
        collapseBtn.textContent = '›';
      }
    }

    // ── Mobile: hamburger opens sidebar ──────────────────────
    if (hamburger && sidebar) {
      hamburger.addEventListener('click', function () {
        sidebar.classList.add('mobile-open');
        if (overlay) overlay.classList.add('active');
        if (collapseBtn) collapseBtn.textContent = '✕';
      });
    }

    // ── Mobile: overlay click closes sidebar ─────────────────
    if (overlay) {
      overlay.addEventListener('click', function () {
        closeMobileSidebar();
      });
    }

    // ── Mobile: close sidebar when nav link is tapped ────────
    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) closeMobileSidebar();
      });
    });

    function closeMobileSidebar() {
      if (sidebar) sidebar.classList.remove('mobile-open');
      if (overlay) overlay.classList.remove('active');
      if (collapseBtn) collapseBtn.textContent = '‹';
    }
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var icon  = document.querySelector('.theme-icon');
    var label = document.querySelector('.theme-label');
    if (icon)  icon.textContent  = theme === 'dark' ? '☀' : '☾';
    if (label) label.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  }
}());
