import { Link, useLocation } from "wouter";
import React from "react";
import {
  FileEditIcon,
  SearchIcon,
  SettingsIcon,
  LogOutIcon,
  MoreVertical,
  User,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logout as logoutLocaly } from "@/redux/slices/userSlice";
import { useLogoutMutation } from "@/redux/api/authApiSlice";
import { userSelectors } from "@/redux/selectors";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import { openModal } from "@/redux/slices/uiSlice";
import { ModalType } from "@/constants/modals";

export interface NavItem {
  path: string;
  label: string;
  Icon: React.FC<{ stroke?: string; className?: string }>;
}

const navItems: NavItem[] = [
  {
    path: "/jobs",
    label: "Jobs",
    Icon: ({ className, stroke }) => (
      <SearchIcon
        className={cn("h-4 w-4", className)}
        {...(stroke && { stroke })}
      />
    ),
  },
  {
    path: "/resume",
    label: "Resume",
    Icon: ({ className, stroke }) => (
      <FileEditIcon
        className={cn("h-4 w-4", className)}
        {...(stroke && { stroke })}
      />
    ),
  },
];

const SideMenu = () => {
  const [location] = useLocation();
  const dispatch = useAppDispatch();
  const [logoutByServer] = useLogoutMutation();
  const user = useAppSelector(userSelectors.getUserSelector);

  const logout = () => {
    dispatch(logoutLocaly());
    logoutByServer();
  };

  const handleUpgradeClick = () => {
    dispatch(openModal({ type: ModalType.PAYWALL }));
  };

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col z-10 h-screen">
      <div className="p-4 border-b border-neutral-100">
        <div className="flex items-start">
          <img
            src="/images/logo.svg"
            alt="Fitly Logo"
            className="relative top-[2px] mr-2"
          />
          <img src="/images/logo-name.svg" alt="Fitly" />
        </div>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            path={item.path}
            label={item.label}
            Icon={item.Icon}
            isActive={location === item.path}
          />
        ))}
        
        {/* Coming Soon Features Section */}
        <div className="mt-6 relative">
          {/* Blurred Overlay */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <Rocket className="text-blue-500 mb-2" size={24} />
            <h3 className="text-lg font-bold text-gray-900">More features</h3>
            <p className="text-gray-800 font-medium">coming soon</p>
          </div>
          
          {/* Fake Menu Items (will be blurred) */}
          <div className="mx-3 mb-1">
            <div className="flex items-center px-4 py-3 rounded-xl text-md font-bold text-gray-800">
              <span className="flex-shrink-0 mr-3 text-gray-900">
                <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
              </span>
              <span>Feature 1</span>
            </div>
          </div>
          
          <div className="mx-3 mb-1">
            <div className="flex items-center px-4 py-3 rounded-xl text-md font-bold text-gray-800">
              <span className="flex-shrink-0 mr-3 text-gray-900">
                <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
              </span>
              <span>Feature 2</span>
            </div>
          </div>
          
          <div className="mx-3 mb-1">
            <div className="flex items-center px-4 py-3 rounded-xl text-md font-bold text-gray-800">
              <span className="flex-shrink-0 mr-3 text-gray-900">
                <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
              </span>
              <span>Feature 3</span>
            </div>
          </div>
        </div>
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
          <Button className="w-full" onClick={handleUpgradeClick}>
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
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden mr-3">
                    {false ? (
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary-gradient flex items-center justify-center text-primary-blue">
                        {user.firstName ? (
                          <span>
                            {user.firstName ? user.firstName.charAt(0) : ""}
                            {user.lastName ? user.lastName.charAt(0) : ""}
                          </span>
                        ) : (
                          <User className="h-5 w-5 text-primary-blue" />
                        )}
                      </div>
                    )}
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
              <div className="px-4 pb-2">
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
                    <button
                      className="w-full flex items-center py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={logout}
                    >
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
  Icon: React.FC<{ stroke?: string; className?: string }>;
  isActive: boolean;
}

const NavLink = ({ path, label, Icon, isActive }: NavLinkProps) => {
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
          <span className="flex-shrink-0 mr-3 text-gray-900">
            <Icon {...(isActive && { stroke: "#5D55FA" })} />
          </span>
          <span>{label}</span>
        </div>
      </Link>
    </div>
  );
};

export default SideMenu;
