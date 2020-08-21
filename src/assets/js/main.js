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
            arrows: false,
            dots: false,
            centerMode: false,
            centerPadding: 0
          }
        }
      ]
    });
  }
};
