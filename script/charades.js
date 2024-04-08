// Array of movie titles with corresponding emojis
const movies = [
    //"Easy" level
    { title: "Finding Nemo", emoji: "🔍🐠🐟", difficulty: "Easy" },
    { title: "The Lion King", emoji: "🦁👑🌅", difficulty: "Easy" },
    { title: "Toy Story", emoji: "🤠🚀🧸", difficulty: "Easy" },
    { title: "The Incredibles", emoji: "🦸‍♂️🦸‍♀️💥", difficulty: "Easy" },
    { title: "Aladdin", emoji: "🧞‍♂️🕌💫", difficulty: "Easy" },
    { title: "Moana", emoji: "🌊🚣‍♀️🌺", difficulty: "Easy" },
    { title: "Frozen", emoji: "❄️⛄️👑", difficulty: "Easy" },
      //"Moderate" level
    { title: "Harry Potter", emoji: "⚡🔮🧙‍♂️", difficulty: "Moderate" },
    { title: "Jurassic Park", emoji: "🦕🦖🌿", difficulty: "Moderate" },
    { title: "Back to the Future", emoji: "⏰🔙🚗", difficulty: "Moderate" },
    { title: "Pirates of the Caribbean", emoji: "☠️🏴‍☠️⚓️", difficulty: "Moderate" },
    { title: "The Matrix", emoji: "🕶️💊💻", difficulty: "Moderate" },
    { title: "Inception", emoji: "🌀🛌🏻💭", difficulty: "Moderate" },
    { title: "The Terminator", emoji: "🤖🔫💥", difficulty: "Moderate" },
      //"Hard" level
    { title: "The Lord of the Rings", emoji: "🧝‍♂️💍🌋", difficulty: "Hard" },
    { title: "Walking Dead", emoji: "🧟🪖‍🔫", difficulty: "Hard" },
    { title: "Fight Club", emoji: "👊💥🛁", difficulty: "Hard" },
    { title: "The Shawshank Redemption", emoji: "🔨🔓🌅", difficulty: "Hard" },
    { title: "Forrest Gump", emoji: "🏃🍫🎈", difficulty: "Hard" },
    { title: "The Godfather", emoji: "👨‍👧‍👦🍊🔫", difficulty: "Hard" },
    { title: "The Silence of the Lambs", emoji: "🔪🐑👩", difficulty: "Hard" },
  ];
  
  let currentMovie;
  
  // Function to filter movies by difficulty
  function filterMoviesByDifficulty(difficulty) {
    return movies.filter(movie => movie.difficulty === difficulty);
  }
  
  // Example usage
  const easyMovies = filterMoviesByDifficulty("Easy");
  const moderateMovies = filterMoviesByDifficulty("Moderate");
  const hardMovies = filterMoviesByDifficulty("Hard");
  
  // Function to randomly select a movie
  function chooseRandomMovie(difficulty) {
    const filteredMovies = movies.filter(movie => movie.difficulty === difficulty);
    return filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
  }
  
  // Function to display emojis of the current movie
  function displayMovieEmojis() {
    document.getElementById("emojiDisplay").innerText = currentMovie.emoji;
  }
  
  // Function to check the guess
  function checkGuess() {
    const guess = document.getElementById("guessInput").value.toLowerCase();
    if (guess === currentMovie.title.toLowerCase()) {
      document.getElementById("result").innerText = "Correct! 🎉";
    } else {
      document.getElementById("result").innerText = "Incorrect! Try again.";
    }
  }
  
  // Function to start a new game
  function newMovie() {
    const selectedDifficulty = document.getElementById("levelSelect").value;
    currentMovie = chooseRandomMovie(selectedDifficulty);
    displayMovieEmojis();
    document.getElementById("guessInput").value = "";
    document.getElementById("result").innerText = "";
  }
  
  // Initial setup
  window.onload = newMovie;


  document.getElementById('difficulty').addEventListener('change', function () {
    this.style.color = this.options[this.selectedIndex].getAttribute('data-color');
  });
  
  // Initial color setting based on the selected value on page load
  window.onload = function() {
    var selectElement = document.getElementById('difficulty');
    selectElement.style.color = selectElement.options[selectElement.selectedIndex].getAttribute('data-color');
  };
  