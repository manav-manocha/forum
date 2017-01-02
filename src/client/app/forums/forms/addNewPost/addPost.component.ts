import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {NgForm} from '@angular/forms';

import { AppState } from './../../../app.service';
import { ForumService } from './../../services/forum.service';

@Component({
  selector: 'add-post-form',
  templateUrl: './addPost.template.html'
})
export class AddPostFormComponent implements OnInit {
  model:Model;
  topics:string[];
  @Output() postSubmitted:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public appState : AppState, private forumService:ForumService){

  }
  ngOnInit() {  
     this.topics = this.forumService.getForumData().map(el => el.topic);
     this.model = {text:'',topic:'', author:'',replies:[], };
  }

  onSubmit(form: NgForm){
    let formData:any[] = this.appState.get('posts');
    formData.push(this.model);
    this.appState.set('posts', formData);
    this.postSubmitted.emit(true);
    //reset model and form
    this.model = {text:'',topic:'', author:'', replies:[],created:''};
    form.reset();
  }
}

type Model = {
  text:string;
  topic:string;
  author:string;
  created:string
  replies:Reply[]
} 

type Reply = {
  text:string;
  author:string;
  created:string
}


