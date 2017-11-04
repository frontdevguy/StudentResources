$(document).ready(function() {
    
        listRecords();
    
        $('.edit-btn').on('click', function() {
            $('.edit-form').css('display', 'block');
            $('.overlay').addClass('is-active');
        })
    

        $('.close-view-page').on('click', function() {
            $('.student-list').css('display', 'block');
            $('.view-page').css('display', 'none');
            $('.allStudents').text('All Students');
            $('.add-student').css('display', 'block');
        })
    
        $('.delete-btn').on('click', function() {})
    
        $('.delete-no').on('click', function() {
            $('.overlay').removeClass('is-active');
            $('.delete-form').fadeOut('slow');
        })
    
    
        $('.add-student').on('click', function() {
            $('.overlay').addClass('is-active');
            $('.add-form').addClass('is-active');
        })
    
        $('.btn-next').on('click', function() {
            $('.first-part').fadeOut("fast", function() {
                $('.btn-add-form').removeAttr("disable");
                $('.btn-prev').removeAttr("disable");
                $('.second-part').fadeIn("fast")
            })
        })
    
        $('.btn-prev').on('click', function() {
            $('.second-part').fadeOut("fast", function() {
                $('.btn-add-form').attr("disable", "disable");
                $('.btn-prev').attr("disable", "disable");
                $('.first-part').fadeIn("fast")
            })
        })
    
        $('.close-form').on('click', function() {
            $('.overlay').removeClass('is-active');
            $('.add-form').removeClass('is-active');
            $('.edit-form').css('display', 'none');
        })
    
        $('.add-form-cont').on('submit', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
    
            if ($('#add-name').val().length < 1 || $('#add-dob').val().length < 1 || $('#add-soo').val().length < 1 || $('#add-dept').val().length < 1 || $('#add-factly').val().length < 1) {
                error("Please fill all fields");
                return false;
            }
    
            if (parseInt($('#add-dob').val()) < 1 || isNaN(parseInt($('#add-dob').val()))) {
                error("Please enter a valid Age");
                return false;
            }
    
            value = $('.add-form-cont').serialize();
    
            createRecord(value);
    
        })
    
        $('.edit-form-body').on('submit', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();   
            
            if (parseInt($('#edit-dob').val()) < 1 || isNaN(parseInt($('#edit-dob').val()))) {
                error("Please enter a valid Age");
                return false;
            }
    
            if ($('#edit-name').val().length < 1 || $('#edit-dob').val().length < 1 || $('#edit-soo').val().length < 1 || $('#edit-dept').val().length < 1 || $('#edit-factly').val().length < 1 || $('#edit-id').val().length < 1) {
                error("Please fill all fields");
                return false;
            }
    
            value = $('.edit-form-body').serialize();
    
            editStudentRecord(value);
    
        })
    
        function editStudentRecord($params) {
            $.ajax({
                url: '/edit',
                method: 'POST',
                data: $params,
                success: function(data) {
                    if (parseInt(data.status) == 404) {
                        return error(data.message);
                    } else {
    
                        $('.overlay').removeClass('is-active');
                        $('.edit-form').css('display', 'none');
    
                        listRecords("all");
                        success(data.message);
    
                        $('#edit-name').val("");
                        $('#edit-dob').val("");
                        $('#edit-soo').val("");
                        $('#edit-dept').val("");
                        $('#edit-factly').val("");
    
                    }
                },
                error: function() {
                    error("Something went wrong, please try again");
                    return false;
                }
            })
        }
    
        function createRecord($params) {
            $.ajax({
                url: '/create',
                method: 'POST',
                data: $params,
                success: function(data) {
    
                    $('.main-content').css('display', 'none');
                    $('.overlay').removeClass('is-active');
                    $('.add-form').removeClass('is-active');
                    $('.edit-form').css('display', 'none');
    
                    if (Number(data.status) == 200) {
                        var studentDetails = `<div class="student">
                        <div class="student-details">
                            <p class="student-name"> ${data.name} </p>
                            <p class="course-name"> ${data.dept} </p>
                        </div>
                        <div class="student-avater">
                            <img src="img/avater.png" alt="Student Image">
                        </div>
                        <div class="clear"></div>
                        <div class="student-action"> <p style="float:left;color:slateblue" class="view-btn" data-id="${data.id}"><i class="fa fa-eye"></i> view</p><p style="float:left;color:seagreen" class="edit-btn" data-id="${data.id}"><i class="fa fa-pencil"></i> Edit</p> <p style="float:left;color:red;" class="delete-btn" data-id="${data.id}"><i class="fa fa-trash"></i> Delete</p></div>
                        </div>`
                        $('.student-list').append(studentDetails);
                        $('#add-name').val("");
                        $('#add-dob').val("");
                        $('#add-soo').val("");
                        $('#add-dept').val("");
                        $('#add-factly').val("");
                        success(data.message);
                    } else {
                        error(data.message)
                    }
    
                    $('.view-btn').on('click', viewPage);
                    $('.delete-btn').on('click', deleteRecord);
                    $('.edit-btn').on('click', editRecord);
                },
                error: function() {
                    error("Something went wrong, please try again");
                    return false;
                }
            })
        }
    
        function listRecords($type = null) {
            var recordName = [];
            var student;
    
            $.ajax({
                url: '/list',
                method: 'POST',
                success: function(data) {
                    $('.overlay').removeClass('is-active');
                    $('.add-form').removeClass('is-active');
                    $('.edit-form').css('display', 'none');
    
                    if (typeof data.message != "undefined") {
                        return false;
                    }
    
                    $('.main-content').css('display', 'none');
    
                    recordName = Object.keys(data);
    
                    if ($type == 'all') {
                        $('.student-list').html('');
                    }
    
                    for (var i = 0; i < recordName.length; i++) {
                        student = '<div class="student">' +
                            '<div class="student-details">' +
                            '<p class="student-name">' + data[recordName[i]].name + '</p>' +
                            '<p class="course-name">' + data[recordName[i]].department + '</p>' +
                            '</div>' +
                            '<div class="student-avater">' +
                            '<img src="img/avater.png" alt="Student Image">' +
                            '</div>' +
                            '<div class="clear"></div>' +
                            `<div class="student-action"> <p style="float:left;color:slateblue" class="view-btn" data-id="${data[recordName[i]].id}"><i class="fa fa-eye"></i> view</p><p style="float:left;color:seagreen" class="edit-btn" data-id="${data[recordName[i]].id}"><i class="fa fa-pencil"></i> Edit</p> <p style="float:left;color:red;" class="delete-btn" data-id="${data[recordName[i]].id}"><i class="fa fa-trash"></i> Delete</p></div>` +
                            '</div>'
                        $('.student-list').append(student);
                        student = "";
                    }
    
                    $('.view-btn').on('click', viewPage);
                    $('.delete-btn').on('click', deleteRecord);
                    $('.edit-btn').on('click', editRecord);
                },
                error: function() {
                    error("Something went wrong, please try again");
                    return false;
                }
            })
        }
    
    
    
        $('.home-page').on('click', function() {
            window.location.href = "/";
        })
    
    
        function error(message) {
            $('.error-alert').css('background', 'orangered');
            $('.error-alert').text(message);
            $('.error-alert').fadeIn('slow');
            $('.error-alert').delay(3000).fadeOut('slow');
        }
    
        function success(message) {
            $('.error-alert').css('background', 'mediumseagreen');
            $('.error-alert').text(message);
            $('.error-alert').fadeIn('slow');
            $('.error-alert').delay(3000).fadeOut('slow');
        }
    
        function viewPage() {
            $id = $(this).attr('data-id');
    
            $.ajax({
                url: '/read',
                method: 'POST',
                data: 'id=' + $id,
                success: function(data) {
    
                    if (typeof data.message != 'undefined') {
                        return error(data.message);
                    }
    
                    $('.view-name').text(data.name);
                    $('.view-age').text(data.age);
                    $('.view-dept').text(data.department);
                    $('.view-state').text(data.soo);
                    $('.view-factly').text(data.faculty);
                    $('.student-list').css('display', 'none');
                    $('.view-page').css('display', 'block');
                    $('.allStudents').text('Information')
                    $('.add-student').css('display', 'none');
                },
                error: function() {
                    error("Something went wrong, please try again");
                    return false;
                }
            })
        }
    
        function deleteRecord() {
            $id = $(this).attr('data-id');
    
            $('.delete-form').css('display', 'block');
            $('.overlay').addClass('is-active');
    
            $('.delete-yes').click(function() {
                $(this).unbind('click')
                $('.overlay').removeClass('is-active');
                $('.delete-form').fadeOut('slow');
    
                $.ajax({
                    url: '/delete',
                    method: 'POST',
                    data: 'id=' + $id,
                    success: function(data) {
                        if (parseInt(data.status) == 404) {
                            error(data.message);
                        } else {
                            success(data.message);
                            location.reload();
                        }
                    },
                    error: function() {
                        error("Something went wrong, please try again");
                        return false;
                    }
                })
    
            })
        }
    
        function editRecord() {
            $id = $(this).attr('data-id');
    
            $.ajax({
                url: '/read',
                method: 'POST',
                data: 'id=' + $id,
                success: function(data) {
                    if (typeof data.message != 'undefined') {
                        error(data.message);
                        return false;
                    }
    
                    $('#edit-name').val(data.name);
                    $('#edit-dob').val(data.age);
                    $('#edit-factly').val(data.faculty);
                    $('#edit-dept').val(data.department);
                    $('#edit-soo').val(data.soo);
                    $('#edit-id').val($id);
    
    
                    $('.overlay').addClass('is-active');
                    $('.edit-form').css('display', 'block');
                },
                error: function() {
                    error("Something went wrong, please try again");
                    return false;
                }
            })
    
        }
    
    
    })