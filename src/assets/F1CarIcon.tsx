import React from 'react';

const F1CarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 200"
    {...props}
    style={{
      ...props.style,
      // fallback color for fill
      color: 'hsl(var(--primary))',
    }}
  >
    {/* Rear Wing */}
    <path d="M15 180 H85 V190 H15 z" fill="hsl(var(--accent))" />
    <path d="M48 170 H52 V180 H48 z" fill="hsl(var(--accent))" />

    {/* Body */}
    <path d="M30 20 L70 20 L75 60 L90 70 L90 130 L75 140 L70 180 L30 180 L25 140 L10 130 L10 70 L25 60 z" fill="hsl(var(--primary))" stroke="hsl(var(--border))" strokeWidth="2" />

    {/* Front Wing */}
    <path d="M20 10 H80 V20 H20 z" fill="hsl(var(--accent))" />
    <path d="M48 0 H52 V10 H48 z" fill="hsl(var(--accent))" />

    {/* Cockpit */}
    <circle cx="50" cy="110" r="12" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />

  {/* Wheels */}
  {/* Uses CSS variables for color: --wheel-color (set in CSS for light/dark mode) */}
  <rect x="0" y="55" width="10" height="30" rx="5" fill="var(--wheel-color, #000)" />
  <rect x="90" y="55" width="10" height="30" rx="5" fill="var(--wheel-color, #000)" />
  <rect x="0" y="135" width="10" height="30" rx="5" fill="var(--wheel-color, #000)" />
  <rect x="90" y="135" width="10" height="30" rx="5" fill="var(--wheel-color, #000)" />
  </svg>
);

export default F1CarIcon;
