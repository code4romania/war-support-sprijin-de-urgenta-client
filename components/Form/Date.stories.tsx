import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Date from './Date'

export default {
  title: 'Form/Date',
  component: Date,
} as ComponentMeta<typeof Date>

const Template: ComponentStory<typeof Date> = (args) => <Date {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'userType'
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
