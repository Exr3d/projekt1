import './informacje.css'
import React, { useState, useEffect } from 'react';
import Axios from "axios"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import 'boxicons'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



toast.configure()

let TabZadania;
let list;
let listItems;



const sidebarMovement = () => {
    let btn = document.querySelector("#btn");
    let sidebar = document.querySelector(".sidebar");

    btn.onclick = function() {
        sidebar.classList.toggle("active");
        
    }

}



function Informacje() {
    document.title = 'Lista'
    const navigate = useNavigate();
    const [zadania, setZadania] = useState("");
    const [task, setTask] = useState("");

    const [test, setTest] = useState([
        /*{ numer: 1, zadania: 'zadanie pierwsze'},
        {numer: 2, zadania: 'zadanie drugie'}*/
    ])

    

    const [loginStatus, setLoginStatus] = useState("");
    Axios.defaults.withCredentials = true; 



    const AddTaskFunction = () => {
        Axios.post('http://localhost:3001/task', {nick: loginStatus, zadania: zadania}).then((response) => {
            if(response) {
                toast.success(response.data.message)
            }
        })
    }

    const DisplayTasks = () => {
        Axios.post('http://localhost:3001/getTask', {nick: loginStatus}).then((response) => {
            if(response){
                //toast.success(response.data.numer)
                console.log(response.data.length)
                var x =0
                TabZadania = []
                while (x < response.data.length) {
                    TabZadania[x] = "Nr. "+ response.data[x].numer + " Zadanie: " + response.data[x].zadania + " \n"; 
                    ;
                    setTask(<p>{TabZadania}</p>)
                    /*setTest([
                        { numer: response.data[x].numer, zadania: response.data[x].zadania}
                    ])*/
                    test.push(
                        { numer: response.data[x].numer, zadania: response.data[x].zadania}
                    )
                    console.log(TabZadania[x]);
                    x++; // increment
                    
                }
                
                list = response.data;
                console.log(list)
                console.log(listItems)
 
  

            }
        })
    }

    

    useEffect(() => {
        Axios.get("http://localhost:3001/todo").then((response) => {
            if (response.data.loggedIn == true) {
                console.log(response.data.user[0].nick);
                setLoginStatus(response.data.user[0].nick);
            }else{
                console.log("nie zalogowany")
            }
            
        });
      }, []);

      const addElements = () => {
        if( loginStatus != ""){
            toast.info("Mozna robic, nick: " + loginStatus);
        }else{
            toast.info("nie mozna robic")
        }
        
    }
    
    return (
        <div className="container">
            <div className='sidebar' onClick={sidebarMovement}>
                <div className='logo_content'>
                    <div className='logo' >
                        <script src="https://unpkg.com/boxicons@2.1.1/dist/boxicons.js"></script>
                        <box-icon name='world' color='white' size='lg' pull='left' animation='' border='circle 0px'></box-icon>
                        <div className='logo_name'>ToDo</div>
                    </div>
                    <box-icon name='menu' id='btn' animation='' color='white' pull='left' border='circle 0px' size='55px'></box-icon>
                </div>
                <ul className='nav_list'>
                    <li>
                        <a href="" onClick={() => {
                            navigate("/lista");
                        }}>
                        <box-icon name='grid-alt' type='solid' color='white' pull='left' border='' size='lg' animation='tada-hover'></box-icon>
                        <span className='links_name'>Lista</span>
                        </a>
                        <span className='tooltip'>To Do Lista</span>
                    </li>
                    <li>
                        <a href="" onClick={() => {
                            navigate("/zaloguj");
                        }}>
                        <box-icon name='user' color='white' size='xs' pull='left' border='circle 0px' animation='tada-hover'></box-icon>
                        <span className='links_name'>Konto</span>
                        </a>
                        <span className='tooltip'>Konto</span>
                    </li>
                    <li>
                        <a href="" onClick={() => {
                            navigate("/zarejestruj");
                        }}>
                        <box-icon name='plus' color='white' size='xs' pull='left' border='circle 0px' animation='tada-hover'></box-icon>
                        <span className='links_name'>Zarejestruj</span>
                        </a>
                        <span className='tooltip'>Zarejestruj</span>
                    </li>
                </ul>
                <div className='profile_content'>
                    <div className='profile'>
                        <div className='profile_details'>

                        </div>
                    </div>
                </div>           
            </div>

            <div className='main'>
                <div className='leftmain'>
                    <h1>Add Todo Task</h1>
                    <div className='task-inputs'>
                        <input type="text" id="new-task-text" placeholder="Write your task here!" onChange={(event ) =>{
                            setZadania(event.target.value);
                        }}/>
                        <button id="new-task-submit" onClick={AddTaskFunction}>Add task</button>
                    </div>
                </div>
                <div className='rightmain'>
                    <button onClick={DisplayTasks}>Wyświetl</button>
                    <div className='taskView'> 
                        <div>
                            
                        </div>
                        <ol className="taski">
                            {test.map((testarg) => (
                                <li className="task-test" key={testarg.numer}>
                                    <p>{testarg.zadania}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>       
            </div>
        </div>
         
    );
}

export default Informacje;