
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ThankYouMessage from './ThankYouMessage';

export default {
  title: 'ThankYouMessage',
  component: ThankYouMessage
} as ComponentMeta<typeof ThankYouMessage>;

const Template: ComponentStory<typeof ThankYouMessage> = (args) => <ThankYouMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultProps: 'ThankYouMessage default props'
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
