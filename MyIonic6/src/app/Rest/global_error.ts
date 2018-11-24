import { Injectable, ErrorHandler } from '@angular/core';
import { HttpResponseBase, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorService implements ErrorHandler {
handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
           return console.error(error.message);
    }
}
}
