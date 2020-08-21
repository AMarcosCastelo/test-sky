window.home = {
  highlightMovies: [],
  carouselsMovies: [],

  init() {
    this.initialState();
  },

  initialState() {
    this.initDOMEvents();
    this.getMovies();
  },

  initDOMEvents() {
    this.toggleNavActive('.nav-item');
  },

  toggleNavActive(elementSelector) {
    $(elementSelector).click(function () {
      const elements = document.querySelectorAll(elementSelector);
      elements.forEach((element) => {
        if ($(element).hasClass('active')) {
          element.classList.remove('active');
        }
      });
      $(this).addClass('active');
    });
  },

  getMovies() {
    $.ajax({
      url: 'https://sky-frontend.herokuapp.com/movies',
      type: 'GET',
      success: (data) => {
        this.setState(data);
      },
      error: (error) => {
        console.log(error.statusText, error.status);
      }
    });
  },

  setState(data) {
    this.highlightMovies = data.filter((item) => item.type === 'highlights');
    this.carouselsMovies = data.filter(
      (item) => item.type === 'carousel-portrait'
    );
    this.makeHighlightsSlider();
    this.makeMoviesCarousels();
  },

  makeHighlightsSlider() {
    const html = this.highlightMovies[0].items
      .map((item) => {
        return `
        <div class="item">
          <a href="#">
            <img src="${item.images[0].url}"
            alt="${item.title}"
            title="${item.title}">
          </a>
        </div>`;
      })
      .join('');

    $('.slider').html(html).removeClass('on-loading');
    this.initHighlightsSlider();
  },

  makeMoviesCarousels() {
    const html = this.carouselsMovies.map((carousel) => {
      return `
        <div class="movies-list-carousel">
          <h2 class="movies-header-title">${carousel.title}</h2>
          <div class="movies-carousel">
            ${carousel.movies
              .map((movie) => {
                return `
              <div class="item ${movie.isBlocked ? 'blocked' : ''}">
                <div class="movie-img">
                  <a href="#">
                    <img src="${movie.images[0].url}" alt="${movie.title}" />
                  </a>
                </div>
              </div>
            `;
              })
              .join('')}
          </div>
        </div> `;
    });

    $('.wrapper-carousel').html(html);
    this.initMoviesCarousels();
  },

  initHighlightsSlider() {
    $('.slider').slick({
      centerMode: true,
      centerPadding: '25%',
      dots: true,
      autoplay: false,
      autoplaySpeed: 1000,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            dots: false,
            arrows: false,
            centerMode: false,
            centerPadding: 0
          }
        }
      ]
    });
  },

  initMoviesCarousels() {
    $('.movies-carousel').slick({
      initialSlide: 0,
      slidesToShow: 7,
      slidesToScroll: 7,
      infinite: false,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5
          }
        },
        {
          breakpoint: 768,
          settings: {
            centerMode: false,
            arrows: false,
            slidesToShow: 4,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 599,
          settings: {
            centerMode: false,
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
};
