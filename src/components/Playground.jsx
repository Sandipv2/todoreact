import { useState, useEffect } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const Playground = () => {
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [finished, setFinished] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data) {
      setAllTodos(JSON.parse(data));
    }
  }, []);

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAddBtn = () => {
    const newTodo = { id: uuidv4(), todo, isComplete: false };
    const newAllTodos = [...allTodos, newTodo];
    setAllTodos(newAllTodos);
    setTodo("");
    saveToLS(newAllTodos);

    document.querySelector("#todoInput").focus();
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = allTodos.findIndex((item) => {
      return item.id == id;
    });

    let newAllTodos = [...allTodos];
    newAllTodos[index].isComplete = !newAllTodos[index].isComplete;
    setAllTodos(newAllTodos);
    saveToLS(newAllTodos);
  };

  const handleDelete = (e, id) => {
    let newTodos = allTodos.filter((item) => {
      return item.id !== id;
    });

    setAllTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleEdit = (e, id) => {
    const t = allTodos.filter((item) => item.id === id);
    setTodo(t[0].todo);

    const newAllTodos = allTodos.filter((item) => {
      return item.id !== id;
    });

    setAllTodos(newAllTodos);
    saveToLS();
  };

  const handleShowFinish = () => {
    setFinished(!finished);
  }

  return (
    <div className="container h-[90vh] md:h-[100vh] flex justify-center items-center">
      <div className="bg-gray-800 w-[90vw] md:w-[50%] h-[70vh] md:min-h-[85vh] p-5 rounded-xl  mt-[3.5rem]">
        <div className="flex justify-center gap-2">
          <input
            type="text"
            autoFocus
            className="w-full  bg-gray-600 rounded-2xl px-2 outline-none"
            onChange={handleInputChange}
            value={todo}
            id="todoInput"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleAddBtn();
              }
            }}
          />
          <button
            className="text-4xl hover:opacity-70 duration-300"
            onClick={handleAddBtn}
            disabled={todo.length === 0}
          >
            <BiPlusCircle />
          </button>
        </div>
        <input type="checkbox" className="h-[0.95rem] w-[0.95rem] my-5" onChange={handleShowFinish}/> Show
        Finished Todo
        <hr />
        <div className="mt-5 flex flex-col gap-4 overflow-y-scroll h-[80%] text-3xl">
          {allTodos.map((item) => {
            return (finished || item.isComplete) && (
              <div key={item.id} className="flex justify-between">
                <div className="flex gap-2 text-xl">
                  <input
                    className="w-[0.95rem]"
                    type="checkbox"
                    name={item.id}
                    checked={item.isComplete}
                    onChange={handleCheckBox}
                  />
                  <p
                    className={
                      item.isComplete ? "line-through custom-line-through" : ""
                    }
                  >
                    {item.todo}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button className="hover:opacity-70 duration-300">
                    <BiEdit
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                    />
                  </button>
                  <button className="hover:opacity-70 duration-300">
                    <MdDelete
                      className="text-red-600 "
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Playground;
