# socketService

[![Greenkeeper badge](https://badges.greenkeeper.io/RodinJS/socketService.svg?token=bf75ec313ba2a19fd3d5bba701f8e842bb15ca391334f91024b9dc63b1159ffc&ts=1502272801791)](https://greenkeeper.io/)

## API

Check api documentation.

## Apps

Each app has appId and appSecret, which are required for connecting with service.

#### Create new app

For creating new app
```sh
$ node scripts/generateApp.js --name <new-app-name>
```

```--name``` is required.
 
This will create new app and give you ```appId``` nad ```appSecret```.
 
#### List all apps

For listing all apps
```sh
$ node scripts/listApps.js
```
