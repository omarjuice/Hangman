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

                duration: 250,
            }).add({
                targets: `${elem}-tertiary`,
                translateX: -.5 * i,

                duration: 250,
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
            translateY: [{ value: [0, 1000], duration: 1000, elasticity: 500 }],
        })
    },
    pop: (elem) => {
        return anime({
            targets: elem,
            scale: 1.1,
            duration: 250,
            autoplay: false,
            easing: 'easeInOutBack'
        })
    }

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
            opacity: [{ value: ['*=0', 1, 1, 0], duration: 1000, easing: 'linear' }],
            visibility: { value: 'hidden', delay: 1000, duration: 1 },
            autoplay: false
        })
    },
    blink: (elem) => {
        return anime({
            targets: elem,
            opacity: [
                { value: 1, duration: 500, easing: 'easeInQuad' },
                { value: 0, duration: 500, easing: 'easeInQuad' }
            ],
            loop: true,
            duration: 1000,
            easing: 'linear',
            autoplay: false
        })
    },
    shrinkToNothing: (elem) => {
        return anime({
            targets: elem,
            scale: 0,
            duration: 500,
            easing: 'easeInOutBack'
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

export const svgAnimation = {
    fall: (elem, path, delay = 0) => {
        const track = anime.path(path);
        try {
            return anime({
                targets: elem,
                translateY: track('y'),
                duration: 500,
                easing: 'easeInQuad',
                delay
            })
        } catch (e) {

        }
    },
    wave: (elem, path, loop = true, autoplay = true, { direction, delay, duration, easing, elasticity } = {}) => {
        const track = anime.path(path);
        const obj = {
            targets: elem,
            y2: track('y'),
            x2: track('x'),
            duration: duration || 1000,
            delay: delay !== undefined ? delay : 0,
            loop,
            direction: direction || 'normal',
            autoplay,

        }
        if (elasticity) {
            obj.elasticity = elasticity
        }
        if (easing) {
            obj.easing = easing
        }
        return anime(obj)
    },
    drawStroke: (elem, delay) => {
        return anime({
            targets: elem.selector,
            x2: { value: [elem.x1, elem.x2], duration: 500 },
            y2: { value: [elem.y1, elem.y2], duration: 500 },
            delay: delay ? 500 : 0,
            easing: 'linear',
            autoplay: true,
            loop: false
        })
    }
}