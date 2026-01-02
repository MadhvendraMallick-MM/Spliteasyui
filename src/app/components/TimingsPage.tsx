import { ArrowLeft, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { metroTimings } from '../data/metroData';

interface TimingsPageProps {
  onBack: () => void;
}

export function TimingsPage({ onBack }: TimingsPageProps) {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-700 rounded-full mb-3 shadow-lg">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-2">Metro Timings</h1>
          <p className="text-gray-600">
            Operating hours and train frequency for all metro lines
          </p>
        </div>
      </div>

      {/* Timings Grid */}
      <div className="max-w-4xl mx-auto space-y-4">
        {metroTimings.map((timing) => (
          <Card key={timing.line} className="shadow-lg border-0 hover:shadow-xl transition-shadow overflow-hidden">
            <div className={`h-2 ${timing.color}`} />
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${timing.color}`} />
                {timing.line}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 bg-green-50 rounded-lg p-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-600">First Train</p>
                    <p className="text-green-900">{timing.firstTrain}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-red-50 rounded-lg p-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-gray-600">Last Train</p>
                    <p className="text-red-900">{timing.lastTrain}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-600">Frequency</p>
                    <p className="text-blue-900">{timing.frequency}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Important Notes */}
      <div className="max-w-4xl mx-auto mt-8 space-y-4">
        <Card className="border-0 bg-yellow-50 border-yellow-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-yellow-900 mb-2">Important Information</h3>
                <ul className="space-y-2 text-yellow-800">
                  <li>• Timings may vary on public holidays and special occasions</li>
                  <li>• Last trains depart 15 minutes before the mentioned closing time</li>
                  <li>• Train frequency increases during peak hours (8-10 AM, 5-8 PM)</li>
                  <li>• Metro services are closed on Holi (Day 1) for maintenance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="mb-2">Peak Hours</h3>
                <p className="mb-3">
                  Trains run more frequently during peak hours to accommodate higher passenger volume.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/20 rounded-lg p-3">
                    <p className="mb-1 opacity-90">Morning Peak</p>
                    <p>8:00 AM - 10:00 AM</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <p className="mb-1 opacity-90">Evening Peak</p>
                    <p>5:00 PM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
