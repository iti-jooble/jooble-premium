import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CvBuilderPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvBuilderPromoModal({ isOpen, onClose }: CvBuilderPromoModalProps) {
  const { t } = useTranslation();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {t("cvBuilderPromo.title", "Boost Your Job Applications")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t("cvBuilderPromo.subtitle", "Create a professional CV tailored to your target jobs")}
          </DialogDescription>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </svg>
          </div>
          
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              {t("cvBuilderPromo.description", "Our CV Builder helps you create professional CVs that match job requirements. Increase your chances of getting interviews with tailored CVs.")}
            </p>
            
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="bg-muted/50 p-3 rounded-lg text-center">
                <h4 className="font-medium text-primary">
                  {t("cvBuilderPromo.feature1.title", "Professional Templates")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("cvBuilderPromo.feature1.description", "Choose from expert-designed templates")}
                </p>
              </div>
              
              <div className="bg-muted/50 p-3 rounded-lg text-center">
                <h4 className="font-medium text-primary">
                  {t("cvBuilderPromo.feature2.title", "AI Suggestions")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("cvBuilderPromo.feature2.description", "Get smart content recommendations")}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2">
          <Button asChild variant="default" className="w-full sm:w-auto">
            <Link href="/cv-builder" onClick={onClose}>
              {t("cvBuilderPromo.startButton", "Start Building Your CV")}
            </Link>
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            {t("common.cancel", "Maybe Later")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}