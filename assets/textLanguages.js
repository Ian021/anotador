
// const langs = ['pt', 'en']

const textLanguages = {
  index_title: {
    pt: 'Anotadora',
    en: 'Anotadora'
  },
  index_instructions: {
    pt: 'Copie seu texto abaixo:',
    en: 'Paste your text below:'
  },
  index_textarea: {
    pt: 'Escreva algo...',
    en: 'Write something...'
  },
  index_selection: {
    pt: 'Modo de Seleção:',
    en: 'Selection Mode:'
  },
  index_btn_character: {
    pt: 'Caracteres',
    en: 'Characters'
  },
  index_btn_word: {
    pt: 'Palavras',
    en: 'Words'
  },
  annotation_modal_title: {
    pt: 'Anotação',
    en: 'Annotation'
  },
  annotation_modal_btn_delete: {
    pt: 'Apagar',
    en: 'Delete'
  },
  annotation_modal_btn_save: {
    pt: 'Salvar',
    en: 'Save'
  },
  annotation_instructions: {
    pt: 'Clique no início e no final do texto que deseja marcar',
    en: 'Click on the beggining and the end of the text you want to mark'
  },
  annotation_btn_json: {
    pt: '',
    en: ''
  },
  annotation_btn_table: {
    pt: '',
    en: ''
  },
  annotation_btn_back: {
    pt: 'Voltar',
    en: 'Back'
  }
}

export default function textLanguage (lang) {
  const textPhrases = {}
  Object.keys(textLanguages).forEach((phrase) => {
    textPhrases[phrase] = textLanguages[phrase][lang]
  })
  return textPhrases
}
