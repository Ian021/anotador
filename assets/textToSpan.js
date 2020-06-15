
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
      const htmlBroken = []
      for (let line = 0; line < textBroken.length; line++) {
        const words = textBroken[line].split(' ')
        const singleLine = []
        // console.log('words: ', words)
        for (let k = 0; k < words.length; k++) {
          singleLine.push(`<span class="character-span">${words[k]}</span>`)
          // console.log('word', htmlBroken[line])
        }
        htmlBroken.push(singleLine.join('<span class="character-span"> </span>'))
        // console.log('joint text', line, htmlBroken[line])
      }
      return htmlBroken.join('<br/>')
    } else {
      return ''
    }
  }
}
