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
		
		// ufo sound auto-repeats
		this.ufo.loop = true;
		
		this.boundBaseHit = this.basehit.play.bind(this.basehit);
		this.boundShot = this.shot.play.bind(this.shot);
		this.boundUfoHit = this.ufohit.play.bind(this.ufohit);
		this.boundInvHit = this.invhit.play.bind(this.invhit);
		this.boundWalk1 = this.walk1.play.bind(this.walk1);
		this.boundWalk2 = this.walk1.play.bind(this.walk2);
		this.boundWalk3 = this.walk1.play.bind(this.walk3);
		this.boundWalk4 = this.walk1.play.bind(this.walk4);
		
		this.playBaseHit = function() {
			// this.basehit.play();
			window.setTimeout(this.boundBaseHit, 1);
		}
		
		this.playShot = function() {
			//this.shot.play();
			window.setTimeout(this.boundShot, 1);
		}
		
		this.playUfoHit = function() {
			//this.ufohit.play();
			window.setTimeout(this.boundUnoHit, 1);
		}
		
		this.playInvHit = function() {
			//this.invhit.play();
			window.setTimeout(this.boundInvHit, 1);
		}
		
		this.playWalk1 = function() {
			//this.walk1.play();
			window.setTimeout(this.boundWalk1, 1);
		}
		
		this.playWalk2 = function() {
			//this.walk2.play();
			window.setTimeout(this.boundWalk2, 1);
		}
		
		this.playWalk3 = function() {
			//this.walk3.play();
			window.setTimeout(this.boundWalk3, 1);
		}
		
		this.playWalk4 = function() {
			//this.walk4.play();
			window.setTimeout(this.boundWalk4, 1);
		}
		
		this.playUfo = function() {
			//this.ufohit.play();
			window.setTimeout(this.boundUfoHit, 1);
		}
	
	}
	return new audio();
   }