
export const state = () => ({
  format: 'table'
})

export const mutations = {
  OUTPUT (state, format) {
    state.format = format
  }
}

export const actions = {
  setOutput ({ commit }, format) {
    commit('OUTPUT', format)
  }
}
