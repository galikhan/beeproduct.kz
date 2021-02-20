import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private http: HttpClient) { }

  upload(container: number, formData: FormData): Observable<any> {
    return this.http.post(environment.apiFullUrl + '/container/' + container + '/file',
      formData,
      { reportProgress: true, observe: 'events' });
  }

  findByContainer(container: number): Observable<any> {
    return this.http.get(environment.apiFullUrl + '/container/' + container + '/file');
  }


}
