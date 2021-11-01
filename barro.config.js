function exportDefaultTemplate({ files }) {
  return files.map((file, index) =>
    `export { default as ${file.name} } from "./${file.path}";${
        index === files.length - 1 ? '\n' : ''
    }`
  ).join("\n");
}

module.exports = () => [
  {
    banner: '',
    out: "components/index.ts",
    match: "*.tsx",
    template: exportDefaultTemplate
  },
  {
    banner: '',
    out: "hooks/index.ts",
    match: "*.ts",
    template: exportDefaultTemplate
  },
];
