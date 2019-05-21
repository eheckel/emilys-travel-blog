function square(x) {
    return x * x;
  }
  function demoVarHoisting(foo) {
    if (foo === "bar") {
      var x = 3;
    } else {
      var x = 4;
    }
    console.log(confirm(x));
  }
  let thanker = function(name) {
    return "tak " + name;
  }

  let thankArrow = (name) => "tak " + name;