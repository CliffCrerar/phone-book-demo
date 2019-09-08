import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../_services/display-data.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  /* CLASS ATTRIBUTES */
  inputDisplay='hidden';
  subHeaderTitle: string;
  /* CLASS CONSTRUCTOR */
  constructor(private uiService: AppDataService) { 
    this.subHeaderTitle = this.uiService.getGeneralData().subHeaderTitle;
  }
  /* INIT HOOK */
  ngOnInit() {
  }

}
