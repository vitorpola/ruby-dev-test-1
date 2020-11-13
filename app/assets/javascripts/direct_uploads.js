var file_count = 0;
var total_files = 0;

addEventListener("direct-upload:initialize", event => {
  file_count += 1;
  total_files += 1;
  let modal_html = '<div class="text-center text-white" style="margin-top: 40vh;">';
  modal_html += '<div class="spinner-border mb-3" role="status" style="width: 6rem; height: 6rem;"></div><br>';
  modal_html += '<h2>Enviando Arquivo... (<span id="uploading-count">1</span> de ' + file_count +')</h2>';
  modal_html += '<h3 id="uploading-file-name"><h3></div>';
  $('#modal-direct-upload').html(modal_html);
  $('#modal-direct-upload').modal('show');
});

addEventListener("direct-upload:start", event => {
  console.log('direct-upload:start', event.detail.id)
});

addEventListener("direct-upload:progress", event => {
  updateUploadModal(event.detail.file.name, event.detail.progress, event.detail.id)
})

addEventListener("direct-upload:error", event => {
  event.preventDefault()
  alert(error);
})

addEventListener("direct-uploads:end", event => {
  file_count = 0;
  let modal_html = '<div class="text-center text-white" style="margin-top: 40vh;">';
  modal_html += '<i class="fa fa-check fa-5x"></i><br>';
  modal_html += '<h2>Arquivos Enviados com sucesso</h2>';
  $('#modal-direct-upload').html(modal_html);
  setTimeout(()=>{ $('#modal-direct-upload').modal('hide'); }, 300);
})

function updateUploadModal(filename, progress, index){
  $('#modal-direct-upload #uploading-count').text(index - total_files + file_count) ;
  $('#modal-direct-upload #uploading-file-name').text(filename + " " + progress.toFixed(1) + "%");
}