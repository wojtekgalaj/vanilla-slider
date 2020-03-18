(function(win) {
  console.log("script running");

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  let players = [];
  let videoIds = [];

  function onYouTubeIframeAPIReady() {
    console.log("youtube iframe ready");

    const playerContainers = document.getElementsByClassName("youtube-video");

    console.log("player containers ", playerContainers);

    if (playerContainers.length !== videoIds.length) {
      conosole.error(
        "The number of video containers and the ids you have passed in don't match"
      );
      return;
    }

    console.log("length ", playerContainers.length);
    for (let i = 0; i < playerContainers.length; i++) {
      const container = playerContainers[i];
      const containerParent = container.parentNode;
      const clientRect = containerParent.getBoundingClientRect();

      const player = new YT.Player(container, {
        videoId: videoIds[i],
        heigth: clientRect.height + "",
        width: clientRect.width + "",
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
      players.push(player);
    }
  }
  function onPlayerReady(event) {
    /* event.target.playVideo(); */
    console.log("on player reasy ", event);
  }
  function onPlayerStateChange(event) {
    console.log("on player state change ", event);
  }

  function initPlayers(ids) {
    videoIds = ids;
  }

  win.onresize = function(ev) {
    const player = players[0];
  };
  win.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  win.onPlayerReady = onPlayerReady;
  win.onPlayerStateChange = onPlayerStateChange;
  win.initPlayers = initPlayers;
})(window);
