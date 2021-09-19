import { execSync } from 'child_process';
import FS from 'fs';

const Child = (command: string) => execSync(command, { stdio: 'inherit' });

const Pkg = JSON.parse(FS.readFileSync('package.json').toString());

function fileReplace(fileName: string, placeholder: string, value: string) {
    const originalFile = FS.readFileSync(fileName).toString();
    FS.writeFileSync(fileName, originalFile.replace(placeholder, value));
}

// Copy local package files
Child('npm run clean');
Child('npm run compile');
Child('npm run compile:module');

// Embed package version into CJS and ES modules
fileReplace('dist/cjs/Constants.js', '__VERSE_VERSION__', Pkg.version);
fileReplace('dist/es/Constants.js', '__VERSE_VERSION__', Pkg.version);

if (!FS.existsSync('dist')) {
    FS.mkdirSync('dist');
}
if (!FS.existsSync('dist/npm')) {
    FS.mkdirSync('dist/npm');
}

Child('npm run compile:rollup');
Child('cp -r dist/cjs/* dist/npm/');
Child('cp dist/es/index.module.js dist/npm/module.js');
Child(`cp ${__dirname}/../*.md dist/npm`);
Child('npm run compile:webpack');

// Create package.json file
FS.writeFileSync(
    'dist/npm/package.json',
    JSON.stringify(
        {
            ...Pkg,
            browser: './module.js',
            devDependencies: undefined,
            main: './index.js',
            module: './module.js',
            private: false,
            'react-native': './index.js',
            scripts: undefined,
            sideEffects: false,
            typings: './index'
        },
        null,
        2
    )
);