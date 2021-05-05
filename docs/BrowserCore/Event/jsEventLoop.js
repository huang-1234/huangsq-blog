/* 
//#region 
// setTimeout1
setTimeout(() => {
  console.log(1)

  new Promise((resolve) => {
    resolve()
  // Promise1
  }).then(() => {
    console.log(2)
  });
})

// setTimeout2
setTimeout(() => {
  console.log(3)
})

new Promise((resolve) => {
  console.log(4)
  resolve()
  console.log(5)
// Promise2
}).then(() => {
  console.log(6)
})

console.log(7)

new Promise((resolve) => {
  resolve()
// Promise3
}).then(() => {
  console.log(8)
})
//#endregion
 */

// setTimeout(function () {
//     console.log(1);
// });

new Promise(function(resolve,reject){
    console.log(2)
    resolve(3)
}).then(function(val){
  console.log(val);
  return 'P1第二个then'
}).then(
  (val) => {
   console.log(val); 
  }
)

//
new Promise(function(resolve,reject){
    console.log(22)
    resolve(33)
}).then(function(val){
  console.log(val);
  return 'P2第二个then'
}).then(
  (val) => {
    console.log(val); 
  }
)

/* 
let f1 = async (a) => {
  console.log('宏任务第一层');
  let num1 = await new Promise((res, rej) => {
    console.log(8)
    res(a)
  }).then(async (val) => {
    console.log(10)
    return await val
  })
  console.log(num1)
  console.log(7)
}
f1(6)
 */

let f1 = async (a) => {
  console.log('宏任务第一层');
  let num1 = await new Promise((res, rej) => {
    console.log(8)
    res(a)
  }).then((val) => {
    // console.log(10)
    return  val
  })
  console.log(num1)
  console.log(7)
}
f1(6)
