import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  PlayCircle,
  Trophy,
  Code,
  HelpCircle
} from "lucide-react";
import { mockSubjects } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const SubjectDetail = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const subject = mockSubjects.find(s => s.slug === slug);

  if (!subject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Subject not found</h1>
          <Button asChild>
            <Link to="/learn">Back to Learning Hub</Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentTopic = subject.topics[selectedTopic];
  const completedTopics = subject.topics.filter(t => t.completed).length;

  const handleQuizSubmit = () => {
    if (!currentTopic.quiz) return;
    
    let correct = 0;
    currentTopic.quiz.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) {
        correct++;
      }
    });
    
    const percentage = (correct / currentTopic.quiz.length) * 100;
    setShowQuizResults(true);
    
    toast({
      title: `Quiz completed!`,
      description: `You scored ${correct}/${currentTopic.quiz.length} (${percentage.toFixed(0)}%)`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-primary-glow/10 to-primary/10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link to="/learn">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Learning Hub
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-5xl">{subject.icon}</div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{subject.title}</h1>
              <p className="text-muted-foreground text-lg">{subject.description}</p>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">
                  {completedTopics}/{subject.topics.length} topics completed
                </Badge>
                <div className="flex items-center gap-2">
                  <Progress value={subject.progress} className="w-32 h-2" />
                  <span className="text-sm font-medium">{subject.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Topic List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Content</CardTitle>
                <CardDescription>
                  {subject.topics.length} topics to master
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {subject.topics.map((topic, index) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedTopic === index
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {topic.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="text-sm font-medium">{topic.title}</span>
                      </div>
                      {selectedTopic === index && (
                        <PlayCircle className="h-4 w-4" />
                      )}
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Topic Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {currentTopic.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      )}
                      {currentTopic.title}
                    </CardTitle>
                    <CardDescription>
                      {currentTopic.completed ? 'Completed' : 'In Progress'}
                    </CardDescription>
                  </div>
                  <Badge variant={currentTopic.completed ? 'default' : 'secondary'}>
                    Topic {selectedTopic + 1} of {subject.topics.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="content">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="quiz" disabled={!currentTopic.quiz}>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Quiz
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="mt-6">
                    <div className="prose prose-sm max-w-none">
                      {currentTopic.content ? (
                        <div 
                          className="space-y-4 text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ 
                            __html: currentTopic.content
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto"><code>$2</code></pre>')
                              .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 rounded">$1</code>')
                              .replace(/\n\n/g, '</p><p>')
                              .replace(/\n/g, '<br>')
                              .replace(/^/, '<p>')
                              .replace(/$/, '</p>')
                          }}
                        />
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <BookOpen className="mx-auto h-12 w-12 mb-4" />
                          <p>Content for this topic is coming soon!</p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-8 pt-6 border-t">
                        <Button 
                          variant="outline" 
                          disabled={selectedTopic === 0}
                          onClick={() => setSelectedTopic(selectedTopic - 1)}
                        >
                          Previous Topic
                        </Button>
                        
                        {!currentTopic.completed && (
                          <Button onClick={() => toast({ title: "Topic marked as complete!" })}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark Complete
                          </Button>
                        )}
                        
                        <Button 
                          disabled={selectedTopic === subject.topics.length - 1}
                          onClick={() => setSelectedTopic(selectedTopic + 1)}
                        >
                          Next Topic
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="quiz" className="mt-6">
                    {currentTopic.quiz ? (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <Trophy className="mx-auto h-8 w-8 text-warning mb-2" />
                          <h3 className="text-lg font-semibold">Test Your Knowledge</h3>
                          <p className="text-muted-foreground">Answer the questions below to check your understanding</p>
                        </div>
                        
                        {currentTopic.quiz.map((question, qIndex) => (
                          <Card key={qIndex}>
                            <CardHeader>
                              <CardTitle className="text-base">
                                Question {qIndex + 1}: {question.question}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <RadioGroup
                                value={quizAnswers[qIndex]?.toString()}
                                onValueChange={(value) => 
                                  setQuizAnswers(prev => ({ ...prev, [qIndex]: parseInt(value) }))
                                }
                              >
                                {question.options.map((option, oIndex) => (
                                  <div key={oIndex} className="flex items-center space-x-2">
                                    <RadioGroupItem 
                                      value={oIndex.toString()} 
                                      id={`q${qIndex}-o${oIndex}`}
                                      disabled={showQuizResults}
                                    />
                                    <Label 
                                      htmlFor={`q${qIndex}-o${oIndex}`}
                                      className={`cursor-pointer ${
                                        showQuizResults
                                          ? oIndex === question.correct
                                            ? 'text-success font-medium'
                                            : quizAnswers[qIndex] === oIndex && oIndex !== question.correct
                                            ? 'text-destructive'
                                            : ''
                                          : ''
                                      }`}
                                    >
                                      {option}
                                      {showQuizResults && oIndex === question.correct && (
                                        <CheckCircle2 className="inline ml-2 h-4 w-4 text-success" />
                                      )}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </CardContent>
                          </Card>
                        ))}
                        
                        {!showQuizResults && (
                          <div className="text-center">
                            <Button 
                              onClick={handleQuizSubmit}
                              disabled={Object.keys(quizAnswers).length < currentTopic.quiz.length}
                              size="lg"
                            >
                              <Trophy className="mr-2 h-4 w-4" />
                              Submit Quiz
                            </Button>
                          </div>
                        )}
                        
                        {showQuizResults && (
                          <div className="text-center">
                            <Button 
                              onClick={() => {
                                setQuizAnswers({});
                                setShowQuizResults(false);
                              }}
                              variant="outline"
                            >
                              Retake Quiz
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <HelpCircle className="mx-auto h-12 w-12 mb-4" />
                          <p>No quiz available for this topic yet.</p>
                        </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;