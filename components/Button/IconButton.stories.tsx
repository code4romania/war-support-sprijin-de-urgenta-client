import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import IconButton from './IconButton';

export default {
  title: 'IconButton',
  component: IconButton
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=57%3A1604',
  },
}


