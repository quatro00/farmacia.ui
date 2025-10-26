import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AltasService {

  service:string = 'Altas';


  constructor(private http:HttpClient, private cookieService: CookieService) { }


  GetAltas(desde, hasta):Observable<any[]>{
    let params = new HttpParams();
    params = params.append('desde', desde);
    params = params.append('hasta', hasta);

    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/${this.service}/GetAltas`,{params});
  }

  EliminarArchivo(id):Observable<any>{
    return this.http.post<any[]>(`${environment.apiBaseUrl}/api/${this.service}/EliminarArchivo`,{id:id});
  }

  UploadFile(formData:FormData):Observable<any>{
    return this.http.post<any>(`${environment.apiBaseUrl}/api/${this.service}/UploadFile`,formData);
  }
}