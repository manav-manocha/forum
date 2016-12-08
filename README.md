# app-seed-v2
comproDLS App SEED, with Angular 2.x & NodeJS

https://appseedv2.comprodls.com/

## Pre-requisites
1. Install [GIT](https://git-scm.com/downloads)
2. Install [NodeJS](https://nodejs.org/en/download/). Ensure you are running node v4.x.x or higher and npm 3.x.x or higher.

## URL Query Parameters
- **embed**: This query parameter is used to launch App in embedded mode (e.g App embedded inside iframe of another App).

    https://appseedv2.comprodls.com?embed
    
    
## Project Config
```javascript
{        
    "app" : {
        "session" : {
            // Secret for encrypting session cookie
            "cookie-secret": "secret",
            
            //Max age of Stay SignIn cookie (7 days)
            "staySignInAge": 604800000, 
            "redis" : {
                // Redis URL
                // REDIS_URL environment variable (if set) will take precedence
                "url": "redis://username:password@redishost:redisport"
            }
        },
        "sso" : {
            //To enable Single sign on within apps 
            "enabled": true,       
            //Domain to use for authorization cookie in case of Single sign on
            "domain" : ".comprodls.com"
        },
        //Redirect http to https.
        "redirectToHttps" : true
    }            
}
```

## Environment Variables
* **APP_ENVIRONMENT** - Application environment. Possible values are prod, stg, qa, local and dev.
* **REDIS_URL** - Redis URL. This is used for storing user sessions.
* **DLS_UNCOMPRESSED_MODE** - This is used for debugging on production servers. Set this to true for serving uncompressed JS/CSS files.
* **NODE_MODULES_CACHE** - This is set to false to disable npm module caching (used by heroku).
* **NEW_RELIC_NO_CONFIG_FILE** - This is set to false to use default New Relic config.
* **NEW_RELIC_APP_NAME** - Application name on NewRelic e.g. "appseed-v2". Application will be tracked via this name in New Relic.
* **NEW_RELIC_LICENSE_KEY** - NewRelic License key. This is automatically set by NewRelic Heroku Add-on.
* **NEW_RELIC_LOG** - NewRelic logs location. This is automatically set by NewRelic Heroku Add-on.
* **PAPERTRAIL_API_TOKEN** - Papertrail API token. This is used for storing logs and is automatically set by Papertrail Heroku Add-on.

## Setup development environment 

### First time setup

#### (1) Setup BLANK repository
* Create a new BLANK repository named after your App (say App1).
* Clone App1 repository to your local folder
```git clone https://github.com/comprodls/app1.git```

#### (2) Connect your new repository to the SEED (for recieving updates)
* Navigate to root of above local folder
* Add the SEED repository as a remote, call it "seedv2"
```git remote add seedv2 https://github.com/comprodls/app-seed-v2.git```
* Fetch all the branches of the SEED remote
```git fetch seedv2```

#### (3) Create DEVELOP (working) and MASTER (Production/Live/Release) branches 
For branching model, see http://nvie.com/posts/a-successful-git-branching-model/
* Create DEVELOP branch based on SEED master
 ```git checkout -b develop seedv2/master```
* Push DEVELOP branch to remote origin 
```git push origin develop```
* Change the remote of local DEVELOP branch to origin
```git branch develop --set-upstream-to origin/develop```
* Create MASTER branch from DEVELOP
```
git branch master
git push origin master
```

#### (4) Deploy and Run the App locally
Navigate to root directory of project and run following command to install required npm dependencies
      ```npm install``` 
##### Running the app (development mode)
1. Run following command

   `npm run server:dev`
2. Go to [http://localhost:8080](http://localhost:8080) in your browser.

##### Running the app (production mode)
1. Run following command to build files

   `npm run build:prod`
2. Run following command to start server

   `npm run server:prod`
3. Go to [http://localhost:3000](http://localhost:3000) in your browser.

### Merging new features from Seed (Continous, Not first time)

#### (5) Make changes/features to the DEVELOP branch
* Make sure you're on the DEVELOP branch (or feature branch created from DEVELOP)
```
   git add ...
   git commit -m "..."
   git push origin develop 
```
#### (6) Pull (Merge) new features from SEED
* This merges the latest commits from seedv2/master into your develop branch.
```  
  git checkout develop (Make sure that you are on your develop branch)
  git pull origin develop (Make sure latest updates from develop branch have been synced locally)
  git fetch seedv2 (Make sure latest updates from SEED have been synced locally)
  git merge seedv2/master
  git push origin develop
```

### (7) Release changes to master
Refer to the branching model for advanced workflows around creating release branches & tags. A simplified workflow without release branches is provided below.
* Merge DEVELOP to MASTER
```
git pull origin develop
git pull origin master
git checkout master
git merge develop
git push origin master 
```

* Create a tag on MASTER
``` 
git tag 1.0.0
git push --tags
```


## File Structure
ToDo

## Coding conventions

https://github.com/comprodls/node-style-guide

https://angular.io/docs/ts/latest/guide/style-guide.html

http://nvie.com/posts/a-successful-git-branching-model/


## Making Changes

### Git Release Process for New Features/Issues
* Create a GitHub issue describing the purpose of the change/extension. Provide as many details as possible.
* Create a local branch with the similar name as of GitHub issue.
* Switch to the branch
* Make changes and commit
* Push your changes to GitHub
* Generate a Pull Request on GitHub
* Await feedback from code review/audit
* Merge to Master -> triggers deployment

### Adding new App Environments
* Decide the name of new environment e.g. **dev2**
* Create a config file (e.g. **dev2.js**) for new environment under "src/server/config" folder 
* Create a new heroku app for this environment and set "APP_ENVIRONMENT" environment variable to use this new environment(e.g. **APP_ENVIRONMENT = dev2**) .

### Front-end / Angular Coding conventions
https://github.com/comprodls/app-seed-v2/wiki/01_ANGULAR_CODING_CONVENTIONS


### Back-end / NodeJS Coding conventions
https://github.com/comprodls/app-seed-v2/wiki/01_ANGULAR_CODING_CONVENTIONS





