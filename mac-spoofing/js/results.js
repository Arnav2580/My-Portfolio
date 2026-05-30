(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var rows = document.querySelectorAll('.cmp-table tbody tr');
    if (!rows.length) return;

    rows.forEach(function (row, index) {
      setTimeout(function () {
        row.classList.add('anim-in');
      }, 120 * (index + 1));
    });
  });
}());
