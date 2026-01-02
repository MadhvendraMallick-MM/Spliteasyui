import { ArrowLeft, Construction, Calendar, Ruler, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { upcomingProjects } from '../data/metroData';

interface UpcomingProjectsPageProps {
  onBack: () => void;
}

export function UpcomingProjectsPage({ onBack }: UpcomingProjectsPageProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Construction':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Planning Phase':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-red-700 rounded-full mb-3 shadow-lg">
            <Construction className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-2">Upcoming Projects</h1>
          <p className="text-gray-600">
            Explore future metro expansions and new corridors
          </p>
        </div>
      </div>

      {/* Projects List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {upcomingProjects.map((project) => (
          <Card key={project.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="mb-2">{project.name}</CardTitle>
                  <p className="text-gray-600">{project.description}</p>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3">
                  <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">Completion</p>
                    <p className="text-blue-900">{project.expectedCompletion}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-purple-50 rounded-lg p-3">
                  <Ruler className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">Length</p>
                    <p className="text-purple-900">{project.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-green-50 rounded-lg p-3">
                  <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">Stations</p>
                    <p className="text-green-900">{project.stations} new</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-orange-50 rounded-lg p-3">
                  <Construction className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p className="text-orange-900">Active</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <div className="max-w-4xl mx-auto mt-8">
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 text-white shadow-lg">
          <CardContent className="p-6">
            <h3 className="mb-2">Future Vision</h3>
            <p>
              These expansion projects will add over 70 kilometers of new metro lines and more than 45 stations, 
              improving connectivity across the city and reducing travel time for millions of commuters.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
