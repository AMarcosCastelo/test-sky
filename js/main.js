window.createHome=function(){var e={highlightMovies:[],carouselsMovies:[]},i={fontSize:14,theme:""},n=function(){t(),l()},t=function(){a(".nav-item"),s(),r()},o=function(e){i.theme=e},s=function(){$("#btnSetTheme").click((function(){o("light"===i.theme?"dark":"light"),window.__setPreferredTheme(i.theme)}))},c=function(e){i.fontSize=e},r=function(){$("#increaseFont").on("click",(function(){!function(){if(i.fontSize<18){var e=i.fontSize;c(e+=1)}}(),window.__setPreferredFontSize(i.fontSize)})),$("#decreaseFont").on("click",(function(){!function(){if(i.fontSize>10&&i.fontSize<=18){var e=i.fontSize;c(e-=1)}}(),window.__setPreferredFontSize(i.fontSize)}))},a=function(e){$(e).click((function(){document.querySelectorAll(e).forEach((function(e){$(e).hasClass("active")&&e.classList.remove("active")})),$(this).addClass("active")}))},l=function(){$.ajax({url:"https://sky-frontend.herokuapp.com/movies",type:"GET",success:function(e){u(e)},error:function(e){console.log(e.statusText,e.status)}})},u=function(i){e.highlightMovies=i.filter((function(e){return"highlights"===e.type})),e.carouselsMovies=i.filter((function(e){return"carousel-portrait"===e.type})),d()},d=function(){f(),h("#wrapperCarousel1"),h("#wrapperCarousel2"),h("#wrapperCarousel3")},f=function(){var i=e.highlightMovies[0].items.map((function(e){return'\n        <div class="item">\n          <a href="#">\n            <img src="'.concat(e.images[0].url,'"\n            alt="').concat(e.title,'"\n            title="').concat(e.title,'">\n          </a>\n        </div>')})).join("");$("#sliderHighlights").html(i).removeClass("on-loading"),v()},h=function(i){var n=e.carouselsMovies.map((function(e){return'\n        <div class="movies-list-carousel">\n          <h2 class="movies-header-title">'.concat(e.title,'</h2>\n          <div class="movies-carousel" data-slide=').concat(i.replace("#",""),">\n            ").concat(e.movies.reverse().map((function(e){return'\n              <div class="item '.concat(e.isBlocked?"blocked":"",'">\n                <div class="movie-img">\n                  <a href="#">\n                    <img src="').concat(e.images[0].url,'" alt="').concat(e.title,'" />\n                  </a>\n                </div>\n              </div>\n            ')})).join(""),"\n          </div>\n        </div> ")}));$(i).html(n),m(i)},v=function(){$("#sliderHighlights").slick({centerMode:!0,centerPadding:"25%",dots:!0,autoplay:!1,autoplaySpeed:1e3,responsive:[{breakpoint:768,settings:{dots:!1,arrows:!1,centerMode:!1,centerPadding:0}}]})},m=function(e){$('[data-slide="'.concat(e.replace("#",""),'"]')).slick({initialSlide:0,slidesToShow:7,slidesToScroll:7,infinite:!1,responsive:[{breakpoint:992,settings:{slidesToShow:5,slidesToScroll:5}},{breakpoint:768,settings:{centerMode:!1,arrows:!1,slidesToShow:4,slidesToScroll:1}},{breakpoint:599,settings:{centerMode:!1,arrows:!1,slidesToShow:2,slidesToScroll:1}}]})};return{init:function(e){var i=e.theme,t=e.fontSize;o(i),c(t),n()}}};