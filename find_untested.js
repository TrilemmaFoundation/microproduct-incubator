import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('__tests__') && !file.includes('node_modules')) {
                results = results.concat(walk(file));
            }
        } else {
            if ((file.endsWith('.ts') || file.endsWith('.tsx')) && !file.endsWith('.d.ts') && !file.includes('test.setup') && !file.includes('setup.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const srcFiles = walk('./src');
const untestedFiles = [];

for (const file of srcFiles) {
    const dir = path.dirname(file);
    const ext = path.extname(file);
    const base = path.basename(file, ext);

    // check for __tests__/base.test.ext
    const testFile1 = path.join(dir, '__tests__', `${base}.test${ext}`);
    const testFile2 = path.join(dir, '__tests__', `${base}.spec${ext}`);

    if (!fs.existsSync(testFile1) && !fs.existsSync(testFile2)) {
        untestedFiles.push(file);
    }
}

console.log('Files missing tests:');
untestedFiles.forEach(f => console.log(f));
