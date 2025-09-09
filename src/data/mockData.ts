// Mock data for the Code Master platform

export interface User {
  id: string;
  name: string;
  email: string;
  year: 'FY' | 'SY' | 'TY' | 'Final';
  branch: string;
  rating: number;
  solved: number;
  badges: string[];
  streak: number;
  avatar?: string;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  statement: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  timeLimit: string;
  memoryLimit: string;
  solved: number;
  total: number;
  status?: 'solved' | 'attempted' | 'unsolved';
}

export interface Contest {
  id: string;
  title: string;
  type: 'Practice' | 'Rated' | 'Team';
  startTime: string;
  endTime: string;
  duration: string;
  problems: string[];
  participants: number;
  status: 'upcoming' | 'ongoing' | 'ended';
  description: string;
}

export interface Subject {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  topics: {
    id: string;
    title: string;
    completed: boolean;
    content?: string;
    quiz?: {
      question: string;
      options: string[];
      correct: number;
    }[];
  }[];
  progress: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  score: number;
  solved: number;
  penalty: number;
  lastSubmission: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Arjun Sharma',
    email: 'arjun@college.edu',
    year: 'TY',
    branch: 'Computer Engineering',
    rating: 1847,
    solved: 234,
    badges: ['Problem Solver', 'Contest Winner', 'Streak Master'],
    streak: 15
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya@college.edu',
    year: 'Final',
    branch: 'Information Technology',
    rating: 1923,
    solved: 298,
    badges: ['Algorithm Expert', 'Top Contributor'],
    streak: 8
  },
  {
    id: '3',
    name: 'Rohit Kumar',
    email: 'rohit@college.edu',
    year: 'SY',
    branch: 'Computer Engineering',
    rating: 1654,
    solved: 167,
    badges: ['Fast Learner'],
    streak: 12
  }
];

// Mock Problems
export const mockProblems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    statement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ],
    constraints: ['2 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹', '-10⁹ ≤ target ≤ 10⁹'],
    timeLimit: '1s',
    memoryLimit: '256MB',
    solved: 1234,
    total: 2456,
    status: 'solved'
  },
  {
    id: '2',
    title: 'Binary Tree Inorder Traversal',
    slug: 'binary-tree-inorder',
    difficulty: 'Medium',
    tags: ['Tree', 'Binary Tree', 'Stack'],
    statement: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
    examples: [
      {
        input: 'root = [1,null,2,3]',
        output: '[1,3,2]'
      }
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 100]', '-100 ≤ Node.val ≤ 100'],
    timeLimit: '1s',
    memoryLimit: '256MB',
    solved: 892,
    total: 1543,
    status: 'attempted'
  },
  {
    id: '3',
    title: 'Regular Expression Matching',
    slug: 'regex-matching',
    difficulty: 'Hard',
    tags: ['String', 'Dynamic Programming', 'Recursion'],
    statement: 'Given an input string s and a pattern p, implement regular expression matching with support for \'.\' and \'*\'.',
    examples: [
      {
        input: 's = "aa", p = "a"',
        output: 'false',
        explanation: '"a" does not match the entire string "aa".'
      }
    ],
    constraints: ['1 ≤ s.length ≤ 20', '1 ≤ p.length ≤ 30'],
    timeLimit: '2s',
    memoryLimit: '512MB',
    solved: 234,
    total: 1876,
    status: 'unsolved'
  }
];

// Mock Contests
export const mockContests: Contest[] = [
  {
    id: '1',
    title: 'Weekly Contest 123',
    type: 'Rated',
    startTime: '2024-09-10T14:00:00Z',
    endTime: '2024-09-10T16:00:00Z',
    duration: '2h',
    problems: ['1', '2', '3', '4'],
    participants: 1247,
    status: 'upcoming',
    description: 'This week\'s rated contest featuring problems on arrays, trees, and dynamic programming.'
  },
  {
    id: '2',
    title: 'Practice Round - DBMS Special',
    type: 'Practice',
    startTime: '2024-09-08T10:00:00Z',
    endTime: '2024-09-08T12:00:00Z',
    duration: '2h',
    problems: ['5', '6', '7'],
    participants: 892,
    status: 'ended',
    description: 'Practice problems focused on database concepts and SQL queries.'
  },
  {
    id: '3',
    title: 'Team Championship Finals',
    type: 'Team',
    startTime: '2024-09-15T09:00:00Z',
    endTime: '2024-09-15T14:00:00Z',
    duration: '5h',
    problems: ['8', '9', '10', '11', '12'],
    participants: 324,
    status: 'upcoming',
    description: 'Annual team championship featuring the most challenging problems of the year.'
  }
];

