const { useState, useEffect } = require("react");

export function List(){

    const [todo, setTodo] = useState("");
    const [btn, setBtn] = useState("add");
    const [todos, setTodos] = useState([]);
    const [editTodo, setEditTodo] = useState(null);

    const action = function(event){
        event.preventDefault();

        if(editTodo){


            const newData = {
                ...editTodo,
                activity: todo,
            }

            const result = todos.map( e => {
                if( e.id === newData.id) return newData; 
                return e;
            });

            setTodos(result);

            setDefault();
            return;
        }

        const temp = [...todos];
        temp.push({
            id: new Date().toTimeString().slice(0, 8),
            activity: todo,
            status: "not finished yet",
        })

        setTodos(temp);
        setTodo("");
    }

    const deleteTodo = function(id){
        const result = todos.filter(function(e){
            return e.id !== id;
        });

        setTodos(result);
    }

    const setDefault = function(){
        setTodo("");
        setBtn("add");
        setEditTodo(null);
    }

    useEffect(function(){}, [todos]);
    
    return (
        <div className="mx-auto w-1/2 my-10">
            <h1 className="text-center mb-5">Todo List</h1>
            <form className="flex gap-5 justify-center" onSubmit={action}>
                <input value={todo} onChange={function(event){
                    setTodo(event.target.value);
                }} className="px-2 border-0 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-slate-600 rounded" type="text" />
                <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">{ btn === "add" ? "Add" : "Save"}</button>
                { btn === "save" && <button onClick={function(){
                    setDefault(); 
                }} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="button">Cancel</button> }
            </form>
            <ul className="my-5">
                { todos.length < 1 ? 
                    ( <p className="my-5 text-center">Todos Kosong</p> ) 
                    : 
                    (todos.map(function(e, i){
                        return ( 
                            <li className="flex items-center my-4 justify-between" key={i}>
                                <h3>{e.activity}</h3>
                                <input type="checkbox" checked={e.status === "finished" ? true : false } onChange={ event => {
                                    const newData = {
                                        ...e,
                                        status: event.target.checked ? "finished" : "not finished yet",
                                    };

                                    setEditTodo(newData);

                                    const result = todos.map( e => {
                                        if( e.id === newData.id) return newData; 
                                        return e;
                                    });

                                    setTodos(result);

                                    if(btn === "add" ) setDefault();

                                }  } />
                                <p>{e.status}</p>
                                <div className="flex gap-2">
                                    <button onClick={ event => {
                                        setBtn("save");
                                        setTodo(e.activity);
                                        setEditTodo(e);
                                    }} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="button">Edit</button>
                                    <button onClick={function(){
                                        deleteTodo(e.id);
                                        setDefault();
                                    }} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="button">Delete</button>
                                </div>
                            </li>
                        )
                    })
                    )
                }
            </ul>
        </div>
    )
}
