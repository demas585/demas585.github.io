(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"mewtel_atlas_1", frames: [[0,0,1920,1920]]},
		{name:"mewtel_atlas_2", frames: [[297,744,77,64],[297,498,244,244],[0,498,295,295],[0,0,496,496]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.sandraseitamaal0iEo2o4I7kunsplash1 = function() {
	this.initialize(ss["mewtel_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["mewtel_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["mewtel_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["mewtel_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["mewtel_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.mc_dot = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-16.25,-15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_dot, new cjs.Rectangle(-16.2,-15,38.5,32), null);


(lib.mc_box = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_box, new cjs.Rectangle(0,0,122,122), null);


(lib.mc_objective = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_2
	this.box = new lib.mc_box();
	this.box.name = "box";
	this.box.setTransform(125,126.25,1,1,0,0,0,61.1,61.1);
	this.box.alpha = 0.0508;

	this.timeline.addTween(cjs.Tween.get(this.box).wait(1));

	// Слой_1
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_objective, new cjs.Rectangle(0,0,248,248), null);


(lib.mc_card = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_3
	this.dot = new lib.mc_dot();
	this.dot.name = "dot";
	this.dot.setTransform(92.05,91,1,1,0,0,0,19.3,16);
	this.dot.alpha = 0.0508;

	this.timeline.addTween(cjs.Tween.get(this.dot).wait(1));

	// Слой_1
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.mc_card, new cjs.Rectangle(0,0,147.5,147.5), null);


// stage content:
(lib.mewtel = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
		createjs.Touch.enable(stage);
		stage.enableMouseOver();
		
		element = this.card;
		container = this.objective;
		element.objective = this.objective;
		
		
		element.alpha = .5;
		container.alpha = .5;
		
		
		
		
		element.on("mouseover", function(e){
			e.currentTarget.alpha = 1;
		});
		
		
		element.on("mouseout", function(e){
			e.currentTarget.alpha = .5;
		});
		
		
		element.on("mousedown", function(e){
			
			var item = e.currentTarget;
			e.currentTarget.offset = {x:0, y:0};
			
			var pt = e.currentTarget.parent.globalToLocal(e.stageX, e.stageY);
			
			e.currentTarget.offset.x = pt.x - e.currentTarget.x;
			e.currentTarget.offset.y = pt.y - e.currentTarget.y;
			
		});
		
		
		element.on("pressmove", function(e){
		
			var item = e.currentTarget;
		
			var pt = item.parent.globalToLocal(e.stageX, e.stageY);
			var ptt = item.localToLocal(item.dot.x, item.dot.y, item.objective.box);
			
			item.x = pt.x - item.offset.x;
			item.y = pt.y - item.offset.y;
			
			if ( item.objective.box.hitTest(ptt.x, ptt.y) ) {
				item.objective.alpha = .7;
			} else {
				item.objective.alpha = .5;
			}
			
		});
		
		
		element.on("pressup", function(e){
		
			var item = e.currentTarget;
			
			var pt = item.localToLocal(item.dot.x, item.dot.y, item.objective.box);
			
			if ( item.objective.box.hitTest(pt.x, pt.y) ) {
				item.x = item.objective.x;
				item.y = item.objective.y;
				container.alpha = 1;
			} else {
				item.objective.alpha = .5;
			}
		
		});
		
		
		/*
		element.addEventListener("mousedown", onMouseDown);
		element.addEventListener("pressmove", onMouseMove);
		element.addEventListener("pressup",   onMouseUp  );
		element.addEventListener("mouseover", onMouseOver);
		element.addEventListener("mouseout",  onMouseOut );
		
		element.objective = this.objective;
		
		element.alpha = .5;
		container.alpha = .5;
		
		function onMouseOver() {
			element.alpha = 1;
		}
		
		function onMouseOut() {
			element.alpha = .5;
		}
		
		
		function onMouseDown(e){
			var item = e.currentTarget;
			item.offset = {x:0, y:0};
			
			var pt = item.parent.globalToLocal(e.stageX, e.stageY);
			
			item.offset.x = pt.x - item.x;
			item.offset.y = pt.y - item.y;
		
		}
		
		function onMouseMove(e){
			
			var item = e.currentTarget;
		
			var pt = item.parent.globalToLocal(e.stageX, e.stageY);
			var ptt = item.localToLocal(item.dot.x, item.dot.y, item.objective.box);
			
			item.x = pt.x - item.offset.x;
			item.y = pt.y - item.offset.y;
			
			if ( item.objective.box.hitTest(ptt.x, ptt.y) ) {
				item.objective.alpha = .7;
			} else {
				item.objective.alpha = .5;
			}
		
		}
		
		function onMouseUp(e){
			var item = e.currentTarget;
			
			var pt = item.localToLocal(item.dot.x, item.dot.y, item.objective.box);
			
			if ( item.objective.box.hitTest(pt.x, pt.y) ) {
				item.x = item.objective.x;
				item.y = item.objective.y;
				element.alpha = 0;
				container.alpha = 1;
			} else {
				item.objective.alpha = .5;
			}
		}*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// layer_1
	this.card = new lib.mc_card();
	this.card.name = "card";
	this.card.setTransform(204.55,178.2,1,1,0,0,0,73.9,73.9);

	this.card2 = new lib.mc_card();
	this.card2.name = "card2";
	this.card2.setTransform(161.55,453.85,1,1,0,0,0,73.9,73.9);

	this.objective = new lib.mc_objective();
	this.objective.name = "objective";
	this.objective.setTransform(573.3,447.55,1,1,0,0,0,123.9,123.9);

	this.objective2 = new lib.mc_objective();
	this.objective2.name = "objective2";
	this.objective2.setTransform(573.3,168.25,1,1,0,0,0,123.9,123.9);

	this.instance = new lib.sandraseitamaal0iEo2o4I7kunsplash1();
	this.instance.setTransform(0,-189,0.4167,0.4167);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.objective2},{t:this.objective},{t:this.card2},{t:this.card}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(400,111,400,500);
// library properties:
lib.properties = {
	id: 'C52522B5DC4ED24B98039F80EA75C42E',
	width: 800,
	height: 600,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/mewtel_atlas_1.png?1589724446339", id:"mewtel_atlas_1"},
		{src:"images/mewtel_atlas_2.png?1589724446339", id:"mewtel_atlas_2"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['C52522B5DC4ED24B98039F80EA75C42E'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;