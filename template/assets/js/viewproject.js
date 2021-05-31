$(document).ready(function () {
    let ac_type = sessionStorage.getItem("ac_type");
    if(ac_type=="Faculty"){
        $("#btn1").remove();
        $("#btn2").remove();
        $("#add").attr("href", "dashboardf.html");
    }
    let index = sessionStorage.getItem("viewIndex");
    let projects = JSON.parse(sessionStorage.getItem("projects"));
    let authors = JSON.parse(JSON.parse(projects[index]["author"]));

    for (let i in projects[0])
        if (projects[index][i] == null)
            projects[index][i] = "Unknown";

    $("#title").empty().append(projects[index]["title"]);
    $("#snames").empty().append(authors["name"]);
    $("#regno").empty().append(authors["regno"]);
    $("#sdate").empty().append(projects[index]["start_date"]);
    $("#edate").empty().append(projects[index]["end_date"]);
    $("#fname").empty().append(projects[index]["faculty"]);
    $("#fid").empty().append(projects[index]["facultyId"]);
    $("#link").empty().append(projects[index]["link"]);
    $("#ccode").empty().append(projects[index]["course_code"]);
    $("#cname").empty().append(projects[index]["course_name"]);
    $("#domain").empty().append(projects[index]["domain"]);
    $("#duration").empty().append(projects[index]["duration"]+" months");
    $("#desc").empty().append(projects[index]["description"]);
});

$(document).ready(function () {
    $("#editPrj").on("click", function () {
        let index = sessionStorage.getItem("viewIndex");
        sessionStorage.setItem("isEdit", 1);
        sessionStorage.setItem("editIndex", index);
        window.open("addproject.html", "_self");
    });
});

$(document).ready(function () {
    $("#delPrj").on("click", function () {
        let confirmation = confirm('Are you sure you want to delete this project');
        if (confirmation) {
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log('this.responseText :>> ', this.responseText);
                    console.log('this.status :>> ', this.status);

                    if (this.status >= 200 && this.status < 400) {
                        // The request has been completed successfully
                        window.open("dashboard.html", "_self");
                    } else {
                        alert("Error in deleting project! Please reload.");
                    }
                }
            });
            let index = sessionStorage.getItem("viewIndex");
            let projects = JSON.parse(sessionStorage.getItem("projects"));

            xhr.open("DELETE", "https://projenarator.herokuapp.com/projects/new/" + projects[index]["uuid"] + "/");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", sessionStorage.getItem("Token"));

            xhr.send();
        }
    });
});