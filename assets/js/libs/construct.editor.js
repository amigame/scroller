(function(){
	// exit now if construct hasn't already been defined
	if(typeof construct == "undefined") return;

	construct.editor = function( options ){
		// initial setup

		construct.config.deps.push("dat.gui");

	}

	// Dependencies
	construct.config = Object.extend(construct.config, {
		"paths": {
			"dat.gui" : [
				"//cdnjs.cloudflare.com/ajax/libs/dat-gui/0.5/dat.gui.min"
			]
		}
	});

})();
// Views
construct.promise.add(function(){

require(["backbone.app", "jquery.three"], function(){

	APP.Layouts.GUI = APP.Layout.extend({});

	APP.GUI = {};

	APP.GUI.Panel = APP.View.extend({
		attributes : {},
		initialize: function( options ){
			_.bindAll(this, 'render', 'update', 'selections', 'save');
			// every view has one instance of the gui
			this.gui = new dat.GUI();

			this.attributes = this.collection.attributes;
			if(options.resources) this.resources = options.resources;

			return APP.View.prototype.initialize.call(this, options);
		},
		render: function(){
			// replace with your own:
			// this.gui.add(...);
		},
		update : function(){
			//broadbast changes to the gui
			this.attributes = this.collection.attributes;
		},
		// create a object array from a collection
		selections : function( items ){
			var options = {};
			for(var i in items){
				// no id - no go...
				if( !items[i].id) continue;
				var id = items[i].id;
				// lookup a descriptive name (fallback to the id)
				var label = items[i].get("title") || items[i].get("name") || id;
				options[label] = id;
			}
			return options;
		},
		save : function(){
			//broadcast the changes back to the model
			this.collection.set( this.attributes );
			this.collection.save();
		}

	});

});
});