import React, { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';
import { TEMPLATES } from '@/components/cv-builder/Templates/constants';
import { useAppDispatch } from '@/redux/store';
import { createCv } from '@/redux/thunks';
import { useToast } from '@/hooks/use-toast';

// Default template images if not provided in constants
const DEFAULT_TEMPLATE_IMAGES = [
  'https://images.unsplash.com/photo-1574323347407-f5e1kdcf4b52?q=80&w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=300&auto=format&fit=crop'
];

export default function PickTemplate() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [, navigate] = useLocation();
  const [isReturnPathMatch, params] = useRoute('/pick-template/:returnPath');
  const returnPath = isReturnPathMatch && params?.returnPath ? params.returnPath : 'cv-builder/create';
  
  const [selectedTemplateId, setSelectedTemplateId] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCreating, setIsCreating] = useState(false);

  // Set selected template when active index changes
  useEffect(() => {
    setSelectedTemplateId(TEMPLATES[activeIndex].id);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TEMPLATES.length);
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + TEMPLATES.length) % TEMPLATES.length);
  };

  const handleContinue = async () => {
    setIsCreating(true);
    
    try {
      // First create a new CV
      if (returnPath === 'cv-builder/create') {
        // Create a new CV with the selected template
        const result = await dispatch(createCv({ templateId: selectedTemplateId }));
        
        toast({
          title: t('pickTemplate.success', 'Template selected'),
          description: t('pickTemplate.successDescription', 'Your CV has been created with the selected template'),
          variant: 'default',
        });
        
        // Navigate to the CV builder with the new CV
        navigate(`/${returnPath}`);
      } else {
        // Assume we're changing the template for an existing CV
        toast({
          title: t('pickTemplate.templateChanged', 'Template changed'),
          description: t('pickTemplate.templateChangedDescription', 'Your CV template has been updated'),
          variant: 'default',
        });
        
        navigate(`/${returnPath}`);
      }
    } catch (error) {
      console.error('Failed to create CV:', error);
      
      toast({
        title: t('pickTemplate.error', 'Error'),
        description: t('pickTemplate.errorDescription', 'Failed to create CV with selected template'),
        variant: 'destructive',
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
          {t('pickTemplate.title', 'Choose Your CV Template')}
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          {t('pickTemplate.description', 'Select a template that best represents your professional style and helps you stand out to potential employers')}
        </p>
      </div>

      <div className="relative px-12 my-12">
        {/* Carousel Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 bg-background shadow-md"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10 bg-background shadow-md"
          onClick={handleNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Template Carousel */}
        <div className="flex justify-center items-start gap-6 overflow-hidden h-[600px]">
          {TEMPLATES.map((template, index) => {
            const isActive = index === activeIndex;
            const isSelected = template.id === selectedTemplateId;
            
            // Calculate offset for carousel effect
            const offset = (index - activeIndex) * 100;
            
            return (
              <div
                key={template.id}
                className={`transform transition-all duration-300 ${isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-50'}`}
                style={{ transform: `translateX(${offset}%) scale(${isActive ? 1 : 0.9})` }}
              >
                <Card 
                  className={`relative cursor-pointer transition-all overflow-hidden
                    ${isSelected ? 'ring-4 ring-primary' : ''}
                    ${isActive ? 'shadow-xl' : 'shadow-md'}`}
                  onClick={() => setSelectedTemplateId(template.id)}
                >
                  {/* Template Preview Image */}
                  <div className="w-[300px] h-[450px] bg-card border-b">
                    <img 
                      src={template.imgSrc || DEFAULT_TEMPLATE_IMAGES[index % DEFAULT_TEMPLATE_IMAGES.length]} 
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Template Info */}
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="font-semibold">{template.name}</h3>
                      {isActive ? (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {template.description || `Template #${template.id}`}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground truncate">
                          {template.description || `Template #${template.id}`}
                        </p>
                      )}
                    </div>
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mb-8">
        {TEMPLATES.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex ? 'bg-primary w-4' : 'bg-muted'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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
              {t('pickTemplate.creating', 'Creating your CV...')}
            </>
          ) : (
            t('pickTemplate.continue', 'Continue with this template')
          )}
        </Button>
      </div>
    </div>
    </div>
  );
}