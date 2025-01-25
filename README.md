# Diagnosis Report Generator

## 👀 Overview

This is a electron app that generates a diagnosis report for a patient.
The app is built using React and Electron.

## 🛫 Quick Setup

```sh
# clone the project
git clone https://github.com/ThomasKiljanczykDev/DiagnosisReportGenerator

# enter the project directory
cd electron-vite-react

# install dependency
yarn install

# develop
yarn dev
```

## 📂 Directory structure

Familiar React application structure, just with `electron` folder on the top
_Files in this folder will be separated from your React application and built into `dist-electron`_

```tree
├── electron                                 Electron-related code
│   ├── main                                 Main-process source code
│   └── preload                              Preload-scripts source code
│
├── release                                  Generated after production build, contains executables
│   └── {version}
│       ├── {os}-{os_arch}                   Contains unpacked application executable
│       └── {app_name}_{version}.{ext}       Installer for the application
│
├── public                                   Static assets
└── src                                      Renderer source code, your React application
```
