import React from 'react'
import "./CardContainer.css"
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons'
import CardItem from '../CardItem/CardItem'

function CardContainer({ title, tasks = [] }) {
    return (
        <div className="card-container">
            <div className="container-header">
                <div className="container-header-left">
                    <span className="container-title">{title}</span>
                    <span className="container-count">{tasks.length}</span>
                </div>
                <div className="container-header-right">
                    <button className="icon-btn"><PlusOutlined /></button>
                    <button className="icon-btn"><EllipsisOutlined /></button>
                </div>
            </div>

            <div className="card-content">
                {tasks.map((task, i) => (
                    <CardItem key={`task-${i + 1}`} taskData={task} />
                ))}
            </div>
        </div>
    )
}

export default CardContainer