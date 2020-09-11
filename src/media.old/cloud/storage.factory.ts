import {FtpStorageAdapter} from './adapters/ftp.storage.adapter';
import {ALLOW_AVATAR_FILE, TYPE_STORAGE} from '../../config/multer.configuration';
import {AwsStorageAdapter} from './adapters/aws.storage.adapter';
import {IUploadImage} from "../interface/upload.image.interface";
import {LocalStorageAdapter} from "./adapters/local.storage.adapter";

export class StorageFactory {
    static createStorageFromType(type: string): IUploadImage {
        switch (type) {
            case TYPE_STORAGE.FTP:
                return new FtpStorageAdapter({
                        fileFilter(req, file, cb) {
                            if (!ALLOW_AVATAR_FILE.includes(file.mimetype)) {
                                return cb(new Error(`Only ${ALLOW_AVATAR_FILE.join(', ')} are allowed.`));
                            }

                            cb(null, true);
                        },
                    },
                );
            case TYPE_STORAGE.AWS: {
                return new AwsStorageAdapter({
                    fileFilter(req, file, cb) {
                        if (!ALLOW_AVATAR_FILE.includes(file.mimetype)) {
                            return cb(new Error(`Only ${ALLOW_AVATAR_FILE.join(', ')} are allowed.`));
                        }

                        cb(null, true);
                    },
                });
            }
            case  TYPE_STORAGE.LOCAL:{
                return new LocalStorageAdapter({
                    fileFilter(req, file, cb) {
                        if (!ALLOW_AVATAR_FILE.includes(file.mimetype)) {
                            return cb(new Error(`Only ${ALLOW_AVATAR_FILE.join(', ')} are allowed.`));
                        }

                        cb(null, true);
                    },
                });
            }
            default:
                return null;
        }
    }
}
