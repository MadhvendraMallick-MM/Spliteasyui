// Metro station data
export interface Station {
  id: string;
  name: string;
  line: string;
  connections?: string[];
}

export interface Route {
  stations: string[];
  duration: number; // in minutes
  fare: number;
  distance: number; // in km
  interchanges: number;
}

export const metroStations: Station[] = [
  // Red Line
  { id: "R1", name: "Rithala", line: "Red Line" },
  { id: "R2", name: "Rohini Sector 18-19", line: "Red Line" },
  { id: "R3", name: "Pitampura", line: "Red Line" },
  {
    id: "R4",
    name: "Netaji Subhash Place",
    line: "Red Line",
    connections: ["Pink Line"],
  },
  {
    id: "R5",
    name: "Kashmere Gate",
    line: "Red Line",
    connections: ["Yellow Line", "Violet Line"],
  },
  { id: "R6", name: "Chandni Chowk", line: "Red Line" },
  {
    id: "R7",
    name: "New Delhi",
    line: "Red Line",
    connections: ["Yellow Line"],
  },
  {
    id: "R8",
    name: "Rajiv Chowk",
    line: "Red Line",
    connections: ["Yellow Line"],
  },
  { id: "R9", name: "Jangpura", line: "Red Line" },
  { id: "R10", name: "Lajpat Nagar", line: "Red Line" },
  {
    id: "R11",
    name: "Kalkaji Mandir",
    line: "Red Line",
    connections: ["Violet Line", "Magenta Line"],
  },

  // Yellow Line
  { id: "Y1", name: "Samaypur Badli", line: "Yellow Line" },
  { id: "Y2", name: "Jahangirpuri", line: "Yellow Line" },
  { id: "Y3", name: "Vishwavidyalaya", line: "Yellow Line" },
  {
    id: "Y4",
    name: "Kashmere Gate",
    line: "Yellow Line",
    connections: ["Red Line", "Violet Line"],
  },
  { id: "Y5", name: "Chandni Chowk", line: "Yellow Line" },
  {
    id: "Y6",
    name: "Rajiv Chowk",
    line: "Yellow Line",
    connections: ["Blue Line"],
  },
  {
    id: "Y7",
    name: "Central Secretariat",
    line: "Yellow Line",
    connections: ["Violet Line"],
  },
  {
    id: "Y8",
    name: "Hauz Khas",
    line: "Yellow Line",
    connections: ["Magenta Line"],
  },
  { id: "Y9", name: "Saket", line: "Yellow Line" },
  { id: "Y10", name: "HUDA City Centre", line: "Yellow Line" },

  // Blue Line
  { id: "B1", name: "Dwarka Sector 21", line: "Blue Line" },
  { id: "B2", name: "Dwarka", line: "Blue Line" },
  { id: "B3", name: "Janakpuri West", line: "Blue Line" },
  {
    id: "B4",
    name: "Rajouri Garden",
    line: "Blue Line",
    connections: ["Pink Line"],
  },
  {
    id: "B5",
    name: "Kirti Nagar",
    line: "Blue Line",
    connections: ["Green Line"],
  },
  {
    id: "B6",
    name: "Rajiv Chowk",
    line: "Blue Line",
    connections: ["Yellow Line"],
  },
  {
    id: "B7",
    name: "Mandi House",
    line: "Blue Line",
    connections: ["Violet Line"],
  },
  { id: "B8", name: "Yamuna Bank", line: "Blue Line" },
  { id: "B9", name: "Vaishali", line: "Blue Line" },
  { id: "B10", name: "Noida City Centre", line: "Blue Line" },

  // Violet Line
  {
    id: "V1",
    name: "Kashmere Gate",
    line: "Violet Line",
    connections: ["Red Line", "Yellow Line"],
  },
  {
    id: "V2",
    name: "Central Secretariat",
    line: "Violet Line",
    connections: ["Yellow Line"],
  },
  {
    id: "V3",
    name: "Mandi House",
    line: "Violet Line",
    connections: ["Blue Line"],
  },
  {
    id: "V4",
    name: "Kalkaji Mandir",
    line: "Violet Line",
    connections: ["Red Line", "Magenta Line"],
  },
  { id: "V5", name: "Nehru Place", line: "Violet Line" },
  {
    id: "V6",
    name: "Botanical Garden",
    line: "Violet Line",
    connections: ["Magenta Line"],
  },
  { id: "V7", name: "Noida Sector 18", line: "Violet Line" },

  // Green Line
  { id: "G1", name: "Inderlok", line: "Green Line" },
  { id: "G2", name: "Ashok Park Main", line: "Green Line" },
  {
    id: "G3",
    name: "Kirti Nagar",
    line: "Green Line",
    connections: ["Blue Line"],
  },
  {
    id: "G4",
    name: "Brigadier Hoshiar Singh",
    line: "Green Line",
  },

  // Magenta Line
  { id: "M1", name: "Janakpuri West", line: "Magenta Line" },
  {
    id: "M2",
    name: "Hauz Khas",
    line: "Magenta Line",
    connections: ["Yellow Line"],
  },
  {
    id: "M3",
    name: "Kalkaji Mandir",
    line: "Magenta Line",
    connections: ["Red Line", "Violet Line"],
  },
  {
    id: "M4",
    name: "Botanical Garden",
    line: "Magenta Line",
    connections: ["Violet Line"],
  },

  // Pink Line
  { id: "P1", name: "Majlis Park", line: "Pink Line" },
  {
    id: "P2",
    name: "Netaji Subhash Place",
    line: "Pink Line",
    connections: ["Red Line"],
  },
  {
    id: "P3",
    name: "Rajouri Garden",
    line: "Pink Line",
    connections: ["Blue Line"],
  },
  { id: "P4", name: "Lajpat Nagar", line: "Pink Line" },
];

