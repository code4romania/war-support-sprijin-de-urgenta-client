import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import DropdownMultiSelect from './DropdownMultiSelect'

export default {
  title: 'DropdownMultiSelect',
  component: DropdownMultiSelect,
} as ComponentMeta<typeof DropdownMultiSelect>

const Template: ComponentStory<typeof DropdownMultiSelect> = (args) => (
  <DropdownMultiSelect {...args} />
)

export const Default = Template.bind({})
Default.args = {
  options: [
    { value: 'test2', label: 'test1' },
    { value: 'test2', label: 'test1' },
  ],
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
