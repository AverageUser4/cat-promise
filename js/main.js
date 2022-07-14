"use strict";

class CatHandler {

  static all_containers = document.getElementsByClassName('cat-container');
  static all_animation_lengths = [];
  static current_id = 0;
  static audio = new Audio('resources/cheer.mp3');

  constructor() {
    for(let i = 0; i < CatHandler.all_containers.length; i++) {
      CatHandler.all_containers[i].style.transition =
        Math.floor(Math.random() * 2000) + 500 + 'ms';
      CatHandler.all_animation_lengths.push(
        parseInt(CatHandler.all_containers[i].style.transition.slice(4)));
    }
  }

  sendRequest() {
    return new Promise(
      function(resolve) {

        const xhr = new XMLHttpRequest();

        xhr.onload = function() {
          const json_obj = JSON.parse(this.responseText);
          const url = 'https://cataas.com' + json_obj.url;

          const element = document.createElement('IMG');
          element.setAttribute('src', url);

          element.addEventListener('load', function() {
            CatHandler.audio.play();
            this.parentElement.classList.add('rotated');
            setTimeout(function() {
              CatHandler.current_id++;
              resolve();
            }, CatHandler.all_animation_lengths[CatHandler.current_id] / 2.5);
          });

          CatHandler.all_containers[CatHandler.current_id].appendChild(element);
        }

        xhr.open('GET', 'https://cataas.com/cat?json=true&type=square');
        xhr.send();
      }
    )
  }

  startTheShow() {
    this.sendRequest(0)
      .then(this.sendRequest)
      .then(this.sendRequest)
      .then(this.sendRequest)
      .then(this.sendRequest)
    .catch((error) => console.log(error));
  }
  
}


const cat_handler = new CatHandler();
cat_handler.startTheShow();


/*
  - ask for image
  - when it loads perform amazing animation
  - only then ask for another image
*/
