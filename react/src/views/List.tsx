import {useEffect, useRef, useState} from "react";
import axiosClient from "../axios-client.ts";


export default function List() {


    let titleToDoRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const titleFolderRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    const [selectedOption, setSelectedOption] = useState(1);
    type ToDoItem = {
        id: number;
        title: string;
        folder_id: number;
    };
    type FolderItem = {
        id: number;
        title: string;
    };
    const [todos, setToDos] = useState<ToDoItem[]>([]);
    const [folders, setFolders] = useState<FolderItem[]>([]);

    useEffect(() => {
        axiosClient.get('/tasks')
            .then(response => {
                setToDos(response.data.tasks);
                setFolders(response.data.folders);
                // console.log(todos);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleToDoDelete = (id:number) => {
        axiosClient.delete(`/tasks/${id}`)
            .then((res) => {
                // console.log(res);
                setToDos(res.data.tasks);
            })
            .catch(err => {
                console.log(err);
            })
    };
    const handleFolder = (id:number) => {
        const payload = {
            folder_id: id,
        };
        axiosClient.post(`/tasks/folder`, payload)
            .then((res) => {
                // console.log(res);
                setToDos(res.data.tasks);
            })
            .catch(err => {
                console.log(err);
            })
    };
    const handleToDoIndex = () => {
        axiosClient.get('/tasks')
            .then(response => {
                setToDos(response.data.tasks);
                setFolders(response.data.folders);
                // console.log(todos);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const handleChange = (event: any) => {
        setSelectedOption(event.target.value);
        console.log(selectedOption);
    };
    const onSubmitToDo = (ev: any) => {
        ev.preventDefault();
        const payload = {
            title: titleToDoRef.current ? titleToDoRef.current.value : '',
            folder_id: selectedOption,
        };
        axiosClient.post('/tasks', payload)
            .then((res) => {
                // console.log(res);
                setToDos(res.data.tasks);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onSubmitFolder = (ev: any) => {
        ev.preventDefault();
        const payload = {
            title: titleFolderRef.current ? titleFolderRef.current.value : '',
        };
        axiosClient.post('/folders', payload)
            .then((res) => {
                // console.log(res);
                setFolders(res.data.folders);
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    const handleSortNew = (ev: any) => {
        ev.preventDefault();
        const sortedItems = [...todos].sort((a, b) => b.id - a.id); // создаем отсортированный массив
        setToDos(sortedItems);
    };
    const handleSortOld = (ev: any) => {
        ev.preventDefault();
        const sortedItems = [...todos].sort((a, b) => a.id - b.id); // создаем отсортированный массив
        setToDos(sortedItems);
    }
    const handleSortLetters = (ev: any) => {
        ev.preventDefault();
        const sortedItems =[...todos].sort((a, b) => {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
        setToDos(sortedItems);
    }

    return (
        <div>
            <div  className="d-flex ">
                <div  className="m-3 w-75">
                    <h3>Добавить ToDo</h3>
                    <form className="form form-control w-100 border-0" onSubmit={onSubmitToDo}>
                        <div className="form-group m-3">
                            <input ref={titleToDoRef} type="text" className="form-control" placeholder="Задача"></input>
                        </div>
                        <div className="form-group m-3">
                            <select className="btn btn-primary" value={selectedOption} onChange={handleChange}>
                                {folders.map(item => (
                                    <option  value={item.id} key={item.id}>
                                        {item.title}
                                    </option>

                                ))}
                            </select>
                        </div>
                        <button className="btn btn-success m-3" type="submit">Добавить</button>
                    </form>
                </div>
                <div className="m-3 w-25">
                    <h3>Добавить тему</h3>
                    <form className="form form-control w-100" onSubmit={onSubmitFolder}>
                        <div className="form-group m-3">
                            <input ref={titleFolderRef} type="text" className="form-control" placeholder="Тема"></input>
                        </div>
                        <button className="btn btn-success m-3" type="submit">Добавить</button>
                    </form>
                </div>

            </div >
            <div className="mt-3">
                <button className="btn btn-outline-primary mx-2" onClick={handleSortNew}>Сначала новые</button>
                <button className="btn btn-outline-primary mx-2" onClick={handleSortOld}>Сначала старые</button>
                <button className="btn btn-outline-primary mx-2" onClick={handleSortLetters}>По алфавиту</button>
            </div>
            <div  className="d-flex ">
            <div className="m-3 w-75">
                <h2 className="mx-3">Задачи</h2>
                <ul>
                    {todos.map(item => (
                        <li className="d-flex my-3 justify-content-between" key={item.id}>{item.title}
                            <button className="btn btn-danger" onClick={() => handleToDoDelete(item.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
            </div>
                <div className="mx-3 w-25">
                    <h2 className="m-3">Папки</h2>
                    <li className="nav m-3">
                        <button className="btn btn-primary" onClick={handleToDoIndex}>Все</button>
                    </li>
                    {folders.map(item => (
                        <li className="nav m-3" key={item.id}>
                            <button className="btn btn-outline-primary" onClick={() => handleFolder(item.id)}>{item.title}</button>
                        </li>

                    ))}
                </div>
            </div>
        </div>
    )
}
