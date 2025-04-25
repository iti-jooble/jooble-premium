import React from "react";

interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <main className="flex-1 overflow-y-auto" style={{ backgroundColor: "#F7F6F2" }}>
      {children}
    </main>
  );
};

export default Content;
