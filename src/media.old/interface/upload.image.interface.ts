import {CropDto} from "../dto/crop.dto";


export interface IUploadImage {
    /**
     *
     * @param value
     */
    setFilename(value: string);

    /**
     *
     * @param value
     */
    setCroppedPrefix(value: string): IUploadImage;

    /**
     *
     * @param value
     */
    setCroppedPayload(value: CropDto): IUploadImage;

    getMulter(): any;
}
