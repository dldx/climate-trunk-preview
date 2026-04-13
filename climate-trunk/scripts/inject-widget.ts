import fs from 'node:fs';
import path from 'node:path';

const widgetPath = path.join(process.cwd(), 'dist-widget/climate-trunk-widget.iife.js');
const targetPath = path.join(process.cwd(), 'src/lib/data/widgetCode.ts');

if (fs.existsSync(widgetPath)) {
    const content = fs.readFileSync(widgetPath, 'utf8');
    const tsContent = `export const widgetCode = ${JSON.stringify(content)};`;
    fs.writeFileSync(targetPath, tsContent);
    console.log('Widget code injected successfully.');
} else {
    console.error('Widget build not found at:', widgetPath);
    process.exit(1);
}
