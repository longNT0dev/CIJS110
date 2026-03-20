import { Button } from 'antd'
import React from 'react'
import './CardItem.css'
import { PaperClipOutlined, FlagFilled, ClockCircleOutlined } from '@ant-design/icons'
import { flags, users } from '../../data/data'
import { formatDate } from '../../utils/dateFormat'
import { useUserContext } from '../../contexts/UserContext'

function CardItem({ taskData, openModalEdit, openModalDelete }) {
    const { title, description, assignedTo, attachments, flagId, deadline, taskId } = taskData
    const flagColor = flags.find(flag => flag.flagId == flagId)?.color || "#000000"
    const userName = users.find(user => user.userId == assignedTo)?.name || "Unassigned"
    const { user, setUser } = useUserContext()

    return (
        <div className="card">
            <div className="card-header">
                <span className="card-title">{title}</span>
                <span className="card-edit" onClick={() => openModalEdit(taskId)}>✏️</span>
                <span className="card-edit" onClick={() => openModalDelete(taskId)}>X</span>
            </div>

            <div className="card-desc">
                {description} {user.dob}
            </div>

            <Button className="card-btn">
                {userName}
            </Button>

            <div className="card-footer">
                <div className="footer-item">
                    <PaperClipOutlined />
                    <span>{attachments?.length || 0}</span>
                </div>

                <div className="footer-item flag">
                    <FlagFilled style={{ color: flagColor }} />
                </div>

                <div className="footer-item time">
                    <ClockCircleOutlined />
                    <span>{formatDate(deadline)}</span>
                </div>
            </div>
        </div>
    )
}

export default CardItem