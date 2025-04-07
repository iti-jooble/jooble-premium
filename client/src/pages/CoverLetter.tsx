import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MailIcon, FileTextIcon, CopyIcon, DownloadIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CoverLetter = () => {
  return (
    <div className="p-8 animate-in fade-in duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Cover Letter Creator</h1>
        <p className="text-neutral-600 mt-1">Generate personalized cover letters in minutes</p>
      </div>

      <Card className="shadow-sm mb-8">
        <CardContent className="p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <MailIcon className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Create a New Cover Letter</h2>
          <p className="text-neutral-600 max-w-md mb-6">
            Tailor your cover letter to specific job descriptions and company values using our AI-assisted creator.
          </p>
          <Button>Get Started</Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-6">Cover Letter Templates</h2>
      
      <Tabs defaultValue="professional" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="creative">Creative</TabsTrigger>
          <TabsTrigger value="modern">Modern</TabsTrigger>
          <TabsTrigger value="simple">Simple</TabsTrigger>
        </TabsList>
        
        <TabsContent value="professional">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Executive",
                description: "Formal template ideal for senior roles and traditional industries"
              },
              {
                title: "Corporate",
                description: "Professional template with balanced formality and readability"
              },
              {
                title: "Standard",
                description: "Classic professional layout suitable for most industries"
              }
            ].map((template, index) => (
              <Card key={index} className="overflow-hidden group">
                <div className="h-48 bg-neutral-100 flex items-center justify-center relative">
                  <FileTextIcon className="h-10 w-10 text-neutral-400" />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button variant="secondary" size="sm">Preview</Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{template.title}</h3>
                  <p className="text-sm text-neutral-600 mb-3">{template.description}</p>
                  <Button size="sm" variant="outline" className="w-full">Use Template</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="creative">
          <div className="flex items-center justify-center p-12">
            <p className="text-neutral-600">Select the Creative tab to view creative cover letter templates</p>
          </div>
        </TabsContent>
        
        <TabsContent value="modern">
          <div className="flex items-center justify-center p-12">
            <p className="text-neutral-600">Select the Modern tab to view modern cover letter templates</p>
          </div>
        </TabsContent>
        
        <TabsContent value="simple">
          <div className="flex items-center justify-center p-12">
            <p className="text-neutral-600">Select the Simple tab to view simple cover letter templates</p>
          </div>
        </TabsContent>
      </Tabs>

      <h2 className="text-xl font-semibold mb-4">Recent Cover Letters</h2>
      
      <Card className="shadow-sm">
        <div className="px-6 py-4 border-b border-neutral-200 flex justify-between items-center">
          <h3 className="font-medium text-neutral-800">Your Cover Letters</h3>
          <Button variant="link" className="text-primary p-0 h-auto">View All</Button>
        </div>
        
        <div className="divide-y divide-neutral-200">
          <div className="px-6 py-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary mr-4">
              <FileTextIcon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-800">Product Manager at TechCorp</p>
              <p className="text-xs text-neutral-500 mt-1">Created on Sep 28, 2023</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500">
                <CopyIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500">
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="px-6 py-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary mr-4">
              <FileTextIcon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-800">Software Engineer at DevInc</p>
              <p className="text-xs text-neutral-500 mt-1">Created on Sep 15, 2023</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500">
                <CopyIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500">
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CoverLetter;
