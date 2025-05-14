import { Dialog } from "primereact/dialog";
import { useState } from "react";
import "primeicons/primeicons.css";
import image from "../assets/image.png";

const Todolist = () => {
  const [visible, setVisible] = useState(false);

  interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
  }

  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const addTodo = () => {
    if (newTodo !== "") {
      const newId = crypto.randomUUID();
      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
      setVisible(false); // Close dialog after adding
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1 className="text-5xl font-bold">Todolist</h1>
      <input
        type="text"
        className="border-2 border-purple-300 rounded-md p-2 mt-4 w-[50rem]"
        placeholder="Search for a task"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="flex flex-col items-center mt-4">
        {todos.length === 0 ? (
          <img src={image} className="" />
        ) : (
          <div>
            {todos
              .filter((item) =>
                item.text.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((todo) => (
                <div
                  key={todo.id}
                  className="bg-purple-200 w-[50rem] h-[5rem] rounded-md flex items-center justify-between p-4 mb-2"
                >
                  <p className="text-lg">{todo.text}</p>
                  <button
                    className="bg-purple-500 text-white px-4 py-2 rounded-md"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        )}
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md"
          onClick={() => setVisible(true)}
        >
          Add task
        </button>
        <div className="flex justify-center mt-4">
          <Dialog
            className="bg-white w-[30rem] h-[30rem] backdrop-blur-2xl p-[3rem] border-2 rounded-3xl border-purple-500"
            visible={visible}
            onHide={() => setVisible(false)}
          >
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Add a new task</h2>
              <input
                type="text"
                className="border-2 border-purple-300 rounded-md p-2 w-full"
                placeholder="Task name"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />

              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={addTodo} // Corrected here
              >
                Add Task
              </button>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
export default Todolist;
