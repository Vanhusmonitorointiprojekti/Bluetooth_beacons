<!-- TABLE OF CONTENTS -->
# Project Bluetooth Beacons
## Table of Contents
* [Introduction](#introduction)
* [Architecture and Technical Description](#architecture-and-technical-description)
  * [The Database systems](#the-database-systems)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Mobile](#Mobile)
* [How to use](#How-to-use)
  * [Webclient](#Webclient)
* [Known issues and future developments](#Known-issues-and-future-developments)
* [License](#License)

<!-- INTRODUCTION -->
# Introduction

The purpose of this project is to help nursing staff in a new nursing home (that will be completed in the near future) to monitor their patients who are suffering from memory disorders. Picture 1 represents the areas in the new nursing facility. The patients would like to walk freely in the premises, but if they reach an area where they shouldn't be, they need to be guided back to the allowed space. One of the ways this project accomplishes that is by tracking the patients via a bluetooth wristlet that they wear. This wristlet is tracked by Raspberry Pis installed inside the nursing facility. The system is programmed to allow the patients freedom of movement inside the areas they are permitted to access. However, the system will send an alarm if a patient leaves the designated areas. The areas that are allowed to the patients depend on their profile (free to move, restricted to one's own home, now allowed to visit others quarters etc.). The nurses can see where the patients move via a mobile application and a desktop application, and they can check out the alarms.

The system's backend server is built with Node.js + Express framework and the front end client is made with React framework. The mobile application is built with Expo platform for universal React applications. The system has two databases: a non-realtime database using MariaDB database system and a real-time database using RethinkDB database system.

![ABCD](https://raw.githubusercontent.com/Marski96/Bluetooth_beacons/development/img/ADBC_areas.PNG)
Picture 1. This picture is a model of the new nursing home that will be built in the near future.

<!-- Architecture -->
# Architecture and Technical Description

Picture 2 shows the monitoring system. The Raspberry Pis in different locations send MQTT data of the beacon wristlets to the MQTT server. The backend server listens to this data from the MQTT server, determines the locations of the patients according to this data, and notifies the changes in real-time to the mobile and desktop clients. The non-realtime database is used to get information of the tenants, locations, profiles etc.

![architecture](img/phase2.PNG)
Picture 2. The system architecture.

Technical description of the system here. TODO!!!

## Built With
* [MariaDB](https://mariadb.org/)
* [RethinkDB](https://rethinkdb.com/)
* [Socket.io](https://socket.io/)
* [React](https://reactjs.org/)
* [Expo](https://docs.expo.io/)
* [Node.js](https://nodejs.org/en/)
* [MQTT](http://mqtt.org/)

## The development environment:
<!-- TODO ADD PICTURE HERE -->

## The production environment:
<!-- TODO ADD PICTURE HERE -->

## The Description of the API

> Method | Url | Action
> ------ | ------ | ------
> GET | /tenants | Gets all the tenants
> GET | /receivers | Gets all the receivers
> GET | /detections | Gets all the MQTT detections
> GET | /detections/locations | Gets the current locations of the beacons
> DELETE | /detections | Deletes all the MQTT detections
> GET | /statuses | Gets the current tenant statuses
> GET | /statuses/:id | Gets the status of a tenant with id
> POST | /statuses | Adds a tenant with status info
> PUT | /statuses/:id | Updates the record of a tenant with id
> POST | /api/push_notification/push_token | Adds a new token
> POST | /api/push_notification/message | Adds a message and sends it as a push notification

# The Database Systems
## Non-realtime Database (MariaDB)
The non-realtime database uses the [MariaDB](https://mariadb.org/) database system and is used for holding information of the patients (tenants), beacons, receivers and other details related to these. Picture 3 shows the database model.

<!-- TODO ADD PICTURE HERE -->
Picture 3. The non-realtime database.

> ### _location_types_
> _The location_types table contains the location types of the spaces in the facility._
> 
> Field | Type | Description
> ------ | ------ | ------
> location_type_id | char(20) PK | The id of the location type
> location_type | int |  The type of the location as a number
> description | char(30) | The description of the location type (home, lounge, lobby etc.)

> ### _spaces_
> _The spaces table contains the spaces in the facility._
> 
> Field | Type | Description
> ------ | ------ | ------
> space_id | char(20) PK | The id of the location type
> space_name | char(20) |  The name of the space
> location_type_id | char(20) FK | The location type of the space, reference to the [location_types](#location_types) table

> ### _receivers_
> _The receivers table contains the receivers in the facility._
> 
> Field | Type | Description
> ------ | ------ | ------
> receiver_id | char(20) PK | The id of the receiver
> receiver_name | char(20) |  The name of the receiver
> space_id | char(20) FK | The space where the receiver is, reference to the [spaces](#spaces) table

> ### _beacons_
> _The beacons table contains the beacons of the tenants (patients to be monitored)._
> 
> Field | Type | Description
> ------ | ------ | ------
> beacon_id | char(20) PK | The id of the beacon
> beacon_name | char(20) |  The name of the beacon

> ### _profiles_
> _The profiles table contains the profiles of the tenants._
> 
> Field | Type | Description
> ------ | ------ | ------
> profile_id | char(20) PK | The id of the profile
> profile_type | int |  The type of the profile as a number
> description | char(30) | The description of the profile

> ### _beacon_detections_
> _The beacon_detections table contains the MQTT data received from the MQTT server._
> 
> Field | Type | Description
> ------ | ------ | ------
> receiver_id | char(20) FK | The id of the receiver, reference to the [receivers](#receivers) table
> beacon_id | char(20) FK |  The id of the beacon, reference to the [beacons](#beacons) table
> signal_db | int | The strength of the measurement signal in decibels
> measurement_time | timestamp | The timestamp of the measurement

> ### _tenants_
> _The tenants table contains the tenants of the nursing home._
> 
> Field | Type | Description
> ------ | ------ | ------
> tenant_id | char(20) PK | The id of the tenant
> space_id | char(20) FK |  The space where the tenant lives, reference to the [spaces](#spaces) table
> beacon_id | char(20) FK |  The beacon (wristlet) of the tenant, reference to the [beacons](#beacons) table
> profile_id | char(20) FK |  The profile of the tenant, reference to the [profiles](#profiles) table
> tenant_firstname | char(50) | The first name of the tenant
> tenant_lastname | char(50) | The last name of the tenant

> ### _tokens_
> _The tokens table contains the Expo tokens needed for sending push notifications to the mobile phones of the nurses._
> 
> Field | Type | Description
> ------ | ------ | ------
> id | char(20) PK | The id of the token
> token | char(30) |  The Expo token of the mobile phone

## Real-time Database (RethinkDB)
The real-time database uses the [RethinkDB](https://rethinkdb.com/) database system and is used for the location information and detection data. The detection data on this database is deleted on regular intervals, where as the detection data stored in MariaDB non-realtime database is preserved. Picture 4 shows the real-time database model.

<!-- TODO ADD PICTURE HERE -->
Picture 4. The real-time database.

> ### _beacon_detections_
> _The beacon_detections table contains the MQTT data received from the MQTT server._
> 
> Field | Type | Description
> ------ | ------ | ------
> detection_id | char(20) PK | The id of the detection measurement
> receiver_id | char(20) FK | The receiver of the measurement
> beacon_id | char(20) FK |  The beacon of the measurement
> signal_db | int | The strength of the measurement signal in decibels
> measurement_time | timestamp | The timestamp of the measurement

> ### _tenant_statuses_
> _The tenants table contains the tenants of the nursing home._
> 
> Field | Type | Description
> ------ | ------ | ------
> tenant_id | char(20) PK | The id of the tenant
> firstname | char(50) | The first name of the tenant
> lastname | char(50) | The last name of the tenant
> status | char(10) | The monitoring status of the tenant (ok, go check, alarm)
> checked | bool | The boolean value, if the tenant's alarm is checked or not
> location | char(10) | The space where the tenant currently is
> measurement_time | timestamp | The timestamp of the measurement
> last_updated | timestamp | The timestamp when the tenant status was updated


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


<!-- Known issues and future developments -->
## Known issues and future developments

See the [open issues](https://github.com/Marski96/Bluetooth_beacons/issues) for a list of proposed features (and known issues).

<!-- License -->
## License
Licensed under MIT -license.
https://opensource.org/licenses/MIT

