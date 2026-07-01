# Interactive Cloud & DevOps Web Portfolio

[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue.svg)](https://yukihara64.github.io/devops-interactive-portfolio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview
This is the source code for my personal web portfolio, designed to showcase my engineering projects in cloud infrastructure, CI/CD automation, and game development. Built with standard HTML5, CSS3, and JavaScript without front-end framework dependencies, it features responsive dark-mode styling and interactive widgets.

## Key Features

| Feature | Description |
| :--- | :--- |
| **Terminal CLI Simulator** | An interactive command-line widget where visitors can type bash commands like `help`, `skills`, `projects`, `gamedev`, or `contact` to explore my background. |
| **Cluster Telemetry Widget** | Simulated metrics widget displaying container CPU usage, pod health, and active deployment status. |
| **Responsive Dark Mode UI** | Designed with clean typography, CSS grid layouts, and HSL color palettes optimized for desktop and mobile screens. |

## Repository Structure
```text
├── index.html        # Main HTML layout and structural components
├── index.css         # Custom CSS styling, dark mode tokens, and animations
└── app.js            # Terminal CLI logic and dynamic DOM interactive elements
```

## Local Development
To test or run the website locally:

```bash
# Clone the repository
git clone https://github.com/Yukihara64/devops-interactive-portfolio.git

# Navigate into the project folder
cd devops-interactive-portfolio

# Start a local Python HTTP server
python -m http.server 8080
```
