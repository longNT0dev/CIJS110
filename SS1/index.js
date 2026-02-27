import { formatCurrency, formatDate, formatUser, isEven, max, sum } from "./utils.js";

import X from "./utils.js";

// Bài 1
// Ctrl + Space
// Ctrl + chuột trái vào tên hàm => Đi vào phần xử lý của hàm
// productInfo(20, 42000000);
// productInfo("Iphone 17 Pro Max 512GB", 42000000);
// helpers.productInfo("Iphone 17 Pro Max 512GB", 42000000);

// sum(1, 2, 3, 4, 5, 6, 7, 8, 9, "abc");

// formatUser({ fullName: "Nam", experience: 5 })

// console.log(formatCurrency("1500000"))

// console.log(max([4, 2, 7, 1]))

// console.log(formatDate("2023-22-22"));

let arr = ["a", "b", "a", "c", "b", "a", "f", "c", "a", "b", "a", "b", "c", "a", "j", "s", "s"];
let result = {

}

for (let i = 0; i < arr.length; i++) {
    if (result[arr[i]]) {
        result[arr[i]] = result[arr[i]] + 1;
    } else {
        result[arr[i]] = 1;
    }
}


// function unique(arr) {
//     let rs = [];
//     for (let i of arr) {
//         if (!rs.includes(i)) {
//             rs.push(i);
//         }
//     }
//     return rs;
// }
// const result = unique(arr);
// //unique = [ 'a', 'b', 'c' ]
// //const countA = arr.filter(x => x === 'a').length;
// function counter(uniarr, arr) {
//     const result = []; // string[]
//     for (let j of uniarr) {
//         result.push(`${j} = ${arr.filter((x) => x === j).length}`);
//     }
//     return result;
// }
// let tresult = counter(unique(arr), arr);
// const obj = {};
// tresult.forEach((item) => {
//     const parts = item.split("=");
//     const key = parts[0];
//     const valueStr = parts[1];
//     //   const value = Number(parts[1].trim());
//     obj[key] = valueStr;
// });
// console.log(obj);