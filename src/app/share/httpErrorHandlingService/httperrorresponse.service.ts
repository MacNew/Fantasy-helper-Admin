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

  public errorHandling(error: HttpErrorResponse) {
    return Observable.throw('Something bad happened; please try again later.'+error.message);
  }
  
}
