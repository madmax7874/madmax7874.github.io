import React, { forwardRef } from 'react';

const WindingRoad = forwardRef<SVGPathElement, {}>((props, ref) => {
  // A long, repeating S-curve path.
  // Each segment spans 200px in height.
  // M = Move to, Q = Quadratic Bezier curve
  const pathData = `
    M 50 0
    Q 150 100, 50 200
    Q -50 300, 50 400
    Q 150 500, 50 600
    Q -50 700, 50 800
    Q 150 900, 50 1000
    Q -50 1100, 50 1200
    Q 150 1300, 50 1400
    Q -50 1500, 50 1600
    Q 150 1700, 50 1800
    Q -50 1900, 50 2000
    Q 150 2100, 50 2200
    Q -50 2300, 50 2400
    Q 150 2500, 50 2600
    Q -50 2700, 50 2800
    Q 150 2900, 50 3000
    Q -50 3100, 50 3200
    Q 150 3300, 50 3400
    Q -50 3500, 50 3600
  `;

  return (
    <svg
      width="100"
      height="100%"
      viewBox="0 0 100 3600" // Height needs to be large enough for the content
      preserveAspectRatio="xMidYMin slice"
    >
      {/* Road surface */}
      <path
        d={pathData}
        fill="none"
        strokeWidth="40"
        className="stroke-gray-300 dark:stroke-gray-700"
      />
      {/* Dashed center line */}
      <path
        ref={ref}
        d={pathData}
        fill="none"
        strokeWidth="4"
        strokeDasharray="20 30"
        className="stroke-white dark:stroke-gray-500"
      />
    </svg>
  );
});

WindingRoad.displayName = 'WindingRoad';

export default WindingRoad;
