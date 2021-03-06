/**
* Require "moment", "path", "fs" and "mkdirp"
*/
var moment = require("moment");
var path = require("path");
var fs = require("fs");
var mkdirp = require("mkdirp");

/**
* Application setting.
* @member {String} mongoUri
* @member {String} uploadPath
*/
function Setting() {
    this.mongoUri = "mongodb://localhost/NewEMenuSystems";
    this.uploadPath = "/home/recovery/uploads";
}

/**
* Generate random unique UUID.
* @return {String} 16 digit UUID.
*/
function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
* Create picture path.
* @param {String} base
* @param {Sting} fileName
* @return {String} absolute path include file's extension.
*/
function createPicturePath(base, type, fileName) {
    var time = moment().format("YYYY/MM/DD");
    var uuid = createUUID();
    var dir = path.join(base, type, time);

    var exists = fs.existsSync(dir);
    if(!exists) {
      mkdirp.sync(dir);
    }

    var fullPath = path.join(dir, uuid);
    var filePart = fileName.split(".");
    var extension = filePart[filePart.length -1];

    return fullPath + "." + extension;
}

/**
* Export Setting and utility function here.
*/
exports.configs = new Setting();
exports.utils = {
    createPicturePath: createPicturePath
};
