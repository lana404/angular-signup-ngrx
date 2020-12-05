import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { props, Store } from '@ngrx/store';
import { Signup } from '../../models/signup';
import { addImage } from '../store/action/singup.actions';
import * as progressAction from '../store/action/progressbar.actions';
import { read } from 'fs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  public _formGroup: FormGroup;
  protected img = {
    pic: '',
    sigpic: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<Signup>
  ) {
    this._formGroup = this.formBuilder.group({
      pic: new FormControl(null), 
      sigpic: new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

  nextButton(): void {
    this.store.dispatch(addImage(this.img));
    this.store.dispatch(progressAction.incProgressbars());
    this.router.navigate(['signup/success']); 
  }
  
  getImage(event: any, btnName: string) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (progress: ProgressEvent) => {
        let data = (<FileReader>progress.target).result; 

        if(btnName == 'pic') this.img.pic = data.toString();
        else if (btnName == 'sigpic') this.img.sigpic = data.toString();
      }
    }

    console.log(this.img)
  } 

  prevButton(): void {
    this.router.navigate(['signup/personal']);
  }
}
