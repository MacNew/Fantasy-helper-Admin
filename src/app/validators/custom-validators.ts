import { ValidatorFn, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class CustomValidators {
    static fileVlidation(ac:AbstractControl) : ValidationErrors {
        const isValidFileFormat = CustomValidators.validateFile(ac.value)
        return isValidFileFormat ? null : {isValidFileFormat: true};
    }

static validateFile(filetype: string) {
    
      var myextenstion =filetype.substring(filetype.lastIndexOf('.')+1, filetype.length) || filetype;
      var validFileExtensions = ['jpg','jpeg','bmp','gif','png'];
      return validFileExtensions.includes(myextenstion);
       
 }
}









