const mongoose = require('mongoose');
const configs = require('../../config/config');
const UniqueID = require('../../utils/UniqueID');
const Schema = mongoose.Schema;

const accessTokenSchema = new Schema(
    {
        appId: {
            type: String,
            default: UniqueID.v16
        },
        appSecret: {
            type: String,
            default: UniqueID.generate
        },
        name: {
            type: String,
            required: true
        },
        allowedIps: {
            type: [String],
            default: []
        }
    }
);

accessTokenSchema.index({appId: 1});
accessTokenSchema.set("autoIndex", configs.db.autoIndex);
accessTokenSchema.plugin(require('../plugins/pagedFind'));

module.exports = accessTokenSchema;