import anime from 'animejs';

//home page title
//screen on
//screen flicker
//hangman svg
export const homepageAnimation = {
    noise: (elem) => {
        let i = 0
        function repeatNoise() {
            return anime({
                targets: elem,
                backgroundPositionX: () => `${i === 0 || i === 3 ? 0 : 100}px`,
                backgroundPositionY: () => `${i === 2 || i === 3 ? 100 : 0}px`,
                loop: 1,
                duration: 10,
                complete: () => {
                    i++;
                    if (i > 3) {
                        i = 0
                    }
                    repeatNoise()
                }
            })
        }
        repeatNoise()
    },
    glitch: (elem) => {
        let i = 1
        function repeatGlitch() {
            return anime.timeline().add({
                targets: `${elem}-secondary`,
                translateX: .5 * i,
                translateY: .5 * i,
                duration: 250,
            }).add({
                targets: `${elem}-tertiary`,
                translateX: -.5 * i,
                translateY: -.5 * i,
                duration: 250,
                offset: '-=100',
                complete: () => {
                    i *= -1;
                    repeatGlitch()
                }
            })
        }
        repeatGlitch()
    },
    slideIn: (elem) => {
        return anime({
            targets: elem,
            translateY: [{ value: ['+=200', 0], duration: 1000, elasticity: 500 }],
        })
    },
    slideOut: (elem) => {
        return anime({
            targets: elem,
            translateY: [{ value: [0, 200], duration: 1000, elasticity: 500 }],
        })
    },

}
export const hangmanAnimation = {
    turnOn: (elem) => {
        return anime({
            targets: elem,
            scaleY: [{ value: ['*=.1', 1], duration: 1500, elasticity: 0 }],
            opacity: [{ value: ['*=.1', 1], delay: 500, duration: 1500, elasticity: 1000 }]
        })
    },
    changeScreen: (elem) => {
        return anime({
            targets: elem,
            opacity: [{ value: ['*=.75', 1], duration: 2000, elasticity: 1000 }]
        })
    },
    flicker: (elem) => {
        const opacityValues = Array(20).fill('x').map((e, i) => i % 2 === 0 ? .95 : 1)
        return anime({
            targets: elem,
            opacity: opacityValues,
            duration: 100,
            loop: true
        })
    },
    ellipsis: (elems) => {
        return anime({
            targets: elems,
            translateY: [
                { value: -40, duration: 1000, easing: 'easeOutCubic' },
                { value: 0, duration: 1000, easing: 'easeInCubic' }
            ],
            loop: true,

            delay: (el, i) => {
                return i * 666
            }
        })
    },
    slideInAndFade: (elem) => {
        return anime({
            targets: elem,
            translateY: [{ value: ['+=80', 0], duration: 1000, easing: 'linear' }],
            opacity: [{ value: ['*=0', 1, 1, 0], duration: 1000, easing: 'linear' }]
        })
    },
    blink: (elem) => {
        return anime({
            targets: elem,
            opacity: [
                { value: 0, duration: 500, easing: 'easeInQuad' },
                { value: 1, duration: 500, easing: 'easeInQuad' }
            ],
            loop: true,
            duration: 1000,
            easing: 'linear',
        })
    }

}
export const chatAnimation = {
    slideIn: (elem, fromDirection) => {
        return anime({
            targets: elem,
            translateX: [{ value: [fromDirection === 'left' ? -100 : 100, 0], duration: 1000, elasticity: 500 }]
        })
    },
    inflate: (elem) => {
        return anime({
            targets: elem,
            scale: [
                { value: 2, duration: 333, elasticity: 1000, easing: 'easeOutCubic' },
                { value: 1, duration: 333, elasticity: 1000, easing: 'easeInCubic' }
            ]
        })
    }
}
export const general = {
    // spin: (elem) => {
    //     return anime({
    //         targets: elem,
    //         rotate: ['0turn', '.165turn', '.33turn', '.5turn', '.67turn', '.83turn', '1turn'],
    //         duration: 2000,
    //         easing: 'linear'
    //     })
    // }
}