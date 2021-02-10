import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private tokenSubject: BehaviorSubject<string>;
    public token: Observable<string>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.tokenSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('token')));
        this.token = this.tokenSubject.asObservable();
    }

    public get tokenValue(): string {
        return this.tokenSubject.value;
    }

    login(username: string, password: string) {
        console.log('hello world');
        return this.http.post<any>(`${environment.apiFullUrl}/authenticate`, { username, password })
        // .subscribe(result => { console.log('result', result); });
            .pipe(map(result => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(result.token));
                this.tokenSubject.next(result.token);
                return result.token;
            }));
    }

    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        this.tokenSubject.next(null);
        this.router.navigate(['/login']);
    }
}
