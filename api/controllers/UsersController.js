/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
module.exports = {
	
	index: function  (req, res){
		var files = [];
		var dirs = [];
		if (req.param('dirs')==null) {
			var route = 'assets/Files';
		}else{
			var route = req.param('dirs');
		};
		walkSync(route, function(filePath, stat) {
		    files.push(filePath);
		});
		function walkSync(currentDirPath, callback) {
		    var fs = require('fs'),
		        path = require('path');
		    fs.readdirSync(currentDirPath).forEach(function (name) {
		        var filePath = path.join(currentDirPath, name);
		        var stat = fs.statSync(filePath);
		        if (stat.isFile()) {
		            callback(filePath, stat);
		        } else if (stat.isDirectory()) {
		        	dirs.push(filePath);
		            //walkSync(filePath, callback);
		        }
		    });
		}
		res.view({
			files: files,
			dirs: dirs,
			route: route
		});
	}
};

