import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  PlayCircle,
  Filter,
  Grid3X3,
  List
} from "lucide-react";
import { mockSubjects } from "@/data/mockData";
import { useState } from "react";

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredSubjects = mockSubjects.filter(subject =>
    subject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-primary-glow/10 to-primary/10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Learning Hub</h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Master core computer science subjects with structured learning paths, 
              interactive content, and hands-on practice.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredSubjects.length} of {mockSubjects.length} subjects
          </p>
        </div>

        {/* Subjects Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredSubjects.map((subject) => (
            <Card 
              key={subject.id} 
              className={`group hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                viewMode === 'list' ? 'flex flex-row' : ''
              }`}
            >
              <CardHeader className={viewMode === 'list' ? 'flex-1' : ''}>
                <div className="flex items-start space-x-3">
                  <div className="text-4xl">{subject.icon}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {subject.title}
                      </CardTitle>
                      <Badge variant={subject.progress > 0 ? 'default' : 'secondary'}>
                        {subject.progress > 0 ? 'In Progress' : 'Not Started'}
                      </Badge>
                    </div>
                    <CardDescription>
                      {subject.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className={`space-y-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>

                {/* Topics Summary */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-success" />
                    {subject.topics.filter(t => t.completed).length} completed
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {subject.topics.length} topics total
                  </div>
                </div>

                {/* Popular Topics Preview */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Popular Topics:</h4>
                  <div className="flex flex-wrap gap-1">
                    {subject.topics.slice(0, 3).map((topic) => (
                      <Badge 
                        key={topic.id} 
                        variant="outline" 
                        className={`text-xs ${topic.completed ? 'bg-success/10 text-success border-success/20' : ''}`}
                      >
                        {topic.completed && <CheckCircle2 className="mr-1 h-3 w-3" />}
                        {topic.title}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full" asChild>
                  <Link to={`/learn/${subject.slug}`}>
                    {subject.progress > 0 ? (
                      <>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Continue Learning
                      </>
                    ) : (
                      <>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Start Learning
                      </>
                    )}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No subjects found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search query or browse all available subjects.
            </p>
            <Button onClick={() => setSearchQuery('')}>
              Show All Subjects
            </Button>
          </div>
        )}

        {/* Learning Stats */}
        <section className="mt-16 bg-gradient-to-r from-accent/50 to-accent/30 rounded-2xl p-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold">Your Learning Journey</h2>
            <p className="text-muted-foreground">Track your progress across all subjects</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {mockSubjects.filter(s => s.progress > 0).length}
              </div>
              <div className="text-sm text-muted-foreground">Subjects Started</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">
                {mockSubjects.reduce((acc, s) => acc + s.topics.filter(t => t.completed).length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Topics Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning mb-1">
                {Math.round(mockSubjects.reduce((acc, s) => acc + s.progress, 0) / mockSubjects.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Average Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {mockSubjects.filter(s => s.progress === 100).length}
              </div>
              <div className="text-sm text-muted-foreground">Subjects Mastered</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Learn;