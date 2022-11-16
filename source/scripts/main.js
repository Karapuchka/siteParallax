'use strict'

gsap.registerPlugin(ScrollTrigger)

const sliderLine     = document.querySelector('.slider__line');
const sliderBtn      = document.querySelector('.slider__btns');
const preloader      = document.querySelector('.preloader');
const main           = document.querySelector('.main');

const sliderItems = document.querySelectorAll('.slider__item');

let count = 1; //Стетчик для слайдера

sizeSlider();
btnRadioTest();

window.onresize = (event)=>{
    sizeSlider();
}

sliderMove(count);

sliderBtn.onclick = (event)=>{

    if(event.target.closest('#btns-icon-1')){

        count = 1;

        sliderMove(count);

        btnRadioTest();

    }

    if(event.target.closest('#btns-icon-2')){

        count = 0;

        sliderMove(count);

        btnRadioTest();
    }

    if(event.target.closest('#btns-icon-3')){

        count = -1;

        sliderMove(count);

        btnRadioTest();
    }
}

window.onkeydown = (event)=>{

    if(event.keyCode == 37 && count != 1){

        count++;
        sliderMove(count);

        btnRadioTest();

    }

    if(event.keyCode == 39 && count != -1){

        count--;
        sliderMove(count);

        btnRadioTest();

    }
}

window.onload = (event)=>{

    gsap.to(preloader.children[0], { //Исчезновение фона
        opacity: 0,
        delay: 1,
        duration: 1.4,
    });

    let letters = preloader.children[1].innerText.split(''); //Преобразует буквы текста в отдельные элементы

    preloader.children[1].innerText = '';

    for (let i = 0; i < letters.length; i++) {

        preloader.children[1].appendChild(newLetters(letters[i]));

    }

    gsap.to(preloader.children[1].children, { //Анимация для букв
        y: 90,
        delay: 1,
        position: 'relative',
        opacity: 0,
        ease: 'back.in(2)',
        stagger: {
            each: .3,
            from: 'random',
        },
    });

    gsap.from('.parallax__leyer', {
        y: 20,
        duration: 2,
        stagger: 1,
    })

    setTimeout(()=>{

        preloader.style.display = 'none';

    }, 3200);

    gsap.to(main, {
        opacity: 1,
        duration: 1,
        delay: 4,
        ease: 'power4.out(1)',
    })
}

setTimeout(()=>{
    document.onmousemove = (event)=>{

        document.querySelectorAll('.parallax__leyer').forEach(leyer => {
    
            let speed = leyer.getAttribute('data-leyer');
    
            gsap.to(leyer, {
                x: event.clientX*speed/2000,
                y: event.clientY*speed/2000,
            })
    
        });
    }

}, 5000);

//Создаёт новый элемент и добавляет в него содержимое аттрибута
function newLetters(text){
    let div = document.createElement('div');
    div.innerText = `${text}`;
    return div
}

//Изменение размера линии слайда и его элементов
function sizeSlider(){
    gsap.to(sliderLine, {
        height: document.querySelector('.slider').offsetHeight - 100,
        width: document.querySelector('.slider').offsetWidth * sliderItems.length,
    })

    gsap.to(sliderItems, {
        height: document.querySelector('.slider').offsetHeight - 100,
        width: document.querySelector('.slider').offsetWidth,
    })
}

//Анктивирует движение слайдера
function sliderMove(next){

    gsap.to(sliderLine, {
        x: document.querySelector('.slider').offsetWidth * next,
    });

}

//Анимация для "radio" кнопок
function btnRadioTest(){

    if(count == -1){

        gsap.fromTo('#btns-icon-4', {
            duration: .1,
            scaleX: '3',
            borderRadius: '0',
        }, {
            duration: .7,
            x: 110,
            scaleX: '1',
            borderRadius: '50%',
        })

    }

    if(count == 0){

        gsap.fromTo('#btns-icon-4', {
            duration: .1,
            scaleX: '3',
            borderRadius: '0',
        }, {
            duration: .7,
            x: 55,
            scaleX: '1',
            borderRadius: '50%',
        })
    }

    if(count == 1){

        gsap.fromTo('#btns-icon-4', {
            duration: .1,
            scaleX: '3',
            borderRadius: '0',
        }, {
            duration: .7,
            x: 0,
            scaleX: '1',
            borderRadius: '50%',
        })
    }

}