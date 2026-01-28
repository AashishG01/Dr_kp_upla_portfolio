import React from 'react';
import SectionIntro from '../components/Sections/Home/SectionIntro';
import SectionEducation from '../components/Sections/Home/SectionEducation';
import SectionExperience from '../components/Sections/Home/SectionExperience';
import SectionInternationalExposure from '../components/Sections/Home/SectionInternationalExposure';
import SectionWorkingOn from '../components/Sections/Home/SectionWorkingOn';
import SectionHighlights from '../components/Sections/Home/SectionHighlights';
import SectionThemes from '../components/Sections/Home/SectionThemes';
import SectionStudents from '../components/Sections/Home/SectionStudents';

const Home = () => {
    return (
        <>
            <SectionIntro />
            <SectionExperience />
            <SectionInternationalExposure />
            <SectionEducation />
            <SectionWorkingOn />
            <SectionHighlights />
            <SectionThemes />
            <SectionStudents />
        </>
    );
};

export default Home;
