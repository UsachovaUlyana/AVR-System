// Lightweight stroke icons (24x24) — inherit color via currentColor.
const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function IconCalendar(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
      <path d="M7.5 13h3M7.5 16.5h6" />
    </svg>
  );
}

export function IconShield(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V5.5L12 2.5z" />
      <path d="M8.8 12l2.2 2.2L15.5 9.6" />
    </svg>
  );
}

export function IconBuilding(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 21V6.5L13 3v18M13 9.5l7 2.3V21" />
      <path d="M3 21h18M7 8.5h2M7 12h2M7 15.5h2M16.5 14.5h1M16.5 17.5h1" />
    </svg>
  );
}

export function IconUsers(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 5.2A3.2 3.2 0 0 1 18 11M17 14.4c2.3.6 4 2.7 4 5.6" />
    </svg>
  );
}

export function IconBolt(props) {
  return (
    <svg {...base} {...props}>
      <path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13l0-8z" />
    </svg>
  );
}

export function IconPanel(props) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 7v4M11 7v4M14 7v4M17 7v4M8 11h9M8 15.5h3M14 15.5h2" />
    </svg>
  );
}

export function IconCable(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4v4a4 4 0 0 0 4 4h8a4 4 0 0 1 4 4v4" />
      <path d="M2.5 4h3M18.5 20h3M9.5 12V8M14.5 12V8" />
    </svg>
  );
}

export function IconPlug(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 2v5M15 2v5" />
      <path d="M6 7h12v3a6 6 0 0 1-12 0V7z" />
      <path d="M12 16v6" />
    </svg>
  );
}

export function IconGauge(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19a8 8 0 1 1 16 0" />
      <path d="M12 14l4-3" />
      <circle cx="12" cy="14" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFactory(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 21V10l6 4V10l6 4V6l3 1.5V21H3z" />
      <path d="M3 21h18M7 17h2M12 17h2M17 17h0.01" />
    </svg>
  );
}

export function IconHome(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

export function IconDoc(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 2.5h8l4 4V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z" />
      <path d="M13.5 2.5V7h4.5M8.5 13h7M8.5 16.5h7M8.5 9.5h3" />
    </svg>
  );
}

export function IconWrench(props) {
  return (
    <svg {...base} {...props}>
      <path d="M15 6.5a4 4 0 0 0-5.3 4.6L4 16.8 7.2 20l5.7-5.7A4 4 0 0 0 17.5 9l-2.4 2.4-2-2L15 6.5z" />
    </svg>
  );
}

export function IconClock(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function IconRuble(props) {
  return (
    <svg {...base} {...props}>
      <path d="M8 21V4h5a4.5 4.5 0 0 1 0 9H6M6 17h7" />
    </svg>
  );
}

export function IconPhone(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3h3l1.5 4.5-2 1.3a12 12 0 0 0 5 5l1.3-2L20 13.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.2 2 2 0 0 1 6.5 3z" />
    </svg>
  );
}

export function IconMail(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 6.5l8 6 8-6" />
    </svg>
  );
}

export function IconPin(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.7 7-11a7 7 0 0 0-14 0c0 5.3 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconArrow(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}
