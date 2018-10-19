import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthServic } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'MyM-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(
    private authService:AuthServic,
    private router:Router
    ) { }


  date: Date = new Date();

  user: User;


  ngOnInit() {
    this.user = JSON.parse( window.localStorage.getItem('user'))
  }


  onLogout(){
    this.authService.logOuth();
    this.router.navigate(['/login'])
  }
}
