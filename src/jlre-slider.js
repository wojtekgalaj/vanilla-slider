document.addEventListener("DOMContentLoaded", () => {
  // Youtube player bit
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  let players = [];
  let videoIds = [];

  function onYouTubeIframeAPIReady() {
    const playerContainers = document.getElementsByClassName("youtube-video");

    if (playerContainers.length !== videoIds.length) {
      console.error(
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

  function stopAllPlayers() {
    players.forEach(player => {
      player.stopVideo();
    });
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

  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  window.onPlayerReady = onPlayerReady;
  window.onPlayerStateChange = onPlayerStateChange;
  window.initPlayers = initPlayers;

  // Slider bit

  // CHANGE ONLY THIS
  const SLIDETIME = 500; //ms
  // --------------------------

  const backButton = document.querySelector(".jlre-slider-back-btn");
  const forwardButton = document.querySelector(".jlre-slider-next-btn");
  // Select all slides and convert node to array for easy handling
  // const allSlides = Array.from(document.querySelectorAll('.jlre-slide'));
  const allSlides = [...document.querySelectorAll(".jlre-slide")];
  let clickable = true;
  let active = null;
  let newActive = null;

  function initSlider() {
    // Set the CSS transition on the slides to the value we specified in SLIDETIME above
    allSlides.forEach(slide =>
      slide.setAttribute(
        "style",
        `transition: transform ${SLIDETIME}ms ease;
                     animation-duration: ${SLIDETIME}ms`
      )
    );
  }

  function changeSlide(forward) {
    if (clickable) {
      clickable = false;
      stopAllPlayers();
      active = document.querySelector(".active");
      const activeSlideIndex = allSlides.indexOf(active);

      if (forward) {
        console.log("activeSlideIndex: ", activeSlideIndex);
        console.log("allSlides.length: ", allSlides.length);
        console.log("new slide: ", (activeSlideIndex + 1) % allSlides.length);

        newActive = allSlides[(activeSlideIndex + 1) % allSlides.length];
        active.classList.add("slideOutLeft");
        newActive.classList.add("slideInRight", "active");
      } else {
        console.log("activeSlideIndex: ", activeSlideIndex);
        console.log("allSlides.length: ", allSlides.length);
        console.log(
          "new slide: ",
          (activeSlideIndex - 1 + allSlides.length) % allSlides.length
        );

        newActive =
          allSlides[
            (activeSlideIndex - 1 + allSlides.length) % allSlides.length
          ];
        active.classList.add("slideOutRight");
        newActive.classList.add("slideInLeft", "active");
      }
    }
  }

  allSlides.forEach(slide => {
    slide.addEventListener("transitionend", e => {
      // Check for the old active transition and if clickable is false
      // to not trigger it more than once
      if (slide === active && !clickable) {
        clickable = true;
        // Remove all CSS animation classes on old active
        active.className = "jlre-slide";
      }
    });
  });

  //Event listeners
  forwardButton.addEventListener("click", () => {
    console.log("forward button pressed");

    changeSlide(true);
  });
  backButton.addEventListener("click", () => {
    console.log("backward button pressed");
    changeSlide(false);
  });

  // Init the slider
  initSlider();
});
