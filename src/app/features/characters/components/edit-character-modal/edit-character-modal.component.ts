import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Character } from '../../models/Character.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-character-modal',
  templateUrl: './edit-character-modal.component.html',
  styleUrls: ['./edit-character-modal.component.scss']
})
export class EditCharacterModalComponent {

  @Input() character?: Character | null;
  @Input() visible = false;
  @Output() closed = new EventEmitter<void>();
  @Output() updated = new EventEmitter<Character>();

  form: FormGroup;

  // Campos de tipo string del modelo que queremos mostrar
  stringFields: { key: string; label: string }[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'status', label: 'Estado' },
    { key: 'species', label: 'Especie' },
    { key: 'type', label: 'Tipo' },
    { key: 'gender', label: 'Género' },
  ];

  constructor(private fb: FormBuilder) {
    // Creamos el formGroup dinámico basado en stringFields
    const groupConfig = this.stringFields.reduce((config, field) => {
      config[field.key] = [''];
      return config;
    }, {} as { [key: string]: any });

    this.form = this.fb.group(groupConfig);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['character'] && this.character) {
      const patch: any = {};
      this.stringFields.forEach(f => {
        patch[f.key] = this.character![f.key as keyof Character] || '';
      });
      this.form.patchValue(patch);
    }
  }

  close() {
    this.closed.emit();
  }

  save() {
    if (!this.character) return;

    const updatedCharacter = { ...this.character, ...this.form.value };

    this.updated.emit(updatedCharacter);
    this.close();
  }

}
