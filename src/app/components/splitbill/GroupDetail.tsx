import { ArrowLeft, Plus, Users as UsersIcon, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { NavigationState } from '../../App';
import { getGroupById, getMemberName } from '../../data/splitBillData';

interface GroupDetailProps {
  groupId: string;
  onNavigate: (state: NavigationState) => void;
}

export function GroupDetail({ groupId, onNavigate }: GroupDetailProps) {
  const group = getGroupById(groupId);

  if (!group) {
    return (
      <div className="p-6">
        <p>Group not found</p>
        <Button onClick={() => onNavigate({ page: 'dashboard' })}>Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-b-[2rem] p-6 pb-8 shadow-xl mb-6">
        <Button
          variant="ghost"
          onClick={() => onNavigate({ page: 'dashboard' })}
          className="mb-4 text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">{group.icon}</span>
          </div>
          <div>
            <h1 className="text-white mb-1">{group.name}</h1>
            <p className="text-white/80">{group.members.length} members</p>
          </div>
        </div>

        {/* Balance Summary */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/80 mb-1">Total Spent</p>
                <p className="text-white text-xl">₹{group.totalSpent.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-white/80 mb-1">Your Balance</p>
                {group.yourBalance > 0 ? (
                  <p className="text-green-300 text-xl flex items-center justify-end gap-1">
                    <TrendingUp className="w-5 h-5" />
                    +₹{group.yourBalance}
                  </p>
                ) : group.yourBalance < 0 ? (
                  <p className="text-red-300 text-xl flex items-center justify-end gap-1">
                    <TrendingDown className="w-5 h-5" />
                    -₹{Math.abs(group.yourBalance)}
                  </p>
                ) : (
                  <p className="text-white text-xl">Settled ✓</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-6">
        {/* Members Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5" />
              Members
            </h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigate({ page: 'friends' })}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {group.members.map((member) => (
              <Badge
                key={member.id}
                className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 border-purple-200 px-3 py-1"
              >
                <span className="mr-1">{member.avatar}</span>
                {member.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Expenses Section */}
        <div className="flex items-center justify-between mb-3">
          <h2>Expenses</h2>
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            onClick={() => onNavigate({ page: 'add-expense', groupId })}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Expense
          </Button>
        </div>

        <div className="space-y-3">
          {group.expenses.map((expense) => {
            const paidByName = getMemberName(expense.paidBy);
            const yourSplit = expense.splits.find(s => s.memberId === '1');
            const youOwe = yourSplit && !yourSplit.paid && expense.paidBy !== '1';

            return (
              <Card
                key={expense.id}
                className="cursor-pointer hover:shadow-lg transition-all border-0 shadow-md hover:-translate-y-0.5"
                onClick={() => onNavigate({ page: 'expense-detail', expenseId: expense.id })}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3>{expense.description}</h3>
                        {expense.category && (
                          <Badge variant="outline" className="text-xs">
                            {expense.category}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {new Date(expense.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Paid by <span className="text-purple-600">{paidByName}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 mb-1">
                        ₹{expense.totalAmount.toLocaleString()}
                      </p>
                      {yourSplit && (
                        <p className={`text-sm ${youOwe ? 'text-red-600' : 'text-green-600'}`}>
                          {youOwe ? `You owe ₹${yourSplit.amount}` : expense.paidBy === '1' ? `You paid` : 'Settled'}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
