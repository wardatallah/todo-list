import todo from '../models/todoModel.js';

const handleResponse = function (res, err, result) {
	if (err) {
		return res.status(400).send({error: err});
	}

	res.json(result);
};

const controller = {
	createTodo: (req, res) => {
		todo._createTodo(req.body, (err, result) => {
			handleResponse(res, err, result);
		});
	},
	getTodoLists: (req, res) => {
		todo._getTodoLists({}, (err, result) => {
			handleResponse(res, err, result);
		});
	},
	getTodoList: (req, res) => {
		todo._getTodoList(req.params.id, (err, result) => {
			handleResponse(res, err, result);
		});
	},
	deleteTodoList: (req, res) => {
		todo._deleteTodoList(req.body, (err, result) => {
			handleResponse(res, err, result);
		});
	},
	updateTodoListName: (req, res) => {
		todo._updateTodoListName(req.body, (err, result) => {
			handleResponse(res, err, result);
		});
	},
	createTodoItem: (req, res) => {
		todo._createTodoItem(req.body, (err, result) => {
			handleResponse(res, err, result);
		});
	},
	getTodoItems: (req, res) => {
		todo._getTodoItems(req.params.id, (err, result) => {
			handleResponse(res, err, result);
		});
	},
	getTodoItem: (req, res) => {
		todo._getTodoItem(req.params.id, (err, result) => {
			handleResponse(res, err, result);
		});
	},
	deleteTodoItem: (req, res) => {
		todo._deleteTodoItem(req.body, (err, result) => {
			handleResponse(res, err, result);
		});
	},
	updateTodoItem: (req, res) => {
		todo._updateTodoItem(req.body, (err, result) => {
			handleResponse(res, err, result);
		});
	},
};

export default controller;