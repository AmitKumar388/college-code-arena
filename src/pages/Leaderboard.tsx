import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  Calendar,
  Users,
  Target,
  Crown,
  Star,
  Zap
} from "lucide-react";
import { mockLeaderboard, mockUsers } from "@/data/mockData";
import { formatDistanceToNow } from "date-fns";

const Leaderboard = () => {
  const [timeRange, setTimeRange] = useState("all");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-warning" />;
      case 2: return <Medal className="h-5 w-5 text-muted-foreground" />;
      case 3: return <Award className="h-5 w-5 text-orange-500" />;
      default: return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-warning text-warning-foreground";
      case 2: return "bg-muted text-muted-foreground";
      case 3: return "bg-orange-500 text-white";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const LeaderboardTable = ({ entries }: { entries: any[] }) => (
    <div className="space-y-2">
      {entries.map((entry) => (
        <Card key={entry.user.id} className={`transition-all duration-200 hover:shadow-md ${
          entry.rank <= 3 ? 'ring-2 ring-primary/20 bg-primary/5' : ''
        }`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Rank */}
                <div className="flex items-center justify-center min-w-[3rem]">
                  {entry.rank <= 3 ? (
                    <div className="flex flex-col items-center">
                      {getRankIcon(entry.rank)}
                      <Badge className={`text-xs mt-1 ${getRankBadgeColor(entry.rank)}`}>
                        #{entry.rank}
                      </Badge>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-lg font-bold text-muted-foreground">#{entry.rank}</div>
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 border-2 border-background shadow-md">
                    <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                    <AvatarFallback className="font-semibold">
                      {entry.user.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{entry.user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {entry.user.year} Year • {entry.user.branch}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Zap className="mr-1 h-3 w-3 text-warning" />
                        {entry.user.streak} day streak
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 text-center">
                <div>
                  <div className="text-lg font-bold text-primary">{entry.score}</div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-success">{entry.solved}</div>
                  <div className="text-xs text-muted-foreground">Solved</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-warning">{entry.user.rating}</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(entry.lastSubmission), { addSuffix: true })}
                  </div>
                  <div className="text-xs text-muted-foreground">Last Active</div>
                </div>
              </div>
            </div>

            {/* Badges */}
            {entry.user.badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3 ml-20">
                {entry.user.badges.slice(0, 3).map((badge: string) => (
                  <Badge key={badge} variant="secondary" className="text-xs">
                    <Star className="mr-1 h-3 w-3" />
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-primary-glow/10 to-primary/10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Leaderboard</h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              See how you rank against your peers. Compete, learn, and climb to the top!
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top 3 Podium */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Hall of Fame</h2>
            <p className="text-muted-foreground">Our top performers this month</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {mockLeaderboard.slice(0, 3).map((entry, index) => (
              <Card key={entry.user.id} className={`text-center relative overflow-hidden ${
                index === 0 ? 'md:scale-110 md:-mt-4 ring-2 ring-warning shadow-xl' : 
                index === 1 ? 'md:mt-8' : 'md:mt-8'
              }`}>
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                  index === 0 ? 'bg-warning' : index === 1 ? 'bg-muted-foreground' : 'bg-orange-500'
                }`} />
                
                <CardHeader className="pb-4">
                  <div className="relative mx-auto mb-4">
                    <Avatar className="h-20 w-20 mx-auto border-4 border-background shadow-lg">
                      <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                      <AvatarFallback className="text-xl font-bold">
                        {entry.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-2 -right-2">
                      <div className={`p-2 rounded-full ${
                        index === 0 ? 'bg-warning' : index === 1 ? 'bg-muted-foreground' : 'bg-orange-500'
                      }`}>
                        {getRankIcon(entry.rank)}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{entry.user.name}</CardTitle>
                  <CardDescription>{entry.user.year} Year • {entry.user.branch}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-primary text-xl">{entry.score}</div>
                      <div className="text-muted-foreground">Score</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-success text-xl">{entry.solved}</div>
                      <div className="text-muted-foreground">Solved</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="font-bold text-warning text-lg">{entry.user.rating}</div>
                    <div className="text-muted-foreground text-sm">Rating</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 justify-center">
                    {entry.user.badges.slice(0, 2).map((badge) => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        <Star className="mr-1 h-3 w-3" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
                <SelectItem value="weekly">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="overall" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="fy">FY</TabsTrigger>
            <TabsTrigger value="sy">SY</TabsTrigger>
            <TabsTrigger value="ty">TY</TabsTrigger>
            <TabsTrigger value="final">Final Year</TabsTrigger>
          </TabsList>

          <TabsContent value="overall">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span>Overall Rankings</span>
                </CardTitle>
                <CardDescription>
                  Rankings across all students regardless of year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardTable entries={mockLeaderboard} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>First Year Rankings</span>
                </CardTitle>
                <CardDescription>
                  Top performers in First Year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No FY students yet</h3>
                  <p className="text-muted-foreground">
                    First year students will appear here once they start participating.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Second Year Rankings</span>
                </CardTitle>
                <CardDescription>
                  Top performers in Second Year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardTable entries={mockLeaderboard.filter(e => e.user.year === 'SY')} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ty">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Third Year Rankings</span>
                </CardTitle>
                <CardDescription>
                  Top performers in Third Year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardTable entries={mockLeaderboard.filter(e => e.user.year === 'TY')} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="final">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Final Year Rankings</span>
                </CardTitle>
                <CardDescription>
                  Top performers in Final Year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardTable entries={mockLeaderboard.filter(e => e.user.year === 'Final')} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Achievement Stats */}
        <section className="mt-16 bg-gradient-to-r from-accent/50 to-accent/30 rounded-2xl p-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold">Competition Stats</h2>
            <p className="text-muted-foreground">See how competitive our community is</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {mockUsers.length}
              </div>
              <div className="text-sm text-muted-foreground">Active Coders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">
                {mockUsers.reduce((acc, u) => acc + u.solved, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Solved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning mb-1">
                {Math.round(mockUsers.reduce((acc, u) => acc + u.rating, 0) / mockUsers.length)}
              </div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {Math.max(...mockUsers.map(u => u.streak))}
              </div>
              <div className="text-sm text-muted-foreground">Longest Streak</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Leaderboard;