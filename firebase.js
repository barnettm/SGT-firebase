// Initialize Firebase
var config = {
    apiKey: "AIzaSyAWldGu5i1_5Et6Nb8Wptw6tWqpWwA1TJ8",
    authDomain: "testing-93e1f.firebaseapp.com",
    databaseURL: "https://testing-93e1f.firebaseio.com",
    projectId: "testing-93e1f",
    storageBucket: "testing-93e1f.appspot.com",
    messagingSenderId: "994839807845"
};
firebase.initializeApp(config);

var fbRef = firebase.database();

// fbRef.ref('students').push(dataToSend);
// fbRef.ref('students/3').set(null)
var data = [];
fbRef.ref('students').on('value', function(snapshot){
    console.log('snapshot', snapshot.val());
    data = snapshot.val()
    console.log(data)
    renderStudentOnDom(data);
})