import { Injectable } from '@nestjs/common';

@Injectable()
export class RedbrockerService {

  public getLocation(data: object){
    const genStringData = JSON.parse(String(data));
    const obj = {
      "coordinates": genStringData
    }
    return obj;
  }
}