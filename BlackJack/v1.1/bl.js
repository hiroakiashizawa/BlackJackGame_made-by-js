'use strict';

const sub = document.getElementById('submit');
const stayB = document.getElementById('stay');
const resetB = document.getElementById('reset');
const startMs = document.getElementById('start-messages');
const game = document.getElementById('game');
const finishMs = document.getElementById('finish-messages');
const test = document.getElementById('test');
const welcmMsg = document.getElementById('welcmMsg');
const creareMsg = document.getElementById('createMsg');



//トランプのカード(52枚)を配列へ
const cards = [...Array(13).keys()].map(i => ++i);
let allCards = cards + ',' + cards + ',' + cards + ',' + cards;
let allofCards = allCards.split(',');

//ゲーム数をカウント
let Count = 1;
let gameCount = 0;
let clickCount = 1;

//フォームの値を名前として扱う
let yname;
const dname = 'ディーラー';

let ycard;
let dcard;

let ytotal = 0;
let dtotal = 0;

let yStatus = '';
let dStatus = '';

class Cards {

}

function changeYstatus () {
  if (yStatus !== 'stay') {
    if (ytotal > 21) yStatus = 'burst';
  }
}

function changeDstatus () {
  if (dStatus !== 'stay') {
    if (dtotal > 21) dStatus = 'burst';
  }
}

function changeStay () {
  if (yStatus !== 'burst') yStatus = 'stay';
} 


function showMsg (content, place) {
  const p = document.createElement('p');
  const text =document.createTextNode(content)
  p.appendChild(text);
  place.appendChild(p);
}

function startMsg () {
  const startMc = "Welcome to Black Jack Game !!!";
  showMsg(startMc, welcmMsg);
}

function endGame () {
  //ゲームを終了する。
  showMsg("----- ゲーム終了 ------", finishMs);

  //resetボタン以外消す。
  //showMsg();

}

function drawCard () {
  const x = allofCards[Math.floor(Math.random() * allofCards.length)];
  return Number(allofCards.splice(x, 1));
}

function drawMsg (Name, Card) {
  const drawMc = Name + " の引いたカードは " + Card + " です。";
  showMsg(drawMc, creareMsg);
}

function totalMsg (Name, Total, Status) {
  const totalMc = Name + 'の合計は ' + Total + 'です。';
  showMsg(totalMc, creareMsg);
  if (Status === 'burst') {
    showMsg("バースト !!", creareMsg);
  }
}

function totalJudge () {
  const condition = yStatus === 'stay' || yStatus === 'burst' && dStatus === 'stay' || dStatus === 'burst';
  if (condition) {
    if (ytotal > dtotal) {
      showMsg("貴方の勝利です。", finishMs);
    } else if (ytotal === dtotal) {
      showMsg("引き分けです。", finishMs);
    } else if (ytotal < dtotal) {
      showMsg("ディーラーの勝利です", finishMs);
    } else {
      //エラー?
      ;
    }

    //endGame();

  } else {
    ;
  }
  
}

function ydrawCard () {
  if (yStatus !== "stay") {
    ycard = drawCard();
    drawMsg(yname, ycard);
    //10より大きいなら合計に10を足す
    if (ycard > 10) {
      ytotal += 10;
    } else{
      ytotal += ycard;
    }
  } else {
    const yMsg = yname + ' はStayしてます。';
    showMsg(yMsg, creareMsg);
  }
  changeYstatus();
  totalMsg(yname, ytotal, yStatus);
}

function ddrawCard () {
  if (dStatus !== "stay") {
    dcard = drawCard();
    drawMsg(dname, dcard);
    //10より大きいなら合計に10を足す
    if (dcard > 10) {
      dtotal += 10;
    } else{
      dtotal += dcard;
    }
  } else {
    const dMsg = dname + ' はStayしてます。';
    showMsg(dMsg, creareMsg);
  }
  changeDstatus();
  totalMsg(dname, dtotal, dStatus);
}

function DrawCard () {
  ydrawCard() ;
  ddrawCard() ;
}

function dealersAction () {
  if (dStatus !== 'burst') {
    if (dtotal >= 17) dStatus = 'stay';
  }
}

function  gameCountMsg () {
  if (Count === 1) {
    gameCount = "1st";
  } else if (Count === 2) {
    gameCount = "2nd";
  } else if (Count === 3) {
    gameCount = "3rd";
  } else {
    gameCount = Count + "th";
  }

  const gameCc = "----- " + gameCount + " Game Start! -----";
  showMsg(gameCc, creareMsg)
  Count++;

}

function burstCheck () {
  if (yStatus === 'burst') ytotal = 0;
  if (dStatus === 'burst') dtotal = 0;
}

function doneReset () {
  window.location.reload();
}

function hiddenButton () {
  stayB.className = 'active';
  resetB.className = 'active';
}

function oneMorecard () {
  if (Count === 1) {
    hiddenButton();
  }
  yname = document.getElementById('nmInput').value;
  gameCountMsg();
  DrawCard();
  ++clickCount;
  if (clickCount !== 1) sub.textContent = 'one more card';
  dealersAction();
  burstCheck();
  totalJudge();
}

//処理

window.onload = function () {
  startMsg();
}

sub.addEventListener('click', oneMorecard);

stayB.addEventListener('click', () => {
  changeStay();
  sub.addEventListener('click', oneMorecard);
});

resetB.addEventListener('click', doneReset);
