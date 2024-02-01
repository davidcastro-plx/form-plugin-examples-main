import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit';

import './nif-input';
import { IdentityCardTextfield } from './nif-input';

export default {
  title: 'IdentityCard/Textfield',
  component: 'identity-card-textfield',
  parameters: {
    actions: {
      handles: ['nintex-value-change'],
    },
  },
} as Meta;

const Template: StoryFn<IdentityCardTextfield> = ({
  title,
  description,
  readOnly
}) => {
  return html`<identity-card-textfield
    .title=${title}
    .description=${description}
    ?readOnly=${readOnly}
  >
  </identity-card-textfield>`;
};

export const Base: StoryFn<IdentityCardTextfield> = Template.bind({});
Base.args = {
  title: 'Example',
  description: 'Description of field',
  readOnly: false,
  identityCardType: ''
};
