# Pouik Player, a JQuery-based sound player

Pouik Player is a javascript library for playing sounds on a webpage. You can chain all the Pouik’s functions with native JQuery functions. You also can call a Pouik function with a button event for example. Test it with the demo page !

### Installation
At the end of your webpage, add this :
``` html
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script src="jquery-pouikplayer.js"></script>
<script>
    /*
     * Here you'll put all the things that we'll see below
     */
</script>
```
### The soundbank
Pouik Player has a soundbank. You must feed it with your sound files list.
It's an object, the `key` is the "id" of the player and the `value` the path to the file, like :
``` javascript
$(this).setSoundBank({
  'theme-song': 'sounds/steppenwolf-born-to-be-wild.mp3',
  'pouik': 'sounds/pouik.mp3'
});
```
You can read it with :
``` javascript
$(this).getSoundBank();
```
### Play that sound !
``` javascript
// Play "Pouik" one time
$(this).playSound('pouik');
// Play "Pouik" one time, after 5 seconds
$(this).delay(5000).playSound('pouik');
// Play "Born to be wild" in loop
$(this).playSound('theme-song', { loop: true });
```
### Mute a sound
``` javascript
// Mute "Born to be wild"
$(this).toggleSound('id', 'theme-song');
// Mute "Born to be wild" after 5 seconds
$(this).delay(5000).toggleSound('id', 'theme-song');
```
### Kill a sound player in loop
``` javascript
// Kill "Born to be wild"
$(this).killSound('#theme-song');
```
### Mute sound
``` javascript
$(this).muteSound();
```