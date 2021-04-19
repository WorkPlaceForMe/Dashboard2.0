const { authJwt } = require("../middleware");
const controller = require("../controllers/alerts.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    /**
 * @swagger
 *tags:
 *  name: Alerts
 *  description: API to manage alerts.
 */

 /**
   * @swagger
   * /api/alerts/{id}:
   *   post:
   *    tags:
   *       - Alerts
   *    summary: "Fetch alerts"
   *    operationId: getAlerts
   *    description: "Use to fetch  all alerts of particular alert type"
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *      - in: header
   *        name: x-access-token
   *        schema:
   *          type: string
   *        required: true
   *      - in: "query"
   *        name: "alert_type"
   *        description: "Choose a alert type"
   *        required: true
   *        type: "array"
   *        schema:
   *          type: "string"
   *          enum:
   *          - "loitering"
   *          - "intrusion"
   *          - "people count"
   *          - "demographics"
   *          - "parking"
   *          - "speeding"
   *          - "vehicle count"
   *          - "anpr"
   *          - "aod"
   *          - "queue mgmt"
   *          - "animals"
   *          - "accident"
   *          - "axle"
   *          - "carmake"     
   *          default: "loitering"
   *        collectionFormat: "multi"
   *    requestBody:
   *       content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                type:
   *                  description: "Type of data to be retrieved. Can be cam_id, id_branch or id_account."
   *                  type: string
   *                  example: cam_id
   *                  required: true
   *                start:
   *                  description: "Date for initial range. Format: 2021-01-01T03:00:00.000Z."
   *                  type: string
   *                  example: 2020-10-01T03:00:00.000Z
   *                  required: true
   *                end:
   *                  description: "Date for end range. Format: 2021-12-01T03:00:00.000Z."
   *                  type: string
   *                  example: 2020-11-01T02:59:59.000Z
   *                  required: true
   *    responses:
   *      '200':
   *        description: "A successful response"
   *        content:
   *          application/json:
   *            schema:
   *             type: object
   *             properties:
   *               success:
   *                 description: "Result type"
   *                 type: boolean
   *                 example: true
   *               total:
   *                 description: "Result type"
   *                 type: number
   *                 example: 100
   *               data:
   *                 type: object
   *                 properties:
   *                   alert_type:
   *                     description: "Alert Type"
   *                     type: string
   *                     example: loitering, intrusion, pcount, etc
   *                   domain:
   *                     description: "Alert Domain"
   *                     type: string
   *                     example: people, traffic, security
   *                   cam_id:
   *                     description: "Camera Id"
   *                     type: string
   *                     example: 925cc2f4-a81b-417a-8c44-b7ee3d1068e1
   *                   cam_name:
   *                     description: "Camera name"
   *                     type: string
   *                     example: office cam
   *                   additional_properties:
   *                     description: "Addition custom properties of alert"
   *                     type: array
   *                     example: []
   *      '500':
   *        description: "Server error"
   *        content:
   *          application/json:
   *            schema:
   *             type: object
   *             properties:
   *               success:
   *                 description: "Result type"
   *                 type: boolean
   *                 example: false
   *               message:
   *                 description: "Type of failure"
   *                 type: string
   *                 example: Error message generated by the server
   */
    app.post('/api/alerts/:id',
              /* [authJwt.verifyToken, authJwt.isClientOrBranch], */
              controller.getAlerts
    )
}