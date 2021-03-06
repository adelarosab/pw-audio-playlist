// Generated by CoffeeScript 1.10.0
(function() {
  var modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

  Polymer({
    is: "pw-audio-playlist",
    "extends": "audio",
    properties: {
      _index: {
        computed: "_computeIndex(current, songs)"
      },
      _player: {
        type: Object
      },
      autoplay: Boolean,
      current: {
        notify: true,
        observer: "_currentChanged",
        readOnly: true,
        type: Object
      },
      playlistLoop: Boolean,
      songs: {
        type: Array,
        value: function() {
          return Polymer.dom(this).querySelectorAll("source");
        }
      }
    },
    listeners: {
      "ended": "_nextIfNotEnded"
    },
    _computeIndex: function(current, songs) {
      return songs.indexOf(current);
    },
    _currentChanged: function(current) {
      this._player.src = current.src;
      return this._player.type = current.type;
    },
    attached: function() {
      if (this.autoplay) {
        return this._play();
      }
    },
    ready: function() {
      var before, source;
      source = document.createElement("source");
      source.id = "current";
      before = Polymer.dom(this).firstChild;
      Polymer.dom(this.root).insertBefore(source, before);
      this._player = source;
      return this._setCurrent(this.songs[0]);
    },
    _next: function() {
      this.fire("pw-audio-playlist-next");
      return this._setCurrent(this.songs[(this._index + 1) % this.songs.length]);
    },
    _nextIfNotEnded: function() {
      this._next();
      if (this._index !== 0 || this.playlistLoop) {
        return this._play();
      } else {
        return this._previous();
      }
    },
    _previous: function() {
      this.fire("pw-audio-playlist-previous");
      return this._setCurrent(this.songs[modulo(this._index - 1, this.songs.length)]);
    },
    _play: function() {
      this.load();
      return this.play();
    },
    next: function() {
      this._next();
      return this._play();
    },
    previous: function() {
      this._previous();
      return this._play();
    }
  });

}).call(this);

//# sourceMappingURL=pw-audio-playlist.js.map
