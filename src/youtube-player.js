(function(win) {
  console.log("script running");

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  let player;

  function onYouTubeIframeAPIReady() {
    console.log("youtube iframe ready");

    player = new YT.Player("youtube-player-1", {
      height: "390",
      width: "640",
      videoId: "M7lc1UVf-VE",
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  }
  function onPlayerReady(event) {
    /* event.target.playVideo(); */
  }
  function onPlayerStateChange(event) {
    console.log("on player state change ", event);
  }

  win.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  win.onPlayerReady = onPlayerReady;
  win.onPlayerStateChange = onPlayerStateChange;
})(window);
