# Mindfights Electron

Tool for creating and and casting mindfights

## Getting started

```$ git clone https://github.com/Gerach/mindfights-angular.git```

### Prerequisites

In order to export this project on linux machine you will need following packages installed on your machine:

```
nodejs
npm
electron-packager
```

Windows OS specific prerequisites:
```
electron-installer-windows
winehq
nuget
mono
```

Linux specific prerequisites:
```
electron-installer-debian
```

MacOS specific prerequisites:
```
electron-installer-dmg
```

## Build for Electron development

Run `npm run electron-build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Build for Angular development

Run `npm run start` to build the project. Project for debugging will be available at `http://localhost:4200`

## Export for production

Run `npm run package-mac` to export this project for MacOS.
Run `npm run package-linux` to export this project for Linux based OS (x64 only).  
Run `npm run package-windows` to export this project for Windows 7, 8, 10 (x64 only).

All exported files will be stored in `release-builds` directory.

## Package installers for release

Run `npm run create-mac-installer` to package installer for MacOS.
Run `npm run create-linux-installer` to package installer for Linux based OS.
Run `npm run create-windows-installer` to package installer for Windows 7, 8, 10.

All exported files will be stored in `release-builds/installers` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Built With

* [Electron](https://electronjs.org/) - Software Framework
* [Angular CLI](https://github.com/angular/angular-cli) - MVVM Framework
* [Bootstrap 4](https://getbootstrap.com/) - Front-end style
* [Slate theme](https://bootswatch.com/slate/) - Bootstrap custom theme
* [ngxCarousel](https://www.npmjs.com/package/ngx-carousel-lib/) - Carousel module for Angular2

## Authors

* **Gerardas Martynovas** - *Initial work* - [Gerach](https://github.com/Gerach)
