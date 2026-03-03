import React from 'react'
import CardHeader from '../CardHeader/CardHeader'
import CardItem from '../CardItem/CardItem'
import "./CardContainer.css"
import { tasks } from '../../data/data'

function CardContainer({title}) {

    return (
        <div>
            <div>
                <span>Todo</span>
                <span>3</span>
            </div>

            <div>
                <span>+</span>
                <span>...</span>
            </div>

            <div className="card-content">
                {
                    // Bên trong đây sẽ là javascript
                    tasks.map( (task, i) => (
                        <CardItem key={`task-${i + 1}`} taskData={task}></CardItem>
                    ) )
                }
            </div>

        </div>
    )
}

export default CardContainer