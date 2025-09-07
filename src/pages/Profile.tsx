import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Zap, Target, Calendar } from "lucide-react";
import { mockUsers } from "@/data/mockData";

const Profile = () => {
  const user = mockUsers[0]; // Current user

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <p className="text-muted-foreground">{user.year} Year • {user.branch}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Trophy className="mr-2 h-4 w-4 text-warning" />
                    <span className="font-semibold">{user.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="mr-2 h-4 w-4 text-success" />
                    <span>{user.solved} solved</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="mr-2 h-4 w-4 text-primary" />
                    <span>{user.streak} day streak</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.badges.map(badge => (
                <Badge key={badge} variant="secondary">
                  <Star className="mr-1 h-3 w-3" />
                  {badge}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Problem Solving Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Easy Problems</span>
                    <span>45/100</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Medium Problems</span>
                    <span>23/80</span>
                  </div>
                  <Progress value={29} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Hard Problems</span>
                    <span>5/50</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Solved "Two Sum" - 2 hours ago</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Participated in Weekly Contest - 1 day ago</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Earned "Problem Solver" badge - 3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;