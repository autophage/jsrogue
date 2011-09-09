jsrogue is a roguelike written in JavaScript.

Work began in August of 2011 by Eric Honour.

jsrogue uses HTML5's canvas for its map drawing, and uses a bit of jquery for handling keypresses and smoothing out a few browser inconsistencies.

The code is spread out over several files:

/
.index.html will be the index page.
.test-map.html is the working version of the index page.
.jquery-1.6.2.min is a downloaded copy of jquery.
.styles.css is the stylesheet for the project
.README.txt is this document
.jsr-main.js is where the initial setup and game loop go.
---/code
   .character.js WILL hold character info, to be written out to a bones file or...something.
   .creature.js holds info for creatures (including the player).
   .domutils.js holds DOM update-y stuff
   .items.js is a list of items that can exist in the game
   .levelmaker.js contains the level generation code
   .levelpainter.js contains functions to draw the level to the canvas
   .materials.js defines all of the materials that stuff in the game can be made out of
   .utils.js is for miscellaneous utilities.
---/assets
   ---/images
      ---/sprites
         ---/creatures
             +Containes images of creatures.
         ---/items
             +Contains images of items.
      ---/tiles
          +Contains pictures of tiles, but since changing how we draw levels this will probably be removed.
   ---/sounds