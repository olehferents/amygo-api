import {Injectable} from '@nestjs/common';

const NodeGeocoder = require('node-geocoder');

@Injectable()
export class LocationService{
    async genLocation(destination){
        const options = {
            provider: 'google',
            apiKey: 'AIzaSyDoRDG1EGENeLEwOfaBn-oFABjhaydC45w',
            formatter: null
        };

        const geocoder = NodeGeocoder(options);
        const result = await geocoder.geocode(destination)
        return result;
    }
}