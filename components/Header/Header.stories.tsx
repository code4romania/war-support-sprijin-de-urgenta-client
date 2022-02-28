import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from '.';

export default {
  title: 'Header',
  component: Header
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header />;

export const Default = Template.bind({});


