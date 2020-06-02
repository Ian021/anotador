<template>
  <div class="container">
    <div class="subcontainer">
      <b-modal
        id="my-modal"
        hide-footer
        :title="textPhrases.annotation_modal_title"
        @ok="handleOkModal"
      >
        <form ref="form" @submit.stop.prevent="handleOkModal">
          <b-form-input
            id="annotation-input"
            v-model="annotation"
          />
          <div class="modal-footer">
            <b-button variant="outline-danger" class="modalbtn" block @click="handleDeleteModal">
              {{ textPhrases.annotation_modal_btn_delete }}
            </b-button>
            <b-button variant="outline-primary" class="modalbtn" block @click="handleOkModal">
              {{ textPhrases.annotation_modal_btn_save }}
            </b-button>
          </div>
        </form>
      </b-modal>
      <div class="instructions">
        {{ textPhrases.annotation_instructions }}
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
          {{ textPhrases.annotation_btn_back }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import textToSpan from '../assets/textToSpan'
import textLanguage from '../assets/textLanguages'

export default {
  data () {
    return {
      textPhrases: textLanguage('pt'),
      text: this.$route.params.text,
      parseBy: this.$route.params.parseBy,
      start_index: null,
      end_index: null,
      substring: '',
      annotation: '',
      jsonList: {},
      showJsonList: {},
      jsonId: null,
      allowModal: false
    }
  },

  computed: {
    computedHtml () {
      if (this.parseBy === 'character') {
        return textToSpan.parseByCharacter(this.text)
      } else if (this.parseBy === 'word') {
        return textToSpan.parseByWord(this.text)
      } else {
        return 'error'
      }
    }
  },

  mounted () {
    if (!this.text || !this.parseBy) {
      this.$router.push('/')
    } else {
      const doc = document.getElementsByClassName('character-span')
      for (let i = 0; i < doc.length; i++) {
        doc[i].id = i
        doc[i].addEventListener('click', this.clicked)
      }
    }
  },
  methods: {
    clicked (event) {
      this.computeIndex(parseInt(event.srcElement.id))
      this.generateId()
      this.markSubstring()
      this.generateJson()
      this.updateShowJsonList()
      this.popModal()
    },
    computeIndex (i) {
      if (this.end_index === null) {
        document.getElementById(i).style.color = 'red'
        if (this.start_index === null) {
          this.start_index = i
        } else if (this.start_index !== null && i >= this.start_index) {
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
        this.allowModal = true
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
        this.substring = charList.join(
          this.parseBy === 'character' ? '' : ' '
        )
      }
    },
    markCharacters (element) {
      element.classList.add('marked', `id-${this.jsonId}`)
      element.removeEventListener('click', this.clicked)
      element.addEventListener('click', this.modalClicked)
    },
    modalClicked (event) {
      this.allowModal = true
      const classList = [...event.srcElement.classList]
      for (let i = 0; i < classList.length; i++) {
        if (classList[i].startsWith('id-')) {
          this.jsonId = classList[i].substring(3, classList[i].length)
        }
      }
      this.popModal()
    },
    popModal () {
      if (this.allowModal) {
        this.annotation = this.jsonList[this.jsonId].annotation
        this.$bvModal.show('my-modal')
        this.allowModal = false
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
      this.unMarkCharacters()
      delete this.jsonList[this.jsonId]
      this.updateShowJsonList()
    },
    unMarkCharacters () {
      let elements = document.getElementsByClassName(`id-${this.jsonId}`)
      while (elements[0]) { // for loop fails as the elements change at each iteration
        elements = document.getElementsByClassName(`id-${this.jsonId}`)
        elements[0].style.color = ''
        elements[0].removeEventListener('click', this.modalClicked)
        elements[0].addEventListener('click', this.clicked)
        elements[0].classList.remove('marked', `id-${this.jsonId}`)
      }
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
  font-family: monospace, monospace;
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
.tooltiptext {
  visibility: visible;
}
.editor:hover .tooltiptext{
  visibility: visible;
}
</style>
