import { ArrowLeft, User, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { NavigationState } from '../../App';
import { getExpenseById, getMemberName, getGroupById } from '../../data/splitBillData';

interface ExpenseDetailProps {
  expenseId: string;
  onNavigate: (state: NavigationState) => void;
}

export function ExpenseDetail({ expenseId, onNavigate }: ExpenseDetailProps) {
  const expense = getExpenseById(expenseId);

  if (!expense) {
    return (
      <div className="p-6">
        <p>Expense not found</p>
        <Button onClick={() => onNavigate({ page: 'dashboard' })}>Back to Dashboard</Button>
      </div>
    );
  }

  const group = getGroupById(expense.groupId);
  const paidByName = getMemberName(expense.paidBy);
  const yourSplit = expense.splits.find(s => s.memberId === '1');

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-b-[2rem] p-6 pb-8 shadow-xl mb-6">
        <Button
          variant="ghost"
          onClick={() => onNavigate({ page: 'group-detail', groupId: expense.groupId })}
          className="mb-4 text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Group
        </Button>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">💳</span>
          </div>
          <div>
            <h1 className="text-white mb-1">{expense.description}</h1>
            <p className="text-white/80">{group?.name}</p>
          </div>
        </div>

        {/* Total Amount */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4 text-center">
            <p className="text-white/80 mb-1">Total Amount</p>
            <p className="text-white text-3xl">₹{expense.totalAmount.toLocaleString()}</p>
            <p className="text-white/70 text-sm mt-2">
              {new Date(expense.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="px-6 space-y-6">
        {/* Paid By Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Paid By
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow">
                  {expense.paidBy === '1' ? '😊' : '👤'}
                </div>
                <div>
                  <p>{paidByName}</p>
                  <p className="text-gray-500 text-sm">Full amount paid</p>
                </div>
              </div>
              <p className="text-purple-600">₹{expense.totalAmount.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Split Details */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle>Split Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expense.splits.map((split) => {
                const memberName = getMemberName(split.memberId);
                const isPaid = split.paid;

                return (
                  <div
                    key={split.memberId}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                      isPaid
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        {split.memberId === '1' ? '😊' : '👤'}
                      </div>
                      <div>
                        <p>{memberName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {isPaid ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="text-green-600 text-sm">Paid</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-600" />
                              <span className="text-red-600 text-sm">Pending</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={isPaid ? 'text-green-600' : 'text-red-600'}>
                        ₹{split.amount.toLocaleString()}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {((split.amount / expense.totalAmount) * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Your Summary */}
        {yourSplit && (
          <Card className="border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
            <CardContent className="p-6">
              <h3 className="mb-4">Your Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Your Share</span>
                  <span>₹{yourSplit.amount.toLocaleString()}</span>
                </div>
                {expense.paidBy === '1' ? (
                  <>
                    <div className="flex justify-between items-center pb-3 border-b border-white/20">
                      <span>You Paid</span>
                      <span>₹{expense.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>You're Owed</span>
                      <span className="text-green-300">
                        ₹{(expense.totalAmount - yourSplit.amount).toLocaleString()}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <span>You {yourSplit.paid ? 'Paid' : 'Owe'} {paidByName}</span>
                    <span className={yourSplit.paid ? 'text-green-300' : 'text-red-300'}>
                      ₹{yourSplit.amount.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {yourSplit && !yourSplit.paid && expense.paidBy !== '1' && (
          <Button
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
            size="lg"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Mark as Settled
          </Button>
        )}
      </div>
    </div>
  );
}
