
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Consent from './Consent';

export default {
  title: 'GdprConsent',
  component: Consent
} as ComponentMeta<typeof Consent>;

const Template: ComponentStory<typeof Consent> = (args) => <Consent {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: '',
  name: ''
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
