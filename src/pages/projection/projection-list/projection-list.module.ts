import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectionListPage } from './projection-list';

@NgModule({
  declarations: [
    ProjectionListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectionListPage),
  ],
})
export class ProjectionListPageModule {}
