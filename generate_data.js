const fs = require('fs');

const firstNames = ['Aarav', 'Vihaan', 'Aditya', 'Sai', 'Arjun', 'Siddharth', 'Rohan', 'Krishna', 'Ishaan', 'Shaurya', 'Aanya', 'Diya', 'Ananya', 'Saanvi', 'Aditi', 'Pooja', 'Neha', 'Kavya', 'Riya', 'Isha', 'Rahul', 'Amit', 'Vikram', 'Raj', 'Sanjay', 'Karan', 'Vijay', 'Ajay', 'Deepak', 'Nitin', 'Sneha', 'Priya', 'Swati', 'Kiran', 'Megha', 'Priyanka', 'Simran', 'Nisha', 'Divya', 'Anjali', 'Rishabh', 'Manish', 'Rakesh', 'Suresh', 'Ramesh', 'Gaurav', 'Tarun', 'Varun', 'Mohit', 'Harsh', 'Preeti', 'Poonam', 'Shikha', 'Jyoti', 'Komal', 'Radhika', 'Shivani', 'Meena', 'Geeta', 'Sita', 'Yash', 'Kabir', 'Dhruv', 'Ayush', 'Aryan', 'Akash', 'Pranav', 'Dev', 'Samir', 'Nikhil'];
const lastNames = ['Sharma', 'Verma', 'Gupta', 'Malhotra', 'Singh', 'Patel', 'Reddy', 'Rao', 'Das', 'Mukherjee', 'Bose', 'Chatterjee', 'Iyer', 'Nair', 'Pillai', 'Menon', 'Joshi', 'Kulkarni', 'Deshmukh', 'Patil', 'Chauhan', 'Rajput', 'Yadav', 'Pandey', 'Mishra', 'Tiwari', 'Dubey', 'Agnihotri', 'Bhatt', 'Bhattacharya', 'Sengupta', 'Mahajan', 'Chawla', 'Kaur', 'Ahluwalia', 'Dhillon', 'Gill', 'Suri', 'Sood', 'Tandon', 'Kapoor', 'Khanna', 'Chopra', 'Mehra', 'Bhatia', 'Garg', 'Bansal', 'Agarwal', 'Goyal', 'Mittal'];

const bios = [
  "Passionate about web development and building communities.",
  "Learning frontend engineering, one div at a time.",
  "Digital marketer transitioning into tech.",
  "Entrepreneur building SaaS products.",
  "UI/UX designer with a love for clean aesthetics.",
  "Full-stack developer and open source contributor.",
  "Student exploring the world of programming.",
  "Tech enthusiast and lifelong learner.",
  "Software engineer by day, gamer by night.",
  "Building the next big thing."
];

const postContents = [
  "Just started the new UI/UX module. It's fantastic!",
  "Can someone help me understand how localStorage works?",
  "I finally deployed my first React app today 🎉",
  "What is the best way to center a div in CSS?",
  "Looking for study partners for the upcoming JavaScript bootcamp.",
  "Here is my progress for Week 2. Let me know what you think!",
  "Does anyone have resources for mastering Flexbox?",
  "I'm stuck on a bug in my code. Any suggestions?",
  "Just reached level 3! The new course looks amazing.",
  "Great community call today. Thanks to everyone who joined.",
  "I built a small SkillSpace replica to learn static web development.",
  "When is the next live Q&A session happening?"
];

const categories = ['General', 'Help', 'Showcase', 'Discussion'];

const users = [];
for (let i = 0; i < 70; i++) {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`;
  const status = Math.random() > 0.5 ? 'online' : 'offline';
  const joinDate = new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000));

  users.push({
    id: i + 1,
    name: `${firstName} ${lastName}`,
    username: username,
    email: `${username}@example.com`,
    password: 'password123',
    status: status,
    joinDate: joinDate.toISOString().split('T')[0],
    bio: bios[Math.floor(Math.random() * bios.length)],
    points: Math.floor(Math.random() * 500),
    level: Math.floor(Math.random() * 5) + 1
  });
}

const posts = [];
for (let i = 0; i < 25; i++) {
  const author = users[Math.floor(Math.random() * users.length)];
  const timestamp = new Date(Date.now() - Math.floor(Math.random() * 14 * 24 * 60 * 60 * 1000));
  posts.push({
    id: i + 1,
    authorId: author.id,
    content: postContents[Math.floor(Math.random() * postContents.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    likes: Math.floor(Math.random() * 20),
    timestamp: timestamp.toISOString()
  });
}

// Sort posts from newest to oldest
posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

const courses = [
  {
    id: 1,
    title: 'Welcome to the Community',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    requiredLevel: 1,
    modules: [
      { id: 101, title: 'Introduction', duration: '5:00' },
      { id: 102, title: 'How to use this platform', duration: '12:30' }
    ]
  },
  {
    id: 2,
    title: 'Frontend Fundamentals',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    requiredLevel: 2,
    modules: [
      { id: 201, title: 'HTML Basics', duration: '15:20' },
      { id: 202, title: 'CSS Styling', duration: '20:10' }
    ]
  },
  {
    id: 3,
    title: 'Advanced JavaScript',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    requiredLevel: 3,
    modules: [
      { id: 301, title: 'Closures & Scope', duration: '18:45' },
      { id: 302, title: 'Async/Await', duration: '25:00' }
    ]
  },
  {
    id: 4,
    title: 'Mastering the DOM',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    requiredLevel: 4,
    modules: [
      { id: 401, title: 'Selecting Elements', duration: '10:15' },
      { id: 402, title: 'Event Listeners', duration: '14:20' }
    ]
  },
  {
    id: 5,
    title: 'Building a SkillSpace Clone',
    thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    requiredLevel: 5,
    modules: [
      { id: 501, title: 'Architecture Planning', duration: '30:00' },
      { id: 502, title: 'Implementation', duration: '45:00' }
    ]
  }
];

const content = `// Dummy Data for SkillSpace Prototype
const dummyUsers = ${JSON.stringify(users, null, 2)};
const dummyPosts = ${JSON.stringify(posts, null, 2)};
const dummyCourses = ${JSON.stringify(courses, null, 2)};

// Expose globally for browser
window.dummyUsers = dummyUsers;
window.dummyPosts = dummyPosts;
window.dummyCourses = dummyCourses;
`;

fs.writeFileSync('dummy_data.js', content);
console.log('Dummy data generated in dummy_data.js');
