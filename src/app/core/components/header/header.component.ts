import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { PartItem } from 'src/app/catalog/models/parts.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'gear-by-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchForm = new FormControl();
  filteredOptions$: Observable<PartItem[]>;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.filteredOptions$ = this.searchForm.valueChanges.pipe(
      debounceTime(300),
      switchMap((value) => this.searchService.performGlobalSearch(value))
    );
  }

}
