// component.tsx
exports.component = (name) => `
  export interface I${name}Props {
    defaultProps: string;
  }

  const ${name} = ({}: I${name}Props) => {
    return <div>Hello , I am a ${name} component.</div>;
  };

  export default ${name};
`

// component.test.tsx
exports.test = (name) => `
  import { render, screen } from '@testing-library/react'

  import ${name} from '../'

  describe('${name}', () => {
    it('renders successfully', () => {
      const text = 'Hello , I am a ${name} component.'
      render(<${name} defaultProps="" />)

      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })
`

// index.js
exports.barrel = (name) => `import ${name} from './${name}';
export default ${name};
`
