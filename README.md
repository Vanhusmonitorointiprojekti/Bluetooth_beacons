<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Known issues](#Known-issues)
* [License](#License)

<!-- ABOUT THE PROJECT -->
## About The Project

Bluetooth beacons

This project is directed towards helping people that are suffering from memory disorders. One of the ways this project accomplishes that is by tracking the patients, granting them some freedom from nursing staff. Patients are tracked via bluetooth wristlet that they wear and it is tracked by Rasperry Pies installed inside the nursing facility. System is programmed to allow them freedom of movement inside the areas they are permitted to access and then send alarms if they leave the designated areas.

![alt text](https://github.com/Marski96/Bluetooth_beacons/blob/development/img/ADBC_areas.PNG)

### Built With
* [MySQL](https://www.mysql.com/)
* [Socket.io](https://socket.io/)
* [React](https://reactjs.org/)
* [Node.js](https://nodejs.org/en/)
* [MQTT](http://mqtt.org/)


<!-- GETTING STARTED -->
## Getting Started

Make sure that you have node.js installed. You can install it from here: https://nodejs.org/en/

### Prerequisites

1. Download the application .zip https://github.com/Marski96/Bluetooth_beacons/releases
2. Unzip the file to destination you like
3. With Powershell, navigate to unzipped application folder `pushd ..\Bluetooth_beacons`

### Installation

1. Using Powershell install all required libraries `npm install`
2. Make sure that all libraries are installed by navigating to detect folder using Powershell and running application's backend.
```sh
pushd ..\Bluetooth_beacons\src\detection
```
```sh
node detect.js
```
3. If program starts with infotext "Socket.io is running on port 4001"... your installation is succesful.
4. If there is problem with some libary for example mysql, install the required libary: `npm install mysql`
5. Start front-end by opening another instance of Powershell and navigating to application folder:
```sh
pushd ..\Bluetooth_beacons
```

& run start:

```sh
npm start
```
6. Both backend and frontend should be running, in order to application to work.



<!-- Known issues -->
## Known issues

See the [open issues](https://github.com/Marski96/Bluetooth_beacons/issues) for a list of proposed features (and known issues).

<!-- License -->
## License
Licensed under MIT -license.
https://opensource.org/licenses/MIT


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=flat-square
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=flat-square
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=flat-square
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=flat-square
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
