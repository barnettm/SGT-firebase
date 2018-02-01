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

/****************************************************************
 * Renders all server data to DOM
 */
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
        calculateGradeAverage();
}
/****************************************************************
 * Add Student to server
 */
function addStudent(){
    // event.preventDefault()
    let name = $("#studentName").val();
    let course = $("#course").val()
    let grade = $("#studentGrade").val()

    let dataToSend = {
        student_name: name,
        course: course,
        grade: grade,
    }
    // var fbRef = firebase.database();
    fbRef.ref('students').push(dataToSend)
    clearAddStudentFormInputs();
    showAlert(); // success alert
    closeAlert(); // auto closes on setInterval
}

/****************************************************************
 * Clear input values
 */
function clearAddStudentFormInputs(){
    $('input').val('')
}

/****************************************************************
 * Deletes student from server
 */
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

/****************************************************************
 * Click Handler and initiation of addStudent function
 */
function handleAddClicked(){
    if(validateForm() == true){
        addStudent();
    }

    //grab student data from inputs

}

/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
    clearAddStudentFormInputs();
    $(".input-group-addon").css('background-color', '#eee');
    console.log("Cancel clicked")
}

/****************************************************************
 * Click Handlers
 */
function addClickHandlersToElements(){
    // $("#addButton").click(handleAddClicked);
    $("#addButton").unbind().click(handleAddClicked);
    $("#cancelButton").unbind().click(handleCancelClick);


    $(".btn-danger").click(function(){
        deleteStudent($(this).attr("id"))
    });
    // $("tbody").on('click','.btn',removeStudent);
    // $("#dataButton").click(handleServerClick);
    // $("#addButton").tooltip({title:'Add Student', placement: 'bottom'}); // tooltip/jquery
}


/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(){
    var temp = 0;
    for(var student in data){
        temp += parseInt(data[student].grade);
    }
    temp = temp / Object.keys(data).length;
    temp = parseInt(temp);
    renderGradeAverage(temp);

}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(gradeAverage){
    if(Object.keys(data).length == 0){
        gradeAverage = 0;
    }
        $(".avgGrade").text(gradeAverage);

}
 /* reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */


/**
 * Listen for the document to load and reset the data to the initial state
 */

function removeStudent(){
   var parentIndex = $(this).parents('tr').index();
   var idOfStudentInArray = student_array[parentIndex].id;
   student_array.splice(parentIndex,1);
   $(this).parents("tr").remove();
   calculateGradeAverage();
   deleteStudentFromServer(idOfStudentInArray);

}


/****************************************************************
 * validate input / form
 */
function validateForm(){
    var nameInput = $("#studentName").val();
    var course = $("#course").val();
    var grade = $("#studentGrade").val();
    grade = parseInt(grade);
    if(isNaN(grade)||nameInput == ''){
        openModal();
        $(".input-group-addon").css('background-color', '#ce9894');
        return false;
    }else{
        $(".input-group-addon").css('background-color', '#eee');
        return true;
    }
}


/****************************************************************
 * Open modal on incorrect input
 */
function openModal(){
    $("#inputModal").modal('show');
}
/****************************************************************
 * Show student added alert
 */
function showAlert(){
    $("#addAlert").show();
}
/****************************************************************
 * close student added alert
 */
function closeAlert(){
    $("#addAlert").fadeTo(1000, 500).slideUp(1000, function(){
        $("#addAlert").hide();
    });
}
/****************************************************************
 * Event listener for 'return' key -- adds student from input data on form
 */
$(window).keyup(function(event){
    if(event.keyCode === 13){
        if(validateForm() === true){
            addStudent()
        }
    }
});
/****************************************************************
 *
 */