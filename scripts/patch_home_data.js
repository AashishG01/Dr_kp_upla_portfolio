import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Profile from '../backend/models/Profile.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

const patchData = async () => {
    await connectDB();

    const highlights = [
        "CVPR 2020 Best Paper Award",
        "ERCIM Fellowship @ NTNU",
        "Recent Journal Publication (2024)"
    ];

    const workingOn = [
        "Real-world Super-Resolution using GANs",
        "Low-resolution Face Recognition",
        "Thermal–Visible Image Fusion"
    ];

    const themes = [
        {
            "id": "cv-ip",
            "title": "Computer Vision & Image Processing",
            "description": "Exploration of advanced techniques in computer vision and image processing, focusing on object detection, recognition, and restoration.",
            "applications": ["Object Detection", "Face Recognition", "Image Restoration", "Surveillance"]
        },
        {
            "id": "sr-gan",
            "title": "Super-Resolution & GANs",
            "description": "Developing robust Generative Adversarial Networks (GANs) for single-image and thermal image super-resolution, addressing real-world degradation.",
            "applications": ["CCTV Surveillance", "Thermal Imaging", "Face Hallucination"]
        },
        {
            "id": "fusion",
            "title": "Information & Image Fusion",
            "description": "Research on multi-resolution image fusion, pan-sharpening, and multi-sensor fusion (thermal-visible, biomedical) to combine complementary information.",
            "applications": ["Remote Sensing", "Medical Diagnostics", "Night Vision"]
        },
        {
            "id": "medical",
            "title": "Biomedical & Hyperspectral Imaging",
            "description": "Processing and analysis of biomedical images for disease diagnosis and hyperspectral images for material classification.",
            "applications": ["Malaria Detection", "Endoscopy (Capsule Imaging)", "Material Classification"]
        },
        {
            "id": "security",
            "title": "Data Security & Watermarking",
            "description": "Investigation into digital watermarking, reversible watermarking, and data security techniques for copyright protection and authentication.",
            "applications": ["Copyright Protection", "Data Authentication"]
        },
        {
            "id": "math-reg",
            "title": "Mathematics & Regularization",
            "description": "Application of regularization frameworks for solving ill-posed inverse problems in imaging, ensuring stable and accurate reconstructions.",
            "applications": ["Inverse Problems", "Image Reconstruction"]
        }
    ];

    try {
        const profile = await Profile.findOne();
        if (profile) {
            profile.highlights = highlights;
            profile.workingOn = workingOn;
            profile.themes = themes;
            await profile.save();
            console.log("Profile updated with Home Page data!");
        } else {
            console.log("No profile found to patch.");
        }
    } catch (err) {
        console.error(err);
    }
    process.exit();
};

patchData();
