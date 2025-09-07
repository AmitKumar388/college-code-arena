import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Clock, 
  Users, 
  Calendar,
  Code,
  Play,
  Award,
  Target,
  Timer,
  Medal
} from "lucide-react";
import { mockContests } from "@/data/mockData";
import { formatDistanceToNow, format } from "date-fns";

const Contests = () => {
  const upcomingContests = mockContests.filter(c => c.status === 'upcoming');
  const ongoingContests = mockContests.filter(c => c.status === 'ongoing');
  const pastContests = mockContests.filter(c => c.status === 'ended');

  const getContestStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-primary text-primary-foreground';
      case 'ongoing': return 'bg-success text-success-foreground';
      case 'ended': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Rated': return 'bg-warning text-warning-foreground';
      case 'Practice': return 'bg-secondary text-secondary-foreground';
      case 'Team': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const ContestCard = ({ contest }: { contest: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center space-x-2">
              <CardTitle className="group-hover:text-primary transition-colors">
                {contest.title}
              </CardTitle>
              <Badge className={getContestStatusColor(contest.status)}>
                {contest.status}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2">
              {contest.description}
            </CardDescription>
          </div>
          <Badge className={getTypeColor(contest.type)}>
            {contest.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Contest Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {format(new Date(contest.startTime), 'MMM dd, HH:mm')}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            {contest.duration}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="mr-2 h-4 w-4" />
            {contest.participants} participants
          </div>
          <div className="flex items-center text-muted-foreground">
            <Code className="mr-2 h-4 w-4" />
            {contest.problems.length} problems
          </div>
        </div>

        {/* Time Information */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="text-sm">
            {contest.status === 'upcoming' && (
              <div className="flex items-center text-primary">
                <Timer className="mr-2 h-4 w-4" />
                Starts {formatDistanceToNow(new Date(contest.startTime), { addSuffix: true })}
              </div>
            )}
            {contest.status === 'ongoing' && (
              <div className="flex items-center text-success">
                <Play className="mr-2 h-4 w-4" />
                Ends {formatDistanceToNow(new Date(contest.endTime), { addSuffix: true })}
              </div>
            )}
            {contest.status === 'ended' && (
              <div className="flex items-center text-muted-foreground">
                <Medal className="mr-2 h-4 w-4" />
                Ended {formatDistanceToNow(new Date(contest.endTime), { addSuffix: true })}
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full" 
          variant={contest.status === 'ended' ? 'outline' : 'default'}
          asChild
        >
          <Link to={`/contests/${contest.id}`}>
            {contest.status === 'upcoming' && (
              <>
                <Trophy className="mr-2 h-4 w-4" />
                Register
              </>
            )}
            {contest.status === 'ongoing' && (
              <>
                <Play className="mr-2 h-4 w-4" />
                Join Contest
              </>
            )}
            {contest.status === 'ended' && (
              <>
                <Award className="mr-2 h-4 w-4" />
                View Results
              </>
            )}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-primary-glow/10 to-primary/10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Coding Contests</h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Test your skills against fellow students in timed competitions. 
              Climb the leaderboard and become the coding champion!
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contest Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="mx-auto h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold mb-1">{mockContests.length}</div>
              <div className="text-sm text-muted-foreground">Total Contests</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Play className="mx-auto h-8 w-8 text-success mb-2" />
              <div className="text-2xl font-bold mb-1">{ongoingContests.length}</div>
              <div className="text-sm text-muted-foreground">Ongoing</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Timer className="mx-auto h-8 w-8 text-warning mb-2" />
              <div className="text-2xl font-bold mb-1">{upcomingContests.length}</div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="mx-auto h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold mb-1">1,247</div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </CardContent>
          </Card>
        </div>

        {/* Contest Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming" className="flex items-center space-x-2">
              <Timer className="h-4 w-4" />
              <span>Upcoming ({upcomingContests.length})</span>
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Ongoing ({ongoingContests.length})</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center space-x-2">
              <Medal className="h-4 w-4" />
              <span>Past ({pastContests.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingContests.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingContests.map((contest) => (
                  <ContestCard key={contest.id} contest={contest} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Timer className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No upcoming contests</h3>
                <p className="text-muted-foreground">
                  New contests will be announced soon. Stay tuned!
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ongoing" className="space-y-6">
            {ongoingContests.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {ongoingContests.map((contest) => (
                  <ContestCard key={contest.id} contest={contest} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Play className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No ongoing contests</h3>
                <p className="text-muted-foreground">
                  Check back later for live contests to participate in.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pastContests.map((contest) => (
                <ContestCard key={contest.id} contest={contest} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Contest Guidelines */}
        <section className="mt-16 bg-gradient-to-r from-accent/50 to-accent/30 rounded-2xl p-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold">Contest Guidelines</h2>
            <p className="text-muted-foreground">Everything you need to know about participating</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="bg-primary/10 rounded-full p-3 w-fit mx-auto">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Scoring System</h3>
              <p className="text-sm text-muted-foreground">
                Points are awarded based on difficulty and time taken. Faster submissions get higher scores.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="bg-success/10 rounded-full p-3 w-fit mx-auto">
                <Clock className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold">Time Limits</h3>
              <p className="text-sm text-muted-foreground">
                Each problem has specific time and memory limits. Make sure your solution is efficient.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="bg-warning/10 rounded-full p-3 w-fit mx-auto">
                <Trophy className="h-6 w-6 text-warning" />
              </div>
              <h3 className="font-semibold">Fair Play</h3>
              <p className="text-sm text-muted-foreground">
                Collaboration during contests is not allowed. Use only your own skills and knowledge.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contests;