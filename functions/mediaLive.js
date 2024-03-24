const {
  MediaLiveClient,
  CreateInputCommand,
  CreateChannelCommand,
} = require("@aws-sdk/client-medialive"); // CommonJS import

const { v4: uuid } = require("uuid");
const { config } = require("../config");

const channelConfig = require("./channelConfig.json");

const client = new MediaLiveClient(config);

async function createInput() {
  const InputName = uuid();
  const input = {
    Destinations: [
      {
        StreamName: "live/stream",
      },
      {
        StreamName: "live/stream",
      },
    ],

    InputSecurityGroups: ["5473576"],

    Name: InputName,

    Type: "RTMP_PUSH",

    Arn: "arn:aws:medialive:us-east-1:744750162012:input:8683476",
  };
  const command = new CreateInputCommand(input);
  try {
    const repsonse = await client.send(command);
    return {
      inputId: repsonse.Input.Id,
      streamInputs: repsonse.Input.Destinations.map((dest) => {
        const lastSlashIndex = dest.Url.lastIndexOf("/");
        const rmtpUrl = dest.Url.substring(0, lastSlashIndex + 1);
        const streamKey = dest.Url.substring(lastSlashIndex + 1);
        return {
          rmtpUrl,
          streamKey,
        };
      }),
    };
  } catch (error) {
    throw Error("create Input MediaLive", {
      cause: error,
    });
  }
}

async function createMediaChannel({ channelName, destinations, InputId }) {
  const command = new CreateChannelCommand({
    ...channelConfig,
    Name: channelName,
    InputAttachments: [
      {
        InputAttachmentName: `${channelName}_inp_${InputId}`,
        InputId: InputId,
        InputSettings: {
          AudioSelectors: [],
          CaptionSelectors: [],
          DeblockFilter: "DISABLED",
          DenoiseFilter: "DISABLED",
          FilterStrength: 1,
          InputFilter: "AUTO",
          Smpte2038DataPreference: "IGNORE",
          SourceEndBehavior: "CONTINUE",
        },
      },
    ],
    Destinations: [
      {
        Id: "destination1",
        MediaPackageSettings: [],
        Settings: destinations,
      },
    ],
  });
  try {
    const repsonse = await client.send(command);
    // console.log({ repsonse });
    return repsonse;
  } catch (error) {
    throw Error("create channel MediaLive", {
      cause: error,
    });
  }
}

module.exports = {
  createInput,
  createMediaChannel,
};
