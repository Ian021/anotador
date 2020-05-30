<template>
  <div class="container">
    <div class="subcontainer">
      <h1 class="title">
        Anotador
      </h1>
      <div class="instructions">
        Paste your text below:
      </div>
      <b-form-textarea
        id="textarea"
        v-model="text"
        placeholder="Enter something..."
        rows="15"
      />
      <div class="links">
        <nuxt-link
          :to="{
            name: 'editor',
            params: { text }
          }"
          class="btn btn-block button--green"
        >
          Next
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
  font-size: 24px;
}

.instructions {
  font-weight: 300;
  font-size: 30px;
  color: #707070;
  text-align: left;
  margin: 3vh auto 1vh 0;
}

.links {
  padding: 15px 0;
  text-decoration: none;
}
</style>
