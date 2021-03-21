# OculusScroll - Chrome Extension 

![build](https://github.com/prokolyvakis/OculusScroll/workflows/build/badge.svg)

> _**oculus**_ (Latin) / _**eye**_ (English)

A Chrome extension that allows **webpage scrolling** based on **eye tracking**. It is a [React](https://reactjs.org/)-based project written in [TypeScript](https://www.typescriptlang.org/). It makes use of the [WebGazer.js](https://webgazer.cs.brown.edu/) eye tracking library.

## Build the repository

* Prerequisites:
  * [node + npm](https://nodejs.org/)
  * It is recommended to use [nvm](https://github.com/nvm-sh/nvm).
* If you want to build the repository from source follow the instructions listed below:

    ```
    git clone https://github.com/prokolyvakis/OculusScroll.git
    cd OculusScroll 
    # Install the dependencies:
    npm install
    # Build the project:
    npm run build
    # If you want to build the project in `watch mode`
    # then please run instead: npm run watch
    ```
* To run the tests, please run: `npx jest` or `npm run test`.

## Load extension to Chrome

1. Follow the steps mentioned in the above section to build the project.
2. Open Chrome and visit: `chrome://extensions`
3. Enable **Developer mode** by ticking the checkbox in the upper-right corner.
4. Click on the **Load unpacked extension** button.
5. Select the `dist` directory created after building in the **OculusScroll** folder.

## License
The project is licensed under GNU General Public License v3.0. For more information, please refer to the [license](LICENSE).
