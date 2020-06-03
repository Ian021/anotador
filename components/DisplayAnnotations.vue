<template>
  <div>
    <b-button-group id="select-output">
      <div
        id="json"
        class="btn btn-block button--green button-output"
        @click="changeOutputFormat"
      >
        {{ $store.state.language.textPhrases.annotation_btn_json }}
      </div>
      <div
        id="table"
        class="btn btn-block button--green button-output"
        @click="changeOutputFormat"
      >
        {{ $store.state.language.textPhrases.annotation_btn_table }}
      </div>
    </b-button-group>
    <div
      v-if="$store.state.outputFormat.format==='json'"
      class="editor"
    >
      {{ annotations }}
    </div>
    <div
      v-if="$store.state.outputFormat.format==='table'"
      class="table-container"
    >
      <b-table
        striped
        borderless
        hover
        :items="Object.values(jsonList)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DisplayAnnotations',
  props: {
    annotations: {
      type: String,
      default: '{}'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    jsonList () {
      return JSON.parse(this.annotations)
    }
  },
  mounted () {
    this.toggleOutputFormat(this.$store.state.outputFormat.format, false)
  },
  methods: {
    ...mapActions({
      setOutput: 'outputFormat/setOutput'
    }),
    changeOutputFormat (event) {
      this.toggleOutputFormat(event.srcElement.id, true)
    },
    toggleOutputFormat (format, updateState) {
      [...document.getElementsByClassName('button-output')].forEach((button) => {
        if (button.id === format) {
          button.classList.add('selected')
        } else {
          button.classList.remove('selected')
        }
      })
      if (updateState) {
        this.setOutput(format)
      }
    }
  }
}
</script>

<style>
.button-output {
  margin: 8px 0;
}
.selected {
  background-color: #3B8070;
  color: white;
}
#select-output {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-decoration: none;
}
.table-container {
  font-family: monospace, monospace;
  text-align: justify;
  background-color: lightgray;
  border-radius: 5px;
  margin: 15px 0;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
