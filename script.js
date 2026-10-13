(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const body = document.body;
  const toast = $('#toast');
  let toastTimer = 0;

  const showToast = message => {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
  };

  // Theme preference: dark-first, with a resilient local-storage fallback.
  const themeToggle = $('.theme-toggle');
  const themeIcon = $('.theme-icon');
  try { if (localStorage.getItem('amit-portfolio-theme') === 'light') body.classList.add('light-theme'); } catch (_) {}
  const updateTheme = () => {
    const light = body.classList.contains('light-theme');
    themeIcon.textContent = light ? '☀' : '☾';
    themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle.title = light ? 'Switch to dark theme' : 'Switch to light theme';
  };
  updateTheme();
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme'); updateTheme();
    try { localStorage.setItem('amit-portfolio-theme', body.classList.contains('light-theme') ? 'light' : 'dark'); } catch (_) {}
  });

  // Responsive navigation.
  const menuToggle = $('.menu-toggle');
  const nav = $('#primary-nav');
  const navLinks = $$('.nav-link');
  const closeMenu = () => { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open navigation'); };
  menuToggle.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(opened));
    menuToggle.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
  });
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); closeDevicePopover(); } });

  // Progressive section reveals; content stays visible when IntersectionObserver is unavailable.
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: .08, rootMargin: '0px 0px -25px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  } else revealItems.forEach(item => item.classList.add('visible'));

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, .1, .35] });
    $$('main section[id]').forEach(section => sectionObserver.observe(section));
  }

  // Search and category filters operate over the same project collection.
  const projectCards = $$('.project-card');
  const filterButtons = $$('.filter-button');
  const projectSearch = $('#project-search');
  const noResults = $('#no-results');
  let activeFilter = 'all';
  const filterProjects = () => {
    const query = projectSearch.value.trim().toLowerCase();
    let shown = 0;
    projectCards.forEach(card => {
      const categoryMatches = activeFilter === 'all' || card.dataset.category === activeFilter;
      const queryMatches = !query || `${card.dataset.search || ''} ${card.textContent}`.toLowerCase().includes(query);
      const visible = categoryMatches && queryMatches;
      card.hidden = !visible;
      if (visible) shown++;
    });
    noResults.hidden = shown > 0;
    $('#project-total').textContent = String(shown).padStart(2, '0');
  };
  filterButtons.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    filterProjects();
  }));
  projectSearch.addEventListener('input', filterProjects);
  $('#project-total').textContent = String(projectCards.length).padStart(2, '0');

  const projectDetails = {
    phishing: { title: 'Intelligent Email Phishing Detection Gateway', overview: 'A defensive cybersecurity project focused on analysing email content and suspicious indicators. The repository URL was reachable but its file contents could not be fully inspected during this pass, so feature-level implementation is not asserted.', verified: ['Repository supplied: Intelligent-Email-Phishing-Detection-Gateway-', 'Intended scope from project context: sender and URL analysis, classification, and reporting', 'Email-server integration and detection accuracy are not claimed as verified'], next: ['Review source code and dependency configuration', 'Document the actual analysis pipeline and rules', 'Add reproducible tests and safe sample emails'] },
    threatwatch: { title: 'Hybrid Network Threat Intelligence & Traffic Analysis Platform', overview: 'The public README describes a Python/Flask mini-SOC with traffic capture, flow building, rule-based and IOC detection, an Isolation Forest anomaly workflow, alert investigation, and report exports. These are repository-documented capabilities, not an independent code audit.', verified: ['Repository contains app.py, config.py, run.py, seed_data.py, and requirements.txt', 'README lists Flask, Scapy, SQLAlchemy, pandas, scikit-learn, and related packages', 'README documents demo seeding and local execution; raw packet capture requires authorised local setup'], next: ['Rotate the README-listed default credentials before any use', 'Never capture traffic without explicit authorisation', 'Test authentication, input validation, and detection quality before deployment'] },
    ids: { title: 'Hybrid AI-Assisted Intrusion Detection System', overview: 'A final-year academic lab project exploring an AI-assisted intrusion-detection workflow. A demonstration was reported in the project context; this portfolio does not present independent validation or production readiness.', verified: ['Context: academic / virtual lab demonstration', 'Focus: network traffic and intrusion-detection concepts', 'No independently verified performance figures are published here'], next: ['Document dataset provenance and split strategy', 'Recheck the confusion matrix against the final report', 'Record limitations and reproducible experiment steps'] },
    programming: { title: 'Programming Concepts & Logics', overview: 'An interactive learning-platform concept for Class 11 NEB Computer Science and C programming. The feature list below reflects the requested project direction and should not be read as proof that every component is already implemented.', verified: ['Audience: Class 11 NEB Computer Science learners', 'Topics: C lessons, examples, quizzes, arrays, matrices, flowcharts, and binary concepts', 'English and Nepali learning resources are part of the intended scope'], next: ['Connect each lesson to an assessed learning outcome', 'Ensure code execution is sandboxed if implemented', 'Make quizzes keyboard-accessible and provide clear feedback'] },
    nexcart: { title: 'NexCart', overview: 'The public repository is a Next.js project with app, components, lib, Prisma, TypeScript, and authentication-related configuration. The visible README is still the standard create-next-app starter guide, so checkout, payments, catalog behavior, and production readiness cannot be verified from that page.', verified: ['Repository is public and contains Next.js / TypeScript configuration', 'Prisma and authentication-related files are present', 'No verified payment or order-processing claim is made'], next: ['Replace starter README with accurate setup and feature documentation', 'Inspect authentication and database migrations', 'Test cart, checkout, and administrative flows before describing them as working'] },
    wholesale: { title: 'Product Wholesale System', overview: 'The repository README describes a menu-driven Python console app for wholesale stock handling and transaction records.', verified: ['README documents product stock viewing, purchases and returns', 'A Buy 3 Get 1 Free offer and invoice output are described', 'README lists file handling, lists, dictionaries, functions, and loops'], next: ['Add automated tests for stock and return calculations', 'Handle malformed or missing data files safely', 'Consider a database and role-based access only if future requirements justify them'] },
    smartglass: { title: 'Smart Blind Glass', overview: 'The public repository contains Arduino Code, README.md, and a Testing complete folder. Its README describes an assistive wearable concept, but the implementation and evidence in those files were not fully inspected in this build.', verified: ['Public repository exists with Arduino-related files', 'Intended category: assistive technology / college project', 'Specific sensor range, alerts, and accessibility outcomes are not independently verified here'], next: ['Review the actual sketch and wiring diagram', 'Check the test evidence and documented limitations', 'Avoid describing it as a substitute for established mobility aids'] },
    results: { title: 'Student Result-View System', overview: 'A school-oriented result lookup project planned around student name and symbol number, with an administrator workflow for managing result records.', verified: ['Preferred implementation direction: HTML, CSS, and JavaScript', 'Result records and admin security require direct implementation review', 'No live student data is embedded in this portfolio'], next: ['Use access controls for administrator functions', 'Validate search input and avoid exposing private student records', 'Test marks, pass criteria, publication state, and printable results'] }
  };
  const dialog = $('#project-dialog');
  const dialogTitle = $('#dialog-title');
  const dialogBody = $('#dialog-body');
  const closeDialogButton = $('.dialog-close');
  const openProjectDetails = key => {
    const item = projectDetails[key]; if (!item) return;
    dialogTitle.textContent = item.title;
    dialogBody.replaceChildren();
    const intro = document.createElement('p'); intro.textContent = item.overview; dialogBody.appendChild(intro);
    const verifiedHeading = document.createElement('h3'); verifiedHeading.textContent = 'What is documented'; dialogBody.appendChild(verifiedHeading);
    const verifiedList = document.createElement('ul'); item.verified.forEach(text => { const li = document.createElement('li'); li.textContent = text; verifiedList.appendChild(li); }); dialogBody.appendChild(verifiedList);
    const nextHeading = document.createElement('h3'); nextHeading.textContent = 'Useful next steps'; dialogBody.appendChild(nextHeading);
    const nextList = document.createElement('ul'); item.next.forEach(text => { const li = document.createElement('li'); li.textContent = text; nextList.appendChild(li); }); dialogBody.appendChild(nextList);
    if (typeof dialog.showModal === 'function') dialog.showModal(); else showToast('Project notes are available in the project card and audit report.');
  };
  $$('[data-detail]').forEach(button => button.addEventListener('click', () => openProjectDetails(button.dataset.detail)));
  closeDialogButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

  // Hero topology device inspector, driven by one central device model.
  const deviceData = {
    client: { name: 'Client PC', state: 'ONLINE', description: 'An illustrative endpoint initiating a request.', props: [['IPv4 address','192.168.10.24'],['MAC address','02:00:00:10:00:24'],['Interface','Ethernet 0'],['Default gateway','192.168.10.1'],['Switch port','Gi0/4']], note: 'Example values only; no host is queried.' },
    switch: { name: 'Access Switch', state: 'LINK UP', description: 'A simulated Layer 2 switch connecting endpoint devices.', props: [['Management IP','192.168.10.2'],['VLAN','10 · STUDENT'],['Port status','4 active / simulated'],['Link speed','1 Gbps'],['MAC table','Illustrative entries']], note: 'Port and VLAN state is part of the browser simulation.' },
    router: { name: 'Router / Firewall', state: 'FORWARDING', description: 'A logical Layer 3 hop that forwards traffic and applies example policy decisions.', props: [['LAN interface','192.168.10.1/24'],['WAN interface','10.0.0.2/30'],['Default route','0.0.0.0/0 → 10.0.0.1'],['Policy','DEMO-ALLOW-HTTPS'],['Latency','8 ms · simulated']], note: 'No actual router or firewall configuration is changed.' },
    isp: { name: 'ISP Gateway', state: 'UPLINK UP', description: 'An illustrative upstream gateway connecting the private network to a remote destination.', props: [['Gateway','10.0.0.1'],['Destination','203.0.113.20'],['Latency','24 ms · simulated'],['Capacity','100 Mbps · example'],['Connection','Simulated']], note: 'Addresses and performance values are for demonstration.' },
    server: { name: 'Remote Server', state: 'RESPONDING', description: 'A documentation-range endpoint used as the destination of the example request.', props: [['IPv4 address','203.0.113.20'],['Service','HTTPS · example'],['Port','443'],['Response','200 OK · simulated'],['Data source','Local simulation']], note: 'The page does not connect to this address.' },
    firewall: { name: 'Firewall', state: 'POLICY ACTIVE', description: 'Applies simple demonstration rules to simulated packet metadata.', props: [['Rule set','DEMO-EDGE-01'],['HTTPS / 443','ALLOW'],['Unknown port','BLOCK in filter scenario'],['Logging','Local event list'],['Mode','Simulated']], note: 'This is not a network security appliance.' },
    dns: { name: 'DNS Resolver', state: 'READY', description: 'A simulated resolver returning an example address before the browser model continues to the server.', props: [['Resolver','192.0.2.53'],['Query','example.test'],['Record','A · illustrative'],['TTL','300 s · example'],['Response','203.0.113.20']], note: 'No DNS query is sent to an external resolver.' }
  };
  const popover = $('#device-popover');
  const closeDevicePopover = () => { popover.hidden = true; };
  const openDevicePopover = key => {
    const item = deviceData[key]; if (!item) return;
    $('#popover-title').textContent = item.name;
    const holder = $('#popover-body'); holder.replaceChildren();
    const p = document.createElement('p'); p.textContent = item.description; holder.appendChild(p);
    const ul = document.createElement('ul'); ul.style.paddingLeft = '17px';
    item.props.forEach(([label,value]) => { const li = document.createElement('li'); li.textContent = `${label}: ${value}`; ul.appendChild(li); }); holder.appendChild(ul);
    const note = document.createElement('p'); note.textContent = item.note; holder.appendChild(note);
    popover.hidden = false;
  };
  $$('[data-device]').filter(el => !el.closest('#topology-svg')).forEach(button => button.addEventListener('click', () => openDevicePopover(button.dataset.device)));
  $$('.topo-node').forEach(node => {
    const selectNode = () => selectInspector(node.dataset.device);
    node.addEventListener('click', selectNode);
    node.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectNode(); } });
  });
  $('.popover-close').addEventListener('click', closeDevicePopover);

  // Hero flow controls share state with the same visible route model.
  const heroStage = $('#hero-network');
  let heroPlaying = true;
  let heroLabelsVisible = true;
  $('#hero-play').addEventListener('click', () => {
    heroPlaying = !heroPlaying;
    heroStage.classList.toggle('paused', !heroPlaying);
    $$('.packet animateMotion', heroStage).forEach(motion => { try { heroPlaying ? motion.beginElement() : motion.endElement(); } catch (_) {} });
    $('#hero-play').innerHTML = heroPlaying ? '<span>Ⅱ</span> Pause flow' : '<span>▶</span> Resume flow';
    showToast(heroPlaying ? 'Illustrative packet flow resumed.' : 'Illustrative packet flow paused.');
  });
  $('#hero-labels').addEventListener('click', () => {
    heroLabelsVisible = !heroLabelsVisible;
    heroStage.classList.toggle('labels-hidden', !heroLabelsVisible);
    $$('.device-label', heroStage).forEach(label => { label.style.opacity = heroLabelsVisible ? '1' : '0'; });
    $('#hero-labels').textContent = heroLabelsVisible ? '⌗ Hide labels' : '⌗ Show labels';
    $('#hero-labels').setAttribute('aria-pressed', String(heroLabelsVisible));
  });

  // Deterministic browser-only topology simulator.
  const svgNS = 'http://www.w3.org/2000/svg';
  const edgeElements = Object.fromEntries($$('#topology-edges [data-edge]').map(el => [el.dataset.edge, el]));
  const packetLayer = $('#topology-packets');
  const topologySvg = $('#topology-svg');
  const scenarioSelect = $('#scenario-select');
  const scenarioName = $('#scenario-name');
  const eventList = $('#event-list');
  const playButton = $('#sim-play');
  const pauseButton = $('#sim-pause');
  const topologyCanvas = $('#topology-canvas');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nodePositions = { client:[93,212], switch:[219,212], router:[366,212], firewall:[491,212], isp:[621,212], server:[680,122], dns:[541,320] };
  const edgePaths = Object.fromEntries(Object.entries(edgeElements).map(([key,el]) => [key,el]));
  const scenarios = {
    https: { label:'HTTPS REQUEST', route:['client-switch','switch-router','router-firewall','firewall-isp','isp-server'], protocol:'HTTPS', latency:24, link:'STABLE', packetCount:4, events:[['info','Client created HTTPS request for remote server.'],['info','Switch forwards frame toward router.'],['info','Firewall allows TCP/443 under demo rule.'],['info','Server response returns along the illustrative route.']], outcome:'Request and response simulated successfully.' },
    dns: { label:'DNS LOOKUP', route:['client-switch','switch-router','router-dns'], protocol:'DNS', latency:18, link:'STABLE', packetCount:3, events:[['info','Client asks the illustrative resolver for example.test.'],['info','Resolver returns an example A record.'],['info','Browser model can now continue to the remote endpoint.']], outcome:'DNS request and response simulated.' },
    congestion: { label:'NETWORK CONGESTION', route:['client-switch','switch-router','router-firewall','firewall-isp','isp-server'], protocol:'HTTPS', latency:186, link:'BUSY', packetCount:9, events:[['warn','Simulated traffic load increased on the uplink.'],['warn','Queueing adds delay to packets.'],['warn','One illustrative packet is marked as dropped under congestion.'],['info','Reduced load restores normal latency after reset.']], outcome:'Queueing and packet loss are illustrative effects.' },
    failure: { label:'LINK FAILURE', route:['client-switch','switch-router','router-firewall','firewall-isp','isp-server'], protocol:'ICMP', latency:0, link:'LINK DOWN', packetCount:2, failedEdge:'router-firewall', events:[['info','Connectivity check begins.'],['error','Router-to-firewall link is disabled in the model.'],['error','No alternate route exists in this topology.'],['error','Destination is unreachable until the link is restored.']], outcome:'Link failure prevents delivery; reset restores the model.' },
    firewall: { label:'FIREWALL FILTERING', route:['client-switch','switch-router','router-firewall'], protocol:'TCP/23', latency:12, link:'BLOCKED', packetCount:1, blockedEdge:'router-firewall', events:[['info','A simulated packet targets a disallowed demonstration port.'],['warn','Firewall rule DEMO-EDGE-01 matches deny policy.'],['error','Packet is blocked at the firewall.'],['info','No external packet is generated or sent.']], outcome:'The demonstration rule blocks the sample packet.' },
    healthy: { label:'HEALTHY NETWORK', route:['client-switch','switch-router','router-firewall','firewall-isp','isp-server'], protocol:'HTTPS', latency:21, link:'HEALTHY', packetCount:5, events:[['info','Endpoint, access, routing, and uplink checks pass in the model.'],['info','No simulated security alert is present.'],['info','Service responds within example latency range.']], outcome:'All modeled links are available.' }
  };
  let sim = { scenario:'https', playing:false, elapsed:0, lastFrame:0, raf:0, packets:[], events:[], packetCount:0, scale:1, pathsVisible:true, selectedDevice:'client' };
  const clearPacketLayer = () => { packetLayer.replaceChildren(); sim.packets = []; };
  const addEvent = (type, message) => {
    const totalSeconds = Math.floor(sim.elapsed);
    const time = `00:${String(Math.floor(totalSeconds/60)).padStart(2,'0')}:${String(totalSeconds%60).padStart(2,'0')}`;
    const p = document.createElement('p');
    const timeEl = document.createElement('time'); timeEl.textContent = time;
    const dot = document.createElement('span'); dot.className = `event-dot ${type}`;
    const text = document.createElement('span'); text.textContent = message;
    p.append(timeEl, dot, text); eventList.appendChild(p); eventList.scrollTop = eventList.scrollHeight;
    while (eventList.children.length > 9) eventList.firstElementChild.remove();
  };
  const resetEvents = () => { eventList.replaceChildren(); sim.elapsed = 0; sim.events = []; sim.packetCount = 0; $('#metric-packets').textContent = '000'; };
  const setMetric = (id, value) => { $(id).textContent = value; };
  const renderScenario = () => {
    const data = scenarios[sim.scenario];
    scenarioName.textContent = `SCENARIO: ${data.label}`;
    setMetric('#metric-latency', data.latency ? String(data.latency) : '—');
    setMetric('#metric-link', data.link);
    $('#hero-latency').innerHTML = data.latency ? `${data.latency} <small>ms</small>` : '—';
    setMetric('#hero-protocol', data.protocol);
    const shortState = { https:'Path available', dns:'Resolver ready', congestion:'Congestion simulated', failure:'Link unavailable', firewall:'Packet blocked', healthy:'Network healthy' };
    setMetric('#hero-state', shortState[sim.scenario] || 'Simulation ready');
    Object.entries(edgePaths).forEach(([key, path]) => {
      path.classList.toggle('active', data.route.includes(key) && !data.failedEdge && !data.blockedEdge);
      path.classList.toggle('failed', key === data.failedEdge);
      path.classList.toggle('blocked', key === data.blockedEdge);
      path.style.opacity = !sim.pathsVisible ? '0' : (data.route.includes(key) || key === data.failedEdge || key === data.blockedEdge ? '1' : '.48');
    });
    $$('.topo-node').forEach(node => node.classList.toggle('selected', node.dataset.device === sim.selectedDevice));
    selectInspector(sim.selectedDevice);
  };
  const selectInspector = key => {
    const item = deviceData[key]; if (!item) return;
    sim.selectedDevice = key;
    $('#inspector-title').textContent = item.name;
    $('#inspector-description').textContent = item.description;
    const data = scenarios[sim.scenario];
    let state = item.state;
    if (sim.scenario === 'failure' && ['firewall','isp','server'].includes(key)) state = key === 'server' ? 'UNREACHABLE' : 'LINK IMPACTED';
    if (sim.scenario === 'firewall' && key === 'firewall') state = 'PACKET BLOCKED';
    if (sim.scenario === 'congestion' && ['isp','server'].includes(key)) state = 'HIGH LATENCY';
    const status = $('#inspector-status'); status.textContent = `● ${state}`; status.classList.toggle('blocked', /BLOCK|DOWN|UNREACHABLE|IMPACTED/.test(state));
    const holder = $('#inspector-properties'); holder.replaceChildren();
    item.props.forEach(([label,value]) => {
      let finalValue = value;
      if (label.toLowerCase().includes('latency') && sim.scenario === 'congestion') finalValue = '186 ms · simulated';
      if (label.toLowerCase().includes('latency') && sim.scenario === 'failure') finalValue = 'Unavailable';
      if (label.toLowerCase().includes('policy') && sim.scenario === 'firewall') finalValue = 'DENY TCP/23';
      const row = document.createElement('div'); const span = document.createElement('span'); span.textContent = label; const b = document.createElement('b'); b.textContent = finalValue; row.append(span,b); holder.appendChild(row);
    });
    $('#inspector-note').textContent = data.outcome + ' ' + item.note;
    $$('.topo-node').forEach(node => node.classList.toggle('selected', node.dataset.device === key));
  };
  const createPackets = () => {
    clearPacketLayer();
    const data = scenarios[sim.scenario];
    const route = data.route.filter(edge => edgePaths[edge]);
    if (!route.length) return;
    const count = Math.min(data.packetCount, 9);
    for (let i=0;i<count;i++) {
      const circle = document.createElementNS(svgNS,'circle'); circle.setAttribute('r', sim.scenario === 'congestion' ? '4.5' : '4'); circle.setAttribute('class', `packet-dot${data.blockedEdge && i===0 ? ' blocked' : ''}`); circle.setAttribute('cx','0'); circle.setAttribute('cy','0'); packetLayer.appendChild(circle);
      sim.packets.push({el:circle, route, progress: (i/count), speed: sim.scenario === 'congestion' ? .055 + (i%3)*.006 : .11 + (i%3)*.008, stopped: false});
    }
  };
  const positionPacket = packet => {
    const data = scenarios[sim.scenario];
    const route = packet.route;
    const total = route.length;
    let position = Math.min(.999, packet.progress) * total;
    let edgeIndex = Math.min(total - 1, Math.floor(position));
    let local = position - edgeIndex;
    if (data.failedEdge && route[edgeIndex] === data.failedEdge) { local = .25; packet.stopped = true; }
    if (data.blockedEdge && route[edgeIndex] === data.blockedEdge) { local = .12; packet.stopped = true; }
    const path = edgePaths[route[edgeIndex]];
    if (!path || !path.getTotalLength) return;
    const length = path.getTotalLength(); const point = path.getPointAtLength(Math.max(0,Math.min(length,length*local)));
    packet.el.setAttribute('cx', point.x); packet.el.setAttribute('cy', point.y);
    if (packet.stopped) packet.el.classList.add('blocked'); else packet.el.classList.remove('blocked');
  };
  const stopSimulation = () => { sim.playing = false; if (sim.raf) cancelAnimationFrame(sim.raf); sim.raf = 0; playButton.disabled = false; pauseButton.disabled = true; };
  const pauseSimulation = () => { stopSimulation(); addEvent('info','Simulation paused by visitor.'); };
  const finishSimulation = () => { stopSimulation(); addEvent('info', scenarios[sim.scenario].outcome); };
  const tick = timestamp => {
    if (!sim.playing) return;
    const delta = sim.lastFrame ? Math.min(.05,(timestamp-sim.lastFrame)/1000) : 0; sim.lastFrame = timestamp; sim.elapsed += delta;
    let moved = false;
    sim.packets.forEach(packet => {
      if (packet.stopped) return;
      packet.progress += packet.speed * delta;
      if (packet.progress >= 1) packet.progress = 0;
      positionPacket(packet); moved = true;
    });
    if (Math.floor(sim.elapsed) > sim.packetCount) {
      sim.packetCount = Math.floor(sim.elapsed); $('#metric-packets').textContent = String(sim.packetCount * Math.max(1,sim.packets.length)).padStart(3,'0');
    }
    if (sim.scenario === 'congestion' && Math.floor(sim.elapsed) === 4 && !sim.events.includes('congestion')) { sim.events.push('congestion'); addEvent('warn','Queue delay elevated; one packet remains marked as illustrative loss.'); }
    if (sim.scenario === 'failure' && sim.elapsed > 2.4) { finishSimulation(); return; }
    if (sim.scenario === 'firewall' && sim.elapsed > 2.1) { finishSimulation(); return; }
    if (sim.elapsed > (sim.scenario === 'congestion' ? 12 : 8)) { finishSimulation(); return; }
    sim.raf = requestAnimationFrame(tick);
  };
  const playSimulation = () => {
    if (sim.playing) return;
    sim.playing = true; sim.lastFrame = 0; playButton.disabled = true; pauseButton.disabled = false;
    addEvent('info', `Started ${scenarios[sim.scenario].label.toLowerCase()} scenario.`);
    if (reducedMotion) { sim.packets.forEach(positionPacket); sim.elapsed = 8; finishSimulation(); return; }
    sim.raf = requestAnimationFrame(tick);
  };
  const resetSimulation = (announce = true) => {
    stopSimulation(); clearPacketLayer(); resetEvents(); sim.events = []; sim.elapsed = 0; sim.lastFrame = 0; sim.packetCount = 0;
    const data = scenarios[sim.scenario];
    renderScenario(); createPackets(); sim.packets.forEach(positionPacket);
    data.events.slice(0,2).forEach(([type,message]) => addEvent(type,message));
    setMetric('#metric-latency', data.latency ? String(data.latency) : '—'); setMetric('#metric-link',data.link); $('#metric-packets').textContent = '000';
    if (announce) showToast(`${data.label.charAt(0)+data.label.slice(1).toLowerCase()} scenario reset.`);
  };
  scenarioSelect.addEventListener('change', () => { sim.scenario = scenarioSelect.value; resetSimulation(false); showToast(`Loaded ${scenarios[sim.scenario].label.toLowerCase()} scenario.`); });
  playButton.addEventListener('click', playSimulation);
  pauseButton.addEventListener('click', pauseSimulation);
  $('#sim-reset').addEventListener('click', () => resetSimulation(true));
  $('#clear-events').addEventListener('click', () => { eventList.replaceChildren(); addEvent('info','Event list cleared. Simulation state is unchanged.'); });
  let zoom = 1;
  $('#zoom-in').addEventListener('click', () => { zoom = Math.min(1.4, +(zoom + .1).toFixed(2)); topologySvg.style.transform = `scale(${zoom})`; showToast(`Topology zoom ${Math.round(zoom*100)}%.`); });
  $('#zoom-out').addEventListener('click', () => { zoom = Math.max(.8, +(zoom - .1).toFixed(2)); topologySvg.style.transform = `scale(${zoom})`; showToast(`Topology zoom ${Math.round(zoom*100)}%.`); });
  $('#toggle-paths').addEventListener('click', event => { sim.pathsVisible = !sim.pathsVisible; $$('.topology-edges path').forEach(path => path.style.opacity = sim.pathsVisible ? (path.classList.contains('active') || path.classList.contains('failed') || path.classList.contains('blocked') ? '1' : '.48') : '0'); event.currentTarget.textContent = sim.pathsVisible ? 'Hide paths' : 'Show paths'; event.currentTarget.setAttribute('aria-pressed', String(sim.pathsVisible)); });
  resetSimulation(false);

  // A safe, local-only email-indicator example; all data is fictional.
  const emailSamples = {
    normal: { sender:'notice@service.example', subject:'Your monthly statement is ready', url:'https://service.example/account', status:'LOW INDICATOR COUNT', tone:'safe', notes:['Sender uses the same illustrative domain as the link.','HTTPS scheme is present.','No urgency cue was detected by this simple rule set.'], explanation:'No obvious indicator was triggered by the demo rules. This is not proof that an email is safe.' },
    suspicious: { sender:'account-alert@service-example.invalid', subject:'URGENT: account access will be closed today', url:'http://service-example.invalid/verify-now', status:'SUSPICIOUS INDICATORS', tone:'warn', notes:['Urgent account-pressure wording is present.','Link domain differs from the expected service.example domain.','The URL uses HTTP rather than HTTPS.'], explanation:'Multiple illustrative warning signs were found. Verify independently; do not click the sample link.' },
    spoofed: { sender:'support@servlce.example', subject:'Confirm your identity immediately', url:'https://servlce.example/login', status:'HIGHER REVIEW PRIORITY', tone:'danger', notes:['Sender domain contains a look-alike spelling.','The URL host resembles, but does not match, the expected domain.','Identity-verification pressure is present.'], explanation:'A look-alike domain and pressure language warrant careful review. This sample is fictional and no URL is visited.' }
  };
  $('#email-sample').addEventListener('change', () => {
    const sample = emailSamples[$('#email-sample').value];
    $('#sample-sender').textContent = sample.sender; $('#sample-subject').textContent = sample.subject; $('#sample-url').textContent = sample.url;
    $('#analysis-result').innerHTML = '<span class="result-state neutral">READY TO ANALYSE</span><p>Sample changed. Run the local demonstration to see its indicators.</p>';
  });
  $('#analyze-email').addEventListener('click', () => {
    const sample = emailSamples[$('#email-sample').value]; const result = $('#analysis-result'); result.replaceChildren();
    const state = document.createElement('span'); state.className = `result-state ${sample.tone}`; state.textContent = sample.status; result.appendChild(state);
    const explanation = document.createElement('p'); explanation.textContent = sample.explanation; result.appendChild(explanation);
    const list = document.createElement('ul'); list.style.cssText = 'margin:9px 0 0;padding-left:17px;color:var(--muted);font-size:9px;line-height:1.8';
    sample.notes.forEach(note => { const li = document.createElement('li'); li.textContent = note; list.appendChild(li); }); result.appendChild(list);
    const timeline = $('#security-timeline'); timeline.replaceChildren();
    [['01','Sample loaded','Fictional email fields are held locally in this page.','info'],['02','Indicators inspected',sample.notes.join(' '),'warn'],['03','Decision produced',sample.explanation,sample.tone === 'safe' ? 'safe' : 'warn']].forEach(([num,title,desc,tone]) => {
      const article = document.createElement('article'); const icon = document.createElement('span'); icon.className = `timeline-icon ${tone}`; icon.textContent = num;
      const div = document.createElement('div'); const b = document.createElement('b'); b.textContent = title; const p = document.createElement('p'); p.textContent = desc; const small = document.createElement('small'); small.textContent = 'LOCAL RULE-BASED DEMO'; div.append(b,p,small); article.append(icon,div); timeline.appendChild(article);
    });
    $('#event-count').textContent = '03 EVENTS'; showToast('Sample analysed locally. No external requests were made.');
  });

  $('#year').textContent = String(new Date().getFullYear());
})();
