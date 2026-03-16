import { useEffect, useState } from 'react'
import './App.css'
import CardContainer from './components/CardContainer/CardContainer'
import { Modal, Form, Input, Select, DatePicker, Button, Spin } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { BASE_URL, users } from './data/data';
import dayjs from 'dayjs';

const { TextArea } = Input;

const todoDefault = {
  taskId: -1,
  title: "",
  description: "",
  statusId: 1, // To Do
  flagId: 1, // Medium
  assignedTo: -1, // userId
  deadline: dayjs(),
  attachments: []
}

function App() {
  const [data, setData] = useState([]) // Dữ liệu gốc lấy từ server về, không bị thay đổi khi filter
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const todoTasks = tasks.filter(el => el.statusId === 1)
  const inProgressTasks = tasks.filter(el => el.statusId === 2)
  const inReviewTasks = tasks.filter(el => el.statusId === 3)
  const doneTasks = tasks.filter(el => el.statusId === 4)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodo, setNewTodo] = useState(todoDefault)
  const [deleteTaskId, setDeleteTaskId] = useState(null)


  // Chạy ở lần render đầu tiên và mỗi khi component được render lại (state thay đổi)
  // useEffect(() => {
  //   // Gọi API => Mình không dùng tới (tối ưu)
  // })

  // Chạy ở lần render đầu tiên => Hay sử dụng để gọi API 
  useEffect(() => {
    // Gọi API với fetch cơ bản sẽ dụng METHOD GET
    // fetch(`${BASE_URL}/todoe`)
    //   .then(res => res.json()) // Đợi response trả về từ server
    //   .then(result => { // Đợi kết quả đã được chuyển đổi sang dạng JSON
    //     console.log("Kết quả trả về từ server", result)
    //     if (Array.isArray(result)) {
    //       setTasks([...result]) // Cập nhật lại dữ liệu vào tasks
    //     }
    //   })
    //   .catch(err => {
    //     console.log("Lỗi khi gọi API", err)
    //   })
    fetchData()

  }, [])


  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${BASE_URL}/todoes`)
      const result = await res.json()

      if (Array.isArray(result)) {
        // const formatDateResult = result.map(task => ({
        //   ...task,
        //   deadline: task.deadline ? dayjs(task.deadline) : null
        // }))

        setTasks([...result]) // Cập nhật lại dữ liệu vào tasks
        setData([...result]) // Cập nhật lại dữ liệu vào data
      }

      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log("Lỗi khi gọi API", err)
      // Thông báo lỗi
      // Reset giá trị mặc định của component
      // Xử lý lỗi khác
    }
  }

  // Chạy ở lần render đầu tiên và mỗi khi state1, state2,... thay đổi
  // useEffect(() => {
  //   // Gọi API
  // }, [state1, state2,...])


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("Dữ liệu mới nhất", newTodo)

    if (newTodo.taskId === -1) {
      // Cập nhật lại TaskId cho newTodo
      // Có thể bỏ việc truyền taskId thủ công
      const newItem = {
        ...newTodo,
        // taskId: data.length + 1
      }

      setNewTodo(newItem)

      // Đẩy todo mới vào danh sách
      // data.push(newItem)
      // Thay bằng việc gọi API POST để thêm mới dữ liệu
      fetch(`${BASE_URL}/todoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem)
      })

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
    console.log("Giá trị", e)
    console.log("Tên key", name)
    const finalName = name ? name : e.target.name
    console.log("Tên key cuối cùng", finalName)
    console.log("Giá trị key cuối cùng", e.target.value)
    setNewTodo({
      ...newTodo,
      // Cập nhật lại các key thay đổi
      // name => String key tên là name, [name] => Lấy giá trị của biến name làm key
      // Một giá null, undefined nếu . lấy key => Báo lỗi
      [finalName]: !name ? e.target.value : e
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

      {loading && <Spin fullscreen="true" />}

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

// CRUD: Create, Read, Update, Delete
// Màn hình hiển thị dữ liệu => API GET dùng để lấy dữ liệu từ server trả về
// Thêm mới dữ liệu => API POST dùng để gửi dữ liệu mới lên server
// Cập nhật dữ liệu => API PUT/PATCH dùng để gửi dữ liệu đã được chỉnh sửa lên server
// Xóa dữ liệu => API DELETE dùng để yêu cầu server xóa đi một dữ liệu nào đó

// =>
// 1. Vi pham chuẩn RESTful API
// 2. GET => Thêm mới dữ liệu (body) => GET không cho phép truyền dữ liệu qua body => Truyền dữ liệu đơn giản dạng string
// 3. POST => Lấy dữ liệu (không có cache)
// 4. PUT/PATCH => PUT (thay đổi dữ liệu ban đầu), PATCH (chỉ thay đổi 1 phần dữ liệu)

// Dùng JSON.stringify() để chuyển đổi dữ liệu thành chuỗi JSON thành sttring lưu DB