// component.js
exports.component = name => `
export default function ${name}() {
  return (
    <div>
      
    </div>
  )
}
`;

// index.js
exports.barrel = name => `import ${name} from './${name}';
export default ${name};
`;s