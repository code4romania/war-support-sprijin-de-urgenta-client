import { ComponentStory, ComponentMeta } from '@storybook/react'

import SignupProducts from '.'

export default {
  title: 'Signup/Products',
  component: SignupProducts,
} as ComponentMeta<typeof SignupProducts>

const Template: ComponentStory<typeof SignupProducts> = (args) => {
  return (
    <SignupProducts {...args} />
  )
}
export const Default = Template.bind({})

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=57%3A1604',
  },
}
