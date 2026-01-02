import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Users as UsersIcon, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { NavigationState } from '../../App';
import { mockActivities } from '../../data/splitBillData';

interface ActivityProps {
  onNavigate: (state: NavigationState) => void;
}

export function Activity({ onNavigate }: ActivityProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <ArrowUpRight className="w-5 h-5 text-green-600" />;
      case 'expense_added':
        return <ArrowDownLeft className="w-5 h-5 text-red-600" />;
      case 'group_created':
        return <UsersIcon className="w-5 h-5 text-blue-600" />;
      case 'settlement':
        return <CheckCircle2 className="w-5 h-5 text-purple-600" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'from-green-100 to-green-50';
      case 'expense_added':
        return 'from-red-100 to-red-50';
      case 'group_created':
        return 'from-blue-100 to-blue-50';
      case 'settlement':
        return 'from-purple-100 to-purple-50';
      default:
        return 'from-gray-100 to-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      if (diffInHours < 1) {
        return 'Just now';
      }
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

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

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">📋</span>
          </div>
          <div>
            <h1 className="text-white mb-1">Activity</h1>
            <p className="text-white/80">Your recent transactions</p>
          </div>
        </div>
      </div>

      <div className="px-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="p-4 hover:bg-purple-50 cursor-pointer transition-colors"
                >
                  <div className="flex gap-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${getActivityColor(
                        activity.type
                      )} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}
                    >
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="mb-1">{activity.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-gray-500 text-sm">
                          {formatDate(activity.date)}
                        </span>
                        {activity.groupName && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-purple-50 text-purple-700 border-purple-200"
                          >
                            {activity.groupName}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {activity.amount && (
                      <div className="text-right flex-shrink-0">
                        <p
                          className={
                            activity.type === 'payment' || activity.type === 'settlement'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }
                        >
                          {activity.type === 'payment' || activity.type === 'settlement'
                            ? '+'
                            : '-'}
                          ₹{activity.amount.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filter Options */}
        <div className="mt-4 flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="bg-white">
            All Activity
          </Button>
          <Button variant="outline" size="sm">
            Payments
          </Button>
          <Button variant="outline" size="sm">
            Expenses
          </Button>
          <Button variant="outline" size="sm">
            Settlements
          </Button>
        </div>
      </div>
    </div>
  );
}
