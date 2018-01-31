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



$(document).ready(function(){
    initializeApp();  
});


function initializeApp(){
    addClickHandlersToElements();
    $('[data-toggle="tooltip"]').tooltip(); // get data tooltip
    $("#addAlert").hide(); // hide add student alert on doc load
}


function renderStudentOnDom(data){
        $("tbody").empty();
        for (var student in data) {
            let name = data[student].student_name;
            let course = data[student].course;
            let grade = data[student].grade;
            let student_id = data[student].student_id;

            var newTableRow = $("<tr>");
            var newTableName = $("<td>").text(name);
            var newTableCourse = $("<td>").text(grade);
            var newTableGrade = $("<td>").text(course);
            var newDeleteButton = $("<button>").addClass('btn btn-danger').text('Delete').attr('id',`${student}`);
            var studentDelete = $("<td>").append(newDeleteButton);
            newTableRow.append(newTableName, newTableGrade, newTableCourse, studentDelete);
            $("tbody").append(newTableRow)
        }
        addClickHandlersToElements()
        // calculateGradeAverage();
}

function addStudent(){
    event.preventDefault()
    let name = $("#studentName").val();
    let course = $("#course").val()
    let grade = $("#studentGrade").val()
    // if(name || course || grade || student_id == ''){
    //     alert('Please complete the form')
    // }

    let dataToSend = {
        student_name: name,
        course: course,
        grade: grade,
    }
    var fbRef = firebase.database();

    fbRef.ref('students').push(dataToSend)
}

function deleteStudent(student){
    debugger;
    console.log(student)
    console.log(data)
    for(var i in data){
        // console.log(data[i])
        // console.log(i)
        if(i == student){
            var fbRef = firebase.database();
            fbRef.ref(`students/${i}`).set(null)
        }
    }

}


function handleAddClicked(){
    if(validateForm() == true){
        addStudent();
    };

    //grab student data from inputs

}


function addClickHandlersToElements(){
    $("#addButton").click(handleAddClicked);
    $(".btn-danger").click(function(){
        deleteStudent($(this).attr("id"))
    });
    // $("tbody").on('click','.btn',removeStudent);
    // $("#dataButton").click(handleServerClick);
    // $("#dataButton").tooltip({title:'Click to load data from the server', placement: 'bottom'}); // tooltip/jquery
}

function validateForm(){
    var nameInput = $("#studentName").val();
    var course = $("#course").val();
    var grade = $("#studentGrade").val();
    if(isNaN(grade)||nameInput == ''){
        openModal();
        $(".input-group-addon").css('background-color', '#ce9894');
        return false;
    }else{
        $(".input-group-addon").css('background-color', '#eee');
        return true;
    }
}