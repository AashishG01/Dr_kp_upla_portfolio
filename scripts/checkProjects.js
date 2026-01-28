import 'dotenv/config';
import mongoose from 'mongoose';
import Project from '../backend/models/Project.js';

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const count = await Project.countDocuments();
        console.log(`Total Projects in DB: ${count}`);

        if (count > 0) {
            const projects = await Project.find();
            console.log('Projects:', JSON.stringify(projects, null, 2));
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

check();
