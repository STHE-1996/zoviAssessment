import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Posting } from 'src/app/models/posting';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uploadImage(posting: Posting) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}


  uploadProfilePicture(file: File, id: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
  
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
  
    return this.http.post(`${this.baseUrl}/profileProfilePicture/pic/${id}`, formData, { headers });
  }

  postToBackend(posting: Posting): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const postUrl = `${this.baseUrl}/postingTimeLine`; // Adjust the endpoint accordingly

    return this.http.post(postUrl, posting, httpOptions);
  }


  postToBackendImage(file: File, pic: string, id: string, title: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
  
    return this.http.post(`${this.baseUrl}/uploadImageTimeLine/${pic}/${id}/${title}`, formData, {headers});
}

  
  
}

