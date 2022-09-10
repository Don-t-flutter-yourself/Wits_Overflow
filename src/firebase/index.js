import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC7hrNGwlQwGkvHwLWUklWVgjpQQ5ZPiV8",

    authDomain: "wits-overflow-dev.firebaseapp.com",
  
    projectId: "wits-overflow-dev",
  
    storageBucket: "wits-overflow-dev.appspot.com",
  
    messagingSenderId: "133674035333",
  
    appId: "1:133674035333:web:495de6a3d5072d4ba3a1ec"
  
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

