import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Image from '.';

export default {
  title: 'Image',
  component: Image
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://picsum.photos/300/300'
}


