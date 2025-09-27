
import type { MockData } from './types';

function generateTempHistory(base: number, range: number, count: number) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.floor(Math.random() * range) + base);
  }
  return data;
}

function generateSignalHistory(base: number, range: number, count: number) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(Math.min(100, Math.floor(Math.random() * range) + base));
    }
    return data;
}

function generateBatteryHistory(base: number, range: number, count: number) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(Math.max(0, base - Math.floor(Math.random() * range * (i/count))));
    }
    return data;
}


const buildingAUnits = [
    {
        id: 'unit-001',
        name: 'Cooler 1',
        capacity: '500L',
        tempRange: '35-40',
        currentTemp: 42,
        signal: 85,
        battery: 76,
        status: 'Online' as 'Online' | 'Offline',
        alert: 'yellow' as 'green' | 'yellow' | 'red',
        tempHistory: generateTempHistory(38, 5, 24),
        signalHistory: generateSignalHistory(80, 10, 24),
        batteryHistory: generateBatteryHistory(80, 5, 24),
    },
    {
        id: 'unit-002',
        name: 'Freezer 2',
        capacity: '300L',
        tempRange: '-10 to -5',
        currentTemp: -12,
        signal: 60,
        battery: 30,
        status: 'Offline' as 'Online' | 'Offline',
        alert: 'red' as 'green' | 'yellow' | 'red',
        tempHistory: generateTempHistory(-9, 4, 24),
        signalHistory: generateSignalHistory(55, 10, 24),
        batteryHistory: generateBatteryHistory(40, 10, 24),
    },
     {
        id: 'unit-003',
        name: 'HVAC Zone A',
        capacity: 'N/A',
        tempRange: '68-74',
        currentTemp: 71,
        signal: 92,
        battery: 100,
        status: 'Online' as 'Online' | 'Offline',
        alert: 'green' as 'green' | 'yellow' | 'red',
        tempHistory: generateTempHistory(69, 4, 24),
        signalHistory: generateSignalHistory(90, 5, 24),
        batteryHistory: generateBatteryHistory(100, 0, 24),
    },
    {
        id: 'unit-004',
        name: 'Cooler 4',
        capacity: '500L',
        tempRange: '35-40',
        currentTemp: 37,
        signal: 90,
        battery: 88,
        status: 'Online' as 'Online' | 'Offline',
        alert: 'green' as 'green' | 'yellow' | 'red',
        tempHistory: generateTempHistory(36, 3, 24),
        signalHistory: generateSignalHistory(90, 4, 24),
        batteryHistory: generateBatteryHistory(95, 5, 24),
    },
     {
        id: 'unit-005',
        name: 'HVAC Zone B',
        capacity: 'N/A',
        tempRange: '68-74',
        currentTemp: 75,
        signal: 88,
        battery: 99,
        status: 'Online' as 'Online' | 'Offline',
        alert: 'yellow' as 'green' | 'yellow' | 'red',
        tempHistory: generateTempHistory(72, 4, 24),
        signalHistory: generateSignalHistory(85, 8, 24),
        batteryHistory: generateBatteryHistory(100, 1, 24),
    },
     { id: 'unit-006', name: 'Freezer 3', status: 'Online' as 'Online' | 'Offline', currentTemp: -6, alert: 'green' as 'green' | 'yellow' | 'red', capacity: '300L', tempRange: '-10 to -5', signal: 95, battery: 91, tempHistory: generateTempHistory(-8,2,24), signalHistory: generateSignalHistory(90,5,24), batteryHistory: generateBatteryHistory(95,5,24)},
     { id: 'unit-007', name: 'Cooler 5', status: 'Online' as 'Online' | 'Offline', currentTemp: 38, alert: 'green' as 'green' | 'yellow' | 'red', capacity: '500L', tempRange: '35-40', signal: 98, battery: 92, tempHistory: generateTempHistory(37,2,24), signalHistory: generateSignalHistory(95,5,24), batteryHistory: generateBatteryHistory(95,5,24)},
     { id: 'unit-008', name: 'HVAC Zone C', status: 'Offline' as 'Online' | 'Offline', currentTemp: 80, alert: 'red' as 'green' | 'yellow' | 'red', capacity: 'N/A', tempRange: '68-74', signal: 40, battery: 20, tempHistory: generateTempHistory(75,5,24), signalHistory: generateSignalHistory(35,10,24), batteryHistory: generateBatteryHistory(30,10,24)},
     { id: 'unit-009', name: 'Freezer 6', status: 'Online' as 'Online' | 'Offline', currentTemp: -9, alert: 'green' as 'green' | 'yellow' | 'red', capacity: '300L', tempRange: '-10 to -5', signal: 93, battery: 89, tempHistory: generateTempHistory(-8,2,24), signalHistory: generateSignalHistory(90,5,24), batteryHistory: generateBatteryHistory(95,5,24)},
     { id: 'unit-010', name: 'Cooler 7', status: 'Online' as 'Online' | 'Offline', currentTemp: 39, alert: 'green' as 'green' | 'yellow' | 'red', capacity: '500L', tempRange: '35-40', signal: 96, battery: 94, tempHistory: generateTempHistory(38,2,24), signalHistory: generateSignalHistory(95,5,24), batteryHistory: generateBatteryHistory(95,5,24)},
];

