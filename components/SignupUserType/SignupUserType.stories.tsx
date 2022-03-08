
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupUserType from './SignupUserType';

export default {
  title: 'SignupUserType',
  component: SignupUserType
} as ComponentMeta<typeof SignupUserType>;

const Template: ComponentStory<typeof SignupUserType> = (args) => <SignupUserType {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
