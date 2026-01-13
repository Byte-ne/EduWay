const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Replace localhost URLs with environment variable
        content = content.replace(/http:\/\/localhost:5000/g, '${__API_URL__}');
        // Also replace the old variable name
        content = content.replace(/__API_BASE_URL__/g, '__API_URL__');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

function processDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (item.endsWith('.jsx')) {
            replaceInFile(fullPath);
        }
    }
}

console.log('Starting URL replacement...');
processDirectory('./client/src');
console.log('URL replacement completed!');
