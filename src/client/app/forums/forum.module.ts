import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ForumComponent } from './forum.component.ts';
import { ForumService } from './services/forum.service';
import { AddPostFormComponent } from './forms/addNewPost/addPost.component';

export const routes = [
  { path: '', component: ForumComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule.forChild(routes) ],
  providers: [ForumService],
  declarations: [ ForumComponent, AddPostFormComponent]
})
export default class ForumModule {
  static routes = routes;
}
