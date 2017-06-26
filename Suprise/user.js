    $(document).ready(function(){
        
        var score = localStorage.getItem('score');
        document.getElementById("title").innerHTML = "Your score in perception: " + score;

        $('#submit').click(function(){
            var name = $('#name').val();
            var alcohol = $('#alcohol').val();
            var age = $('#age').val();
            var query = $('#insert_data').serialize() + "&score=" + score;

            if(name == '' || alcohol == '' || age == '')
            {
                $('#return').html('<h4 style="color:red;font-size:70px;">Required All Fields..</h4>')
            }
            else
            {
                if(isNaN(alcohol)||isNaN(age))
                {
                $('#return').html('<h4 style="color:red;font-size:70px;">Age and alcohol must be numbers</h4>')
                }
                else{
                    $.ajax({
                        url:"insert.php",
                        method:"POST",
                        data:query,
                        success: function(data){
                            $('form').trigger("reset");
                            $('#return').fadeIn().html(data);
                            setTimeout(function(){
                                $('#return').fadeOut("slow");
                                window.location.href = '../index.html'

                            },3000);
                        }
                    });
                }
            }
        });
    });