// Pouik player, a JQuery-based library to add sound on your webpage
// License MIT
// https://github.com/Seb00ch/pouik-player
// v1.0

(function ($) {
  var soundBank = {}
      soundActive = true; // false = 'muted', true = 'playing'

  // Private functions
  $.fn.extend({
    _console: function (message, type) {
      switch (type) {
        case 'error': console.error('Pouik Error : ' + message); break;
        case 'warn': console.warn('Pouik Warning : ' + message); break;
        default: console.log('Pouik Log : ' + message); break;
      };

      return null;
    },
    _muteSound: function (type, name) {
      // Mute a sound, a group of sounds or all sound
      if (type == 'id') {
        // Get the player with specific id & make it pause
        if (typeof $('#pouik .player#' + name)[0] == 'undefined')
          return $(this)._console('Player "' + name + '" not found.', 'warn');

        $('#pouik .player#' + name)[0].pause();
      } else {
        // Get some or all players & make them pause
        if (typeof $('#pouik .player') == 'undefined')
          return $(this)._console('Player "' + name + '" not found.', 'warn');

        for (var i = 0; i < $('#pouik .player').length; i++)
          $('#pouik .player')[i].pause();
      }

      return 'muted';
    },
    _unmuteSound: function (type, name) {
      // Unmute a sound, a group of sounds or all sound
      if (type == 'id') {
        // Get the player with specific id & make it play
        if (typeof $('#pouik .player#' + name)[0] == 'undefined')
          return $(this)._console('Player "' + name + '" not found.', 'warn');

        $('#pouik .player#' + name)[0].play();
      } else {
        // Get some or all players & make them play
        if (typeof $('#pouik .player') == 'undefined')
          return $(this)._console('Player "' + name + '" not found.', 'warn');

        for (var i = 0; i < $('#pouik .player').length; i++)
          $('#pouik .player')[i].play();
      }
      
      return 'play';
    }
  });

  // Public functions
  $.fn.extend({
    killSound: function (name) {
      this.queue('fx', function (next) {
        $('#pouik .player').remove(name);
        next();
      });
      return this;
    },
    muteSound: function (group_class) {
      this.queue('fx', function (next) {
        $('#pouik .player').toggleSound('class', (group_class) ? group_class : 'all');
        next();
      });
      return this;
    },
    playSound: function (id, options) {
      this.queue('fx', function (next) {
        // Check if this sound is in the sound bank
        if (soundBank[id]) {
          if (!$('#pouik').length) $('<div id="pouik"></div>').appendTo('body');

          $('<audio id="' + id + '" class="player" autoplay="autoplay" style="display:none;"' + ((typeof options !== 'undefined' && options.loop) ? 'loop="true"' : '') + '>'
            + '<source src="' + soundBank[id].file + '">'
            + '<embed src="' + soundBank[id].file + '" hidden="true" autostart="true">'
          + '</audio>'
          ).appendTo('#pouik').on('ended', function () { this.remove(); });
        } else {
          $(this)._console('Can\'t find the "' + id + '" file in the sound bank.', 'error');
        }

        next();
      });
      return this;
    },
    toggleSound: function (type, name) {
      if (type == 'id') {
        // Check if this sound is in the sound bank & on / off a player.
        if (soundBank[name]) {
          if (soundBank[name].status == 'playing') {
            soundBank[name].status = 'muted';
            return $(this)._muteSound(type, name);
          } else {
            soundBank[name].status = 'playing';
            return $(this)._unmuteSound(type, name);
          }
        } else {
          return $(this)._console('Can\'t find the "' + name + '" file in the sound bank.', 'error');
        }
      } else if (type == 'class') {
        // On / off sound or a group of players. Her "name" is a class name.
        if (soundActive) {
          soundActive = false;
          return $(this)._muteSound(type, name);
        } else {
          soundActive = true;
          return $(this)._unmuteSound(type, name);
        }
      }
    },
    getSoundBank: function () {
      return soundBank;
    },
    setSoundBank: function (list) {
      // Change the sound bank structure & feed her
      $.each(list, function (id, data) {
        soundBank[id] = { file: data, status: 'playing' };
      });
    }
  });
})(jQuery);