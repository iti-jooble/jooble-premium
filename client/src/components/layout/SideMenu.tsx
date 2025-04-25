import { Link, useLocation } from "wouter";
import {
  FileEditIcon,
  FileSearchIcon,
  SearchIcon,
  LinkIcon,
  MailIcon,
  SettingsIcon,
  HelpCircleIcon,
  LogOutIcon,
  UserIcon,
  CompassIcon,
  SearchCheckIcon,
} from "lucide-react";
import { NavItem } from "@/types";
import { Separator } from "@/components/ui/separator";

const navItems: NavItem[] = [
  {
    path: "/jobs",
    label: "Jobs",
    icon: <SearchIcon className="h-4 w-4" />,
  },
  {
    path: "/resume",
    label: "Resume",
    icon: <FileEditIcon className="h-4 w-4" />,
  },
  //   {
  //     path: "/cv-review",
  //     label: "CV Review",
  //     icon: <FileSearchIcon className="h-4 w-4" />,
  //   },
  //   {
  //     path: "/cv-matching",
  //     label: "CV Matching",
  //     icon: <LinkIcon className="h-4 w-4" />,
  //   },
  //   {
  //     path: "/cover-letter",
  //     label: "Cover Letter",
  //     icon: <MailIcon className="h-4 w-4" />,
  //   },
];

const accountItems: NavItem[] = [
  {
    path: "/settings",
    label: "Settings",
    icon: <SettingsIcon className="h-4 w-4" />,
  },
  // {
  //   path: "/help",
  //   label: "Help",
  //   icon: <HelpCircleIcon className="h-4 w-4" />,
  // },
];

const SideMenu = () => {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col z-10 h-screen">
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <SearchCheckIcon className="h-10 w-10 relative z-10" />
          </div>
          <div>
            <h1
              className="font-black text-2xl tracking-widest text-neutral-800"
              style={{ fontStretch: "extra-expanded" }}
            >
              Fitly
            </h1>
            <p className="text-xs text-primary font-medium -mt-0.5">
              by Jooble
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Find your career fit with ease
        </p>
      </div>

      <nav className="flex-1 py-6">
        <div className="px-4 mb-4">
          <span className="text-xs uppercase font-medium text-muted-foreground tracking-wider">
            Navigation
          </span>
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            path={item.path}
            label={item.label}
            icon={item.icon}
            isActive={location === item.path}
          />
        ))}

        <div className="px-4 mt-8 mb-4">
          <span className="text-xs uppercase font-medium text-muted-foreground tracking-wider">
            Account
          </span>
        </div>

        {accountItems.map((item) => (
          <NavLink
            key={item.path}
            path={item.path}
            label={item.label}
            icon={item.icon}
            isActive={location === item.path}
          />
        ))}
      </nav>

      <Separator />
      <div className="p-4">
        <div className="flex items-center p-2">
          <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center mr-3">
            <UserIcon className="h-4 w-4 text-neutral-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-800">John Doe</p>
            <p className="text-xs text-muted-foreground">Premium Plan</p>
          </div>
          <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
            <LogOutIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

interface NavLinkProps {
  path: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const NavLink = ({ path, label, icon, isActive }: NavLinkProps) => {
  return (
    <div className={`relative mb-1 transition-all group`}>
      <div
        className={`absolute left-0 h-10 bg-primary-50 rounded-r-full transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
      <Link href={path}>
        <a className="flex items-center h-10 px-6 text-sm font-medium relative z-10">
          <span
            className={`mr-3 ${isActive ? "text-primary" : "text-neutral-500"}`}
          >
            {icon}
          </span>
          <span className={isActive ? "text-neutral-800" : "text-neutral-600"}>
            {label}
          </span>
        </a>
      </Link>
    </div>
  );
};

export default SideMenu;
