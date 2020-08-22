window.home={carousels:{highlightMovies:[],carouselsMovies:[]},accessibilities:{fontSize:14,theme:""},init({theme:e,fontSize:i}){this.setTheme(e),this.setFontSize(i),this.initialState()},initialState(){this.initDOMEvents(),this.getMovies()},initDOMEvents(){this.toggleNavActive(".nav-item"),this.eventSetThemeMode(),this.eventIncreaseAndDecreaseFontSize()},setTheme(e){this.accessibilities.theme=e},setFontSize(e){this.accessibilities.fontSize=e,console.log(this.accessibilities.fontSize)},eventIncreaseAndDecreaseFontSize(){$("#increaseFont").on("click",()=>{this.increaseFontSize(),window.__setPreferredFontSize(this.accessibilities.fontSize)}),$("#decreaseFont").on("click",()=>{this.decreaseFontSize(),window.__setPreferredFontSize(this.accessibilities.fontSize)})},eventSetThemeMode(){$("#btnSetTheme").click(()=>{this.setTheme("light"===this.accessibilities.theme?"dark":"light"),window.__setPreferredTheme(this.accessibilities.theme)})},toggleNavActive(e){$(e).click((function(){document.querySelectorAll(e).forEach(e=>{$(e).hasClass("active")&&e.classList.remove("active")}),$(this).addClass("active")}))},getMovies(){$.ajax({url:"https://sky-frontend.herokuapp.com/movies",type:"GET",success:e=>{this.setState(e)},error:e=>{console.log(e.statusText,e.status)}})},setState(e){this.carousels.highlightMovies=e.filter(e=>"highlights"===e.type),this.carousels.carouselsMovies=e.filter(e=>"carousel-portrait"===e.type),this.makeHighlightsSlider(),this.makeMoviesCarousels("#wrapperCarousel1"),this.makeMoviesCarousels("#wrapperCarousel2"),this.makeMoviesCarousels("#wrapperCarousel3")},increaseFontSize(){if(this.accessibilities.fontSize<18){let e=this.accessibilities.fontSize;e+=1,this.setFontSize(e)}},decreaseFontSize(){if(this.accessibilities.fontSize>10&&this.accessibilities.fontSize<=18){let e=this.accessibilities.fontSize;e-=1,this.setFontSize(e)}},makeHighlightsSlider(){const e=this.carousels.highlightMovies[0].items.map(e=>`\n        <div class="item">\n          <a href="#">\n            <img src="${e.images[0].url}"\n            alt="${e.title}"\n            title="${e.title}">\n          </a>\n        </div>`).join("");$("#sliderHighlights").html(e).removeClass("on-loading"),this.initHighlightsSlider()},makeMoviesCarousels(e){const i=this.carousels.carouselsMovies.map(i=>`\n        <div class="movies-list-carousel">\n          <h2 class="movies-header-title">${i.title}</h2>\n          <div class="movies-carousel" data-slide=${e.replace("#","")}>\n            ${i.movies.reverse().map(e=>`\n              <div class="item ${e.isBlocked?"blocked":""}">\n                <div class="movie-img">\n                  <a href="#">\n                    <img src="${e.images[0].url}" alt="${e.title}" />\n                  </a>\n                </div>\n              </div>\n            `).join("")}\n          </div>\n        </div> `);$(e).html(i),this.initMoviesCarousels(e)},initHighlightsSlider(){$("#sliderHighlights").slick({centerMode:!0,centerPadding:"25%",dots:!0,autoplay:!1,autoplaySpeed:1e3,responsive:[{breakpoint:768,settings:{dots:!1,arrows:!1,centerMode:!1,centerPadding:0}}]})},initMoviesCarousels(e){$(`[data-slide="${e.replace("#","")}"]`).slick({initialSlide:0,slidesToShow:7,slidesToScroll:7,infinite:!1,responsive:[{breakpoint:992,settings:{slidesToShow:5,slidesToScroll:5}},{breakpoint:768,settings:{centerMode:!1,arrows:!1,slidesToShow:4,slidesToScroll:1}},{breakpoint:599,settings:{centerMode:!1,arrows:!1,slidesToShow:2,slidesToScroll:1}}]})}};