import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyCUn00fZaVedWXLHsmIynDUZ5GC6mBohog',
  authDomain: 'clone-fc261.firebaseapp.com',
  projectId: 'clone-fc261',
  storageBucket: 'clone-fc261.appspot.com',
  messagingSenderId: '561985052616',
  appId: '1:561985052616:web:a07464c9f256379351eafd',
  measurementId: 'G-8RW9LYGY7G',
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth }
