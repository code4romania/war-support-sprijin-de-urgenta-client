
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoadingSpinner from './LoadingSpinner';

export default {
  title: 'LoadingSpinner',
  component: LoadingSpinner
} as ComponentMeta<typeof LoadingSpinner>;

const Template: ComponentStory<typeof LoadingSpinner> = (args) => <LoadingSpinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultProps: 'LoadingSpinner default props'
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
