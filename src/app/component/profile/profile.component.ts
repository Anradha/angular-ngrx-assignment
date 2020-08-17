import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProfileSetup } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  errorMessage: string | null;
  getState: Observable<any>;
  currentPage = 1;
  form1: FormGroup = new FormGroup({});
  form2: FormGroup = new FormGroup({});
  form3: FormGroup = new FormGroup({});
  form4: FormGroup = new FormGroup({});

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder) {
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
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
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
    this.errorMessage = '';
    const profilePayload = {
      firstname: this.form1.get('firstname').value,
      lastname: this.form1.get('lastname').value,
      phonenumber: this.form1.get('phonenumber').value,
      screenname: this.form1.get('screenname').value,
      address: this.form3.get('address').value,
      country: this.form3.get('country').value,
      zipcode: this.form3.get('zipcode').value,
      state: this.form3.get('state').value,
      city: this.form3.get('city').value,
      securityq1: this.form4.get('question1').value,
      securityans1: this.form4.get('answer1').value,
      securityq2: this.form4.get('question2').value,
      securityans2: this.form4.get('answer2').value
    };
    this.store.dispatch(new ProfileSetup(profilePayload));
  }

}
