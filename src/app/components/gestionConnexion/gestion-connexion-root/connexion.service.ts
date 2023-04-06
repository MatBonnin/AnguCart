import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class ConnexionService {
  private displayComponent = new BehaviorSubject<boolean>(false);
  displayComponent$ = this.displayComponent.asObservable();

  constructor(private http: HttpClient) { }



  addProfile(profile:any) {
    console.log(profile)

    try{
      this.http.put('http://localhost:3010/api/profiles',profile).subscribe((data:any)=>{
        console.log(data)
      })
    }
    catch(e){
      console.log(e)
    }
  }

  login(identifiants:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3010/api/login',identifiants)
        .subscribe((response) => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

}
