import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Episode } from '../models/Episode.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private httpClient: HttpClient) { }

  // TODO arreglar
  getEpisode(): Observable<any> {
    return this.httpClient.get<any>('https://rickandmortyapi.com/api/episode').pipe(
      switchMap(response => {
        const totalPages = response.info.pages;
        const requests = [];

        for (let i = 1; i <= totalPages; i++) {
          requests.push(this.httpClient.get<any>(`https://rickandmortyapi.com/api/episode?page=${i}`));
        }
        console.log(of(requests));
        return of(requests);
      })
    );
  }

  getEpisodeById( id:string ): Observable<Episode | undefined>{
    return this.httpClient.get<Episode>(`${this.baseUrl}/episode/${id}`)
    .pipe(
      catchError( e => of(undefined) )
    )
  }

}
