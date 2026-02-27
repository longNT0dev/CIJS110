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

const formatCurrency = (amount) => {
    if (typeof amount !== "number" && typeof amount !== "string") {
        console.log("Dữ liệu đầu vào không hợp lệ");
        return
    }

    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

const max = (arr) => {
    if (Array.isArray(arr) && arr.length === 0) return console.log("Empty Array");

    // let maxValue = arr[0];
    // for (let i = 1; i < arr.length; i++) {
    //     if (arr[i] > maxValue) {
    //         maxValue = arr[i];
    //     }
    // }
    // return maxValue;

    return Math.max(...arr)
};

const isPrime = (number) => { // 4
    if (typeof number !== "number" || number < 2) {
        return false
    }
    // Số nguyên tố là số chỉ chia hết cho 1 và chính nó
    for(let i = 2; i < number; i++) {
        if(number % i == 0) {
            return false
        }
    }

    return true
}

const formatDate = (date, countryFormat = "vi-VN", splitChar = "-") => {
    // if(typeof date != "string") {
    //     console.log("Dữ liệu đầu vào không hợp lệ");
    //     return
    // }

    // let dateSplit = date.split(splitChar); // 2023-08-15 => ["2023", "08", "15"]

    // if(dateSplit.length != 3) {
    //     console.log("Dữ liệu đầu vào không hợp lệ");
    //     return
    // }

    // let [year, month, day] = dateSplit; // let [x, y, z] = [a, b, c] // Destructuring

    // if(year.length != 4 || month.length != 2 || day.length != 2) {
    //     console.log("Dữ liệu đầu vào không hợp lệ");
    //     return
    // }

    // return `${day}${splitChar}${month}${splitChar}${year}`;

    const parsedDate = new Date(date);

    // Kiểm tra giá trị parse có hợp lệ hay không
    if(parsedDate.toString() === "Invalid Date") {
        console.log("Dữ liệu đầu vào không hợp lệ");
        return
    }

    return new Intl.DateTimeFormat(countryFormat).format(parsedDate);
}


const countOccurrences = (arr, value) => {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            count++;
        }
    }

    return count;
}

const sortAsc = (arr) => {
    // Thuật toán bubble sort
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // Hoán đổi
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}


// const utils = {
//     productInfo,
//     greetUser
// }

// Trong 1 file có thể có nhiều export
export { productInfo, greetUser, sumUpTo, square, isEven, firstElement, sum }

export { formatUser, formatCurrency, max, formatDate }

export default a


// Trong 1 file chỉ có 1 default export
// export default utils