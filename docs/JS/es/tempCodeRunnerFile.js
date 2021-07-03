{
  // caller demo {
  function callerDemo() {
    if (callerDemo.caller) {
      var a = callerDemo.caller.toString();
      console.log(a);
    } else {
      console.log("this is a top function");
    }
  }
  function handleCaller() {
    callerDemo();
  }
}