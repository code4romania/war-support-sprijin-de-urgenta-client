import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Number from './Number';

export default {
  title: 'Form/Number',
  component: Number
} as ComponentMeta<typeof Number>;

const Template: ComponentStory<typeof Number> = (args) => <Number {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}

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

