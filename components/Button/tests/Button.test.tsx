import { render, screen } from '@testing-library/react'

import Button from '../'

describe('Button', () => {
  it('renders successfully', () => {
    const buttonText = 'Press me'
    render(<Button text={buttonText} />)

    expect(screen.getByText(buttonText)).toBeInTheDocument()
  })
})
