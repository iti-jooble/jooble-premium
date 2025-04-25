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
  MoreVertical,
} from "lucide-react";
import { NavItem } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  {
    path: "/cover-letter",
    label: "Cover Letter",
    icon: <MailIcon className="h-4 w-4" />,
  },
];

const SideMenu = () => {
  const [location] = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col z-10 h-screen">
      <div className="p-4 border-b border-neutral-100">
        <div className="flex items-center">
          <div className="text-blue-600 font-bold text-2xl mr-2">F</div>
          <div className="text-neutral-800 font-bold text-2xl">fitly</div>
        </div>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            path={item.path}
            label={item.label}
            icon={item.icon}
            isActive={location === item.path}
          />
        ))}
      </nav>

      <div className="mt-auto">
        {/* Upgrade to Premium section */}
        <div className="bg-gray-50 mx-3 mb-3 rounded-md p-3">
          <div className="text-sm font-medium text-gray-800 mb-1">Upgrade to Premium</div>
          <div className="text-xs text-gray-600 mb-2">Description</div>
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => window.location.href = "/paywall"}
          >
            Upgrade
          </Button>
        </div>

        {/* Profile section */}
        <Accordion
          type="single" 
          collapsible
          className="border-t border-gray-200"
        >
          <AccordionItem value="profile" className="border-b-0">
            <div className="px-4 py-2 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden mr-3">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">My profile</p>
                <p className="text-xs text-gray-500">Free</p>
              </div>
              <AccordionTrigger className="p-0 hover:no-underline">
                <MoreVertical className="h-5 w-5 text-gray-400" />
              </AccordionTrigger>
            </div>
            <AccordionContent className="pt-0">
              <div className="pl-4 pb-2">
                <ul className="space-y-1">
                  <li>
                    <Link href="/settings">
                      <div className="flex items-center py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                        <SettingsIcon className="h-4 w-4 mr-3 text-gray-500" />
                        Settings
                      </div>
                    </Link>
                  </li>
                  <li>
                    <button className="w-full flex items-center py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                      <LogOutIcon className="h-4 w-4 mr-3 text-gray-500" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
    <div className="mx-3 mb-1">
      <Link href={path}>
        <div className={`flex items-center px-4 py-3 rounded-md text-sm cursor-pointer ${
          isActive 
            ? 'bg-gray-100 text-gray-900' 
            : 'text-gray-800 hover:bg-gray-50'
        }`}>
          <span className="flex-shrink-0 mr-3 text-gray-500">
            {icon}
          </span>
          <span>{label}</span>
        </div>
      </Link>
    </div>
  );
};

export default SideMenu;
