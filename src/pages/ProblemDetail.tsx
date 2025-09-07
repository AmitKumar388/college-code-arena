import { useState } from "react";
import { useParams } from "react-router-dom";
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
import { Separator } from "@/components/ui/separator";
import { 
  Play, 
  Send, 
  Clock, 
  MemoryStick, 
  CheckCircle2, 
  XCircle, 
  Users,
  ThumbsUp,
  MessageSquare,
  BookOpen,
  Code2
} from "lucide-react";
import { mockProblems } from "@/data/mockData";
import { cn } from "@/lib/utils";
import Editor from "@monaco-editor/react";

const ProblemDetail = () => {
  const { slug } = useParams();
  const problem = mockProblems.find(p => p.slug === slug);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(`#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Your solution here
    return 0;
}`);

  if (!problem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Problem Not Found</h1>
          <p className="text-muted-foreground">The problem you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

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
      case 'solved': return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'attempted': return <XCircle className="h-5 w-5 text-error" />;
      default: return null;
    }
  };

  const languageOptions = [
    { value: "cpp", label: "C++", defaultCode: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Your solution here\n    return 0;\n}` },
    { value: "java", label: "Java", defaultCode: `import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Your solution here\n    }\n}` },
    { value: "python", label: "Python", defaultCode: `def solve():\n    # Your solution here\n    pass\n\nif __name__ == "__main__":\n    solve()` },
    { value: "javascript", label: "JavaScript", defaultCode: `function solve() {\n    // Your solution here\n}\n\nsolve();` }
  ];

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    const langOption = languageOptions.find(l => l.value === newLanguage);
    if (langOption) {
      setCode(langOption.defaultCode);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
          {/* Left Panel - Problem Statement */}
          <div className="flex flex-col overflow-hidden">
            {/* Problem Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                {getStatusIcon(problem.status)}
                <h1 className="text-2xl font-bold">{problem.title}</h1>
                <Badge 
                  variant="outline" 
                  className={cn("font-medium", getDifficultyColor(problem.difficulty))}
                >
                  {problem.difficulty}
                </Badge>
              </div>
              
              {/* Stats */}
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle2 className="mr-1 h-4 w-4 text-success" />
                  <span>{problem.solved} solved</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  <span>{problem.total} attempts</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{problem.timeLimit}</span>
                </div>
                <div className="flex items-center">
                  <MemoryStick className="mr-1 h-4 w-4" />
                  <span>{problem.memoryLimit}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {problem.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Problem Content */}
            <div className="flex-1 overflow-y-auto">
              <Tabs defaultValue="statement" className="h-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="statement">Statement</TabsTrigger>
                  <TabsTrigger value="submissions">Submissions</TabsTrigger>
                  <TabsTrigger value="discuss">Discuss</TabsTrigger>
                </TabsList>
                
                <TabsContent value="statement" className="mt-6 space-y-6">
                  {/* Problem Statement */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Problem Statement</h3>
                    <p className="text-foreground leading-relaxed">{problem.statement}</p>
                  </div>

                  {/* Examples */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Examples</h3>
                    <div className="space-y-4">
                      {problem.examples.map((example, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-medium text-sm mb-2">Input:</h4>
                                <pre className="bg-muted p-3 rounded text-sm font-mono">
                                  {example.input}
                                </pre>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm mb-2">Output:</h4>
                                <pre className="bg-muted p-3 rounded text-sm font-mono">
                                  {example.output}
                                </pre>
                              </div>
                              {example.explanation && (
                                <div>
                                  <h4 className="font-medium text-sm mb-2">Explanation:</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {example.explanation}
                                  </p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Constraints */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Constraints</h3>
                    <ul className="space-y-1">
                      {problem.constraints.map((constraint, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {constraint}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="submissions" className="mt-6">
                  <div className="text-center py-8">
                    <Code2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No submissions yet</h3>
                    <p className="text-muted-foreground">
                      Submit your solution to see your submission history.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="discuss" className="mt-6">
                  <div className="text-center py-8">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Join the discussion</h3>
                    <p className="text-muted-foreground mb-4">
                      Share your approach and learn from others.
                    </p>
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Start Discussion
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="flex flex-col">
            {/* Editor Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-sm text-muted-foreground">
                  Time: {problem.timeLimit} | Memory: {problem.memoryLimit}
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 border rounded-lg overflow-hidden">
              <Editor
                height="100%"
                language={language === "cpp" ? "cpp" : language}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  rulers: [80],
                  wordWrap: "on",
                  automaticLayout: true,
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4">
              <Button variant="outline" size="sm">
                <Play className="mr-2 h-4 w-4" />
                Run
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Reset Code
                </Button>
                <Button size="sm" className="bg-success hover:bg-success/90">
                  <Send className="mr-2 h-4 w-4" />
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;