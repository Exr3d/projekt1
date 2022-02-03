import React from 'react'
//import './App.css'
import './home.css'
import 'boxicons'
import {useNavigate} from 'react-router-dom'

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
    return (
        
        <div className='sidebar' onClick={sidebarMovement}>
            <div className='logo_content'>
                <div className='logo'>
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
         
    );
}

export default Informacje;