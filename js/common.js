$( "#form1" ).submit(function( event ) {
    add_li();
    $('input').phoenix('remove')
    $('.phoenix-input').phoenix('remove')
    $('form').trigger("reset");
    random_num();
    event.preventDefault();
});
function add_li(){
    var name = $("#name").val();
    $('li:first').focus();
    var id = SetLocalStorage();
    new_li(name,id);

}

function new_li(name,id){
    if(localStorage['postion'] != undefined && localStorage['postion'].split(",").indexOf(id) > -1) {
//        Createli();
        a = $("li[data-objectid='"+ id +"']").find('a')[0]
        $(a).text(name);
     alert('Edited Sucessfully');
    }
    else{
        $("#sortable").prepend("<li class='ui-sortable-handle' data-objectid=" + id + ">" + "<a href='javascript:void(0)' class='edit_li'>" + name + "</a>" +  "<a href='javascript:void(0)' class='closebutton'></a>" + "</li>").children(':first').hide().focus().slideDown('slow').animate({opacity: 1.0, scrollTop: $('li:first').position().top}).fadeIn(2000);
        alert('Created Sucessfully');
    }
    var arr = []
    $("#sortable li").each(function(i)
    {
        var li =  $(this).data('objectid'); // This is your objectid value
        arr.push(li);
    });
    localStorage['postion'] = arr
}

$("#sortable").sortable({
    update: function(event, ui) {
        var editid = $(ui.draggable).data('objectid');
        var arr = []
        $("#sortable li").each(function(i)
        {
           var li =  $(this).data('objectid'); // This is your objectid value
            console.log(li);
            arr.push(li);
        });
         localStorage['postion'] = arr
    }
});

$("#form-div").droppable({
    drop: function( event, ui ) {
          $(this).fadeIn(200);
          var editid = $(ui.draggable).data('objectid');
        //  $(ui.draggable).fadeOut(2000);
          var value = localStorage[editid];
          var hash = $.parseJSON(value)

          setFormValues(hash);

    }
});
$(document).ready(function(){
    random_num();
    $('input').phoenix()
    $('.phoenix-input').phoenix()
    $('form').dirtyForms();
    Createli();
});
$("#button-right").click(function(){
    $('form').trigger("reset");
    random_num();
});

function random_num(){
    $("#local-storage-id").val("kingston_"+(Math.random()*10));

}

function setFormValues(hash){
    $("#local-storage-id").val(hash.localstorageid);
    $("#email").val(hash.email);
    $("#name").val(hash.name);
    $("#comment").val(hash.text);

}

function SetLocalStorage(){
    var key = $("#local-storage-id").val();
    localStorage[key] = JSON.stringify($('form').serializeObject())
    return key
}
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
function Createli(){
  var all_li = localStorage['postion'] == undefined ? [] : localStorage['postion'].split(',');
  $.each(all_li, function(index, val) {
    var value = localStorage[val];
      console.log(value);
      console.log(val);
    if(localStorage['postion'] != undefined && val.match("kingston_")){
        var hash = $.parseJSON(value)
     //   new_li(hash.name,hash.localstorageid);
        $("#sortable").append("<li class='ui-sortable-handle' data-objectid=" + hash.localstorageid + ">" + "<a href='javascript:void(0)' class='edit_li'>" +hash.name+ "</a>" + "<a href='javascript:void(0)' class='closebutton'></a>" + "</li>").children(':first').hide().focus().slideDown('slow').animate({opacity: 1.0, scrollTop: $('li:first').position().top}).fadeIn(2000);
    }
  });
}


$(document).on('click', '.closebutton', function() {
    var li = $(this).parent();
    $(li).fadeOut(200);
    if (confirm("Are you sure you want to Remove?") ) {
        $(li).remove();
        var objectid = $(li).data('objectid');
        RemoveLocalStorage(objectid);
    } else {
        $(li).fadeIn(2000);
    }
});

$(document).on('click', '.edit_li', function() {
    var li = $(this).parent();
    var objectid = $(li).data('objectid');
    var value = localStorage[objectid];
    var hash = $.parseJSON(value)
    setFormValues(hash)

});

function RemoveLocalStorage(id){
    var items =  localStorage['postion'].split(',');
    var item = localStorage.removeItem(id);
    items.splice($.inArray(id, items),1);
    console.log(id);
    console.log(items);
    localStorage['postion'] = items

}

//$(document).ready(function(){
//    $(".colorbox").colorbox({html:'colorboxP',
//        opacity:0,
//        maxWidth:"90%",
//        maxHeight:"90%",
//        initialWidth: "10",
//        initialHeight: "10"
//    }).mouseover(function(){
//
//     console.log("dasfa");
//
//    })
//
//    $('.colorbox').mouseleave(
//        function(){
//            $.colorbox.close();
//        }
//    );
//});

$(document).on('mouseover', '.colorbox', function() {
    $(this).click();
    $(".colorbox").colorbox({html:'colorboxP',
        opacity:0,
        maxWidth:"90%",
        maxHeight:"90%",
        initialWidth: "10",
        initialHeight: "10"
    });

});
$(document).on('mouseleave', '.colorbox', function() {
    $.colorbox.close();

});