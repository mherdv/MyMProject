import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { BaseApi } from '../core/base-api';

@Injectable()
export class UsersService extends BaseApi{

    constructor(public http: Http) {
        super(http);
    }

    // getUserByEmail(email: string): Observable<User> {
    //     return this.http.get(`http://localhost:3000/users?email=${email}`)
    //         .pipe(
    //             map((respons: Response) => {
    //                 return respons.json()
    //             }),
    //             map((user: User[]) => user[0] ? user[0] : undefined))
    // }

    // createNewUser(user: User): Observable<User> {
    //     return this.http.post('http://localhost:3000/users', user)
    //         .pipe(
    //             map(
    //                 (respons: Response)=> respons.json()
    //             ) 
    //         )
    // }
    getUserByEmail(email: string): Observable<User> {
        return this.get(`users?email=${email}`)
            .pipe(
                map((user: User[]) => user[0] ? user[0] : undefined)
            )
    }

    createNewUser(user: User): Observable<User> {


        return this.post(`users`,user)
    }
}
