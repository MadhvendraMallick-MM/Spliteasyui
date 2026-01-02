import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Smartphone,
  Bell,
  Shield,
  Star,
  HeadphonesIcon,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { NavigationState } from "../../App";

interface SettingsProps {
  onNavigate: (state: NavigationState) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  const accountSettings = [
    {
      icon: User,
      label: "Account ID",
      value: "user_2026_1234",
      action: "Edit",
    },
    {
      icon: Mail,
      label: "Email",
      value: "you@example.com",
      action: "Change",
    },
    {
      icon: Lock,
      label: "Password",
      value: "••••••••",
      action: "Change",
    },
  ];

  const appSettings = [
    {
      icon: Smartphone,
      label: "Device Settings",
      hasSwitch: false,
    },
    {
      icon: Bell,
      label: "Notifications",
      hasSwitch: true,
      enabled: true,
    },
    {
      icon: Shield,
      label: "Security & Privacy",
      hasSwitch: false,
    },
  ];

  const otherOptions = [
    {
      icon: Star,
      label: "Rate the App",
      action: "Give Feedback",
    },
    {
      icon: HeadphonesIcon,
      label: "Customer Service",
      action: "Get Help",
    },
  ];

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-b-[2rem] p-6 pb-8 shadow-xl mb-6">
        <Button
          variant="ghost"
          onClick={() => onNavigate({ page: "dashboard" })}
          className="mb-4 text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-4xl">😊</span>
          </div>
          <div>
            <h1 className="text-white mb-1">Your Profile</h1>
            <p className="text-white/80">
              Manage your account settings
            </p>
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-white/80 mb-1">
                Total Expenses
              </p>
              <p className="text-white text-2xl">₹24,500</p>
              <p className="text-white/70 text-sm mt-1">
                Across 3 groups
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-6 space-y-6">
        {/* Account Settings */}
        <div>
          <h2 className="mb-3 px-1">Account Settings</h2>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0 divide-y">
              {accountSettings.map((setting, index) => {
                const Icon = setting.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 hover:bg-purple-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="mb-0.5">
                          {setting.label}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {setting.value}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600 text-sm">
                        {setting.action}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* App Settings */}
        <div>
          <h2 className="mb-3 px-1">App Settings</h2>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0 divide-y">
              {appSettings.map((setting, index) => {
                const Icon = setting.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 hover:bg-purple-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <p>{setting.label}</p>
                    </div>
                    {setting.hasSwitch ? (
                      <Switch
                        defaultChecked={setting.enabled}
                      />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Other Options */}
        <div>
          <h2 className="mb-3 px-1">Support & Feedback</h2>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0 divide-y">
              {otherOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 hover:bg-purple-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-teal-100 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-green-600" />
                      </div>
                      <p>{option.label}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 text-sm">
                        {option.action}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50"
          size="lg"
        >
          Log Out
        </Button>

        {/* App Version */}
        <p className="text-center text-gray-400 text-sm">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
}