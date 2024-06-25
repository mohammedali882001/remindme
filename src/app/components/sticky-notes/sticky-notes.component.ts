import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToDoListDto } from '../../models/ToDoList/to-do-list-dto';
import { ToDoListService } from '../../services/ToDoListServices/to-do-list.service';

@Component({
  selector: 'app-sticky-notes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sticky-notes.component.html',
  styleUrl: './sticky-notes.component.css'
})
export class StickyNotesComponent implements OnInit {
  notes: ToDoListDto[] = [];

  constructor(private toDoListService: ToDoListService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.toDoListService.getAll().subscribe(response => {
      if (response.isSuccess) {
        this.notes = response.data;
      }
    });
  }

  addNote() {
    const newNote: ToDoListDto = { name: 'New Name', description: 'New Description' };
    this.toDoListService.add(newNote).subscribe(response => {
      if (response.isSuccess) {
        this.notes.push(response.data);
      }
    });
  }

  
  updateNote(index: number, event: any) {
    const noteName = event.target.querySelector('h2').textContent;
    const noteDescription = event.target.querySelector('p').textContent;
    const updatedNote: ToDoListDto = { name: noteName, description: noteDescription };
    const noteId = this.notes[index].id;

    this.toDoListService.edit(noteId!, updatedNote).subscribe(response => {
      if (response.isSuccess) {
        this.notes[index] = response.data;
      }
    });
  }

  deleteNote(index: number) {
    const noteId = this.notes[index].id;
    this.toDoListService.delete(noteId!).subscribe(response => {
      if (response.isSuccess) {
        this.notes.splice(index, 1);
      }
    });
  }
}
