import { ArrowLeft, CreditCard, MapPin, Smartphone, IndianRupee, CheckCircle2, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface MetroCardPageProps {
  onBack: () => void;
}

export function MetroCardPage({ onBack }: MetroCardPageProps) {
  const cardTypes = [
    {
      name: 'Smart Card',
      type: 'Reloadable',
      minBalance: '₹100',
      maxBalance: '₹3,000',
      validity: 'No Expiry',
      description: 'Perfect for regular travelers',
      color: 'from-blue-500 to-blue-700',
    },
    {
      name: 'Tourist Card',
      type: 'Limited Period',
      minBalance: '₹150',
      maxBalance: '₹500',
      validity: '1-3 Days',
      description: 'Ideal for tourists and visitors',
      color: 'from-green-500 to-green-700',
    },
  ];

  const steps = [
    {
      icon: MapPin,
      title: 'Visit Metro Station',
      description: 'Go to any metro station customer care center or ticket counter',
    },
    {
      icon: CreditCard,
      title: 'Choose Card Type',
      description: 'Select between Smart Card or Tourist Card based on your needs',
    },
    {
      icon: IndianRupee,
      title: 'Pay & Recharge',
      description: 'Pay security deposit (₹50 for Smart Card) and initial recharge amount',
    },
    {
      icon: CheckCircle2,
      title: 'Start Using',
      description: 'Your card is ready to use immediately at all metro stations',
    },
  ];

  const rechargeOptions = [
    {
      icon: Building2,
      title: 'Metro Station',
      description: 'Visit any metro station counter or use automatic recharge machines',
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Download the official metro app and recharge online via UPI or cards',
    },
    {
      icon: CreditCard,
      title: 'Online Portal',
      description: 'Use the metro website to recharge your card from home',
    },
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 hover:bg-white/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-teal-700 rounded-full mb-3 shadow-lg">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-2">Get Your Metro Card</h1>
          <p className="text-gray-600">
            Everything you need to know about metro cards
          </p>
        </div>
      </div>

      {/* Card Types */}
      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="mb-4 text-center">Card Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cardTypes.map((card) => (
            <Card key={card.name} className="shadow-lg border-0 overflow-hidden">
              <div className={`h-32 bg-gradient-to-br ${card.color} p-6 text-white`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="mb-1">{card.name}</h3>
                    <Badge className="bg-white/20 text-white border-white/30">
                      {card.type}
                    </Badge>
                  </div>
                  <CreditCard className="w-8 h-8" />
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-gray-600 mb-4">{card.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Min Balance</span>
                    <span>{card.minBalance}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Max Balance</span>
                    <span>{card.maxBalance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Validity</span>
                    <span className="text-green-600">{card.validity}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How to Get Card */}
      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="mb-4 text-center">How to Get Your Card</h2>
        <Card className="shadow-xl border-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recharge Options */}
      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="mb-4 text-center">Recharge Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rechargeOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="mb-2">{option.title}</h3>
                  <p className="text-gray-600">{option.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Important Information */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• Security deposit of ₹50 is refundable when you return the Smart Card</li>
              <li>• Keep your card safe - lost cards cannot be replaced</li>
              <li>• Card balance can be checked at ticket counters or on the mobile app</li>
              <li>• Tourist cards are non-refundable and cannot be recharged</li>
              <li>• Minimum recharge amount is ₹100 for Smart Cards</li>
              <li>• Cards are valid across all metro lines and stations</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
