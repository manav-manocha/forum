import { Component, ErrorHandler, Injectable } from '@angular/core';
import { ErrorService } from './global/services/error.service';
import 'messenger/build/js/messenger.js';


declare var jQuery: any;


@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(private errorservice: ErrorService){}
  handleError(error) : void {
    console.error(error.message)
    let regExp = /\(([^)]+)\)/;
    let content = '';
    let fileDetails = error.message.split('\n')[1];
    if(fileDetails.indexOf('src') == -1){
      fileDetails = error.message.split('\n')[2];
    }
    if(regExp.exec(fileDetails) !== null){
        fileDetails = regExp.exec(fileDetails)[0];

    }
    let message = error.message.split('\n')[0];
    fileDetails = fileDetails.replace(/[{()}]/g, '');
    fileDetails = fileDetails.replace('eval at', '');
    content += '<b>Message:</b> ' + message + '<br/><b>File:</b> ' + fileDetails;
    jQuery.globalMessenger.options = { extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right', theme: 'air' };
    jQuery.globalMessenger().post({
        message: content,
        type: 'error',
        showCloseButton: true,
        hideAfter: false
    });
    let errObj : Object = {};
    errObj["msg"] = message;
    errObj["fileDetails"] = fileDetails;
    this.errorservice.createErrorObject(errObj);
  }
}