import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-profilepic',
  templateUrl: './profilepic.component.html',
  styleUrls: ['./profilepic.component.scss']
})
export class ProfilepicComponent implements OnInit {

  constructor(public dialogRef : MatDialogRef<ProfilepicComponent>) { }

  ngOnInit() {
  }
  imageChangedEvent: any = '';
  croppedImage;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event:any) {
  console.log(event);
  this.croppedImage = event;
  }
   
  setProfile()
  {
    if(this.croppedImage!=null)
    {
      this.dialogRef.close(this.croppedImage);
    }
  }

// imageChangedEvent: any = '';
// croppedImage: any = '';
// crop:any;

// fileChangeEvent(event: any): void {
//     this.imageChangedEvent = event;
// }

// imageCropped(event: ImageCroppedEvent) {
//   console.log(event);
  
//     this.croppedImage = event.base64;
//     this.crop=event;
// }
// // imageLoaded() {
// //     // show cropper
// // }
// // loadImageFailed() {
// //     // show message
// // }

// setProfile(){
//   console.log("Cropped Image:",this.croppedImage);
//   this.dialogRef.close(this.croppedImage);
// }

}
