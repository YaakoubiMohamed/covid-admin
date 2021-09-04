import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import firebase from 'firebase';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-modifier-article',
  templateUrl: './modifier-article.component.html',
  styleUrls: ['./modifier-article.component.css']
})
export class ModifierArticleComponent implements OnInit {

  articleForm: FormGroup;
    submitted = false;
  date: Date;
  article: any;
  public uploadTask: firebase.storage.UploadTask;
  arr: any;
  photo: any;
  @ViewChild("img") img: ElementRef;

    constructor(private formBuilder: FormBuilder, private articleservice: ArticleService,private router: Router) { }

    ngOnInit() {
      this.article = JSON.parse(localStorage.getItem('article'));
      this.date = new Date();
        this.articleForm = this.formBuilder.group({
            titre: [this.article.titre, Validators.required],
            date: [this.date],
            contenu: [this.article.contenu, Validators.required],
            categorie: [this.article.categorie, Validators.required],
            image: [this.article.image,]
            
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.articleForm.controls; }

    onSubmit() {
      
        this.submitted = true;

        // stop here if form is invalid
        if (this.articleForm.invalid) {
            return;
        }
        else
        {
          console.log(this.articleForm.value);
          let photo = this.img.nativeElement.value;
          this.articleForm.get("image").setValue(photo);
          console.log(this.articleForm.value);
          // display form values on success
         this.articleservice.modifierArticles(this.articleForm.value,this.article.uid);
         this.router.navigate(['/articles']);
        }
    }

    onReset() {
        this.submitted = false;
        this.articleForm.reset();
    }

    upload(f, img) {

      const storageReference = firebase.storage().ref('/images/' + f.files[0].name);
      this.uploadTask = storageReference.put(f.files[0]);
      this.uploadTask.on('state_changed', function (snapshot) {
  
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
  
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function (error) {
        // Handle unsuccessful uploads
      }, function () {
  
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        storageReference.getDownloadURL().then(function (url) {
          // Insert url into an <img> tag to "download"
          //img.src = url;
          img.value = url;
         // this.photo = url;
          //this.img = url;
          console.log(img.value);
        });
  
      });
    }


}
