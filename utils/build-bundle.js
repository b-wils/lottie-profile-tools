const fs = require('node:fs');
const {makeSchema} =  require('./bundle-schema')

const SCHEMA_OUTPUT_PATH = "build/lottie-profile-validator.json";

async function main() {

    const bundledSchema = await makeSchema();
    
    try {
        fs.mkdirSync('build');
    } catch (err) {
        // Directory probably exists already
    }

    try {
        fs.writeFileSync(SCHEMA_OUTPUT_PATH, JSON.stringify(bundledSchema), {flag: 'w'});
    } catch (err) {
        console.error(err);
    }
}

main();