import { Component } from "@angular/core";

@Component({
    selector: 'bg-author',
    template: `
        <a class="picture-credit" href="https://unsplash.com/@quinoal?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Quino Al">
            <span style="display:inline-block;padding:2px 3px">
                <svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
                </svg>
            </span>
            <span style="display:inline-block;padding:2px 3px">Quino Al</span>
        </a>
    `,
    styleUrls: ['./login.component.scss']
})
export class LoginBackgroundAuthorComponent { }