
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ResourcesForm from './ResourcesForm';

export default {
  title: 'ResourcesForm',
  component: ResourcesForm
} as ComponentMeta<typeof ResourcesForm>;

const Template: ComponentStory<typeof ResourcesForm> = (args) => <ResourcesForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultProps: 'ResourcesForm default props'
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
