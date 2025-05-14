import React from "react";

interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <main className="flex-1 overflow-y-auto bg-primary-gradient">
      {children}
    </main>
  );
};

export default Content;
