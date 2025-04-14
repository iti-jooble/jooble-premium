import React from "react";
import { ButtonLoadingExample } from "@/components/examples/ButtonLoadingExample";

export default function ButtonDemo() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Button Component Examples</h1>
      <div className="bg-card rounded-lg shadow-sm border p-6">
        <ButtonLoadingExample />
      </div>
    </div>
  );
}