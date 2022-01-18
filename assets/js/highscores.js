const highScoresList = document.querySelector('#highScoresList');
highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = 
highScores.map(score => {
    var li = document.createElement(li);
    li.innerHTML = score.name - score.score
    document.appendChild(li);
}).join();