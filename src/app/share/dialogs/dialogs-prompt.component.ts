import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './dialogs-prompt.component.html'
})
export class DialogsPromptComponent {

  message = '';
  showMainParagraph: boolean;
  cancelable: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogsPromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.showMainParagraph = this.setDefault(this.data.showMainParagraph, true);
    this.cancelable = this.setDefault(this.data.cancelable, true);
    this.data.okClick = this.setDefault(this.data.okClick, this.close.bind(this));
  }

  ok() {
    this.data.okClick();
  }

  close() {
    this.dialogRef.close();
  }

  closeAlert() {
    this.message = '';
  }

  setDefault(value, dfault) {
    return value === undefined ? dfault : value;
  }

}