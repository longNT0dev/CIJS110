import { useState } from 'react'
import './App.css'
import CardContainer from './components/CardContainer/CardContainer'
import { Modal, Form, Input, Select, DatePicker, Button } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { data, users } from './data/data';
import dayjs from 'dayjs';

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
  const [newTodo, setNewTodo] = useState(todoDefault)
  const [deleteTaskId, setDeleteTaskId] = useState(null)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("Dữ liệu mới nhất", newTodo)

    if (newTodo.taskId === -1) {
      // Cập nhật lại TaskId cho newTodo
      const newItem = {
        ...newTodo,
        taskId: data.length + 1
      }

      setNewTodo(newItem)
      // Đẩy todo mới vào danh sách
      data.push(newItem)

      setIsModalOpen(false);
    } else {
      // Trả về Object => Tham chiếu
      const itemUpdate = data.find(task => task.taskId === newTodo.taskId)

      if (itemUpdate) {
        itemUpdate.title = newTodo.title
        itemUpdate.description = newTodo.description
        itemUpdate.statusId = newTodo.statusId
        itemUpdate.assignedTo = newTodo.assignedTo
        itemUpdate.deadline = newTodo.deadline

        setIsModalOpen(false);
      }
    }


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

  const handleChangeInput = (e, name) => {
    const finalName = name ? name : e.target.name
    setNewTodo({
      ...newTodo,
      // Cập nhật lại các key thay đổi
      // name => String key tên là name, [name] => Lấy giá trị của biến name làm key
      // Một giá null, undefined nếu . lấy key => Báo lỗi
      [finalName]: e?.target?.value ? e.target.value : e
    })
    // switch (name) {
    //   case "deadline":
    //     // console.log("Xử lý riêng cho thông tin deadline", e)
    //     setNewTodo({
    //       ...newTodo,
    //       // Cập nhật lại các key thay đổi
    //       // name => String key tên là name, [name] => Lấy giá trị của biến name làm key
    //       [name]: e
    //     })
    //     break
    //   case "statusId":
    //     // console.log("Xử lý riêng cho thông tin statusId", e)
    //     setNewTodo({
    //       ...newTodo,
    //       // Cập nhật lại các key thay đổi
    //       // name => String key tên là name, [name] => Lấy giá trị của biến name làm key
    //       [name]: e
    //     })
    //     break
    //   case "assignedTo":
    //     // console.log("Xử lý riêng cho thông tin assignedTo", e)
    //     setNewTodo({
    //       ...newTodo,
    //       // Cập nhật lại các key thay đổi
    //       // name => String key tên là name, [name] => Lấy giá trị của biến name làm key
    //       [name]: e
    //     })
    //     break
    //   default:
    //     // Tất cả những thẻ còn lại có name
    //     // console.log("Tên key bị thay đổi", e.target.name)
    //     // console.log("Giá trị mới", e.target.value)
    //     setNewTodo({
    //       ...newTodo,
    //       // Cập nhật lại các key thay đổi
    //       // name => String key tên là name, [name] => Lấy giá trị của biến name làm key
    //       [e.target.name]: e.target.value
    //     })
    //     break
    // }
    // console.log(e)
    // const value = e.target.value

    // setNewTitle(value)
  }

  const openModalEdit = (taskId) => {
    console.log("Yêu cầu mở modal edit của", taskId)
    const taskEdit = data.find(task => task.taskId === taskId)
    if (taskEdit) {
      setNewTodo({
        ...taskEdit,
        deadline: taskEdit.deadline ? dayjs(taskEdit.deadline) : new Date()
      })
      setIsModalOpen(true)
    }
  }

  const openModalDelete = (taskId) => {
    setDeleteTaskId(taskId)
  }

  const closeModalDelete = () => {
    setDeleteTaskId(null)
  }

  const handleDeleteToDo = () => {
    const index = data.findIndex(task => task.taskId === deleteTaskId)

    if (index !== -1) {
      data.splice(index, 1) // Xóa đi x phần tử từ vị trí index
      setTasks([...data])
    }

    setDeleteTaskId(null)
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
          <CardContainer title="To do" tasks={todoTasks} openModalEdit={openModalEdit} openModalDelete={openModalDelete} />
          <CardContainer title="In Progress" tasks={inProgressTasks} openModalEdit={openModalEdit} openModalDelete={openModalDelete} />
          <CardContainer title="In Review" tasks={inReviewTasks} openModalEdit={openModalEdit} openModalDelete={openModalDelete} />
          <CardContainer title="Done" tasks={doneTasks} openModalEdit={openModalEdit} openModalDelete={openModalDelete} />
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
              rules={[{ required: true, message: "Title is required" }]}
              style={{ flex: 1 }}
            >
              <Input placeholder="Type title of task" name="title" value={newTodo.title} onChange={handleChangeInput} />
            </Form.Item>

            <Form.Item
              label="End Date"
            >
              <DatePicker format="DD/MM/YYYY" name="deadline" value={newTodo.deadline} onChange={(e) => handleChangeInput(e, "deadline")} />
            </Form.Item>

          </div>

          <Form.Item label="Description">
            <TextArea name="description" value={newTodo.description} onChange={handleChangeInput} rows={3} placeholder="Type description..." />
          </Form.Item>

          <div style={{ display: "flex", gap: "12px" }}>

            <Form.Item label="Status" style={{ flex: 1 }}>
              <Select placeholder="Choose status" name="statusId" value={newTodo.statusId} onChange={(e) => handleChangeInput(e, "statusId")}>
                <Option value={1}>To do</Option>
                <Option value={2}>In Progress</Option>
                <Option value={3}>In Review</Option>
                <Option value={4}>Done</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Assign" style={{ flex: 1 }}>
              <Select name="assignedTo" value={newTodo.assignedTo} onChange={(e) => handleChangeInput(e, "assignedTo")}>
                {
                  users.map((user, i) => (
                    <Option key={`user-${i}`} value={user.userId}>{user.name}</Option>
                  ))
                }

                {/* <Option value="a">Nguyễn Văn A</Option>
                <Option value="b">Trần Văn B</Option> */}
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

      <Modal title="Xác nhận xóa công việc"
        open={deleteTaskId !== null}
        onCancel={closeModalDelete}
        footer={null}
        width={500}>
        <p>Bạn có chắc chắn muốn xóa công việc này không?</p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "10px"
          }}
        >
          <Button onClick={closeModalDelete}>
            Cancel
          </Button>

          <Button
            type="primary"
            style={{
              background: "linear-gradient(90deg,#6a5af9,#7c4dff)",
              border: "none"
            }}
            onClick={handleDeleteToDo}
          >
            Accept
          </Button>
        </div>
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