import { Injectable } from '@angular/core' 

@Injectable()
export class ForumService{
 
 getForumData(){
     return testData;
 }

 addNewPost(){
     
 }

}

let testData= [
    {
        id: 'AfI65GL7zy',
        topic: 'science',
        text: 'test message 1',
        author: 'bismillah',
        created: '2014-05-14 13:14:24',
        replies:[
            {   
                id: 'athwt1N887',
                author: 'Nody',
                text: 'dont waste crucial resources with usesless messages',
                created: '2014-07-16 22:45:29',
            }
        ]
    },
    {
        id: 'r9fRHvbuNj',
        topic: 'philosophy',
        text: 'For a man to conquer himself is first and noblest fo all victories',
        author: 'Plato',
        created: '2014-05-06 08:48:04',
        replies:[
            {
                id: '5iloDrGNmy',
                author: 'Vir',
                text: 'well said chacha!!',
                created: '2016-09-15 03:50:45',
            },{
                id: 'gSWryJIgJ4',
                author: 'Plato',
                text: 'Your good too!! :P',
                created: '2015-12-05 22:22:46'
            }
        ]
    },
    {
        id: 'nEm3qiUfqz',
        topic: 'Greek Mythology',
        text: 'Zeus banishes the Titans and rules Mount Olympic ',
        author: 'Zeus',
        created: '2015-01-22 00:04:36',
        replies:[
            {
                id: 'UBhAnPMkTM',
                author:'Jatt Titan',
                created: '2016-01-06 04:12:34',
                text: 'Ghanta!'
            }
        ]
    },
    {
        id: 'F8PJJHBRBD',
        topic: 'food',
        text: 'Chewing Gum moves through your body unidigested similar to corn',
        author: 'Mr. Kitchen',
        created: '2015-06-02 07:32:01',
        replies:[
            {
                id: 'dBFMR0X30u',
                author: 'Vir',
                created: '2016-03-24 01:08:59',
                text: 'I feel hungry now, mumm nomm'
            },
            {
                id: 'YCtJ4yT679',
                author: 'God',
                created: '2016-11-02 10:02:46',
                text: 'hatt Bhooke'
            }
        ]
    }

]