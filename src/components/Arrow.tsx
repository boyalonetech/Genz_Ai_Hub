import React from "react";

export default function Arrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
      <path fill="currentColor" d="M11 16.5V13H3V7h8V3.5l6.5 6.5z"></path>
    </svg>
  );
}
