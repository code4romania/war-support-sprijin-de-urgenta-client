// component.js
exports.component = name => `
  export interface I${name}Props {
    defaultProp: string;
  }

  const ${name} = ({}: I${name}Props) => {
    return <div>Hello , I am a ${name} component.</div>;
  };

  export default ${name};
`;

// index.js
exports.barrel = name => `import ${name} from './${name}';
export default ${name};
`;