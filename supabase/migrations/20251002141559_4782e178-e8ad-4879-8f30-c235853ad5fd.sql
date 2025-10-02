-- Insert sample companies
INSERT INTO companies (name, logo_url, website_url, description, placement_count, avg_package) VALUES
('Oracle', 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg', 'https://www.oracle.com', 'Leading database and cloud solutions provider', 45, 18.5),
('Google', 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', 'https://www.google.com', 'Technology company specializing in Internet-related services', 52, 25.3),
('Microsoft', 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', 'https://www.microsoft.com', 'Global technology company developing software and services', 48, 22.8),
('Amazon', 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', 'https://www.amazon.com', 'E-commerce and cloud computing company', 41, 20.5),
('Adobe', 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg', 'https://www.adobe.com', 'Software company for creative, marketing and document management', 28, 16.2),
('Flipkart', 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Flipkart_logo.svg', 'https://www.flipkart.com', 'E-commerce company headquartered in India', 35, 14.5),
('Walmart', 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg', 'https://www.walmart.com', 'Multinational retail corporation', 30, 15.8),
('Paytm', 'https://upload.wikimedia.org/wikipedia/commons/1/12/Paytm_Logo_(standalone).svg', 'https://www.paytm.com', 'Digital payments and financial services company', 38, 13.9)
ON CONFLICT (id) DO NOTHING;

-- Insert sample contests if not present
INSERT INTO contests (title, description, type, status, duration, start_time, end_time, participants_count) VALUES
('CodeMaster Challenge 2025', 'Annual coding championship with exciting prizes and recognition', 'Rated', 'upcoming', '3 hours', NOW() + INTERVAL '7 days', NOW() + INTERVAL '7 days 3 hours', 124),
('Weekly Practice Round #42', 'Weekly practice session to sharpen your skills', 'Practice', 'upcoming', '2 hours', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days 2 hours', 89)
ON CONFLICT (id) DO NOTHING;

-- Insert sample problems
INSERT INTO problems (title, slug, difficulty, statement, time_limit, memory_limit, tags, examples, constraints) VALUES
('Two Sum', 'two-sum', 'Easy', 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.', '1s', '256MB', ARRAY['Array', 'Hash Table'], '[{"input": "nums = [2,7,11,15], target = 9", "output": "[0,1]"}]'::jsonb, ARRAY['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9']),
('Valid Parentheses', 'valid-parentheses', 'Easy', 'Given a string s containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid.', '1s', '256MB', ARRAY['Stack', 'String'], '[{"input": "s = \"()[]{}\"", "output": "true"}]'::jsonb, ARRAY['1 <= s.length <= 10^4']),
('Longest Substring', 'longest-substring', 'Medium', 'Given a string s, find the length of the longest substring without repeating characters.', '1s', '256MB', ARRAY['String', 'Sliding Window'], '[{"input": "s = \"abcabcbb\"", "output": "3"}]'::jsonb, ARRAY['0 <= s.length <= 5 * 10^4'])
ON CONFLICT (slug) DO NOTHING;

-- Insert sample subjects
INSERT INTO subjects (title, slug, description, icon, total_topics) VALUES
('Data Structures', 'data-structures', 'Master fundamental and advanced data structures', '📊', 12),
('Algorithms', 'algorithms', 'Learn algorithm design and analysis techniques', '🧮', 15),
('Database Management', 'dbms', 'Comprehensive database concepts and SQL', '💾', 10)
ON CONFLICT (slug) DO NOTHING;