const buildingBUnits = [
    { id: 'unit-101', name: 'Main HVAC', status: 'Online' as 'Online' | 'Offline', currentTemp: 70, alert: 'green' as 'green' | 'yellow' | 'red', capacity: 'N/A', tempRange: '68-74', signal: 99, battery: 100, tempHistory: generateTempHistory(70,2,24), signalHistory: generateSignalHistory(98,2,24), batteryHistory: generateBatteryHistory(100,0,24)},
    { id: 'unit-102', name: 'Lobby Cooler', status: 'Online' as 'Online' | 'Offline', currentTemp: 38, alert: 'green' as 'green' | 'yellow' | 'red', capacity: '200L', tempRange: '35-40', signal: 97, battery: 95, tempHistory: generateTempHistory(38,2,24), signalHistory: generateSignalHistory(95,5,24), batteryHistory: generateBatteryHistory(98,5,24)},
    { id: 'unit-103', name: 'Kitchen Freezer', status: 'Online' as 'Online' | 'Offline', currentTemp: -5, alert: 'green' as 'green' | 'yellow' | 'red', capacity: '400L', tempRange: '-10 to -5', signal: 96, battery: 92, tempHistory: generateTempHistory(-7,2,24), signalHistory: generateSignalHistory(94,5,24), batteryHistory: generateBatteryHistory(95,5,24)},
    { id: 'unit-104', name: 'Rooftop Unit 1', status: 'Online' as 'Online' | 'Offline', currentTemp: 72, alert: 'green' as 'green' | 'yellow' | 'red', capacity: 'N/A', tempRange: '68-74', signal: 91, battery: 88, tempHistory: generateTempHistory(71,2,24), signalHistory: generateSignalHistory(90,5,24), batteryHistory: generateBatteryHistory(95,5,24)},
    { id: 'unit-105', name: 'Rooftop Unit 2', status: 'Online' as 'Online' | 'Offline', currentTemp: 73, alert: 'green' as 'green' | 'yellow' | 'red', capacity: 'N/A', tempRange: '68-74', signal: 93, battery: 89, tempHistory: generateTempHistory(72,2,24), signalHistory: generateSignalHistory(90,5,24), batteryHistory: generateBatteryHistory(95,5,24)},
    { id: 'unit-106', name: 'Basement HVAC', status: 'Online' as 'Online' | 'Offline', currentTemp: 69, alert: 'green' as 'green' | 'yellow' | 'red', capacity: 'N/A', tempRange: '68-74', signal: 99, battery: 100, tempHistory: generateTempHistory(69,2,24), signalHistory: generateSignalHistory(98,2,24), batteryHistory: generateBatteryHistory(100,0,24)},
    { id: 'unit-107', name_long: 'West Wing HVAC', name: 'West Wing HVAC', status: 'Online' as 'Online' | 'Offline', currentTemp: 71, alert: 'green' as 'green' | 'yellow' | 'red', capacity: 'N/A', tempRange: '68-74', signal: 95, battery: 93, tempHistory: generateTempHistory(70,2,24), signalHistory: generateSignalHistory(94,5,24), batteryHistory: generateBatteryHistory(95,5,24)},
    { id: 'unit-108', name_long: 'East Wing HVAC', name: 'East Wing HVAC', status: 'Online' as 'Online' | 'Offline', currentTemp: 74, alert: 'yellow' as 'green' | 'yellow' | 'red', capacity: 'N/A', tempRange: '68-74', signal: 85, battery: 80, tempHistory: generateTempHistory(73,2,24), signalHistory: generateSignalHistory(80,10,24), batteryHistory: generateBatteryHistory(85,5,24)},
    { id: 'unit-109', name: 'Server Room AC', status: 'Online' as 'Online' | 'Offline', currentTemp: 65, alert: 'green' as 'green' | 'yellow' | 'red', capacity: 'N/A', tempRange: '60-68', signal: 99, battery: 100, tempHistory: generateTempHistory(65,2,24), signalHistory: generateSignalHistory(98,2,24), batteryHistory: generateBatteryHistory(100,0,24)},
    { id: 'unit-110', name: 'Cafeteria Cooler', status: 'Online' as 'Online' | 'Offline', currentTemp: 39, alert: 'green' as 'green' | 'yellow' | 'red', capacity: '800L', tempRange: '35-40', signal: 94, battery: 90, tempHistory: generateTempHistory(38,2,24), signalHistory: generateSignalHistory(92,5,24), batteryHistory: generateBatteryHistory(95,5,24)},
    { id: 'unit-111', name: 'Cafeteria Freezer', status: 'Online' as 'Online' | 'Offline', currentTemp: -8, alert: 'green' as 'green' | 'yellow' | 'red', capacity: '600L', tempRange: '-10 to -5', signal: 93, battery: 88, tempHistory: generateTempHistory(-7,2,24), signalHistory: generateSignalHistory(91,5,24), batteryHistory: generateBatteryHistory(95,5,24)},
    { id: 'unit-112', name: 'Admin Office HVAC', status: 'Online' as 'Online' | 'Offline', currentTemp: 72, alert: 'green' as 'green' | 'yellow' | 'red', capacity: 'N/A', tempRange: '68-74', signal: 98, battery: 97, tempHistory: generateTempHistory(71,2,24), signalHistory: generateSignalHistory(97,3,24), batteryHistory: generateBatteryHistory(99,2,24)},
];

