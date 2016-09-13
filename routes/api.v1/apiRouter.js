const router = require('express').Router();
const Emitter = require('../../utils/emitter');
const UniqueID = require('../../utils/UniqueID');
const users = require('../users');

const MongoConnection = require('../../mongoose/connection');
const App = MongoConnection.model('App');

/**
 * @api {post} /api/v1/connect Request User Connection
 * @apiName Connect User
 * @apiGroup Connect
 *
 * @apiParam {Object} info User info.
 * @apiParam {String} appId Registered app id.
 * @apiParam {String} appSecret Registered app secret.
 *
 * @apiExample {curl} Example usage:
 *      curl -H "Content-Type: application/json" -X POST -d
 *      '{
 *          "info": {
 *              "name": "Thomas",
 *              "surname": "Anderson"
 *          },
 *          "appId": "e841022dc010d2df",
 *          "appSecret": "7876adbe-85f9-f8b9-e467-22aca935"
 *      }' http://127.0.0.1:1234/api/v1/connect
 *
 *
 * @apiSuccess {String} token Connect to sockets with this token.
 * @apiSuccess {Object} stream Use for audio streaming
 *
 *
 * @apiSuccessExample {json} Success-Response
 *     200 OK
 *     {
 *          "success": true
 *          "data": {
 *              "user": {
 *                  "token": "431fbf87-a064-e4a8-c7c1-927e9015"
 *                  "stream": {
 *                      "sessionId": "2_MX40NTYyNDI0Mn5-MTQ3Mzc1NjgxOTM5N35RNzAySC9KWTRMalZpSXdLdituQmM4OUh-UH4"
 *                      "token": "T1==cGFydG5lcl9pZD00NTYyNDI0MiZzaWc9NmQwZjZhYTkxMmE2OTBiN2U3NTQwMzk3ODE1ODYzM2QwMGFkODIyZjpzZXNzaW9uX2lkPTJfTVg0ME5UWXlOREkwTW41LU1UUTNNemMxTmpneE9UTTVOMzVSTnpBeVNDOUtXVFJNYWxacFNYZExkaXR1UW1NNE9VaC1VSDQmY3JlYXRlX3RpbWU9MTQ3Mzc1NjgzOCZub25jZT0wLjE0NTMwMDg1NDY4MjgyODcyJnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE0NzQzNjE2MzgmY29ubmVjdGlvbl9kYXRhPXRva2VuJTNENDMxZmJmODctYTA2NC1lNGE4LWM3YzEtOTI3ZTkwMTU="
 *                  }
 *                  "last_action": 1473756838286
 *                  "appId": "eae3950a63520201"
 *              }
 *              "token": "431fbf87-a064-e4a8-c7c1-927e9015"
 *          }
 *
 *
 * @apiError InvalidAppIdOrSecret
 * @apiErrorExample {json} Unauthorised:
 *      401 Unauthorised
 *      {
 *          "success": false
 *          "error": {
 *              "message": "Invalid appId or appSecret"
 *              "status": 401
 *              "timestamp": 1473756023136
 *              "type": "Authorisation Error"
 *          }
 *      }
 *
 * @apiErrorExample {json} Bad Request:
 *      400 Bad Request
 *      {
 *          "success": false
 *          "error": {
 *              "message": "Invalid request data. Check api documentation"
 *              "status": 400
 *              "timestamp": 1473756023136
 *              "type": "Bad Request"
 *          }
 *      }
 */
router.post('/connect', (req, res) => {
    const emitter = new Emitter(req, res);
    const token = UniqueID.generate();

    const user = users.add(token, req.body.user);
    user.appId = req.body.appId;

    return emitter.sendData({
        user: user,
        token: token
    });
});

module.exports = router;