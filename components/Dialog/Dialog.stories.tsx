
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Dialog from './Dialog';

export default {
  title: 'Dialog',
  component: Dialog
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
