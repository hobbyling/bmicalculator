var list = document.querySelector('.recordList');
var height = document.querySelector('#height');
var weight = document.querySelector('#weight');

var resultBtn = document.querySelector('.resultBtn');
var btnDiv = document.querySelector('.btnDiv');

var clearBtn = document.querySelector('.clearBtn');
var data = JSON.parse(localStorage.getItem('listData')) || [];


resultBtn.addEventListener('click',addData);
clearBtn.addEventListener('click',deleteDate);
updateList(data);


// 計算BMI
function calculateBmi(hei,wei){

  var bmi = (wei / (hei*hei)).toFixed(2);
  console.log(bmi);
  if(bmi<18.5){
    return { bmi:bmi, comment: '過輕', bgColor: 'bg-underWeight', circleColor: 'circle-underWeight', color: 'underWeight' };

  }else if (18.5 <= bmi  && bmi < 25) {
    return { bmi:bmi, comment: '理想', bgColor: 'bg-ideal', circleColor: 'circle-ideal', color: 'ideal' };

  }else if (25 <= bmi && bmi < 30) {
    return { bmi:bmi, comment: '過重', bgColor: 'bg-overWeight', circleColor: 'circle-overWeight', color: 'overWeight' };

  }else if (30 <= bmi && bmi <35) {
    return { bmi:bmi, comment: '輕度肥胖', bgColor: 'bg-mildObesity', circleColor: 'circle-mildObesity', color: 'mildObesity' };

  }else if (35 <= bmi && bmi <40) {
    return { bmi:bmi, comment: '中度肥胖', bgColor: 'bg-moderateObesity', circleColor: 'circle-moderateObesity', color: 'moderateObesity' };

  }else{
    return { bmi:bmi, comment: '重度肥胖', bgColor: 'bg-severeObesity', circleColor: 'circle-severeObesity', color: 'severeObesity' };
  }
}


//加入列表，並同步更新網頁與 localstorage
function addData(e){
  e.preventDefault();
  var Today = new Date();

  if(height.value == '' || weight.value == ''){
    alert('請輸入身高或體重');
  }else {
    var resultHeight = parseFloat(height.value);
    var resultWeight = parseFloat(weight.value);

    var result = calculateBmi(resultHeight/100,resultWeight);
    var resultComment = result['comment'];
    var resultBmi = result['bmi'];
    var resultTime = Today.getDate()+ '-' +(Today.getMonth()+1) + '-' +Today.getFullYear();

    console.log(result['bgColor']);
    var record = {
      comment: resultComment,
      bmi: resultBmi,
      weight: resultWeight,
      height: resultHeight,
      date: resultTime
    }

    data.push(record);
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));

    resultBtn.classList.remove('active');

    var str = '';
    var circle = result['circleColor'];
    var bg = result['bgColor'];
    var color = result['color'];


    str += '<div class="conclusion"><div class="conclusionCircle '+ circle +'"><span class="bmi">'+ resultBmi +'</span><span class="title">BMI</span><a href="" class="'+ bg +' resetBtn"><img src="img/icons_loop.png" alt=""></a></div><div class="comment '+ color +'">'+ resultComment +'</div></div>';

    btnDiv.innerHTML = str;

  }
}


// 更新網頁內容
function updateList(items){
  var str = '';
  var color = '';
  var len = items.length;
  for(var i=0; i<len; i++){
    if(items[i].bmi < 18.5){
      color = 'border-underWeight';
    }else if (18.5 <= items[i].bmi && items[i].bmi < 25) {
      color = 'border-ideal';
    }else if (25 <= items[i].bmi && items[i].bmi < 30) {
      color = 'border-overWeight';
    }else if (30 <= items[i].bmi && items[i].bmi <35) {
      color = 'border-mildObesity';
    }else if (35 <= items[i].bmi && items[i].bmi <40) {
      color = 'border-moderateObesity';
    }else{
      color = 'border-severeObesity';
    }

    str += '<div class="record row justify-content-between '+ color +'"><span class="col-12 col-sm-2 recordComment">'+ items[i].comment  +'</span><span class="bmi col-4 col-sm-2"><span class="title">BMI</span><span class="result recordBmi">'+ items[i].bmi +'</span></span><span class="wei col-4 col-sm-3"><span class="title">weight</span><span class="result recordWeight">'+ items[i].weight +'kg</span></span><span class="col-4 col-sm-3"><span class="title">height</span><span class="result recordHeight">'+ items[i].height +'cm</span></span><span class="col-12 col-sm-2 recordDate">'+ items[i].date +'</span></div>';
  }

  list.innerHTML = str;
}


//清空紀錄
function deleteDate(){
  var str = '';
  list.innerHTML = str;

  data.length = 0;
  localStorage.setItem('listData',JSON.stringify(data));
}
