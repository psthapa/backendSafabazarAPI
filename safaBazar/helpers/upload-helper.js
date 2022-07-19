const multer = require('multer');
const config = require('./../../config/config');
const jimp = require('jimp');
const Promise = require('bluebird');
const fs = require('fs');
const mkdirp = require('mkdirp');
const aws = require('aws-sdk');
const APIError = require('./../helpers/APIError');
const httpStatus = require('http-status');

const uploadRootFolder = 'uploads/public/';
// const uploadDayClosureRootFolder = './uploads/dayClosure/';
// const uploadInvoiceRootFolder = './uploads/invoice/';
// const uploadFaxRootFolder = './uploads/fax/';

/*
 * Configure the AWS region of the target bucket.
 * Remember to change this to the relevant region.
 */
aws.config.region = 'ap-southeast-1';
aws.config.accessKeyId = config.awsAccessKeyId;
aws.config.secretAccessKey = config.awsSecretAccessKey;

var s3 = new aws.S3({ params: { Bucket: config.s3Bucket } });

const path = require('path');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        mkdirp(uploadRootFolder, err => cb(err, uploadRootFolder))
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

// var storageFile = multer.diskStorage({
//     destination: function (req, file, cb) {
//         mkdirp(uploadDayClosureRootFolder, err => cb(err, uploadDayClosureRootFolder))
//     },
//     filename: function (req, file, cb) {
//         var datetimestamp = Date.now();
//         cb(null, file.originalname.split('.')[0] + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
//     }
// });

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            const err = new APIError('Only images are allowed', httpStatus.NOT_ACCEPTABLE, true);
            return callback(err);
        }
        callback(null, true)
    },
    limits: {
        fileSize: 2 * 1024 * 1024
    }

}).single('upload');

// var uploadFile = multer({
//     storage: storageFile,
//     fileFilter: function (req, file, callback) {
//         var ext = path.extname(file.originalname).toLowerCase();
//         if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.doc' && ext !== '.docx' && ext !== '.pdf' && ext !== '.txt') {
//             const err = new APIError('Only images, pdf, doc and docx are allowed', httpStatus.NOT_ACCEPTABLE, true);
//             return callback(err);
//         }
//         callback(null, true)
//     },
//     limits: {
//         fileSize: 5 * 1024 * 1024
//     }

// }).single('dayClosure');

/**
 * Upload image using nulter.
 */
function uploadMulter(req, res, next) {
    return new Promise(function (resolve, reject) {
        upload(req, res, function (err) {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    err = new APIError('File size must be less than 2MB.', httpStatus.NOT_ACCEPTABLE, true);
                }
                return next(err);
            }
            // No error occured.
            resolve(req.file.filename);
        });
    })
}

/**
 * Upload file using nulter.
 */
// function uploadFileMulter(req, res, next) {
//     return new Promise(function (resolve, reject) {
//         uploadFile(req, res, function (err) {
//             if (err) {
//                 if (err.code === 'LIMIT_FILE_SIZE') {
//                     err = new APIError('File size must be less than 5MB.', httpStatus.NOT_ACCEPTABLE, true);
//                 }
//                 return next(err);
//             }
//             // No error occured.
//             resolve(req.file.filename);
//         });
//     })
// }

/**
 * function to upload to aws s3
 * @param {string} filename 
 * @param {string} folder 
 */
function sendToS3(filename, folder) {
    return new Promise(function (resolve, reject) {

        // fs.readFile('uploads/public/menu/upload-1639735527350.jpg', function(err, data){

        //     // Display the file content
        //     console.log(data);
        // });
        let filePath = uploadRootFolder + folder + '/' + filename;

        fs.readFile(filePath, function (err, file) {
            if (err) reject(err);
            var data = { Key: folder + '/' + filename, Body: file, ACL: 'public-read' };
            s3.upload(data, function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
        })
    })
}

// /**
//  * function to upload file to aws s3
//  * @param {string} filename 
//  * @param {string} folder 
//  */
// function sendDayClosureToS3(filename, folder) {
//     return new Promise(function (resolve, reject) {
//         fs.readFile(uploadDayClosureRootFolder + filename, function (err, file) {
//             if (err) reject(err);
//             var data = { Key: folder + '/' + filename, Body: file, ACL: 'public-read' };
//             s3.upload(data, function (err, data) {
//                 if (err) reject(err);
//                 resolve(data);
//             });
//         })
//     })
// }

// /**
//  * function to upload invoice to aws s3
//  * @param {string} filename name of file to upload from invoice folder
//  * @returns {Promise<{url: string, file: Buffer}>}
//  */
// function sendInvoiceToS3(filename) {
//     return new Promise(function (resolve, reject) {
//         fs.readFile(uploadInvoiceRootFolder + filename, function (err, file) {
//             if (err) throw(err);
//             var data = { Key: 'invoices/' + filename, Body: file, ACL: 'public-read' };
//             s3.upload(data, function (err, data) {
//                 if (err) reject(err);
//                 resolve({url: data.Location, file: file});
//             });
//         })
//     })
// }

// /**
// //  * function to upload fax to aws s3
// //  * @param {string} filename name of file to upload from fax folder
// //  * @returns {Promise<{url: string}>}
// //  */
// function sendFaxToS3(filename) {
//     return new Promise(function (resolve, reject) {
//         fs.readFile(uploadFaxRootFolder + filename, function (err, file) {
//             if (err) throw(err);
//             var data = { Key: 'fax/' + filename, Body: file, ACL: 'public-read' };
//             s3.upload(data, function (err, data) {
//                 if (err) reject(err);
//                 resolve({url: data.Location});
//             });
//         })
//     })
// }

// /**
//  * Resize image and save to folder with custom width and quality. Height will be auto
//  * @param {string} filename name of file
//  * @param {string} folder stored folder name
//  * @param {number} width width of image
//  * @param {number} quality quality of image
//  */
function resizeImage(filename, folder, width, quality = 60) {

    return jimp.read(uploadRootFolder + filename)
        .then(image => {
            return image.resize(width, jimp.AUTO).quality(quality).write(uploadRootFolder + folder + '/' + filename);
        })
        .then(data => {
            return filename;
        })
        .catch(err => Promise.reject(err));
}


async function resize(filename, folder, width, quality = 60) {
    let image = await jimp.read(uploadRootFolder + filename);
    let data = await image.resize(width, jimp.AUTO).quality(quality).writeAsync(uploadRootFolder + folder + '/' + filename);
    return data;
}


/**
 * Remove uploaded images from server
 * @param {string} fileName 
 * @param {string} folder 
 * @param {boolean} hasThumb 
 */
function removeImages(fileName, folder, hasThumb = false) {
    let filePaths = [uploadRootFolder + fileName, uploadRootFolder + folder + '/' + fileName];
    if (hasThumb)
        filePaths.push(uploadRootFolder + 'thumbnails/' + fileName)

    filePaths.forEach(path => {
        fs.unlink(path, (err) => {			//delete the original uploaded file
            if (err) console.log(err);
        })
    });
}

module.exports = {
    uploadMulter,
    // uploadFileMulter,
    sendToS3,
    // sendDayClosureToS3,
    // sendInvoiceToS3,
    // sendFaxToS3,
    resizeImage,
    removeImages,
    resize,
}