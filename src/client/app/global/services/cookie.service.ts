
export class CookieService {
  constructor(){ }
  getCookie(cookieName) {
    let cookies = {};
            
    let pairs = document.cookie.split('; ');
            
    for (let i=0; i<pairs.length; i++){
        var pair = pairs[i].split('=');
           cookies[pair[0]] = encodeURIComponent(pair[1]);
        }
            
     return cookies[cookieName];
   }
   getAuthCookieJSON() {   
     let dlsConfigCookie = this.getCookie('dls_config');
     if (dlsConfigCookie){
        return dlsConfigCookie;
      } else{
        return undefined;
      }
   } 
      
}
