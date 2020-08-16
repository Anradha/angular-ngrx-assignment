import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentPage = 2;
  form1: FormGroup = new FormGroup({});
  form2: FormGroup = new FormGroup({});
  form3: FormGroup = new FormGroup({});
  form4: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
    this.form1 = formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phonenumber: ['', [Validators.required]],
      screenname: ['', []]
    });
    this.form3 = formBuilder.group({
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
    this.form4 = formBuilder.group({
      question1: ['', [Validators.required]],
      question2: ['', [Validators.required]],
      answer1: ['', [Validators.required]],
      answer2: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get f1() {
    return this.form1.controls;
  }

  get f2() {
    return this.form2.controls;
  }

  get f3() {
    return this.form3.controls;
  }

  get f4() {
    return this.form4.controls;
  }

  bioDetailsSubmit() {
    this.currentPage = 2;
  }

  profilePictureSubmit() {
    this.currentPage = 3;
  }

  addressSubmit() {
    this.currentPage = 4;
  }

  securityQSubmit() {
    // todo
  }

}
