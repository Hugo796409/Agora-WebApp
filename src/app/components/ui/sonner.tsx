import * as React from "react";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "0 0% 100%",
          "--normal-border": "214.3 31.8% 91.4%",
          "--normal-text": "222.2 47.4% 11.2%",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };