const {
  MediaPackageClient,
  CreateChannelCommand,
  CreateOriginEndpointCommand,
} = require("@aws-sdk/client-mediapackage"); // CommonJS import
const { config } = require("../config");
const { v4: uuid } = require("uuid");

const client = new MediaPackageClient(config);

async function createChannelMediaPkg(chanId, desc = "") {
  const input = {
    // CreateChannelRequest
    Id: chanId, // dynamic
    Description: desc, // dynamic
  };
  const command = new CreateChannelCommand(input);
  try {
    const response = await client.send(command);
    return response.HlsIngest.IngestEndpoints;
  } catch (error) {
    throw Error("create channel MediaPkg", {
      cause: error,
    });
  }
}

async function addChannelOriginEndpoint(chanId) {
  const endpointId = uuid();
  const input = {
    Id: endpointId, // dynamic
    ManifestName: "index",
    ChannelId: chanId, // dynamic

    HlsPackage: {
      AdMarkers: "NONE",
      PlaylistType: "EVENT",
      PlaylistWindowSeconds: 60,
      ProgramDateTimeIntervalSeconds: 0,
      SegmentDurationSeconds: 6,
    },
  };
  const command = new CreateOriginEndpointCommand(input);
  try {
    const response = await client.send(command);
    // console.log({ response });
    return response.Url;
  } catch (error) {
    throw Error("add origin Endpoint MediaPkg", {
      cause: error,
    });
  }
}

module.exports = {
  addChannelOriginEndpoint,
  createChannelMediaPkg,
};
// createChannelMediaPkg("someidididn").then(console.log);
// addChannelOriginEndpoint("someidididn").then(console.log);
