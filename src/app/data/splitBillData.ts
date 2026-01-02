export interface Friend {
  id: string;
  name: string;
  avatar: string;
  balance: number; // positive = they owe you, negative = you owe them
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
}

export interface Split {
  memberId: string;
  amount: number;
  paid: boolean;
}

export interface Expense {
  id: string;
  groupId: string;
  description: string;
  totalAmount: number;
  paidBy: string;
  date: string;
  splits: Split[];
  category?: string;
}

export interface Group {
  id: string;
  name: string;
  icon: string;
  members: Member[];
  expenses: Expense[];
  totalSpent: number;
  yourBalance: number; // positive = you're owed, negative = you owe
}

export interface ActivityItem {
  id: string;
  type: 'payment' | 'group_created' | 'expense_added' | 'settlement';
  description: string;
  amount?: number;
  date: string;
  groupName?: string;
}

// Mock Data
export const mockFriends: Friend[] = [
  { id: '1', name: 'Sarah Johnson', avatar: '👩', balance: 450 },
  { id: '2', name: 'Mike Chen', avatar: '👨', balance: -280 },
  { id: '3', name: 'Emma Davis', avatar: '👩‍🦰', balance: 120 },
  { id: '4', name: 'James Wilson', avatar: '👨‍🦱', balance: -95 },
  { id: '5', name: 'Lisa Anderson', avatar: '👱‍♀️', balance: 340 },
  { id: '6', name: 'Tom Brown', avatar: '🧔', balance: -180 },
];

export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Manali Trip',
    icon: '🏔️',
    members: [
      { id: '1', name: 'You', avatar: '😊' },
      { id: '2', name: 'Sarah', avatar: '👩' },
      { id: '3', name: 'Mike', avatar: '👨' },
      { id: '4', name: 'Emma', avatar: '👩‍🦰' },
    ],
    expenses: [
      {
        id: 'e1',
        groupId: '1',
        description: 'Hotel Booking',
        totalAmount: 8000,
        paidBy: '1',
        date: '2026-01-15',
        category: 'Accommodation',
        splits: [
          { memberId: '1', amount: 2000, paid: true },
          { memberId: '2', amount: 2000, paid: false },
          { memberId: '3', amount: 2000, paid: false },
          { memberId: '4', amount: 2000, paid: false },
        ],
      },
      {
        id: 'e2',
        groupId: '1',
        description: 'Petrol',
        totalAmount: 1200,
        paidBy: '2',
        date: '2026-01-16',
        category: 'Transport',
        splits: [
          { memberId: '1', amount: 300, paid: false },
          { memberId: '2', amount: 300, paid: true },
          { memberId: '3', amount: 300, paid: true },
          { memberId: '4', amount: 300, paid: true },
        ],
      },
      {
        id: 'e3',
        groupId: '1',
        description: 'Dinner at Mall Road',
        totalAmount: 2400,
        paidBy: '1',
        date: '2026-01-17',
        category: 'Food',
        splits: [
          { memberId: '1', amount: 600, paid: true },
          { memberId: '2', amount: 600, paid: false },
          { memberId: '3', amount: 600, paid: false },
          { memberId: '4', amount: 600, paid: false },
        ],
      },
    ],
    totalSpent: 11600,
    yourBalance: 4900,
  },
  {
    id: '2',
    name: 'Night Out Squad',
    icon: '🌙',
    members: [
      { id: '1', name: 'You', avatar: '😊' },
      { id: '5', name: 'Lisa', avatar: '👱‍♀️' },
      { id: '6', name: 'Tom', avatar: '🧔' },
    ],
    expenses: [
      {
        id: 'e4',
        groupId: '2',
        description: 'Club Entry',
        totalAmount: 1500,
        paidBy: '5',
        date: '2025-12-28',
        category: 'Entertainment',
        splits: [
          { memberId: '1', amount: 500, paid: false },
          { memberId: '5', amount: 500, paid: true },
          { memberId: '6', amount: 500, paid: true },
        ],
      },
      {
        id: 'e5',
        groupId: '2',
        description: 'Drinks',
        totalAmount: 2400,
        paidBy: '1',
        date: '2025-12-28',
        category: 'Food',
        splits: [
          { memberId: '1', amount: 800, paid: true },
          { memberId: '5', amount: 800, paid: false },
          { memberId: '6', amount: 800, paid: false },
        ],
      },
    ],
    totalSpent: 3900,
    yourBalance: 1100,
  },
  {
    id: '3',
    name: 'Roommates',
    icon: '🏠',
    members: [
      { id: '1', name: 'You', avatar: '😊' },
      { id: '4', name: 'James', avatar: '👨‍🦱' },
    ],
    expenses: [
      {
        id: 'e6',
        groupId: '3',
        description: 'Electricity Bill',
        totalAmount: 1800,
        paidBy: '4',
        date: '2026-01-01',
        category: 'Utilities',
        splits: [
          { memberId: '1', amount: 900, paid: false },
          { memberId: '4', amount: 900, paid: true },
        ],
      },
      {
        id: 'e7',
        groupId: '3',
        description: 'Groceries',
        totalAmount: 3200,
        paidBy: '1',
        date: '2026-01-02',
        category: 'Food',
        splits: [
          { memberId: '1', amount: 1600, paid: true },
          { memberId: '4', amount: 1600, paid: false },
        ],
      },
    ],
    totalSpent: 5000,
    yourBalance: 700,
  },
];

export const mockActivities: ActivityItem[] = [
  {
    id: 'a1',
    type: 'expense_added',
    description: 'You added "Hotel Booking" in Manali Trip',
    amount: 8000,
    date: '2026-01-15T10:30:00',
    groupName: 'Manali Trip',
  },
  {
    id: 'a2',
    type: 'payment',
    description: 'You paid Sarah ₹450',
    amount: 450,
    date: '2026-01-14T15:20:00',
  },
  {
    id: 'a3',
    type: 'expense_added',
    description: 'Sarah added "Petrol" in Manali Trip',
    amount: 1200,
    date: '2026-01-16T09:15:00',
    groupName: 'Manali Trip',
  },
  {
    id: 'a4',
    type: 'settlement',
    description: 'Lisa settled up ₹340 with you',
    amount: 340,
    date: '2025-12-30T18:45:00',
  },
  {
    id: 'a5',
    type: 'group_created',
    description: 'You created group "Manali Trip"',
    date: '2026-01-10T12:00:00',
    groupName: 'Manali Trip',
  },
  {
    id: 'a6',
    type: 'expense_added',
    description: 'You added "Drinks" in Night Out Squad',
    amount: 2400,
    date: '2025-12-28T23:30:00',
    groupName: 'Night Out Squad',
  },
];

// Helper functions
export function calculateTotalOwed(): number {
  return mockGroups.reduce((total, group) => total + group.yourBalance, 0);
}

export function getGroupById(id: string): Group | undefined {
  return mockGroups.find(g => g.id === id);
}

export function getExpenseById(id: string): Expense | undefined {
  for (const group of mockGroups) {
    const expense = group.expenses.find(e => e.id === id);
    if (expense) return expense;
  }
  return undefined;
}

export function getMemberName(memberId: string): string {
  if (memberId === '1') return 'You';
  for (const group of mockGroups) {
    const member = group.members.find(m => m.id === memberId);
    if (member) return member.name;
  }
  return 'Unknown';
}
