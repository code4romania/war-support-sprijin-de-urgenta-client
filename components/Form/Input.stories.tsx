import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from './Input';

export default {
  title: 'Form/Input',
  component: Input
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Label'
}

export const WithErrors = Template.bind({});
WithErrors.args = {
  label: 'With errors',
  errors: {
    message: 'Error message'
  }
}

