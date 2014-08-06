   function enableAudio() {
	function audio() {
	
		this.basehit = document.createElement('audio');
		this.shot = document.createElement('audio');
		this.ufohit = document.createElement('audio');
		this.invhit = document.createElement('audio');
		this.ufo = document.createElement('audio');
		this.walk1 = document.createElement('audio');
		this.walk2 = document.createElement('audio');
		this.walk3 = document.createElement('audio');
		this.walk4 = document.createElement('audio');
		this.basehit.src='sound/basehit.ogg';
		this.shot.src='sound/shot.ogg';
		this.ufohit.src='sound/ufohit.ogg';
		this.invhit.src='sound/invhit.ogg';
		this.ufo.src='sound/ufo.ogg';
		this.walk1.src='sound/walk1.ogg';
		this.walk2.src='sound/walk2.ogg';
		this.walk3.src='sound/walk3.ogg';
		this.walk4.src='sound/walk4.ogg';
		
		this.playBaseHit = function() {
			// this.basehit.play();
			window.setTimeout(this.basehit.play.bind(this.basehit));
		}
		
		this.playShot = function() {
			//this.shot.play();
			window.setTimeout(this.shot.play.bind(this.shot));
		}
		
		this.playUfoHit = function() {
			//this.ufohit.play();
			window.setTimeout(this.ufohit.play.bind(this.ufohit));
		}
		
		this.playInvHit = function() {
			//this.invhit.play();
			window.setTimeout(this.invhit.play.bind(this.invhit));
		}
		
		this.playWalk1 = function() {
			//this.walk1.play();
			window.setTimeout(this.walk1.play.bind(this.walk1));
		}
		
		this.playWalk2 = function() {
			//this.walk2.play();
			window.setTimeout(this.walk2.play.bind(this.walk2));
		}
		
		this.playWalk3 = function() {
			//this.walk3.play();
			window.setTimeout(this.walk3.play.bind(this.walk3));
		}
		
		this.playWalk4 = function() {
			//this.walk4.play();
			window.setTimeout(this.walk4.play.bind(this.walk4));
		}
	
	}
	return new audio();
   }