import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ErrorService {
  constructor(private http: Http){ };

  sendError(errObject) {            
    return this.http.post('/error/javascript',errObject).subscribe(res => res.json());
  }

  createErrorObject(err) {   
    let errorObject : Object = {};
    let content : string = 'Error Occurred, ' ;
    if(err.msg){
        errorObject['message'] = err.msg;
        content += err.msg ;   
    }
    if(err.lineNo){
        errorObject['lineNo'] = err.lineNo;    
        content += ', line=' + err.lineNo;   
    }
    if(err.fileDetails){
        errorObject['fileDetails'] = err.fileDetails;
        content += ', file= ' + err.fileDetails;
    }
    if(err.errorStack){
        errorObject['errorStack'] = err.stack;
        content += ', Stack= ' + err.stack;    
    }
    this.sendError(errorObject); 
  }  
      
}

