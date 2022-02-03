import "./zarejestruj.css";
import {useState} from "react";
import Axios from "axios"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import 'boxicons'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function Zarejestruj() {
  document.title = "Rejestracja"
  const navigate = useNavigate();
  const [nick, setNick] = useState("");
  const [haslo, setHaslo] = useState("");

  const RegisterFunction = () => {
    Axios.post('http://localhost:3001/rejestruj', {nick: nick, haslo: haslo}).then((response) => {
      if(response) {
          toast.success(response.data.message)
      }
    })  
  }

  const sidebarMovement = () => {
    let btn = document.querySelector("#btn");
    let sidebar = document.querySelector(".sidebar");

    btn.onclick = function() {
        sidebar.classList.toggle("active");
        
    }
    

}

  return (
    <div className="container">
    <div className='sidebar' onClick={sidebarMovement}>
            <div className='logo_content'>
                <div className='logo'>
                    <script src="https://unpkg.com/boxicons@2.1.1/dist/boxicons.js"></script>
                    <box-icon name='dice-5' color='white' size='lg' pull='left' animation='' border='circle 0px'></box-icon>
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
            <div className="App">
      
      
    </div>
    </div>
      
      <div className="LoginElements">
        <div className='RegisterInfo'>
          <h1 className='RegisterHeader'>Rejestracja</h1>
        
        <label>Login: </label>
        <input type="text" onChange={(event) =>{
          setNick(event.target.value);
        }}/>
        
        
        <label>Hasło: </label>
        <input type="password" onChange={(event) =>{
          setHaslo(event.target.value);
        }}/>

        
        <button onClick={RegisterFunction}>Zarejestruj</button>
        
        </div>
        
      </div>

      </div>
    
    
  );
}

export default Zarejestruj;
