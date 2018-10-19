import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../sheard/services/users.service';
import { User } from '../../sheard/models/user.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'MyM-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  regForm: FormGroup;



  constructor(
    private usersService: UsersService,
    private router: Router,
    private title: Title
    
  ) { 
    title.setTitle('registration page')

  }

  ngOnInit() {
    this.regForm = new FormGroup({
      "email": new FormControl(null, [Validators.email, Validators.required], this.forbiddenEmails.bind(this) ),
      "password": new FormControl(null, [Validators.required, Validators.minLength(6)]),
      "name": new FormControl(null, [Validators.required]),
      "agree": new FormControl(false, [Validators.requiredTrue]),
    });
  }

  onSubmit() {
    const { email, password, name } = this.regForm.value;
    const user = new User(email, password, name);

    this.usersService.createNewUser(user)
      .subscribe((user: User) => {
        this.router.navigate(['/login'], {
          queryParams: {
            nawCanLogin: true
          }
        })
      })
  }

  forbiddenEmails(controls: FormControl): Promise<any> {

    return new Promise((res, rej) => {

      this.usersService.getUserByEmail(controls.value)
        .subscribe((user) => {
          if (user) {
            console.log(this.regForm)
            res({ forbiddenEmail: true })
          }
          else {
            console.log(this.regForm)
            res(null)
          }
        })
    })

  }
}
