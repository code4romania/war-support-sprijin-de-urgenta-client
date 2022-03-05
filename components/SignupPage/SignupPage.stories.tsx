import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupPage from './SignupPage';

export default {
  title: 'SignupPage',
  component: SignupPage
} as ComponentMeta<typeof SignupPage>;

const Template: ComponentStory<typeof SignupPage> = (args) => <SignupPage {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
