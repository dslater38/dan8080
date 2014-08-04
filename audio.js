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
			this.basehit.play();
		}
		
		this.playShot = function() {
			this.shot.play();
		}
		
		this.playUfoHit = function() {
			this.ufohit.play();
		}
		
		this.playInvHit = function() {
			this.invhit.play();
		}
		
		this.playWalk1 = function() {
			this.walk1.play();
		}
		
		this.playWalk2 = function() {
			this.walk2.play();
		}
		
		this.playWalk3 = function() {
			this.walk3.play();
		}
		
		this.playWalk4 = function() {
			this.walk4.play();
		}
	
	}
	return audio;
   }