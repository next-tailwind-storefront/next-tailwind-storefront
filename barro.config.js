function exportDefaultTemplate({ files }) {
  return files
    .map(
      (file, index) =>
        `export { default as ${file.name} } from './${file.path}'${index === files.length - 1 ? '\n' : ''}`,
    )
    .join('\n')
}

function exportAllTemplate({ files }) {
  return files
    .map((file, index) => `export * from './${file.path}'${index === files.length - 1 ? '\n' : ''}`)
    .join('\n')
}

module.exports = () => [
  {
    banner: '',
    out: 'components/index.ts',
    match: '*.tsx',
    template: exportDefaultTemplate,
  },
  {
    banner: '',
    out: 'hooks/index.ts',
    match: '*.ts',
    template: exportDefaultTemplate,
  },
  {
    banner: '',
    out: 'types/index.ts',
    match: '*.ts',
    template: exportAllTemplate,
  },
  {
    banner: '',
    out: 'consts/index.ts',
    match: '*.ts',
    template: exportAllTemplate,
  },
  {
    banner: '',
    out: 'contexts/index.ts',
    match: '*.tsx',
    template: exportAllTemplate,
  },
]
