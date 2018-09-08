import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { MessageService } from '../../share/message.service'
import { SpringService } from '../../share/springService/spring.service'
import { Clubs } from '../../share/clubname';
import { HttperrorresponseService } from '../../share/httpErrorHandlingService/httperrorresponse.service'
import { catchError, switchMap, mergeMap } from 'rxjs/operators';
import { CustomValidators } from '../../validators/custom-validators';
import { MatTableDataSource } from '@angular/material';
import { takeUntil,map } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-insert-player',
  templateUrl: './insert-player.component.html',
  styleUrls: ['./insert-player.component.css']
})
export class InsertPlayerComponent implements OnInit {
  clublist: clubDetails[]=[];
  clubImage: any;
  playerImage: any;
  selectedFile = null;
 
  player = {
    playerclubName: ['',Validators.required],
    playerName: ['',Validators.required],
    file: ['',Validators.compose([
      Validators.required, CustomValidators.fileVlidation
    ])]
  }
  private playerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private springService: SpringService,
    private handleError: HttperrorresponseService,
    private sanitizer: DomSanitizer
    ) {
     this.playerForm = this.formBuilder.group(this.player);
     }

  ngOnInit() {
    this.assignedClubName();       
  }

  assignedClubName() {
     this.springService.getAllClubs()
     .subscribe((data:any)=>{
      data.forEach(element => {
        this.clublist.push(Object.assign({clubName: element.clubName,id:element.id}));
      });
     });
  } 
  clubNameChanged(event) {
       this.springService.getFileName(event).pipe(
         catchError(this.handleError.errorHandling),
         switchMap((res: any)=> {
           return  this.springService.downloadFile(res['fileName'].toString());
         })
       ).subscribe((res:any)=>{
         let UrlCreator = window.URL;
         this.clubImage = this.sanitizer.bypassSecurityTrustUrl(
         UrlCreator.createObjectURL(res))
    }, error=>{
       this.messageService.showMessage(error.message);
    });
  }
    
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.playerImage = reader.result.toString();  
    reader.readAsDataURL(this.selectedFile);
  }
}

export interface clubDetails {
  clubName: any;
  id: any;
}