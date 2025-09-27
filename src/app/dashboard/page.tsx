
'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Bot,
  Settings,
  Zap,
  Thermometer,
  Building as BuildingIcon,
  AlertTriangle,
  X,
  ShieldAlert,
  Wifi,
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
import { EnergonAssistant } from '@/components/EnergonAssistant';
import { mockData } from '@/lib/data';
import type { Building } from '@/lib/types';
import { Progress } from '@/components/ui/progress';

function getAlertColor(alerts: { critical: number; warning: number }) {
  if (alerts.critical > 0) {
    return 'border-destructive/50 ring-2 ring-destructive/20';
  }
  if (alerts.warning > 0) {
    return 'border-yellow-500/50 ring-2 ring-yellow-500/20';
  }
  return 'border-green-500/50';
}

function getAlertBg(alerts: { critical: number; warning: number }) {
  if (alerts.critical > 0) {
    return 'bg-red-500/10 dark:bg-red-900/20';
  }
  if (alerts.warning > 0) {
    return 'bg-yellow-500/10 dark:bg-yellow-900/20';
  }
  return 'bg-green-500/10 dark:bg-green-900/20';
}

function DashboardView({ buildings, currentTime }: { buildings: Building[], currentTime: Date | null }) {
    const totalEnergyToday = buildings.reduce((acc, b) => acc + b.energyUsage.today, 0);
    const avgBuildingTemp = buildings.length > 0 ? Math.round(buildings.reduce((acc, b) => acc + b.avgTemp, 0) / buildings.length) : 0;
    const totalAlerts = buildings.reduce((acc, b) => acc + b.alerts.critical + b.alerts.warning, 0);
    const totalOnlineUnits = buildings.reduce((acc, b) => acc + b.onlineUnits, 0);
    const totalUnits = buildings.reduce((acc, b) => acc + b.totalUnits, 0);
    const totalCriticalAlerts = buildings.reduce((acc, b) => acc + b.alerts.critical, 0);
    const isClient = currentTime !== null;
    
    return (
        <main className="flex-1 p-4 md:p-8">
            {/* Header */}
            <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Buildings Overview
                </h1>
              </div>

              <div className="text-sm text-muted-foreground">
                {isClient && currentTime
                    ? `${currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} ${currentTime.toLocaleTimeString()}`
                    : 'Loading...'}
              </div>
            </header>

            {/* Summary Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Buildings</CardTitle>
                        <BuildingIcon className="w-4 h-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{buildings.length}</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Energy (Today)</CardTitle>
                        <Zap className="w-4 h-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalEnergyToday} kWh</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Temp</CardTitle>
                        <Thermometer className="w-4 h-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{avgBuildingTemp}°F</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Units Online</CardTitle>
                        <Wifi className="w-4 h-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOnlineUnits} / {totalUnits}</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
                        <AlertTriangle className="w-4 h-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalAlerts}</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                        <ShieldAlert className="w-4 h-4 text-destructive"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-destructive">{totalCriticalAlerts}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Buildings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {buildings.map((building) => (
                <Link href={`/dashboard/building/${building.id}`} key={building.id} className="flex">
                  <Card
                    className={`w-full rounded-2xl shadow-soft transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col ${getAlertColor(building.alerts)} ${getAlertBg(building.alerts)}`}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl font-bold flex justify-between items-center">
                          {building.name}
                           <div className="flex gap-2">
                               {building.alerts.critical > 0 && <div className="text-xs font-bold text-destructive-foreground bg-destructive rounded-full px-2 py-1">{building.alerts.critical}</div>}
                               {building.alerts.warning > 0 && <div className="text-xs font-bold text-alert-yellow-foreground bg-alert-yellow rounded-full px-2 py-1">{building.alerts.warning}</div>}
                          </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-around space-y-4 text-sm">
                       <div className="flex justify-between items-center">
                         <span className="text-muted-foreground flex items-center gap-2"><Zap className="w-4 h-4"/>Energy (Today)</span>
                         <span className="font-bold">{building.energyUsage.today} kWh</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="text-muted-foreground flex items-center gap-2"><Thermometer className="w-4 h-4"/>Avg. Temp</span>
                         <span className="font-bold">{building.avgTemp}°F</span>
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between items-center">
                              <span className="text-muted-foreground flex items-center gap-2"><Wifi className="w-4 h-4"/>Units Online</span>
                              <span className="font-bold">{building.onlineUnits} / {building.totalUnits}</span>
                          </div>
                          <Progress value={(building.onlineUnits / building.totalUnits) * 100} className="h-2" />
                       </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
        </main>
    );
}

function EnergonView() {
     const router = useRouter();
    return (
        <main className="flex-1 relative h-screen">
             <button onClick={() => router.push('/dashboard')} className="absolute top-4 right-4 z-10 bg-background/50 p-2 rounded-full hover:bg-muted">
                <X className="w-6 h-6"/>
                <span className="sr-only">Close Chat</span>
            </button>
            <EnergonAssistant isFullScreen={true} />
        </main>
    )
}

function DashboardContent() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  const searchParams = useSearchParams();
  const showChat = searchParams.get('chat') === 'true';

  useEffect(() => {
    setBuildings(mockData.buildings);
    // Set initial time
    if (typeof window !== 'undefined') {
        setCurrentTime(new Date());
    }
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (showChat) {
    return <EnergonView />;
  }

  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar>
            <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard" isActive={!showChat}>
                <LayoutDashboard />
                Dashboard
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard?chat=true" isActive={showChat}>
                <Bot />
                Energon
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton href="/settings">
                <Settings />
                Settings
                </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenu>
        </Sidebar>
        <SidebarInset>
            <DashboardView buildings={buildings} currentTime={currentTime} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
