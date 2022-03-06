import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ThankYouMessage from './ThankYouMessage'
import { FormPageProps } from '../FormPage/FormPage'

export default {
  title: 'ThankYouMessage',
  component: ThankYouMessage,
} as ComponentMeta<typeof ThankYouMessage>

const Template: ComponentStory<typeof ThankYouMessage> = (args) => (
  <ThankYouMessage {...args} />
)

export const Request = Template.bind({})
Request.args = {
  type: FormPageProps.Request,
}

Request.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}

export const Offer = Template.bind({})
Offer.args = {
  type: FormPageProps.Offer,
}

Offer.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
