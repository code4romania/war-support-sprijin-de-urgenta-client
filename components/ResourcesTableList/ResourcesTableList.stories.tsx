
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ResourcesTableList from './ResourcesTableList';

export default {
  title: 'ResourcesTableList',
  component: ResourcesTableList
} as ComponentMeta<typeof ResourcesTableList>;

const Template: ComponentStory<typeof ResourcesTableList> = (args) => <ResourcesTableList {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultProps: 'ResourcesTableList default props'
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/OlNwOwDItLPKBcy5OEROVj/Sprijin-de-urgenta?node-id=309%3A6731',
  },
}
