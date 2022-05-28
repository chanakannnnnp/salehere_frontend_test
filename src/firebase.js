import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

// ค่า minimum configuration คือ `apiKey` และ `projectId`
const firebaseConfig = {
  apiKey: 'AIzaSyB2Vzzgv4d612DaXV86KkpReT7vsE4weGs',
  authDomain: 'salehere-assignment-frontend.firebaseapp.com',
  databaseURL: 'https://salehere-assignment-frontend-default-rtdb.firebaseio.com',
  projectId: 'salehere-assignment-frontend',
  storageBucket: 'salehere-assignment-frontend.appspot.com',
  messagingSenderId: '208359970339',
  appId: '1:208359970339:web:144c5b7f2051a074e6c396'
}

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const analytics = firebase.analytics()
