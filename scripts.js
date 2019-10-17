$(document).ready(() => {
  let capKeyboard = $("#keyboard-upper-container");
  let lowKeyboard = $("#keyboard-lower-container");
  let current = 0;
  let currentLetter = 0;
  let keyList = $(".key");
  let sentences = [
    "ten ate neite ate nee enet ite ate inet ent eate",
    "Too ato too nOt enot one totA not anot tOO aNot",
    "oat itain oat tain nate eate tea anne inant nean",
    "itant eate anot eat nato inate eat anot tain eat",
    "nee ene ate ite tent tiet ent ine ene ete ene ate"
  ];
  let sentenceDiv = $("#sentence");
 sentenceDiv.text(sentences[current]);
  let $highLight = $("#yellow-block");
  let $letterDiv = $("#target-letter");
  let incorrectKeys = 0;
  let time = 0;
  let minutes;
  let $wpmDiv = $('#wpm')
  let $resetDiv = $('#reset')
  let $yesBtn = $("#yesBtn")
  // let $noBtn = $('#noBtn')

  setInterval(() => {
    time++;
    minutes = (time / 60);
    // console.log(minutes)
  }, 1000)



  function changePic(param) {
    if (param == "wrong") {
      $("#feedback").html('<img src="bad.png" width="50px" height="50px" />');
    } else if (param == "right") {
      $("#feedback").html('<img src="good.png" width="50px" height="50px" />');
    } else {
      $("#feedback").html("");
    }
  }
  //   let $letterDivText = $letterDiv.text(sentences[current][currentLetter]);
  capKeyboard.hide();

  function reset() {
    current++;
    currentLetter = 0;
    $highLight.width(0);
    $("#sentence").text(sentences[current]);
  }

  function reset2() {
    current = 0;
    currentLetter = 0;
    incorrectKeys = 0;
    $highLight.width(0);
    $wpmDiv.hide()
    $resetDiv.hide()
  }

  $('#yesBtn').click(() => {
    // reset2();
    location.reload();
  })

  var down = false;
  $wpmDiv.hide()
  $resetDiv.hide()

  $(document).keydown(function(e) {

    if (currentLetter == sentences[current].length) {
      reset();
      changePic("");
      if (current == sentences.length) {
        sentenceDiv.text(sentences[current]);
        changePic();
        $wpmDiv.show()
        $resetDiv.show()
        //words per minute
        let score = 55/minutes - 2 * incorrectKeys
      $wpmDiv.text(Math.floor(score) + ' words/minute')
      console.log(minutes)
      } 
    } else {
      if (e.key == sentences[current][currentLetter]) {
        changePic("right");
        down = true;
        currentLetter++;
        //showing letter expected
        $letterDiv.text(sentences[current][currentLetter]);
        $highLight.width(17 + $highLight.width());
        if (down) {
          return;
        }
      } else {
        changePic("wrong");

        if (e.keyCode == 16) {
          changePic("right");
        } else {
          incorrectKeys++;
        }
      }
      //reset when game over
    }
  });

  //highlighting key pressed
  $(document).keydown(function(e) {
    for (let i = 0; i < keyList.length; i++) {
      if (e.key == keyList[i].innerText) {
        $(keyList[i]).css("background-color", "yellow");

        //showing capital keyboard when 'SHIFT' pressed
      } else if (e.keyCode == 16) {
        lowKeyboard.hide();
        capKeyboard.show();
      }
    }
  });

  $(document).keyup(function(e) {
    down = false;

    //changing bg color back to normal when key unpressed
    for (let i = 0; i < keyList.length; i++) {
      if (e.key == keyList[i].innerText) {
        $(keyList[i]).css("background-color", "");
      } else if (e.keyCode == 16) {
        changePic("");
        lowKeyboard.show();
        capKeyboard.hide();
      }
    }
  });
});
