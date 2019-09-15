import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../_services/display-data.service';
import { InterComponentCommsService } from '../_services/intercomp-comms.service';
import { environment as env } from '../../environments/environment';
import { HttpService } from '../_services/http.service';
import { ContactsDisplayModel } from '../_models/contact.model';
import { SearchListItemModel } from '../_models/searchlist.model';
import { _ } from '../../utils/lodash';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  /* CLASS ATTRIBUTES */
  subHeaderTitle: string;
  showSearchLabel = !env.production;
  showHideSpyglass = true;
  searchableData: ContactsDisplayModel[];
  searchPhrase: string;
  searchResultSet: ContactsDisplayModel[];
  searchList: SearchListItemModel[] = [];


  /* CLASS CONSTRUCTOR */
  constructor(
    private uiService: AppDataService,
    private msgService: InterComponentCommsService,
    private http: HttpService
  ) {
    this.subHeaderTitle = this.uiService.getGeneralData().subHeaderTitle;
  }
  /* INIT HOOK */
  ngOnInit() {
    this.msgService.subScribeToMessages().subscribe(msg => {
      switch (msg.subject) {
        case 'search': this.toggleSearchInput(); break;
        case 'contact-data':
          this.searchableData = msg.body.table;
          this.searchList = this.createSearchLists(this.searchableData);
          break;
      }
    });
    // this.msgService.subscribeToFilterData().subscribe(filteredData => {
    //   console.log('filteredData: ', filteredData);
    // });
  }

  /* CLASS METHODS */

  /**
   * @description initialize searchable lists
   */
  // tslint:disable-next-line: max-line-length
  createSearchLists = (contactData: any): SearchListItemModel[] => contactData.flatMap(({ _id, FirstName, LastName }) => [{ id: _id, word: FirstName.toLocaleLowerCase() }, { id: _id, word: LastName.toLocaleLowerCase() }]);

  /**
   * TODO:
   */
  toggleSearchInput = (): boolean => this.showSearchLabel = !this.showSearchLabel;
  /**
   * @description show and hide spy glass on search component
   */
  handleSpyGlass = (eventTarget: EventTarget, eventType: string): void => {
    const InputTarget = eventTarget as HTMLInputElement;
    if (eventType === 'focus') {
      this.showHideSpyglass = false;
    } else if (eventType === 'blur' && InputTarget.value === '') {
      this.showHideSpyglass = true;
    }
  }

  /**
   * focus / blur Event
   */
  onFocusEvent = (event: Event) => this.handleSpyGlass(event.target, event.type);
  onBlurEvent = (event: Event) => this.handleSpyGlass(event.target, event.type);

  /**
   * keypress event
   */
  onKeyPress = (event: HTMLInputElement) => {
    const filter = event.value.toLocaleLowerCase();
    const filteredList = this.searchList
      .filter(a => a.word.includes(filter))
      .map(b => this.searchableData
        .filter(c => c._id === b.id)[0]);
    this.msgService.emitFilterData(_.uniqBy(filteredList, '_id'));
  }
}
