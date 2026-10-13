# Audit, Implementation & Deployment Report

## 1. Scope and method

The supplied master prompt requested a first-step audit of the existing portfolio and five project repositories. The current project workspace contained an earlier static portfolio ZIP with HTML, CSS, JavaScript, the AK logo, the supplied profile photograph, CV, and a design reference. I reused that asset set and replaced the page structure/styles/behavior with a larger static implementation. I did not modify the remote GitHub repositories.

Repository review used the public GitHub repository pages and visible README/file listings available during this build. This was a documentation and repository-structure audit, not a full source-code security review or execution of every project. If a repository page could not be read, that limitation is called out rather than filled with assumptions.

## 2. Repository audit

| Repository | Visible language/framework evidence | Verified/documented scope | Status and limits |
|---|---|---|---|
| [Portfolio](https://github.com/amitkumartharu1/Portfolio) | Public repository; visible root lists a nested `amit-kumar-tharu-portfolio` directory and `README.md`; associated Vercel URL is listed | Existing portfolio repository and Vercel URL were discoverable | The GitHub page exposed only a limited root listing in this pass; nested source files could not be fully inspected through the available page extraction. This new bundle is a separate static implementation, not a remote commit or deployment. |
| [Intelligent Email Phishing Detection Gateway](https://github.com/amitkumartharu1/Intelligent-Email-Phishing-Detection-Gateway-) | Repository page could not be fully fetched during this pass | Project intent supplied by the owner: email analysis, suspicious sender/URL indicators, classification/reporting | Source-level implementation, dependencies, authentication checks, accuracy, dataset, and email-server integration remain unverified. The portfolio marks it academic/development and links the repository. |
| [Hybrid Network Threat Intelligence and Traffic Analysis Platform](https://github.com/amitkumartharu1/Hybrid-Network-Threat-Intelligence-and-Traffic-Analysis-Platform) | README lists Python, Flask, Flask-SQLAlchemy, Flask-Login, Scapy, pandas, scikit-learn, joblib, requests, and related packages. Visible root includes `app.py`, `config.py`, `run.py`, `seed_data.py`, `requirements.txt`, and README | README describes a mini-SOC workflow for traffic capture, flow building, rule/IOC detection, an Isolation Forest anomaly workflow, alerts/investigation, and PDF/CSV reports | These are README-documented capabilities; no independent execution or code-level validation was performed. README includes default `admin / admin123` credentials; change them before any deployment/use. Packet capture must be limited to authorised networks. |
| [Smart Blind Glass](https://github.com/amitkumartharu1/smart-blind-glass) | Public repository with `Arduino Code`, `README.md`, and `Testing complete` entries | README describes an assistive wearable concept and lists sensor/alert-related intended features | Actual sketch, circuit, and testing evidence were not fully inspected. Sensor configuration, operating range, and accessibility outcomes are not independently verified. |
| [NexCart](https://github.com/amitkumartharu1/NexCart) | Visible Next.js starter repository structure includes `app`, `components`, `lib`, `prisma`, TypeScript/configuration files, and authentication-related files | Repository is public; visible README remains the default create-next-app guide | Product catalogue, cart, checkout, payment, and production readiness were not verified. Do not advertise payment processing or working checkout until source and runtime are tested. |
| [Product Wholesale System](https://github.com/amitkumartharu1/Product-Wholesale-System) | Visible files include `main.py`, `operation.py`, `read.py`, `write.py`, `products.txt`, and README; README identifies Python | README describes a console-based wholesale inventory workflow, purchase/return handling, Buy 3 Get 1 Free, invoices, and file-based transaction logs | The README has a stale example command/repository URL and references a different filename in the run instructions. Reconcile docs and actual entrypoint before presenting installation steps as verified. No automated tests were run. |

### Repository-derived portfolio decisions

- The networking platform gets a technical card that attributes its capability list to the repository README rather than claiming an independent audit.
- NexCart is presented as a starter repository with feature completeness still to verify.
- Product Wholesale System is described according to its README's console-based Python scope.
- Smart Blind Glass is presented as an assistive-technology college project without promising specific accessibility outcomes.
- The email phishing project is linked but marked academic/development because source inspection was unavailable.
- Sajilo Web is intentionally excluded, per the master prompt.

## 3. Implementation completed in this bundle

- Responsive, dark-first portfolio with optional light theme.
- Profile photo, AK logo, and supplied CV integrated.
- About, projects, skills, education, teaching context, contact links, and project detail dialogs.
- Added the IT Support Intern experience at InfraSoft Solutions Pvt. Ltd. (Kathmandu, 24 July–10 November 2024) using the responsibilities supplied by the owner; no metrics or extra duties were invented.
- Searchable project gallery with category filters.
- Interactive SVG/CSS network topology with selectable device details.
- Deterministic local scenarios: HTTPS request, DNS lookup, congestion, link failure, firewall filtering, and healthy network.
- Local-only fictional email-indicator explorer.
- Responsive navigation, visible keyboard focus, skip link, reduced-motion behavior, and theme preference persistence where browser storage is available.
- Setup instructions and deployment guide.

## 4. Design and architecture choices

The deliverable remains a no-build static website to keep setup simple and hosting compatible with Vercel or Cloudflare Pages. The network scene is an SVG/CSS topology with animated packet markers, not a Three.js/WebGL scene. This avoids a mandatory 3D runtime and ensures the main interaction remains available without WebGL; it is an intentional lightweight interpretation of the cinematic networking direction, not a claim of physically based 3D rendering.

The network simulation has a central scenario model, node/device data, edge state, and packet traversal along SVG path geometry. Its values and events are illustrative only. The email explorer runs local demonstration rules over fictional sample data; it is not connected to an email server or production detection engine.

## 5. Verification performed

- `node --check script.js` — passed.
- Python HTML parser — passed; no duplicate IDs or broken in-page anchors found.
- CSS parser — passed with no parse errors.
- All local `src` / `href` assets — present.
- Required local assets (profile photo, CV, logo) — present.
- Browser rendering and interaction testing — attempted, but the available headless browser environment blocked navigation; therefore these checks remain unverified.
- Archive integrity — checked after packaging.
- Cross-device visual review — pending.
- Live deployment — not performed.

The checks above do not establish production readiness or absence of all defects.

## 6. Remaining work before public release

1. Review the CV content, dates, email, and contact details before publication.
2. Fully inspect each project source repository and replace any unverified project status with test evidence.
3. Verify the phishing gateway implementation and add documented test samples/results.
4. Review the network platform's authentication and change the default credentials before use; do not expose a packet-capture service publicly without a security review.
5. Verify NexCart user flows and database/authentication behavior before claiming e-commerce features.
6. Test the static portfolio in current Chrome, Firefox, Safari, and mobile viewport sizes.
7. Confirm all live links, download behavior, and keyboard interaction on the deployed site.
8. Add a canonical domain, sitemap, robots file, and a custom social preview image only after the production URL is known.

## 7. Deployment

### Vercel

- Import the static site repository.
- Select Other/static site.
- Build command: none.
- Output directory: repository root (`.` or `/`, depending on the dashboard field's expected syntax).
- Verify assets and `assets/Amit-Kumar-Tharu-CV.pdf` after deployment.

### Cloudflare Pages

- Connect the Git repository in Workers & Pages → Pages.
- Build command: none.
- Build output directory: `/` (root).
- Deploy and check the resulting URL, then run the release checklist above.

## 8. Public reference pages used

- https://github.com/amitkumartharu1/Portfolio
- https://github.com/amitkumartharu1/Intelligent-Email-Phishing-Detection-Gateway-
- https://github.com/amitkumartharu1/Hybrid-Network-Threat-Intelligence-and-Traffic-Analysis-Platform
- https://github.com/amitkumartharu1/smart-blind-glass
- https://github.com/amitkumartharu1/NexCart
- https://github.com/amitkumartharu1/Product-Wholesale-System
