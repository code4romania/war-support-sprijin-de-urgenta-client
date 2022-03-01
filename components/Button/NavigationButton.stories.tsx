import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NavigationButton from './NavigationButton';

export default {
  title: 'NavigationButton',
  component: NavigationButton
} as ComponentMeta<typeof NavigationButton>;

const Template: ComponentStory<typeof NavigationButton> = (args) => <NavigationButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Button text',
  route: '/services'
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=57%3A1604',
  },
}


