require('dotenv/config');
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook(process.env.DISCORD_WEBHOOK);

exports.sendMessage = async (msg) => {
    await hook.send(msg);
}