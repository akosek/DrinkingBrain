$(document).ready(function(){
        $('#submit').click(function(){
            var name = $('#name').val();
            var age = $('#age').val();
            var email = $('#email').val();
            if(name == '' || age == '' || email == '')
            {
                $('#return').html('<h4 style="color:red;">Required All Fields..</h4>')
            }
            else
            {
                $.ajax({
                    url:"insert.php",
                    method:"POST",
                    data:$('#insert_data').serialize(),
                    success: function(data){
                        $('form').trigger("reset");
                        $('#return').fadeIn().html(data);
            //            setTimeout(function(){
            //                $('#return').fadeOut("slow");
            //            },6000);
                    }
                });
                console.log("entra en caca");
            }
        });
    });
