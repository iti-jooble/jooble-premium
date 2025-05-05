import React, { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { TEMPLATES } from "@/components/cv-builder/Templates/constants";
import { Carousel } from "@/components/ui/carousel";

export default function PickTemplate() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const searchString = useSearch();

  const searchParams = new URLSearchParams(searchString);

  const [selectedTemplateId, setSelectedTemplateId] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setSelectedTemplateId(TEMPLATES[activeIndex].id);
  }, [activeIndex]);

  useLayoutEffect(() => {
    const templateIdFromSearch = searchParams.get("templateId");

    if (templateIdFromSearch) {
      setSelectedTemplateId(parseInt(templateIdFromSearch));
      setActiveIndex(
        TEMPLATES.findIndex(
          (template) => template.id === parseInt(templateIdFromSearch),
        ),
      );
    }
  }, []);

  const handleContinue = async () => {
    navigate(`/cv-builder?templateId=${selectedTemplateId}`);
  };

  return (
    <div className="p-6 sm:p-8 animate-in fade-in duration-300 bg-gradient-to-b from-background to-muted/20">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("pickTemplate.title", "Pick a Template")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t(
              "pickTemplate.description",
              "Choose a template to start building your CV with Fitly",
            )}
          </p>
        </div>
      </div>

      <div className="my-12">
        <Carousel
          items={TEMPLATES}
          infinite
          swipable
          selectedItem={activeIndex}
          onChange={(index) => setActiveIndex(index)}
        >
          {({ item: template }) => (
            <div className="flex justify-center items-center">
              <Card
                className={`relative cursor-pointer transition-all overflow-hidden ${
                  template.id === selectedTemplateId
                    ? "ring-4 ring-primary shadow-xl"
                    : "shadow-md"
                }`}
                onClick={() => setSelectedTemplateId(template.id)}
              >
                <div className="w-[356px] h-[450px] border-b relative overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      src={template.imgSrc}
                      alt={template.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="p-4 flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="font-semibold">{template.name}</h3>
                  </div>

                  {template.id === selectedTemplateId && (
                    <Button size="sm" onClick={handleContinue}>
                      <Check className="mr-2 h-4 w-4" />
                      {t("pickTemplate.use", "Use")}
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
}
