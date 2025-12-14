import React from 'react';

const GraphBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0B1221]">
      {/* Main graph grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        {/* Secondary diagonal pattern for depth */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#0B1221_25%,transparent_25%,transparent_75%,#0B1221_75%,#0B1221),linear-gradient(-45deg,#0B1221_25%,transparent_25%,transparent_75%,#0B1221_75%,#0B1221)] bg-[size:20px_20px] opacity-10" />
        
        {/* Blue gradient overlay matching navbar */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#07A8ED10] via-[#0B1221] to-[#07A8ED10] opacity-20" />
        
        {/* Faint center focal point */}
        <div className="absolute inset-0 bg-radial-gradient(circle_at_center,#07A8ED15_0%,transparent_70%)" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GraphBackground;