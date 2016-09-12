# socketService

## API

For each new connection you must send a request to the service.
With the request body you need to provide: info, appId and appSecret.


| field         | R/O           | Type     | Description |
| ------------- |:-------------:| --------:| -----------:|
| info          | Optional      | Object   | Any Object  |
| appId         | Required      | String   | App Id      |
| appSecret     | Required      | String   | App Secret  |

Here is ```curl``` example

```sh
curl -H "Content-Type: application/json" -X POST -d 
'{
    "info": {
        "name": "Thomas",
        "surname": "Anderson"
    },
    "appId": "e841022dc010d2df",
    "appSecret": "7876adbe-85f9-f8b9-e467-22aca935"
}' http://127.0.0.1:1234/api/v1/connect
```


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
