
const languageOptions = {
  PT: {
    name: 'PT',
    path: 'brazil-flag-icon-64.png'
  },
  EN: {
    name: 'EN',
    path: 'united-states-of-america-flag-icon-64.png'
  }
}

const textLanguages = {
  index_title: {
    PT: 'Anotadora',
    EN: 'Anotadora'
  },
  index_instructions: {
    PT: 'Copie seu texto abaixo:',
    EN: 'Paste your text below:'
  },
  index_textarea: {
    PT: 'Escreva algo...',
    EN: 'Write something...'
  },
  index_selection: {
    PT: 'Modo de Seleção:',
    EN: 'Selection Mode:'
  },
  index_btn_character: {
    PT: 'Caracteres',
    EN: 'Characters'
  },
  index_btn_word: {
    PT: 'Palavras',
    EN: 'Words'
  },
  annotation_modal_title: {
    PT: 'Anotação',
    EN: 'Annotation'
  },
  annotation_modal_btn_delete: {
    PT: 'Apagar',
    EN: 'Delete'
  },
  annotation_modal_btn_save: {
    PT: 'Salvar',
    EN: 'Save'
  },
  annotation_instructions: {
    PT: 'Clique no início e no final do texto que deseja marcar',
    EN: 'Click on the beggining and the end of the text you want to mark'
  },
  annotation_btn_json: {
    PT: 'Formato Json',
    EN: 'Json Format'
  },
  annotation_btn_table: {
    PT: 'Formato Tabela',
    EN: 'Table Format'
  },
  annotation_btn_back: {
    PT: 'Voltar',
    EN: 'Back'
  }
}

function textLanguage (lang) {
  const textPhrases = {}
  Object.keys(textLanguages).forEach((phrase) => {
    textPhrases[phrase] = textLanguages[phrase][lang]
  })
  return textPhrases
}

export default {
  textLanguage,
  languageOptions
}
