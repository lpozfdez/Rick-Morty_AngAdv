import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Episode } from '../models/Episode.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private httpClient: HttpClient) { }

  getEpisode(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/episode`);
  }

  getEpisodeById( id:string ): Observable<Episode | undefined>{
    return this.httpClient.get<Episode>(`${this.baseUrl}/episode/${id}`)
    .pipe(
      catchError( e => of(undefined) )
    )
  }

}
