import { useState } from 'react';
import { ArrowLeft, Plus, Users as UsersIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { NavigationState } from '../../App';
import { getGroupById } from '../../data/splitBillData';

interface AddExpenseProps {
  groupId?: string;
  onNavigate: (state: NavigationState) => void;
}

export function AddExpense({ groupId, onNavigate }: AddExpenseProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('you');
  const [splitType, setSplitType] = useState<'equal' | 'full'>('equal');
  const [selectedGroup, setSelectedGroup] = useState(groupId || '');

  const group = groupId ? getGroupById(groupId) : undefined;

  const handleSubmit = () => {
    // In a real app, this would save the expense
    if (groupId) {
      onNavigate({ page: 'group-detail', groupId });
    } else {
      onNavigate({ page: 'dashboard' });
    }
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-b-[2rem] p-6 pb-8 shadow-xl mb-6">
        <Button
          variant="ghost"
          onClick={() =>
            groupId
              ? onNavigate({ page: 'group-detail', groupId })
              : onNavigate({ page: 'dashboard' })
          }
          className="mb-4 text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-white mb-1">Add Expense</h1>
            <p className="text-white/80">
              {group ? `Adding to ${group.name}` : 'Create new expense'}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-4">
        {/* Group Selection (if no groupId provided) */}
        {!groupId && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle>Select Group</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">🏔️ Manali Trip</SelectItem>
                  <SelectItem value="2">🌙 Night Out Squad</SelectItem>
                  <SelectItem value="3">🏠 Roommates</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* Expense Details */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle>Expense Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="e.g., Petrol, Dinner, Hotel booking"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="category">Category (Optional)</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">🍔 Food & Drinks</SelectItem>
                  <SelectItem value="transport">🚗 Transport</SelectItem>
                  <SelectItem value="accommodation">🏨 Accommodation</SelectItem>
                  <SelectItem value="entertainment">🎬 Entertainment</SelectItem>
                  <SelectItem value="utilities">⚡ Utilities</SelectItem>
                  <SelectItem value="other">📦 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Who Paid */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle>Who Paid?</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paidBy} onValueChange={setPaidBy}>
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-purple-50 cursor-pointer">
                <RadioGroupItem value="you" id="you" />
                <Label htmlFor="you" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span>😊</span>
                    <span>You</span>
                  </div>
                </Label>
              </div>
              {group?.members
                .filter((m) => m.id !== '1')
                .map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center space-x-2 p-3 rounded-lg hover:bg-purple-50 cursor-pointer"
                  >
                    <RadioGroupItem value={member.id} id={member.id} />
                    <Label htmlFor={member.id} className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span>{member.avatar}</span>
                        <span>{member.name}</span>
                      </div>
                    </Label>
                  </div>
                ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Split Type */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle>How to Split?</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={splitType} onValueChange={(v) => setSplitType(v as 'equal' | 'full')}>
              <div className="flex items-center space-x-2 p-4 rounded-lg border-2 border-purple-200 bg-purple-50 cursor-pointer mb-3">
                <RadioGroupItem value="equal" id="equal" />
                <Label htmlFor="equal" className="flex-1 cursor-pointer">
                  <div>
                    <p>Split Equally</p>
                    <p className="text-gray-600 text-sm">
                      Divide amount equally among all members
                    </p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 rounded-lg border-2 border-gray-200 hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="full" id="full" />
                <Label htmlFor="full" className="flex-1 cursor-pointer">
                  <div>
                    <p>Full Amount</p>
                    <p className="text-gray-600 text-sm">
                      One person pays the full amount
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Members to Include */}
        {group && splitType === 'equal' && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <UsersIcon className="w-5 h-5" />
                  Split Among
                </span>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Person
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {group.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{member.avatar}</span>
                      <span>{member.name}</span>
                    </div>
                    {amount && (
                      <span className="text-purple-600">
                        ₹{(parseFloat(amount) / group.members.length).toFixed(2)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Balance Summary */}
        {amount && parseFloat(amount) > 0 && (
          <Card className="border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
            <CardContent className="p-4">
              <h3 className="mb-3">Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Amount</span>
                  <span>₹{parseFloat(amount).toLocaleString()}</span>
                </div>
                {splitType === 'equal' && group && (
                  <div className="flex justify-between">
                    <span>Per Person</span>
                    <span>₹{(parseFloat(amount) / group.members.length).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-white/20">
                  <span>
                    {paidBy === 'you'
                      ? splitType === 'equal'
                        ? "You'll be owed"
                        : 'You paid'
                      : `You owe ${
                          group?.members.find((m) => m.id === paidBy)?.name || 'them'
                        }`}
                  </span>
                  <span className="text-green-300">
                    {paidBy === 'you' && splitType === 'equal' && group
                      ? `₹${(
                          parseFloat(amount) -
                          parseFloat(amount) / group.members.length
                        ).toFixed(2)}`
                      : splitType === 'equal' && group
                      ? `₹${(parseFloat(amount) / group.members.length).toFixed(2)}`
                      : `₹${parseFloat(amount).toFixed(2)}`}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!description || !amount || parseFloat(amount) <= 0}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          size="lg"
        >
          Add Expense
        </Button>
      </div>
    </div>
  );
}
