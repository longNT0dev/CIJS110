import { useState } from 'react'
import './App.css'
import CardContainer from './components/CardContainer/CardContainer'
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { data } from './data/data';

const { TextArea } = Input;

const todoDefault = {
  taskId: -1,
  title: "",
  description: "",
  statusId: 1, // To Do
  flagId: 1, // Medium
  assignedTo: -1, // userId
  deadline: new Date(),
  attachments: []
}

function App() {
  const [tasks, setTasks] = useState(data)
  const todoTasks = tasks.filter(el => el.statusId === 1)
  const inProgressTasks = tasks.filter(el => el.statusId === 2)
  const inReviewTasks = tasks.filter(el => el.statusId === 3)
  const doneTasks = tasks.filter(el => el.statusId === 4)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("")

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const newItem = {
      ...todoDefault,
    }


    newItem.taskId = data.length + 1
    newItem.title = newTitle
    // newItem.description = "Description of new task"

    console.log(newItem)
    data.push(newItem)

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log("cancel")
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    console.log(e.target.value)

    const value = e.target.value.toLowerCase()
    const filteredTasks = data.filter(task => task.title.toLowerCase().includes(value) || task.description.toLowerCase().includes(value))
    setTasks(filteredTasks)
  }

  const handleChangeTitle = (e) => {
    const value = e.target.value

    setNewTitle(value)
  }

  return (
    <div className='container'>
      <header>
        <span className="navbar-logo">TaskBoard</span>
      </header>

      <main>
        <div className="search-bar">
          <Input
            style={{ width: '220px', height: '36px', borderRadius: '8px' }}
            prefix={<SearchOutlined style={{ color: '#9fa3b0' }} />}
            placeholder="Search items"
            onChange={handleChange}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            New Item
          </Button>
        </div>

        <div className="board-wrapper">
          <CardContainer title="To do" tasks={todoTasks} />
          <CardContainer title="In Progress" tasks={inProgressTasks} />
          <CardContainer title="In Review" tasks={inReviewTasks} />
          <CardContainer title="Done" tasks={doneTasks} />
        </div>
      </main>

      <Modal
        title="Save task"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <Form layout="vertical">
          <div style={{ display: "flex", gap: "12px" }}>

            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
              style={{ flex: 1 }}
              onChange={handleChangeTitle}
            >
              <Input placeholder="Type title of task" />
            </Form.Item>

            <Form.Item
              label="End Date"
              name="endDate"
            >
              <DatePicker format="DD / MM / YYYY" />
            </Form.Item>

          </div>

          <Form.Item label="Description" name="description">
            <TextArea rows={3} placeholder="Type description..." />
          </Form.Item>

          <div style={{ display: "flex", gap: "12px" }}>

            <Form.Item label="Status" name="status" style={{ flex: 1 }}>
              <Select placeholder="Choose status">
                <Option value={1}>To do</Option>
                <Option value={2}>In Progress</Option>
                <Option value={3}>In Review</Option>
                <Option value={4}>Done</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Assign" name="assign" style={{ flex: 1 }}>
              <Select>
                <Option value="a">Nguyễn Văn A</Option>
                <Option value="b">Trần Văn B</Option>
              </Select>
            </Form.Item>

          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "10px"
            }}
          >
            <Button onClick={handleCancel}>
              Cancel
            </Button>

            <Button
              type="primary"
              style={{
                background: "linear-gradient(90deg,#6a5af9,#7c4dff)",
                border: "none"
              }}
              onClick={handleOk}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>

      <footer>© 2026 TaskBoard · All rights reserved</footer>
    </div>
  )
}

export default App


// Khái niệm callback

// function A(x) {
//   // Xử lý logic bên trong hàm A
//   // Trồng cam
//   // Ra quả

//   // x hàm B


//   // Gọi hàm B : hái quả
//   x() 
// }

// function B() { // B chính là calback
//   // Hái quả
// }

// A(B)

// addEventListener("click", (event) => {

// })