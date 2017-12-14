var Todo = require('./models/todo');

module.exports = function(app) {
	// api el get completo
	app.get('/api/todos', function(req, res) {
		// mongobd
		Todo.find(function(err, todos) {
			// error
			if (err)
				res.send(err)
			res.json(todos); // regresa
		});
	});
	// crear todo y envia 
	app.post('/api/todos', function(req, res) {
		// crear todo
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);
			// gett
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});
	// eliminar
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);		
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});
	// app 
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 
	});
};