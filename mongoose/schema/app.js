const mongoose = require('mongoose');
const configs = require('../../config/config.js');
const UniqueID = require('../../utils/UniqueID.js');
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
        }
    }
);

accessTokenSchema.index({appId: 1});
accessTokenSchema.set("autoIndex", configs.db.autoIndex);
accessTokenSchema.plugin(require('../plugins/pagedFind'));

module.exports = accessTokenSchema;