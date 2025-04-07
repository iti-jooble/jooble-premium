import React from 'react';
import { 
  SearchIcon, 
  BellIcon, 
  UserIcon, 
  ArrowRightIcon, 
  MoreHorizontalIcon 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toolsData, recentActivities } from "@/lib/data";
import { Link } from "wouter";

const HomePage = () => {
  return (
    <div className="p-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Welcome back, John</h1>
          <p className="text-neutral-600 mt-1">Your job search toolkit is ready to help you succeed.</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <SearchIcon className="h-4 w-4 absolute left-3 top-3 text-neutral-400" />
            <Input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 w-64"
            />
          </div>
          <Button variant="outline" size="icon" className="text-neutral-600">
            <BellIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary to-primary-600 rounded-xl p-6 text-white mb-8 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-semibold text-xl mb-1">Complete your profile</h2>
            <p className="opacity-90 max-w-md">A complete profile increases your chances of finding the perfect job by 75%.</p>
            <Button variant="secondary" className="mt-4 bg-white text-primary hover:bg-white/90">
              Complete Profile
            </Button>
          </div>
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-primary-400 flex items-center justify-center mr-2">
              <span className="font-bold text-2xl">68%</span>
            </div>
            <div className="w-16 h-16 flex items-center justify-center">
              <UserIcon className="h-10 w-10 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-neutral-800 mb-6">Job Search Toolkit</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolsData.map((tool) => (
          <Card key={tool.id} className="overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="h-36 bg-neutral-100 relative">
              {tool.comingSoon && (
                <div className="absolute top-0 left-0 w-full h-full bg-neutral-800 bg-opacity-5 backdrop-blur-[1px] flex items-center justify-center z-10">
                  <Badge variant="outline" className="bg-neutral-800 text-white border-none">
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
                <h3 className="font-semibold text-lg text-neutral-800">{tool.title}</h3>
                <Badge variant={tool.badgeVariant} className="font-medium">
                  {tool.badgeText}
                </Badge>
              </div>
              <p className="text-neutral-600 text-sm mb-4">
                {tool.description}
              </p>
              <div className="flex justify-between items-center">
                <Link href={tool.comingSoon ? "#" : tool.path}>
                  <a className={`text-sm font-medium flex items-center ${
                    tool.comingSoon 
                      ? "text-neutral-500" 
                      : "text-primary group-hover:underline"
                  }`}>
                    {tool.comingSoon ? "Join Waitlist" : tool.linkText}
                    <ArrowRightIcon className={`h-4 w-4 ml-1 ${
                      !tool.comingSoon && "transition-transform group-hover:translate-x-1"
                    }`} />
                  </a>
                </Link>
                <span className="text-neutral-400 text-xs">{tool.infoText}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 mb-4">
        <h2 className="text-xl font-semibold text-neutral-800 mb-6">Recent Activity</h2>
        
        <Card className="shadow-sm">
          <div className="px-6 py-4 border-b border-neutral-200 flex justify-between items-center">
            <h3 className="font-medium text-neutral-800">Your Activities</h3>
            <Button variant="link" className="text-primary p-0 h-auto">View All</Button>
          </div>
          
          <div>
            {recentActivities.map((activity, index) => (
              <React.Fragment key={activity.id}>
                {index > 0 && <Separator />}
                <div className="px-6 py-4 flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${activity.iconBgColor}`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-neutral-800">
                      {activity.text}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">{activity.date}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-neutral-600">
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
