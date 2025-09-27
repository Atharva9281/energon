'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Settings,
  User,
  Bell,
  Palette,
  Shield,
  Monitor,
  Moon,
  Sun,
  Smartphone,
  ArrowLeft,
  Save,
  RotateCcw,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'system', label: 'System', icon: Monitor },
];

export default function SettingsPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'John Doe',
      email: 'john.doe@company.com',
      title: 'Facilities Manager',
      department: 'Operations',
      phone: '+1 (555) 123-4567',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      alertSounds: false,
      criticalAlerts: true,
      weeklyReports: true,
      maintenanceReminders: true,
      temperatureThresholds: true,
    },
    appearance: {
      theme: 'system',
      language: 'english',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      temperatureUnit: 'fahrenheit',
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordExpiry: '90',
      loginAlerts: true,
    },
    system: {
      dataRetention: '12',
      autoBackup: true,
      debugMode: false,
      apiRateLimit: '1000',
    },
  });

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/api/placeholder/80/80" alt="Profile" />
          <AvatarFallback className="text-lg">JD</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={settings.profile.name}
                onChange={(e) => updateSetting('profile', 'name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.profile.email}
                onChange={(e) => updateSetting('profile', 'email', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={settings.profile.title}
                onChange={(e) => updateSetting('profile', 'title', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={settings.profile.department}
                onChange={(e) => updateSetting('profile', 'department', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={settings.profile.phone}
              onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
              className="max-w-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">General Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
            { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive browser push notifications' },
            { key: 'alertSounds', label: 'Alert Sounds', description: 'Play sounds for notifications' },
          ].map(({ key, label, description }) => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
              <div className="space-y-1">
                <Label className="text-sm font-medium">{label}</Label>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
              <Switch
                checked={settings.notifications[key as keyof typeof settings.notifications] as boolean}
                onCheckedChange={(checked) => updateSetting('notifications', key, checked)}
              />
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Alert Preferences</h3>
        <div className="space-y-4">
          {[
            { key: 'criticalAlerts', label: 'Critical Alerts', description: 'High priority system alerts' },
            { key: 'weeklyReports', label: 'Weekly Reports', description: 'Weekly summary reports' },
            { key: 'maintenanceReminders', label: 'Maintenance Reminders', description: 'Scheduled maintenance notifications' },
            { key: 'temperatureThresholds', label: 'Temperature Alerts', description: 'Temperature threshold violations' },
          ].map(({ key, label, description }) => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
              <div className="space-y-1">
                <Label className="text-sm font-medium">{label}</Label>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
              <Switch
                checked={settings.notifications[key as keyof typeof settings.notifications] as boolean}
                onCheckedChange={(checked) => updateSetting('notifications', key, checked)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Theme</Label>
          <Select
            value={settings.appearance.theme}
            onValueChange={(value) => updateSetting('appearance', 'theme', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  Light
                </div>
              </SelectItem>
              <SelectItem value="dark">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  Dark
                </div>
              </SelectItem>
              <SelectItem value="system">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  System
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Language</Label>
          <Select
            value={settings.appearance.language}
            onValueChange={(value) => updateSetting('appearance', 'language', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Timezone</Label>
          <Select
            value={settings.appearance.timezone}
            onValueChange={(value) => updateSetting('appearance', 'timezone', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="America/New_York">Eastern Time</SelectItem>
              <SelectItem value="America/Chicago">Central Time</SelectItem>
              <SelectItem value="America/Denver">Mountain Time</SelectItem>
              <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
              <SelectItem value="Europe/London">London</SelectItem>
              <SelectItem value="Europe/Paris">Paris</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Date Format</Label>
          <Select
            value={settings.appearance.dateFormat}
            onValueChange={(value) => updateSetting('appearance', 'dateFormat', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 sm:col-span-2">
          <Label>Temperature Unit</Label>
          <Select
            value={settings.appearance.temperatureUnit}
            onValueChange={(value) => updateSetting('appearance', 'temperatureUnit', value)}
          >
            <SelectTrigger className="max-w-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
              <SelectItem value="celsius">Celsius (°C)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Two-Factor Authentication</Label>
            <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
          </div>
          <Switch
            checked={settings.security.twoFactorAuth}
            onCheckedChange={(checked) => updateSetting('security', 'twoFactorAuth', checked)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Login Alerts</Label>
            <p className="text-xs text-muted-foreground">Get notified of new login attempts</p>
          </div>
          <Switch
            checked={settings.security.loginAlerts}
            onCheckedChange={(checked) => updateSetting('security', 'loginAlerts', checked)}
          />
        </div>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Session Timeout (minutes)</Label>
          <Select
            value={settings.security.sessionTimeout}
            onValueChange={(value) => updateSetting('security', 'sessionTimeout', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Password Expiry (days)</Label>
          <Select
            value={settings.security.passwordExpiry}
            onValueChange={(value) => updateSetting('security', 'passwordExpiry', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 days</SelectItem>
              <SelectItem value="60">60 days</SelectItem>
              <SelectItem value="90">90 days</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Auto Backup</Label>
            <p className="text-xs text-muted-foreground">Automatically backup system data</p>
          </div>
          <Switch
            checked={settings.system.autoBackup}
            onCheckedChange={(checked) => updateSetting('system', 'autoBackup', checked)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Debug Mode</Label>
            <p className="text-xs text-muted-foreground">Enable detailed logging for troubleshooting</p>
          </div>
          <Switch
            checked={settings.system.debugMode}
            onCheckedChange={(checked) => updateSetting('system', 'debugMode', checked)}
          />
        </div>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Data Retention (months)</Label>
          <Select
            value={settings.system.dataRetention}
            onValueChange={(value) => updateSetting('system', 'dataRetention', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6 months</SelectItem>
              <SelectItem value="12">12 months</SelectItem>
              <SelectItem value="24">24 months</SelectItem>
              <SelectItem value="36">36 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>API Rate Limit (requests/hour)</Label>
          <Select
            value={settings.system.apiRateLimit}
            onValueChange={(value) => updateSetting('system', 'apiRateLimit', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="500">500</SelectItem>
              <SelectItem value="1000">1000</SelectItem>
              <SelectItem value="2000">2000</SelectItem>
              <SelectItem value="5000">5000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'security':
        return renderSecuritySettings();
      case 'system':
        return renderSystemSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="hidden lg:flex">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard">
                <ArrowLeft />
                Back to Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <SidebarMenuItem key={section.id}>
                  <SidebarMenuButton 
                    href="#"
                    onClick={() => setActiveSection(section.id)}
                    isActive={activeSection === section.id}
                  >
                    <Icon />
                    {section.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </Sidebar>

        <SidebarInset className="flex-1">
          <main className="flex-1 p-4 md:p-8">
            {/* Mobile Header */}
            <div className="lg:hidden mb-6">
              <div className="flex items-center gap-4 mb-4">
                <SidebarTrigger />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/dashboard')}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Dashboard
                </Button>
              </div>
              
              {/* Mobile Tabs */}
              <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 h-auto p-1 gap-1">
                  {settingsSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <TabsTrigger 
                        key={section.id} 
                        value={section.id}
                        className="flex flex-col gap-1 py-2 px-1 text-xs min-w-0"
                      >
                        <Icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="truncate text-[10px] sm:text-xs">{section.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </Tabs>
            </div>

            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                    <Settings className="h-8 w-8" />
                    Settings
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Manage your account settings and preferences
                  </p>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="gap-2 flex-1 sm:flex-initial">
                    <RotateCcw className="h-4 w-4" />
                    <span className="hidden sm:inline">Reset</span>
                  </Button>
                  <Button size="sm" className="gap-2 flex-1 sm:flex-initial">
                    <Save className="h-4 w-4" />
                    <span className="hidden sm:inline">Save</span>
                  </Button>
                </div>
              </div>
            </header>

            {/* Content */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {(() => {
                    const currentSection = settingsSections.find(s => s.id === activeSection);
                    const Icon = currentSection?.icon || Settings;
                    return (
                      <>
                        <Icon className="h-5 w-5" />
                        {currentSection?.label || 'Settings'}
                      </>
                    );
                  })()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderContent()}
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}