
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Unit } from '@/lib/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { useEffect, useState } from 'react';

interface UnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: Unit | null;
}

export function UnitModal({ isOpen, onClose, unit }: UnitModalProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!unit) return null;

  const statusChartData = [
    { name: 'Signal', value: unit.signal, fill: 'hsl(var(--chart-1))' },
    { name: 'Battery', value: unit.battery, fill: 'hsl(var(--chart-2))' },
  ];
  
  const tempHistoryChartData = unit.tempHistory.map((temp, index) => ({
      time: `T-${23-index}h`,
      temp: temp
  }))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{unit.name}</DialogTitle>
          <DialogDescription>
            Details for {unit.name}. Capacity: {unit.capacity}, Temp Range: {unit.tempRange}°F.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Left Column: Current Status */}
            <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                      <span className="text-sm text-muted-foreground">Temperature</span>
                      <span className="text-3xl font-bold">{unit.currentTemp}°F</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge variant={unit.status === 'Online' ? 'default' : 'destructive'} className="text-lg mt-1">
                        {unit.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="h-64 w-full">
                    {isClient ? <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={statusChartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis type="category" dataKey="name" width={60} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" barSize={40} />
                      </BarChart>
                    </ResponsiveContainer> : <div>Loading Chart...</div>}
                  </div>
            </div>

            {/* Right Column: Temp History */}
            <div className="space-y-4">
                <h4 className="font-semibold text-center text-muted-foreground">Temp Trend (24h)</h4>
                 <div className="h-[280px] w-full">
                   {isClient ? <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={tempHistoryChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="temp" stroke="hsl(var(--primary))" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer> : <div>Loading Chart...</div>}
                </div>
            </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
