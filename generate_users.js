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

const users = [];

for (let i = 0; i < 70; i++) {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`;
  const status = Math.random() > 0.5 ? 'online' : 'offline';

  // Random join date within the last year
  const joinDate = new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000));

  const bio = bios[Math.floor(Math.random() * bios.length)];

  users.push({
    id: i + 1,
    name: `${firstName} ${lastName}`,
    username: username,
    email: `${username}@example.com`,
    password: 'password123', // Dummy password for demo
    status: status,
    joinDate: joinDate.toISOString().split('T')[0],
    bio: bio,
    points: Math.floor(Math.random() * 500),
    level: Math.floor(Math.random() * 5) + 1
  });
}

const content = `// Dummy Data for SkillSpace Prototype
const users = ${JSON.stringify(users, null, 2)};

// Make it available globally for browser
window.dummyUsers = users;
`;

fs.writeFileSync('dummy_data.js', content);
console.log('Dummy data generated in dummy_data.js');