// Calculate route between two stations
export function calculateRoute(
  fromStationId: string,
  toStationId: string,
): Route | null {
  const fromStation = metroStations.find(
    (s) => s.id === fromStationId,
  );
  const toStation = metroStations.find(
    (s) => s.id === toStationId,
  );

  if (!fromStation || !toStation) return null;

  // Simple route calculation (in a real app, this would use a pathfinding algorithm)
  const sameLine = fromStation.line === toStation.line;
  const fromIndex = metroStations.findIndex(
    (s) => s.id === fromStationId,
  );
  const toIndex = metroStations.findIndex(
    (s) => s.id === toStationId,
  );

  const stationCount = Math.abs(toIndex - fromIndex);
  const distance = stationCount * 1.5; // Average 1.5 km between stations
  const duration = stationCount * 2.5 + (sameLine ? 0 : 5); // 2.5 min per station + 5 min for interchange
  const interchanges = sameLine ? 0 : 1;

  // Fare calculation based on distance
  let fare = 10; // Base fare
  if (distance > 2) fare = 20;
  if (distance > 5) fare = 30;
  if (distance > 12) fare = 40;
  if (distance > 21) fare = 50;
  if (distance > 32) fare = 60;

  // Generate route stations
  const stations: string[] = [];
  if (fromIndex < toIndex) {
    for (let i = fromIndex; i <= toIndex; i++) {
      stations.push(metroStations[i].name);
    }
  } else {
    for (let i = fromIndex; i >= toIndex; i--) {
      stations.push(metroStations[i].name);
    }
  }

  return {
    stations,
    duration: Math.round(duration),
    fare,
    distance: parseFloat(distance.toFixed(1)),
    interchanges,
  };
}

export const upcomingProjects = [
  {
    id: 1,
    name: "Airport Express Extension",
    description:
      "Extension from New Delhi to IGI Airport Terminal 1",
    expectedCompletion: "December 2026",
    length: "8.5 km",
    stations: 4,
    status: "Under Construction",
  },
  {
    id: 2,
    name: "Red Line Extension",
    description: "Extension from Rithala to Narela",
    expectedCompletion: "March 2027",
    length: "21.5 km",
    stations: 13,
    status: "Under Construction",
  },
  {
    id: 3,
    name: "Silver Line",
    description: "New corridor connecting East and West Delhi",
    expectedCompletion: "June 2028",
    length: "28.3 km",
    stations: 22,
    status: "Planning Phase",
  },
  {
    id: 4,
    name: "Blue Line Northern Extension",
    description: "Extension from Vaishali to Greater Noida",
    expectedCompletion: "September 2027",
    length: "15.2 km",
    stations: 10,
    status: "Under Construction",
  },
];

export const metroTimings = [
  {
    line: "Red Line",
    firstTrain: "6:00 AM",
    lastTrain: "11:00 PM",
    frequency: "2-5 minutes",
    color: "bg-red-500",
  },
  {
    line: "Yellow Line",
    firstTrain: "6:00 AM",
    lastTrain: "11:00 PM",
    frequency: "2-5 minutes",
    color: "bg-yellow-500",
  },
  {
    line: "Blue Line",
    firstTrain: "5:45 AM",
    lastTrain: "11:15 PM",
    frequency: "2-5 minutes",
    color: "bg-blue-500",
  },
  {
    line: "Violet Line",
    firstTrain: "6:00 AM",
    lastTrain: "11:00 PM",
    frequency: "3-6 minutes",
    color: "bg-purple-500",
  },
  {
    line: "Green Line",
    firstTrain: "6:15 AM",
    lastTrain: "10:45 PM",
    frequency: "5-10 minutes",
    color: "bg-green-500",
  },
  {
    line: "Magenta Line",
    firstTrain: "6:00 AM",
    lastTrain: "11:00 PM",
    frequency: "3-6 minutes",
    color: "bg-fuchsia-500",
  },
  {
    line: "Pink Line",
    firstTrain: "6:00 AM",
    lastTrain: "11:00 PM",
    frequency: "3-6 minutes",
    color: "bg-pink-500",
  },
];