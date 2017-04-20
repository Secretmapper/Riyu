import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { bundle } from '../util/paths'

// TODO: proper zip singleton/management
let zip

export async function preloadZip () {
  try {
    const response = await fetch(bundle)
    zip = await JSZip.loadAsync(response.arrayBuffer())
  } catch (e) {
    // TODO: Better error messages
    alert('Sorry something went wrong! Please reload the page :(')
    console.error(e)
  }
}

export async function generateZip (html, data) {
  try {
    zip.file('index.html', html)
    zip.folder('src').file('data.js', `module.exports = ${JSON.stringify(data, null, 4)}`)

    if (JSZip.support.blob) {
      const blob = await zip.generateAsync({ type: 'blob' })
      FileSaver.saveAs(blob, 'riyu.zip')
    } else {
      throw new Error('Saving zip files through javascript not supported on this browser')
    }
  } catch (e) {
    // TODO: Better error messages
    alert('Sorry something went wrong! Please reload the page :(')
    console.error(e)
  }
}
