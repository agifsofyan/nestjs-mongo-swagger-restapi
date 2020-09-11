/**
 * Type Upload 
 * - Image
 *  
 * Media Upload
 * - ftp
 * - AWS
 */

import {INestApplication} from '@nestjs/common';
import {FastifyAdapter} from '@nestjs/platform-fastify';
import fmp from 'fastify-multipart';
import fs from 'fs';

export const enum TYPE_STORAGE {
    AWS = 'AWS',
    FTP = 'FTP',
    LOCAL = 'LOCAL',
}

export const TYPE_STORAGE_IMAGE = process.env.TYPE_STORAGE;

export const ALLOW_AVATAR_FILE: string[] = ['image/png', 'image/jpeg'];

// Parse to in the main
// Multer

// const buffer = fs.readFileSync('../certs/server.key');
// var serverKey = fs.readFileSync('server.key') ; // parseBuffer(nodeBufferToArrayBuffer(buffer));


export const FastifyAdapterConf = new FastifyAdapter({
    http2: true,
    logger: true,
    https: {
        allowHTTP1: true, // fallback support for HTTP1
        // key: fs.readFileSync('../../certs/server.key'),
        // cert: fs.readFileSync('../../certs/server.crt')
    },
});

FastifyAdapterConf.register(fmp, {
    limits: {
        fieldNameSize: 100, // Max field name size in bytes
        fieldSize: 1000000, // Max field value size in bytes
        fields: 10,         // Max number of non-file fields
        fileSize: 100,      // For multipart forms, the max file size
        files: 1,           // Max number of file fields
        headerPairs: 2000,   // Max number of header key=>value pairs
    },
});

// FOR TESTING
export const FTP_STORAGE = {
    basepath: process.env.FTP_STORAGE_BASE_PATH,
    ftp: {
        host: process.env.FTP_STORAGE_HOST,
        secure: JSON.parse(process.env.FTP_STORAGE_SECURE),
        user: process.env.FTP_STORAGE_USER,
        password: process.env.FTP_STORAGE_PASSWORD,
    },
};

export const AWS_STORAGE = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_ENDPOINT: process.env.AWS_ENDPOINT,
    AWS_BUCKET: process.env.AWS_BUCKET,
    AWS_ACL: process.env.AWS_ACL,
    AWS_S3_FORCE_PATH_STYLE: JSON.parse(process.env.AWS_S3_FORCE_PATH_STYLE),
    AWS_S3_BUCKET_ENDPOINT: JSON.parse(process.env.AWS_S3_BUCKET_ENDPOINT),
};