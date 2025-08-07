import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Character } from '../models/Character.model';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-characters-new',
  templateUrl: './characters-new.component.html',
  styleUrls: ['./characters-new.component.scss']
})
export class CharactersNewComponent {

  form: FormGroup;

  stringFields: { key: string; label: string; type?: string; options?: string[] }[] = [
    { key: 'name', label: 'Nombre', type: 'text' },
    { key: 'status', label: 'Estado', type: 'select', options: ['Alive', 'Dead', 'unknown'] },
    { key: 'species', label: 'Especie', type: 'text' },
    { key: 'type', label: 'Tipo', type: 'text' },
    { key: 'gender', label: 'Género', type: 'select', options: ['Male', 'Female', 'Genderless', 'unknown'] },
    { key: 'image', label: 'Imagen', type: 'file' },
    { key: 'originName', label: 'Lugar de origen', type: 'text' },
    { key: 'locationName', label: 'Localización actual', type: 'text' },
    { key: 'episodeString', label: 'Episodios', type: 'textarea' },
  ];


  constructor(private fb: FormBuilder, private router: Router, private characterServ: CharactersService) {
    this.form = this.fb.group({
      name: [''],
      status: [''],
      species: [''],
      type: [''],
      gender: [''],
      image: [''],
      originName: [''],
      locationName: [''],
      episodeString: [''],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.form.patchValue({ image: reader.result });
    };

    reader.readAsDataURL(file);
  }

  save() {
    const formValue = this.form.value;

    const newCharacter: Character = {
      id: Date.now(),
      name: formValue.name,
      status: formValue.status,
      species: formValue.species,
      type: formValue.type,
      gender: formValue.gender,
      image: formValue.image,
      origin: {
        name: formValue.originName,
        url: ''
      },
      location: {
        name: formValue.locationName,
        url: ''
      },
      episode: formValue.episodeString.split(',').map((e: string) => e.trim()),
      url: '',
      created: new Date()
    };

    console.log('Nuevo personaje creado:', newCharacter);

    this.characterServ.addCharacter(newCharacter).subscribe(() => this.router.navigate(['/characters/list']));

    this.router.navigate(['/characters/list']);
  }

  close() {
    this.router.navigate(['/characters/list']);
  }
}
