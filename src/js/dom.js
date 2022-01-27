const body = document.querySelector('body');
const sectionOne = document.querySelector('.section-1');
const sectionTwo = document.querySelector('.section-2');
const inputOne = document.querySelector('.search-1');
const inputTwo = document.querySelector('.search-2');
const API_KEY = `33ea77d3f16fb2b8edff2abc5b2e606a`;

let title = null;
let overview = null;
let releaseDate = null;
let rating = null;
let urlImage = null;
let cardOne = null;
let cardTwo = null;
let notFound = null;
let battleOne = null;
let battleTwo = null;
let movieList = {}

let dataListOne = document.createElement('datalist');
dataListOne.setAttribute('id', 'listOne');
dataListOne.setAttribute('name', 'listOne');
dataListOne.setAttribute('placeholder', 'Search for a movie');

let dataListTwo = document.createElement('datalist');
dataListTwo.setAttribute('id', 'listTwo');
dataListTwo.setAttribute('name', 'listTwo');
dataListTwo.setAttribute('placeholder', 'Search for a movie');


const createCard = (title, overview, releaseDate, rating, imgSrc, nameclass) => {
	const card = document.createElement('div');
	card.classList.add(nameclass);
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

const addMovieToList = (movie, dataList) => {
	if (movie.length <= 0) {
		return
	}

	const length = movie.length;
	for (let i = 0; i < length; i++) {
		movieList[`movie` + i] = document.createElement('option');
		movieList[`movie` + i].setAttribute('value', movie[i].original_title);
		dataList.append(movieList[`movie` + i]);
	}

	sectionOne.append(dataList);

}
const EmptyMovieList = (movie) => {
	if (movieList.movie1 || movieList.movie2 || movieList.movie3 || movieList.movie4 || movieList.movie0) {
		movieList.movie1.remove();
		movieList.movie2.remove();
		movieList.movie3.remove();
		movieList.movie4.remove();
		movieList.movie0.remove();
	}
	movieList = {}

}

let pickTheChosenOne = (list, chosenName) => {
	let chosenMovie = list.map((movie) => {
		if (movie.original_title === chosenName) {
			return movie;
		}
	})
	return chosenMovie[0];
}

const note = createNote('Searches for a movie on both sides to get started!');
body.append(note);

inputOne.addEventListener('keyup', (e) => {
	if (e.target.value.length <= 0) {
		if (cardOne) {

			cardOne.remove()
			cardOne = null
		}
		if (notFound) {
			notFound.remove()
			notFound = null
		}
		body.append(note);
		return
	}

	note.remove();
	getMoviesInfo(API_KEY, e.target.value, "en-US", "US").then((MoviesLists) => {
		const moviesList = MoviesLists.results
		if (moviesList.length === 0) {
			if (cardOne) {
				cardOne.remove()
			}
			if (notFound === null) {
				notFound = createNote('No results found');
				body.append(notFound);
			}
			return
		}
		const top5 = getMostPopularMoviesTop5(moviesList)

		addMovieToList(top5, dataListOne);
		setTimeout(() => {
			EmptyMovieList(top5)
		}, 4000);
		let chosenName = e.target.value;
		let MOVIE = pickTheChosenOne(top5, chosenName);
		if (!MOVIE) {
			return
		}
		getImageURL(MOVIE.poster_path).then((URLimg) => {
			title = MOVIE.original_title;
			overview = MOVIE.overview;
			releaseDate = MOVIE.release_date;
			rating = MOVIE.vote_average;
			urlImage = URLimg;
			setTimeout(() => {
				if (title && overview && releaseDate && rating && urlImage) {
					if (cardOne !== null) {
						cardOne.remove()
					}
					const card1 = createCard(title, overview, releaseDate, rating, urlImage, 'card-1');
					sectionOne.append(card1);
					battleOne = rating
					cardOne = document.querySelector('.card-1');
					if (notFound) {
						notFound.remove()
					}
				}
			}, 1000);
		})
	})


})



inputTwo.addEventListener('keyup', (e) => {
	if (e.target.value.length <= 0) {
		if (cardTwo) {

			cardTwo.remove()
			cardTwo = null
		}
		if (notFound) {
			notFound.remove()
			notFound = null
		}
		body.append(note);
		return
	}

	note.remove();
	getMoviesInfo(API_KEY, e.target.value, "en-US", "US").then((MoviesLists) => {
		const moviesList = MoviesLists.results
		if (moviesList.length === 0) {
			if (cardTwo) {
				cardTwo.remove()
			}
			if (notFound === null) {
				notFound = createNote('No results found');
				body.append(notFound);
			}
			return
		}
		const top5 = getMostPopularMoviesTop5(moviesList)

		addMovieToList(top5, dataListTwo);
		setTimeout(() => {
			EmptyMovieList(top5)
		}, 4000);
		let chosenName = e.target.value;
		let MOVIE = pickTheChosenOne(top5, chosenName);
		if (!MOVIE) {
			return
		}
		getImageURL(MOVIE.poster_path).then((URLimg) => {
			title = MOVIE.original_title;
			overview = MOVIE.overview;
			releaseDate = MOVIE.release_date;
			rating = MOVIE.vote_average;
			urlImage = URLimg;
			setTimeout(() => {
				if (title && overview && releaseDate && rating && urlImage) {
					if (cardTwo !== null) {
						cardTwo.remove()
					}
					const card2 = createCard(title, overview, releaseDate, rating, urlImage, 'card-2');
					sectionTwo.append(card2);
					battleTwo = rating

					cardTwo = document.querySelector('.card-2');
					if (notFound) {
						notFound.remove()
					}
				}
			}, 1000);
		})
	})


})




const BATTLE = document.querySelector('.BATTLE');
BATTLE.addEventListener('click', (e) => {
	if ((battleOne > battleTwo)) {
		cardOne.classList.add('win');
		cardTwo.classList.add('lose');

	} else if ((battleOne < battleTwo)) {
		cardOne.classList.add('lose');
		cardTwo.classList.add('win');
	}
})