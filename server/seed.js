require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/Item');
const User = require('./models/User');

const dummyItems = [
  {
    type: 'lost',
    title: 'Blue Hydroflask',
    description: 'Lost my blue 32oz hydroflask in the library on the 2nd floor near the study pods. It has a few stickers on it.',
    category: 'Water Bottle',
    location: 'Main Library, 2nd Floor',
    date: new Date('2023-10-24T14:30:00Z'),
    image: '/items/blue_hydroflask.jpg',
    status: 'open',
  },
  {
    type: 'found',
    title: 'Apple AirPods Pro',
    description: 'Found a pair of AirPods Pro in case on a bench outside the student union building.',
    category: 'Electronics',
    location: 'Student Union, North Entrance',
    date: new Date('2023-10-25T09:15:00Z'),
    image: '/items/airpods_pro.jpg',
    status: 'open',
  },
  {
    type: 'lost',
    title: 'Calculus Textbook',
    description: 'Left my Stewart Calculus textbook in room 304 of the Math building. It has some notes tucked in the front cover.',
    category: 'Books',
    location: 'Math Building, Room 304',
    date: new Date('2023-10-22T16:00:00Z'),
    image: '/items/calculus_textbook.jpg',
    status: 'open',
  },
  {
    type: 'found',
    title: 'Dorm Keys on Lanyard',
    description: 'Found a set of 3 keys attached to a red university lanyard near the dining hall entrance.',
    category: 'Other',
    location: 'Dining Hall',
    date: new Date('2023-10-26T12:00:00Z'),
    image: '/items/dorm_keys.jpg',
    status: 'open',
  },
  {
    type: 'lost',
    title: 'Black North Face Jacket',
    description: 'Lost my medium black North Face jacket during the football game. Might have left it in section 104.',
    category: 'Clothing',
    location: 'Football Stadium, Section 104',
    date: new Date('2023-10-21T20:30:00Z'),
    image: '/items/north_face_jacket.jpg',
    status: 'open',
  },
  {
    type: 'found',
    title: 'TI-84 Plus Calculator',
    description: 'Found a black TI-84 Plus graphing calculator left on a desk in the physics lab.',
    category: 'Electronics',
    location: 'Physics Lab, Room 101',
    date: new Date('2023-10-26T15:45:00Z'),
    image: '/items/ti84_calculator.jpg',
    status: 'resolved',
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing data to prevent duplicates if run multiple times
    await Item.deleteMany({});
    await User.deleteMany({});

    // Create a dummy user to be the reporter
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@university.edu',
      password: 'hashed_password_placeholder', // Usually hashed, but fine for seed
      role: 'student'
    });

    // Add reporter to items
    const itemsToInsert = dummyItems.map(item => ({
      ...item,
      reporter: demoUser._id
    }));

    await Item.insertMany(itemsToInsert);
    console.log('✅ Database seeded with dummy items!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
