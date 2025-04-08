import React from "react";
import {
  FileEditIcon,
  FileIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toolsData } from "@/lib/data";
import { Link } from "wouter";

const HomePage = () => {
  return (
    <div className="p-6 sm:p-8 animate-in fade-in duration-300 bg-gradient-to-b from-background to-muted/20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, John
        </h1>
        <p className="text-muted-foreground mt-2">
          Your job search toolkit is ready to help you succeed.
        </p>
      </div>

      <div className="bg-gradient-to-r from-primary/90 to-primary rounded-xl p-6 text-primary-foreground mb-8 shadow-lg border border-primary/10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <h2 className="font-semibold text-xl mb-2">
              Create Your Professional CV
            </h2>
            <p className="opacity-90 max-w-md">
              Our CV Builder helps you craft a professional CV in minutes. Use our modern templates 
              and get instantly higher interview rates.
            </p>
            <Link href="/cv-builder">
              <a>
                <Button
                  size="lg"
                  className="mt-4 bg-white text-primary hover:bg-white/90"
                >
                  <FileEditIcon className="mr-2 h-4 w-4" />
                  Create Your CV
                </Button>
              </a>
            </Link>
          </div>
          <div className="flex flex-row md:flex-col items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="rounded-full bg-white/20 p-2">
                <FileIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Modern Templates</p>
                <p className="text-xs text-white/80">ATS-friendly formats</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="rounded-full bg-white/20 p-2">
                <CheckCircleIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">AI Assistance</p>
                <p className="text-xs text-white/80">Expert content suggestions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-neutral-800 mb-6">
        Job Search Toolkit
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolsData.map((tool) => (
          <Card
            key={tool.id}
            className="overflow-hidden shadow-sm hover:shadow-md transition-all group"
          >
            <div className="h-36 bg-neutral-100 relative">
              {tool.comingSoon && (
                <div className="absolute top-0 left-0 w-full h-full bg-neutral-800 bg-opacity-5 backdrop-blur-[1px] flex items-center justify-center z-10">
                  <Badge
                    variant="outline"
                    className="bg-neutral-800 text-white border-none"
                  >
                    Coming Soon
                  </Badge>
                </div>
              )}
              {tool.imageSrc && (
                <img
                  src={tool.imageSrc}
                  alt={tool.title}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg text-neutral-800">
                  {tool.title}
                </h3>
                <Badge variant={tool.badgeVariant} className="font-medium">
                  {tool.badgeText}
                </Badge>
              </div>
              <p className="text-neutral-600 text-sm mb-4">
                {tool.description}
              </p>
              <div className="flex justify-between items-center">
                <Link href={tool.comingSoon ? "#" : tool.path}>
                  <a
                    className={`text-sm font-medium flex items-center ${
                      tool.comingSoon
                        ? "text-neutral-500"
                        : "text-primary group-hover:underline"
                    }`}
                  >
                    {tool.comingSoon ? "Join Waitlist" : tool.linkText}
                    <ArrowRightIcon
                      className={`h-4 w-4 ml-1 ${
                        !tool.comingSoon &&
                        "transition-transform group-hover:translate-x-1"
                      }`}
                    />
                  </a>
                </Link>
                <span className="text-neutral-400 text-xs">
                  {tool.infoText}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
