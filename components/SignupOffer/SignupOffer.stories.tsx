
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupOffer from './SignupOffer';

export default {
  title: 'SignupOffer',
  component: SignupOffer
} as ComponentMeta<typeof SignupOffer>;

const Template: ComponentStory<typeof SignupOffer> = (args) => <SignupOffer {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
