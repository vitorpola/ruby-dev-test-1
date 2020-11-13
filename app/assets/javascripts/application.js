//= require jquery3
//= require rails-ujs
//= require activestorage
//= require direct_uploads
//= require jquery.validate
//= require jquery-validate_pt-br

//= require popper
//= require bootstrap

$(document).ready(function(){
  $('form').validate();
  $.validator.setDefaults({
    highlight: function(el) {
        $(el).addClass('is-invalid')
    },
    unhighlight: function(el) {
        $(el).removeClass('is-invalid')
    },
    errorElement: 'div',
    errorClass: 'invalid-feedback',
    errorPlacement: function(error, el) {
      error.insertAfter(el);
    }
  });
  $('.custom-file-field input:file').on('change', function(e) {
    var $input = $(e.target).closest('.custom-file-field').find('input:text');
    if(e.target.files){
      if(e.target.files.length > 0){
        var files_name = [];
        for(let i = 0;  i < e.target.files.length; i++) files_name.push(e.target.files[i].name);
        $input.val(files_name.join(', '));
      }
    }
  });

  $('.custom-file-field input:text').on('focus', function(e) {
    e.preventDefault();
    $(e.target).blur();
    if(e.target.value == '' || confirm("O(s) novo(s) sobrescreverão o(s) arquivo(s) préviamente anexos. Deseja anexo novo(s) arquivo(s)?")){
      setTimeout(function(){$(e.target).closest('.custom-file-field').find('label').click()}, 400);
    }
    return false;
  });   
  
  $('.custom-file-field label').on('click', function(e) {
    if(typeof e.originalEvent != 'undefined' && e.originalEvent.type == 'click' && e.target.nodeName == 'INPUT' && $(e.target).closest('.custom-file-field').find('input:text').val().length){
      if(confirm("O(s) novo(s) sobrescreverão o(s) arquivo(s) préviamente anexos. Deseja anexo novo(s) arquivo(s)?")){
        return true;
      }else{
        e.stopPropagation();
        return false;
      }
    }else{
      e.stopPropagation();
      return true;
    }
  });
});