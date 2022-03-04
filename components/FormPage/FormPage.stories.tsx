
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FormPage from './FormPage';

export default {
  title: 'FormPage',
  component: FormPage
} as ComponentMeta<typeof FormPage>;

const Template: ComponentStory<typeof FormPage> = (args) => <FormPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultProps: 'FormPage default props'
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
