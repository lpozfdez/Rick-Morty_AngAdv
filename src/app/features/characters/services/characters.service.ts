import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { Character } from '../models/Character.model';


@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private httpClient: HttpClient) { }

  getCharacters(page: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/character/?page=${page}`);
  }

  getAllCharacters(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/character`).pipe(
      switchMap(response => {
        const totalPages = response.info.pages;
        const requests = [];

        for (let i = 1; i <= totalPages; i++) {
          requests.push(this.httpClient.get<any>(`https://rickandmortyapi.com/api/character?page=${i}`));
        }

        return forkJoin(requests);

      }),
      map(pages => pages.flatMap(page => page.results)),
      tap(allCharacters => console.log('Personajes combinados:', allCharacters))
    )
  }

  getCharacterById( id:string ): Observable<Character | undefined>{
    return this.httpClient.get<Character>(`${this.baseUrl}/character/${id}`)
    .pipe(
      catchError( e => of(undefined) )
    )
  }

  getSuggestions( query: string ): Observable<Character[]>{
    return this.httpClient.get<Character[]>(`${this.baseUrl}/character?q=${ query }&limit=6`);
  }

  addCharacter( character: Character): Observable<Character>{
    alert(JSON.stringify(character, null, 2));
    return of(character);
  }

  updateCharacter( character: Character): Observable<Character>{
    if(!character.id) throw Error('Character id is required');
    return this.httpClient.patch<Character>( `${ this.baseUrl }/character/${ character.id }`, character );
  }

}
