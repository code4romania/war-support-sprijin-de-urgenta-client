
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import OtherResourcesForm from './OtherResourcesForm';

export default {
  title: 'OtherResourcesForm',
  component: OtherResourcesForm
} as ComponentMeta<typeof OtherResourcesForm>;

const Template: ComponentStory<typeof OtherResourcesForm> = (args) => <OtherResourcesForm {...args} />;

export const Default = Template.bind({});
Default.args = {}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=57%3A1719',
  },
}
