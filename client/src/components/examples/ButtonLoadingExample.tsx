import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export const ButtonLoadingExample = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    
    // Simulate an async operation
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Operation completed!");
    } catch (error) {
      console.error("Operation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Button Loading States</h2>
      
      <div className="flex flex-wrap gap-4">
        <Button onClick={handleClick} isLoading={isLoading}>
          Submit Form
        </Button>
        
        <Button variant="outline" isLoading={isLoading} onClick={handleClick}>
          Save Changes
        </Button>
        
        <Button variant="secondary" isLoading={isLoading} onClick={handleClick}>
          Process Data
        </Button>
        
        <Button variant="destructive" isLoading={isLoading} onClick={handleClick}>
          Delete Item
        </Button>
      </div>
      
      <div className="bg-muted p-4 rounded-md">
        <code className="text-sm">
          {`<Button isLoading={isSubmitting} onClick={handleSubmit}>\n  Submit Form\n</Button>`}
        </code>
      </div>
    </div>
  );
};