import { Component, OnInit } from '@angular/core';
import { RestService } from '../../Rest/rest.service';
import { PasswordValidator } from '../../Rest/validation';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { userInfo } from 'os';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  mobile: string;
  cpassword: string;
  address: string;
  dob: string;
  gender: string;
  myForm: FormGroup;
  matching_passwords_group: FormGroup;
  loggedEmail: string;
  saveProfile() {
    let model = {
      'userid': this.myForm.get('username').value,
      'email': this.myForm.get('email').value,
      'password': this.myForm.get('password').value,
      'address': this.myForm.get('address').value,
      'mobile': this.myForm.get('mobile').value,
       'gender': this.myForm.get('gender').value,
      'dob': this.myForm.get('dob').value
    }
      this.rest.addInfo(model);
     this.myForm.reset();
  }
  validation_messages = {
    'username': [
        { type: 'required', message: 'Username is required' },
        { type: 'minlength', message: 'Must be at least 5 characters long.' },
        { type: 'maxlength', message: 'Cannot be more than 25 characters long.' },
        { type: 'pattern', message: 'Must contain only numbers and letters.' }
      ],
      'mobile': [
        {type: 'required', message: 'Mobile is required.' },
        { type: 'minlength', message: 'Must be at least 10 characters.' },
        { type: 'maxlength', message: 'Cannot be more than 12 characters long.' },
        { type: 'pattern', message: 'Must contain only numbers' }
      ],
      'email': [
        {type: 'required', message: 'Email is required'},
        { type: 'pattern', message: 'Not valid email' }
      ],
      'password': [
        { type: 'required', message: 'Password is required'},
        { type: 'pattern', message: 'Minimum 8 and should include at least special charater'}
      ],
      'cpassword': [
        { type: 'areEqual', message: 'Confirm Password is not matched' }
      ],
      'address': [
        { type: 'pattern', message: 'Maximum 50 Character' }
      ]
    };
  ngOnInit() {
  }
  
  constructor(public rest: RestService, formBuilder: FormBuilder) {
    this.loggedEmail = rest.getLogged();
    this.myForm = formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])
      ),
      mobile: new FormControl('', Validators.compose([
        Validators.maxLength(12),
        Validators.minLength(10),
        Validators.pattern('^(0|[1-9][0-9]*)$'),
        Validators.required
      ])
      ),
      email: new FormControl({value: this.loggedEmail, disabled : true}, Validators.compose([
        Validators.required,
        // Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}')
      ])),
      cpassword: new FormControl('', Validators.compose([
        Validators.required
      ])),
      address: new FormControl('', Validators.compose([
        Validators.pattern('^[a-z]{1,100}$')
      ])),
      hobbies: new FormControl('', Validators.compose([
      ])),
      dob: new FormControl('', Validators.compose([
      ])),
      gender: new FormControl('Male', Validators.compose([
      ])),
        }
    );

}

}
