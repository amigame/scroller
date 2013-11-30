var app;

//var deps = KISSCMS['require'];
/*var deps = {};

construct({ deps : deps }, function( response ){
	// save the app as a global object
	app = response;
	console.log( app );
});
*/
/*
	var mouseX = 0,
		mouseY = 0;

// add mouse tracking
document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseMove(event) {

	mouseX = ( event.clientX - (window.innerWidth / 2) ) * 4;
	mouseY = ( event.clientY - (window.innerHeight / 2) ) * 4;

}
*/

var app;
var options = {};

construct(options, function( backbone ){

	app = backbone;

});

// logic

construct.input(["keys"]);
// use construct.configure for custom logic or alternatively place it a separate file and include it in the 'deps' list...
construct.configure(function(){

	APP.Main = APP.Views.Main3D.extend({
		options: {
			url: "assets/html/game.html"
		},

		postRender: function(){

			this.objects.set({
				player: new Player({
					el: $(this.el).find("player")
				})
			});

			this.layers.set({
				rocks: new Rocks( new APP.Collection( new Array(20) ), {
					el: $(this.el).find("rocks")
				}),
				enemies: new Enemies( new APP.Collection( new Array(10) ), {
					el: $(this.el).find("enemies")
				})
			});

		}
	});

	var Player = APP.Meshes.Player.extend({
		options: {
			url: "assets/html/player.html"
		},
		keys : {
			'left right up down': 'onMove'
		},

		onMove: function(event, key) {
			event.preventDefault();
			var position = this.object.position;
			switch( key ) {
				case "left":
					position.x--;
				break;
				case "right":
					position.x++;
				break;
				case "up":
					position.y++;
				break;
				case "down":
					position.y--;
				break;

			}
			// check if the position has changed first
			this.object.position.set(position.x, position.y, position.z);
		}

	});

	// Objects

	var Rock = APP.Meshes.Dynamic.extend({
		options: {
			url: "assets/html/rock.html",
			speed: { x: -0.01 }
		},

		preRender: function(){
			// set a random position
			var x = Math.random()* 160;
			var y = 30 - Math.random()* 60;
			var s = 1 + Math.random()*3;
			// set a random size/rotation
			var r = Math.random()*360;
			this.data.set({
				position: [x,y,0],
				scale: [s,s,s],
				rotation: [r,r,r]
			});
		},

		update: function( e ){
			// remove when the object is no longer visible
			if( this.object.position.x < -100){
				//
				this.remove();
			}
		}

	});

	var Enemy = APP.Meshes.NPC.extend({
		options: {
			url: "assets/html/enemy.html",
			speed: { x: -0.1 }
		},

		preRender: function(){
			// set a random position
			var x = 80 + Math.random()* 200;
			var y = 30 - Math.random()* 60;
			this.data.set({
				position: [x,y,0]
			});
		},

		update: function( e ){
			// remove when the object is no longer visible
			if( this.object.position.x < -100){
				//
				this.remove();
			}
		}
	});


	// Layers

	var Rocks = APP.Layer.extend({
		model: Rock,
		refresh: function(){
			// preserve population
			if( this.objects.length < 20){
				this.add();
			}
		}
	});

	var Enemies = APP.Layer.extend({
		model: Enemy,
		refresh: function(){
			// preserve population
			if( this.objects.length < 10){
				this.add();
			}
		}
	});

});
