import { useState } from 'react';
import { Users, Activity as ActivityIcon, Settings as SettingsIcon, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { NavigationState } from '../../App';
import { mockGroups, calculateTotalOwed } from '../../data/splitBillData';

interface DashboardProps {
  onNavigate: (state: NavigationState) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [monthlyBudget, setMonthlyBudget] = useState(15000);
  const totalOwed = calculateTotalOwed();
  const isOwed = totalOwed > 0;

  const bottomNavItems = [
    { icon: Users, label: 'Friends', page: 'friends' as const },
    { icon: ActivityIcon, label: 'Activity', page: 'activity' as const },
    { icon: Plus, label: 'Add', page: 'add-expense' as const },
    { icon: SettingsIcon, label: 'Settings', page: 'settings' as const },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-b-[2rem] p-6 pb-8 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg">
              😊
            </div>
            <div>
              <h2 className="text-white">SplitEasy</h2>
              <p className="text-white/80 text-sm">Welcome back!</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
            <span className="text-white">🔔</span>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/90 mb-1">Overall Balance</p>
                <h1 className="text-white flex items-center gap-2">
                  {isOwed ? (
                    <>
                      <TrendingUp className="w-6 h-6 text-green-300" />
                      <span className="text-green-300">+₹{Math.abs(totalOwed).toFixed(2)}</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-6 h-6 text-red-300" />
                      <span className="text-red-300">-₹{Math.abs(totalOwed).toFixed(2)}</span>
                    </>
                  )}
                </h1>
                <p className="text-white/70 text-sm mt-1">
                  {isOwed ? "You're owed" : 'You owe'}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">💰</span>
              </div>
            </div>

            {/* Monthly Budget Slider */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex justify-between items-center mb-3">
                <p className="text-white/90">Monthly Budget</p>
                <p className="text-white">₹{monthlyBudget.toLocaleString()}</p>
              </div>
              <Slider
                value={[monthlyBudget]}
                onValueChange={(value) => setMonthlyBudget(value[0])}
                min={5000}
                max={50000}
                step={1000}
                className="mb-2"
              />
              <p className="text-white/60 text-sm">Drag to adjust your monthly budget</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Groups Section */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2>Your Groups</h2>
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            onClick={() => onNavigate({ page: 'add-expense' })}
          >
            <Plus className="w-4 h-4 mr-1" />
            New Group
          </Button>
        </div>

        <div className="space-y-3">
          {mockGroups.map((group) => (
            <Card
              key={group.id}
              className="cursor-pointer hover:shadow-lg transition-all border-0 shadow-md hover:-translate-y-0.5"
              onClick={() => onNavigate({ page: 'group-detail', groupId: group.id })}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-2xl">{group.icon}</span>
                    </div>
                    <div>
                      <h3 className="mb-1">{group.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {group.members.length} members • ₹{group.totalSpent.toLocaleString()} spent
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {group.yourBalance > 0 ? (
                      <p className="text-green-600">+₹{group.yourBalance}</p>
                    ) : group.yourBalance < 0 ? (
                      <p className="text-red-600">-₹{Math.abs(group.yourBalance)}</p>
                    ) : (
                      <p className="text-gray-400">Settled</p>
                    )}
                    <p className="text-gray-400 text-sm">
                      {group.yourBalance !== 0 ? (group.yourBalance > 0 ? 'You are owed' : 'You owe') : 'All settled'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl">
        <div className="flex items-center justify-around p-4 max-w-lg mx-auto">
          {bottomNavItems.map((item, index) => {
            const Icon = item.icon;
            const isAdd = item.label === 'Add';
            return (
              <button
                key={index}
                onClick={() => onNavigate({ page: item.page })}
                className={`flex flex-col items-center gap-1 ${
                  isAdd ? '-mt-8' : ''
                }`}
              >
                <div
                  className={`${
                    isAdd
                      ? 'w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 shadow-xl'
                      : 'w-10 h-10 bg-gray-100'
                  } rounded-full flex items-center justify-center transition-all hover:scale-110`}
                >
                  <Icon className={`w-5 h-5 ${isAdd ? 'text-white' : 'text-gray-600'}`} />
                </div>
                {!isAdd && <span className="text-xs text-gray-600">{item.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
