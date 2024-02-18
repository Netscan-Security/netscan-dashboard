import { CSSProperties } from "react";

import NetscanLogo from "./netscan-logo.svg";

export type BaseIconType = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};

export const NetscanIcon: React.FC<BaseIconType> = ({
  size = 24,
  className,
  style,
}) => {
  return (
    <img
      src={NetscanLogo}
      alt="Netscan Logo"
      className={className}
      style={{ width: size, height: size, ...style }}
    />
  );
};
