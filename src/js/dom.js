const body = document.querySelector('body');
const sectionOne = document.querySelector('.section-1');
const sectionTwo = document.querySelector('.section-2');
const inputOne = document.querySelector('.search-1');
const inputTwo = document.querySelector('.search-2');
const API_KEY = `33ea77d3f16fb2b8edff2abc5b2e606a`;



const createCard = (title, overview, releaseDate, rating, imgSrc) => {
	const card = document.createElement('div');
	card.classList.add('card-1');
	const sectionOne1 = document.createElement('section');
	sectionOne1.classList.add('section-1-1');
	const sectionOne2 = document.createElement('section');
	sectionOne2.classList.add('section-1-2');
	const sectionOne3 = document.createElement('section');
	sectionOne3.classList.add('section-1-3');
	const img = document.createElement('img');
	img.src = imgSrc;
	const information = document.createElement('div');
	information.classList.add('information');
	const titles = document.createElement('h3');
	titles.textContent = title;
	const overviews = document.createElement('p');
	overviews.textContent = overview;
	const releaseDates = document.createElement('h3');
	releaseDates.textContent = `releaseDate`;
	const releaseDateContent = document.createElement('p');
	releaseDateContent.textContent = releaseDate;
	const ratings = document.createElement('h3');
	ratings.textContent = `rating`;
	const ratingContent = document.createElement('p');
	ratingContent.textContent = rating;

	card.append(sectionOne1, sectionOne2, sectionOne3);
	sectionOne1.append(img);
	sectionOne1.append(information);
	information.append(titles, overviews);
	sectionOne2.append(releaseDates, releaseDateContent);
	sectionOne3.append(ratings, ratingContent);
	return card;
}

const createNote = (text) => {
	const note = document.createElement('div');
	note.classList.add('note');
	note.textContent = text;
	return note;
}

const getMoviesInfo = async (API_KEY, NAME, LANGUAGE, REGION) => {
	const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${NAME}&language=${LANGUAGE}&region=${REGION}`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

const getMostPopularMoviesTop5 = (moviesList) => {
	const mostPopularMovies = [];
	let copy = [...moviesList];
	while (mostPopularMovies.length < 5) {
		if (copy.length === 0) {
			break
		}
		let theOne = copy[0]
		let top = copy[0].popularity;
		copy.map((movie) => {
			if (movie.popularity > top) {
				theOne = movie;
				top = movie.popularity;
			}
		})
		mostPopularMovies.push(theOne)
		const index = copy.indexOf(theOne)
		copy.splice(index, 1)
	}
	return mostPopularMovies;
}

const getImageURL = async (poster_path) => {
	const imageURL = `https://image.tmdb.org/t/p/w500${poster_path}`
	return imageURL
}





const note = createNote('Searches for a movie on both sides to get started!');
body.append(note);


inputOne.addEventListener('keyup', (e) => {
	note.remove();
	getMoviesInfo(API_KEY, e.target.value, "en-US", "US").then((MoviesLists) => {
		const moviesList = MoviesLists.results
		const top5 = getMostPopularMoviesTop5(moviesList)
		const MOVIE = top5[0]
		getImageURL(MOVIE.poster_path).then((URLimg) => {
			const card1=createCard(MOVIE.original_title,MOVIE.overview,MOVIE.release_date,MOVIE.vote_average,URLimg);
			sectionOne.append(card1);

		})

	})

})


//FIXME error when input is empty
//TODO show a list of the film in select item and when you click it then i added automaticly
//TODO create the functionality of the seconde input
//TODO show the winner movie by applying the green color to all component and the lose movie red color
//TODO create a button to restart the game
//TODO change it to PWA : use inject manifest