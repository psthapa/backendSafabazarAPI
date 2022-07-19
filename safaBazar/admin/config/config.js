const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
   PORT: Joi.number()
    .default(7002),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  // AWS_ACCESS_KEY_ID: Joi.string()
  //   .description('AWS s4 access key id'),
  // AWS_SECRET_ACCESS_KEY: Joi.string()
  //   .description('AWS s4 access key'),
  // S3_BUCKET: Joi.string()
  //   .description('AWS s4 bucket'),
  // BRAINTREE_MERCHANTID: Joi.string()
  //   .description('BRAINTREE_MERCHANTID'),
  // BRAINTREE_PUBLICKEY: Joi.string()
  //   .description('BRAINTREE_PUBLICKEY '),
  // BRAINTREE_PRIVATEKEY: Joi.string()
  //   .description('BRAINTREE_PRIVATEKEY'),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,

  jwtSecret: envVars.JWT_SECRET,
  braintreeMerchantId: envVars.BRAINTREE_MERCHANTID,
  braintreePublickey: envVars.BRAINTREE_PUBLICKEY,
  braintreePrivatekey: envVars.BRAINTREE_PRIVATEKEY,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },
  awsAccessKeyId: envVars.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
  s3Bucket: envVars.S3_BUCKET,

};

module.exports = config;
