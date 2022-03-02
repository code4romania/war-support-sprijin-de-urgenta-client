
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import UserCredentials from './UserCredentials';

export default {
  title: 'UserCredentials',
  component: UserCredentials
} as ComponentMeta<typeof UserCredentials>;

const Template: ComponentStory<typeof UserCredentials> = (args) => <UserCredentials {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultProps: 'UserCredentials default props'
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
