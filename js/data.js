// js/data.js
const mockCommunities = [
  {
    id: 1,
    title: "AI Video Bootcamp",
    description: "Master AI Video & AI Image Creation. Then use your skill to make AI Adverts, Social Media Content and Films  to earn money  ",
    members: "26.5k",
    price: "$9/month",
    category: "Tech",
    priceType: "Paid",
    accessType: "Public",
    coverUrl: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "CapCut Creator Bootcamp",
    description: "Learn CapCut from beginner to advanced, create viral videos & start making money online",
    members: "1.1k",
    price: "$12/month",
    category: "Hobbies",
    priceType: "Paid",
    accessType: "Public",
    coverUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "AI Realism Academy",
    description: "AI Video & AI images! Anybody, any age, with zero experience can do this! Discover the magic of AI Realism Engineering! (An...",
    members: "1.3k",
    price: "$9/month",
    category: "Tech",
    priceType: "Paid",
    accessType: "Private",
    coverUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "AI Automation Agency Bootcamp",
    description: "Learn How to Build a 1-Person AI Business in 7 Days (START FREE)",
    members: "164.9k",
    price: "$7/month",
    category: "Money",
    priceType: "Paid",
    accessType: "Public",
    coverUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Grow With Evelyn",
    description: "Build and grow an online education business that sells. Learn offer creation, Meta ads, SkillSpace and marketing from...",
    members: "3.8k",
    price: "Free",
    category: "Money",
    priceType: "Free",
    accessType: "Public",
    coverUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "UGC Brand Deal Sprint",
    description: "Get your first Paid UGC brand deal in 7 days. 500+ brand contacts, plug-and-play scripts, zero experience needed",
    members: "359",
    price: "$5/month",
    category: "Money",
    priceType: "Paid",
    accessType: "Private",
    coverUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "The Media Foundation",
    description: "Most ad accounts bleed money. This room is full of people whose don't. See what real buyers run daily — the setups, the...",
    members: "2.5k",
    price: "$2/month",
    category: "Money",
    priceType: "Paid",
    accessType: "Public",
    coverUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "Never Too Late to Create",
    description: "Carole Jones' official community for men and women over 50 who are content creators or ready to finally start!",
    members: "105",
    price: "$5/month",
    category: "Self-improvement",
    priceType: "Paid",
    accessType: "Public",
    coverUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    title: "Faceless Instagram HQ",
    description: "Build faceless Instagram pages that get monetized and make money, no camera required. Learn the algorithm strategies...",
    members: "1.4k",
    price: "$47",
    category: "Money",
    priceType: "Paid",
    accessType: "Private",
    coverUrl: "https://digitalstoryteller.io/wp-content/uploads/2022/04/What-is-Going-on-With-the-Instagram-Algorithm-1030x539.png"
  },
  {
    id: 10,
    title: "The Creators Hub",
    description: "A community for digital creators to share ideas, collaborate on projects and grow their audience.",
    members: "12.3k",
    price: "Free",
    category: "Hobbies",
    priceType: "Free",
    accessType: "Public",
    coverUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    title: "Web3 Developers Network",
    description: "Learn smart contract development, connect with other builders and find opportunities in crypto.",
    members: "5.7k",
    price: "$49/month",
    category: "Tech",
    priceType: "Paid",
    accessType: "Public",
    coverUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    title: "Fitness & Nutrition Inner Circle",
    description: "Daily workout plans, meal prep guides and a supportive community to help you hit your goals.",
    members: "32k",
    price: "Free",
    category: "Health",
    priceType: "Free",
    accessType: "Public",
    coverUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const mockNotifications = [
  { id: 1, user: "Cameron England", avatar: "https://randomuser.me/api/portraits/men/32.jpg", action: "(broadcast) new post", time: "9h", text: "CRAZY ANNOUNCEMENT", unread: true },
  { id: 2, user: "Liam Ottley", avatar: "https://randomuser.me/api/portraits/men/44.jpg", action: "(broadcast) new post", time: "12h", text: "AIOS replaced 78% of this clients work (see how here)", unread: true },
  { id: 3, user: "Zach Ginn", avatar: "https://randomuser.me/api/portraits/men/22.jpg", action: "(following) new post", time: "21h", text: "WE ARE LIVE!! How To Get Your First 5 Wholesale Cont...", unread: true }
];

const mockChats = [
  { id: 1, user: "Antonia Okeke (1)", avatar: "https://randomuser.me/api/portraits/women/44.jpg", time: "1h", text: "Hey Prajwal, welcome to Excel Mastery! Step 1: Check ...", unread: true },
  { id: 2, user: "Andrew Naegele", avatar: "https://randomuser.me/api/portraits/men/45.jpg", time: "Oct '25", text: "Prajwal - 8 hours. That's all you have left before we la...", unread: false },
  { id: 3, user: "Lenny Bartholomäus", avatar: "https://randomuser.me/api/portraits/men/62.jpg", time: "Feb '25", text: "It's impressive you're developing AI models for real est...", unread: false }
];
