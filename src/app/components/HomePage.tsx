import { Train, Clock, CreditCard, Construction, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import type { PageType } from '../App';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const menuItems = [
    {
      id: 'route-finder' as PageType,
      title: 'Find Route',
      description: 'Get the fastest route with fare & time',
      icon: Train,
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'timings' as PageType,
      title: 'Metro Timings',
      description: 'View operating hours & schedules',
      icon: Clock,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      id: 'metro-card' as PageType,
      title: 'Get Metro Card',
      description: 'Learn how to get your metro card',
      icon: CreditCard,
      gradient: 'from-green-500 to-teal-600',
    },
    {
      id: 'projects' as PageType,
      title: 'Upcoming Projects',
      description: 'Explore future metro expansions',
      icon: Construction,
      gradient: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <div className="min-h-screen p-6 flex flex-col">
      {/* Header */}
      <div className="text-center mb-12 mt-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full mb-4 shadow-lg">
          <Train className="w-10 h-10 text-white" />
        </div>
        <h1 className="mb-2">Metro Navigator</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Your comprehensive guide to metro travel - find routes, check timings, and stay updated
        </p>
      </div>

      {/* Menu Cards */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden"
              onClick={() => onNavigate(item.id)}
            >
              <CardContent className="p-0">
                <div className="flex items-center gap-4 p-6">
                  <div
                    className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-12 text-center text-gray-500">
        <p>Metro operates daily from 6:00 AM to 11:00 PM</p>
      </div>
    </div>
  );
}
