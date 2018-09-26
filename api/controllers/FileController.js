/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var path = require('path');
module.exports = {
  upload: function  (req, res) {
    var cont = 0;
    req.file('avatar').upload({
    	maxBytes: 5 * 1000 * 1000 * 1000,
    	dirname: 'C:/NODEJS/sendfiles/assets/Files/',
    	saveAs: function (__newFileStream,cb) { 
        cb(null, 
        req.file('avatar')._files[cont].stream.filename);
        cont = cont + 1; 
      } 

    },
    function (err, files) {
      if (err)
        return res.serverError(err);

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  }

};