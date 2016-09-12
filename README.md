# socketService

## API

For each new connection you must request to service.
With body should provided info, appId and appSecret.

**appId**: _Required_ your appId
**appSecret**: _Required_ your appSecret

| field         | R/O           | Type     | Description |
| ------------- |:-------------:| --------:| -----------:|
| info          | Optional      | Object   | Any Object  |
| appId         | Required      | String   | App Id      |
| appSecret     | Required      | String   | App Secret  |

Here is curl example

```sh
curl -H "Content-Type: application/json" -X POST -d 
'{
    "info": {
        "name": "Thomas",
        "surname": "Anderson"
    },
    "appId": "e841022dc010d2df",
    "appSecret": "7876adbe-85f9-f8b9-e467-22aca935"
}' http://localhost:3000/api/login
```


## Apps

Each app have appId and appSecret, which are required for connecting with service.

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
