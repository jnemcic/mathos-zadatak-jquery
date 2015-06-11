$(document).ready(function() {
		var API = "http://193.246.33.24/data/";
		var tasks = $("#tasks");
		var dialog = $( "#dialog" ).dialog({
		height: 350,
		width: 400,
		autoOpen: false,

		buttons: {
			"Dodaj novi zadatak": function(){
			form.submit(); },
			Cancel: function() {
			dialog.dialog("close"); }
			},
			close: function() {
			form[0].reset(); }
			});
		var form = dialog.find("form");
		form.on("submit", function(e) {
			e.preventDefault();
			
			$.post(API + 'create', form.serialize()).done(function(data) {
			addTask(data);
			dialog.dialog('close');
				
			}).fail(function(error) {
			console.log(error.responseText);
			});
		});
		
		$.get(API, {zad_ch : 5}, function(data) {
			console.log(data);
			$.each(data, function(i,zad_ch){
			addTask(zad_ch);
			});
		});
		
		function addTask(zad_ch) {
		tasks.append("<tr data-id="+zad_ch.id+"><td>"+zad_ch.name+"</td><td>"+zad_ch.opis+"</td><td><button class='btn btn-success edit'>Edit</button><button class='btn btn-danger delete'>Delete</button></td></tr>");
		};
		
		$("#addNew").on("click", function() {
		dialog.dialog("open");
		});
		
		tasks.on("click", ".delete", function() {
		var row = $(this).closest('tr');
			$.post(API + "destroy/" + row.data('id'), {}, function(data) {
			row.remove();
			});
		});
		
		tasks.on("click",".edit", function() {
		var row = $(this).closest('tr');
		$.get(API + '/?id=' + row.data('id'), {}, function(data) {
			change.dialog("open");
			$("#zadatak").val(data.name);
			$("#opis").val(data.opis);
			});
		});
		
		var change = $("#change").dialog({
			height: 350,
			width: 400,
			autoOpen:false,
			modal:true,
			buttons: {
				'Save': function() {
				form.submit(); },
				Cancel: function() {
				change.dialog('close');
				}},
			close: function() {
				form[0].reset(); }
		});	
});