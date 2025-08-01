import React from 'react';
import './Menu.css';

const Menu=({OnRouteChange})=>{
    return(
        <div className="wrapper">
            <div>
                <input onClick={OnRouteChange} value="start game" type="button" className="start"/>
            </div>
        </div>
    )
}
export default Menu;