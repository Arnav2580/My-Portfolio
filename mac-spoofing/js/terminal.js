(function () {
  'use strict';

  // ── Script definitions ───────────────────────────────────────────────────────
  var SCRIPTS = {
    step1: [
      { text: '# Step 1: Check current MAC address before any changes', type: 'comment', delay: 0 },
      { text: 'sudo macchanger -s eth0', type: 'prompt+cmd', delay: 600 },
      { text: 'Current MAC:   xx:xx:xx:xx:xx:xx (Unknown: not found in database)', type: 'output', delay: 350 },
      { text: 'Permanent MAC: xx:xx:xx:xx:xx:xx (Unknown: not found in database)', type: 'output', delay: 120 },
      { text: '', type: 'output', delay: 120 },
      { text: 'ifconfig eth0 | grep ether', type: 'prompt+cmd', delay: 550 },
      { text: '  ether 52:6c:1e:3b:8a:4f  txqueuelen 1000  (Ethernet)', type: 'output', delay: 350 },
      { text: '[✓] Original MAC recorded. Interface is active and visible on network.', type: 'success', delay: 250 }
    ],
    step2: [
      { text: '# Step 2: Spoof MAC to clone an authorized device', type: 'comment', delay: 0 },
      { text: 'sudo ip link set eth0 down', type: 'prompt+cmd', delay: 600 },
      { text: '', type: 'output', delay: 250 },
      { text: 'sudo macchanger -m aa:bb:cc:11:22:33 eth0', type: 'prompt+cmd', delay: 550 },
      { text: 'Current MAC:   52:6c:1e:3b:8a:4f (Unknown)', type: 'output', delay: 350 },
      { text: 'Faked MAC:     aa:bb:cc:11:22:33 (Intel Corporate)', type: 'output', delay: 120 },
      { text: '', type: 'output', delay: 120 },
      { text: 'sudo ip link set eth0 up', type: 'prompt+cmd', delay: 550 },
      { text: '', type: 'output', delay: 250 },
      { text: 'ifconfig eth0 | grep ether', type: 'prompt+cmd', delay: 450 },
      { text: '  ether aa:bb:cc:11:22:33  txqueuelen 1000  (Ethernet)', type: 'output', delay: 350 },
      { text: '[✓] MAC successfully changed. Kernel now reports AA:BB:CC:11:22:33.', type: 'success', delay: 220 },
      { text: '[✓] To a MAC-filtered router, this device now appears as an Intel device.', type: 'success', delay: 120 }
    ],
    step3: [
      { text: '# Step 3: Confirm spoofed MAC, then restore original', type: 'comment', delay: 0 },
      { text: 'sudo macchanger -s eth0', type: 'prompt+cmd', delay: 600 },
      { text: 'Current MAC:   aa:bb:cc:11:22:33 (Intel Corporate)', type: 'output', delay: 350 },
      { text: 'Permanent MAC: 52:6c:1e:3b:8a:4f (Unknown)', type: 'output', delay: 120 },
      { text: '', type: 'output', delay: 120 },
      { text: '# Note: Permanent MAC is preserved in hardware — only software MAC changed', type: 'comment', delay: 300 },
      { text: '# Now restoring original MAC', type: 'comment', delay: 150 },
      { text: 'sudo macchanger -p eth0', type: 'prompt+cmd', delay: 600 },
      { text: 'Current MAC:   aa:bb:cc:11:22:33 (Intel Corporate)', type: 'output', delay: 350 },
      { text: 'Permanent MAC: 52:6c:1e:3b:8a:4f (Unknown)', type: 'output', delay: 120 },
      { text: 'New MAC:       52:6c:1e:3b:8a:4f (Unknown)', type: 'output', delay: 120 },
      { text: 'sudo ip link set eth0 down && sudo ip link set eth0 up', type: 'prompt+cmd', delay: 600 },
      { text: 'sudo macchanger -s eth0', type: 'prompt+cmd', delay: 450 },
      { text: 'Current MAC:   52:6c:1e:3b:8a:4f (Unknown)', type: 'output', delay: 350 },
      { text: 'Permanent MAC: 52:6c:1e:3b:8a:4f (Unknown)', type: 'output', delay: 120 },
      { text: '[✓] Original MAC restored. Hardware address matches permanent MAC.', type: 'success', delay: 250 }
    ]
  };

  // ── MAC / IP regex ────────────────────────────────────────────────────────────
  var MAC_RE = /([0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2})/g;
  var IP_RE  = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?:\/\d+)?)/g;

  // ── TerminalEngine ────────────────────────────────────────────────────────────
  function TerminalEngine(outputEl, cursorEl) {
    this.outputEl  = outputEl;
    this.cursorEl  = cursorEl;
    this.timeouts  = [];
    this.running   = false;
  }

  TerminalEngine.prototype.run = function (scriptName) {
    var self   = this;
    var script = SCRIPTS[scriptName];
    if (!script) return;

    this._clear();
    this.running = true;

    var accumulated = 0;
    script.forEach(function (lineObj, idx) {
      accumulated += (idx === 0 ? 0 : (lineObj.delay || 180));
      var delay = accumulated;
      var tid = setTimeout(function () {
        self._appendLine(lineObj);
      }, delay);
      self.timeouts.push(tid);
    });

    // After all lines rendered, update panels
    var step = parseInt(scriptName.replace('step', ''), 10);
    var finalTid = setTimeout(function () {
      self.running = false;
      self._updatePanels(step);
    }, accumulated + 150);
    this.timeouts.push(finalTid);
  };

  TerminalEngine.prototype._clear = function () {
    this.timeouts.forEach(function (id) { clearTimeout(id); });
    this.timeouts = [];
    // Remove all children except cursor
    while (this.outputEl.firstChild) {
      this.outputEl.removeChild(this.outputEl.firstChild);
    }
    if (this.cursorEl) {
      this.outputEl.appendChild(this.cursorEl);
    }
  };

  TerminalEngine.prototype._appendLine = function (lineObj) {
    var text = lineObj.text;
    var type = lineObj.type;
    var div  = document.createElement('div');
    div.className = 't-line';

    if (type === 'prompt+cmd') {
      var promptSpan = document.createElement('span');
      promptSpan.className = 't-prompt';
      promptSpan.textContent = 'user@Ubuntu:~$ ';

      var cmdSpan = document.createElement('span');
      cmdSpan.className = 't-cmd';
      cmdSpan.innerHTML = this._highlightAll(this._esc(text));

      div.appendChild(promptSpan);
      div.appendChild(cmdSpan);
    } else {
      if (type === 'comment') div.classList.add('t-comment');
      else if (type === 'success') div.classList.add('t-success');
      else if (type === 'error')   div.classList.add('t-error');
      else if (type === 'mac-line') div.classList.add('t-mac-line');
      else if (type === 'ip-line')  div.classList.add('t-ip-line');
      else div.classList.add('t-output');

      div.innerHTML = this._highlightAll(this._esc(text));
    }

    if (this.cursorEl && this.cursorEl.parentNode === this.outputEl) {
      this.outputEl.insertBefore(div, this.cursorEl);
    } else {
      this.outputEl.appendChild(div);
    }
    this._scrollBottom();
  };

  TerminalEngine.prototype._esc = function (str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  TerminalEngine.prototype._highlightMac = function (html) {
    return html.replace(MAC_RE, '<span class="mac-addr">$1</span>');
  };

  TerminalEngine.prototype._highlightIp = function (html) {
    return html.replace(IP_RE, '<span class="ip-addr">$1</span>');
  };

  TerminalEngine.prototype._highlightAll = function (html) {
    return this._highlightIp(this._highlightMac(html));
  };

  TerminalEngine.prototype._scrollBottom = function () {
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  };

  TerminalEngine.prototype._updatePanels = function (step) {
    var currentMacEl = document.getElementById('panel-current-mac');
    var vendorEl     = document.getElementById('panel-vendor');
    var spoofedEl    = document.getElementById('panel-spoofed');
    var statusEl     = document.getElementById('panel-status');

    if (step === 1) {
      // No panel change after step 1 — just progress
    } else if (step === 2) {
      if (currentMacEl) {
        currentMacEl.textContent = 'aa:bb:cc:11:22:33';
        currentMacEl.classList.add('v-spoofed');
      }
      if (vendorEl) {
        vendorEl.innerHTML = '<strong>AA:BB:CC</strong> &mdash; Intel Corporate';
        vendorEl.classList.add('v-spoofed');
      }
      if (spoofedEl) {
        spoofedEl.innerHTML = '<span class="badge badge-amber">YES</span>';
      }
      if (statusEl) {
        statusEl.innerHTML = '<span class="badge badge-green">UP</span>';
      }
    } else if (step === 3) {
      if (currentMacEl) {
        currentMacEl.textContent = '52:6c:1e:3b:8a:4f';
        currentMacEl.classList.remove('v-spoofed');
      }
      if (vendorEl) {
        vendorEl.innerHTML = '<strong>52:6C:1E</strong> &mdash; Unknown vendor';
        vendorEl.classList.remove('v-spoofed');
      }
      if (spoofedEl) {
        spoofedEl.innerHTML = '<span class="badge badge-gray">NO</span>';
      }
      if (statusEl) {
        statusEl.innerHTML = '<span class="badge badge-green">UP</span>';
      }
    }

    // Progress nodes: step 1 → node 1; step 2 → nodes 1+2; step 3 → all 4
    var markUp = step === 1 ? 1 : step === 2 ? 2 : 4;
    for (var i = 1; i <= markUp; i++) {
      var node = document.getElementById('pn-' + i);
      if (node) node.classList.add('done');
    }
  };

  TerminalEngine.prototype.appendLog = function (action, before, after, resultHtml) {
    var tbody = document.getElementById('log-body');
    if (!tbody) return;
    var time = new Date().toTimeString().slice(0, 8);
    var tr   = document.createElement('tr');

    var beforeHtml = before === '—' ? '—' : '<span class="mac-addr">' + this._esc(before) + '</span>';
    var afterHtml  = after  === '—' ? '—' : '<span class="mac-addr">' + this._esc(after)  + '</span>';

    tr.innerHTML =
      '<td>' + time      + '</td>' +
      '<td>' + this._esc(action) + '</td>' +
      '<td>' + beforeHtml + '</td>' +
      '<td>' + afterHtml  + '</td>' +
      '<td>' + resultHtml + '</td>';
    tbody.appendChild(tr);
  };

  TerminalEngine.prototype.reset = function () {
    this._clear();
    this.running = false;

    // Reset panels to initial state
    var currentMacEl = document.getElementById('panel-current-mac');
    var vendorEl     = document.getElementById('panel-vendor');
    var spoofedEl    = document.getElementById('panel-spoofed');
    var statusEl     = document.getElementById('panel-status');

    if (currentMacEl) {
      currentMacEl.textContent = '52:6c:1e:3b:8a:4f';
      currentMacEl.classList.remove('v-spoofed');
    }
    if (vendorEl) {
      vendorEl.innerHTML = '<strong>52:6C:1E</strong> &mdash; Unknown vendor';
      vendorEl.classList.remove('v-spoofed');
    }
    if (spoofedEl) spoofedEl.innerHTML = '<span class="badge badge-gray">NO</span>';
    if (statusEl)  statusEl.innerHTML  = '<span class="badge badge-green">UP</span>';

    // Reset progress nodes
    document.querySelectorAll('.p-node').forEach(function (n) {
      n.classList.remove('done');
    });

    // Clear log
    var tbody = document.getElementById('log-body');
    if (tbody) tbody.innerHTML = '';
  };

  // ── DOMContentLoaded wiring ───────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    var outputEl  = document.getElementById('terminal-output');
    var cursorEl  = document.getElementById('terminal-cursor');
    if (!outputEl) return;

    var engine = new TerminalEngine(outputEl, cursorEl);

    // Briefly show DOWN status when step 2 starts, before panels update at end
    var step2Btn = document.getElementById('btn-step2');
    if (step2Btn) {
      step2Btn.addEventListener('click', function () {
        var statusEl = document.getElementById('panel-status');
        if (statusEl) statusEl.innerHTML = '<span class="badge badge-red">DOWN</span>';
        engine.run('step2');
        engine.appendLog('Spoof MAC', '52:6c:1e:3b:8a:4f', 'aa:bb:cc:11:22:33',
          '<span style="color:var(--terminal-green)">✓ Changed</span>');
      });
    }

    var step1Btn = document.getElementById('btn-step1');
    if (step1Btn) {
      step1Btn.addEventListener('click', function () {
        engine.run('step1');
        engine.appendLog('View MAC', '—', '52:6c:1e:3b:8a:4f', 'Recorded');
      });
    }

    var step3Btn = document.getElementById('btn-step3');
    if (step3Btn) {
      step3Btn.addEventListener('click', function () {
        engine.run('step3');
        engine.appendLog('Restore', 'aa:bb:cc:11:22:33', '52:6c:1e:3b:8a:4f',
          '<span style="color:var(--terminal-green)">✓ Restored</span>');
      });
    }

    var resetBtn = document.getElementById('btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        engine.reset();
      });
    }
  });
}());
