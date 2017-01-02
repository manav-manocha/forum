import { Component, OnInit } from '@angular/core';
import { AppState } from './../app.service';

import { ForumService } from './services/forum.service';

@Component({
  selector: 'forum',
  templateUrl: './forum.template.html'
})
export class ForumComponent implements OnInit {
  embedMode : boolean = false;
  forumData;
  forumKeys;
  topics;

  constructor(public appState : AppState, private forumService:ForumService){

  }
  ngOnInit() {
     this.embedMode = this.appState.isPropertyExist('embedMode');
     this.forumData = this.forumService.getForumData();
     this.appState.set('posts',this.forumData);
     this.forumKeys =  Object.keys(this.forumData[0]);
     this.topics = this.forumData.map(el => el.topic);
  }

  
  getPosts(){
    this.forumData = this.appState.get('posts');
    console.log(this.forumData);
  }

}
