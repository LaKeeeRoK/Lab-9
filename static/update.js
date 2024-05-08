$(document).ready(function() {
    $('#addContactForm').submit(function(event) {
        event.preventDefault();
        var name = $('#name').val();
        var phone = $('#phone').val();
        $.ajax({
            type: 'POST',
            url: '/add',
            contentType: 'application/json',
            data: JSON.stringify({'name': name, 'phone': phone}),
            success: function(data) {
                if (data.success) {
                    $('#name').val('');
                    $('#phone').val('');
                    refreshContacts();
                }
            },
            error: function(xhr, status, error) {
                console.error('Failed to add contact:', error);
            }
        });
    });

    function refreshContacts() {
        $.ajax({
            type: 'GET',
            url: '/',
            success: function(data) {
                $('#contactList').html(data);
            },
            error: function(xhr, status, error) {
                console.error('Failed to refresh contacts:', error);
            }
        });
    }

    refreshContacts();
});