// Mock Subjects
export const mockSubjects: Subject[] = [
  {
    id: '1',
    title: 'Database Management Systems',
    slug: 'dbms',
    description: 'Learn about database design, normalization, SQL, and transactions.',
    icon: '🗄️',
    topics: [
      { id: '1', title: 'Introduction to DBMS', completed: true },
      { id: '2', title: 'ER Model', completed: true },
      { id: '3', title: 'Relational Model', completed: true },
      { id: '4', title: 'Normalization', completed: false },
      { id: '5', title: 'SQL Queries', completed: false },
      { id: '6', title: 'Transactions', completed: false }
    ],
    progress: 50
  },
  {
    id: '2',
    title: 'Object Oriented Programming',
    slug: 'oopm',
    description: 'Master OOP concepts including inheritance, polymorphism, and design patterns.',
    icon: '🧩',
    topics: [
      { id: '1', title: 'Classes and Objects', completed: true },
      { id: '2', title: 'Inheritance', completed: true },
      { id: '3', title: 'Polymorphism', completed: false },
      { id: '4', title: 'Abstraction', completed: false },
      { id: '5', title: 'Design Patterns', completed: false }
    ],
    progress: 40
  },
  {
    id: '3',
    title: 'Data Structures & Algorithms',
    slug: 'dsa',
    description: 'Essential data structures and algorithms for competitive programming.',
    icon: '📊',
    topics: [
      { id: '1', title: 'Arrays and Strings', completed: true },
      { id: '2', title: 'Linked Lists', completed: true },
      { id: '3', title: 'Stacks and Queues', completed: true },
      { id: '4', title: 'Trees', completed: false },
      { id: '5', title: 'Graphs', completed: false },
      { id: '6', title: 'Dynamic Programming', completed: false }
    ],
    progress: 50
  },
  {
    id: '4',
    title: 'Operating Systems',
    slug: 'os',
    description: 'Understanding process management, memory management, and file systems.',
    icon: '💻',
    topics: [
      { id: '1', title: 'Process Management', completed: false },
      { id: '2', title: 'Memory Management', completed: false },
      { id: '3', title: 'File Systems', completed: false },
      { id: '4', title: 'Synchronization', completed: false }
    ],
    progress: 0
  },
  {
    id: '5',
    title: 'Computer Networks',
    slug: 'cn',
    description: 'Network protocols, OSI model, and network security fundamentals.',
    icon: '🌐',
    topics: [
      { id: '1', title: 'OSI Model', completed: false },
      { id: '2', title: 'TCP/IP', completed: false },
      { id: '3', title: 'Network Security', completed: false }
    ],
    progress: 0
  },
  {
    id: '6',
    title: 'Software Engineering',
    slug: 'se',
    description: 'Software development lifecycle, testing, and project management.',
    icon: '⚙️',
    topics: [
      { id: '1', title: 'SDLC Models', completed: false },
      { id: '2', title: 'Requirements Engineering', completed: false },
      { id: '3', title: 'Testing', completed: false }
    ],
    progress: 0
  },
  {
    id: '7',
    title: 'Theory of Computation',
    slug: 'toc',
    description: 'Automata theory, formal languages, and computational complexity.',
    icon: '🔄',
    topics: [
      { id: '1', title: 'Finite Automata', completed: false },
      { id: '2', title: 'Context-Free Grammars', completed: false },
      { id: '3', title: 'Turing Machines', completed: false }
    ],
    progress: 0
  }
];

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: mockUsers[1], // Priya Patel
    score: 2847,
    solved: 298,
    penalty: 120,
    lastSubmission: '2024-09-07T15:30:00Z'
  },
  {
    rank: 2,
    user: mockUsers[0], // Arjun Sharma
    score: 2634,
    solved: 234,
    penalty: 89,
    lastSubmission: '2024-09-07T14:45:00Z'
  },
  {
    rank: 3,
    user: mockUsers[2], // Rohit Kumar
    score: 1876,
    solved: 167,
    penalty: 156,
    lastSubmission: '2024-09-07T16:20:00Z'
  }
];