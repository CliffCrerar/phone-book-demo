import { NgModule } from "@angular/core";
import { NbLayoutModule, NbButtonModule, NbCardModule, NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations:[
        
    ],
    imports:[
        CommonModule
    ],
    exports:[
        NbLayoutModule,
        NbEvaIconsModule,
        NbButtonModule,
        NbCardModule
    ]
})
class AppNebularModule {};

export {AppNebularModule,NbThemeModule} 