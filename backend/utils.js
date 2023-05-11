import fs from 'fs/promises'

export async function getFileData() {
  const file = await fs.readFile('data.json', 'utf8')
  const data = JSON.parse(file)
  return data
}

export async function setFileData(data) {
  await fs.writeFile('data.json', JSON.stringify(data, null, 2))
}
