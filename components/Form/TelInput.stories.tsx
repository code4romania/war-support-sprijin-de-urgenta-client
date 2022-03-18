
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PhoneNumber from './PhoneNumber';

export default {
  title: 'PhoneNumber',
  component: PhoneNumber
} as ComponentMeta<typeof PhoneNumber>;

const Template: ComponentStory<typeof PhoneNumber> = (args) => <PhoneNumber {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultProps: 'PhoneNumber default props'
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
