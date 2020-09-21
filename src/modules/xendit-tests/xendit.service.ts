import { 
    Injectable, 
	NotFoundException, 
	BadRequestException,
	NotImplementedException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import Xendit from 'xendit-node';
import {X_SECRET_KEY, X_PUBLIC_KEY, X_TOKEN} from 'src/config/xendit.configuration';

@Injectable()
export class XenditService {

    constructor() {}
    
    async findAll(): Promise<any> {

        const x = new Xendit({ secretKey: X_SECRET_KEY });

        const { Balance } = x;
        const balanceSpecificOptions = {};
        const b = new Balance(balanceSpecificOptions);

        const resp = await b.getBalance()
        console.log(resp);
    }
}