const buildingCUnits = [
    { id: 'unit-201', name: 'Mainframe Cooler', status: 'Online' as 'Online' | 'Offline', currentTemp: 65, alert: 'green' as 'green' | 'yellow' | 'red', capacity: 'N/A', tempRange: '60-68', signal: 99, battery: 100, tempHistory: generateTempHistory(65, 2, 24), signalHistory: generateSignalHistory(98, 2, 24), batteryHistory: generateBatteryHistory(100, 0, 24) },
    { id: 'unit-202', name: 'Backup Freezer', status: 'Offline' as 'Online' | 'Offline', currentTemp: 0, alert: 'red' as 'green' | 'yellow' | 'red', capacity: '500L', tempRange: '-10 to -5', signal: 20, battery: 15, tempHistory: generateTempHistory(-5, 5, 24), signalHistory: generateSignalHistory(15, 10, 24), batteryHistory: generateBatteryHistory(20, 10, 24) },
    { id: 'unit-203', name: 'Lab HVAC', status: 'Online' as 'Online' | 'Offline', currentTemp: 72, alert: 'yellow' as 'green' | 'yellow' | 'red', capacity: 'N/A', tempRange: '68-72', signal: 88, battery: 85, tempHistory: generateTempHistory(71, 2, 24), signalHistory: generateSignalHistory(85, 5, 24), batteryHistory: generateBatteryHistory(90, 5, 24) },
];

