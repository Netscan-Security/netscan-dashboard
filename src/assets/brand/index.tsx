import { CSSProperties } from "react";

import NetScanLogo from "./netscan-logo.svg";

export type BaseIconType = {
  size?: number;
  className?: string;
  style?: CSSProperties;
};

export const NetScanIcon: React.FC<BaseIconType> = ({
  size = 24,
  className,
  style,
}) => {
  return (
    <img
      src={NetScanLogo}
      alt="NetScan Logo"
      className={className}
      style={{ width: size, height: size, ...style }}
    />
  );
};
