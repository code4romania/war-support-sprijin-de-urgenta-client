import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Dropdown from './Dropdown';

export default {
  title: 'Form/Dropdown',
  component: Dropdown
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'userType',
  children: (
    <>
      <option value="typeA">Type A</option>
      <option value="typeB">Type B</option>
    </>
  ),
}

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...Default.args,
  label: "Dropdown label"
}


