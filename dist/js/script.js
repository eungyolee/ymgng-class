const resetButton = document.querySelector("#resetBtn");
const startButton = document.querySelector("#startBtn");

// prettier-ignore
function readFile(a,c){var b=new XMLHttpRequest();b.overrideMimeType("application/json");b.open("GET",a,true);b.onreadystatechange=function(){if(b.readyState===4&&b.status=="200"){c(b.responseText)}};b.send(null)}
// prettier-ignore
function divText(i,j,num,data){var x=document.getElementsByName(`${i}-${j}`);x[0].innerText=data[num]["name"];x[1].innerText=data[num]["number"]+"번";}

startButton.addEventListener("click", function () {
  change("all");

  // 초기화버튼 활성화
  resetButton.disabled = false;
});
resetButton.addEventListener("click", function () {
  d = 0;
  for (var i = 1; i < 6; i++) {
    for (var j = 1; j < 6; j++) {
      var x = document.getElementsByName(`${i}-${j}`);
      x[0].innerText = "???";
      x[1].innerText = "?";
      d++;
    }
  }
  resetButton.disabled = true; // 초기화버튼 비활성화
});

// 배열 안에중복된 값이 있는지 확인
function isDuplicate(arr) {
  const isDup = arr.some(function (x) {
    return arr.indexOf(x) !== arr.lastIndexOf(x);
  });
  return isDup;
}

function change(range) {
  readFile("dist/data.json", (data) => {
    var input = JSON.parse(data);
    var output = [];

    while (input.length > 0) {
      var temp = input.splice(Math.floor(Math.random() * input.length), 1)[0];
      output.push(temp);
    }

    d = 0;
    for (var i = 1; i < 6; i++) {
      // 분단별 반복
      for (var j = 1; j < 6; j++) {
        // 세로 자리별 반복
        for (var j = 1; j < 6; j++) {
          divText(i, j, d, output);
          d++;
        }
      }
    }
  });
}
