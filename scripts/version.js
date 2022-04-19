const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const getPackageFiles = (dir) => {
  const files = [];

  fs.readdirSync(dir).forEach(innerDir => {
    const absolutePath = path.resolve(dir, innerDir);
    const stat = fs.statSync(absolutePath);

    if (stat.isDirectory() && !absolutePath.endsWith('node_modules')) {
      files.push(...getPackageFiles(absolutePath));
    }

    if (stat.isFile() && absolutePath.endsWith('package.json')) {
      files.push(absolutePath);
    }
  })

  return files;
}

const checkPackageFiles = (files) => {
  const versions = []

  files.forEach(file => {
    const data = require(file);
    const version = data.version;

    const [major, minor, patch] = version.split('.').map(Number);
    if (typeof major !== 'number' || typeof minor !== 'number' || typeof patch !== 'number') {
      throw new Error(`File ${file} has invalid version: ${version}`);
    } else {
      versions.push(version);
    }
  })

  if (new Set(versions).size !== 1) {
    throw new Error('Versions are not equal');
  }

  return versions[0];
}

const updateVersion = (version, type) => {
  const [major, minor, patch] = version.split('.').map(Number);

  if (type === 'major') {
    return `${major + 1}.0.0`;
  } else if (type === 'minor') {
    return `${major}.${minor + 1}.0`;
  } else if (type === 'patch') {
    return `${major}.${minor}.${patch + 1}`;
  } else {
    throw new Error(`Invalid type: ${type}`);
  }
}

const updatePackageFiles = (files, version) => {
  files.forEach(file => {
    const data = require(file);
    data.version = version;
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  })
}

const commitAndTag = (version) => {
  childProcess.execSync(`git add .`);
  childProcess.execSync(`git commit -m "v${version}"`);
  childProcess.execSync(`git tag v${version}`);
}

const bumpVersion = () => {
  try {
    const [/* bin */, /* file */, type] = process.argv;
    const files = getPackageFiles(process.cwd());

    const currentVersion = checkPackageFiles(files);
    const newVersion = updateVersion(currentVersion, type);

    updatePackageFiles(files, newVersion);
    commitAndTag(newVersion);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

bumpVersion()
