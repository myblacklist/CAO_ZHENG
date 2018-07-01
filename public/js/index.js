function getDay(year,month){
	var days = [31,28,31,30,31,30,31,31,30,31,30,31];
	if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) days[1]++;
	return days[month-1];
}

function check_list() {
	var list = document.getElementById("newList");
	if(list.value == "") return false;
	return true;
}

function check_search(){
	if(document.getElementById("search").value == "")return false;
	return true;
}

function TimeCheck(){
	var title = document.getElementById("title").value;
	var year = document.getElementById("year").value;
	var month = document.getElementById("month").value;
	var day = document.getElementById("day").value;
	var tip = document.getElementById("tip");
	if(title == ""){
		tip.innerHTML = "标题不能为空";
		return false;
	}
	if(year == "" || isNaN(year) || year < 2000 || year >2100){
		tip.innerHTML = "年份不合法";
		return false;
	}
	if(month == "" || isNaN(month) || month < 1 || month > 12){
		tip.innerHTML = "月份不合法";
		return false;
	}
	if(day == "" || isNaN(day) || day < 1 || day > getDay(year,month)){
		tip.innerHTML = "日期不合法";
		return false;
	}
	return true;
}

function clearForm(){
	document.getElementById("title").value = "";
	document.getElementById("year").value = "";
	document.getElementById("month").value = "";
	document.getElementById("day").value = "";
	document.getElementById("urg1").checked = "checked";
}

function update(title,time,urg,id,list){
	show_cover();
	show_thing();
	var year = time.substring(0,4);
	var month = time.substring(5,7);
	var day = time.substring(8,10);
	document.getElementById("title").value = title;
	document.getElementById("year").value = year;
	document.getElementById("month").value = month;
	document.getElementById("day").value = day;
	document.getElementById("urg"+urg).checked = "checked";
	document.getElementById("myform").action = "/updateThing?id="+id+"&list="+list;
}

function show_list(){
	document.getElementById("li_list").style.display = "block";
}

function hide_list(){
	document.getElementById("li_list").style.display = "none";
}

function show_thing(){
	document.getElementById("thing").style.display = "block";
}

function hide_thing(){
	document.getElementById("thing").style.display = "none";
}

function show_cover(){
	document.getElementById("cover").style.display = "block";
}

function hide_cover(){
	document.getElementById("cover").style.display = "none";
}

function addThing(){
	document.getElementById("cover").style.display = "block";
	document.getElementById("thing").style.display = "block";
}

function hide_all(list){
	document.getElementById("cover").style.display = "none";
	document.getElementById("thing").style.display = "none";
	document.getElementById("myform").action = "/addThing?list="+list;
	clearForm();
}

function newList(){
	if(document.getElementById("li_list").style.display == "none")show_list();
	else hide_list();
}

function deleteList(id){
	location.href = "/deleteList?id="+id;
}

window.onload = function() {
	if(document.body.clientWidth < 768) {
		document.getElementById("nav0").style.display = "none";
	}
}
var sing = 0;
//漢堡按鈕
function container() {
	if(sing == 0) {
		document.getElementById("nav0").style.display = "block";
		sing = 1;
	} else {
		document.getElementById("nav0").style.display = "none";
		sing = 0;
	}

}
window.onresize = function() {
	if(document.body.clientWidth < 768) {
		document.getElementById("nav0").style.display = "none";
	}
	if(document.body.clientWidth >= 768) {
		document.getElementById("nav0").style.display = "block";
	}
}