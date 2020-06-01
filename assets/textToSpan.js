
export default {
  parseByCharacter (text) {
    if (text) {
      const textBroken = text.split('\n')
      const htmlBroken = Array(textBroken.length).fill('')
      for (let line = 0; line < textBroken.length; line++) {
        for (let k = 0; k < textBroken[line].length; k++) {
          htmlBroken[line] += `<span class="character-span">${textBroken[line].charAt(k)}</span>`
        }
      }
      return htmlBroken.join('<br/>')
    } else {
      return ''
    }
  },
  parseByWord (text) {
    if (text) {
      const textBroken = text.split('\n')
      const htmlBroken = Array(textBroken.length).fill([])
      for (let line = 0; line < textBroken.length; line++) {
        const words = textBroken[line].split(' ')
        for (let k = 0; k < words.length; k++) {
          htmlBroken[line].push(`<span class="character-span">${words[k]}</span>`)
        }
        htmlBroken[line] = htmlBroken[line].join('<span class="character-span"> </span>')
      }
      return htmlBroken.join('<br/>')
    } else {
      return ''
    }
  }
}
