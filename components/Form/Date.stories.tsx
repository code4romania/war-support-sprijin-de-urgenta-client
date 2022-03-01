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
