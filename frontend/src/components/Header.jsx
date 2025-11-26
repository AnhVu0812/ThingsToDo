import React from "react";

export const Header = () => {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-4xl font-bold text-transparent bg-primary bg-clip-text pb-1">
        Things To Do
      </h1>

      <p className="text-muted-foreground">Do now for future</p>
    </div>
  );
};
