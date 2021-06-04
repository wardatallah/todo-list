import todo from '../controllers/todoController.js';

const routes = {
	onInit: (app) => {
		// Lists
		app.route('/create-todo')
			.post(todo.createTodo);

		app.route('/get-todo-lists')
			.get(todo.getTodoLists);

		app.route('/get-todo-list/:id')
			.get(todo.getTodoList);

		app.route('/delete-todo-list')
			.post(todo.deleteTodoList);

		app.route('/update-todo-list-name')
			.post(todo.updateTodoListName);

		// Items
		app.route('/create-todo-item')
			.post(todo.createTodoItem);

		app.route('/get-todo-items/:id')
			.get(todo.getTodoItems);

		app.route('/get-todo-item/:id')
			.get(todo.getTodoItem);

		app.route('/delete-todo-item')
			.post(todo.deleteTodoItem);

		// this will be used to update description and checked columns
		app.route('/update-todo-item')
			.post(todo.updateTodoItem);

	}
};

export default routes;
