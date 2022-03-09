import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SignupOfferIndividual from './SignupOfferIndividual'

export default {
  title: 'SignupOfferIndividual',
  component: SignupOfferIndividual,
} as ComponentMeta<typeof SignupOfferIndividual>

const Template: ComponentStory<typeof SignupOfferIndividual> = () => (
  <SignupOfferIndividual />
)

export const Default = Template.bind({})
Default.args = {
  defaultProps: 'SignupOfferIndividual default props',
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
