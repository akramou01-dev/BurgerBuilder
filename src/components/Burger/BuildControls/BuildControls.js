import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
const controls =[
    {label : 'Salad', type : 'salad'},
    {label : 'Bacon', type : 'bacon'},
    {label : 'Meat', type : 'meat'},
    {label : 'Chesse', type : 'chesse'}
] 
const buildControls = props => (
    <div className={classes.BuildControls}>
        {controls.map((control)=> {
            return <BuildControl  key ={control.label} label={control.label}/>
        })}

    </div>
); 
export default buildControls;