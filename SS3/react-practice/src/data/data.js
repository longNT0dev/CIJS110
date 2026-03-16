// Dữ liệu người dùng
export const users = [
    { userId: 1, name: "Nguyễn Văn A" },
    { userId: 2, name: "Trịnh Hồng M" },
    { userId: 3, name: "Lạc Khôi B" }
];

// Dữ liệu trạng thái công việc
export const taskStatus = [
    { statusId: 1, name: "To Do" },
    { statusId: 2, name: "In Progress" },
    { statusId: 3, name: "In Review" },
    { statusId: 4, name: "Done" }
];

// Dữ liệu cờ mức độ quan trọng (flag)
export const flags = [
    { flagId: 1, name: "Low", color: "#00FF00" },   // Xanh - Mức thấp
    { flagId: 2, name: "Medium", color: "#FFA500" }, // Cam - Mức trung bình
    { flagId: 3, name: "High", color: "#FF0000" }   // Đỏ - Mức cao
];

export const BASE_URL = "https://69b8064dffbcd0286096f59b.mockapi.io"