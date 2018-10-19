import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, EmailValidator, Validators } from '@angular/forms';
import { UsersService } from '../../sheard/services/users.service';
import { User } from '../../sheard/models/user.model';
import { Massage } from '../../sheard/models/massage.model';
import { AuthServic } from '../../sheard/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'MyM-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private authService: AuthServic,

    private router: Router,
    private rout: ActivatedRoute,

    private title:Title,
    private meta:Meta
  ) {
    title.setTitle('login page')
    
   }

  massage: Massage;

  formLogin: FormGroup;
  ngOnInit(): void {

    this.massage = new Massage("danger", '');


    this.formLogin = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })

    this.rout.queryParams.subscribe((params: Params) => {
      if (params['nawCanLogin']) {
        this.showMassage({
          text:'success registration',
          type: 'success'
        }) 
      }else if(params['accessDenied']){
        this.showMassage({
          text:'you are not log in',
          type: 'warning'
        }) 
      }

    })
  }

  private showMassage(massage:Massage) {
    this.massage = massage
  }

  onSubmit() {
    console.log(this.formLogin)
    const formData = this.formLogin.value;

    this.userService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.massage.text = '';

            window.localStorage.setItem('user', JSON.stringify(user))
            this.authService.login();
            this.router.navigate(['/sistem','bill'])
          }
          else {
            this.showMassage({
              text:'wrong password',
              type: 'danger'
            })
          }
        } else {
          this.showMassage({
            text:'np user like it',
            type: 'danger'
          })
        }
        window.setTimeout(() => {
          this.massage.text = '';
        }, 5000)
      })

  }

}
