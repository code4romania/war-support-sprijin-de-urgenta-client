// story.js
exports.story = name => `
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ${name} from './${name}';

export default {
  title: '${name}',
  component: ${name}
} as ComponentMeta<typeof ${name}>;

const Template: ComponentStory<typeof ${name}> = (args) => <${name} {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultProps: '${name} default props'
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
`;
