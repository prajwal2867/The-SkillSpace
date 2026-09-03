export const categories = ['Trending', 'Hobbies', 'Music', 'Money', 'Spirituality', 'Tech', 'Health', 'Sports', 'Self-improvement'];

export const demoUsers = [
  { id: 1, name: 'Prajwal Ramagiri', email: 'ramagiri.prajwal@gmail.com', passwordHash: '4ccb808c3e7309a9a7b14cd09d77e2049edeff88d1d433b160d8204adccdc613', username: 'prajwal-ramagiri-6593', bio: 'Curious, learning in public.', joinDate: '2026-08-15' },
  { id: 2, name: 'Harsh Pillai', email: 'harsh_pillai34@example.com', passwordHash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', bio: 'Entrepreneur building SaaS products.' },
  { id: 3, name: 'Krishna Mahajan', email: 'krishna_mahajan43@example.com', passwordHash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', bio: 'Software engineer by day, gamer by night.' }
];

export const communities = [
  { id: 1, title: 'AI Video Bootcamp', description: 'Make AI adverts, social content and films that people remember.', members: '26.5k', price: '$9 / month', priceType: 'Paid', accessType: 'Public', category: 'Tech', cover: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&w=1000&q=85', accent: '#b9e769', tag: 'Most active' },
  { id: 2, title: 'CapCut Creator Bootcamp', description: 'Go from first cut to viral edit, with a practical creator curriculum.', members: '1.1k', price: '$12 / month', priceType: 'Paid', accessType: 'Public', category: 'Hobbies', cover: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=85', accent: '#e3a4ff', tag: 'New energy' },
  { id: 3, title: 'AI Realism Academy', description: 'Engineer believable images and video from zero experience.', members: '1.3k', price: '$9 / month', priceType: 'Paid', accessType: 'Private', category: 'Tech', cover: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1000&q=85', accent: '#77c8ff', tag: 'Private room' },
  { id: 4, title: 'AI Automation Agency Bootcamp', description: 'Build a one-person AI business in seven days.', members: '164.9k', price: '$7 / month', priceType: 'Paid', accessType: 'Public', category: 'Money', cover: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1000&q=85', accent: '#f2bd68', tag: 'Top community' },
  { id: 5, title: 'Grow With Evelyn', description: 'Build an online education business that sells.', members: '3.8k', price: 'Free', priceType: 'Free', accessType: 'Public', category: 'Money', cover: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=85', accent: '#f08b7a', tag: 'Free to join' },
  { id: 6, title: 'UGC Brand Deal Sprint', description: 'Get your first paid UGC deal with scripts, contacts and accountability.', members: '359', price: '$5 / month', priceType: 'Paid', accessType: 'Private', category: 'Money', cover: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=85', accent: '#91a8ff', tag: 'Small cohort' },
  { id: 7, title: 'The Media Foundation', description: 'See what real buyers run daily and stop letting ad accounts bleed.', members: '2.5k', price: '$2 / month', priceType: 'Paid', accessType: 'Public', category: 'Money', cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85', accent: '#67d6c0', tag: 'Low cost' },
  { id: 8, title: 'Never Too Late to Create', description: 'A welcoming studio for creators over 50, or anyone ready to begin.', members: '105', price: '$5 / month', priceType: 'Paid', accessType: 'Public', category: 'Self-improvement', cover: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1000&q=85', accent: '#f3a9c8', tag: 'Fresh start' },
  { id: 9, title: 'Faceless Instagram HQ', description: 'Build monetized pages without ever turning on a camera.', members: '1.4k', price: '$47', priceType: 'Paid', accessType: 'Private', category: 'Money', cover: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=1000&q=85', accent: '#ffcf71', tag: 'Deep dive' },
  { id: 10, title: 'The Creators Hub', description: 'Share ideas, collaborate on projects and grow your audience together.', members: '12.3k', price: 'Free', priceType: 'Free', accessType: 'Public', category: 'Hobbies', cover: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85', accent: '#9ae072', tag: 'Open room' },
  { id: 11, title: 'Web3 Developers Network', description: 'Learn smart contracts, find builders and ship in public.', members: '5.7k', price: '$49 / month', priceType: 'Paid', accessType: 'Public', category: 'Tech', cover: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1000&q=85', accent: '#83b9ff', tag: 'Builder-led' },
  { id: 12, title: 'Fitness & Nutrition Inner Circle', description: 'Daily plans, meal prep and a supportive room for real progress.', members: '32k', price: 'Free', priceType: 'Free', accessType: 'Public', category: 'Health', cover: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85', accent: '#f4a16e', tag: 'Free to join' }
];

export const notifications = [
  { user: 'Cameron England', text: 'posted a new announcement', time: '9h', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { user: 'Liam Ottley', text: 'shared a new lesson', time: '12h', avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
  { user: 'Zach Ginn', text: 'went live with a new workshop', time: '21h', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' }
];

export const chats = [
  { user: 'Antonia Okeke', text: 'Welcome to Excel Mastery! Check step one.', time: '1h', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { user: 'Andrew Naegele', text: 'That is all you have left before launch.', time: 'Oct 25', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { user: 'Lenny Bartholäus', text: 'It is impressive you are developing AI models.', time: 'Feb 25', avatar: 'https://randomuser.me/api/portraits/men/62.jpg' }
];