
'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import {
  LayoutDashboard,
  Bot,
  Settings,
  ChevronLeft,
  Zap,
  AreaChart,
} from 'lucide-react';
import Link from 'next/link';
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
import { UnitModal } from '@/components/dashboard/unit-modal';
import { mockData } from '@/lib/data';
import type { Building, Unit } from '@/lib/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { EnergonAssistant } from '@/components/EnergonAssistant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


function getAlertColor(alert: 'green' | 'yellow' | 'red') {
  switch (alert) {
    case 'green':
      return 'bg-alert-green text-alert-green-foreground';
    case 'yellow':
      return 'bg-alert-yellow text-alert-yellow-foreground';
    case 'red':
      return 'bg-alert-red text-alert-red-foreground';
  }
}

export default function BuildingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [buildingData, setBuildingData] = useState<Building | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [buildingId, setBuildingId] = useState<string>('');

  useEffect(() => {
    params.then(({ id }) => {
      setBuildingId(id);
    });
  }, [params]);

  useEffect(() => {
    if (buildingId) {
      const foundBuilding = mockData.buildings.find(b => b.id === buildingId);
      if (foundBuilding) {
        setBuildingData(foundBuilding);
      }
    }
    setIsClient(true);
  }, [buildingId]);

  const handleCardClick = (unit: Unit) => {
    setSelectedUnit(unit);
    setModalOpen(true);
  };
  
  if (isClient && !buildingData) {
    notFound();
  }

  const avgTempHistory = buildingData?.avgTempHistory.map((temp, index) => ({
      name: `Day ${index + 1}`,
      temp: temp
  })) ?? [];
  
  const energyUsageHistory = buildingData?.energyUsageHistory.map((usage, index) => ({
      name: `Day ${index + 1}`,
      usage: usage
  })) ?? [];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton href="/dashboard" isActive>
              <LayoutDashboard />
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton href="/dashboard?chat=true">
              <Bot />
              Energon
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton href="#">
              <Settings />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>
      <SidebarInset>
        <main className="flex-1 p-4 md:p-8">
          {/* Header */}
          <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <ChevronLeft />
                </Link>
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {buildingData?.name ?? 'Loading...'}
              </h1>
            </div>
             <div className="flex items-center gap-2">
                 {buildingData && buildingData.alerts.critical > 0 && <div className="text-sm font-bold text-destructive-foreground bg-destructive rounded-full px-3 py-1.5">{buildingData.alerts.critical} Critical</div>}
                 {buildingData && buildingData.alerts.warning > 0 && <div className="text-sm font-bold text-alert-yellow-foreground bg-alert-yellow rounded-full px-3 py-1.5">{buildingData.alerts.warning} Warning</div>}
            </div>
          </header>

          {/* Building-wide Charts */}
          <Card className="mb-8 rounded-2xl shadow-soft">
             <CardHeader>
                <CardTitle>Building-wide Analytics</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="temp">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="temp"><AreaChart className="mr-2"/>Avg. Temperature</TabsTrigger>
                        <TabsTrigger value="energy"><Zap className="mr-2"/>Energy Usage</TabsTrigger>
                    </TabsList>
                    <TabsContent value="temp">
                        {isClient && <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={avgTempHistory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="temp" name="Avg Temperature" stroke="hsl(var(--primary))" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>}
                    </TabsContent>
                     <TabsContent value="energy">
                        {isClient && <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={energyUsageHistory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="usage" name="Energy (kWh)" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>}
                    </TabsContent>
                </Tabs>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-bold mb-4">Equipment Units</h2>
          {/* Equipment Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {buildingData?.units.map((unit) => (
              <Card
                key={unit.id}
                className={`rounded-2xl shadow-soft transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer ${getAlertColor(unit.alert)}`}
                onClick={() => handleCardClick(unit)}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-bold">{unit.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="text-4xl font-extrabold">{unit.currentTemp}°F</div>
                   <div className={`mt-2 text-sm font-semibold ${unit.status === 'Online' ? 'text-green-600' : 'text-red-600'}`}>{unit.status}</div>
                </CardContent>
              </Card>
            ))}
          </div>

        </main>

        <UnitModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          unit={selectedUnit}
        />
        <EnergonAssistant />
      </SidebarInset>
    </SidebarProvider>
  );
}
