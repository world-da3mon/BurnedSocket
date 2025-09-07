const { youtubeKey } = require("../config.json");
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "lastVideos.json");

function loadLastVideoId() {
  if (!fs.existsSync(dataPath)) return null;
  const raw = fs.readFileSync(dataPath, "utf-8");
  const json = JSON.parse(raw);
  return json.lastVideoId || null;
}

function saveLastVideoId(videoId) {
  const json = { lastVideoId: videoId };
  fs.writeFileSync(dataPath, JSON.stringify(json, null, 2));
}

async function checkYoutube(client) {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${youtubeKey}&channelId=UCNjfh4qy6HmCIqJuUt6jPJA&part=snippet,id&order=date&maxResults=1&type=video`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.items || data.items.length === 0) return;

  const video = data.items[0];
  const videoId = video.id.videoId;

  const lastVideoId = loadLastVideoId();

  if (videoId !== lastVideoId) {
    saveLastVideoId(videoId);

    const title = video.snippet.title;
    const link = `https://www.youtube.com/watch?v=${videoId}`;

    // récupère le salon
    const channel = await client.channels.fetch("1393627164179435691");

    // 🔔 ping tout le serveur (ou remplace par un rôle ex: "<@&ROLE_ID>")
    channel.send(
      `@everyone 🚨 **New video out now :** ${title}\n📺 Watch it here 👉 ${link}`
    );
  }
}

function startYoutubePolling(client, interval = 15 * 60 * 1000) {
  // Lancer immédiatement au démarrage
  checkYoutube(client);

  // Vérifier régulièrement
  setInterval(() => checkYoutube(client), interval);
}

module.exports = { startYoutubePolling };
