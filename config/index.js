require("dotenv").config();

function requireEnv(env_variable) {
  if (!env_variable) {
    throw new Error(`${env_variable} not set`);
  }
  return env_variable;
}

const credentials = {
  accessKeyId: requireEnv(process.env.AWS_ACCESS_KEY),
  secretAccessKey: requireEnv(process.env.AWS_SECRET_KRY),
};

const config = { region: "us-east-1", credentials };
module.exports = {
  config,
};
