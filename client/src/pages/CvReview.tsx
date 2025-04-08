import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSearchIcon, UploadIcon, SearchCheckIcon, LayoutIcon, BookTextIcon, BarChart3Icon, AwardIcon, TrendingUpIcon, GanttChartIcon, ListChecksIcon } from "lucide-react";

const CvReview = () => {
  return (
    <div className="p-6 sm:p-8 animate-in fade-in duration-300 bg-gradient-to-b from-background to-muted/20">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight">CV Review</h1>
          <p className="text-muted-foreground mt-2">
            Get instant feedback on your CV with our AI-powered review system
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex justify-end">
          <Button
            size="lg"
            className="px-6 transition-all hover:shadow-md hover:scale-105"
          >
            <UploadIcon className="h-5 w-5 mr-2" />
            Upload CV
          </Button>
        </div>
      </div>

      <div className="mt-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden bg-card/80 text-center">
            <CardContent className="p-6 pt-8">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <SearchCheckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">
                <span className="text-primary">93%</span> Higher ATS Success
              </h3>
              <p className="text-muted-foreground">
                CVs optimized with our analyzer are 93% more likely to pass ATS filters
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden bg-card/80 text-center">
            <CardContent className="p-6 pt-8">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUpIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">
                <span className="text-primary">65%</span> More Interviews
              </h3>
              <p className="text-muted-foreground">
                Users report up to 65% more interview invitations after implementing our suggestions
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden bg-card/80 text-center">
            <CardContent className="p-6 pt-8">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <AwardIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">
                <span className="text-primary">85%</span> Better Targeting
              </h3>
              <p className="text-muted-foreground">
                Our keyword analysis helps align your CV with specific job requirements
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden bg-card/80 text-center">
            <CardContent className="p-6 pt-8">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BarChart3Icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">
                <span className="text-primary">40+</span> Analysis Points
              </h3>
              <p className="text-muted-foreground">
                We check over 40 critical factors that impact recruiter and ATS assessments
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden bg-card">
            <CardHeader className="pb-2">
              <h3 className="text-xl font-semibold">Technical Analysis</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
                  <GanttChartIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-base mb-1">ATS Compatibility</h4>
                  <p className="text-muted-foreground text-sm">
                    We analyze how ATS systems parse your CV, ensuring critical information is correctly extracted. 
                    This increases your chances of passing initial screenings by up to 75%.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
                  <LayoutIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-base mb-1">Format & Structure</h4>
                  <p className="text-muted-foreground text-sm">
                    Recruiters spend an average of 7 seconds scanning a CV. We ensure your formatting makes key information 
                    instantly visible and creates a professional impression.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
                  <ListChecksIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-base mb-1">Keyword Optimization</h4>
                  <p className="text-muted-foreground text-sm">
                    Our industry-specific keyword analysis identifies missing terms that both ATS systems and recruiters 
                    look for, increasing your match rate for relevant positions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden bg-card">
            <CardHeader className="pb-2">
              <h3 className="text-xl font-semibold">Content Analysis</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
                  <BookTextIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-base mb-1">Impact & Achievements</h4>
                  <p className="text-muted-foreground text-sm">
                    We analyze how well your CV demonstrates measurable impact rather than just listing responsibilities. 
                    Achievement-focused CVs are 52% more likely to generate interview calls.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
                  <BarChart3Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-base mb-1">Skills Relevance</h4>
                  <p className="text-muted-foreground text-sm">
                    We evaluate how well your skills align with your target roles and provide suggestions to highlight 
                    the most valuable competencies employers are seeking.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
                  <TrendingUpIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-base mb-1">Career Progression</h4>
                  <p className="text-muted-foreground text-sm">
                    We assess how clearly your CV demonstrates your professional growth and readiness for your 
                    target role, helping you position yourself as the ideal candidate.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-10 text-center">
          <Button
            size="lg"
            className="px-8 py-6 text-lg transition-all hover:shadow-md hover:scale-105"
          >
            <UploadIcon className="h-5 w-5 mr-2" />
            Start Your CV Review Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CvReview;
