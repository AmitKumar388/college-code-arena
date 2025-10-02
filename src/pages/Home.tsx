import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Clock, 
  Users, 
  BookOpen, 
  Code, 
  TrendingUp,
  Calendar,
  Award,
  Target,
  Zap,
  Building2
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

const Home = () => {
  // Fetch contests
  const { data: contests } = useQuery({
    queryKey: ['contests'],
    queryFn: async () => {
      // @ts-ignore - Database types not yet generated
      const { data, error } = await supabase
        .from('contests')
        .select('*')
        .eq('status', 'upcoming')
        .order('start_time', { ascending: true })
        .limit(2);
      if (error) throw error;
      return data as any[];
    }
  });

  // Fetch top performers
  const { data: topPerformers } = useQuery({
    queryKey: ['top-performers'],
    queryFn: async () => {
      // @ts-ignore - Database types not yet generated
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('rating', { ascending: false })
        .limit(3);
      if (error) throw error;
      return data as any[];
    }
  });

  // Fetch subjects
  const { data: subjects } = useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      // @ts-ignore - Database types not yet generated
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .limit(3);
      if (error) throw error;
      return data as any[];
    }
  });

  // Fetch companies
  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      // @ts-ignore - Database types not yet generated
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('placement_count', { ascending: false })
        .limit(8);
      if (error) throw error;
      return data as any[];
    }
  });

  const upcomingContests = contests || [];
  const topUsers = topPerformers || [];
  const featuredSubjects = subjects || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-primary">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary-foreground tracking-tight">
                Master <span className="text-white">Coding</span>
                <br />
                Competitions
              </h1>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-primary-foreground/90 leading-relaxed">
                Your ultimate platform for competitive programming. Learn, practice, and compete 
                with fellow students at the college level.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 hover:scale-105 transition-transform" asChild>
                <Link to="/practice">
                  <Target className="mr-2 h-5 w-5" />
                  Start Practicing
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 hover:scale-105 transition-all" asChild>
                <Link to="/contests">
                  <Trophy className="mr-2 h-5 w-5" />
                  Join Contest
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-foreground mb-2">1,247</div>
                <div className="text-primary-foreground/80 text-sm">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-foreground mb-2">892</div>
                <div className="text-primary-foreground/80 text-sm">Problems Solved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-foreground mb-2">156</div>
                <div className="text-primary-foreground/80 text-sm">Contests Held</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      {companies && companies.length > 0 && (
        <section className="bg-gradient-to-br from-secondary/50 via-background to-secondary/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-3">Our Students are placed at:</h2>
              <p className="text-muted-foreground">Top companies trust our platform to train future developers</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 items-center">
              {companies.map((company: any) => (
                <div 
                  key={company.id}
                  className="group flex items-center justify-center p-6 bg-card rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 border border-border/50"
                >
                  {company.logo_url ? (
                    <img 
                      src={company.logo_url} 
                      alt={company.name}
                      className="h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-semibold text-lg text-muted-foreground group-hover:text-foreground transition-colors">
                        {company.name}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Upcoming Contests */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Upcoming Contests</h2>
              <p className="text-muted-foreground mt-2">Don't miss out on these exciting competitions</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/contests">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingContests.map((contest: any) => (
              <Card key={contest.id} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {contest.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {contest.description}
                      </CardDescription>
                    </div>
                    <Badge variant={contest.type === 'Rated' ? 'default' : 'secondary'}>
                      {contest.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {contest.duration}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="mr-2 h-4 w-4" />
                      {contest.participants_count} registered
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {formatDistanceToNow(new Date(contest.start_time), { addSuffix: true })}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Code className="mr-2 h-4 w-4" />
                      {contest.duration}
                    </div>
                  </div>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to={`/contests/${contest.id}`}>
                      Register Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Performers */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Top Performers This Month</h2>
              <p className="text-muted-foreground mt-2">Celebrating our coding champions</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/leaderboard">View Leaderboard</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topUsers.map((user: any, index: number) => (
              <Card key={user.id} className={`text-center hover:shadow-lg transition-all duration-300 ${
                index === 0 ? 'ring-2 ring-warning shadow-lg' : ''
              }`}>
                <CardHeader className="pb-4">
                  <div className="relative mx-auto">
                    <Avatar className="h-16 w-16 mx-auto border-4 border-background shadow-lg">
                      <AvatarImage src={user.avatar_url} alt={user.name} />
                      <AvatarFallback className="text-lg font-bold">
                        {user.name?.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {index === 0 && (
                      <div className="absolute -top-2 -right-2">
                        <Award className="h-6 w-6 text-warning" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription>{user.year} • {user.branch}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-primary text-lg">{user.rating}</div>
                      <div className="text-muted-foreground">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-success text-lg">{user.solved}</div>
                      <div className="text-muted-foreground">Solved</div>
                    </div>
                  </div>
                  {user.badges && user.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-center">
                      {user.badges.slice(0, 2).map((badge: string) => (
                        <Badge key={badge} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {user.streak > 0 && (
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Zap className="mr-1 h-4 w-4 text-warning" />
                      {user.streak} day streak
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Learning */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Quick Learning</h2>
              <p className="text-muted-foreground mt-2">Jump into your favorite subjects</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/learn">Explore All Subjects</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSubjects.map((subject: any) => (
              <Card key={subject.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{subject.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {subject.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 mt-1">
                        {subject.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{subject.total_topics} topics</span>
                    <div className="flex items-center">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      <span>Popular</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to={`/learn/${subject.slug}`}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Continue Learning
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
