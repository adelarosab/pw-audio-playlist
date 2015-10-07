Polymer
  is: "pw-audio-playlist"
  extends: "audio"

  properties:
    _index:
      computed: "_computeIndex(current, songs)"
    _player:
      type: Object
    autoplay: Boolean
    current:
      notify: yes
      observer: "_currentChanged"
      readOnly: yes
      type: Object
    playlistLoop: Boolean
    songs:
      type: Array
      value: ->
        Polymer
        .dom this
        .querySelectorAll "source"

  listeners:
    "ended": "_nextIfNotEnded"

  _computeIndex: (current, songs) ->
    songs.indexOf current

  _currentChanged: (current) ->
    @_player.src = current.src
    @_player.type = current.type

  attached: ->
    @_play() if @autoplay

  ready: ->
    source = document.createElement "source"
    source.id = "current"

    before = Polymer
    .dom this
    .firstChild

    Polymer
    .dom this.root
    .insertBefore source, before

    @_player = source
    @_setCurrent @songs[0]

  _next: ->
    @fire "pw-audio-playlist-next"
    @_setCurrent @songs[(@_index + 1) % @songs.length]

  _nextIfNotEnded: ->
    @_next()
    if @_index isnt 0 or @playlistLoop
      @_play()
    else
      @_previous()

  _previous: ->
    @fire "pw-audio-playlist-previous"
    @_setCurrent @songs[(@_index - 1) %% @songs.length]

  _play: ->
    @load()
    @play()

  next: ->
    @_next()
    @_play()

  previous: ->
    @_previous()
    @_play()
