const test = async () => {
    // Test Root
    try {
        console.log('Fetching Root http://localhost:5000/ ...');
        const resRoot = await fetch('http://localhost:5000/');
        console.log('Root Status:', resRoot.status);
        const textRoot = await resRoot.text();
        console.log('Root Body:', textRoot.substring(0, 100)); // First 100 chars
    } catch (e) {
        console.error('Root Fetch Error:', e.code || e.message);
    }

    // Test Projects
    try {
        console.log('\nFetching Projects http://localhost:5000/api/projects ...');
        const resProj = await fetch('http://localhost:5000/api/projects');
        console.log('Projects Status:', resProj.status);
        const textProj = await resProj.text();
        console.log('Projects Body:', textProj.substring(0, 100));
    } catch (e) {
        console.error('Projects Fetch Error:', e.code || e.message);
    }
};

test();
