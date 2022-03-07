
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ServerErrorsMessage from './ServerErrorsMessage';

export default {
  title: 'ServerErrorsMessage',
  component: ServerErrorsMessage
} as ComponentMeta<typeof ServerErrorsMessage>;

const Template: ComponentStory<typeof ServerErrorsMessage> = (args) => <ServerErrorsMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  errors: {}
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
