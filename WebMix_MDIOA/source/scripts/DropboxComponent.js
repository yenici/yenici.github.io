'use strict';

import toggleClass from './toggleClass';

/**
* Function: setCurrentPage
*
* Parameters:
*    newPage     - the number of a selected page (0,1,2) or ignore this parameter to select the NEXT page
*/
function setCurrentPage(newPage = -1) {
  const slideNames = ['together', 'performance', 'safe'];
  const paginator = document.getElementById('db-carousel__paginator');
  let currentPage = 0;
  // Change active paginator button
  const btns = paginator.getElementsByClassName('db-carousel__paginator-btn');
  for(let i =0; i < btns.length; i++) {
    if (btns[i].classList.contains('active')) {
      toggleClass(btns[i], 'active');
      currentPage = i;
      break;
    }
  }
  if (newPage < 0) {
    newPage = (currentPage + 1) % 3;
  }
  toggleClass(btns[newPage], 'active');
  // Change active screeen
  document.getElementById('db-carousel__screen').className =
    document.getElementById('db-carousel__screen').className.replace('--' + slideNames[currentPage], '--' + slideNames[newPage]);
  const screen = document.getElementById('db-carousel__screen');
  const images = screen.getElementsByClassName('db-carousel__screen-image');
  toggleClass(images[currentPage], 'active');
  setTimeout(() => {
    const film = screen.getElementsByClassName('db-carousel__screen-film')[0];
    film.setAttribute('style', 'transform: translateX(' + (-newPage * 100 / 3) + '%)');
    toggleClass(images[newPage], 'active');
  }, 600);
  // Change active description
  const textWrapper = document.getElementById('dp-carousel__text');
  const texts = textWrapper.getElementsByClassName('dp-carousel__text-item');
  toggleClass(texts[currentPage], 'active');
  setTimeout(() => {
    textWrapper.setAttribute('style', 'transform: translateX(' + (-newPage * 100 / 3) + '%)');
    toggleClass(texts[newPage], 'active');
  }, 450);
}

const DropboxComponent = {
  initPaginator: () => {
    document.getElementById('db-carousel__paginator').addEventListener('click', e => {
      if (e.target.classList.contains('db-carousel__paginator-btn')) {
        if (!e.target.classList.contains('active')) {
          const page = parseInt(e.target.getAttribute('data-pg'));
          setCurrentPage(page);
        }
      }
    });
    document.getElementById('db-carousel__navigation-arrow').addEventListener('click', () => {
      setCurrentPage();
    });
  }
};

export default DropboxComponent;
