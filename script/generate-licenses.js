#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Recursively find all dependencies in node_modules
function getAllDeps(dir = 'node_modules', deps = new Set()) {
  if (!fs.existsSync(dir)) return deps

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Handle scoped packages (@actions/core)
      if (entry.name.startsWith('@')) {
        const scopedDir = path.join(dir, entry.name)
        const scopedPackages = fs.readdirSync(scopedDir, {
          withFileTypes: true
        })
        for (const pkg of scopedPackages) {
          if (pkg.isDirectory()) {
            const depName = `${entry.name}/${pkg.name}`
            deps.add(depName)
          }
        }
      } else if (entry.name !== '.bin') {
        deps.add(entry.name)
      }
    }
  }

  return deps
}

const deps = Array.from(getAllDeps()).sort()
let licensesContent = ''

// For each dependency, extract license information
for (const dep of deps) {
  try {
    const depPath = path.join('node_modules', dep)
    const depPackageJson = JSON.parse(
      fs.readFileSync(path.join(depPath, 'package.json'), 'utf8')
    )

    licensesContent += `${dep}\n`
    licensesContent += `${depPackageJson.license || 'UNKNOWN'}\n`

    // Try to read LICENSE file
    const licenseFiles = ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'LICENCE']
    let licenseFound = false

    for (const licenseFile of licenseFiles) {
      const licensePath = path.join(depPath, licenseFile)
      if (fs.existsSync(licensePath)) {
        const licenseText = fs.readFileSync(licensePath, 'utf8')
        licensesContent += `${licenseText}\n\n`
        licenseFound = true
        break
      }
    }

    if (!licenseFound) {
      licensesContent += `License file not found for ${dep}\n\n`
    }
  } catch (error) {
    console.warn(`Warning: Could not process ${dep}: ${error.message}`)
  }
}

// Write licenses to dist/licenses.txt
const distPath = path.join('dist', 'licenses.txt')
fs.writeFileSync(distPath, licensesContent)
console.log(`Licenses written to ${distPath}`)
