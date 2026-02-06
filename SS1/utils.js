const productInfo = (productName, price) => {
    if (typeof productName !== "string" || typeof price !== "number") {
        console.log("Dữ liệu đầu vào không hợp lệ");
        return
    }

    console.log(`Sản phẩm: ${productName}, Giá: ${price} VNĐ`)
}

const greetUser = (userName) => {
    console.log(`Xin chào ${userName}`);
}

const sumUpTo = (n) => {
    // Kiểm tra dữ liệu truyền vào có hợp lệ không
    if (typeof n !== "number") {
        console.log("Dữ liệu đầu vào không hợp lệ");

        return
    }

    // Tính tổng
    let total = 0

    for (let i = 1; i <= n; i++) {
        total += i
    }

    console.log(`Tổng từ 1 đến ${n} là: ${total}`);
}

const square = (x) => {
    if (typeof n !== "number") {
        console.log("Dữ liệu đầu vào không hợp lệ");

        return
    }

    // console.log(`Bình phương của ${x} là: ${x * x}`);
    // console.log(`Bình phương của ${x} là: ${x ** 2}`);
    console.log(`Bình phương của ${x} là: ${Math.pow(x, 2)}`);
}

const isEven = (num) => {
    if (typeof num !== "number") {
        console.log("Dữ liệu đầu vào không hợp lệ");
        return
    }

    console.log(num % 2 === 0)
}

const firstElement = (arr) => {
    if (Array.isArray(arr)) {
        // Vào đây thì arr là mảng
        if (arr.length === 0) {
            console.log("Mảng rỗng")
            return
        }

        return arr[0]
    }
}

const sum = (...numbers) => {
    // Kiểm tra các giá trị trong mảng có phải số không
    for (let num of numbers) {
        if (typeof num !== "number") {
            console.log("Dữ liệu đầu vào không hợp lệ");
            return
        }
    }

    let total = 0

    for (let num of numbers) {
        total += num
    }

    console.log("Tổng các số là:", total);
}

const formatUser = (person) => {
    // const { name, age } = person;
    // return `Name: ${name}, Age: ${age}`;
    // Kiểm tra person có phải object không
    if (typeof person !== "object" || person === null) {
        console.log("Dữ liệu đầu vào không hợp lệ");
        return
    }

    let result = ""
    for (let key in person) {
        let formatKey = key.charAt(0).toUpperCase() + key.slice(1);
        result += `${formatKey}: ${person[key]},`
    }

    result = result.slice(0, -1); // Xoá dấu phẩy cuối cùng
    console.log(result)
}

// const utils = {
//     productInfo,
//     greetUser
// }

// Trong 1 file có thể có nhiều export
export { productInfo, greetUser, sumUpTo, square, isEven, firstElement, sum, formatUser }


// Trong 1 file chỉ có 1 default export
// export default utils