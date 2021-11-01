import { PartsService } from './../services/parts.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PartItem } from '../models/parts.model';

@Injectable()
export class CatalogResolver implements Resolve<PartItem[]> {

  constructor(private partsService: PartsService) { }

  resolve() {
    return this.partsService.getItems();
  }
}
