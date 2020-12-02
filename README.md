<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Architecture](#Architecture)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Mobile](#Mobile)
* [How to use](#How-to-use)
  * [Webclient](#Webclient)
  * [Logic](#Logic)
* [Known issues and future developments](#Known-issues-and-future-developments)
* [License](#License)

<!-- ABOUT THE PROJECT -->
## About The Project

Bluetooth beacons

The purpose of this project is to help nursing staff at a nursing home to monitor their patients who are suffering from memory disorders. The patients would like to walk freely in the premises, but if they reach an area where they shouldn't be, they need to be guided back to the allowed space. One of the ways this project accomplishes that is by tracking the patients via a bluetooth wristlet that they wear. This wristlet is tracked by Raspberry Pis installed inside the nursing facility. The system is programmed to allow the patients freedom of movement inside the areas they are permitted to access. However, the system will send an alarm if a patient leaves the designated areas. The areas that are allowed to the patients depend on their profile (free to move, restricted to one's own home, now allowed to visit others quarters etc.). The nurses can see where the patients move via a mobile application and a desktop application, and they can check out the alarms.

<!-- Architecture -->
### Architecture

![ABCD](https://raw.githubusercontent.com/Marski96/Bluetooth_beacons/development/img/ADBC_areas.PNG)
This picture is a model of the new nursing home that will be build in the near future.
![architecture](img/phase2.PNG)
This picture shows the monitoring system. The Raspberry Pis in different locations send MQTT data of the beacon wristles. The backend server determines the locations of the patients according to this data, and notifies the changes in real time to the mobile and desktop clients.

### Built With
* [MariaDB](https://mariadb.org/)
* [RethinkDB](https://rethinkdb.com/)
* [Socket.io](https://socket.io/)
* [React](https://reactjs.org/)
* [Expo](https://docs.expo.io/)
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

1. Using Powershell, install all required libraries `npm install`
2. Make sure that all libraries are installed by navigating to detect folder using Powershell and running application's backend.
```sh
pushd ..\Bluetooth_beacons\src\detection
```
```sh
node detect.js
```
3. If program starts with infotext "Socket.io is running on port 4001"... your installation is succesful.
4. If there is problem with some library for example mysql, install the required library: `npm install mysql`
5. Start front-end by opening another instance of Powershell and navigating to application folder:
```sh
pushd ..\Bluetooth_beacons
```

& run start:

```sh
npm start
```
6. Both backend and frontend should be running in order for the application to work.

### Mobile
Mobile version of the app can be found here: https://github.com/Marski96/Bluetooth_beacons_mobile

<!-- How to use -->
## How to use


<!-- Webclient -->
### Webclient


#### Beacon info -page contains information about the users
![beacon info](https://raw.githubusercontent.com/Marski96/Bluetooth_beacons/development/img/beaconinfo.JPG)

#### Receiver info -page contains information about the receivers
![receiver info](https://raw.githubusercontent.com/Marski96/Bluetooth_beacons/development/img/receiverinfo.JPG)

#### Beacon locations -page contains the main info about locations of the beacons
![beacon locations](https://raw.githubusercontent.com/Marski96/Bluetooth_beacons/development/img/beaconlocations.JPG)


<!-- Logic -->
### Logic

- MQTT_connect gets info from the wristlets and pushes it to the database.
 
- queries.js contain all the SQL queries we use.
 
- maintenance.txt contains database scripts which clears db every night and creates fake data to every wristlet to display (so database is never empty).


Receives new data and sends it forward. Interval is decided in earlier section in where we create the actual connection. socketio.js:

            const emit = async socket => {
              try {
                const res = await axios.get(
                  "http://localhost:4000/beacon_locations_average"
                );
                socket.emit("emitSocket", res.data);
              } catch (error) {
                console.error('Error: ${error.code}');
              }
            };


Alarms are set off by room colors which are in the database, for example if the location type is "red" -> the status changes to "Alarm". In addition, if the person is not detected for over 300 seconds and under 600 -> the status changes to "Unsure". If the person has not been detected for over 600 seconds, the status changes to "Alarm" and the measurement time will display "Not seen in 10 minutes".

            if(Receiver1_seconds >= 600) {
                if(rows[2].location_type == 'green') {
                    Receiver1_status = 'Alarm'
                    Receiver1_seconds = 'Not seen in 10 minutes'
                }
                if(rows[2].location_type == 'yellow') {
                    Receiver1_status = 'Alarm'
                    Receiver1_seconds = 'Not seen in 10 minutes'
                }
                if(rows[2].location_type == 'red') {
                    Receiver1_status = 'Alarm'
                    Receiver1_seconds = 'Not seen in 10 minutes'
                }
            }
 

Calculates timedifference and includes it always in the third package we send. detect.js:

            //Get latest packet's timediff and use it as "seconds ago"
            let rawTimeDiff1 = rows[2].Timediff
                if (rawTimeDiff1 == undefined) {
                    rawTimeDiff1 = '00:00:00'
                }
            let Receiver1_timediff = rawTimeDiff1.split(':');
            let Receiver1_seconds = (+Receiver1_timediff[0]) * 60 * 60 + (Receiver1_timediff[1]) * 60 + (+Receiver1_timediff[2]);


 Add the data to JSON which we send. detect.js
 
            rows[0].average_signal_db = Receiver1_AVG;
            rows[1].average_signal_db = Receiver1_AVG;
            rows[2].average_signal_db = Receiver1_AVG;
            rows[2].timediff_in_seconds = Receiver1_seconds;
            rows[2].status = Receiver1_status
 
 
Fetches beacon_locations and adds only relevant data to json packages.

            const url = "http://localhost:4000/beacon_locations";
                let averageData = [];
                const getData = async url => {
                    try {
                      const res = await fetch(url);
                      const json = await res.json();


                        averageData.push(json[2])
                        averageData.push(json[5])
                        averageData.push(json[8])
                        averageData.push(json[11])

                    } catch (error) {
                      console.log(error);
                    }
                    await res.json(averageData);


Frontend fetches the socketio data add it to state tieto:

    componentDidMount() {
        fetch("http://localhost:4000/beacon_locations_average")
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ tieto: responseJson });
 
                const { endpoint } = this.state;
                const socket = socketIOClient(endpoint);
                socket.on("emitSocket", data => this.setState({ tieto: data }));
            });
    }
 



<!-- Known issues and future developments -->
## Known issues and future developments

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
