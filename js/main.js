$(document).ready(()=>{
    $('#searchForm').on('submit', (e)=>{
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    })
});

function getMovies(searchText){
    axios.get('http://www.omdbapi.com/?apikey=494352d6&s='+searchText)
    .then((response) => {
        let movies = response.data.Search;
        let outPut = '';
        $.each(movies, (index, movie) => {
            outPut += `
            <div class='col-md-3'>
                <div class='well text-center'>
                <img src='${movie.Poster}'
                    <p><h5>${movie.Title}</h5></p>
                    <a href='#' class="btn btn-primary" onClick="movieSelected('${movie.imdbID}')">Movie Details</a>
                </div>
            </div>
            `;
        });
        $('#movies').html(outPut);
    }).catch((err) =>{
        console.log("err ++++++++++", err);
    })
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html'
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    axios.get('http://www.omdbapi.com/?apikey=494352d6&i='+movieId)
    .then((response) => {
        let movie = response.data;

        let outPut = `
        <div class='row'>
            <div class='col-md-4'>
                <img src='${movie.Poster}' class='thumbnail' />
            </div>
            <div class='col-md-8'>
                <h2>${movie.Title}</h2>
                <ul class='list-group'>
                    <li class='list-group-item'>Genre:<strong> ${movie.Genre}</strong></li>
                    <li class='list-group-item'>Released:<strong> ${movie.Released}</strong></li>
                    <li class='list-group-item'>Rated:<strong> ${movie.Rated}</strong></li>
                    <li class='list-group-item'>IMDB rating:<strong> ${movie.imdbRating}</strong></li>
                    <li class='list-group-item'>Director:<strong> ${movie.Director}</strong></li>
                    <li class='list-group-item'>Writer:<strong> ${movie.Writer}</strong></li>
                    <li class='list-group-item'>Actors:<strong> ${movie.Actors}</strong></li>
                </ul>
            </div> 
        </div>
        <div class="row">
            <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="https://imdb.com/title/${movie.imdnID}" target="_blank" class="btn btn-primary ">View imdb</a>
            <a href="index.html" class="btn btn-secondary">Goback to search</a>
            </div>
        </div>
        `;
        $('#movie').html(outPut);
    }).catch((err) => {
        console.log("err ++++++++++", err);
    })
}