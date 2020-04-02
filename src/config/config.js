import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCdimIf8z6V-3Ue3B2ATMc3X-EsiBbCXr4",
  authDomain: "wayahchat.firebaseapp.com",
  databaseURL: "https://wayahchat.firebaseio.com",
  projectId: "wayahchat",
  storageBucket: "wayahchat.appspot.com",
  messagingSenderId: "307488209703",
  appId: "1:307488209703:web:8b0058bcf46d1838d48702"
};

const appConfig = Firebase.initializeApp(firebaseConfig);
export const db = appConfig.database();
export const auth = Firebase.auth();
export const time = Firebase.database.ServerValue.TIMESTAMP
export const user = Firebase.auth();
