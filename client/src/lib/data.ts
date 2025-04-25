import { ToolCard, ActivityItem } from "@/types";
import React from "react";
import { FileEditIcon, FileSearchIcon, MailIcon } from "lucide-react";

export const toolsData: ToolCard[] = [
  {
    id: "resume",
    title: "Resume",
    description:
      "Create a professional CV with customizable templates. Highlight your skills and experience to attract employers.",
    path: "/resume",
    linkText: "Get Started",
    infoText: "5 min",
    imageSrc:
      "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=500&h=200",
    badgeText: "Popular",
    badgeVariant: "default",
  },
  {
    id: "cv-review",
    title: "CV Review",
    description:
      "Get instant feedback on your CV with our AI-powered review system. Improve readability and ATS compatibility.",
    path: "/cv-review",
    linkText: "Review Now",
    infoText: "3 min",
    imageSrc:
      "https://images.unsplash.com/photo-1607968565043-36af90dde238?auto=format&fit=crop&q=80&w=500&h=200",
    badgeText: "AI-Powered",
    badgeVariant: "secondary",
  },
  {
    id: "jobs",
    title: "Jobs",
    description:
      "Search thousands of job listings from multiple sources in one place. Filter by location, salary, and more.",
    path: "/job-search",
    linkText: "Search Jobs",
    infoText: "10+ sources",
    imageSrc:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500&h=200",
    badgeText: "Updated",
    badgeVariant: "destructive",
  },
  {
    id: "cv-matching",
    title: "CV Matching",
    description:
      "Match your CV against job descriptions to identify strengths and gaps. Optimize your application for specific roles.",
    path: "/cv-matching",
    linkText: "Match CV",
    infoText: "96% accurate",
    imageSrc:
      "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?auto=format&fit=crop&q=80&w=500&h=200",
    badgeText: "Smart",
    badgeVariant: "default",
  },
  {
    id: "cover-letter",
    title: "Cover Letter Creator",
    description:
      "Generate personalized cover letters in minutes. Tailor your message to specific job descriptions and company values.",
    path: "/cover-letter",
    linkText: "Create Letter",
    infoText: "2 min",
    imageSrc:
      "https://images.unsplash.com/photo-1586282391129-76a6df230234?auto=format&fit=crop&q=80&w=500&h=200",
    badgeText: "AI-Assisted",
    badgeVariant: "secondary",
  },
  {
    id: "interview-prep",
    title: "Interview Prep",
    description:
      "Practice for interviews with AI-powered simulations. Get feedback on your answers and improve your performance.",
    path: "/interview-prep",
    linkText: "Join Waitlist",
    infoText: "Q1 2024",
    imageSrc:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=500&h=200",
    badgeText: "Beta",
    badgeVariant: "outline",
    comingSoon: true,
  },
];

export const recentActivities: ActivityItem[] = [
  {
    id: "activity-1",
    text: "You updated your Software Engineer CV",
    date: "Today at 10:23 AM",
    icon: React.createElement(FileEditIcon, {
      className: "h-5 w-5 text-primary",
    }),
    iconBgColor: "bg-primary-50",
  },
  {
    id: "activity-2",
    text: "You saved 5 new jobs matching your profile",
    date: "Yesterday at 4:45 PM",
    icon: React.createElement(FileSearchIcon, {
      className: "h-5 w-5 text-amber-600",
    }),
    iconBgColor: "bg-amber-50",
  },
  {
    id: "activity-3",
    text: "You created a cover letter for Product Manager at TechCorp",
    date: "Sep 28, 2023",
    icon: React.createElement(MailIcon, {
      className: "h-5 w-5 text-green-600",
    }),
    iconBgColor: "bg-green-50",
  },
];
