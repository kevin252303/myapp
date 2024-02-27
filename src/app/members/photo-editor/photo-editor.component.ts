import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member:Member | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseurl = environment.apiurl;
  user : User | undefined;

  constructor(private accountservice : AccountService, private memberservice:MembersService){
    this.accountservice.currentUser$.pipe(take(1)).subscribe({
      next:user=>{
        if(user) this.user = user;
      }
    })
  }
  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo :photo){
    this.memberservice.setMainPhoto(photo.id).subscribe({
      next:()=>{
        if(this.user && this.member){
          this.user.photoUrl = photo.url;
          this.accountservice.setCurrentUser(this.user);
          this.member.photourl = photo.url;
          this.member.photo.forEach(p=>{
            if(p.isMain) p.isMain=false;
            if(p.id == photo.id)p.isMain = true
          })
        }
      }
    })
  }

  deletePhoto(photoId:number){
    this.memberservice.deletePhoto(photoId).subscribe({
      next:_=>{
        if(this.member){
          this.member.photo = this.member.photo.filter(x=>x.id !== photoId);
        }
      }
    })
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url : this.baseurl + 'users/add-photo',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10 * 1024 * 1024
    })

    this.uploader.onAfterAddingFile = (file) =>{
      file.withCredentials = false
    }

    this.uploader.onSuccessItem=(item,response,status,header)=>{
      if(response){
        const photo = JSON.parse(response);
        this.member?.photo.push(photo);
      }

    }
  }

}
