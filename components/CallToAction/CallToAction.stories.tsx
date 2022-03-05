import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import CallToAction from './CallToAction'

export default {
  title: 'CallToAction',
  component: CallToAction,
} as ComponentMeta<typeof CallToAction>

const Template: ComponentStory<typeof CallToAction> = (args) => (
  <CallToAction {...args} />
)

export const Default = Template.bind({})
Default.args = {
  headingOne: 'Amazing CTA',
  headingTwo: 'Read more',
  description: 'Some Long Description Is Here',
  ctaLabel: 'Help Us!',
  goToUrl: 'https://www.unacoperis.ro/'
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
