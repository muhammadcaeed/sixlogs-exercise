import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../model/user';

@Injectable()
export class CrudService {
  constructor(private http: Http) { }

  private url = 'http://localhost:3000/';

  newUser(user: User): Observable<User[]> {
    let userString = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, user, options)
                                    .map((res: Response) => res.json())
                                    .catch((error: any) => Observable.throw('Server error'));
  }

  updateUser(id, user: User): Observable<User[]> {
    let userString = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.url + id, user, options)
                                    .map((res: Response) => res.json())
                                    .catch((error: any) => Observable.throw('Server error'));
  }

  getUsers() : Observable<User[]> {
         return this.http.get(this.url)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw('Server error'));

     }

     deleteUser(id): Observable<User> {
       return this.http.delete(this.url + id)
                              .map((res: Response) => res.json())
                              .catch((error: any) => Observable.throw('Server error'));
     }
}
