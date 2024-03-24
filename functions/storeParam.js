const { SSMClient, PutParameterCommand } = require("@aws-sdk/client-ssm");
const { config } = require("../config");

const client = new SSMClient(config);

async function storeParam(paramKey, secretValue) {
  const ParamName = `/medialive/${paramKey}`;
  const input = {
    // PutParameterRequest
    Name: ParamName, // required

    Value: secretValue, // required
    Type: "SecureString",
  };
  const command = new PutParameterCommand(input);
  try {
    const response = await client.send(command);
    if (response.$metadata.httpStatusCode == 200) {
      return ParamName;
    }
    console.log(response);
    throw Error("something went wrong");
  } catch (error) {
    throw Error("store param", {
      cause: error,
    });
  }
}
module.exports = {
  storeParam,
};
// storeParam("daddy", "ddddd").then(console.log);
