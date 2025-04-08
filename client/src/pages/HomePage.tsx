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
        <h1 className="text-3xl font-bold tracking-tight">Welcome, John</h1>
        <p className="text-muted-foreground mt-2">
          Your job search toolkit is ready to help you succeed.
        </p>
      </div>

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
