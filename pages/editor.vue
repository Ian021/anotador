<template>
  <div class="container">
    <div class="subcontainer">
      <b-modal
        hide-footer
        id="my-modal"
        title="Annotation"
        @ok="handleOkModal"
      >
        <form ref="form" @submit.stop.prevent="handleOkModal">
          <b-form-input
            id="annotation-input"
            v-model="annotation"
          />
          <div class="modal-footer">
            <b-button variant="outline-danger" class="modalbtn" @click="handleDeleteModal" block>Delete</b-button>
            <b-button variant="outline-primary" class="modalbtn" @click="handleOkModal" block>Save</b-button>
          </div>
        </form>
      </b-modal>
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
      showJsonList: {},
      jsonId: null,
      index: 0
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
        this.index = i
        doc[i].id = i
        doc[i].addEventListener('click', this.clicked)
      }
    }
  },
  methods: {
    clicked (event) {
      this.computeIndex(parseInt(event.srcElement.id))
      this.generateId()
      this.popModal(this.jsonId)
      this.markSubstring()
      this.generateJson()
      this.updateShowJsonList()
    },
    computeIndex (i) {
      if (this.end_index === null) {
        document.getElementById(i).style.color = 'red'
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
    generateId () {
      if (this.start_index !== null && this.end_index !== null) {
        this.jsonId = this.start_index * 100000 + this.end_index
      }
    },
    markSubstring () {
      if (this.start_index !== null && this.end_index !== null) {
        const doc = document.getElementsByClassName('character-span')
        const charList = []
        for (let i = this.start_index; i < this.end_index + 1; i++) {
          this.markCharacters(doc[i])
          charList.push(doc[i].innerHTML)
        }
        this.substring = charList.join('')
      }
    },
    markCharacters (element) {
      element.classList.add('marked', `id-${this.jsonId}`)
      element.removeEventListener('click', this.clicked)
      element.addEventListener('click', this.modalClicked)
    },
    unMarkCharacters (i, doc) {
      doc[i].style.backgroundColor = ''
      doc[i].removeEventListener('click', () => { this.clicked(i, doc[i]) })
      doc[i].addEventListener('click', () => { this.popModal() })
    },
    // modalClicked (event) {
    //   console.log(event.srcElement.classList)
    //   const id = event.srcElement.classList.filter((element) => {
    //     element.startsWith('id-')
    //   })
    //   console.log(id)
    // },
    popModal (id) {
      this.annotation = ''
      if (this.start_index !== null && this.end_index !== null) {
        this.$bvModal.show('my-modal')
      }
    },
    handleOkModal (event) {
      event.preventDefault()
      this.addAnnotation()
      this.$nextTick(() => { this.$bvModal.hide('my-modal') })
    },
    handleDeleteModal (event) {
      event.preventDefault()
      this.deleteJson()
      this.$nextTick(() => { this.$bvModal.hide('my-modal') })
    },
    deleteJson () {
      delete this.jsonList[this.jsonId]
      this.updateShowJsonList()
    },
    addAnnotation () {
      this.jsonList[this.jsonId].annotation = this.annotation
      this.updateShowJsonList()
    },
    generateJson () {
      if (this.start_index !== null && this.end_index !== null && this.substring) {
        this.jsonList[this.jsonId] = {
          id: this.jsonId,
          start_index: this.start_index,
          end_index: this.end_index,
          substring: this.substring,
          annotation: ''
        }
        this.resetJsonData()
      }
    },
    resetJsonData () {
      this.start_index = null
      this.end_index = null
      this.substring = ''
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
  font-size: 24px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
.modal-footer {
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 8px;
}
.modalbtn {
  margin: 8px 0;
}
.marked {
  background-color: yellow;
  cursor: pointer;
}
</style>
