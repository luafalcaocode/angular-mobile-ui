import { Injectable } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, setUserProperties } from 'firebase/analytics';


@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  firebaseConfig: any;
  app: any;
  analytics: any;

  constructor() {
    this.firebaseConfig = {
      apiKey: "AIzaSyBx5_-nVEZrOHk1nXMixTIvZNZXtXLhlK8",
      authDomain: "teste-app-ca995.firebaseapp.com",
      projectId: "teste-app-ca995",
      storageBucket: "teste-app-ca995.appspot.com",
      messagingSenderId: "266974947305",
      appId: "1:266974947305:web:1594a1ac0565bb4c394d78",
      measurementId: "G-NEW79B79ZK"
    };

    this.initGoogleAnalytics();
  }

  initGoogleAnalytics() {
    return initializeApp(this.firebaseConfig);
  }

  getGoogleAnalytics() {
    return getAnalytics(this.initGoogleAnalytics());
  }

  logInfo(eventName, pageUrl, isUrl?: boolean) {
    const analytics = this.getGoogleAnalytics();

    logEvent(analytics, eventName, {
      page: pageUrl
    });
  }

  logPageView(url?: string) {
    document.title = url ? url : new URL(document.URL).pathname;

    console.log(document.title);

    const analytics = this.getGoogleAnalytics();

    logEvent(analytics, 'page_view', {
      page_title: document.title,
      usuario: localStorage.getItem('user')
    });
  }

  logEvent(eventName, obj){
    const analytics  = this.getGoogleAnalytics();
    logEvent(analytics, eventName, obj);
  }

  setCustomProperties(obj) {
    const analytics  = this.getGoogleAnalytics();

    for(const prop in obj) {
      console.log(`Prop: ${prop} - Value: ${obj.prop}`);
      setUserProperties(analytics, { prop: obj[prop] });
    }
  }
}
