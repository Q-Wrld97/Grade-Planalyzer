// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyACtLJPVmbrm-VTam80pmNC6ev_C9mVTiA",
  authDomain: "testing-320ed.firebaseapp.com",
  projectId: "testing-320ed",
  storageBucket: "testing-320ed.appspot.com",
  messagingSenderId: "759480422005",
  appId: "1:759480422005:web:ed1e51cd3d09550041b23c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()
const db = firebase.firestore()