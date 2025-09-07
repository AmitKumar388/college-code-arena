import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Code, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Users,
  TrendingUp,
  Target,
  BookOpen
} from "lucide-react";
import { mockProblems } from "@/data/mockData";
import { cn } from "@/lib/utils";

const Practice = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");

  // Get all unique tags
  const allTags = Array.from(new Set(mockProblems.flatMap(p => p.tags)));

  // Filter problems
  const filteredProblems = mockProblems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = difficultyFilter === "all" || problem.difficulty === difficultyFilter;
    const matchesStatus = statusFilter === "all" || problem.status === statusFilter;
    const matchesTag = tagFilter === "all" || problem.tags.includes(tagFilter);
    
    return matchesSearch && matchesDifficulty && matchesStatus && matchesTag;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-problem-easy border-problem-easy bg-problem-easy/10';
      case 'Medium': return 'text-problem-medium border-problem-medium bg-problem-medium/10';
      case 'Hard': return 'text-problem-hard border-problem-hard bg-problem-hard/10';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'solved': return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'attempted': return <XCircle className="h-4 w-4 text-error" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-primary-glow/10 to-primary/10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Practice Problems</h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Sharpen your coding skills with our curated collection of problems. 
              From beginner-friendly to expert-level challenges.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-card rounded-lg border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search problems or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="solved">Solved</SelectItem>
                <SelectItem value="attempted">Attempted</SelectItem>
                <SelectItem value="unsolved">Unsolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{mockProblems.length}</div>
              <div className="text-sm text-muted-foreground">Total Problems</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success mb-1">
                {mockProblems.filter(p => p.status === 'solved').length}
              </div>
              <div className="text-sm text-muted-foreground">Solved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning mb-1">
                {mockProblems.filter(p => p.status === 'attempted').length}
              </div>
              <div className="text-sm text-muted-foreground">Attempted</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-muted-foreground mb-1">
                {mockProblems.filter(p => !p.status || p.status === 'unsolved').length}
              </div>
              <div className="text-sm text-muted-foreground">Unsolved</div>
            </CardContent>
          </Card>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProblems.length} of {mockProblems.length} problems
          </p>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          {filteredProblems.map((problem) => (
            <Card key={problem.id} className="group hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    {/* Problem Header */}
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(problem.status)}
                      <Link 
                        to={`/problems/${problem.slug}`}
                        className="text-lg font-semibold hover:text-primary transition-colors group-hover:text-primary"
                      >
                        {problem.title}
                      </Link>
                      <Badge 
                        variant="outline" 
                        className={cn("font-medium", getDifficultyColor(problem.difficulty))}
                      >
                        {problem.difficulty}
                      </Badge>
                    </div>

                    {/* Problem Description */}
                    <p className="text-muted-foreground line-clamp-2">
                      {problem.statement}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {problem.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <CheckCircle2 className="mr-1 h-4 w-4 text-success" />
                        <span>{problem.solved}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        <span>{problem.total}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="mr-1 h-4 w-4" />
                        <span>{Math.round((problem.solved / problem.total) * 100)}% success</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{problem.timeLimit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="ml-6">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/problems/${problem.slug}`}>
                        <Code className="mr-2 h-4 w-4" />
                        Solve
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No problems found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search query to find problems.
            </p>
            <Button onClick={() => {
              setSearchQuery("");
              setDifficultyFilter("all");
              setStatusFilter("all");
              setTagFilter("all");
            }}>
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Practice Tips */}
        <section className="mt-16 bg-gradient-to-r from-accent/50 to-accent/30 rounded-2xl p-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold">Practice Tips</h2>
            <p className="text-muted-foreground">Make the most of your practice sessions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <Target className="mx-auto h-8 w-8 text-primary" />
              <h3 className="font-semibold">Start with Easy</h3>
              <p className="text-sm text-muted-foreground">
                Build confidence with easier problems before tackling harder ones.
              </p>
            </div>
            <div className="text-center space-y-2">
              <Clock className="mx-auto h-8 w-8 text-primary" />
              <h3 className="font-semibold">Time Yourself</h3>
              <p className="text-sm text-muted-foreground">
                Practice under time constraints to simulate contest conditions.
              </p>
            </div>
            <div className="text-center space-y-2">
              <BookOpen className="mx-auto h-8 w-8 text-primary" />
              <h3 className="font-semibold">Learn from Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Study editorial solutions to understand different approaches.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Practice;