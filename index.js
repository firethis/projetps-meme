const { Intents, Client } = require("discord.js-selfbot-v13");
const configParse = require("./configParse");
const buttonHandler = require("./buttonHandler");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
  checkUpdate: false,
});

const {
  ALLOWED_CHANNEL_ID,
  CHARACTERS,
  MIN_VALUE_CHARACTERS,
  MIN_VALUE_KAKERA,
  TOKEN,
  MARRY_ALL_WISHED,
} = configParse();

(async () => {
  try {
    await client.login(TOKEN);

    client.on("ready", () => {
      console.log("CLIENT CONNECTED");
    });

    client.on("messageCreate", async (msg) => {
      if (msg.author.id === "432610292342587392") {
        if (msg.components.length === 0) return;

        if (ALLOWED_CHANNEL_ID.includes(msg.channel.id)) {
          const msgComponents = msg.components[0];
          const description = msg.embeds[0]?.description.split("**");

          // Kakera Reaction
          if (
            msg.embeds[0]?.color === "6753288" ||
            msg.embeds[0]?.footer?.text?.includes("Pertence")
          ) {
            if (
              msgComponents.components[0].emoji.name.includes("kakera") &&
              description[1] >= MIN_VALUE_KAKERA
            ) {
              setTimeout(async () => {
                await buttonHandler(
                  TOKEN,
                  msg.guildId,
                  msg.channelId,
                  msg.id,
                  msgComponents.components[0].customId
                );
              }, 360);
              return;
            }
          }

          
          if (CHARACTERS.includes(msg.embeds[0]?.author?.name)) {
            setTimeout(async () => {
              await buttonHandler(
                TOKEN,
                msg.guildId,
                msg.channelId,
                msg.id,
                msgComponents.components[0].customId
              );
            }, 360);
            return;
          }

          // Marry by Value
          if (desc1ription[1] >= MIN_VALUE_CHARACTERS) {
            setTimeout(async () => {
              await buttonHandler(
                TOKEN,
                msg.guildId,
                msg.channelId,
                msg.id,
                msgComponents.components[0].customId
              );
            }, 360);
            return;
          }

          
          description.forEach(async (element) => {
            if (element?.includes("Desejado por") && MARRY_ALL_WISHED) {
              setTimeout(async () => {
                await buttonHandler(
                  TOKEN,
                  msg.guildId,
                  msg.channelId,
                  msg.id,
                  msgComponents.components[0].customId
                );
              }, 360); // 1000 milissegundos = 1 segundo
              return;
            }
          });

          // Marry even if there's no reaction
          if (ALLOWED_CHANNEL_ID.includes(msg.channel.id)) {
            if (description !== undefined) {
              // Marry by Value
              if (description[1] >= MIN_VALUE_CHARACTERS) {
                setTimeout(async () => {
                  await buttonHandler(
                    TOKEN,
                    msg.guildId,
                    msg.channelId,
                    msg.id,
                    msgComponents.components[0].customId
                  );
                }, 360); // 1000 milissegundos = 1 segundo
                return;
              }

              // Marry by Wish
              description.forEach(async (element) => {
                if (element?.includes("Desejado por") && MARRY_ALL_WISHED) {
                  setTimeout(async () => {
                    await buttonHandler(
                      TOKEN,
                      msg.guildId,
                      msg.channelId,
                      msg.id,
                      msgComponents.components[0].customId
                    );
                  }, 360); // 1000 milissegundos = 1 segundo
                  return;
                }
              });
            }
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
    if (
      error.toString().includes("An invalid token was provided") ||
      error.toString().includes("401: Unauthorized")
    ) {
      console.log("Invalid Token on config.txt");
      process.exit(1);
    }
  }
})();
