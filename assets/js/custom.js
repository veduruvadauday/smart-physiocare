function contact_submit() {
    console.log('on');
    var name = $('#name').val();
    var email = $('#email').val();
    var subject = $('#subject').val();
    var message = $('#message').val();

    var msg = '';
    $('.form-err').html('');
    if (name == '') {
        msg += 'Name Required,';
    }
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(mailformat)) {
        msg += 'Invalid Email,';
    }
    if (subject == '') {
        msg += 'Subject Required,';
    }
    if (message == '') {
        msg += 'Message Required,';
    }

    if (msg == '') {
        $('.error-message').hide();
        $('.error-message').html('');
        var message = 'Name: ' + name + "<br>";
        message += 'Email: ' + email + "<br>";
        message += 'Subject: ' + subject + "<br>";
        message += 'Message: ' + message + "<br>";
        // admin email
        var adminEmailData = {
            'email': 'info.manojdentalcare@gmail.com',
            'name': 'Manoj',
            'subject': 'New Contact Request | Manoj Dental Care',
            'message': "<b>Check the details below:<b><br>" + message,
            'token': ''
        }
        // user email
        var userEmailData = {
            'email': email,
            'name': name,
            'subject': 'Contact Request | Manoj Dental Care',
            'message': "<b>Contact Request Successfull, Admin will contact you soon<br><b><br>" + message,
            'token': ''
        }
        //   console.log(adminEmailData);
        //   console.log(userEmailData);
        if (sendEmail(adminEmailData)) {
            sendEmail(userEmailData);
            $('#contact_form').trigger('reset');
            alert('Contact Request Sent!');
        } else {
            alert('Failed to send Request!');
        }
    } else {
        $('.error-message').show();
        $('.error-message').html(msg);
    }
}

function sendEmail(data) {
    var form = new FormData();
    form.append("mail_to", data["email"]);
    form.append("mail_to_name", data['name']);
    form.append("mail_from_name", "");
    form.append("mail_from_email", "");
    form.append("mail_reply_email", "");
    form.append("mail_reply_name", "");
    form.append("mail_subject", data['subject']);
    form.append("mail_message", data['message']);
    form.append("setting", "default");
    // form.append("email", "");
    // form.append("password", "");
    // form.append("smtp_host", "smtp.gmail.com");
    // form.append("smtp_port", "587");
    if (data['token'] != '') {
        form.append("g-recaptcha-token", data['token']);
    }
    var settings = {
        "url": "https://softwares.bhavicreations.com/sendEmail/index.php",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };
    var returnStatus = true;
    $.ajax(settings).done(function (response) {
        console.log(response);
        response = JSON.parse(response);
        if (response.status) {
            returnStatus = true;
        } else {
            returnStatus = false;
        }
    });
    return returnStatus;
}