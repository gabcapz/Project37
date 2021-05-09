class Quiz {
  constructor(){
    this.title = createElement('h1');
  }

   getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
    gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question();
      question.display();
      console.log("current start gameState : " + gameState);
      this.hideTitle();
    }
  }

  hideTitle(){
    this.title.hide();
  }

  play(){
    //write code here to hide question elements
    var question = new Question();
    question.hide();

    //write code to change the background color here
    console.log("current play gameState : " + gameState);

   if (gameState === 1){
    background("skyBlue");
    //write code to show a heading for showing the result of Quiz
    this.title.html("Results!");
    this.title.position(350, 0);

   }


    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      fill("blue");
      textSize(20);
      text("The name of the winner is highlighted in green colour!", 130, 230);
      
          //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAns = "2";

      if(correctAns === allContestants[plr].answer){
        fill("green");
        text(allContestants[plr].name + ": " + "gave the correct answer and won!", 120, 280)
      } else {
        fill("red");
        text(allContestants[plr].name + ": " + "gave the incorrect answer", 120, 310);
      }

    }
    }

    //write code to add a note here
    
  }

}
