import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Profile from '../backend/models/Profile.js';
import Publication from '../backend/models/Publication.js';
import Student from '../backend/models/Student.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();

        // Read JSON files
        const profileData = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../src/data/profile.json'), 'utf-8')
        );
        const publicationsData = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../src/data/publications.json'), 'utf-8')
        );
        const studentsData = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../src/data/students.json'), 'utf-8')
        );

        // Clear existing data
        await Profile.deleteMany({});
        await Publication.deleteMany({});
        await Student.deleteMany({});
        console.log('Data Cleared...');

        // Insert Profile
        await Profile.create(profileData);
        console.log('Profile Imported!');

        // Insert Publications
        await Publication.insertMany(publicationsData);
        console.log('Publications Imported!');

        // Insert Students
        // Transform student object { phd: [], mtech: [] } into array of objects with category
        const allStudents = [];
        for (const [category, students] of Object.entries(studentsData)) {
            if (Array.isArray(students)) {
                students.forEach(s => {
                    allStudents.push({ ...s, category });
                });
            }
        }
        await Student.insertMany(allStudents);
        console.log('Students Imported!');

        console.log('Data Import Success!');
        process.exit();
    } catch (error) {
        console.error('Error with data import:', error);
        process.exit(1);
    }
};

importData();
