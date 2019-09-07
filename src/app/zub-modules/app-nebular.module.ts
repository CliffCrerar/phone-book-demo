import { NgModule } from "@angular/core";
import { NbLayoutModule, NbButtonModule, NbCardModule, NbThemeModule, NbIconModule } from '@nebular/theme';
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
        NbIconModule,
        NbButtonModule,
        NbCardModule
    ]
})
class AppNebularModule {};

export {AppNebularModule,NbThemeModule} 