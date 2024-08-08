// lib/firebase.ts
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "https://iotfinalproj-32802-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iotfinalproj-32802",
  storageBucket: "iotfinalproj-32802.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(app);

export { database };