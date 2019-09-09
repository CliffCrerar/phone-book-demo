import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../_services/display-data.service';
import { InterComponentCommsService } from '../_services/intercomp-comms.service';

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
  constructor(private uiService: AppDataService,private msgService: InterComponentCommsService) { 
    this.subHeaderTitle = this.uiService.getGeneralData().subHeaderTitle;
  }
  /* INIT HOOK */
  ngOnInit() {
    this.msgService.subScribeToMessages().subscribe(msg => {
      switch(msg){
        case 'search': this.toggleSearchInput();
      }
    });
  }

  /* CLASS METHODS */

  toggleSearchInput(): string{
    return this.inputDisplay === 'hidden' ? this.inputDisplay = 'visible' : this.inputDisplay = 'hidden';
  }

}
