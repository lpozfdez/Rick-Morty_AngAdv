import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
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
    return this.httpClient.get<any>(`${this.baseUrl}/character`);
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
    // return this.httpClient.post<Character>( `${ this.baseUrl }/character`, Character );
  }

  updateCharacter( character: Character): Observable<Character>{
    if(!character.id) throw Error('Character id is required');
    return this.httpClient.patch<Character>( `${ this.baseUrl }/character/${ character.id }`, character );
  }

}
