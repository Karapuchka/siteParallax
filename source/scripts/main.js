'use strict'

gsap.registerPlugin(ScrollTrigger)

const preloader = document.querySelector('.preloader');
const main = document.querySelector('.main');

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

function newLetters(text){
    let div = document.createElement('div');
    div.innerText = `${text}`;
    return div
}
