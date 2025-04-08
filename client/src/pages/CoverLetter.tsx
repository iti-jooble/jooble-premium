import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MailIcon,
  FileTextIcon,
  CopyIcon,
  DownloadIcon,
  FileIcon,
  PencilIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CoverLetter = () => {
  return (
    <div className="p-6 sm:p-8 animate-in fade-in duration-300 bg-gradient-to-b from-background to-muted/20">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Cover Letter Creator
        </h1>
        <p className="text-muted-foreground mt-2">
          Generate personalized cover letters in minutes
        </p>
      </div>

      <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden bg-card mb-10">
        <CardContent className="p-8 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 ring-4 ring-primary/5">
            <MailIcon className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">
            Create a New Cover Letter
          </h2>
          <p className="text-muted-foreground max-w-md mb-8">
            Tailor your cover letter to specific job descriptions and company
            values using our AI-assisted creator.
          </p>
          <Button
            size="lg"
            className="px-6 transition-all hover:shadow-md hover:scale-105"
          >
            <PencilIcon className="h-5 w-5 mr-2" />
            Get Started
          </Button>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-6">Cover Letter Templates</h2>

      <Tabs defaultValue="professional" className="mb-10">
        <TabsList className="mb-6">
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
                description:
                  "Formal template ideal for senior roles and traditional industries",
              },
              {
                title: "Corporate",
                description:
                  "Professional template with balanced formality and readability",
              },
              {
                title: "Standard",
                description:
                  "Classic professional layout suitable for most industries",
              },
            ].map((template, index) => (
              <Card
                key={index}
                className="shadow-md border-border/30 border rounded-xl overflow-hidden group transition-all hover:shadow-lg"
              >
                <div className="h-48 bg-muted/40 flex items-center justify-center relative">
                  <div className="rounded-full bg-primary/10 p-3 ring-4 ring-primary/5">
                    <FileIcon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button variant="secondary" size="sm" className="shadow-lg">
                      Preview
                    </Button>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-medium text-lg mb-2">{template.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {template.description}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full transition-all hover:border-primary/70"
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="creative">
          <div className="flex items-center justify-center p-16 bg-card/50 rounded-lg border border-border/30">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <FileIcon className="h-8 w-8 text-primary opacity-70" />
              </div>
              <p className="text-muted-foreground">
                Select the Creative tab to view creative cover letter templates
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="modern">
          <div className="flex items-center justify-center p-16 bg-card/50 rounded-lg border border-border/30">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <FileIcon className="h-8 w-8 text-primary opacity-70" />
              </div>
              <p className="text-muted-foreground">
                Select the Modern tab to view modern cover letter templates
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="simple">
          <div className="flex items-center justify-center p-16 bg-card/50 rounded-lg border border-border/30">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <FileIcon className="h-8 w-8 text-primary opacity-70" />
              </div>
              <p className="text-muted-foreground">
                Select the Simple tab to view simple cover letter templates
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <h2 className="text-2xl font-semibold mb-6">Recent Cover Letters</h2>

      <Card className="shadow-md border-border/30 border rounded-xl overflow-hidden bg-card">
        <div className="px-6 py-4 border-b border-border/40 flex justify-between items-center bg-muted/40">
          <h3 className="font-medium text-lg flex items-center">
            <div className="rounded-full bg-primary/10 p-1.5 mr-2">
              <FileTextIcon className="h-5 w-5 text-primary" />
            </div>
            Your Cover Letters
          </h3>
          <Button variant="link" className="text-primary p-0 h-auto">
            View All
          </Button>
        </div>

        <div className="divide-y divide-border/40">
          <div className="px-6 py-5 flex items-center hover:bg-muted/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-5 ring-2 ring-primary/5">
              <FileTextIcon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">
                Product Manager at TechCorp
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Created on Sep 28, 2023
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary"
              >
                <CopyIcon className="h-4.5 w-4.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary"
              >
                <DownloadIcon className="h-4.5 w-4.5" />
              </Button>
            </div>
          </div>

          <div className="px-6 py-5 flex items-center hover:bg-muted/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-5 ring-2 ring-primary/5">
              <FileTextIcon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">
                Software Engineer at DevInc
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Created on Sep 15, 2023
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary"
              >
                <CopyIcon className="h-4.5 w-4.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary"
              >
                <DownloadIcon className="h-4.5 w-4.5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CoverLetter;
