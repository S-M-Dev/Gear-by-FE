import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PartItem } from '../../models/parts.model';

@Component({
  selector: 'gear-by-part-item',
  templateUrl: './part-item.component.html',
  styleUrls: ['./part-item.component.scss']
})
export class PartItemComponent {
  @Input() item: PartItem;
  @Output() openModal = new EventEmitter();
}
