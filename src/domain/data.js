export const categories = ['Trending', 'Hobbies', 'Music', 'Money', 'Spirituality', 'Tech', 'Health', 'Sports', 'Self-improvement'];

export const demoUsers = [
  { id: 1, name: 'Prajwal Ramagiri', email: 'ramagiri.prajwal@gmail.com', passwordHash: '4ccb808c3e7309a9a7b14cd09d77e2049edeff88d1d433b160d8204adccdc613', username: 'prajwal-ramagiri-6593', bio: 'Curious, learning in public.', joinDate: '2026-08-15' },
  { id: 2, name: 'Harsh Pillai', email: 'harsh_pillai34@example.com', passwordHash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', bio: 'Entrepreneur building SaaS products.' },
  { id: 3, name: 'Krishna Mahajan', email: 'krishna_mahajan43@example.com', passwordHash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', bio: 'Software engineer by day, gamer by night.' }
];

export const communities = [
  {
    id: 1,
    title: 'AI Video Bootcamp',
    slug: 'aivideobootcamp',
    description: 'Make AI adverts, social content and films that people remember.',
    members: '26.5k',
    onlineCount: '342',
    adminsCount: '8',
    price: '$9 / month',
    priceType: 'Paid',
    accessType: 'Public',
    category: 'Tech',
    cover: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&w=1000&q=85',
    accent: '#3d5ba9',
    tag: 'Most active',
    rating: '5.0',
    reviewCount: 93,
    creatorName: 'Jake Van Clief',
    creatorTitle: 'AI Filmmaker & Researcher',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    aboutParagraphs: [
      'You relearn AI every time a model updates. The tools change. Your work resets. Build the structure underneath instead, and it lasts a decade.',
      'What we give away for free beats most paid courses. Build durable AI systems with a Marine veteran and Edinburgh researcher. 40+ structured video modules and growing every month.',
      'Our curriculum covers high-yield generative techniques: folder architecture that turns raw prompts into reproducible systems, prompt frameworks you reuse across video tools, computing fundamentals most creators skip, and practical AI video rendering built to survive every framework shift.'
    ],
    highlights: [
      'Folder architecture that turns your files into a system',
      'Prompt frameworks you reuse across Sora, Runway, and Kling',
      'Computing fundamentals most generative creators skip',
      'Running top AI video systems on real production client work',
      'The foundational thinking that survives every model update'
    ],
    reviews: [
      { author: 'Christina Wanzer', rating: 5, time: '18h ago', status: 'Still a paying member after 3 months', text: 'I completed Navigating the course. I created my github repo account, synced VS Code with my pipeline and established full automated video rendering via API!' },
      { author: 'Ruby Sparks', rating: 5, time: '1d ago', status: 'Still a paying member after 5 months', text: 'Fantastic group and clear, easy learning. Would rate 6 stars if I could!' },
      { author: 'Pedro Costa', rating: 5, time: '2d ago', status: 'Still a paying member after 2 months', text: 'The depth of knowledge in this bootcamp is unmatched. The prompt templates alone saved me 40 hours this month.' },
      { author: 'Yannick Schirmer', rating: 5, time: '4d ago', status: 'Still a paying member after 3 months', text: 'Worth every single penny. The community feedback on my first AI film commercial helped me land my first paid client.' }
    ]
  },
  {
    id: 2,
    title: 'CapCut Creator Bootcamp',
    slug: 'capcutbootcamp',
    description: 'Go from first cut to viral edit, with a practical creator curriculum.',
    members: '1.1k',
    onlineCount: '89',
    adminsCount: '4',
    price: '$12 / month',
    priceType: 'Paid',
    accessType: 'Public',
    category: 'Hobbies',
    cover: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=85',
    accent: '#3d5ba9',
    tag: 'New energy',
    rating: '4.9',
    reviewCount: 64,
    creatorName: 'Marcus Vance',
    creatorTitle: 'Short-Form Content Strategist',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    aboutParagraphs: [
      'Stop spending 10 hours on an edit that gets 200 views. Learn the exact storytelling hooks, pacing mechanics, and visual transitions that hold attention.',
      'CapCut has become the premier editing studio for mobile and desktop creators alike. In this bootcamp, we deconstruct high-performing Reels, TikToks, and Shorts line by line.',
      'Gain immediate access to project file templates, trending audio breakdown lists, custom keyframe animation presets, and weekly live video teardown sessions.'
    ],
    highlights: [
      'Master keyframing, velocity edits, and seamless motion tracking',
      'Plug-and-play title animation styles and sound effect libraries',
      'Hook retention formulas optimized for Instagram & TikTok algorithms',
      'Weekly live community feedback on your draft edits before posting'
    ],
    reviews: [
      { author: 'Sarah Jenkins', rating: 5, time: '2d ago', status: 'Member for 4 months', text: 'My retention graph tripled after applying the pacing framework from Module 2. Absolutely game-changing.' },
      { author: 'David K.', rating: 5, time: '5d ago', status: 'Member for 1 month', text: 'The community feedback channel is worth 10x the monthly price. Instant answers to editing bottlenecks.' }
    ]
  },
  {
    id: 3,
    title: 'AI Realism Academy',
    slug: 'airealism',
    description: 'Engineer believable images and video from zero experience.',
    members: '1.3k',
    onlineCount: '115',
    adminsCount: '5',
    price: '$9 / month',
    priceType: 'Paid',
    accessType: 'Private',
    category: 'Tech',
    cover: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1000&q=85',
    accent: '#3d5ba9',
    tag: 'Private room',
    rating: '5.0',
    reviewCount: 42,
    creatorName: 'Elena Rostova',
    creatorTitle: 'Generative Art Director',
    creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    aboutParagraphs: [
      'Bridge the gap between synthetic plastic renders and photorealistic digital art. Master camera lighting, aperture controls, texture depth, and noise injection.',
      'Designed exclusively for visual artists, designers, and visual researchers seeking museum-grade generative precision without trial and error.',
      'Inside this private studio, we share custom LoRAs, ControlNet workflows, ComfyUI node graphs, and ultra-high-resolution upscaling pipelines.'
    ],
    highlights: [
      'Advanced ComfyUI & Midjourney prompt parameters guide',
      'Photorealistic skin texture, lighting, and camera lens control',
      'Private repository of custom curated LoRA models',
      'Direct critique from studio instructors on image compositions'
    ],
    reviews: [
      { author: 'Liam Gallagher', rating: 5, time: '1d ago', status: 'Active member', text: 'The lighting cheat sheets transformed my render quality overnight. No more plastic look!' },
      { author: 'Amara Chen', rating: 5, time: '3d ago', status: 'Member for 6 months', text: 'Best photorealism community online. The ComfyUI workflows are pure gold.' }
    ]
  },
  {
    id: 4,
    title: 'AI Automation Agency Bootcamp',
    slug: 'aiautomation',
    description: 'Build a one-person AI business in seven days.',
    members: '164.9k',
    onlineCount: '1240',
    adminsCount: '24',
    price: '$7 / month',
    priceType: 'Paid',
    accessType: 'Public',
    category: 'Money',
    cover: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1000&q=85',
    accent: '#3d5ba9',
    tag: 'Top community',
    rating: '4.9',
    reviewCount: 412,
    creatorName: 'Liam Ottley',
    creatorTitle: 'AI Agency Founder',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    aboutParagraphs: [
      'The largest community of AI automation operators on the web. Learn how to design, package, and deploy Make, n8n, and custom LLM workflows for commercial clients.',
      'We turn technical curiosity into scalable consulting revenue. From cold outreach scripts and contract templates to enterprise API architecture.',
      'Join over 160,000 operators building the next generation of automated business solutions with daily Q&A, weekly office hours, and client deal breakdowns.'
    ],
    highlights: [
      'Step-by-step agency launch blueprint for single-operator founders',
      'Pre-built n8n and Make automation templates for common workflows',
      'Client proposal decks, contract agreements, and pricing structures',
      'Daily peer support and live technical troubleshooting channels'
    ],
    reviews: [
      { author: 'Chad Richardson', rating: 5, time: '11d ago', status: 'Paying member after 8 months', text: 'Closed my first $3,500 retainer using the proposal template from section 4. This group pays for itself 500x over.' },
      { author: 'Siddharth Patel', rating: 5, time: '12d ago', status: 'Paying member after 1 year', text: 'The community standard for AI agency owners. Continuous value every single week.' }
    ]
  },
  {
    id: 5,
    title: 'Grow With Evelyn',
    slug: 'growwithevelyn',
    description: 'Build an online education business that sells.',
    members: '3.8k',
    onlineCount: '142',
    adminsCount: '6',
    price: 'Free',
    priceType: 'Free',
    accessType: 'Public',
    category: 'Money',
    cover: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=85',
    accent: '#3d5ba9',
    tag: 'Free to join',
    rating: '5.0',
    reviewCount: 88,
    creatorName: 'Evelyn James',
    creatorTitle: 'Course Creator & Educator',
    creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    aboutParagraphs: [
      'Turn your specialized knowledge into a thriving, community-driven online learning experience. Learn audience building, curriculum structure, and ethical sales.',
      'No pushy sales tactics or complicated webinar funnels. Just clear, high-empathy education design that produces real student outcomes.',
      'Get direct feedback on your course outlines, sales page headlines, and onboarding sequences inside our supportive free community space.'
    ],
    highlights: [
      'Curriculum mapping blueprint for high-completion online programs',
      'High-converting landing page layouts and copy frameworks',
      'Community engagement playbooks that keep members active long term',
      'Free weekly office hours and live community coaching calls'
    ],
    reviews: [
      { author: 'Maria Santos', rating: 5, time: '3d ago', status: 'Free community member', text: 'Evelyn explains curriculum design better than any $2,000 masterclass I have taken!' },
      { author: 'Tom H.', rating: 5, time: '1w ago', status: 'Free community member', text: 'Warm, highly supportive atmosphere with incredibly practical guidance.' }
    ]
  },
  {
    id: 6,
    title: 'UGC Brand Deal Sprint',
    slug: 'ugcbranddeal',
    description: 'Get your first paid UGC deal with scripts, contacts and accountability.',
    members: '359',
    onlineCount: '48',
    adminsCount: '3',
    price: '$5 / month',
    priceType: 'Paid',
    accessType: 'Private',
    category: 'Money',
    cover: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=85',
    accent: '#3d5ba9',
    tag: 'Small cohort',
    rating: '4.8',
    reviewCount: 31,
    creatorName: 'Chloe Bennett',
    creatorTitle: 'Full-Time UGC Creator',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    aboutParagraphs: [
      'A tight-knit sprint group focused on pitching brands, perfecting video portfolios, and securing monthly content creation retainers.',
      'We provide verified brand contact databases, proven cold email scripts, contract templates, and daily pitch accountability tracking.',
      'Designed for aspiring creators who want actionable daily guidance rather than endless theoretical lessons.'
    ],
    highlights: [
      'Direct brand manager email directory updated weekly',
      'Plug-and-play pitch email scripts and follow-up templates',
      'Portfolio review and video hook feedback from active UGC creators',
      'Daily pitch counter leaderboard and accountability tracking'
    ],
    reviews: [
      { author: 'Nati Peek', rating: 5, time: '7d ago', status: 'Sprint participant', text: 'I love every process and how engaging it is! Booked 2 brand deals in my first 3 weeks.' }
    ]
  },
  {
    id: 7,
    title: 'The Media Foundation',
    slug: 'mediafoundation',
    description: 'See what real buyers run daily and stop letting ad accounts bleed.',
    members: '2.5k',
    onlineCount: '176',
    adminsCount: '6',
    price: '$2 / month',
    priceType: 'Paid',
    accessType: 'Public',
    category: 'Money',
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85',
    accent: '#3d5ba9',
    tag: 'Low cost',
    rating: '4.9',
    reviewCount: 78,
    creatorName: 'Cameron England',
    creatorTitle: 'Media Buyer & Growth Lead',
    creatorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    aboutParagraphs: [
      'Real ad accounts, transparent ad spend data, and honest post-mortems on winning and losing campaigns across Meta, TikTok, and Google.',
      'Stop relying on outdated ad tactics. We analyze real-time ad performance metrics, creative iteration frameworks, and media buying structures.',
      'Join thousands of media buyers sharing breakdown videos of their actual ad sets and landing page conversion funnels.'
    ],
    highlights: [
      'Weekly live ad account teardowns and creative audits',
      'Meta & TikTok ad structure templates for e-commerce and lead gen',
      'Creative testing framework to identify winning angles fast',
      'Direct troubleshooting for ad account bans and tracking errors'
    ],
    reviews: [
      { author: 'Leo Saraiva', rating: 5, time: '5d ago', status: 'Paying member', text: 'Always learning, thank you all. Reduced our cost per acquisition by 34%.' }
    ]
  },
  {
    id: 8,
    title: 'Never Too Late to Create',
    slug: 'nevertoolate',
    description: 'A welcoming studio for creators over 50, or anyone ready to begin.',
    members: '105',
    onlineCount: '22',
    adminsCount: '2',
    price: '$5 / month',
    priceType: 'Paid',
    accessType: 'Public',
    category: 'Self-improvement',
    cover: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1000&q=85',
    accent: '#3d5ba9',
    tag: 'Fresh start',
    rating: '5.0',
    reviewCount: 19,
    creatorName: 'Arthur Pendelton',
    creatorTitle: 'Writer & Digital Creator',
    creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    aboutParagraphs: [
      'Age is an asset, not a barrier. Join a patient, encouraging creator studio designed for lifelong learners launching newsletters, podcasts, or online channels.',
      'No jargon, tech anxiety, or fast-talking hustle culture. Just clear step-by-step guidance on digital tools, writing habits, and creative confidence.',
      'Connect with peers who share your journey and support your creative milestone goals in a comfortable, pressure-free environment.'
    ],
    highlights: [
      'Simple, jargon-free video tutorials on key digital tools',
      'Weekly creative writing prompts and studio check-in calls',
      'Friendly community feedback on podcasts, blogs, and channels',
      'Safe, welcoming environment built on mutual encouragement'
    ],
    reviews: [
      { author: 'Eleanor Vance', rating: 5, time: '1w ago', status: 'Member', text: 'The kindest group on the internet. Finally launched my Substack at age 62!' }
    ]
  },
  {
    id: 9,
    title: 'Faceless Instagram HQ',
    slug: 'facelessig',
    description: 'Build monetized pages without ever turning on a camera.',
    members: '1.4k',
    onlineCount: '98',
    adminsCount: '4',
    price: '$47',
    priceType: 'Paid',
    accessType: 'Private',
    category: 'Money',
    cover: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=1000&q=85',
    accent: '#3d5ba9',
    tag: 'Deep dive',
    rating: '4.8',
    reviewCount: 52,
    creatorName: 'Zach Ginn',
    creatorTitle: 'Faceless Media Publisher',
    creatorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    aboutParagraphs: [
      'Master theme page monetization, automated viral reel creation, and affiliate digital product sales without showing your face.',
      'We reveal exact niche research frameworks, content sourcing pipelines, stock asset libraries, and caption hook strategies.',
      'Includes complete digital product templates you can rebrand and sell directly to your audience for 100% profit margins.'
    ],
    highlights: [
      'Niche selection matrix with verified monetization metrics',
      'Automated batching workflow for Instagram Reels & TikToks',
      'Digital product vault with editable Canva templates',
      'Private mastermind chat channel for theme page owners'
    ],
    reviews: [
      { author: 'Sameera Leola', rating: 5, time: '4d ago', status: 'Paying member', text: 'If you are wondering if the 5 star reviews are just to be nice - they are not. The content here is revolutionary.' }
    ]
  },
  {
    id: 10,
    title: 'The Creators Hub',
    slug: 'creatorshub',
    description: 'Share ideas, collaborate on projects and grow your audience together.',
    members: '12.3k',
    onlineCount: '512',
    adminsCount: '15',
    price: 'Free',
    priceType: 'Free',
    accessType: 'Public',
    category: 'Hobbies',
    cover: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85',
    accent: '#3d5ba9',
    tag: 'Open room',
    rating: '4.9',
    reviewCount: 110,
    creatorName: 'Maya Chen',
    creatorTitle: 'Community Host',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    aboutParagraphs: [
      'A vibrant open lounge for digital creators across video, writing, podcasting, and design. Find co-founders, feedback partners, and cross-promotion opportunities.',
      'Whether you have 10 subscribers or 100,000, creative work is better together. We host weekly virtual co-working rooms and feedback circles.',
      'Jump in, introduce your work, and participate in ongoing creative challenges designed to boost your shipping frequency.'
    ],
    highlights: [
      '24/7 Virtual co-working voice and video channels',
      'Collaboration match-making threads for podcasters and YouTubers',
      'Weekly constructive feedback sessions on thumbnails and titles',
      'Resource sharing channels with free creator assets'
    ],
    reviews: [
      { author: 'Clemens Schulz', rating: 5, time: '10d ago', status: 'Free member', text: 'Found my podcast co-host here within two days. Incredible group of active builders.' }
    ]
  },
  {
    id: 11,
    title: 'Web3 Developers Network',
    slug: 'web3devs',
    description: 'Learn smart contracts, find builders and ship in public.',
    members: '5.7k',
    onlineCount: '210',
    adminsCount: '9',
    price: '$49 / month',
    priceType: 'Paid',
    accessType: 'Public',
    category: 'Tech',
    cover: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1000&q=85',
    accent: '#3d5ba9',
    tag: 'Builder-led',
    rating: '4.9',
    reviewCount: 67,
    creatorName: 'Arjun Patel',
    creatorTitle: 'Smart Contract Architect',
    creatorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    aboutParagraphs: [
      'Deep technical community for Solidity, Rust, and Web3 protocol developers. Learn security auditing best practices, smart contract optimization, and decentralization patterns.',
      'We review real pull requests, analyze protocol hacks, and build production dApps in public during hackathon sprints.',
      'Access curated code bases, security audit checklists, and direct referral channels to Web3 engineering teams.'
    ],
    highlights: [
      'Solidity & Rust smart contract security curriculum',
      'Code review and PR feedback from senior protocol engineers',
      'Hackathon team formation channels and bounty announcements',
      'Job board with direct access to Web3 hiring founders'
    ],
    reviews: [
      { author: 'Kenji Sato', rating: 5, time: '2w ago', status: 'Paying member', text: 'The security audit module saved our protocol from a critical reentrancy bug during testnet.' }
    ]
  },
  {
    id: 12,
    title: 'Fitness & Nutrition Inner Circle',
    slug: 'fitnesscircle',
    description: 'Daily plans, meal prep and a supportive room for real progress.',
    members: '32k',
    onlineCount: '480',
    adminsCount: '12',
    price: 'Free',
    priceType: 'Free',
    accessType: 'Public',
    category: 'Health',
    cover: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85',
    accent: '#3d5ba9',
    tag: 'Free to join',
    rating: '5.0',
    reviewCount: 154,
    creatorName: 'Coach Jordan Smith',
    creatorTitle: 'CSCS & Performance Coach',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    aboutParagraphs: [
      'Sustainable fitness, science-backed nutrition, and everyday accountability. No extreme starvation diets or unsustainable 2-hour workout regimes.',
      'Get customizable strength training programs, simple meal prep recipes, macro calculation tools, and daily habit check-ins.',
      'Join thousands of members celebrating non-scale victories and building lifelong physical strength in a positive environment.'
    ],
    highlights: [
      'Full workout routines for home and commercial gyms',
      'High-protein meal plans and macro tracking guides',
      'Form check video review channel with certified coaches',
      'Daily motivation and progress photo accountability'
    ],
    reviews: [
      { author: 'Laura Martinez', rating: 5, time: '3d ago', status: 'Community member', text: 'Down 15 lbs in 3 months without feeling deprived. The meal prep guides are delicious!' }
    ]
  }
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