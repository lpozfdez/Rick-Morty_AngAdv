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

  getCharacterById( id:string ): Observable<Character | undefined>{
    return this.httpClient.get<Character>(`${this.baseUrl}/character/${id}`)
    .pipe(
      catchError( e => of(undefined) )
    )
  }

  getSuggestions( query: string ): Observable<Character[]>{
    return this.httpClient.get<Character[]>(`${this.baseUrl}/character?q=${ query }&limit=6`);
  }

  addCharacter( Character: Character): Observable<Character>{
    return this.httpClient.post<Character>( `${ this.baseUrl }/character`, Character );
  }

  updateCharacter( Character: Character): Observable<Character>{
    if(!Character.id) throw Error('Character id is required');
    return this.httpClient.patch<Character>( `${ this.baseUrl }/character/${ Character.id }`, Character );
  }

}
