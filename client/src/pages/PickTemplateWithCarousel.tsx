import React, { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { TEMPLATES } from "@/components/cv-builder/Templates/constants";
import { useAppDispatch } from "@/redux/store";
import { createCv } from "@/redux/thunks";
import { useToast } from "@/hooks/use-toast";
import { Carousel } from "@/components/ui/carousel";

export default function PickTemplate() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [, navigate] = useLocation();
  const [isReturnPathMatch, params] = useRoute("/pick-template/:returnPath");
  const returnPath =
    isReturnPathMatch && params?.returnPath
      ? params.returnPath
      : "cv-builder/create";

  const [selectedTemplateId, setSelectedTemplateId] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCreating, setIsCreating] = useState(false);

  // Set selected template when active index changes
  useEffect(() => {
    setSelectedTemplateId(TEMPLATES[activeIndex].id);
  }, [activeIndex]);

  const handleContinue = async () => {
    setIsCreating(true);

    try {
      await dispatch(createCv({ templateId: selectedTemplateId }));
      navigate(`/${returnPath}`);
    } catch (error) {
      console.error("Failed to create CV:", error);
      toast({
        title: t("pickTemplate.error", "Error"),
        description: t(
          "pickTemplate.errorDescription",
          "Failed to create CV with selected template",
        ),
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-background to-muted/20 min-h-screen py-10">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
            {t("pickTemplate.title", "Choose Your CV Template")}
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t(
              "pickTemplate.description",
              "Select a template that best represents your professional style and helps you stand out to potential employers",
            )}
          </p>
        </div>

        <div className="my-12">
          {/* Template Carousel */}
          <Carousel 
            items={TEMPLATES}
            infinite={true}
            swipable={true}
            withBar={true}
            selectedItem={activeIndex}
            onChange={(index) => setActiveIndex(index)}
          >
            {({ item: template, index }) => (
              <div className="flex justify-center items-center">
                <Card 
                  className={`relative cursor-pointer transition-all overflow-hidden ${
                    template.id === selectedTemplateId ? 'ring-4 ring-primary shadow-xl' : 'shadow-md'
                  }`}
                  onClick={() => setSelectedTemplateId(template.id)}
                >
                  {/* Template Preview */}
                  <div className="w-[300px] h-[450px] border-b relative overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                      <img 
                        src={template.imgSrc} 
                        alt=""
                        className="w-full h-full object-cover opacity-10"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background/5"></div>
                    </div>
                    
                    {/* Mock CV Template - different styles per template */}
                    {template.id === 1 && (
                      <div className="relative z-10 p-4 h-full flex flex-col">
                        {/* Header Section - Mastery */}
                        <div className="mb-4 pb-2 border-b border-primary/30">
                          <div className="w-3/4 h-7 bg-primary/20 rounded-md mb-2"></div>
                          <div className="flex gap-2">
                            <div className="w-1/3 h-3 bg-muted rounded-sm"></div>
                            <div className="w-1/3 h-3 bg-muted rounded-sm"></div>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 flex flex-col gap-3">
                          {/* Experience Section */}
                          <div className="mb-2">
                            <div className="w-1/2 h-4 bg-primary/20 rounded-sm mb-2"></div>
                            <div className="h-3 bg-muted rounded-sm mb-1"></div>
                            <div className="h-3 bg-muted/60 rounded-sm mb-1"></div>
                            <div className="h-3 bg-muted/60 rounded-sm"></div>
                          </div>
                          
                          {/* Education Section */}
                          <div className="mb-2">
                            <div className="w-1/2 h-4 bg-primary/20 rounded-sm mb-2"></div>
                            <div className="h-3 bg-muted rounded-sm mb-1"></div>
                            <div className="h-3 bg-muted/60 rounded-sm"></div>
                          </div>
                          
                          {/* Skills Section */}
                          <div>
                            <div className="w-1/2 h-4 bg-primary/20 rounded-sm mb-2"></div>
                            <div className="flex flex-wrap gap-1">
                              <div className="h-6 w-12 bg-primary/10 rounded-md"></div>
                              <div className="h-6 w-16 bg-primary/10 rounded-md"></div>
                              <div className="h-6 w-14 bg-primary/10 rounded-md"></div>
                              <div className="h-6 w-10 bg-primary/10 rounded-md"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {template.id === 2 && (
                      <div className="relative z-10 h-full flex">
                        {/* Side bar - Identity */}
                        <div className="w-1/3 bg-primary/10 p-3 h-full flex flex-col gap-3">
                          <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-2"></div>
                          <div className="w-full h-4 bg-primary/20 rounded-sm mb-2"></div>
                          <div className="h-3 bg-muted/70 rounded-sm mb-1 mt-2"></div>
                          <div className="h-3 bg-muted/70 rounded-sm mb-3"></div>
                          
                          <div className="w-full h-4 bg-primary/20 rounded-sm mb-2 mt-auto"></div>
                          <div className="flex flex-col gap-1">
                            <div className="h-3 bg-muted/70 rounded-sm"></div>
                            <div className="h-3 bg-muted/70 rounded-sm"></div>
                            <div className="h-3 bg-muted/70 rounded-sm"></div>
                          </div>
                        </div>
                        
                        {/* Main Content */}
                        <div className="w-2/3 p-4 flex flex-col gap-3">
                          <div className="mb-3">
                            <div className="w-3/4 h-6 bg-primary/20 rounded-sm mb-1"></div>
                            <div className="w-1/2 h-3 bg-muted/70 rounded-sm"></div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="w-1/2 h-4 bg-primary/20 rounded-sm mb-2"></div>
                            <div className="h-3 bg-muted/60 rounded-sm mb-1"></div>
                            <div className="h-3 bg-muted/60 rounded-sm mb-1"></div>
                            <div className="h-3 bg-muted/60 rounded-sm mb-3"></div>
                            
                            <div className="w-1/2 h-4 bg-primary/20 rounded-sm mb-2"></div>
                            <div className="h-3 bg-muted/60 rounded-sm mb-1"></div>
                            <div className="h-3 bg-muted/60 rounded-sm"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {template.id === 3 && (
                      <div className="relative z-10 p-5 h-full flex flex-col">
                        {/* Header Section - Minimalist */}
                        <div className="mb-6">
                          <div className="w-full h-8 bg-primary/20 rounded-sm mb-1"></div>
                          <div className="w-2/3 h-3 bg-muted/70 rounded-sm"></div>
                        </div>
                        
                        {/* Content - More spacious and minimal */}
                        <div className="flex-1 flex flex-col gap-4">
                          {/* Experience Section */}
                          <div className="mb-4">
                            <div className="w-1/4 h-3 bg-primary/20 rounded-sm mb-3"></div>
                            <div className="h-2 bg-muted/60 rounded-sm mb-2"></div>
                            <div className="h-2 bg-muted/50 rounded-sm mb-2"></div>
                            <div className="h-2 bg-muted/50 rounded-sm"></div>
                          </div>
                          
                          {/* Education Section */}
                          <div className="mb-4">
                            <div className="w-1/4 h-3 bg-primary/20 rounded-sm mb-3"></div>
                            <div className="h-2 bg-muted/60 rounded-sm mb-2"></div>
                            <div className="h-2 bg-muted/50 rounded-sm"></div>
                          </div>
                          
                          {/* Skills Section */}
                          <div>
                            <div className="w-1/4 h-3 bg-primary/20 rounded-sm mb-3"></div>
                            <div className="flex flex-wrap gap-2">
                              <div className="h-2 w-10 bg-muted/40 rounded-sm"></div>
                              <div className="h-2 w-12 bg-muted/40 rounded-sm"></div>
                              <div className="h-2 w-8 bg-muted/40 rounded-sm"></div>
                              <div className="h-2 w-14 bg-muted/40 rounded-sm"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {template.id === 4 && (
                      <div className="relative z-10 p-4 h-full flex flex-col">
                        {/* Header Section - Executive */}
                        <div className="mb-6 border-b-2 border-primary/30 pb-3">
                          <div className="w-3/4 h-8 bg-primary/30 rounded-sm mb-2"></div>
                          <div className="flex justify-between">
                            <div className="w-1/3 h-3 bg-muted/70 rounded-sm"></div>
                            <div className="w-1/3 h-3 bg-muted/70 rounded-sm"></div>
                          </div>
                        </div>
                        
                        {/* Two column layout */}
                        <div className="flex-1 flex gap-4">
                          {/* Left column */}
                          <div className="w-2/3 flex flex-col gap-3">
                            <div className="mb-3">
                              <div className="w-1/2 h-5 bg-primary/30 rounded-none mb-3 border-l-4 border-primary pl-2"></div>
                              <div className="h-3 bg-muted/60 rounded-sm mb-1"></div>
                              <div className="h-3 bg-muted/60 rounded-sm mb-1"></div>
                              <div className="h-3 bg-muted/60 rounded-sm"></div>
                            </div>
                            
                            <div>
                              <div className="w-1/2 h-5 bg-primary/30 rounded-none mb-3 border-l-4 border-primary pl-2"></div>
                              <div className="h-3 bg-muted/60 rounded-sm mb-1"></div>
                              <div className="h-3 bg-muted/60 rounded-sm"></div>
                            </div>
                          </div>
                          
                          {/* Right column */}
                          <div className="w-1/3 p-2 flex flex-col gap-3 bg-muted/10">
                            <div className="w-full h-5 bg-primary/30 rounded-none mb-3"></div>
                            <div className="flex flex-col gap-1">
                              <div className="h-3 bg-muted/70 rounded-sm"></div>
                              <div className="h-3 bg-muted/70 rounded-sm"></div>
                              <div className="h-3 bg-muted/70 rounded-sm"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {template.id === 5 && (
                      <div className="relative z-10 p-3 h-full flex flex-col">
                        {/* Header Section - Creative */}
                        <div className="mb-4 flex items-center gap-3">
                          <div className="w-16 h-16 bg-primary/30 rounded-full"></div>
                          <div className="flex-1">
                            <div className="w-3/4 h-6 bg-primary/20 rounded-md mb-1"></div>
                            <div className="w-1/2 h-3 bg-muted/80 rounded-md"></div>
                          </div>
                        </div>
                        
                        {/* Content - Creative layout */}
                        <div className="flex-1 gap-3 grid grid-cols-2">
                          <div className="col-span-2 mb-2">
                            <div className="w-full h-1 bg-primary/20 rounded-full mb-3"></div>
                            <div className="h-3 bg-muted/60 rounded-full mb-1"></div>
                            <div className="h-3 bg-muted/60 rounded-full mb-1"></div>
                            <div className="h-3 bg-muted/60 rounded-full"></div>
                          </div>
                          
                          {/* Left column */}
                          <div className="pr-2">
                            <div className="w-full h-4 bg-primary/20 rounded-full mb-2"></div>
                            <div className="h-3 bg-muted/70 rounded-full mb-1"></div>
                            <div className="h-3 bg-muted/70 rounded-full mb-1"></div>
                            <div className="h-3 bg-muted/70 rounded-full"></div>
                          </div>
                          
                          {/* Right column */}
                          <div className="pl-2">
                            <div className="w-full h-4 bg-primary/20 rounded-full mb-2"></div>
                            <div className="flex flex-wrap gap-1">
                              <div className="h-5 px-3 bg-primary/20 rounded-full"></div>
                              <div className="h-5 px-3 bg-primary/10 rounded-full"></div>
                              <div className="h-5 px-3 bg-primary/20 rounded-full"></div>
                              <div className="h-5 px-3 bg-primary/10 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Template Info */}
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.description || `Template #${template.id}`}
                      </p>
                    </div>
                    
                    {/* Selection Indicator */}
                    {template.id === selectedTemplateId && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            )}
          </Carousel>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={isCreating}
            className="min-w-[250px]"
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("pickTemplate.creating", "Creating your CV...")}
              </>
            ) : (
              t("pickTemplate.continue", "Continue with this template")
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}