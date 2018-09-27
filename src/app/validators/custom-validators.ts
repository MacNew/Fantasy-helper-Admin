import { ValidatorFn, AbstractControl, ValidationErrors, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {FormControl} from '@angular/forms';
export class CustomValidators {
    static fileVlidation(ac:AbstractControl) : ValidationErrors {
        const isValidFileFormat = CustomValidators.validateFile(ac.value)
        return isValidFileFormat ? null : { isValidFileFormat: true };
    }

    static matchClub(ac: FormControl) {
        return new Promise( resolve => {
          let winerClub = ac.parent.controls['winerClub'].value; 
          let runnerUpClub = ac.value; 
          if(winerClub != runnerUpClub) {
            return resolve(null); 
          } else {
             return resolve({"not_match": true})
          }
       });
    }

    static matchClubsecond(ac: FormControl) {
        return new Promise( resolve => {
          let winerClub = ac.parent.controls['runnerUpClub'].value; 
          let runnerUpClub = ac.value; 
          if(winerClub != runnerUpClub) {
            return resolve(null); 
          } else {
             return resolve({"not_match": true})
          }
       });
    }

static validateFile(filetype: string) {
      if (filetype!= null) {
      var myextenstion =filetype.substring(filetype.lastIndexOf('.')+1, filetype.length) || filetype;
      var validFileExtensions = ['jpg','jpeg','bmp','gif','png','JPG'];
      return validFileExtensions.includes(myextenstion);
      }
      return null;    
 }
}









