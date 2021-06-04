import path from 'path';
import  _ from 'lodash';
import conn from '../plugins/db/index.js';

const model = {
	_createTodo: (data, cb) => {
		const { name } = data;
		if (!name) return cb('Please provide a name');
		const query = `INSERT INTO sch_todo.todo_list (name) VALUES ('${name}')`;
		conn.query(query, null, (err, result) => {
			const success = _.get(result, 'rowCount') === 1;
			if (!success) {
				return cb('Error while creating the list');
			}
			cb(err, {message: 'Success!'});
		});
	},
	_getTodoLists: (data, cb) => {
		const query = "SELECT * FROM sch_todo.todo_list";
		conn.query(query, null, (err, result) => {
			cb(err, _.get(result, 'rows'));
		});
	},
	_getTodoList: (id, cb) => {
		const query = `SELECT * FROM sch_todo.todo_list where id = $1`;
		conn.query(query, [id], (err, result) => {
			const list = _.get(result, 'rows[0]');
			if (!list) {
				return cb('List is not exist');
			}
			cb(err, list);
		});
	},
	_deleteTodoList: (body, cb) => {
		const { id } = body;
		if (!id) return cb('List ID is required');
		const query = `DELETE FROM sch_todo.todo_list where id = $1`;
		conn.query(query, [id], (err, result) => {
			const success = _.get(result, 'rowCount') === 1;
			if (!success) {
				return cb('List is not exist');
			}
			cb(err, {message: 'Success!'});
		});
	},
	_updateTodoListName: (data, cb) => {
		const {id, name} = data;
		if (!id) return cb('List ID is required');
		if (!name) return cb('List new Name is required');
		const query = `UPDATE sch_todo.todo_list set name = $1 where id = $2`;
		conn.query(query, [name, id], (err, result) => {
			const success = _.get(result, 'rowCount') === 1;
			if (!success) {
				return cb('List is not exist');
			}
			cb(err, {message: 'Success!'});
		});
	},
	_createTodoItem: (data, cb) => {
		const { description, listId } = data;
		if (!listId) return cb('Please provide the List ID');
		const query = `INSERT INTO sch_todo.todo_items (description, list_id) VALUES ($1, $2)`;
		conn.query(query, [description, listId], (err, result) => {
			const success = _.get(result, 'rowCount') === 1;
			if (!success) {
				return cb(err || 'Error while creating the list item');
			}
			cb(err, {message: 'Success!'});
		});
	},
	_getTodoItems: (id, cb) => {
		const query = "SELECT * FROM sch_todo.todo_items where list_id = $1";
		conn.query(query, [id], (err, result) => {
			cb(err, _.get(result, 'rows'));
		});
	},
	_getTodoItem: (id, cb) => {
		const query = "SELECT * FROM sch_todo.todo_items where id = $1";
		conn.query(query, [id], (err, result) => {
			let item = _.get(result, 'rows[0]');

			if (!item) {
				err = 'Item is not exist';
			}
			cb(err, item);
		});
	},
	_deleteTodoItem: (data, cb) => {
		const { id } = data;
		if (!id) return cb('Item ID is required');
		const query = `DELETE FROM sch_todo.todo_items where id = $1`;
		conn.query(query, [id], (err, result) => {
			const success = _.get(result, 'rowCount') === 1;
			if (!success) {
				return cb('Item is not exist');
			}
			cb(err, {message: 'Success!'});
		});
	},
	_updateTodoItem: (data, cb) => {
		let {id, description, checked} = data;
		let query = `UPDATE sch_todo.todo_items set`;
		const queryVars = [];
		if (checked === 'true') checked = true;
		if (checked === 'false') checked = false;
		if (!id) return cb('List ID is required');
		if(!description && typeof checked !== 'boolean') return cb('Nothing to update');
		const vars = [];
		if (description) {
			vars.push(description);
			queryVars.push(`description = $${vars.length}`);
		}
		if (typeof checked === 'boolean') {
			vars.push(checked);
			queryVars.push(`checked = $${vars.length}`);
		}
		vars.push(id);
		query += ` ${queryVars.join(',')} where id = $${vars.length}`;
		
		conn.query(query, vars, (err, result) => {
			const success = _.get(result, 'rowCount') === 1;
			if (!success) {
				return cb('Item is not exist');
			}
			cb(err, {message: 'Success!'});
		});
	},
};

export default model;