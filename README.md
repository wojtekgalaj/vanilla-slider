# Disclaimer 

This plugin is based of of the work of weibenfalk found here
https://github.com/weibenfalk/vanilla-js-slider-starter-files

I have added support for youtube videos in the slides.

# Usage

## Files

This solution requires the user to include two files, one css file and one js
file.

The css file is at 

``` sh
style/style.css
```

the js file is at 

``` sh
src/vanilla-slider.js
```

add both of those to the page where you'd like to use this slider.

The css file should go in the header and the js file at the bottom of the page
to minimise it blocking the rendering.

## Markup

The whole slider needs to go inside an element (probably a layer 'div') with an
id of "vanilla-slider"

Each of the slides needs a **vanilla-slide** class on it.

The first slide should also have an **active** class which will make it visible.

After all of the slides there needs to be a diff with a class of
**vanilla-buttons** with 2 divs inside. The content of the divs can be whatever.

``` html
      <div class="vanilla-buttons">
        <div class="vanilla-slider-back-btn">
          <span>◀</span>
        </div>

        <div class="vanilla-slider-next-btn">
          <span>▶</span>
        </div>
      </div>
```

## Videos

For videos, you have to prepare a slide with a div with a class od
**video-container** that has another div inside with a class of
**youtube-video** 

To instantiate the videos add the following snippet. If you already have a dom
ready callback, you can use that one. In this example, I have added a script tag
to the bottom of the page:

``` html
<script type="text/javascript">
  document.addEventListener("DOMContentLoaded", () => {
    initPlayers(["u7Oc4g_CtZc", "gdvHw9ARye0"]);
  });
</script>
```

The scrip in vanilla-slider.js exposes this global method called **initPlayer**
that expects an array of youtube video ids. There needs to be an element in the
dom for each one of the videos. If the number of ids and dom elements doesn't
match, an error will be shown in the console and video will not play.


