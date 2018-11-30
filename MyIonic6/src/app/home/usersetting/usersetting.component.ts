import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions, MediaType } from '@ionic-native/camera/ngx';
import { UseractivityService } from '../useractivity/useractivity.service';
import { ActionSheetController } from '@ionic/angular';
import { async } from 'q';
@Component({
  selector: 'app-usersetting',
  templateUrl: './usersetting.component.html',
  styleUrls: ['./usersetting.component.scss']
})
export class UsersettingComponent implements OnInit {
options: CameraOptions;
profileImg: any;
fname: any;
upstatus;
profile;
  constructor(public camera: Camera, public uactivity: UseractivityService, public actionsheet: ActionSheetController ) {
    // console.log(uactivity.model.profile_pic);
    this.profileImg = uactivity.model.profile_pic;
  }

  ngOnInit() {
  }
  async actionForProfile() {
  const actions = await  this.actionsheet.create({
      buttons: [{
        text: 'Camera',
        icon: 'camera',
        handler: () => this.captureImage()
      },
      {
        text: 'Choose from Gallary',
        icon: 'albums',
        handler: () => this.selectPhoto()
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ]
    }
    );
  await actions.present();
  }
  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then(imageData => {
    this.uactivity.uploadPhoto(imageData);
    }, error => {
      console.log('error ' + JSON.stringify(error));
    });
     this.profileImg = this.uactivity.myPhoto;
  }
  captureImage() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.profileImg = imageData;
      // this.uactivity.uploadPhoto();
    }, error => {
      console.log('error ' + JSON.stringify(error));
    });
    this.profileImg = this.uactivity.myPhotoURL;
    this.profile = this.uactivity.myPhotoURL;
  }
  click() {
    console.log('clicked');
    this.uactivity.click();
  }
}
