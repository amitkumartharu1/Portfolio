# Amit Kumar Tharu — Networking & Cybersecurity Portfolio

A responsive, dark-first personal portfolio built with plain HTML, CSS, and JavaScript. It uses no build step and no application backend. The interactive network topology and email indicator explorer are local educational simulations; they do not capture traffic or contact remote systems.

## Run locally

1. Extract the project folder.
2. Open `index.html` in a modern browser, or serve the folder locally for the best experience.

Python local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Included files

- `index.html` — semantic page structure, project content, networking lab, and security demo.
- `styles.css` — responsive design system, dark/light themes, project illustrations, and reduced-motion handling.
- `script.js` — theme switch, navigation, filtering/search, project detail dialogs, device inspector, deterministic network simulation, and local email indicator demo.
- `assets/amit-kumar-tharu.jpg` — supplied profile photograph.
- `assets/Amit-Kumar-Tharu-CV.pdf` — supplied CV.
- `assets/ak-logo.png` and related logo/reference assets — supplied brand assets.
- `AUDIT-AND-DEPLOYMENT.md` — repository audit notes, verification boundaries, and deployment steps.

## Functional features

- Responsive navigation and project gallery.
- Project search and category filters.
- Project detail dialogs with documented scope, limitations, and next steps.
- Dark-first theme with optional light theme; preference is saved when browser storage is available.
- Interactive hero topology and device inspection.
- Deterministic network scenarios: HTTPS, DNS, congestion, link failure, firewall filtering, and healthy network.
- Local email-indicator demo using fictional sample data.
- CV download links.
- Reduced-motion support and WebGL-independent visual fallback (the topology uses SVG/CSS rather than a WebGL renderer).

## Important accuracy and security notes

- No contact form is included because a real submission backend has not been configured.
- No external API keys or secrets are required.
- All topology IPs, latency values, device details, event logs, and packet states are illustrative.
- The email sample analysis is a simple demonstration rule set, not a production phishing classifier.
- Repository descriptions are not treated as proof of production readiness. See the audit report.
- The supplied CV is included as provided; review its contents and contact details before publishing.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, import the repository.
3. Choose **Other** / static site if prompted. No build command is needed; leave the output directory at the project root.
4. Deploy and check the generated URL on desktop and mobile.

## Deploy to Cloudflare Pages

1. Push this folder to a GitHub repository.
2. In Cloudflare Dashboard, open **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository.
4. Use no build command and set the build output directory to `/` (the repository root).
5. Deploy, then verify the live URL, asset paths, CV download, project links, theme toggle, and lab controls.

No deployment has been performed by this package generation. Run browser checks on the final hosted URL before treating the site as production-verified.


## Experience content

The experience timeline includes the supplied IT Support Intern role at InfraSoft Solutions Pvt. Ltd., Kathmandu (24 July 2024–10 November 2024), alongside the Computer Science teaching role. Internship responsibilities are phrased conservatively from the details provided: troubleshooting support, staff technical assistance, software setup, and basic network tasks. No unsupported performance metrics or certifications have been added.
