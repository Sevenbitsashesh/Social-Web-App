import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UseractivityService } from '../useractivity/useractivity.service';
@Component({
  selector: 'app-usersetting',
  templateUrl: './usersetting.component.html',
  styleUrls: ['./usersetting.component.scss']
})
export class UsersettingComponent implements OnInit {
options: CameraOptions;
profileImg;
  constructor(public camera: Camera, public uactivity: UseractivityService ) {
    this.options  = {
     quality:  100,
     allowEdit: true,
     sourceType: this.camera.PictureSourceType.CAMERA,
     saveToPhotoAlbum: true,
     correctOrientation: true,
     destinationType: camera.DestinationType.FILE_URI,
     encodingType: camera.EncodingType.JPEG,
     mediaType: camera.MediaType.PICTURE
   };
  }

  ngOnInit() {
  }
  profClick() {
    console.log('profile clicked');
    this.camera.getPicture(this.options).then((imageData) => {
      // const imgType = 'data:image/jpeg;base64,' + image;
      // const fname = imageData.substring(imageData.lastindexof('/') + 1);
      // const path =  imageData.substring(0, imageData.lastIndexOf('/') + 1);
      // this.profileImg.readAsDataURL(path, fname).then(file => this.profileImg = file );
      this.profileImg = imageData;
      if (this.profileImg) {
          this.uactivity.uploadImage(this.profileImg);
      }
    }, (err) =>
    console.log(err)
    ) ;
  }
}
