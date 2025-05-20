import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserIcon, ShieldIcon, CreditCardIcon, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCreateCustomerPortalMutation } from "@/redux/api/paymentApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { openModal } from "@/redux/slices/uiSlice";
import { ModalType } from "@/constants/modals";

const Settings = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createCustomerPortal, { isLoading: isPortalLoading }] =
    useCreateCustomerPortalMutation();
  const { subscription } = useSelector((state: RootState) => state.user);

  const handleManagePlan = async () => {
    try {
      const returnUrl = `${window.location.origin}/settings`;
      const response = await createCustomerPortal({ returnUrl }).unwrap();

      if (response.redirectUrl) {
        window.location.href = response.redirectUrl;
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to open customer portal. Please try again.",
        variant: "destructive",
      });
      console.error("Customer portal creation failed:", err);
    }
  };

  const handleUpgradeClick = () => {
    dispatch(openModal({ type: ModalType.PAYWALL }));
  };

  return (
    <div className="p-6 animate-in fade-in duration-300 max-w-[1032px] m-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">
          {t("settings.title")}
        </h1>
        <p className="text-neutral-600 mt-1">{t("settings.subtitle")}</p>
      </div>

      <Tabs defaultValue="profile" className="mb-8">
        <TabsList className="mb-6 bg-transparent">
          <TabsTrigger value="profile" className="flex items-center">
            <UserIcon className="h-4 w-4 mr-2" />
            {t("settings.tabs.profile")}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <ShieldIcon className="h-4 w-4 mr-2" />
            {t("settings.tabs.security")}
          </TabsTrigger>
          {/* <TabsTrigger value="notifications" className="flex items-center">
            <BellIcon className="h-4 w-4 mr-2" />
            {t("settings.tabs.notifications")}
          </TabsTrigger> */}
          <TabsTrigger value="billing" className="flex items-center">
            <CreditCardIcon className="h-4 w-4 mr-2" />
            {t("settings.tabs.billing")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-3/12 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-primary-gradient text-primary-blue flex items-center justify-center mb-4">
                    <UserIcon className="h-16 w-16" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mb-2"
                    onClick={() => {
                      toast({
                        title: "Change Photo",
                        description: "This feature is not yet implemented.",
                      });
                    }}
                  >
                    Change Photo
                  </Button>
                  <p className="text-xs text-neutral-500">
                    JPG, GIF or PNG. Max size 1MB
                  </p>
                </div>

                <div className="md:w-9/12">
                  <h2 className="text-lg font-semibold mb-4">
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        First Name
                      </label>
                      <Input defaultValue="John" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Last Name
                      </label>
                      <Input defaultValue="Doe" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Email
                      </label>
                      <Input defaultValue="john.doe@example.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Phone
                      </label>
                      <Input defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="shadow-md mb-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Change Password</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Current Password
                  </label>
                  <Input type="password" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    New Password
                  </label>
                  <Input type="password" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Confirm New Password
                  </label>
                  <Input type="password" />
                </div>
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Email Notifications",
                    description:
                      "Receive email notifications for job matches, application updates, and more",
                  },
                  {
                    title: "Job Alerts",
                    description:
                      "Get notified when new jobs matching your profile are posted",
                  },
                  {
                    title: "Application Updates",
                    description: "Receive updates about your job applications",
                  },
                  {
                    title: "Product Updates",
                    description:
                      "Stay informed about new features and improvements",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-neutral-600">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center h-4">
                      <input type="checkbox" defaultChecked className="mr-2" />
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-end">
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="shadow-md mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {t("settings.billing.currentPlan.title")}
                </h2>
                {subscription.type == 1 ? (
                  <Badge className="bg-primary text-white">
                    {t("settings.billing.currentPlan.premiumBadge")}
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    {t("settings.billing.currentPlan.freeBadge")}
                  </Badge>
                )}
              </div>

              {subscription.type == 1 ? (
                <>
                  <p className="text-neutral-600 mb-4">
                    {t("settings.billing.currentPlan.premiumDescription")}
                  </p>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={handleManagePlan}
                      disabled={isPortalLoading}
                    >
                      {isPortalLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        t("settings.billing.currentPlan.manageButton")
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-neutral-600 mb-4">
                    {t("settings.billing.currentPlan.freeDescription")}
                  </p>
                  <Button onClick={handleUpgradeClick}>
                    {t("settings.billing.currentPlan.upgradeButton")}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
