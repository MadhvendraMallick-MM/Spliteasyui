import { useState } from 'react';
import { Dashboard } from './components/splitbill/Dashboard';
import { GroupDetail } from './components/splitbill/GroupDetail';
import { ExpenseDetail } from './components/splitbill/ExpenseDetail';
import { AddExpense } from './components/splitbill/AddExpense';
import { FriendsList } from './components/splitbill/FriendsList';
import { Activity } from './components/splitbill/Activity';
import { Settings } from './components/splitbill/Settings';

export type PageType = 'dashboard' | 'group-detail' | 'expense-detail' | 'add-expense' | 'friends' | 'activity' | 'settings';

export interface NavigationState {
  page: PageType;
  groupId?: string;
  expenseId?: string;
}

export default function App() {
  const [navigation, setNavigation] = useState<NavigationState>({ page: 'dashboard' });

  const navigate = (state: NavigationState) => {
    setNavigation(state);
  };

  const renderPage = () => {
    switch (navigation.page) {
      case 'dashboard':
        return <Dashboard onNavigate={navigate} />;
      case 'group-detail':
        return <GroupDetail groupId={navigation.groupId!} onNavigate={navigate} />;
      case 'expense-detail':
        return <ExpenseDetail expenseId={navigation.expenseId!} onNavigate={navigate} />;
      case 'add-expense':
        return <AddExpense groupId={navigation.groupId} onNavigate={navigate} />;
      case 'friends':
        return <FriendsList onNavigate={navigate} />;
      case 'activity':
        return <Activity onNavigate={navigate} />;
      case 'settings':
        return <Settings onNavigate={navigate} />;
      default:
        return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {renderPage()}
    </div>
  );
}
