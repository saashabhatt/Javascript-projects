$(document).ready(function() {
    $("#btn").on("click", function(e) {
        e.preventDefault();
        let titl = '<td>' + $('#title').val() + '</td>';
        let rat = '<td>' + $('#rating').val() + '</td>';
        let btndel = '<td><button class = "delBtn">Delete</button></td>';
        let tabbody = $(".tablebody");
        tabbody.append('<tr>' + titl + rat + btndel + '</tr>')
    })
    
});

$(".tablebody").on("click", "button", function() {
        $(this).parent().parent().empty();
});




