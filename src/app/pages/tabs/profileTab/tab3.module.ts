import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { ProfileCardComponent } from '../../../component/profile-card/profile-card.component';
import {IOSFilePicker} from "@ionic-native/file-picker/ngx";
import { File } from '@ionic-native/file/ngx';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild([{path: '', component: Tab3Page}]),
        Tab3PageRoutingModule,
    ],
    exports: [
        ProfileCardComponent
    ],
    declarations: [Tab3Page, ProfileCardComponent],
  providers: [IOSFilePicker, File]
})
export class Tab3PageModule {}
