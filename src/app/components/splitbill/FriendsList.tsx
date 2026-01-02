import { ArrowLeft, UserPlus, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { NavigationState } from '../../App';
import { mockFriends } from '../../data/splitBillData';

interface FriendsListProps {
  onNavigate: (state: NavigationState) => void;
}

export function FriendsList({ onNavigate }: FriendsListProps) {
  const totalOwed = mockFriends
    .filter((f) => f.balance > 0)
    .reduce((sum, f) => sum + f.balance, 0);
  const totalOwe = Math.abs(
    mockFriends.filter((f) => f.balance < 0).reduce((sum, f) => sum + f.balance, 0)
  );

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

        <div className="mb-6">
          <h1 className="text-white mb-1">Friends</h1>
          <p className="text-white/80">{mockFriends.length} friends added</p>
        </div>

        {/* Balance Summary */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-300 mx-auto mb-2" />
              <p className="text-white/80 mb-1 text-sm">You're Owed</p>
              <p className="text-green-300 text-xl">₹{totalOwed.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <TrendingDown className="w-6 h-6 text-red-300 mx-auto mb-2" />
              <p className="text-white/80 mb-1 text-sm">You Owe</p>
              <p className="text-red-300 text-xl">₹{totalOwe.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="px-6 space-y-4">
        {/* Search & Add Friend */}
        <div className="flex gap-2">
          <Input
            placeholder="Search friends..."
            className="flex-1"
          />
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <UserPlus className="w-5 h-5" />
          </Button>
        </div>

        {/* Friends List */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle>All Friends</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-4 hover:bg-purple-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-2xl">{friend.avatar}</span>
                    </div>
                    <div>
                      <p>{friend.name}</p>
                      <p className="text-gray-500 text-sm">
                        {friend.balance > 0
                          ? 'Owes you'
                          : friend.balance < 0
                          ? 'You owe'
                          : 'Settled up'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {friend.balance > 0 ? (
                      <p className="text-green-600">+₹{friend.balance}</p>
                    ) : friend.balance < 0 ? (
                      <p className="text-red-600">-₹{Math.abs(friend.balance)}</p>
                    ) : (
                      <p className="text-gray-400">₹0</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add from Contacts */}
        <Card className="border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
          <CardContent className="p-6 text-center">
            <UserPlus className="w-12 h-12 mx-auto mb-3" />
            <h3 className="mb-2">Add Friends from Contacts</h3>
            <p className="text-white/80">
              Invite your contacts to join and start splitting bills
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
