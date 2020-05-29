<template>
  <div class="container">
    <div class="subcontainer">
      <div class="instructions">
        Crtl + Click on the beggining and the end of the text you want to mark Click on the marked text to add an annotation
      </div>

      <div class="editor computed-html" v-html="computedHtml" />
      <div class="editor">
        {{ showJsonList }}
      </div>
      <div class="links">
        <nuxt-link
          :to="{
            name: 'index',
            params: { text }
          }"
          class="btn btn-block button--green"
        >
          Back
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: this.$route.params.text,
      start_index: null,
      end_index: null,
      substring: '',
      annotation: '',
      jsonList: {},
      showJsonList: {}
    }
  },

  computed: {
    computedHtml () {
      if (this.text) {
        const textBroken = this.text.split('\n')
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
    }
  },

  mounted () {
    if (!this.text) {
      this.$router.push('/')
    } else {
      const doc = document.getElementsByClassName('character-span')
      for (let i = 0; i < doc.length; i++) {
        doc[i].id = i
        doc[i].addEventListener('click', () => { this.clicked(i, doc[i]) })
      }
    }
  },
  methods: {
    clicked (i, doc) {
      doc.style.color = 'red'
      this.computeIndex(i)
      this.generateSubstring()
      this.generateJson()
      this.updateShowJsonList()
    },
    computeIndex (i) {
      if (this.end_index === null) {
        if (this.start_index === null) {
          this.start_index = i
        } else if (this.start_index !== null && i > this.start_index) {
          this.end_index = i
        } else if (this.start_index !== null && i < this.start_index) {
          this.end_index = this.start_index
          this.start_index = i
        }
      }
    },
    generateSubstring () {
      if (this.start_index !== null && this.end_index !== null) {
        const doc = document.getElementsByClassName('character-span')
        const charList = []
        for (let i = this.start_index; i < this.end_index + 1; i++) {
          doc[i].style.backgroundColor = 'yellow'
          // doc[i].addEventListener('click', () => { this.clicked(i, doc[i]) })
          charList.push(doc[i].innerHTML)
        }
        this.substring = charList.join('')
      }
    },
    generateJson () {
      if (this.start_index !== null && this.end_index !== null && this.substring) {
        const id = this.start_index * 100000 + this.end_index
        this.jsonList[id] = {
          id,
          start_index: this.start_index,
          end_index: this.end_index,
          substring: this.substring,
          annotation: this.annotation
        }
        this.resetJsonData()
      }
    },
    resetJsonData () {
      this.start_index = null
      this.end_index = null
      this.substring = ''
      this.annotation = ''
    },
    updateShowJsonList () {
      this.showJsonList = JSON.stringify(this.jsonList)
    }
  }
}
</script>

<style>
.editor {
  text-align: justify;
  background-color: lightgray;
  border-radius: 5px;
  padding:15px;
  margin: 15px 0;
}
</style>
