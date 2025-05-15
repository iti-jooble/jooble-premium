import { ReactNode } from "react";

export interface ToolCard {
  id: string;
  title: string;
  description: string;
  path: string;
  linkText: string;
  infoText: string;
  imageSrc: string;
  badgeText: string;
  badgeVariant: "default" | "secondary" | "outline" | "destructive";
  comingSoon?: boolean;
}

export interface ActivityItem {
  id: string;
  text: string;
  date: string;
  icon: ReactNode;
  iconBgColor: string;
}
