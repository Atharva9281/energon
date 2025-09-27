
export type Unit = {
  id: string;
  name: string;
  capacity: string;
  tempRange: string;
  currentTemp: number;
  signal: number;
  battery: number;
  status: 'Online' | 'Offline';
  alert: 'green' | 'yellow' | 'red';
  tempHistory: number[];
  signalHistory: number[];
  batteryHistory: number[];
  name_long?: string;
};

export type Building = {
    id: string;
    name: string;
    avgTemp: number;
    onlineUnits: number;
    totalUnits: number;
    energyUsage: {
        today: number;
        month: number;
    };
    alerts: {
        critical: number;
        warning: number;
    };
    units: Unit[];
    energyUsageHistory: number[];
    avgTempHistory: number[];
}

export type MockData = {
  buildings: Building[];
};
