// @ts-nocheck
const { exec } = require('child_process')
const util = require('util')

const execPromise = util.promisify(exec)

async function runCommands(num, url) {
  console.log(num, url)
  for (let i = 1; i <= num; i++) {
    try {
      const { stdout, stderr } = await execPromise(
        `open -na "Google Chrome" --args --incognito --user-data-dir="/tmp/Profile${i}" "${url}"`,
      )
      if (stdout) console.log(`Output: ${stdout}`)
      if (stderr) console.error(`Error: ${stderr}`)
    } catch (error) {
      console.error(`Failed to execute:`, error)
    }
  }
}

const form = document.getElementById('id')
const submitButton = document.getElementById('submit-btn')
const urlInput = document.getElementById('url_input')
const quantityInput = document.getElementById('quantity_input')

if (submitButton !== null) {
  submitButton.onclick = (e) => {
    e.preventDefault()

    const url = urlInput?.value || null
    let quantity = quantityInput?.value || null

    if (url !== null && quantity !== null) {
      runCommands(Number(quantity), url)
    }
  }
}
