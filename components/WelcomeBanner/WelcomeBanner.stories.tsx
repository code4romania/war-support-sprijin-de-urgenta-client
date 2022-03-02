
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WelcomeBanner from './WelcomeBanner';

export default {
  title: 'WelcomeBanner',
  component: WelcomeBanner
} as ComponentMeta<typeof WelcomeBanner>;

const Template: ComponentStory<typeof WelcomeBanner> = (args) => <WelcomeBanner {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultProps: 'WelcomeBanner default props'
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