const buildingDUnits = [
    { id: 'unit-301', name: 'Warehouse Bay 1', status: 'Online' as 'Online' | 'Offline', currentTemp: 75, alert: 'green' as 'green' | 'yellow' | 'red', capacity: 'N/A', tempRange: '70-80', signal: 95, battery: 90, tempHistory: generateTempHistory(75, 3, 24), signalHistory: generateSignalHistory(93, 5, 24), batteryHistory: generateBatteryHistory(95, 5, 24) },
    { id: 'unit-302', name: 'Warehouse Bay 2', status: 'Online' as 'Online' | 'Offline', currentTemp: 76, alert: 'green' as 'green' | 'yellow' | 'red', capacity: 'N/A', tempRange: '70-80', signal: 94, battery: 91, tempHistory: generateTempHistory(75, 3, 24), signalHistory: generateSignalHistory(93, 5, 24), batteryHistory: generateBatteryHistory(95, 5, 24) },
    { id: 'unit-303', name: 'Cold Storage', status: 'Online' as 'Online' | 'Offline', currentTemp: 34, alert: 'yellow' as 'green' | 'yellow' | 'red', capacity: '2000L', tempRange: '32-38', signal: 80, battery: 70, tempHistory: generateTempHistory(35, 3, 24), signalHistory: generateSignalHistory(78, 10, 24), batteryHistory: generateBatteryHistory(80, 10, 24) },
    { id: 'unit-304', name: 'Loading Dock HVAC', status: 'Online' as 'Online' | 'Offline', currentTemp: 78, alert: 'green' as 'green' | 'yellow' | 'red', capacity: 'N/A', tempRange: '70-80', signal: 96, battery: 92, tempHistory: generateTempHistory(76, 3, 24), signalHistory: generateSignalHistory(95, 5, 24), batteryHistory: generateBatteryHistory(95, 5, 24) },
];


export const mockData: MockData = {
  buildings: [
    {
      id: 'building-a',
      name: 'Building A',
      avgTemp: 68,
      onlineUnits: 8,
      totalUnits: 10,
      energyUsage: {
        today: 450,
        month: 8900
      },
      alerts: {
        critical: 2,
        warning: 2
      },
      units: buildingAUnits,
      energyUsageHistory: generateTempHistory(400, 100, 30),
      avgTempHistory: generateTempHistory(65, 5, 30)
    },
    {
      id: 'building-b',
      name: 'Building B',
      avgTemp: 70,
      onlineUnits: 12,
      totalUnits: 12,
      energyUsage: {
        today: 390,
        month: 7800
      },
      alerts: {
        critical: 0,
        warning: 1
      },
      units: buildingBUnits,
      energyUsageHistory: generateTempHistory(350, 80, 30),
      avgTempHistory: generateTempHistory(68, 4, 30)
    },
    {
      id: 'building-c',
      name: 'Building C',
      avgTemp: 71,
      onlineUnits: 2,
      totalUnits: 3,
      energyUsage: {
        today: 150,
        month: 3200
      },
      alerts: {
        critical: 1,
        warning: 1
      },
      units: buildingCUnits,
      energyUsageHistory: generateTempHistory(120, 50, 30),
      avgTempHistory: generateTempHistory(70, 3, 30)
    },
    {
      id: 'building-d',
      name: 'Building D',
      avgTemp: 76,
      onlineUnits: 4,
      totalUnits: 4,
      energyUsage: {
        today: 600,
        month: 15000
      },
      alerts: {
        critical: 0,
        warning: 1
      },
      units: buildingDUnits,
      energyUsageHistory: generateTempHistory(550, 100, 30),
      avgTempHistory: generateTempHistory(75, 2, 30)
    }
  ]
};
