# MAC Address Spoofing — College Project

A fully self-contained, browser-based documentation and presentation layer for a network
security project demonstrating MAC address spoofing. The live command execution runs
separately in WSL Ubuntu; this site documents the methodology, simulates the terminal
workflow interactively, and presents findings in an academic report format.

---

## Requirements

| Requirement | Details |
|---|---|
| **Host OS** | Windows 10 / 11 |
| **Browser** | Google Chrome or Microsoft Edge (any recent version) |
| **Live demo** | WSL2 with Ubuntu 22.04 LTS |
| **Terminal** | Windows Terminal (recommended) |
| **Internet** | Required only on first load (Google Fonts CDN) |

---

## How to Run (Documentation Site)

1. Open `mac-spoofing/` in File Explorer.
2. Double-click `index.html` — it opens in your default browser.
3. No build step, no server, no npm. Works offline after fonts are cached.

---

## How to Run the Live Demo (WSL Ubuntu)

Open Windows Terminal → Ubuntu profile, then run these commands exactly:

```bash
# Install required tools
sudo apt update && sudo apt install net-tools macchanger -y

# Step 1: Record original MAC
ifconfig eth0 | grep ether

# Step 2: Take interface down (required before MAC change)
sudo ip link set eth0 down

# Step 3: Change to a specific MAC address
sudo macchanger -m AA:BB:CC:11:22:33 eth0

# Step 4: Bring interface back up and verify
sudo ip link set eth0 up
ifconfig eth0 | grep ether
sudo macchanger -s eth0

# Step 5: Restore original hardware MAC
sudo macchanger -p eth0
sudo ip link set eth0 down && sudo ip link set eth0 up
sudo macchanger -s eth0
```

---

## Project Structure

```
mac-spoofing/
├── index.html          Overview, MAC anatomy, why MAC filtering fails
├── methodology.html    Tools table, lab environment, 6-step procedure
├── demo.html           Interactive terminal simulator (JS-driven)
├── results.html        Before/after comparison, security analysis, recommendation
├── report.html         Full academic report with abstract, methodology, references
├── css/
│   ├── style.css       All styles, CSS custom properties, dark/light theme
│   └── print.css       Print-specific overrides for PDF export
├── js/
│   ├── nav.js          Sidebar active-link detection, theme toggle, collapse state
│   ├── terminal.js     TerminalEngine class + all step scripts
│   └── results.js      Animated row fade-in on results page
└── README.md
```

---

## Pages

| Page | Description |
|---|---|
| **Overview** | Introduction to MAC addresses, anatomy visual, and why MAC filtering fails |
| **Methodology** | Tools used, lab environment specs, and step-by-step procedure with commands |
| **Live Demo** | Interactive terminal simulator replaying all three spoofing workflow steps |
| **Results** | Animated before/after table, security implications grid, and 802.1X recommendation |
| **Report** | Full academic-style report — abstract through references — printable as PDF |

---

## Features

- **Dark/Light theme toggle** — persists across pages via `localStorage`
- **Sidebar collapse** — state saved in `localStorage`
- **Terminal simulator** — typed animation with MAC/IP syntax coloring, live status panels,
  action log, and 4-node progress indicator
- **Print / PDF export** — click "Print / Export PDF" on the Report page; sidebar and
  navigation are hidden, print margins set to 2.5 cm
- **Zero build tooling** — pure HTML, CSS, and vanilla JS

---

## Ethical Disclaimer

This project is for **educational purposes only**. MAC address spoofing on networks you
do not own or have explicit written permission to test is illegal under the Computer Fraud
and Abuse Act (CFAA) and equivalent laws in most jurisdictions. All demonstrations in this
project were performed in a controlled WSL Ubuntu environment on a virtual network interface
with no external network impact.

---

## References

1. IEEE Std 802.11-2020 — IEEE Standard for Wireless LAN MAC and Physical Layer
2. IEEE Std 802-2014 — IEEE Standard for Local and Metropolitan Area Networks
3. RFC 826 — Ethernet Address Resolution Protocol, D. Plummer, 1982
4. RFC 5227 — IPv4 Address Conflict Detection, S. Cheshire, 2008
5. macchanger(1) Linux Manual Page — Alvaro Lopez Ortega
6. ip-link(8) Linux Manual Page — iproute2 project
7. W. Arbaugh et al., "Your 802.11 wireless network has no clothes," IEEE Wireless Communications, 2002
8. Ubuntu 22.04 LTS Documentation — Canonical Ltd., 2022
