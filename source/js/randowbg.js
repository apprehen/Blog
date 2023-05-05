    async function myrandom (length) {
      const result = await Math.floor(Math.random() * (length))
      return result
    }
    async function urls () {
      const backgrounds = [
      'https://cdn.staticaly.com/gh/apprehen/pciture@master/102629230_p0.3yd2fxgj0100.webp',
      'https://cdn.staticaly.com/gh/apprehen/pciture@master/2022_11_14_18_13_8.1suw5slc2alc.webp',
      'https://cdn.staticaly.com/gh/apprehen/pciture@master/2022_11_14_18_13_69.48zazf9gxx60.webp'
      ]
      const index = await myrandom(backgrounds.length)
      const result = backgrounds[index]
      return result
    }
    async function xiugai () {
      const op = document.querySelector("#page-header.not-home-page")
      const url = await urls()
      // op.style.backgroundImage = await `url(${url})`
      op.setAttribute('url',`url(${url})`)
    }
    ;(async()=>{
      await xiugai()
    })()