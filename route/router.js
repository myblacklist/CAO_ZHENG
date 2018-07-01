const dao = require("../database/database.js");
const formidable = require("formidable");

var searchContent = "";

function getDate(callback) {
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	if(month < 10) month = "0" + month;
	if(day < 10) day = "0" + day;
	callback({
		"year": year,
		"month": month,
		"day": day
	});
}
//获取登陆页面
exports.login = function(req, res, next) { 
	var tips = "";
	var tip = req.query.tips;
	if(tip == 1) tips = "用户名或密码错误";
	else if(tip == 2) tips = "请先登录";
	res.render("login", {
		"tip": tips
	});
}
//登陆判断，成功则转向主页。否则继续登陆
exports.plogin = function(req, res, next) { 
	var form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		if(err) {
			next();
			return;
		}
		var userName = fields.userName;
		var userPass = fields.userPass;
		var sql = "select * from login where userName = '" + userName + "' and userPass = '" + userPass + "'";
		dao.query(sql, (err, result) => {
			if(err) {
				console.log(err);
				next();
				return;
			}
			if(result.length == 0)
				res.writeHead(302, {
					"Location": "http://127.0.0.1:3000/login?tips=1"
				});
			else {
				res.writeHead(302, {
					"Location": "http://127.0.0.1:3000/index?list=2&flag=0"
				});
				req.session.userName = userName;
			}
			res.end();
		});
	});
}
//更具不同情况获取主页
exports.index = function(req, res, next) { 
	var userName = req.session.userName;
	if(userName == null) {
		res.writeHead(302, {
			"Location": "http://127.0.0.1:3000/login?tips=2"
		});
		res.end();
		return;
	}
	var list = req.query.list;
	var flag = req.query.flag;
	var order_flag = 0;
	if(flag == 1) order_flag = 1;
	var sql = "select * from lists";
	dao.query(sql, function(err, left_result) {
		if(err) {
			console.log(err);
			next();
			return;
		}
		var order = "order by urgent desc,time asc";
		if(flag == 1) order = "order by time asc,urgent desc";
		if(list == 1) {
			getDate((result) => {
				var time = result.year + "-" + result.month + "-" + result.day;
				sql = "select * from things where isdelete = 0 and time = '" + time + "'" + order;
			});
		} else if(list == 2) {
			sql = "select * from things where isdelete = 0 " + order;
		} else if(list == 3) {
			sql = "select * from things where isdelete = 1 " + order;
		} else {
			sql = "select * from things where isdelete = 0 and list_id = " + list + " " + order;
		}
		dao.query(sql, (err, right_result) => {
			if(err) {
				console.log(err);
				next();
				return;
			}
			res.render("index", {
				"lists": left_result,
				"things": right_result,
				"list_flag": list,
				"userName": userName,
				"order_flag": order_flag
			});
		});
	});
}
//新建列表
exports.newList = function(req, res, next) { 
	if(req.session.userName == null) {
		res.writeHead(302, {
			"Location": "http://127.0.0.1:3000/login?tips=2"
		});
		res.end();
		return;
	}
	var form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		if(err) {
			next();
			return;
		}
		var newList = fields.newList;
		var sql = "insert into lists values(null,?)";
		dao.add(sql, [newList], function(err, result) {
			if(err) {
				console.log(err);
				next();
				return;
			}
			res.writeHead(302, {
				"Location": "http://127.0.0.1:3000/index?list=2&flag=0"
			});
			res.end();
		});
	});
}
 //删除列表
exports.deleteList = function(req, res, next) {
	var id = req.query.id;
	var sql = "delete from lists where id = " + id;
	dao.remove(sql, function(err, result) {
		if(err) {
			console.log(err);
			next();
			return;
		}
		res.writeHead(302, {
			"Location": "http://127.0.0.1:3000/index?list=2&flag=0"
		});
		res.end();
	});
}
 //增加事件
