import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Code2, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart,
  BookOpen,
  Trophy,
  Users,
  HelpCircle
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Code2 className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-glow rounded-full animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Code Master
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering students with competitive programming skills through 
              structured learning, practice, and contests at the college level.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Learning */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Learning</h3>
            <nav className="space-y-2">
              {[
                { name: "Data Structures", href: "/learn/data-structures" },
                { name: "Algorithms", href: "/learn/algorithms" },
                { name: "Database Systems", href: "/learn/dbms" },
                { name: "Operating Systems", href: "/learn/operating-systems" },
                { name: "Object-Oriented Programming", href: "/learn/oop" },
                { name: "Software Engineering", href: "/learn/software-engineering" }
              ].map(item => (
                <Link 
                  key={item.name}
                  to={item.href} 
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Practice */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Practice</h3>
            <nav className="space-y-2">
              {[
                { name: "Easy Problems", href: "/practice?difficulty=easy", icon: BookOpen },
                { name: "Medium Problems", href: "/practice?difficulty=medium", icon: BookOpen },
                { name: "Hard Problems", href: "/practice?difficulty=hard", icon: BookOpen },
                { name: "Active Contests", href: "/contests", icon: Trophy },
                { name: "Leaderboard", href: "/leaderboard", icon: Users }
              ].map(item => (
                <Link 
                  key={item.name}
                  to={item.href} 
                  className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <item.icon className="mr-2 h-3 w-3" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <nav className="space-y-2">
              {[
                { name: "Help Center", href: "/help", icon: HelpCircle },
                { name: "Contact Us", href: "/contact", icon: Mail },
                { name: "Terms of Service", href: "/terms", icon: null },
                { name: "Privacy Policy", href: "/privacy", icon: null },
                { name: "Community Guidelines", href: "/guidelines", icon: null }
              ].map(item => (
                <Link 
                  key={item.name}
                  to={item.href} 
                  className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.icon && <item.icon className="mr-2 h-3 w-3" />}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <p>© 2024 Code Master. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-error fill-current" />
            <span>for coding enthusiasts</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;