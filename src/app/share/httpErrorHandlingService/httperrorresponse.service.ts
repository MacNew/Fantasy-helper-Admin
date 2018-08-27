import { Injectable, NgModule, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError,Observable } from 'rxjs';
import { MessageService } from '../message.service'
import { Component, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
  
})

export class HttperrorresponseService {
  constructor() { }
  public errorHandling(res: HttpErrorResponse) {
    const statusCode = res.status;
    console.log(res);
    const error = {
      statusCode: statusCode,
      message: res 
    }
    return throwError(error);
  }
}