exports.addThing = (req, res, next) => {
	if(req.session.userName == null) {
		res.writeHead(302, {
			"Location": "http://127.0.0.1:3000/login?tip=2"
		});
		res.end();
		return;
	}
	var form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		if(err) {
			console.log(err);
			next();
			return;
		}
		var title = fields.title;
		var year = fields.year;
		var month = fields.month;
		var day = fields.day;
		if(month < 10) month = "0" + parseInt(fields.month);
		if(day < 10) day = "0" + parseInt(fields.day);
		var list_id = parseInt(req.query.list);
		var time = year + "-" + month + "-" + day;
		var urgent = parseInt(fields.urgent);
		var sql = "insert into things values(null,?,?,?,0,?)";
		var params = [title, urgent, time, list_id];
		dao.add(sql, params, (err, result) => {
			if(err) {
				console.log(err);
				next();
				return;
			}
			res.writeHead(302, {
				"Location": "http://127.0.0.1:3000/index?flag=0&list=" + list_id
			});
			res.end();
		});
	});
}
//删除计划
exports.deleteThing = (req, res, next) => { 
	if(req.session.userName == null) {
		res.writeHead(302, {
			"Location": "http://127.0.0.1:3000/login?tip=2"
		});
		res.end();
		return;
	}
	let id = req.query.id;
	let list = req.query.list;
	let sql = "update things set isdelete=1 where id=?";
	dao.update(sql, [id], (err, result) => {
		if(err) {
			console.log(err);
			next();
			return;
		}
		res.writeHead(302, {
			"Location": "http://127.0.0.1:3000/index?flag=0&list=" + list
		});
		res.end();
	});
}

exports.removeThing = (req, res, next) => {
	if(req.session.userName == null) {
		res.writeHead(302, {
			"Location": "http://127.0.0.1:3000/login?tip=2"
		});
		res.end();
		return;
	}
	let id = req.query.id;
	let sql = "delete from things where id=" + id;
	dao.remove(sql, (err, result) => {
		if(err) {
			console.log(err);
			next();
			return;
		}
		res.writeHead(302, {
			"Location": "http://127.0.0.1:3000/index?list=3&flag=0"
		});
		res.end();
	});
}

exports.search = (req, res, next) => {
	if(req.session.userName == null) {
		res.writeHead(302, {
			"Location": "http://127.0.0.1:3000/login?tip=2"
		});
		res.end();
		return;
	}
	var flag = req.query.flag;
	var order = "order by urgent desc,time asc";
	if(flag == 1) order = "order by time asc,urgent desc";
	var form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		if(err != null) {
			next();
			return;
		}
		var search = fields.search;
		searchContent = search;
		var sql = "select * from things where title like '%" + search + "%' and isdelete=0 " + order;
		dao.query(sql, (err, result) => {
			if(err) {
				console.log(err);
				next();
				return;
			}
			sql = "select * from lists";
			dao.query(sql, (err, resl) => {
				if(err) {
					console.log(err);
					next();
					return;
				}
				res.render("index", {
					"userName": req.session.userName,
					"lists": resl,
					"things": result,
					"list_flag": -1,
					"order_flag": flag
				});
			});
		});
	});
}

exports.gsearch = (req, res, next) => {
	if(req.session.userName == null) {
		res.writeHead(302, {
			"Location": "http://127.0.0.1:3000/login?tip=2"
		});
		res.end();
		return;
	}
	var flag = req.query.flag;
	var order = "order by urgent desc,time asc";
	if(flag == 1) order = "order by time asc,urgent desc";
	var search = searchContent;
	if(search == null || search == "") search = searchContent;
	else searchContent = search;
	var sql = "select * from things where title like '%" + search + "%' and isdelete=0 " + order;
	dao.query(sql, (err, result) => {
		if(err) {
			console.log(err);
			next();
			return;
		}
		sql = "select * from lists";
		dao.query(sql, (err, resl) => {
			if(err) {
				console.log(err);
				next();
				return;
			}
			res.render("index", {
				"userName": req.session.userName,
				"lists": resl,
				"things": result,
				"list_flag": -1,
				"order_flag": flag
			});
		});
	});
}

exports.updateThing = function(req, res, next) {
	if(req.session.userName == null) {
		res.writeHead(302, {
			"Location": "http://127.0.0.1:3000/login?tip=2"
		});
		res.end();
		return;
	}
	var id = req.query.id;
	var list = req.query.list;
	var form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		if(err != null) {
			next();
			return;
		}
		var title = fields.title;
		var year = fields.year;
		var month = fields.month;
		var day = fields.day;
		if(month < 10) month = "0" + parseInt(month);
		if(day < 10) day = "0" + parseInt(day);
		var time = year + "-" + month + "-" + day;
		var urgent = fields.urgent;
		var sql = "update things set title=?,time=?,urgent=? where id=?";
		var params = [title, time, urgent, id];
		dao.update(sql, params, (err, result) => {
			if(err) {
				console.log(err);
				next();
				return;
			}
			res.writeHead(302, {
				"Location": "http://127.0.0.1:3000/index?flag=0&list=" + list
			});
			res.end();
		});
	});
}

exports.logout = function(req, res, next) {
	req.session.userName = null;
	res.writeHead(302, {
		"Location": "http://127.0.0.1:3000/login?tips=2"
	});
	res.end();
}