// src/components/Container.tsx
import * as React from "react";

type Props = React.PropsWithChildren<{ className?: string }>;

export default function Container({ children, className = "" }: Props) {
  return (
    <div className={`mx-auto w-full px-5 md:px-10 xl:px-[120px] ${className}`}>
      {children}
    </div>
  );
}
