<template>
  <div class="container">
    <div class="subcontainer">
      <div class="instructions">
        Crtl + Click on the beggining and the end of the text you want to mark Click on the marked text to add an annotation
      </div>

      <div class="editor computed-html" v-html="computedHtml" />
      <div class="editor">
        JSON data
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
      annotation: ''
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
        doc[i].addEventListener('click', () => { this.clicked(doc[i]) })
      }
    }
  },
  methods: {
    clicked (i) {
      i.style.color = 'red'
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
