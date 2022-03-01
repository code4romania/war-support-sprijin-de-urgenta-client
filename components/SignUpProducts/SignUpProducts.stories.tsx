
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignUpProducts from './SignUpProducts';

export default {
  title: 'SignUpProducts',
  component: SignUpProducts
} as ComponentMeta<typeof SignUpProducts>;

const Template: ComponentStory<typeof SignUpProducts> = (args) => <SignUpProducts {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
