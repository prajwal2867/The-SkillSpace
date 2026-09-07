(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:1,name:`Harsh Pillai`,username:`harsh_pillai34`,email:`harsh_pillai34@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2025-09-06`,bio:`Entrepreneur building SaaS products.`,points:59,level:5},{id:2,name:`Krishna Mahajan`,username:`krishna_mahajan43`,email:`krishna_mahajan43@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2025-12-04`,bio:`Software engineer by day, gamer by night.`,points:22,level:4},{id:3,name:`Varun Patil`,username:`varun_patil25`,email:`varun_patil25@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-06-06`,bio:`Passionate about web development and building communities.`,points:155,level:4},{id:4,name:`Nitin Goyal`,username:`nitin_goyal24`,email:`nitin_goyal24@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-09-15`,bio:`Building the next big thing.`,points:48,level:4},{id:5,name:`Simran Iyer`,username:`simran_iyer55`,email:`simran_iyer55@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2025-11-10`,bio:`Software engineer by day, gamer by night.`,points:132,level:3},{id:6,name:`Ananya Mishra`,username:`ananya_mishra91`,email:`ananya_mishra91@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-07-01`,bio:`UI/UX designer with a love for clean aesthetics.`,points:476,level:4},{id:7,name:`Yash Mishra`,username:`yash_mishra86`,email:`yash_mishra86@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-06-08`,bio:`Passionate about web development and building communities.`,points:90,level:3},{id:8,name:`Vikram Bhatt`,username:`vikram_bhatt82`,email:`vikram_bhatt82@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-03-21`,bio:`Digital marketer transitioning into tech.`,points:402,level:3},{id:9,name:`Vihaan Chatterjee`,username:`vihaan_chatterjee97`,email:`vihaan_chatterjee97@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2025-09-14`,bio:`UI/UX designer with a love for clean aesthetics.`,points:216,level:1},{id:10,name:`Komal Goyal`,username:`komal_goyal32`,email:`komal_goyal32@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-09-13`,bio:`Entrepreneur building SaaS products.`,points:420,level:2},{id:11,name:`Radhika Tiwari`,username:`radhika_tiwari27`,email:`radhika_tiwari27@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-06-26`,bio:`Passionate about web development and building communities.`,points:234,level:3},{id:12,name:`Pranav Joshi`,username:`pranav_joshi29`,email:`pranav_joshi29@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2025-09-07`,bio:`UI/UX designer with a love for clean aesthetics.`,points:196,level:4},{id:13,name:`Manish Dubey`,username:`manish_dubey89`,email:`manish_dubey89@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-05-09`,bio:`Passionate about web development and building communities.`,points:54,level:2},{id:14,name:`Komal Bose`,username:`komal_bose85`,email:`komal_bose85@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-05-09`,bio:`UI/UX designer with a love for clean aesthetics.`,points:467,level:3},{id:15,name:`Shaurya Reddy`,username:`shaurya_reddy16`,email:`shaurya_reddy16@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-08-12`,bio:`Software engineer by day, gamer by night.`,points:94,level:3},{id:16,name:`Sai Agnihotri`,username:`sai_agnihotri97`,email:`sai_agnihotri97@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2025-08-23`,bio:`Full-stack developer and open source contributor.`,points:70,level:5},{id:17,name:`Varun Sengupta`,username:`varun_sengupta86`,email:`varun_sengupta86@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-07-03`,bio:`Building the next big thing.`,points:326,level:1},{id:18,name:`Ishaan Mittal`,username:`ishaan_mittal89`,email:`ishaan_mittal89@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-01-10`,bio:`Entrepreneur building SaaS products.`,points:105,level:3},{id:19,name:`Poonam Gupta`,username:`poonam_gupta71`,email:`poonam_gupta71@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-05-15`,bio:`Passionate about web development and building communities.`,points:458,level:4},{id:20,name:`Priya Bhattacharya`,username:`priya_bhattacharya98`,email:`priya_bhattacharya98@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-06-03`,bio:`Software engineer by day, gamer by night.`,points:482,level:5},{id:21,name:`Megha Patil`,username:`megha_patil97`,email:`megha_patil97@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-06-23`,bio:`Passionate about web development and building communities.`,points:378,level:2},{id:22,name:`Shaurya Bhattacharya`,username:`shaurya_bhattacharya13`,email:`shaurya_bhattacharya13@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2025-09-10`,bio:`UI/UX designer with a love for clean aesthetics.`,points:244,level:5},{id:23,name:`Kabir Chopra`,username:`kabir_chopra20`,email:`kabir_chopra20@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-07-29`,bio:`Building the next big thing.`,points:357,level:2},{id:24,name:`Amit Khanna`,username:`amit_khanna11`,email:`amit_khanna11@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-06-16`,bio:`Digital marketer transitioning into tech.`,points:432,level:2},{id:25,name:`Riya Menon`,username:`riya_menon3`,email:`riya_menon3@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-06-06`,bio:`UI/UX designer with a love for clean aesthetics.`,points:35,level:2},{id:26,name:`Geeta Mahajan`,username:`geeta_mahajan6`,email:`geeta_mahajan6@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-09-11`,bio:`Learning frontend engineering, one div at a time.`,points:289,level:1},{id:27,name:`Yash Tandon`,username:`yash_tandon17`,email:`yash_tandon17@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2025-11-15`,bio:`Full-stack developer and open source contributor.`,points:14,level:3},{id:28,name:`Rahul Tandon`,username:`rahul_tandon69`,email:`rahul_tandon69@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-02-06`,bio:`Full-stack developer and open source contributor.`,points:314,level:5},{id:29,name:`Manish Bhatia`,username:`manish_bhatia84`,email:`manish_bhatia84@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-02-23`,bio:`Tech enthusiast and lifelong learner.`,points:373,level:2},{id:30,name:`Aditya Rajput`,username:`aditya_rajput36`,email:`aditya_rajput36@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-06-21`,bio:`Passionate about web development and building communities.`,points:456,level:2},{id:31,name:`Kabir Bose`,username:`kabir_bose98`,email:`kabir_bose98@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-08-30`,bio:`Student exploring the world of programming.`,points:469,level:1},{id:32,name:`Swati Malhotra`,username:`swati_malhotra47`,email:`swati_malhotra47@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-05-30`,bio:`Learning frontend engineering, one div at a time.`,points:386,level:2},{id:33,name:`Ayush Chauhan`,username:`ayush_chauhan88`,email:`ayush_chauhan88@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-02-05`,bio:`Student exploring the world of programming.`,points:420,level:1},{id:34,name:`Sanjay Patel`,username:`sanjay_patel88`,email:`sanjay_patel88@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-12-09`,bio:`UI/UX designer with a love for clean aesthetics.`,points:232,level:5},{id:35,name:`Kiran Bhatia`,username:`kiran_bhatia71`,email:`kiran_bhatia71@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-06-05`,bio:`Entrepreneur building SaaS products.`,points:435,level:1},{id:36,name:`Krishna Menon`,username:`krishna_menon22`,email:`krishna_menon22@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-03-11`,bio:`Student exploring the world of programming.`,points:305,level:2},{id:37,name:`Aditi Rajput`,username:`aditi_rajput27`,email:`aditi_rajput27@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2025-11-08`,bio:`Software engineer by day, gamer by night.`,points:468,level:3},{id:38,name:`Ananya Gupta`,username:`ananya_gupta24`,email:`ananya_gupta24@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-02-19`,bio:`Passionate about web development and building communities.`,points:292,level:2},{id:39,name:`Rishabh Bose`,username:`rishabh_bose25`,email:`rishabh_bose25@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-07-18`,bio:`Tech enthusiast and lifelong learner.`,points:324,level:4},{id:40,name:`Tarun Dubey`,username:`tarun_dubey27`,email:`tarun_dubey27@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-01-29`,bio:`Entrepreneur building SaaS products.`,points:308,level:3},{id:41,name:`Suresh Menon`,username:`suresh_menon5`,email:`suresh_menon5@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-02-03`,bio:`Software engineer by day, gamer by night.`,points:470,level:5},{id:42,name:`Jyoti Chatterjee`,username:`jyoti_chatterjee43`,email:`jyoti_chatterjee43@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-07-25`,bio:`UI/UX designer with a love for clean aesthetics.`,points:214,level:2},{id:43,name:`Shikha Chatterjee`,username:`shikha_chatterjee72`,email:`shikha_chatterjee72@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-03-02`,bio:`Learning frontend engineering, one div at a time.`,points:498,level:3},{id:44,name:`Aanya Pandey`,username:`aanya_pandey81`,email:`aanya_pandey81@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-03-23`,bio:`Software engineer by day, gamer by night.`,points:480,level:5},{id:45,name:`Rahul Bansal`,username:`rahul_bansal71`,email:`rahul_bansal71@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-07-16`,bio:`Digital marketer transitioning into tech.`,points:210,level:4},{id:46,name:`Krishna Mahajan`,username:`krishna_mahajan65`,email:`krishna_mahajan65@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-11-28`,bio:`Building the next big thing.`,points:301,level:2},{id:47,name:`Sanjay Khanna`,username:`sanjay_khanna1`,email:`sanjay_khanna1@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-02-10`,bio:`Learning frontend engineering, one div at a time.`,points:159,level:3},{id:48,name:`Ishaan Iyer`,username:`ishaan_iyer59`,email:`ishaan_iyer59@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-01-23`,bio:`Entrepreneur building SaaS products.`,points:238,level:2},{id:49,name:`Aditi Das`,username:`aditi_das69`,email:`aditi_das69@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-01-12`,bio:`Learning frontend engineering, one div at a time.`,points:127,level:4},{id:50,name:`Ajay Mukherjee`,username:`ajay_mukherjee55`,email:`ajay_mukherjee55@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-12-18`,bio:`Tech enthusiast and lifelong learner.`,points:160,level:4},{id:51,name:`Shaurya Tandon`,username:`shaurya_tandon83`,email:`shaurya_tandon83@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-02-08`,bio:`Software engineer by day, gamer by night.`,points:242,level:1},{id:52,name:`Vikram Tandon`,username:`vikram_tandon75`,email:`vikram_tandon75@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-08-22`,bio:`Passionate about web development and building communities.`,points:346,level:1},{id:53,name:`Isha Yadav`,username:`isha_yadav67`,email:`isha_yadav67@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-06-28`,bio:`Digital marketer transitioning into tech.`,points:185,level:3},{id:54,name:`Rishabh Mishra`,username:`rishabh_mishra48`,email:`rishabh_mishra48@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-02-26`,bio:`Passionate about web development and building communities.`,points:458,level:2},{id:55,name:`Diya Mishra`,username:`diya_mishra67`,email:`diya_mishra67@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-04-25`,bio:`Digital marketer transitioning into tech.`,points:316,level:4},{id:56,name:`Vihaan Chauhan`,username:`vihaan_chauhan77`,email:`vihaan_chauhan77@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-09-15`,bio:`Software engineer by day, gamer by night.`,points:398,level:3},{id:57,name:`Vikram Mukherjee`,username:`vikram_mukherjee11`,email:`vikram_mukherjee11@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-09-12`,bio:`Entrepreneur building SaaS products.`,points:31,level:1},{id:58,name:`Yash Sengupta`,username:`yash_sengupta57`,email:`yash_sengupta57@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2025-12-10`,bio:`Learning frontend engineering, one div at a time.`,points:301,level:3},{id:59,name:`Diya Yadav`,username:`diya_yadav41`,email:`diya_yadav41@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-05-28`,bio:`Entrepreneur building SaaS products.`,points:344,level:4},{id:60,name:`Suresh Khanna`,username:`suresh_khanna85`,email:`suresh_khanna85@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-12-26`,bio:`Software engineer by day, gamer by night.`,points:451,level:4},{id:61,name:`Ayush Kulkarni`,username:`ayush_kulkarni87`,email:`ayush_kulkarni87@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-01-12`,bio:`Full-stack developer and open source contributor.`,points:378,level:2},{id:62,name:`Poonam Iyer`,username:`poonam_iyer87`,email:`poonam_iyer87@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2025-11-24`,bio:`Entrepreneur building SaaS products.`,points:86,level:5},{id:63,name:`Rakesh Sharma`,username:`rakesh_sharma18`,email:`rakesh_sharma18@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-10-06`,bio:`UI/UX designer with a love for clean aesthetics.`,points:201,level:3},{id:64,name:`Kabir Chopra`,username:`kabir_chopra10`,email:`kabir_chopra10@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-04-03`,bio:`Passionate about web development and building communities.`,points:43,level:4},{id:65,name:`Aanya Agarwal`,username:`aanya_agarwal93`,email:`aanya_agarwal93@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-11-07`,bio:`Learning frontend engineering, one div at a time.`,points:185,level:2},{id:66,name:`Manish Bansal`,username:`manish_bansal61`,email:`manish_bansal61@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-09-15`,bio:`Digital marketer transitioning into tech.`,points:347,level:5},{id:67,name:`Amit Bhattacharya`,username:`amit_bhattacharya51`,email:`amit_bhattacharya51@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2026-04-08`,bio:`Software engineer by day, gamer by night.`,points:229,level:4},{id:68,name:`Dhruv Kulkarni`,username:`dhruv_kulkarni83`,email:`dhruv_kulkarni83@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-09-23`,bio:`Passionate about web development and building communities.`,points:141,level:2},{id:69,name:`Geeta Kulkarni`,username:`geeta_kulkarni99`,email:`geeta_kulkarni99@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`online`,joinDate:`2026-04-03`,bio:`Passionate about web development and building communities.`,points:308,level:1},{id:70,name:`Ajay Das`,username:`ajay_das62`,email:`ajay_das62@example.com`,passwordHash:`ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f`,status:`offline`,joinDate:`2025-09-29`,bio:`Learning frontend engineering, one div at a time.`,points:212,level:3}];window.dummyUsers=e,window.dummyPosts=[{id:16,authorId:63,content:`Looking for study partners for the upcoming JavaScript bootcamp.`,category:`Showcase`,likes:17,timestamp:`2026-08-14T22:02:05.422Z`},{id:19,authorId:2,content:`Just started the new UI/UX module. It's fantastic!`,category:`Showcase`,likes:10,timestamp:`2026-08-14T10:53:48.933Z`},{id:24,authorId:33,content:`I built a small SkillSpace replica to learn static web development.`,category:`General`,likes:17,timestamp:`2026-08-13T18:54:37.303Z`},{id:10,authorId:7,content:`When is the next live Q&A session happening?`,category:`Help`,likes:3,timestamp:`2026-08-13T13:38:35.198Z`},{id:13,authorId:68,content:`What is the best way to center a div in CSS?`,category:`Help`,likes:14,timestamp:`2026-08-11T11:55:25.574Z`},{id:18,authorId:30,content:`Looking for study partners for the upcoming JavaScript bootcamp.`,category:`Showcase`,likes:3,timestamp:`2026-08-11T10:06:00.228Z`},{id:21,authorId:45,content:`Just started the new UI/UX module. It's fantastic!`,category:`General`,likes:16,timestamp:`2026-08-11T08:47:35.515Z`},{id:20,authorId:11,content:`Can someone help me understand how localStorage works?`,category:`General`,likes:4,timestamp:`2026-08-10T19:14:52.745Z`},{id:23,authorId:70,content:`When is the next live Q&A session happening?`,category:`Help`,likes:6,timestamp:`2026-08-10T14:03:41.704Z`},{id:5,authorId:32,content:`Just started the new UI/UX module. It's fantastic!`,category:`Help`,likes:9,timestamp:`2026-08-10T04:46:19.894Z`},{id:1,authorId:44,content:`Here is my progress for Week 2. Let me know what you think!`,category:`General`,likes:11,timestamp:`2026-08-08T23:24:59.485Z`},{id:14,authorId:14,content:`Just started the new UI/UX module. It's fantastic!`,category:`Help`,likes:16,timestamp:`2026-08-08T12:54:28.115Z`},{id:6,authorId:36,content:`What is the best way to center a div in CSS?`,category:`Help`,likes:8,timestamp:`2026-08-08T00:27:42.443Z`},{id:7,authorId:43,content:`Just reached level 3! The new course looks amazing.`,category:`Showcase`,likes:10,timestamp:`2026-08-06T20:17:28.124Z`},{id:11,authorId:33,content:`When is the next live Q&A session happening?`,category:`Help`,likes:16,timestamp:`2026-08-06T13:10:03.188Z`},{id:15,authorId:3,content:`Here is my progress for Week 2. Let me know what you think!`,category:`General`,likes:0,timestamp:`2026-08-06T05:16:42.053Z`},{id:2,authorId:8,content:`Here is my progress for Week 2. Let me know what you think!`,category:`Help`,likes:9,timestamp:`2026-08-05T12:21:06.044Z`},{id:17,authorId:44,content:`Can someone help me understand how localStorage works?`,category:`Help`,likes:12,timestamp:`2026-08-05T06:44:42.859Z`},{id:25,authorId:50,content:`I built a small SkillSpace replica to learn static web development.`,category:`Showcase`,likes:1,timestamp:`2026-08-04T14:40:59.067Z`},{id:9,authorId:19,content:`Does anyone have resources for mastering Flexbox?`,category:`General`,likes:18,timestamp:`2026-08-04T08:15:47.868Z`},{id:22,authorId:21,content:`Looking for study partners for the upcoming JavaScript bootcamp.`,category:`Help`,likes:10,timestamp:`2026-08-04T02:45:33.397Z`},{id:8,authorId:59,content:`I finally deployed my first React app today 🎉`,category:`Showcase`,likes:19,timestamp:`2026-08-03T16:29:46.144Z`},{id:4,authorId:49,content:`Just started the new UI/UX module. It's fantastic!`,category:`General`,likes:17,timestamp:`2026-08-03T00:08:03.178Z`},{id:3,authorId:46,content:`Can someone help me understand how localStorage works?`,category:`General`,likes:14,timestamp:`2026-08-02T22:48:03.902Z`},{id:12,authorId:54,content:`Just reached level 3! The new course looks amazing.`,category:`Showcase`,likes:0,timestamp:`2026-08-02T11:51:46.728Z`}],window.dummyCourses=[{id:1,title:`Welcome to the Community`,thumbnail:`https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80`,description:`Get started with our platform and learn how to make the most of your community experience.`,members:320,price:`Free`,requiredLevel:1,modules:[{id:101,title:`Introduction`,duration:`5:00`},{id:102,title:`How to use this platform`,duration:`12:30`}]},{id:2,title:`Frontend Fundamentals`,thumbnail:`https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80`,description:`Master the core building blocks of the web: HTML, CSS, and foundational JavaScript.`,members:780,price:`$29`,requiredLevel:2,modules:[{id:201,title:`HTML Basics`,duration:`15:20`},{id:202,title:`CSS Styling`,duration:`20:10`}]},{id:3,title:`Advanced JavaScript`,thumbnail:`https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80`,description:`Deep dive into closures, async patterns, and advanced JavaScript concepts.`,members:540,price:`$49`,requiredLevel:3,modules:[{id:301,title:`Closures & Scope`,duration:`18:45`},{id:302,title:`Async/Await`,duration:`25:00`}]},{id:4,title:`Mastering the DOM`,thumbnail:`https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80`,description:`Learn to manipulate the DOM like a pro with modern JavaScript APIs and event handling.`,members:410,price:`$39`,requiredLevel:4,modules:[{id:401,title:`Selecting Elements`,duration:`10:15`},{id:402,title:`Event Listeners`,duration:`14:20`}]},{id:5,title:`Building a SkillSpace Clone`,thumbnail:`https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80`,description:`A hands-on project course walking you through architecting and implementing a full community platform.`,members:290,price:`$79`,requiredLevel:5,modules:[{id:501,title:`Architecture Planning`,duration:`30:00`},{id:502,title:`Implementation`,duration:`45:00`}]},{id:6,title:`Claude for Coaches`,thumbnail:`https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80`,description:`For Business Coaches, Consultants and service providers wanting to build 7-figure lifestyle empires with AI.`,members:1500,price:`$47`,requiredLevel:2,modules:[{id:601,title:`AI Systems for Coaches`,duration:`22:00`},{id:602,title:`Content Creation with AI`,duration:`18:30`},{id:603,title:`Client Acquisition Automation`,duration:`30:00`},{id:604,title:`Automation Workflows`,duration:`25:15`}]},{id:7,title:`School of Mentors`,thumbnail:`https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80`,description:`The #1 Entrepreneurship Community in the World. Get Mentored EVERY WEEK by Millionaires and Billionaires.`,members:5900,price:`$35/month`,requiredLevel:3,modules:[{id:701,title:`Mindset of the Ultra-Wealthy`,duration:`40:00`},{id:702,title:`Building a Business from Zero`,duration:`35:20`},{id:703,title:`Weekly Mentor Sessions`,duration:`60:00`},{id:704,title:`Investment Strategies`,duration:`28:45`}]},{id:8,title:`AI Youtube Growth Secrets`,thumbnail:`https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80`,description:`Help people build income streams with faceless YouTube channels using AI.`,members:871,price:`$97/year`,requiredLevel:2,modules:[{id:801,title:`Faceless Channel Setup`,duration:`15:00`},{id:802,title:`AI Script Writing`,duration:`20:30`},{id:803,title:`AI Video Creation`,duration:`35:00`},{id:804,title:`Monetization Strategies`,duration:`22:10`},{id:805,title:`Scaling to $50k/month`,duration:`45:00`}]}];var t=[`Trending`,`Hobbies`,`Music`,`Money`,`Spirituality`,`Tech`,`Health`,`Sports`,`Self-improvement`],n=[{id:1,name:`Prajwal Ramagiri`,email:`ramagiri.prajwal@gmail.com`,passwordHash:`4ccb808c3e7309a9a7b14cd09d77e2049edeff88d1d433b160d8204adccdc613`,username:`prajwal-ramagiri-6593`,bio:`Curious, learning in public.`,joinDate:`2026-08-15`},...e],r=[{id:1,title:`AI Video Bootcamp`,slug:`aivideobootcamp`,description:`Make AI adverts, social content and films that people remember.`,members:`26.5k`,onlineCount:`342`,adminsCount:`8`,price:`$9 / month`,priceType:`Paid`,accessType:`Public`,category:`Tech`,cover:`https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&w=1000&q=85`,accent:`#3d5ba9`,tag:`Most active`,rating:`5.0`,reviewCount:93,creatorName:`Harsh Pillai`,creatorTitle:`AI Filmmaker & SaaS Founder`,creatorAvatar:`https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,aboutParagraphs:[`You relearn AI every time a model updates. The tools change. Your work resets. Build the structure underneath instead, and it lasts a decade.`,`What we give away for free beats most paid courses. Build durable AI systems with a veteran Edinburgh researcher. 40+ structured video modules and growing every month.`,`Our curriculum covers high-yield generative techniques: folder architecture that turns raw prompts into reproducible systems, prompt frameworks you reuse across video tools, computing fundamentals most creators skip, and practical AI video rendering built to survive every framework shift.`],highlights:[`Folder architecture that turns your files into a system`,`Prompt frameworks you reuse across Sora, Runway, and Kling`,`Computing fundamentals most generative creators skip`,`Running top AI video systems on real production client work`,`The foundational thinking that survives every model update`],reviews:[{author:`Simran Iyer`,rating:5,time:`18h ago`,status:`Still a paying member after 3 months`,text:`I completed Navigating the course. I created my github repo account, synced VS Code with my pipeline and established full automated video rendering via API!`},{author:`Varun Patil`,rating:5,time:`1d ago`,status:`Still a paying member after 5 months`,text:`Fantastic group and clear, easy learning. Would rate 6 stars if I could!`},{author:`Nitin Goyal`,rating:5,time:`2d ago`,status:`Still a paying member after 2 months`,text:`The depth of knowledge in this bootcamp is unmatched. The prompt templates alone saved me 40 hours this month.`},{author:`Ananya Mishra`,rating:5,time:`4d ago`,status:`Still a paying member after 3 months`,text:`Worth every single penny. The community feedback on my first AI film commercial helped me land my first paid client.`}]},{id:2,title:`CapCut Creator Bootcamp`,slug:`capcutbootcamp`,description:`Go from first cut to viral edit, with a practical creator curriculum.`,members:`1.1k`,onlineCount:`89`,adminsCount:`4`,price:`$12 / month`,priceType:`Paid`,accessType:`Public`,category:`Hobbies`,cover:`https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=85`,accent:`#3d5ba9`,tag:`New energy`,rating:`4.9`,reviewCount:64,creatorName:`Krishna Mahajan`,creatorTitle:`Short-Form Content Strategist`,creatorAvatar:`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80`,aboutParagraphs:[`Stop spending 10 hours on an edit that gets 200 views. Learn the exact storytelling hooks, pacing mechanics, and visual transitions that hold attention.`,`CapCut has become the premier editing studio for mobile and desktop creators alike. In this bootcamp, we deconstruct high-performing Reels, TikToks, and Shorts line by line.`,`Gain immediate access to project file templates, trending audio breakdown lists, custom keyframe animation presets, and weekly live video teardown sessions.`],highlights:[`Master keyframing, velocity edits, and seamless motion tracking`,`Plug-and-play title animation styles and sound effect libraries`,`Hook retention formulas optimized for Instagram & TikTok algorithms`,`Weekly live community feedback on your draft edits before posting`],reviews:[{author:`Saanvi Deshmukh`,rating:5,time:`2d ago`,status:`Member for 4 months`,text:`My retention graph tripled after applying the pacing framework from Module 2. Absolutely game-changing.`},{author:`Rohan Reddy`,rating:5,time:`5d ago`,status:`Member for 1 month`,text:`The community feedback channel is worth 10x the monthly price. Instant answers to editing bottlenecks.`}]},{id:3,title:`AI Realism Academy`,slug:`airealism`,description:`Engineer believable images and video from zero experience.`,members:`1.3k`,onlineCount:`115`,adminsCount:`5`,price:`$9 / month`,priceType:`Paid`,accessType:`Private`,category:`Tech`,cover:`https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1000&q=85`,accent:`#3d5ba9`,tag:`Private room`,rating:`5.0`,reviewCount:42,creatorName:`Ananya Mishra`,creatorTitle:`Generative Art Director & UI/UX Designer`,creatorAvatar:`https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80`,aboutParagraphs:[`Bridge the gap between synthetic plastic renders and photorealistic digital art. Master camera lighting, aperture controls, texture depth, and noise injection.`,`Designed exclusively for visual artists, designers, and visual researchers seeking museum-grade generative precision without trial and error.`,`Inside this private studio, we share custom LoRAs, ControlNet workflows, ComfyUI node graphs, and ultra-high-resolution upscaling pipelines.`],highlights:[`Advanced ComfyUI & Midjourney prompt parameters guide`,`Photorealistic skin texture, lighting, and camera lens control`,`Private repository of custom curated LoRA models`,`Direct critique from studio instructors on image compositions`],reviews:[{author:`Vikram Bhatt`,rating:5,time:`1d ago`,status:`Active member`,text:`The lighting cheat sheets transformed my render quality overnight. No more plastic look!`},{author:`Riya Pillai`,rating:5,time:`3d ago`,status:`Member for 6 months`,text:`Best photorealism community online. The ComfyUI workflows are pure gold.`}]},{id:4,title:`AI Automation Agency Bootcamp`,slug:`aiautomation`,description:`Build a one-person AI business in seven days.`,members:`164.9k`,onlineCount:`1240`,adminsCount:`24`,price:`$7 / month`,priceType:`Paid`,accessType:`Public`,category:`Money`,cover:`https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1000&q=85`,accent:`#3d5ba9`,tag:`Top community`,rating:`4.9`,reviewCount:412,creatorName:`Varun Patil`,creatorTitle:`AI Agency Lead & Full-Stack Developer`,creatorAvatar:`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80`,aboutParagraphs:[`The largest community of AI automation operators on the web. Learn how to design, package, and deploy Make, n8n, and custom LLM workflows for commercial clients.`,`We turn technical curiosity into scalable consulting revenue. From cold outreach scripts and contract templates to enterprise API architecture.`,`Join over 160,000 operators building the next generation of automated business solutions with daily Q&A, weekly office hours, and client deal breakdowns.`],highlights:[`Step-by-step agency launch blueprint for single-operator founders`,`Pre-built n8n and Make automation templates for common workflows`,`Client proposal decks, contract agreements, and pricing structures`,`Daily peer support and live technical troubleshooting channels`],reviews:[{author:`Sneha Kapoor`,rating:5,time:`11d ago`,status:`Paying member after 8 months`,text:`Closed my first $3,500 retainer using the proposal template from section 4. This group pays for itself 500x over.`},{author:`Aarav Malhotra`,rating:5,time:`12d ago`,status:`Paying member after 1 year`,text:`The community standard for AI agency owners. Continuous value every single week.`}]},{id:5,title:`Grow With Simran`,slug:`growwithsimran`,description:`Build an online education business that sells.`,members:`3.8k`,onlineCount:`142`,adminsCount:`6`,price:`Free`,priceType:`Free`,accessType:`Public`,category:`Money`,cover:`https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=85`,accent:`#3d5ba9`,tag:`Free to join`,rating:`5.0`,reviewCount:88,creatorName:`Simran Iyer`,creatorTitle:`Course Creator & Tech Educator`,creatorAvatar:`https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80`,aboutParagraphs:[`Turn your specialized knowledge into a thriving, community-driven online learning experience. Learn audience building, curriculum structure, and ethical sales.`,`No pushy sales tactics or complicated webinar funnels. Just clear, high-empathy education design that produces real student outcomes.`,`Get direct feedback on your course outlines, sales page headlines, and onboarding sequences inside our supportive free community space.`],highlights:[`Curriculum mapping blueprint for high-completion online programs`,`High-converting landing page layouts and copy frameworks`,`Community engagement playbooks that keep members active long term`,`Free weekly office hours and live community coaching calls`],reviews:[{author:`Aditi Joshi`,rating:5,time:`3d ago`,status:`Free community member`,text:`Simran explains curriculum design better than any $2,000 masterclass I have taken!`},{author:`Kabir Tandon`,rating:5,time:`1w ago`,status:`Free community member`,text:`Warm, highly supportive atmosphere with incredibly practical guidance.`}]},{id:6,title:`UGC Brand Deal Sprint`,slug:`ugcbranddeal`,description:`Get your first paid UGC deal with scripts, contacts and accountability.`,members:`359`,onlineCount:`48`,adminsCount:`3`,price:`$5 / month`,priceType:`Paid`,accessType:`Private`,category:`Money`,cover:`https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=85`,accent:`#3d5ba9`,tag:`Small cohort`,rating:`4.8`,reviewCount:31,creatorName:`Riya Pillai`,creatorTitle:`Full-Time UGC Creator`,creatorAvatar:`https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,aboutParagraphs:[`A tight-knit sprint group focused on pitching brands, perfecting video portfolios, and securing monthly content creation retainers.`,`We provide verified brand contact databases, proven cold email scripts, contract templates, and daily pitch accountability tracking.`,`Designed for aspiring creators who want actionable daily guidance rather than endless theoretical lessons.`],highlights:[`Direct brand manager email directory updated weekly`,`Plug-and-play pitch email scripts and follow-up templates`,`Portfolio review and video hook feedback from active UGC creators`,`Daily pitch counter leaderboard and accountability tracking`],reviews:[{author:`Ishaan Chatterjee`,rating:5,time:`7d ago`,status:`Sprint participant`,text:`I love every process and how engaging it is! Booked 2 brand deals in my first 3 weeks.`}]},{id:7,title:`The Media Foundation`,slug:`mediafoundation`,description:`See what real buyers run daily and stop letting ad accounts bleed.`,members:`2.5k`,onlineCount:`176`,adminsCount:`6`,price:`$2 / month`,priceType:`Paid`,accessType:`Public`,category:`Money`,cover:`https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85`,accent:`#3d5ba9`,tag:`Low cost`,rating:`4.9`,reviewCount:78,creatorName:`Nitin Goyal`,creatorTitle:`Media Buyer & Growth Lead`,creatorAvatar:`https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80`,aboutParagraphs:[`Real ad accounts, transparent ad spend data, and honest post-mortems on winning and losing campaigns across Meta, TikTok, and Google.`,`Stop relying on outdated ad tactics. We analyze real-time ad performance metrics, creative iteration frameworks, and media buying structures.`,`Join thousands of media buyers sharing breakdown videos of their actual ad sets and landing page conversion funnels.`],highlights:[`Weekly live ad account teardowns and creative audits`,`Meta & TikTok ad structure templates for e-commerce and lead gen`,`Creative testing framework to identify winning angles fast`,`Direct troubleshooting for ad account bans and tracking errors`],reviews:[{author:`Pooja Kulkarni`,rating:5,time:`5d ago`,status:`Paying member`,text:`Always learning, thank you all. Reduced our cost per acquisition by 34%.`}]},{id:8,title:`Never Too Late to Create`,slug:`nevertoolate`,description:`A welcoming studio for creators over 50, or anyone ready to begin.`,members:`105`,onlineCount:`22`,adminsCount:`2`,price:`$5 / month`,priceType:`Paid`,accessType:`Public`,category:`Self-improvement`,cover:`https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1000&q=85`,accent:`#3d5ba9`,tag:`Fresh start`,rating:`5.0`,reviewCount:19,creatorName:`Yash Mishra`,creatorTitle:`Writer & Digital Creator`,creatorAvatar:`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80`,aboutParagraphs:[`Age is an asset, not a barrier. Join a patient, encouraging creator studio designed for lifelong learners launching newsletters, podcasts, or online channels.`,`No jargon, tech anxiety, or fast-talking hustle culture. Just clear step-by-step guidance on digital tools, writing habits, and creative confidence.`,`Connect with peers who share your journey and support your creative milestone goals in a comfortable, pressure-free environment.`],highlights:[`Simple, jargon-free video tutorials on key digital tools`,`Weekly creative writing prompts and studio check-in calls`,`Friendly community feedback on podcasts, blogs, and channels`,`Safe, welcoming environment built on mutual encouragement`],reviews:[{author:`Kavya Nair`,rating:5,time:`1w ago`,status:`Member`,text:`The kindest group on the internet. Finally launched my Substack with support!`}]},{id:9,title:`Faceless Instagram HQ`,slug:`facelessig`,description:`Build monetized pages without ever turning on a camera.`,members:`1.4k`,onlineCount:`98`,adminsCount:`4`,price:`$47`,priceType:`Paid`,accessType:`Private`,category:`Money`,cover:`https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=1000&q=85`,accent:`#3d5ba9`,tag:`Deep dive`,rating:`4.8`,reviewCount:52,creatorName:`Vikram Bhatt`,creatorTitle:`Faceless Media Publisher & Marketer`,creatorAvatar:`https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80`,aboutParagraphs:[`Master theme page monetization, automated viral reel creation, and affiliate digital product sales without showing your face.`,`We reveal exact niche research frameworks, content sourcing pipelines, stock asset libraries, and caption hook strategies.`,`Includes complete digital product templates you can rebrand and sell directly to your audience for 100% profit margins.`],highlights:[`Niche selection matrix with verified monetization metrics`,`Automated batching workflow for Instagram Reels & TikToks`,`Digital product vault with editable Canva templates`,`Private mastermind chat channel for theme page owners`],reviews:[{author:`Aditya Singh`,rating:5,time:`4d ago`,status:`Paying member`,text:`If you are wondering if the 5 star reviews are just to be nice - they are not. The content here is revolutionary.`}]},{id:10,title:`The Creators Hub`,slug:`creatorshub`,description:`Share ideas, collaborate on projects and grow your audience together.`,members:`12.3k`,onlineCount:`512`,adminsCount:`15`,price:`Free`,priceType:`Free`,accessType:`Public`,category:`Hobbies`,cover:`https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85`,accent:`#3d5ba9`,tag:`Open room`,rating:`4.9`,reviewCount:110,creatorName:`Saanvi Deshmukh`,creatorTitle:`Community Host & Designer`,creatorAvatar:`https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,aboutParagraphs:[`A vibrant open lounge for digital creators across video, writing, podcasting, and design. Find co-founders, feedback partners, and cross-promotion opportunities.`,`Whether you have 10 subscribers or 100,000, creative work is better together. We host weekly virtual co-working rooms and feedback circles.`,`Jump in, introduce your work, and participate in ongoing creative challenges designed to boost your shipping frequency.`],highlights:[`24/7 Virtual co-working voice and video channels`,`Collaboration match-making threads for podcasters and YouTubers`,`Weekly constructive feedback sessions on thumbnails and titles`,`Resource sharing channels with free creator assets`],reviews:[{author:`Shaurya Bhatia`,rating:5,time:`10d ago`,status:`Free member`,text:`Found my podcast co-host here within two days. Incredible group of active builders.`}]},{id:11,title:`Web3 Developers Network`,slug:`web3devs`,description:`Learn smart contracts, find builders and ship in public.`,members:`5.7k`,onlineCount:`210`,adminsCount:`9`,price:`$49 / month`,priceType:`Paid`,accessType:`Public`,category:`Tech`,cover:`https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1000&q=85`,accent:`#3d5ba9`,tag:`Builder-led`,rating:`4.9`,reviewCount:67,creatorName:`Rohan Reddy`,creatorTitle:`Smart Contract Architect`,creatorAvatar:`https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80`,aboutParagraphs:[`Deep technical community for Solidity, Rust, and Web3 protocol developers. Learn security auditing best practices, smart contract optimization, and decentralization patterns.`,`We review real pull requests, analyze protocol hacks, and build production dApps in public during hackathon sprints.`,`Access curated code bases, security audit checklists, and direct referral channels to Web3 engineering teams.`],highlights:[`Solidity & Rust smart contract security curriculum`,`Code review and PR feedback from senior protocol engineers`,`Hackathon team formation channels and bounty announcements`,`Job board with direct access to Web3 hiring founders`],reviews:[{author:`Kabir Tandon`,rating:5,time:`2w ago`,status:`Paying member`,text:`The security audit module saved our protocol from a critical reentrancy bug during testnet.`}]},{id:12,title:`Fitness & Nutrition Inner Circle`,slug:`fitnesscircle`,description:`Daily plans, meal prep and a supportive room for real progress.`,members:`32k`,onlineCount:`480`,adminsCount:`12`,price:`Free`,priceType:`Free`,accessType:`Public`,category:`Health`,cover:`https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85`,accent:`#3d5ba9`,tag:`Free to join`,rating:`5.0`,reviewCount:154,creatorName:`Aarav Malhotra`,creatorTitle:`Health & Performance Coach`,creatorAvatar:`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80`,aboutParagraphs:[`Sustainable fitness, science-backed nutrition, and everyday accountability. No extreme starvation diets or unsustainable 2-hour workout regimes.`,`Get customizable strength training programs, simple meal prep recipes, macro calculation tools, and daily habit check-ins.`,`Join thousands of members celebrating non-scale victories and building lifelong physical strength in a positive environment.`],highlights:[`Full workout routines for home and commercial gyms`,`High-protein meal plans and macro tracking guides`,`Form check video review channel with certified coaches`,`Daily motivation and progress photo accountability`],reviews:[{author:`Aditi Joshi`,rating:5,time:`3d ago`,status:`Community member`,text:`Down 15 lbs in 3 months without feeling deprived. The meal prep guides are delicious!`}]}],i=[{user:`Harsh Pillai`,text:`posted a new announcement`,time:`9h`,avatar:`https://randomuser.me/api/portraits/men/32.jpg`},{user:`Varun Patil`,text:`shared a new lesson`,time:`12h`,avatar:`https://randomuser.me/api/portraits/men/44.jpg`},{user:`Vikram Bhatt`,text:`went live with a new workshop`,time:`21h`,avatar:`https://randomuser.me/api/portraits/men/22.jpg`}],a=[{user:`Simran Iyer`,text:`Welcome to Excel Mastery! Check step one.`,time:`1h`,avatar:`https://randomuser.me/api/portraits/women/44.jpg`},{user:`Nitin Goyal`,text:`That is all you have left before launch.`,time:`Oct 25`,avatar:`https://randomuser.me/api/portraits/men/45.jpg`},{user:`Rohan Reddy`,text:`It is impressive you are developing AI models.`,time:`Feb 25`,avatar:`https://randomuser.me/api/portraits/men/62.jpg`}],o=`skillspace_user_v2`,s=`skillspace_posts_v2`,c=`skillspace_users_v2`,l=`skillspace_session_v2`,u={get user(){return JSON.parse(localStorage.getItem(o)||`null`)},set user(e){e?localStorage.setItem(o,JSON.stringify(e)):localStorage.removeItem(o)},get users(){return JSON.parse(localStorage.getItem(c)||`[]`)},saveUser(e){localStorage.setItem(c,JSON.stringify([...this.users,e]))},findUser(e){return this.users.find(t=>t.email.toLowerCase()===e.toLowerCase())},get session(){try{return JSON.parse(localStorage.getItem(l)||`null`)}catch{return null}},get sessionToken(){return this.session?.token||null},saveSession(e){let t={token:crypto.randomUUID(),userId:e.id,createdAt:Date.now(),expiresAt:Date.now()+6048e5};return localStorage.setItem(l,JSON.stringify(t)),this.user=e,t.token},clearSession(){localStorage.removeItem(l),this.user=null},get posts(){return JSON.parse(localStorage.getItem(s)||`[]`)},addPost(e){localStorage.setItem(s,JSON.stringify([e,...this.posts]))}},d={view:`discover`,category:`Trending`,price:`All`,access:`All`,sort:`Trending`,query:``,submittedQuery:``,selected:null,settingsTab:`profile`,modal:null,authMode:`login`,profileMenu:!1,filterMenu:!1,authMessage:``,themeMode:`light`,selectedContributionGroup:`All communities`,selectedMediaIndex:0,communityTab:`About`,joinedCommunities:[],planBilling:`monthly`,selectedPlan:null},f=e=>({search:`⌕`,bell:`<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 10h18c0-2-3-3-3-10Z"></path><path d="M10 21h4"></path></svg>`,chat:`<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.7 8.7 0 0 1-3.4-.7L4 20l1.2-3.6A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"></path></svg>`,plus:`+`,arrow:`↗`,back:`←`,lock:`◈`,user:`●`,globe:`<svg class="nav-icon-inline" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"></path></svg>`})[e]||`•`,p=(e=u.user)=>(e?.name||e?.email||`U`).slice(0,1).toUpperCase(),m=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function h(){let e=d.submittedQuery.toLowerCase(),t=r.filter(t=>(!e||`${t.title} ${t.description} ${t.category}`.toLowerCase().includes(e))&&(d.category===`Trending`||t.category===d.category)&&(d.price===`All`||t.priceType===d.price)&&(d.access===`All`||t.accessType===d.access));return d.sort===`Top`&&t.sort((e,t)=>parseFloat(t.members)-parseFloat(e.members)),t}function g(){let e=u.user,t=d.selected?r.find(e=>e.id===d.selected)||r[0]:null,n=d.view===`detail`,i=`
    <form class="topbar-search-form" id="topSearch">
      <svg class="topbar-search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input id="topSearchInput" value="${m(d.query)}" placeholder="Search" aria-label="Search communities">
      ${d.query?`<button type="button" class="topbar-search-clear" data-action="clear-search" aria-label="Clear search">×</button>`:``}
    </form>
  `,a=e?`
    <div class="profile-menu ${d.profileMenu?`active`:``}" id="userProfileMenu">
    <div class="profile-menu-email">${m(e.email)}</div>
    <button data-action="profile-page">Profile</button>
    <button data-action="settings">Settings</button>
    <button data-action="affiliates">Affiliates</button>
    <div class="profile-menu-divider"></div>
    <button class="profile-menu-muted" data-action="language">${f(`globe`)} Language</button>
    <button class="profile-menu-muted" data-action="help">Help center</button>
    <button class="profile-menu-muted" data-action="create">Create a community</button>
    <button class="profile-menu-muted" data-action="discover">Discover communities</button>
    <div class="profile-menu-divider logout-divider"></div>
    <button class="profile-menu-muted" data-action="logout">Log out</button>
  </div>
  `:``,o=`
    <div class="brand-container" id="brandContainer">
      ${n?`
    <button class="topbar-back-btn" data-action="discover" title="Go back to Home" aria-label="Go back to home page">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
    </button>
  `:``}
      ${n&&t?`
        <div class="community-header-brand" data-action="toggle-brand-menu">
          <img src="${t.creatorAvatar||t.cover}" class="community-brand-icon" alt="">
          <span class="community-brand-name">${m(t.title)}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:4px;"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      `:`
        <button class="wordmark" data-action="toggle-brand-menu"><span>skill</span>space</button>
        <button class="community-switcher-btn" data-action="toggle-brand-menu" title="Switch communities" aria-label="Switch communities">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 15 12 20 17 15"></polyline><polyline points="7 9 12 4 17 9"></polyline></svg>
        </button>
      `}

      <div class="brand-dropdown-menu ${d.brandMenu?`active`:``}" id="brandDropdownMenu">
        <div class="brand-search-row">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="brandMenuSearch" placeholder="Search" aria-label="Search communities">
          <button type="button" class="brand-gear-btn" title="Manage communities" aria-label="Manage communities">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </button>
        </div>
        <div class="brand-community-list" id="brandCommunityList">
          ${(d.joinedCommunities||[]).length>0?d.joinedCommunities.map(e=>r.find(t=>t.id===e)).filter(Boolean).map(e=>`
            <div class="brand-community-item" data-action="select-community" data-id="${e.id}">
              <img src="${e.cover}" class="brand-comm-avatar" alt="${m(e.title)}">
              <span class="brand-comm-title">${m(e.title)}</span>
            </div>
          `).join(``):``}
        </div>
        <button class="brand-menu-item" data-action="create">
          <div class="brand-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </div>
          <span>Create a community</span>
        </button>
        <button class="brand-menu-item" data-action="discover">
          <div class="brand-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
          </div>
          <span>Discover communities</span>
        </button>
      </div>
    </div>
  `,s=t?(d.joinedCommunities||[]).includes(t.id):!1,c=n&&s?`
    <div class="community-subnav-bar">
      <div class="subnav-container">
        ${[`Community`,`Classroom`,`Calendar`,`Members`,`Map`,`Leaderboards`,`About`].map(e=>`
          <button class="subnav-tab ${d.communityTab===e?`active`:``}" data-action="select-subnav-tab" data-tab="${e}">${e}</button>
        `).join(``)}
      </div>
    </div>
  `:``;return`
    <header class="topbar-wrapper">
      <div class="topbar-container">
        <div class="topbar-left-group">
          ${o}
          ${i}
        </div>
        <div class="top-actions">
          ${e?`
            <button class="round-button" data-action="chats" aria-label="Chats">${f(`chat`)}<i>1</i></button>
            <button class="round-button" data-action="notifications" aria-label="Notifications">${f(`bell`)}<i>3</i></button>
            <div class="profile-control" id="profileControlContainer">
              <button class="avatar" data-action="profile" aria-label="Account menu">${p()}</button>
              ${a}
            </div>
          `:`
            <button class="auth-nav-button" data-action="login">LOG IN</button>
            <button class="auth-nav-button" data-action="register">SIGN UP</button>
          `}
        </div>
      </div>
      ${c}
    </header>
  `}function _(e,t){return`<article class="community-card" style="--accent:${e.accent};--delay:${t*45}ms" data-community="${e.id}"><div class="card-image"><img src="${e.cover}" alt="${m(e.title)} cover"><span class="card-tag">${e.tag}</span></div><div class="card-body"><div class="eyebrow">${e.category} <span>·</span> ${e.accessType===`Private`?f(`lock`)+` Private`:`Open access`}</div><h2>${m(e.title)}</h2><p>${m(e.description)}</p><footer><span><strong>${e.members}</strong> members</span><span class="price">${e.price}</span></footer></div></article>`}function v(){let e=h(),n=d.submittedQuery?`<div class="result-heading"><span>${e.length} results for <strong>"${m(d.submittedQuery)}"</strong></span><button class="filter-button" data-action="filters">Filter ${f(`plus`)}</button></div>`:``,r=d.price!==`All`||d.access!==`All`||d.sort!==`Trending`;return`<main class="discover-page"><section class="intro"><div><p class="kicker">A better place to belong</p><h1>Discover communities</h1><p class="intro-copy">or <button class="inline-create" data-action="create">create your own</button></p></div></section><section class="catalog-toolbar"><div class="searchbox">${f(`search`)}<input id="search" value="${m(d.query)}" placeholder="Search communities, topics, people..." aria-label="Search communities"></div><div class="filter-row">${t.map(e=>`<button class="chip ${d.category===e?`selected`:``}" data-category="${e}">${e}</button>`).join(``)}<div class="filter-dropdown-container" id="filterDropdownContainer"><button class="chip filter-dropdown-btn" data-action="toggle-filter-menu" style="border-color:${r?`rgb(61, 91, 169)`:`inherit`}; font-weight:${r?`700`:`normal`}">Filter <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:4px;"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></button><div class="filter-menu-popup ${d.filterMenu?`active`:``}" id="filterPopup"><div class="filter-grid"><div class="filter-column"><div class="filter-header">Price</div><label class="filter-radio-label"><input type="radio" name="priceFilter" value="All" class="custom-radio" ${d.price===`All`?`checked`:``} data-filter-type="price"><span>All</span></label><label class="filter-radio-label"><input type="radio" name="priceFilter" value="Free" class="custom-radio" ${d.price===`Free`?`checked`:``} data-filter-type="price"><span>Free</span></label><label class="filter-radio-label"><input type="radio" name="priceFilter" value="Paid" class="custom-radio" ${d.price===`Paid`?`checked`:``} data-filter-type="price"><span>Paid</span></label></div><div class="filter-column"><div class="filter-header">Type</div><label class="filter-radio-label"><input type="radio" name="accessFilter" value="All" class="custom-radio" ${d.access===`All`?`checked`:``} data-filter-type="access"><span>All</span></label><label class="filter-radio-label"><input type="radio" name="accessFilter" value="Private" class="custom-radio" ${d.access===`Private`?`checked`:``} data-filter-type="access"><span>Private</span></label><label class="filter-radio-label"><input type="radio" name="accessFilter" value="Public" class="custom-radio" ${d.access===`Public`?`checked`:``} data-filter-type="access"><span>Public</span></label></div><div class="filter-column"><div class="filter-header">Sort</div><label class="filter-radio-label"><input type="radio" name="sortFilter" value="Trending" class="custom-radio" ${d.sort===`Trending`?`checked`:``} data-filter-type="sort"><span>Trending</span></label><label class="filter-radio-label"><input type="radio" name="sortFilter" value="Top" class="custom-radio" ${d.sort===`Top`?`checked`:``} data-filter-type="sort"><span>Top</span></label></div></div><div class="filter-footer"><span style="color:#858990; margin-right:6px;">Language</span> English<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;"><polyline points="6 9 12 15 18 9"></polyline></svg></div></div></div></div></section>${n}<section class="catalog-heading"><div><p class="kicker">Curated for you</p><h2>Communities worth your time <span>${e.length}</span></h2></div><p class="catalog-note">Updated weekly · <b>12,480</b> active members</p></section><div class="community-grid">${e.length?e.map(_).join(``):`<div class="empty"><strong>No communities found.</strong><p>Try a broader search or reset your filters.</p><button class="outline-button" data-action="reset">Reset filters</button></div>`}</div></main>`}function y(){let e=r.slice(0,5).map(e=>{let t=`New`;if(e.priceType===`Paid`&&e.members){let n=parseFloat(e.members)*(e.members.includes(`k`)?1e3:1),r=parseFloat(e.price.replace(/[^0-9.]/g,``))||9;t=`Earns $${Math.round(n*r).toLocaleString()}/month`}return{id:e.id,title:e.title,badgeText:e.title,earnings:t,image:e.cover}}),t=d.createSlideIndex||0;return`
    <main class="create-community-page">
      <section class="create-community-hero">
        <div class="create-community-container">
          <div class="create-community-logo">
            <span class="logo-text"><span>skill</span>space</span>
          </div>
          <h1 class="create-community-title">Build a community around your passion</h1>
          <h2 class="create-community-subtitle">Get discovered by 30 million users</h2>
          <p class="create-community-stats">Join 200k communities earning $1 billion per year</p>

          <div class="community-carousel-wrapper">
            <div class="community-carousel-deck">
              ${e.map((n,r)=>{let i=`next-slide`;return r===t?i=`active-slide`:r===(t-1+e.length)%e.length&&(i=`prev-slide`),`
                  <div class="carousel-card-item ${i}" data-slide-index="${r}">
                    <img src="${n.image}" alt="${m(n.title)}" class="carousel-card-img">
                    <div class="carousel-card-badge">
                      <div class="badge-title">${m(n.badgeText)}</div>
                      <div class="badge-sub">${m(n.earnings)}</div>
                    </div>
                  </div>
                `}).join(``)}
            </div>

            <div class="carousel-controls">
              <button class="carousel-nav-btn prev-btn" data-action="prev-create-slide" aria-label="Previous slide">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>

              <div class="carousel-dots">
                ${e.map((e,n)=>`
                  <button class="carousel-dot ${n===t?`active`:``}" data-action="select-create-slide" data-slide="${n}" aria-label="Go to slide ${n+1}"></button>
                `).join(``)}
              </div>

              <button class="carousel-nav-btn next-btn" data-action="next-create-slide" aria-label="Next slide">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>

          <div class="create-community-action-box">
            <button class="create-community-primary-btn" data-action="start-community-flow">CREATE YOUR COMMUNITY</button>
          </div>
        </div>
      </section>
    </main>
  `}function b(){let e=document.querySelector(`.community-grid`);if(!e)return;let t=h();e.innerHTML=t.length?t.map(_).join(``):`<div class="empty"><strong>No communities found.</strong><p>Try a broader search or reset your filters.</p><button class="outline-button" data-action="reset">Reset filters</button></div>`,e.querySelectorAll(`[data-action]`).forEach(e=>e.addEventListener(`click`,()=>V(e.dataset.action)))}function x(){let e=r.find(e=>e.id===d.selected)||r[0],t=(d.joinedCommunities||[]).includes(e.id),n=[e.cover,`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80`,`https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80`,`https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80`,`https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80`],i=n[d.selectedMediaIndex]||n[0],a={globe:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"></path></svg>`,users:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,tag:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>`,user:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`};return`
    <main class="skool-about-page">
      <div class="skool-about-layout">
        <!-- Left Main Content Column -->
        <div class="skool-about-main">
          <!-- Community Header Block -->
          <div class="about-title-block">
            <h1 class="about-community-heading">${m(e.title)}</h1>
            <div class="about-star-rating-row">
              <span class="star-gold">★ ★ ★ ★ ★</span>
              <span class="rating-val">${e.rating||`5.0`}</span>
              <span class="review-count-text">· ${e.reviewCount||93} reviews</span>
            </div>
          </div>

          <!-- Video / Media Screen Container -->
          <div class="media-screen-box">
            <img src="${i}" class="media-screen-img" alt="${m(e.title)} presentation">
            <div class="media-play-overlay">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span class="media-timestamp-badge">4:52</span>
          </div>

          <!-- Media Thumbnails Selector Row -->
          <div class="media-thumbs-row">
            ${n.map((e,t)=>`
              <button class="media-thumb-item ${d.selectedMediaIndex===t?`active`:``}" data-action="select-media-thumb" data-index="${t}">
                ${t===0?`<div class="thumb-play-icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>`:``}
                <img src="${e}" alt="Thumbnail ${t+1}">
              </button>
            `).join(``)}
          </div>

          <!-- Professional Meta Bar (No emojis) -->
          <div class="about-meta-bar">
            <div class="meta-item">
              ${a.globe}
              <span>${m(e.accessType)}</span>
            </div>
            <div class="meta-item">
              ${a.users}
              <span>${m(e.members)} members</span>
            </div>
            <div class="meta-item">
              ${a.tag}
              <span>${m(e.price)}</span>
            </div>
            <div class="meta-item">
              ${a.user}
              <span>By ${m(e.creatorName||`Creator`)}</span>
            </div>
          </div>

          <!-- Detailed Exaggerated Paragraphs -->
          <div class="about-copy-section">
            ${(e.aboutParagraphs||[]).map(e=>`
              <p class="about-paragraph">${m(e)}</p>
            `).join(``)}

            ${e.highlights?`
              <ul class="about-check-list">
                ${e.highlights.map(e=>`
                  <li>
                    <svg class="check-svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>${m(e)}</span>
                  </li>
                `).join(``)}
              </ul>
            `:``}
          </div>

          <!-- Reviews Section -->
          <div class="about-reviews-container">
            <div class="reviews-title-row">
              <span class="star-gold-lg">★</span>
              <h2>${e.rating||`5.0`} · ${e.reviewCount||93} reviews</h2>
            </div>

            <div class="reviews-cards-list">
              ${(e.reviews||[]).map(e=>`
                <div class="review-item-card">
                  <div class="review-item-header">
                    <div class="review-user-avatar">${e.author.slice(0,1).toUpperCase()}</div>
                    <div class="review-user-meta">
                      <div class="review-user-name">${m(e.author)} <span class="star-gold-sm">★ ★ ★ ★ ★</span></div>
                      <div class="review-user-sub">${m(e.time)} · <span class="member-status-tag">${m(e.status)}</span></div>
                    </div>
                  </div>
                  <p class="review-body-text">${m(e.text)}</p>
                </div>
              `).join(``)}
            </div>

            <button class="see-more-link" data-action="see-more-reviews">See more</button>
          </div>

          <div class="about-footer-legal">
            <a href="#" onclick="return false;">Privacy and terms</a>
          </div>
        </div>

        <!-- Sticky Right Sidebar Card -->
        <aside class="skool-about-sidebar">
          <div class="sticky-sidebar-card">
            <div class="sidebar-cover-header">
              <img src="${e.cover}" alt="${m(e.title)} cover">
            </div>

            <div class="sidebar-card-content">
              <h2 class="sidebar-comm-title">${m(e.title)}</h2>
              <div class="sidebar-comm-url">skillspace.in/${e.slug||`community`}</div>
              <p class="sidebar-comm-desc">${m(e.description)}</p>

              <div class="sidebar-stats-row">
                <div class="stat-col">
                  <strong>${e.members}</strong>
                  <span>Members</span>
                </div>
                <div class="stat-col">
                  <strong>${e.onlineCount||`324`}</strong>
                  <span>Online</span>
                </div>
                <div class="stat-col">
                  <strong>${e.adminsCount||`12`}</strong>
                  <span>Admins</span>
                </div>
              </div>

              <!-- Avatar Stack -->
              <div class="sidebar-avatar-stack">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/men/45.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/women/24.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/men/22.jpg" class="stack-avatar" alt="">
                <img src="https://randomuser.me/api/portraits/women/12.jpg" class="stack-avatar" alt="">
              </div>

              <!-- Prominent Join Group Button -->
              <button class="skool-join-button ${t?`joined`:``}" data-action="${t?`leave`:`join`}">
                ${t?`✓ JOINED`:`JOIN GROUP`}
              </button>

              <div class="sidebar-powered-by">
                Powered by <strong>skillspace</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  `}function S(e=`All communities`){let t=new Date(`2026-09-03T12:00:00Z`),n=[],r=0,i=0;for(let t=0;t<e.length;t++)i=(i*31+e.charCodeAt(t))%10007;for(let a=363;a>=0;a--){let o=new Date(t);o.setDate(o.getDate()-a);let s=o.toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,year:`numeric`}),c=o.getDay(),l=Math.sin(a*.18+i)*10+Math.cos(a*.42+i)*5,u=0;l>5.5&&c!==0&&c!==6?u=Math.floor((l-4.5)*.75)+1:l>11&&(u=1),e!==`All communities`&&a%2==0&&(u=Math.max(0,Math.floor(u*.6))),r+=u;let d=0;u>=5?d=4:u>=3?d=3:u>=2?d=2:u>=1&&(d=1),n.push({dateStr:s,count:u,level:d})}return{days:n,totalContributions:r}}function C(){let e=u.user||{name:`Prajwal Ramagiri`,email:`ramagiri.prajwal@gmail.com`,username:`prajwal-ramagiri-6593`,bio:`- nil -`,joinDate:`2026-08-15`,pfp:null},t=d.selectedContributionGroup||`All communities`,{days:n,totalContributions:r}=S(t),i=`@${(e.username||e.name||`user`).toLowerCase().replace(/\s+/g,`-`)}`,a=e.joinDate?new Date(e.joinDate).toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,year:`numeric`}):`Aug 15, 2026`,o=p(e);return`
    <main class="profile-page-container">
      <div class="profile-layout">
        <!-- Left Column: Activity & Memberships -->
        <div class="profile-main-column">
          <!-- Activity Heatmap Section -->
          <div class="profile-section-card">
            <h2 class="profile-section-title">Activity</h2>
            <div class="heatmap-container" style="position:relative;">
              <div class="heatmap-header">
                <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
                <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
              </div>
              <div class="heatmap-grid-wrapper">
                <div class="heatmap-day-labels">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                  <span>Sun</span>
                </div>
                <div class="heatmap-squares-grid" id="heatmapGrid">
                  ${n.map(e=>`<div class="heatmap-square level-${e.level}" data-date="${e.dateStr}" data-count="${e.count}"></div>`).join(``)}
                </div>
              </div>
              <div class="heatmap-footer">
                <span class="text-secondary" style="font-size: 13px; cursor:pointer;" title="Contributions made across joined communities over the past year">What is this?</span>
                <div class="heatmap-legend">
                  <span>Less</span>
                  <span class="legend-sq level-0"></span>
                  <span class="legend-sq level-1"></span>
                  <span class="legend-sq level-2"></span>
                  <span class="legend-sq level-3"></span>
                  <span class="legend-sq level-4"></span>
                  <span>More</span>
                </div>
              </div>
              <div class="heatmap-cell-tooltip" id="heatmapTooltip"></div>
            </div>
          </div>

          <!-- Memberships Section -->
          <div class="profile-section-card">
            <h2 class="profile-section-title">Memberships</h2>
            <div class="empty-state-box">
              <p class="text-secondary" style="margin:0; font-size:14px;">No memberships yet. Join a community to get started!</p>
            </div>
          </div>

          <!-- Contributions Section -->
          <div class="profile-section-card">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h2 class="profile-section-title" style="margin-bottom: 0;">Contributions</h2>
              <div style="display: flex; gap: 8px; align-items: center;">
                <select class="profile-select-dropdown" id="profileContributionSelect">
                  <option value="All communities" ${t===`All communities`?`selected`:``}>All communities</option>
                  <option value="AI Video Bootcamp" ${t===`AI Video Bootcamp`?`selected`:``}>AI Video Bootcamp</option>
                  <option value="CapCut Creator Bootcamp" ${t===`CapCut Creator Bootcamp`?`selected`:``}>CapCut Creator Bootcamp</option>
                  <option value="AI Automation Agency Bootcamp" ${t===`AI Automation Agency Bootcamp`?`selected`:``}>AI Automation Agency Bootcamp</option>
                  <option value="The Creators Hub" ${t===`The Creators Hub`?`selected`:``}>The Creators Hub</option>
                </select>
                <button class="profile-icon-filter" aria-label="Filter contributions">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: User Bio Card -->
        <div class="profile-sidebar-column">
          <div class="user-bio-card">
            <div class="bio-avatar-container">
              ${e.pfp?`<img src="${e.pfp}" alt="Avatar" class="bio-avatar-img">`:`<div class="user-avatar-initial large">${o}</div>`}
            </div>
            <h2 class="bio-user-name">${m(e.name||`Prajwal Ramagiri`)}</h2>
            <div class="bio-user-handle">${i}</div>
            <div class="bio-user-text">${m(e.bio||`- nil -`)}</div>

            <div class="bio-status-row">
              <span class="online-indicator-dot"></span>
              <span>Online now</span>
            </div>

            <div class="bio-joined-row">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>Joined ${a}</span>
            </div>

            <div class="bio-stats-grid">
              <div class="bio-stat-item">
                <div class="stat-num" id="userContributionStat">${r}</div>
                <div class="stat-lbl">Contributions</div>
              </div>
              <div class="bio-stat-item">
                <div class="stat-num">0</div>
                <div class="stat-lbl">Followers</div>
              </div>
              <div class="bio-stat-item">
                <div class="stat-num">0</div>
                <div class="stat-lbl">Following</div>
              </div>
            </div>

            <button class="edit-profile-btn" data-action="settings">EDIT PROFILE</button>
          </div>

          <div class="powered-by-tag">
            Powered by <strong>SkillSpace</strong>
          </div>
        </div>
      </div>
    </main>
  `}function w(){let e=u.user||{name:`Prajwal Ramagiri`,email:`ramagiri.prajwal@gmail.com`,bio:`- nil -`},t=(e.name||`Prajwal Ramagiri`).split(` `),n=t[0]||`Prajwal`,r=t.slice(1).join(` `)||`Ramagiri`,i=e.username||`${n.toLowerCase()}-${r.toLowerCase()}-6593`,a=e.email||`ramagiri.prajwal@gmail.com`,o=p(e),s=(d.settingsTab||`profile`).toLowerCase();switch(s){case`profile`:return`
        <h2 class="settings-panel-title">Profile</h2>
        <div class="settings-avatar-row">
          ${e.pfp?`<img src="${e.pfp}" alt="Avatar" class="settings-avatar-img">`:`<div class="user-avatar-initial medium">${o}</div>`}
          <button type="button" class="settings-blue-link" data-action="change-photo">Change profile photo</button>
        </div>

        <form id="profileSettingsForm">
          <div class="settings-form-row-2">
            <div class="skool-field-container">
              <label class="skool-floating-label">First Name</label>
              <input type="text" class="skool-input" id="setFirstName" value="${m(n)}" required>
            </div>
            <div class="skool-field-container">
              <label class="skool-floating-label">Last Name</label>
              <input type="text" class="skool-input" id="setLastName" value="${m(r)}" required>
            </div>
          </div>
          <div class="settings-field-hint">You can only change your name once, and you must use your real name. <button type="button" class="settings-blue-link">Change name</button></div>

          <div class="skool-field-container" style="margin-top: 16px;">
            <label class="skool-floating-label">URL</label>
            <input type="text" class="skool-input" id="setUrl" value="skillspace.com/@${m(i)}">
          </div>
          <div class="settings-field-hint">You can change your URL once you've got 90 contributions, 30 followers, and been using it for 90 days.</div>

          <div class="skool-field-container" style="margin-top: 16px;">
            <label class="skool-floating-label">Bio</label>
            <textarea class="skool-textarea" id="setBio" rows="3" maxlength="150">${m(e.bio||`- nil -`)}</textarea>
            <div class="textarea-char-count" id="bioCharCount">${(e.bio||`- nil -`).length} / 150</div>
          </div>

          <div class="skool-field-container">
            <label class="skool-floating-label">Location</label>
            <input type="text" class="skool-input" id="setLocation" placeholder="Location" value="${m(e.location||``)}">
          </div>

          <div class="settings-location-links">
            <span class="settings-blue-icon-link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> Change my map location</span>
            <span class="settings-muted-link">Remove my map location</span>
          </div>

          <div class="skool-field-container">
            <label class="skool-floating-label">Myers Briggs</label>
            <select class="skool-select">
              <option>Don't show</option>
              <option>INTJ</option><option>INTP</option><option>ENTJ</option><option>ENTP</option>
              <option>INFJ</option><option>INFP</option><option>ENFJ</option><option>ENFP</option>
            </select>
          </div>

          <div class="settings-accordion-item">
            <span>Social links</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          <div class="settings-accordion-item">
            <span>Membership visibility</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          <div class="settings-accordion-item">
            <span>Advanced</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          <button type="submit" class="settings-submit-gold-btn">UPDATE PROFILE</button>
        </form>
      `;case`communities`:return`
        <h2 class="settings-panel-title">Communities</h2>
        <p class="text-secondary" style="font-size: 14px; margin-bottom: 20px;">Drag and drop to reorder, pin to sidebar, or hide.</p>
        <div class="empty-state-box">
          <p class="text-secondary" style="margin:0;">No communities joined yet.</p>
        </div>
      `;case`affiliates`:return`
        <h2 class="settings-panel-title">Affiliates</h2>
        <p class="text-secondary" style="font-size: 14px; margin-bottom: 24px;">Earn commission for life when you invite somebody to create or join a SkillSpace community.</p>

        <div class="affiliates-stats-grid">
          <div class="affiliate-stat-card">
            <div class="affiliate-stat-val">$0</div>
            <div class="affiliate-stat-lbl">Last 30 days</div>
          </div>
          <div class="affiliate-stat-card">
            <div class="affiliate-stat-val">$0</div>
            <div class="affiliate-stat-lbl">Lifetime</div>
          </div>
          <div class="affiliate-stat-card">
            <div class="affiliate-stat-val" style="color:rgb(61, 91, 169);">$0</div>
            <div class="affiliate-stat-lbl">Account balance</div>
          </div>
          <button class="affiliate-payout-btn" disabled>PAYOUT</button>
        </div>
        <div style="text-align:right; font-size:12px; color:var(--text-muted-sub); margin-bottom:24px;">$0 available soon</div>

        <div class="settings-subhead">Your affiliate links</div>
        <div style="margin-bottom: 12px;">
          <span class="affiliate-pill">SkillSpace platform</span>
        </div>
        <p class="text-secondary" style="font-size: 13px; margin-bottom: 12px;">Earn <strong>40% commission</strong> when you invite somebody to create a SkillSpace community.</p>

        <div class="affiliate-link-row">
          <input type="text" class="skool-input" id="affiliateLinkInput" value="https://www.skillspace.com/signup?ref=4766f260f33d403ba7679753e291b7ab" readonly>
          <button class="affiliate-copy-btn" data-action="copy-affiliate-link">COPY</button>
        </div>

        <div class="empty-state-box" style="margin-top: 24px; padding: 48px 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="26" fill="rgb(61, 91, 169)" stroke="#1E293B" stroke-width="4"/>
            <circle cx="30" cy="30" r="21" fill="rgb(48, 73, 140)" stroke="#1E293B" stroke-width="2.5"/>
            <text x="30" y="38" font-family="'Inter', -apple-system, sans-serif" font-size="26" font-weight="900" fill="#FFFFFF" text-anchor="middle">$</text>
          </svg>
          <p class="text-secondary" style="margin: 0; font-size: 14px;">Your referrals will show here</p>
        </div>
      `;case`payouts`:return`
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <h2 class="settings-panel-title">Payouts</h2>
          <button class="profile-icon-filter" aria-label="Payout settings"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button>
        </div>
        <p class="text-secondary" style="font-size: 14px; margin-bottom: 24px;">Payouts for community and affiliate earnings.</p>
        <p class="text-secondary" style="font-size: 14px;">No payouts yet</p>
      `;case`account`:return`
        <h2 class="settings-panel-title">Account</h2>

        <div class="account-setting-row">
          <div>
            <div class="account-setting-label">Email</div>
            <div class="account-setting-val">${m(a)}</div>
          </div>
          <button class="account-action-btn" data-action="change-email">CHANGE EMAIL</button>
        </div>

        <div class="account-setting-row">
          <div>
            <div class="account-setting-label">Password</div>
            <div class="account-setting-val text-muted">Change your password</div>
          </div>
          <button class="account-action-btn" data-action="change-password">CHANGE PASSWORD</button>
        </div>

        <div class="skool-field-container" style="margin-top: 24px;">
          <label class="skool-floating-label">Language</label>
          <select class="skool-select">
            <option>US English</option>
            <option>UK English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>

        <div class="skool-field-container">
          <label class="skool-floating-label">Timezone</label>
          <select class="skool-select">
            <option>(GMT +05:30) Asia/Calcutta</option>
            <option>(GMT +00:00) UTC</option>
            <option>(GMT -05:00) Eastern Time</option>
          </select>
        </div>

        <div class="account-setting-row" style="border-bottom: none; margin-top: 24px;">
          <div>
            <div class="account-setting-label">Log out of all devices</div>
            <div class="account-setting-val text-muted">Log out of all active sessions on all devices.</div>
          </div>
          <button class="account-action-btn" data-action="logout-everywhere">LOG OUT EVERYWHERE</button>
        </div>
      `;case`notifications`:return`
        <h2 class="settings-panel-title">Notifications</h2>

        <div class="setting-toggle-row">
          <span class="toggle-row-label">New follower</span>
          <label class="skool-toggle-switch">
            <input type="checkbox" checked>
            <span class="skool-toggle-slider"></span>
          </label>
        </div>

        <div class="setting-toggle-row">
          <span class="toggle-row-label">Likes</span>
          <label class="skool-toggle-switch">
            <input type="checkbox" checked>
            <span class="skool-toggle-slider"></span>
          </label>
        </div>

        <div class="setting-toggle-row">
          <span class="toggle-row-label">Ka-ching</span>
          <label class="skool-toggle-switch">
            <input type="checkbox" checked>
            <span class="skool-toggle-slider"></span>
          </label>
        </div>

        <div class="setting-toggle-row" style="border-bottom: none;">
          <span class="toggle-row-label">Affiliate referral</span>
          <label class="skool-toggle-switch">
            <input type="checkbox" checked>
            <span class="skool-toggle-slider"></span>
          </label>
        </div>
      `;case`chat`:return`
        <div class="setting-toggle-header-row">
          <div>
            <h2 class="settings-panel-title" style="margin-bottom: 4px;">Notifications</h2>
            <p class="text-secondary" style="font-size: 13px;">Notify me with sound and blinking tab header when somebody messages me.</p>
          </div>
          <label class="skool-toggle-switch">
            <input type="checkbox" checked>
            <span class="skool-toggle-slider"></span>
          </label>
        </div>

        <div class="setting-toggle-header-row" style="margin-top: 24px;">
          <div>
            <h2 class="settings-panel-title" style="margin-bottom: 4px;">Email notifications</h2>
            <p class="text-secondary" style="font-size: 13px;">If you're offline and somebody messages you, we'll let you know via email. We won't email you if you're online.</p>
          </div>
          <label class="skool-toggle-switch">
            <input type="checkbox" checked>
            <span class="skool-toggle-slider"></span>
          </label>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-sub);">
          <h2 class="settings-panel-title" style="margin-bottom: 6px;">Who can message me?</h2>
          <p class="text-secondary" style="font-size: 13px;">Only members in the group you're in can message you. You choose what group users can message you from by turning your chat on/off below.</p>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-sub);">
          <h2 class="settings-panel-title" style="margin-bottom: 6px;">Blocked users</h2>
          <p class="text-secondary" style="font-size: 14px;">You have no blocked users.</p>
        </div>
      `;case`payment-methods`:return`
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h2 class="settings-panel-title" style="margin-bottom: 0;">Payment methods</h2>
          <button class="settings-submit-gold-btn" style="margin-top: 0;" data-action="add-payment-method">ADD PAYMENT METHOD</button>
        </div>
        <p class="text-secondary" style="font-size: 14px;">No cards on file</p>
      `;case`payment-history`:return`
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <h2 class="settings-panel-title">Payment history</h2>
          <button class="profile-icon-filter" aria-label="Filter payments"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button>
        </div>
        <p class="text-secondary" style="font-size: 14px;">You have no payments.</p>
      `;case`theme`:return`
        <h2 class="settings-panel-title">Theme</h2>
        <div class="skool-field-container" style="margin-bottom: 24px;">
          <label class="skool-floating-label">Theme</label>
          <select class="skool-select" id="themeSelector">
            <option value="light" ${d.themeMode===`light`?`selected`:``}>Light (default)</option>
            <option value="dark" ${d.themeMode===`dark`?`selected`:``}>Dark</option>
          </select>
        </div>
        <button type="button" class="settings-submit-gold-btn" data-action="save-theme">SAVE</button>
      `;default:return`
        <h2 class="settings-panel-title">${s.charAt(0).toUpperCase()+s.slice(1)}</h2>
        <p class="text-secondary">Settings for ${s} configured here.</p>
      `}}function T(){let e=[{id:`communities`,name:`Communities`},{id:`profile`,name:`Profile`},{id:`affiliates`,name:`Affiliates`},{id:`payouts`,name:`Payouts`},{id:`account`,name:`Account`},{id:`notifications`,name:`Notifications`},{id:`chat`,name:`Chat`},{id:`payment-methods`,name:`Payment methods`},{id:`payment-history`,name:`Payment history`},{id:`theme`,name:`Theme`}],t=(d.settingsTab||`profile`).toLowerCase();return`
    <main class="settings-page-container">
      <div class="settings-layout">
        <div class="settings-sidebar">
          ${e.map(e=>`
            <button class="settings-nav-item ${t===e.id?`active`:``}" data-settings="${e.id}">
              ${e.name}
            </button>
          `).join(``)}
        </div>
        <div class="settings-content-panel">
          ${w()}
        </div>
      </div>
    </main>
  `}function E(){let e=d.planBilling===`yearly`;return`
    <main class="select-plan-page">
      <div class="select-plan-container">
        <h1 class="plan-page-title">Select your plan</h1>
        
        <div class="plan-toggle-wrapper">
          <div class="plan-toggle-container">
            <button class="plan-toggle-btn ${e?``:`active`}" data-action="toggle-plan-billing" data-billing="monthly">Monthly</button>
            <div class="plan-toggle-yearly-box">
              <span class="plan-free-badge">2 months free!</span>
              <button class="plan-toggle-btn ${e?`active`:``}" data-action="toggle-plan-billing" data-billing="yearly">Yearly</button>
            </div>
          </div>
        </div>

        <div class="plan-cards-grid">
          <!-- Hobby Card -->
          <div class="plan-card">
            <div class="plan-card-header">
              <h2 class="plan-card-name">Hobby</h2> <div class="plan-card-price">${e?`$7.50`:`$9`}<span class="plan-price-period">/month</span></div>
            </div>

            <ul class="plan-features-list">
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> members</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> courses</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> videos</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> live calls</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon muted">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>10%</strong> transaction fee</span>
              </li>
              <li class="plan-feature-item disabled">
                <span class="plan-cross-icon">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </span>
                <span>Custom URL</span>
              </li>
              <li class="plan-feature-item disabled">
                <span class="plan-cross-icon">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </span>
                <span>Affiliates</span>
              </li>
            </ul>

            <button class="plan-cta-button" data-action="select-plan" data-plan="Hobby">TRY FOR FREE</button>
          </div>

          <!-- Pro Card -->
          <div class="plan-card pro">
            <div class="plan-card-header">
              <h2 class="plan-card-name">Pro</h2> <div class="plan-card-price">${e?`$82`:`$99`}<span class="plan-price-period">/month</span></div>
            </div>

            <ul class="plan-features-list">
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> members</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> courses</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> videos</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>Unlimited</strong> live calls</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span><strong>2.9%</strong> transaction fee</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span>Custom URL</span>
              </li>
              <li class="plan-feature-item">
                <span class="plan-check-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span>Affiliates</span>
              </li>
            </ul>

            <button class="plan-cta-button" data-action="select-plan" data-plan="Pro">TRY FOR FREE</button>
          </div>
        </div>
      </div>
    </main>
  `}function D(){let e=d.selectedPlan||`Hobby`,t=d.planBilling===`yearly`,n=e===`Pro`?t?`$82`:`$99`:t?`$7.50`:`$9`,r=new Date(Date.now()+12096e5).toLocaleDateString(`en-US`,{month:`short`,day:`numeric`});return`
    <section class="plan-modal-card" role="dialog" aria-modal="true" aria-labelledby="plan-modal-title" onclick="event.stopPropagation()">
      <button class="modal-close" data-action="close-modal" aria-label="Close">&times;</button>
      <div class="plan-modal-logo" aria-label="SkillSpace"><span>skill</span>space</div>
      <h2 id="plan-modal-title">Create your community</h2>
      <p class="plan-modal-subtitle">14-day free trial of ${m(e)} ${n}/month <button type="button" class="plan-change-link" data-action="change-plan">(change)</button></p>
      <form id="planCheckoutForm" class="plan-checkout-form">
        <div class="plan-field-group">
          <label for="communityName">Group name</label>
          <input id="communityName" name="communityName" maxlength="30" placeholder="Group name" required autofocus>
          <div class="plan-field-hint"><em>You can change this later</em><span id="communityNameCount">0 / 30</span></div>
        </div>
        <div class="plan-card-input" aria-label="Payment card details">
          <span class="plan-card-icon">▣</span>
          <input name="cardNumber" data-card-step="cardNumber" inputmode="numeric" maxlength="16" placeholder="Card number" aria-label="Card number" required>
          <input name="expiryMonth" data-card-step="expiryMonth" inputmode="numeric" maxlength="2" placeholder="MM" aria-label="Expiration month" required>
          <span class="plan-card-expiry-separator" aria-hidden="true">/</span>
          <input name="expiryYear" data-card-step="expiryYear" inputmode="numeric" maxlength="2" placeholder="YY" aria-label="Expiration year" required>
          <input name="cvc" data-card-step="cvc" inputmode="numeric" maxlength="3" placeholder="CVC" aria-label="CVC" required>
        </div>
        <button type="submit" class="plan-trial-button" disabled>START FREE TRIAL</button>
      </form>
      <p class="plan-modal-note">Your 1st charge will be on ${r} for ${n}. We'll email you 3-days before to remind you. Cancel anytime with 1-click.</p>
    </section>
  `}function O(){if(d.modal===`plan`)return D();let e=d.authMode;if(e===`sent`)return`<section class="login-modal-card" role="dialog" aria-modal="true" onclick="event.stopPropagation()"><button class="modal-close" data-action="close-modal">&times;</button><h2 class="login-modal-title">Please check your email</h2><p class="auth-copy" style="color:#d4d4d4; text-align:center;">We sent you an email, which contains a link to reset your SkillSpace password.</p><button class="SkillSpace-btn-primary" data-auth="login">BACK TO LOGIN</button></section>`;let t=e===`register`,n=e===`forgot`,r=`<p class="auth-message ${d.authMessage?d.authMessage.type:`empty`}" aria-live="polite" style="margin-bottom:12px; text-align:center;">${d.authMessage?m(d.authMessage.text):``}</p>`;return t?`
      <div class="login-modal-card" role="dialog" aria-modal="true" onclick="event.stopPropagation()">
        <button class="modal-close" data-action="close-modal">&times;</button>
        <h2 class="login-modal-title">Create your SkillSpace account</h2>
        ${r}
        <form id="authForm">
          <div class="settings-form-row-2">
            <div class="skool-field-container">
              <label class="skool-floating-label">First Name</label>
              <input type="text" name="firstName" class="skool-input" required placeholder="">
            </div>
            <div class="skool-field-container">
              <label class="skool-floating-label">Last Name</label>
              <input type="text" name="lastName" class="skool-input" required placeholder="">
            </div>
          </div>
          <div class="skool-field-container">
            <label class="skool-floating-label">Email</label>
            <input type="email" name="email" class="skool-input" required placeholder="">
          </div>
          <div class="skool-field-container">
            <label class="skool-floating-label">Password</label>
            <input type="password" name="password" class="skool-input" minlength="8" required placeholder="">
          </div>
          <div class="skool-field-container">
            <label class="skool-floating-label">Confirm Password</label>
            <input type="password" name="confirmPassword" class="skool-input" minlength="8" required placeholder="">
          </div>
          <p class="terms" style="color:#858990; font-size:12px; margin-bottom:16px;">By signing up, you accept our <u style="color:#aaa">terms</u> and <u style="color:#aaa">privacy policy</u>.</p>
          <button type="submit" class="SkillSpace-btn-primary">SIGN UP</button>
          <div class="login-modal-footer">
            Already have an account? <button type="button" class="SkillSpace-link" data-auth="login">Log in</button>
          </div>
        </form>
      </div>
    `:n?`
      <div class="login-modal-card" role="dialog" aria-modal="true" onclick="event.stopPropagation()">
        <button class="modal-close" data-action="close-modal">&times;</button>
        <h2 class="login-modal-title">Forgot Password</h2>
        ${r}
        <p class="auth-copy" style="color:#d4d4d4; text-align:center; margin-bottom:18px;">Enter your email and we'll send you a link to reset your password.</p>
        <form id="forgotForm">
          <div class="skool-field-container">
            <label class="skool-floating-label">Email</label>
            <input name="email" type="email" class="skool-input" required placeholder="">
          </div>
          <button type="submit" class="SkillSpace-btn-primary" style="margin-top:12px;">EMAIL ME</button>
          <div class="login-modal-footer">
            <button type="button" class="SkillSpace-link" data-auth="login">Back to login</button>
          </div>
        </form>
      </div>
    `:`
    <div class="login-modal-card" role="dialog" aria-modal="true" onclick="event.stopPropagation()">
      <button class="modal-close" data-action="close-modal">&times;</button>
      <h2 class="login-modal-title">Log in to Skill Space</h2>
      ${r}
      <form id="authForm">
        <div class="skool-field-container">
          <label class="skool-floating-label">Email</label>
          <input type="email" name="email" id="modalEmail" class="skool-input" required placeholder="">
        </div>
        <div class="skool-field-container">
          <label class="skool-floating-label">Password</label>
          <input type="password" name="password" id="modalPassword" class="skool-input" required placeholder="">
        </div>
        <div class="login-sublinks-row">
          <button type="button" class="SkillSpace-link" data-auth="forgot">Forgot password?</button>
          <button type="button" class="SkillSpace-link" data-auth="login">Log in with a code</button>
        </div>
        <button type="submit" class="SkillSpace-btn-primary">LOG IN</button>
        <div class="login-modal-footer">
          Don't have an account? <button type="button" class="SkillSpace-link" data-auth="register">Sign up for free</button>
        </div>
      </form>
    </div>
  `}function k(){return d.modal?`<div class="modal-backdrop">${O()}</div>`:``}function A(){let e=document.querySelector(`#app`);if(!e)return;let t=document.querySelector(`.modal-backdrop`);if(t){if(t.classList.contains(`is-closing`))t.remove();else{t.innerHTML=O(),j();return}}e.insertAdjacentHTML(`beforeend`,k()),j()}function j(){let e=document.querySelector(`.modal-backdrop`);if(!e)return;e.querySelectorAll(`[data-auth]`).forEach(t=>{t.onclick=n=>{n.stopPropagation(),d.authMode=t.dataset.auth,d.authMessage=``,e.innerHTML=O(),j()}}),e.querySelectorAll(`[data-action="close-modal"]`).forEach(e=>{e.onclick=e=>{e.stopPropagation(),P()}}),e.querySelectorAll(`[data-action="toggle-plan-billing"]`).forEach(t=>{t.onclick=n=>{n.stopPropagation(),d.planBilling=t.dataset.billing||`monthly`,e.innerHTML=O(),j()}}),e.querySelectorAll(`[data-action="select-plan"]`).forEach(e=>{e.onclick=t=>{t.stopPropagation();let n=e.dataset.plan||`Pro`;P(),N(`Selected ${n} plan! Setting up your community...`)}}),e.querySelectorAll(`[data-action="change-plan"]`).forEach(e=>{e.onclick=e=>{e.stopPropagation(),P(),d.view=`select-plan`,M()}}),e.onclick=t=>{t.target===e&&P()};let t=document.querySelector(`#forgotForm`);t&&(t.onsubmit=t=>{t.preventDefault(),d.authMode=`sent`,e.innerHTML=O(),j()});let n=document.querySelector(`#authForm`);n&&(n.onsubmit=async t=>{t.preventDefault(),d.authMessage=``;let n=Object.fromEntries(new FormData(t.target)),r=n.email.trim().toLowerCase();if(!r||!n.password||d.authMode===`register`&&(!n.firstName?.trim()||!n.lastName?.trim()||!n.confirmPassword))return R(`All fields are required.`);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r))return R(`Please enter a valid email address.`);if(n.password.length<8)return R(`Password must be at least 8 characters.`);if(d.authMode===`register`&&n.password!==n.confirmPassword)return R(`Passwords do not match.`);let i=await I(n.password);if(d.authMode===`register`){if(L(r,i)||u.findUser(r))return R(`An account with this email already exists.`);let t={id:crypto.randomUUID(),name:`${n.firstName.trim()} ${n.lastName.trim()}`,email:r,passwordHash:i,bio:`Curious, learning in public.`};u.saveUser(t),d.authMode=`login`,d.authMessage={text:`Account created successfully. Log in to continue.`,type:`success`},e.innerHTML=O(),j();return}let a=L(r,i)||u.findUser(r);if(!a||a.passwordHash!==i)return R(`Invalid email or password.`);if(u.saveSession(a),F(),d.selectedPlan){d.modal=`plan`,d.authMessage=``;let e=document.querySelector(`.modal-backdrop`);e.innerHTML=O(),j()}else P(),N(`Welcome back`)});let r=document.querySelector(`#planCheckoutForm`);if(r){let e=r.querySelector(`[name="communityName"]`),t=r.querySelector(`.plan-trial-button`),n=r.querySelector(`[name="cardNumber"]`),i=r.querySelector(`[name="expiryMonth"]`),a=r.querySelector(`[name="expiryYear"]`),o=r.querySelector(`[name="cvc"]`),s=()=>{let r=Number(i.value),s=e.value.trim().length>0&&/^\d{1,16}$/.test(n.value)&&/^\d{1,2}$/.test(i.value)&&/^\d{2}$/.test(a.value)&&/^\d{3}$/.test(o.value)&&r>=1&&r<=12;t.disabled=!s};e?.addEventListener(`input`,e=>{let t=document.querySelector(`#communityNameCount`);t&&(t.textContent=`${e.target.value.length} / 30`),s()});let c=[...r.querySelectorAll(`[data-card-step]`)];c.forEach((e,t)=>{e.addEventListener(`input`,e=>{e.target.value=e.target.value.replace(/\D/g,``).slice(0,Number(e.target.maxLength)),e.target.value.length===Number(e.target.maxLength)&&c[t+1]?.focus(),s()}),e.addEventListener(`keydown`,e=>{e.key===`Backspace`&&!e.target.value&&t>0&&c[t-1].focus()})}),s(),r.onsubmit=e=>{e.preventDefault();let t=new FormData(r).get(`communityName`).trim();P(),d.selectedPlan=null,N(`Your ${t} community is being set up.`)}}}function M(){let e=document.querySelector(`#app`),t=d.view===`discover`?v():d.view===`create-community`?y():d.view===`select-plan`?E():d.view===`detail`?x():d.view===`profile`?C():T();e.innerHTML=`${g()}${t}<div class="toast" id="toast"></div>`,document.body.classList.toggle(`theme-dark`,d.themeMode===`dark`),document.body.classList.toggle(`page-pure-white`,d.view===`create-community`||d.view===`select-plan`),B()}function N(e){let t=document.querySelector(`#toast`);t.textContent=e,t.classList.add(`show`),setTimeout(()=>t.classList.remove(`show`),2400)}function P(){let e=document.querySelector(`.modal-backdrop`);if(!e){d.modal=null;return}if(e.classList.contains(`is-closing`))return;e.classList.add(`is-closing`);let t=!1,n=()=>{t||(t=!0,e.parentNode&&e.remove(),d.modal=null)};e.addEventListener(`animationend`,n,{once:!0}),setTimeout(n,240)}function F(){let e=document.querySelector(`.topbar-wrapper`);e&&(e.outerHTML=g(),document.querySelectorAll(`.topbar-wrapper [data-action]`).forEach(e=>e.addEventListener(`click`,()=>V(e.dataset.action,e))))}async function I(e){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest(`SHA-256`,t);return Array.from(new Uint8Array(n),e=>e.toString(16).padStart(2,`0`)).join(``)}function L(e,t){return[...u.users,...n].find(n=>n.email.toLowerCase()===e.toLowerCase()&&n.passwordHash===t)}function R(e,t=`error`){d.authMessage={text:e,type:t};let n=document.querySelector(`.auth-message`);if(n)n.textContent=e,n.className=`auth-message ${t}`;else{let e=document.querySelector(`.modal-backdrop`);e&&(e.innerHTML=O(),j())}}function z(){let e=u.session;(!e?.token||!u.user||!e.expiresAt||Date.now()>=e.expiresAt)&&u.clearSession()}function B(){document.querySelectorAll(`[data-auth]:not(.modal-backdrop [data-auth])`).forEach(e=>e.addEventListener(`click`,()=>{d.authMode=e.dataset.auth,d.modal=`auth`,A()})),document.querySelectorAll(`[data-action]`).forEach(e=>e.addEventListener(`click`,t=>{t.stopPropagation(),V(e.dataset.action,e)})),document.querySelectorAll(`[data-category]`).forEach(e=>e.addEventListener(`click`,()=>{d.category=e.dataset.category,M()})),document.querySelector(`#search`)?.addEventListener(`input`,e=>{d.query=e.target.value}),document.querySelector(`#search`)?.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),d.submittedQuery=d.query.trim(),M())}),document.querySelector(`#topSearch`)?.addEventListener(`submit`,e=>{e.preventDefault(),d.submittedQuery=d.query.trim(),M()}),document.querySelector(`#topSearchInput`)?.addEventListener(`input`,e=>{d.query=e.target.value}),document.querySelectorAll(`.filter-menu-popup input[type="radio"]`).forEach(e=>{e.addEventListener(`change`,e=>{let t=e.target.dataset.filterType,n=e.target.value;t===`price`?d.price=n:t===`access`?d.access=n:t===`sort`&&(d.sort=n),b()})});let e=document.querySelector(`.community-carousel-deck`);e&&e.querySelectorAll(`.carousel-card-item`).forEach(e=>{e.addEventListener(`click`,()=>{d.createSlideIndex=Number(e.dataset.slideIndex||0),M()})}),document.querySelector(`[data-community]`)?.parentElement.addEventListener(`click`,e=>{let t=e.target.closest(`[data-community]`);t&&!e.target.closest(`button`)&&(d.selected=Number(t.dataset.community),d.view=`detail`,M())}),document.querySelector(`#postForm`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=new FormData(e.target).get(`text`);u.addPost({communityId:d.selected,name:u.user.name,role:`Member`,text:t,time:`now`}),M(),N(`Post published`)}),document.querySelector(`#profileSettingsForm`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=document.querySelector(`#setFirstName`).value.trim(),n=document.querySelector(`#setLastName`).value.trim(),r=document.querySelector(`#setBio`).value.trim(),i=document.querySelector(`#setLocation`)?.value.trim()||``;u.user={...u.user||{},name:`${t} ${n}`.trim(),bio:r,location:i},M(),N(`Profile updated successfully!`)}),document.querySelector(`#setBio`)?.addEventListener(`input`,e=>{let t=document.querySelector(`#bioCharCount`);t&&(t.textContent=`${e.target.value.length} / 150`)}),document.querySelectorAll(`[data-settings]`).forEach(e=>e.addEventListener(`click`,()=>{d.settingsTab=e.dataset.settings,M()}));let t=document.querySelector(`#heatmapGrid`),n=document.querySelector(`#heatmapTooltip`);t&&n&&(t.addEventListener(`mouseover`,e=>{let r=e.target.closest(`.heatmap-square`);if(r){let e=r.dataset.count,i=r.dataset.date,a=e===`0`?`No contributions on ${i}`:`${e} contribution${e===`1`?``:`s`} on ${i}`;n.textContent=a,n.classList.add(`active`);let o=t.closest(`.heatmap-container`).getBoundingClientRect(),s=r.getBoundingClientRect(),c=s.left-o.left+s.width/2,l=s.top-o.top;n.style.left=`${c}px`,n.style.top=`${l}px`}}),t.addEventListener(`mouseleave`,()=>{n.classList.remove(`active`)})),document.querySelector(`#profileContributionSelect`)?.addEventListener(`change`,e=>{d.selectedContributionGroup=e.target.value;let{days:t,totalContributions:n}=S(e.target.value),r=document.querySelector(`#heatmapGrid`);r&&(r.innerHTML=t.map(e=>`<div class="heatmap-square level-${e.level}" data-date="${e.dateStr}" data-count="${e.count}"></div>`).join(``));let i=document.querySelector(`#userContributionStat`);i&&(i.textContent=n)})}document.addEventListener(`click`,e=>{let t=document.querySelector(`#userProfileMenu`),n=document.querySelector(`#profileControlContainer`);t&&n&&!n.contains(e.target)&&(t.classList.remove(`active`),d.profileMenu=!1);let r=document.querySelector(`#brandDropdownMenu`),i=document.querySelector(`#brandContainer`);r&&i&&!i.contains(e.target)&&(r.classList.remove(`active`),d.brandMenu=!1);let a=document.querySelector(`#filterPopup`),o=document.querySelector(`#filterDropdownContainer`);a&&o&&!o.contains(e.target)&&(a.classList.remove(`active`),d.filterMenu=!1)});function V(e,t){if(e===`discover`||e===`reset`){d.view=`discover`,d.profileMenu=!1,d.brandMenu=!1,d.filterMenu=!1;let t=document.querySelector(`#brandDropdownMenu`);t&&t.classList.remove(`active`),e===`reset`&&(d.query=``,d.submittedQuery=``,d.category=`Trending`,d.price=`All`,d.access=`All`),M()}else if(e===`toggle-brand-menu`){let e=document.querySelector(`#brandDropdownMenu`);e&&(d.brandMenu=!d.brandMenu,e.classList.toggle(`active`,d.brandMenu))}else if(e===`clear-search`)d.query=``,d.submittedQuery=``,M();else if(e===`create`){d.profileMenu=!1,d.brandMenu=!1,d.filterMenu=!1;let e=document.querySelector(`#brandDropdownMenu`);e&&e.classList.remove(`active`),d.view=`create-community`,M()}else if(e===`start-community-flow`)d.view=`select-plan`,M();else if(e===`toggle-plan-billing`)d.planBilling=t?.dataset.billing||`monthly`,M();else if(e===`select-plan`)d.selectedPlan=t?.dataset.plan||`Pro`,d.modal=u.user?`plan`:`auth`,u.user||(d.authMode=`login`),A();else if(e===`login`||e===`register`)d.authMode=e,d.modal=`auth`,A();else if(e===`close-modal`)P();else if(e===`profile`){if(!u.user)d.authMode=`login`,d.modal=`auth`,A();else{let e=document.querySelector(`#userProfileMenu`);e&&(d.profileMenu=!d.profileMenu,e.classList.toggle(`active`,d.profileMenu))}}else if(e===`toggle-filter-menu`){let e=document.querySelector(`#filterPopup`);e&&(d.filterMenu=!d.filterMenu,e.classList.toggle(`active`,d.filterMenu))}else if(e===`profile-page`){let e=document.querySelector(`#userProfileMenu`);e&&e.classList.remove(`active`),d.profileMenu=!1,d.view=`profile`,M()}else if(e===`settings`||e===`affiliates`){let t=document.querySelector(`#userProfileMenu`);t&&t.classList.remove(`active`),d.profileMenu=!1,d.view=`settings`,e===`affiliates`&&(d.settingsTab=`affiliates`),M()}else if(e===`logout`){u.clearSession();let e=document.querySelector(`#userProfileMenu`);e&&e.classList.remove(`active`),d.profileMenu=!1,d.view=`discover`,M()}else if(e===`join`){if(!u.user)d.authMode=`login`,d.modal=`auth`,A();else{let e=r.find(e=>e.id===d.selected)||r[0];e&&!d.joinedCommunities.includes(e.id)&&(d.joinedCommunities.push(e.id),N(`Joined ${e.title}!`),M())}}else if(e===`leave`){let e=r.find(e=>e.id===d.selected)||r[0];e&&(d.joinedCommunities=d.joinedCommunities.filter(t=>t!==e.id),N(`Left ${e.title}`),M())}else if(e===`notifications`)N(`${i.length} new notifications`);else if(e===`chats`)N(`${a.length} conversations waiting`);else if(e===`language`||e===`help`){let t=document.querySelector(`#userProfileMenu`);t&&t.classList.remove(`active`),d.profileMenu=!1,N(e===`language`?`Language preferences`:`Help center`),M()}else if(e===`copy-affiliate-link`){let e=document.querySelector(`#affiliateLinkInput`);e&&(navigator.clipboard?.writeText(e.value).catch(()=>{}),N(`Affiliate link copied to clipboard!`))}else if(e===`save-theme`){let e=document.querySelector(`#themeSelector`);e&&(d.themeMode=e.value,M(),N(`Theme switched to ${d.themeMode} mode!`))}else e===`prev-create-slide`?(d.createSlideIndex=((d.createSlideIndex||0)-1+5)%5,M()):e===`next-create-slide`?(d.createSlideIndex=((d.createSlideIndex||0)+1)%5,M()):e===`select-create-slide`?(d.createSlideIndex=Number(t?.dataset.slide||0),M()):e===`select-media-thumb`?(document.querySelector(`[data-action="select-media-thumb"][data-index="${t?.dataset.index}"]`),d.selectedMediaIndex=Number(t?.dataset.index||0),M()):e===`select-subnav-tab`?(d.communityTab=t?.dataset.tab||`About`,M()):e===`select-community`?(d.selected=Number(t?.dataset.id||1),d.view=`detail`,d.selectedMediaIndex=0,d.communityTab=`About`,d.brandMenu=!1,M()):e===`see-more-reviews`?N(`All reviews loaded`):(e===`change-photo`||e===`change-email`||e===`change-password`||e===`logout-everywhere`||e===`add-payment-method`)&&N({"change-photo":`Photo uploader ready`,"change-email":`Email update modal ready`,"change-password":`Password update modal ready`,"logout-everywhere":`Logged out from all other devices`,"add-payment-method":`Payment modal ready`}[e]||`Action triggered`)}z(),M();