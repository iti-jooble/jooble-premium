import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserIcon, ShieldIcon, BellIcon, CreditCardIcon, CheckIcon, AlertTriangleIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Settings = () => {
  const [isPremium, setIsPremium] = useState(true);
  const [unsubscribeDialogOpen, setUnsubscribeDialogOpen] = useState(false);
  const [unsubscribeSuccess, setUnsubscribeSuccess] = useState(false);
  const { toast } = useToast();
  
  const handleUnsubscribe = () => {
    // Here would be the API call to unsubscribe the user
    setIsPremium(false);
    setUnsubscribeDialogOpen(false);
    setUnsubscribeSuccess(true);
    
    toast({
      title: "Subscription Cancelled",
      description: "Your Premium plan has been cancelled successfully.",
      variant: "default",
    });
  };
  
  return (
    <div className="p-8 animate-in fade-in duration-300">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Settings</h1>
        <p className="text-neutral-600 mt-1">Manage your account preferences</p>
      </div>

      <Tabs defaultValue="profile" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="flex items-center">
            <UserIcon className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <ShieldIcon className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <BellIcon className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center">
            <CreditCardIcon className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-3/12 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-neutral-200 flex items-center justify-center mb-4">
                    <UserIcon className="h-16 w-16 text-neutral-500" />
                  </div>
                  <Button variant="outline" size="sm" className="mb-2">Change Photo</Button>
                  <p className="text-xs text-neutral-500">JPG, GIF or PNG. Max size 1MB</p>
                </div>
                
                <div className="md:w-9/12">
                  <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-sm font-medium mb-1 block">First Name</label>
                      <Input defaultValue="John" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Last Name</label>
                      <Input defaultValue="Doe" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Email</label>
                      <Input defaultValue="john.doe@example.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Phone</label>
                      <Input defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                  
                  <h2 className="text-lg font-semibold mb-4">Professional Information</h2>
                  
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Current Title</label>
                      <Input defaultValue="Senior Software Engineer" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Company</label>
                      <Input defaultValue="Tech Solutions Inc." />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Industry</label>
                      <Input defaultValue="Information Technology" />
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
          <Card className="shadow-sm mb-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Change Password</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="text-sm font-medium mb-1 block">Current Password</label>
                  <Input type="password" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">New Password</label>
                  <Input type="password" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Confirm New Password</label>
                  <Input type="password" />
                </div>
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Two-Factor Authentication</h2>
              <p className="text-neutral-600 mb-4">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <Button variant="outline">Enable 2FA</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Email Notifications",
                    description: "Receive email notifications for job matches, application updates, and more"
                  },
                  {
                    title: "Job Alerts",
                    description: "Get notified when new jobs matching your profile are posted"
                  },
                  {
                    title: "Application Updates",
                    description: "Receive updates about your job applications"
                  },
                  {
                    title: "Product Updates",
                    description: "Stay informed about new features and improvements"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-neutral-600">{item.description}</p>
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
          <Card className="shadow-sm mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Current Plan</h2>
                {isPremium ? (
                  <Badge className="bg-primary text-white">Premium</Badge>
                ) : (
                  <Badge variant="outline">Free</Badge>
                )}
              </div>
              
              {unsubscribeSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Unsubscribed Successfully</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>Your Premium subscription has been cancelled. You will continue to have access to Premium features until the end of your current billing period.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              
              {isPremium ? (
                <>
                  <p className="text-neutral-600 mb-4">
                    You are currently on the Premium plan, which includes all features and unlimited access.
                  </p>
                  <div className="flex space-x-3">
                    <Button variant="outline">Manage Plan</Button>
                    <Button 
                      variant="outline" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => setUnsubscribeDialogOpen(true)}
                    >
                      Cancel Subscription
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-neutral-600 mb-4">
                    You are currently on the Free plan. Upgrade to Premium for full access to all features.
                  </p>
                  <Button>Upgrade to Premium</Button>
                </>
              )}
            </CardContent>
          </Card>
          
          {isPremium && (
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 px-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-6 bg-neutral-200 rounded mr-3"></div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-xs text-neutral-500">Expires 06/2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <Button variant="outline" className="w-full">Add Payment Method</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Unsubscribe Confirmation Dialog */}
        <Dialog open={unsubscribeDialogOpen} onOpenChange={setUnsubscribeDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangleIcon className="h-5 w-5 text-amber-500" />
                <span>Cancel Premium Subscription</span>
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel your Premium subscription? You'll lose access to premium features after your current billing period ends.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-muted/50 rounded-md p-4">
              <h4 className="font-medium text-sm mb-2">You will lose access to:</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Unlimited CV creation
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Expert CV review and feedback
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Advanced job matching
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  AI-powered cover letter generator
                </li>
              </ul>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setUnsubscribeDialogOpen(false)}>
                Keep Subscription
              </Button>
              <Button variant="destructive" onClick={handleUnsubscribe}>
                Cancel Subscription
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Tabs>
    </div>
  );
};

export default Settings;
