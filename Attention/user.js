    $(document).ready(function(){
        
        var score = localStorage.getItem('score');
        document.getElementById("title").innerHTML = "Your score in attention: " + score;

        $('#submit').click(function(){
            var name = $('#name').val();
            var alcohol = $('#alcohol').val();
            var age = $('#age').val();
            var query = $('#insert_data').serialize() + "&score=" + score;

            if(name == '' || alcohol == '' || age == '')
            {
                $('#return').html('<h4 style="color:red;">Required All Fields..</h4>')
            }
            else
            {
                $.ajax({
                    url:"insert.php",
                    method:"POST",
                    data:query,
                    success: function(data){
                        $('form').trigger("reset");
                        $('#return').fadeIn().html(data);
                        setTimeout(function(){
                            $('#return').fadeOut("slow");
                        },6000);
                    }
                });
                console.log("entra en caca");
            }
        });
    });