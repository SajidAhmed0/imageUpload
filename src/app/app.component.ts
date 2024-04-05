import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/compat/storage'
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AngularFireModule,
    AngularFireStorageModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'imageupload';
  url: string = '';

  constructor(
    private fireStorage: AngularFireStorage
  ) {}

  async onFileChange(event: any){
    const file = event.target.files[0];


    if(file){
      const path = `yt/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      this.url = await uploadTask.ref.getDownloadURL();
      console.log(this.url);
      
    }
  }

  deleteImage(): Observable<void> {
    const storageRef = this.fireStorage.refFromURL("https://firebasestorage.googleapis.com/v0/b/my-application-fac93.appspot.com/o/yt%2FScreenshot%202023-07-09%20at%2019.39.37.jpg?alt=media&token=0fa94415-3967-4d6f-b177-f7244c0d9856");
    return storageRef.delete();
  }
}
