/*
 *  Project: Lastfm recent tracks
 *  Description: A plugin to display their latest tracks heard on LastFM.
 *  Author: Bruno Queiros
 *  License: MIT
 *  URL: https://github.com/brunoqueiros/lastfm-tracks
 */

;(function(){
	function LastFM() {
		this.options = {
			url: 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks',
			apiKey: '',
			username: '',
      container: 'lfm-container',
      musicClass: 'lfm-music',
      artistClass: 'lfm-artist',
      imageClass: 'lfm-image',
      trackClass: 'lfm-track',
      imageSize: 'large',
			autoUpdate: false,
      interval: 30000,
      noImage: 'img/cover_placeholder_lg.jpg',
			limit: 6
		};
    this.tracksList = [];
	}

	LastFM.prototype.init = function(args) {
		var self  = this, opt;

    self.options = self.extend(self.options, args);
    opt          = self.options;
    opt.url      += '&user=' + opt.username + '&api_key=' +  opt.apiKey + '&format=json' + '&limit=' + opt.limit;
		this.update();
	};

  LastFM.prototype.extend = function(defaults, options) {
    var target = {};
    for (var i in defaults) {
      if (typeof options[i] !== 'undefined') {
        target[i] = options[i];
      } else {
        target[i] = defaults[i];
      }
    }

    return target;
  };

  LastFM.prototype.update = function() {
    var self  = this,
      opt = self.options;

    self.request();
    if (opt.autoUpdate) {
      setInterval(function() { self.request(); }, opt.interval);
    }
  };

	LastFM.prototype.request = function() {
		var self  = this,
			opt = self.options,
      i, flag = 0;

		this.ajax(opt.url, function(xhr) {
      self.tracksList = xhr.recenttracks.track;
      self.emptyElement(opt.container);

      for (i = 0, length = self.tracksList.length; i < length; i += 1) {
        if (flag < opt.limit) {
          self.elementMaker(self.tracksList[i]);
          flag += 1;
        }
      }
		});
	};

  LastFM.prototype.getElement = function(sel) {
    var element;
    if (document.querySelectorAll('.' + sel).length > 0) {
      element = document.querySelectorAll('.' + sel);
    } else if (document.querySelectorAll('#' + sel).length > 0) {
      element = document.querySelectorAll('#' + sel);
    }
    element = element[0];

    return element;
  };

  LastFM.prototype.emptyElement = function(c) {
    var container = this.getElement(c);
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
  };

  LastFM.prototype.verifyCover = function(image) {
    var aux = image.split('.'),
      i     = aux.length - 1,
      opt   = this.options;

    if (aux[i].length === 0) {
      aux = opt.noImage;
    } else {
      aux = image;
    }

    return aux;
  };

	LastFM.prototype.elementMaker = function(track, diffJSON) {
		var self        = this,
      opt           = self.options,
      container     = self.getElement(opt.container),
      block         = document.createElement('div'),
      artist        = document.createElement('span'),
      music         = document.createElement('span'),
      img           = document.createElement('img'),
      artistContent = document.createTextNode(track.artist['#text']),
      musicContent  = document.createTextNode(track.name),
      imageIndex    = self.setImageIndex(opt.imageSize);

    if (track['@attr']) {
    	block.className = opt.trackClass + ' now-playing';
    } else {
			block.className  = opt.trackClass;
    }

		img.src          = self.verifyCover(track.image[imageIndex]['#text']);
		img.className    = opt.imageClass;
		music.className  = opt.musicClass;
		artist.className = opt.artistClass;
		artist.appendChild(artistContent);
		music.appendChild(musicContent);
		block.appendChild(img);
		block.appendChild(artist);
		block.appendChild(music);
    container.appendChild(block);
	};

  LastFM.prototype.setImageIndex = function(imageSize) {
    var imageIndex = 2;

    switch(imageSize) {
      case 'small':
        imageIndex = 0;
        break;

      case 'meddium':
        imageIndex = 1;
        break;

      case 'large':
        imageIndex = 2;
        break;

      case 'extralarge':
        imageIndex = 3;
        break;
    }

    return imageIndex;
  };

	LastFM.prototype.ajax = function(url, callback) {
		var xhr,
		makeRequest = function(url) {
      if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) { // IE
        try {
          xhr = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
          try {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
          }
          catch (e) {}
        }
      }
      xhr.onreadystatechange = statefulStatus;
			xhr.open('GET', url, true);
			xhr.send(null);
		},

		statefulStatus = function() {
      if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var rs = xhr.responseText;
					rs = JSON.parse(rs);
					callback(rs);
				}
			}
		};

		makeRequest(url);
	};

	window.LastFM = new LastFM();
})();