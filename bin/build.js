var _ 					= require('underscore');
var walk    			= require('walk');
var fs 					= require('fs');
var path 				= require('path');
var compressor			= require('node-minify');
var twig				= require('twig').twig;
var dependency			= new (require('./dependency').main)();
var stack				= require('./stack').main;
var file				= require('./file').main;
var ncp 				= require('ncp').ncp;
var wrench 				= require('wrench');
var toolset				= require("toolset");
var minify				= require('minify');
var less 				= require('less');


var builder = function(cwd) {
	var scope 	= this;
	this.file	= new file();
	this.cwd 	= cwd;
	
	toolset.log("Path", this.cwd);
	
	this.base 	= this.cwd;
	
	this.file.toObject(this.base+"/build.json", function(buildProfile) {
		scope.buildProfile = buildProfile;
		
		// Increment the build number
		buildProfile.build++;
		
		// Write back the file
		scope.file.writeJson(scope.base+"/build.json", buildProfile, function() {
			console.log(" == VERSION "+buildProfile.version.toString()+", BUILD "+buildProfile.build.toString()+" == ");
			
			scope.init(function() {
				toolset.file.read(scope.base+"/"+scope.buildProfile.name+".html", function(html) {
					console.log("html",html);
					var regex = new RegExp("<script src=\"([a-zA-Z0-9\"\'\<\>\:\/\=\.]+)\"><\/script>", "igm");
					html = html.replace(regex, '');
					
					var regex = new RegExp("<link(.*)", "igm");
					html = html.replace(regex, '');
					
					var regex = new RegExp("<\!--scripts-->", "igm");
					html = html.replace(regex, '<script src="'+scope.buildProfile.name+'.min.js"></script><link href="'+scope.buildProfile.name+'.min.css" rel="stylesheet" type="text/css"/>');
					
					toolset.file.write(scope.base+scope.buildProfile.output+"/"+scope.buildProfile.name+".html", html, function() {
						toolset.log("BUILD COMPLETE.");
					});
				});
				
			});
		});
		
	});
}
builder.prototype.init = function(callback) {
	var scope 	= this;
	
	// Delete the output directory
	toolset.file.removeDir(scope.base+scope.buildProfile.output, function() {
		// Create the output directory
		toolset.file.createPath(scope.base+scope.buildProfile.output, function() {
			
			// List the files
			var files 	= {};
			var concat 	= {};
			var stack 	= new toolset.stack();
			
			_.each(scope.buildProfile.files, function(file) {
				var ext = path.extname(file);
				if (!files[ext]) {
					files[ext] = [];
				}
				switch (ext) {
					case ".js":
					case ".less":
						if (!concat[ext]) {
							concat[ext] = "";
						}
						stack.add(function(p, cb) {
							toolset.log("> Concat", file);
							toolset.file.read(file, function(content) {
								concat[ext] += "\n\n/* "+file+" */\n"+content;
								cb();
							});
						});
						files[ext].push(file);
					break;
					default:
						// Copy those files
						toolset.log("> Copy", file);
						fs.createReadStream(file).pipe(fs.createWriteStream(scope.base+scope.buildProfile.output+"/"+path.basename(file)));
					break;
				}
			});
			
			
			stack.process(function() {
				
				// Write the files
				var writeStack = new toolset.stack();
				var i;
				for (i in concat) {
					writeStack.add(function(p, cb) {
						toolset.file.write(scope.base+scope.buildProfile.output+"/"+scope.buildProfile.name+p.i, concat[p.i], function() {
							cb();
						});
					}, {i:i});
				}
				
				writeStack.process(function() {
					toolset.log("files", files);
					//toolset.log("concat", concat);
					
					if (scope.buildProfile.minify) {
						
						
						var minifyStack = new toolset.stack();
						
						// Minify the JS
						minifyStack.add(function(p, cb) {
							var file = scope.base+scope.buildProfile.output+"/"+scope.buildProfile.name+".js";
							toolset.log("Minifying",file);
							minify.optimize(file, {
								notLog  : true,
								callback: function(error, minData) {
									toolset.file.write(scope.base+scope.buildProfile.output+"/"+scope.buildProfile.name+".min.js", minData, function() {
										fs.unlink(file, cb);
									});
								}
							});
						});
						
						
						
						// Minify the CSS
						minifyStack.add(function(p, cb) {
							var file = scope.base+scope.buildProfile.output+"/"+scope.buildProfile.name+".less";
							toolset.log("Minifying",file);
							var parser = new less.Parser({
								paths         : [scope.base+scope.buildProfile.output],	// .less file search paths
								optimization  : 1,			// optimization level, higher is better but more volatile - 1 is a good value
							});
							toolset.file.read(file, function(lessContent) {
								toolset.log(file,lessContent);
								parser.parse(lessContent, function (error, cssTree) {
									var cssString = cssTree.toCSS({
										compress:		true,
										yuicompress:	true
									});
									
									// Now we have the css. We save to a file
									var filename = scope.base+scope.buildProfile.output+"/"+scope.buildProfile.name+".min.css";
									toolset.file.write(filename, cssString, function() {
										// Remove original file
										fs.unlink(file, cb);
									});
								});
							});
						});
						
						minifyStack.process(function() {
							toolset.log("Finished!");
							callback();
						});
					} else {
						toolset.log("Finished!");
						callback();
					}
				});
				
			});
			
			
		});
	});
}

builder.prototype.getIncludes = function(files, type, relativepath) {
	var list 		= files[type];
	
	var output 		= [];
	var scope		= this;
	switch (type) {
		case ".js":
			_.each(list, function(file) {
				file = file.replace(scope.base+"/"+scope.buildProfile.src+"/bower_components", "public");
				if (file.substr(0,4) == "http") {
					output.push('<script src="'+file+'"></script>');
				} else {
					output.push('<script src="'+relativepath+file+'"></script>');
				}
			});
		break;
		case ".css":
			_.each(list, function(file) {
				file = file.replace(scope.base+"/"+scope.buildProfile.src+"/bower_components", "public");
				if (file.substr(0,4) == "http") {
					output.push('<link href="'+file+'" rel="stylesheet">');
				} else {
					output.push('<link href="'+relativepath+file+'" rel="stylesheet">');
				}
				
			});
		break;
		case ".less":
			_.each(list, function(file) {
				file = file.replace(scope.base+"/"+scope.buildProfile.src+"/bower_components", "public");
				if (file.substr(0,4) == "http") {
					output.push('<link rel="stylesheet/less" type="text/css" href="'+file+'" />');
				} else {
					output.push('<link rel="stylesheet/less" type="text/css" href="'+relativepath+file+'" />');
				}
				
			});
		break;
	}
	return output.join('\n');
}

var sh = require("shelljs");
var cwd = sh.pwd();

new builder(cwd);