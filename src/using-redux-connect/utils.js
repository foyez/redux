let urlAlphabet = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW'

export let nanoId = (size = 21) => {
  let id = ''
  let i = size

  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0]
  }

  return id
}
