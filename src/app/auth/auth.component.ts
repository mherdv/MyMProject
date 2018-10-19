import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'MyM-name',
    templateUrl: './auth.component.html',
    // styleUrls: ['./name.component.scss']
})
export class AuthComponent implements OnInit {
    constructor(private route: Router) { }
    
    ngOnInit(): void { 
        this.route.navigate(['/login']);
    }
}
