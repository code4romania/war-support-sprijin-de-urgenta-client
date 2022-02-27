// component.js
export const component = name => `
export default function ${name}() {
  return (
    <div>
      
    </div>
  )
}
`;

// index.js
export const barrel = name => `import ${name} from './${name}';
export default ${name};
`;