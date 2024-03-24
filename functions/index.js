const { createInput, createMediaChannel } = require("./mediaLive");
const {
  createChannelMediaPkg,
  addChannelOriginEndpoint,
} = require("./mediapkg");
const { storeParam } = require("./storeParam");

(async function () {
  try {
    const mediaPkgChanId = "cu_tets_final_mkpg";

    const [{ inputId, streamInputs }, ingestPoints] = await Promise.all([
      createInput(),
      createChannelMediaPkg(mediaPkgChanId),
    ]);

    // console.log({ inputId });
    const [destinations, streamUrl] = await Promise.all([
      Promise.all(
        ingestPoints.map(async (ingestpoint) => {
          const PasswordParam = await storeParam(
            ingestpoint.Id,
            ingestpoint.Password
          );
          return {
            PasswordParam: PasswordParam,
            Url: ingestpoint.Url,
            Username: ingestpoint.Username,
          };
        })
      ),
      addChannelOriginEndpoint(mediaPkgChanId),
    ]);

    const resp = await createMediaChannel({
      InputId: inputId,
      channelName: "cut_test_medial_live",
      destinations,
    });
    console.log({ streamUrl, streamInputs, channelId: resp.Channel.Id });
  } catch (error) {
    console.log({ error });
  }
})();
