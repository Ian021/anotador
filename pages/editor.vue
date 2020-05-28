<template>
  <div class="container">
    <div class="subcontainer">
      <div class="instructions">
        Crtl + Click on the beggining and the end of the text you want to mark Click on the marked text to add an annotation
      </div>
      <b-form-textarea
        id="textarea"
        v-model="text"
        placeholder="Enter something..."
        rows="20"
        readonly=""
      />
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
      text: this.$route.params.text
    }
  }
}
</script>

<style>
.editor {
  background-color: lightgray;
  border-radius: 5px;
  padding:15px;
  margin: 15px 0;
}
</style>
