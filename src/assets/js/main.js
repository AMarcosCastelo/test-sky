/* eslint-disable no-unused-vars */
window.createHome = () => {
  const carousels = {
    highlightMovies: [],
    carouselsMovies: []
  };
  const accessibilities = {
    fontSize: 14,
    theme: ''
  };

  const init = ({ theme, fontSize }) => {
    setTheme(theme);
    setFontSize(fontSize);
    initialState();
  };

  const initialState = () => {
    initDOMEvents();
    getMovies();
  };

  const initDOMEvents = () => {
    eventToggleNavActive('.nav-item');
    eventSetThemeMode();
    eventIncreaseAndDecreaseFontSize();
  };

  const setTheme = (newTheme) => {
    accessibilities.theme = newTheme;
  };

  const eventSetThemeMode = () => {
    $('#btnSetTheme').click(() => {
      setTheme(accessibilities.theme === 'light' ? 'dark' : 'light');
      window.__setPreferredTheme(accessibilities.theme);
    });
  };

  const setFontSize = (newFontSize) => {
    accessibilities.fontSize = newFontSize;
  };

  const increaseFontSize = () => {
    const isValide = accessibilities.fontSize < 18;

    if (isValide) {
      let newFontSize = accessibilities.fontSize;
      newFontSize += 1;
      setFontSize(newFontSize);
    }
  };

  const decreaseFontSize = () => {
    const isValid =
      accessibilities.fontSize > 10 && accessibilities.fontSize <= 18;

    if (isValid) {
      let newFontSize = accessibilities.fontSize;
      newFontSize -= 1;
      setFontSize(newFontSize);
    }
  };

  const eventIncreaseAndDecreaseFontSize = () => {
    $('#increaseFont').on('click', () => {
      increaseFontSize();
      window.__setPreferredFontSize(accessibilities.fontSize);
    });

    $('#decreaseFont').on('click', () => {
      decreaseFontSize();
      window.__setPreferredFontSize(accessibilities.fontSize);
    });
  };

  const eventToggleNavActive = (elementSelector) => {
    $(elementSelector).click(function () {
      const elements = document.querySelectorAll(elementSelector);
      elements.forEach((element) => {
        if ($(element).hasClass('active')) {
          element.classList.remove('active');
        }
      });
      $(this).addClass('active');
    });
  };

  const getMovies = () => {
    $.ajax({
      url: 'https://sky-frontend.herokuapp.com/movies',
      type: 'GET',
      success: (data) => {
        setStateMoviesAndInitSliders(data);
      },
      error: (error) => {
        console.log(error.statusText, error.status);
      }
    });
  };

  const setStateMoviesAndInitSliders = (data) => {
    carousels.highlightMovies = data.filter(
      (item) => item.type === 'highlights'
    );
    carousels.carouselsMovies = data.filter(
      (item) => item.type === 'carousel-portrait'
    );

    initSliders();
  };

  const initSliders = () => {
    makeHighlightsSlider();
    makeMoviesCarousels('#wrapperCarousel1');
    makeMoviesCarousels('#wrapperCarousel2');
    makeMoviesCarousels('#wrapperCarousel3');
  };

  const makeHighlightsSlider = () => {
    const html = carousels.highlightMovies[0].items
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

    $('#sliderHighlights').html(html).removeClass('on-loading');
    initHighlightsSlider();
  };

  const makeMoviesCarousels = (id) => {
    const html = carousels.carouselsMovies.map((carousel) => {
      return `
        <div class="movies-list-carousel">
          <h2 class="movies-header-title">${carousel.title}</h2>
          <div class="movies-carousel" data-slide=${id.replace('#', '')}>
            ${carousel.movies
              .reverse()
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

    $(id).html(html);
    initMoviesCarousels(id);
  };

  const initHighlightsSlider = () => {
    $('#sliderHighlights').slick({
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
  };

  const initMoviesCarousels = (id) => {
    $(`[data-slide="${id.replace('#', '')}"]`).slick({
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
  };

  return { init };
};
