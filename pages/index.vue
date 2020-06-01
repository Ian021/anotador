<template>
  <div class="container">
    <div class="subcontainer">
      <h1 class="title">
        {{ textPhrases.index_title }}
      </h1>
      <div class="instructions">
        {{ textPhrases.index_instructions }}
      </div>
      <b-form-textarea
        id="textarea"
        v-model="text"
        :placeholder="textPhrases.index_instructions"
        rows="15"
      />
      <div>
        <div class="instructions">
          {{ textPhrases.index_selection }}
        </div>
        <div class="links">
          <nuxt-link
            :to="{
              name: 'annotation',
              params: {
                text,
                parseBy: 'character'
              }
            }"
            class="btn btn-block button--green button-next"
          >
            {{ textPhrases.index_btn_character }}
          </nuxt-link>
          <nuxt-link
            :to="{
              name: 'annotation',
              params: {
                text,
                parseBy: 'word'
              }
            }"
            class="btn btn-block button--green button-next"
          >
            {{ textPhrases.index_btn_word }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import textLanguage from '../assets/textLanguages'

export default {
  data () {
    return {
      textPhrases: textLanguage('pt'),
      text: this.$route.params.text
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  background-color: #E9E9E9;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.subcontainer {
  width: 80%;
  margin-top: 10vh;
  margin-bottom: auto;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #707070;
  letter-spacing: 1px;
}

#textarea {
  font-family: monospace, monospace;
  font-size: 20px;
}

.instructions {
  font-weight: 300;
  font-size: 24px;
  color: #707070;
  text-align: left;
  margin: 1vh auto 1vh 0;
}

.links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 8px;
  text-decoration: none;
}
.button-next {
  margin: 8px 0;
}
</style>
