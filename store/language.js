
import languages from '../assets/languages'

export const state = () => ({
  selected: 'PT',
  textPhrases: languages.textLanguage('PT')
})

export const mutations = {
  LANGUAGE (state, language) {
    state.selected = language
    state.textPhrases = languages.textLanguage(language)
  }
}

export const actions = {
  setLanguage ({ commit }, language) {
    commit('LANGUAGE', language)
  }
}
