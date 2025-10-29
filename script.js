(() => {
    'use strict'



    let buffer = [{
        value: '',
        output: '',
        valid: false
    }]
    const command = {
        '/help': () => `
            <span>
                Main commands: 
                </br> /help - you here :) 
                </br> /theme - choose your favorite theme("--light", "--dark") 
                </br> /about - about me
                </br> /contacts - my contacts
                </br> /download - start downloading my cv
                </br> /clear - clear terminal
            </span>
        `,
        '/theme': () => `<span>Choose theme: "/theme --dark" or "/theme --light"</span>`,
        '/theme --dark': () => {
            changeTheme('dark')
            return 'Done.'
        },
        '/theme --light': () => {
            changeTheme('light')
            return 'Done.'
        },
        '/contacts': () => `
            <span>Github: <a href="https://github.com/rebte" class="contacts" target="_blank">https://github.com/rebte</a></span></br>
            <span>Linkedin: <a href="https://www.linkedin.com/in/ivan-kocherha/" class="contacts" target="_blank">https://www.linkedin.com/in/ivan-kocherha-608089248/</a></span></br>
            <span>Mail: <a href="mailto: rebte.dev@gmail.com" class="contacts" target="_blank">rebte.dev@gmail.com</a></span></br>
        `,
        '/download': () => { 
            // const a = document.createElement('a')
            // a.setAttribute('href', './assets/cv.pdf')
            // a.setAttribute('download', 'download')
            // a.click()     
            return `Cv no loaded :(`
        },
        '/about': () =>  `
            <span>
                I'm web developer with main stack: <span class="pick yellow">JavaScript</span>, <span class="pick red">Angular</span>, <span class="pick blue">React</span>, <span class="pick green">Python</span>, but have expiriance with backend developming.
                I have 2 years expiriance in real IT project. I worked in 3 company: <a class="pick green" href="https://grassbusinesslabs.com/" class="contacts" target="_blank">GrassBussinessLabs</a>, AntHouse and <a class="pick purple" href="https://dust.foundation/" class="contacts" target="_blank">Dust Foundation</a>. My current job is "Front-end developer" in <a class="pick purple" href="https://dust.foundation/" class="contacts" target="_blank">Dust Foundation</a>. 
            </span>
        `,
        '/clear': () => {
            buffer =  []
            update()
        },
        '': () => '',
        'other': (name) => `<span class="red">Command "${name}" not found. See more detail - "/help"</span>`,
    }
    const consoleHtml = document.querySelector('#terminal')
    let activeInput
    let activeBufferElem = 0

    function template(value, output, valid, isActive) {
        const template = document.createElement('div')
        template.classList.add('command')
        template.innerHTML = `
            <div class="content">
                <span class="user">root@DESKTOP:~</span>${isActive ? `<input value="${value}"/>` : `<span class="inputed${valid ? ' valid' : ''}">${value}<span/>`}
            </div>
            <div class="output">${output}</div>
        `
        return template
    }

    function update() {
        consoleHtml.innerHTML = ''
        for (let j = 0; j < buffer.length; j++) {
            const elem = template(...Object.values(buffer.at(j)), j === buffer.length - 1)
            if (j === buffer.length - 1) {
                activeInput = elem.querySelector('input')
                activeInput.addEventListener('keydown', inputListener)
                activeInput.addEventListener('input', inputDetectWrapper)
            }
            consoleHtml.appendChild(elem)
        }
        activeInput.focus()
    }

    function inputListener(event) {
        if (event.key === 'Enter') {
            activeInput.removeEventListener('keydown', inputListener)
            activeInput.removeEventListener('input', inputDetectWrapper)
            const output = getOutput(activeInput.value)
            buffer[buffer.length - 1] = {
                value: activeInput.value,
                ...output
            }
            buffer.push({
                value: '',
                output: '',
                valid: false
            })
            activeBufferElem = buffer.length - 1
            update()
        }
    }

    function getOutput(input) {
        input = input.trim()
        let output
        let valid
        if(command[input]) {
            output = command[input]()
            valid = true
        } else {
            output = command.other(input)
            valid = false
        }
        return {output, valid}
    }

    
    function inputDetectWrapper(e) {
        inputDetectCommand(e.target.value)
    }

    function inputDetectCommand(str) {
        if(command[str.trim()]) {
            activeInput.classList.add('valid')
        } else {
            activeInput.classList.remove('valid') 
        }
    }

    function changeTheme(color) {
        localStorage.setItem('theme', color)
        document.querySelector('body').classList.remove('light')
        document.querySelector('body').classList.remove('dark')
        document.querySelector('body').classList.add(color)
    }

    function setTheme(color) {
        document.querySelector('body').classList.add(color)
    }

    function mobileCheck() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera)
        return check
    }

    if(mobileCheck()) {
        document.querySelector('.phone').classList.remove('none')
        document.querySelector('.wrapper').classList.add('phone_body')
    } else {
        document.querySelector('body').addEventListener('click', (e) => {
            if (activeInput && e.target === document.querySelector('body')) {
                activeInput.focus()
            }
        })
        document.querySelector('body').addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                if(activeBufferElem - 1 >= 0 && buffer.at(activeBufferElem - 1)) {
                    activeBufferElem -= 1
                } else {
                    activeBufferElem = buffer.length - 1
                }
                inputDetectCommand(buffer.at(activeBufferElem).value)
                activeInput.value = buffer.at(activeBufferElem).value
            }
        })
    
        setTheme(localStorage.getItem('theme') || 'dark')
        update()
    }
})()