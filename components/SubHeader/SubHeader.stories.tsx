
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SubHeader from './SubHeader';

export default {
  title: 'SubHeader',
  component: SubHeader
} as ComponentMeta<typeof SubHeader>;

const Template: ComponentStory<typeof SubHeader> = (args) => <SubHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultProps: 'SubHeader default props'
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
