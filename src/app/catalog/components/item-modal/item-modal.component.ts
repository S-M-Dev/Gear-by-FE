import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartItem } from '../../models/parts.model';

@Component({
  selector: 'gear-by-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss']
})
export class ItemModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: PartItem) { }

  ngOnInit(): void {
  }

}
