import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Models
import Project from '../backend/models/Project.js';
import Profile from '../backend/models/Profile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to JSON data
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const researchPath = path.join(__dirname, '../src/data/research.json');

const migrate = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        // 1. Migrate Projects
        const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));
        // Remove 'id' as MongoDB uses '_id'
        const cleanedProjects = projectsData.map(({ id, ...rest }) => rest);

        await Project.deleteMany({}); // Clear existing to avoid duplicates if re-run
        await Project.insertMany(cleanedProjects);
        console.log(`✅ Migrated ${cleanedProjects.length} projects.`);

        // 2. Migrate Research Themes (into Profile)
        const researchData = JSON.parse(fs.readFileSync(researchPath, 'utf-8'));

        // Find the profile (assuming single profile)
        const profile = await Profile.findOne();
        if (profile) {
            profile.themes = researchData;
            await profile.save();
            console.log(`✅ Migrated ${researchData.length} research themes into Profile.`);
        } else {
            console.warn('⚠️ No Profile found! Create a profile first.');
        }

        console.log('Migration Complete');
        process.exit(0);

    } catch (error) {
        console.error('Migration Error:', error);
        process.exit(1);
    }
};

migrate();
