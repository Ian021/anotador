<template class="container">
  <b-navbar toggleable="lg" type="dark" variant="info" class="customnav">
    <b-navbar-brand href="/" class="ml-1">
      {{ $store.state.language.textPhrases.index_title }}
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto mr-1 nav-right">
      <div class="language-card">
        <img :src="languagesOptions[$store.state.language.selected].path" alt="" class="flag">
        <b-nav-item-dropdown :text="$store.state.language.selected" class="language-name" right>
          <b-dropdown-item
            v-for="language in languagesOptions"
            :key = language.name
            @click="setLanguage(language.name)"
            class="language-card"
          >
            <img :src="language.path" alt="" class="flag">
            <span class="language-name">{{ language.name }}</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </div>
      <b-nav-item
        href="https://github.com/Ian021/anotador"
        target="_blank"
      >
        <img src="GitHub-Mark-32px.png" alt="">
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapActions } from 'vuex'
import languages from '../assets/languages'

export default {
  data () {
    return {
      languagesOptions: languages.languageOptions
    }
  },
  methods: {
    ...mapActions({
      setLanguage: 'language/setLanguage'
    })
  }
}
</script>

<style scoped>
.customnav {
  position: absolute;
  width: 100%;
}
.nav-right {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 8px;
}
.language-card {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}
.flag {
  height: 32px;
  width: 48px;
  align-self: center;
}
.language-name {
  align-self: center;
}
</style>
