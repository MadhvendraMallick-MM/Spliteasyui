import { useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, IndianRupee, Navigation, MapPin, Repeat } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { metroStations, calculateRoute, type Route } from '../data/metroData';
import { Badge } from './ui/badge';

interface RouteFinderPageProps {
  onBack: () => void;
}

export function RouteFinderPage({ onBack }: RouteFinderPageProps) {
  const [fromStation, setFromStation] = useState<string>('');
  const [toStation, setToStation] = useState<string>('');
  const [route, setRoute] = useState<Route | null>(null);

  const handleFindRoute = () => {
    if (fromStation && toStation) {
      const calculatedRoute = calculateRoute(fromStation, toStation);
      setRoute(calculatedRoute);
    }
  };

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full mb-3 shadow-lg">
            <Navigation className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-2">Find Your Route</h1>
          <p className="text-gray-600">
            Get the fastest route with fare and time estimates
          </p>
        </div>
      </div>

      {/* Route Selection Card */}
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border-0 mb-6">
          <CardHeader>
            <CardTitle>Select Stations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* From Station */}
            <div>
              <label className="block mb-2 text-gray-700">From Station</label>
              <Select value={fromStation} onValueChange={setFromStation}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <SelectValue placeholder="Select departure station" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {metroStations.map((station) => (
                    <SelectItem key={station.id} value={station.id}>
                      {station.name} ({station.line})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwapStations}
                className="rounded-full hover:bg-blue-50"
              >
                <Repeat className="w-4 h-4" />
              </Button>
            </div>

            {/* To Station */}
            <div>
              <label className="block mb-2 text-gray-700">To Station</label>
              <Select value={toStation} onValueChange={setToStation}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <SelectValue placeholder="Select destination station" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {metroStations.map((station) => (
                    <SelectItem key={station.id} value={station.id}>
                      {station.name} ({station.line})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Find Route Button */}
            <Button
              onClick={handleFindRoute}
              disabled={!fromStation || !toStation || fromStation === toStation}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Find Best Route
            </Button>
          </CardContent>
        </Card>

        {/* Route Result */}
        {route && (
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Route Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600 mb-1">Duration</p>
                  <p className="text-blue-600">{route.duration} min</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <IndianRupee className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-gray-600 mb-1">Fare</p>
                  <p className="text-green-600">₹{route.fare}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <Navigation className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-gray-600 mb-1">Distance</p>
                  <p className="text-purple-600">{route.distance} km</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <Repeat className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <p className="text-gray-600 mb-1">Changes</p>
                  <p className="text-orange-600">{route.interchanges}</p>
                </div>
              </div>

              {/* Route Path */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Your Journey ({route.stations.length} stations)
                </h3>
                <div className="space-y-3">
                  {route.stations.map((station, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        {index === 0 ? (
                          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow" />
                        ) : index === route.stations.length - 1 ? (
                          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow" />
                        ) : (
                          <div className="w-3 h-3 bg-blue-400 rounded-full" />
                        )}
                        {index < route.stations.length - 1 && (
                          <div className="w-0.5 h-8 bg-blue-300" />
                        )}
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-gray-700">{station}</span>
                        {index === 0 && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Start
                          </Badge>
                        )}
                        {index === route.stations.length - 1 && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            End
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Tips */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-blue-900 mb-2">Travel Tips</h4>
                <ul className="space-y-1 text-blue-800">
                  <li>• Peak hours: 8-10 AM and 5-8 PM</li>
                  <li>• Keep your metro card ready for faster entry</li>
                  {route.interchanges > 0 && (
                    <li>• Follow signs for line changes at interchange stations</li>
                  )}
                  <li>• Stand on the right side of escalators</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
