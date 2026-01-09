    const RELAYS = [
    "wss://relay.damus.io",
    "wss://nostr.wine",
    "wss://relay.snort.social"
    ];

    const AUTHOR_PUBKEY = "YOUR_HEX_PUBKEY"; // not npub

    const recapsContainer = document.getElementById("recaps");

RELAYS.forEach(relayUrl => {
  const ws = new WebSocket(relayUrl);

  ws.onopen = () => {
        ws.send(JSON.stringify([
            "REQ",
            "yakihonne-recaps",
            {
                kinds: [30023],
                authors: [AUTHOR_PUBKEY],
                limit: 10
            }
        ]));
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data[0] === "EVENT") {
      const note = data[2];
    renderRecap(note);
    }
  };
});

    function renderRecap(note) {
  const titleTag = note.tags.find(t => t[0] === "title");
    const title = titleTag ? titleTag[1] : "Weekly Recap";

    const articleId = note.id;
    const yakihonneUrl = `https://yakihonne.com/article/${articleId}`;

    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
    <div class="meta">Yakihonne · Weekly Recap</div>
    <h3>${title}</h3>
    <p>${note.content.slice(0, 140)}...</p>
    <a href="${yakihonneUrl}" target="_blank">Read on Yakihonne →</a>
    `;

    recapsContainer.prepend(card);
}
