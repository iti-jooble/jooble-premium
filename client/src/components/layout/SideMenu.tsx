import { Link, useLocation } from "wouter";
import {
  FileEditIcon,
  SearchIcon,
  MailIcon,
  SettingsIcon,
  LogOutIcon,
  MoreVertical,
} from "lucide-react";
import { NavItem } from "@/types";
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
  // {
  //   path: "/cover-letter",
  //   label: "Cover Letter",
  //   icon: <MailIcon className="h-4 w-4" />,
  // },
];

const SideMenu = () => {
  const [location] = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col z-10 h-screen">
      <div className="p-4 border-b border-neutral-100">
        <div className="flex items-center">
          <img src="/images/logo.svg" alt="Fitly" />
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
        <div className="bg-primary-background mx-3 mb-3 rounded-xl p-3">
          <div className="text-md font-bold text-gray-800 mb-1">
            Upgrade to Premium
          </div>
          <div className="text-xs text-gray-600 mb-2">
            Get access to exclusive job features by upgrading to premium.
          </div>
          <Button
            className="w-full bg-primary-blue hover:bg-blue-700"
            onClick={() => (window.location.href = "/paywall")}
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
            <AccordionTrigger
              className="p-0 hover:no-underline"
              withChevron={false}
            >
              <div className="px-4 py-4 flex items-center justify-between w-full">
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden mr-3">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-sm font-bold text-gray-900">
                      My profile
                    </p>
                    <p className="text-xs text-gray-500">Free</p>
                  </div>
                </div>
                <MoreVertical className="h-5 w-5 text-gray-400" />
              </div>
            </AccordionTrigger>
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
        <div
          className={`flex items-center px-4 py-3 rounded-xl text-md font-bold cursor-pointer ${
            isActive
              ? "bg-primary-background text-gray-900"
              : "text-gray-800 hover:bg-primary-background"
          }`}
        >
          <span className="flex-shrink-0 mr-3 text-gray-900">{icon}</span>
          <span>{label}</span>
        </div>
      </Link>
    </div>
  );
};

export default SideMenu;
