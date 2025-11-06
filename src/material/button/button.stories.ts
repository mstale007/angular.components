import { Meta, Story } from '@storybook/angular';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export default {
  title: 'Material/Buttons/Button',
  component: MatButton,
  parameters: {
    docs: {
      description: {
        component: `
Material Design button component. Users interact with a button to perform an action.

## When to use
- To allow users to take actions, and make choices, with a single tap.
- When you need a versatile button that can be styled as a basic, raised, stroked, flat, icon, FAB, or mini FAB button.

## Accessibility
- Buttons are inherently accessible and navigable with a keyboard.
- Use the 'aria-label' attribute to provide a descriptive label for icon buttons.
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'accent', 'warn', undefined],
      description: 'The color of the button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disableRipple: {
        control: 'boolean',
        description: 'Whether the ripple effect is disabled.',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: 'false' },
        },
    },
    label: {
        control: 'text',
        description: 'The text to display in the button.',
        table: {
            type: { summary: 'string' },
            defaultValue: { summary: 'Button' },
        },
    },
    onClick: {
        action: 'clicked',
        description: 'Emits a `MouseEvent` on click.',
    }
  },
} as Meta<MatButton>;

const Template: Story<MatButton & {label: string}> = (args: MatButton & {label: string}) => ({
  props: args,
  moduleMetadata: {
    imports: [MatButtonModule, MatIconModule],
  },
  template: `<button mat-button [color]="color" [disabled]="disabled" [disableRipple]="disableRipple" (click)="onClick($event)">{{label}}</button>`,
});

export const Basic = Template.bind({});
Basic.args = {
  label: 'Button',
  color: 'primary',
  disabled: false,
  disableRipple: false,
};
Basic.parameters = {
  docs: {
    description: {
      story: 'This is the default button style.',
    },
  },
};

export const Raised = Template.bind({});
Raised.args = {
    ...Basic.args,
    label: 'Raised',
};
Raised.parameters = {
    docs: {
        description: {
            story: 'This is a raised button.',
        },
    },
};
Raised.template = `<button mat-raised-button [color]="color" [disabled]="disabled" [disableRipple]="disableRipple">{{label}}</button>`;

export const Stroked = Template.bind({});
Stroked.args = {
    ...Basic.args,
    label: 'Stroked',
};
Stroked.parameters = {
    docs: {
        description: {
            story: 'This is a stroked button.',
        },
    },
};
Stroked.template = `<button mat-stroked-button [color]="color" [disabled]="disabled" [disableRipple]="disableRipple">{{label}}</button>`;

export const Flat = Template.bind({});
Flat.args = {
    ...Basic.args,
    label: 'Flat',
};
Flat.parameters = {
    docs: {
        description: {
            story: 'This is a flat button.',
        },
    },
};
Flat.template = `<button mat-flat-button [color]="color" [disabled]="disabled" [disableRipple]="disableRipple">{{label}}</button>`;

export const Icon = Template.bind({});
Icon.args = {
    ...Basic.args,
    label: 'home',
};
Icon.parameters = {
    docs: {
        description: {
            story: 'This is an icon button.',
        },
    },
};
Icon.template = `<button mat-icon-button [color]="color" [disabled]="disabled" [disableRipple]="disableRipple" [attr.aria-label]="label"><mat-icon>{{label}}</mat-icon></button>`;

export const Accessibility = Template.bind({});
Accessibility.args = {
    ...Basic.args,
    label: 'Open menu',
};
Accessibility.parameters = {
    docs: {
        description: {
            story: 'This is an example of an accessible icon button.',
        },
    },
};
Accessibility.template = `<button mat-icon-button [color]="color" [disabled]="disabled" [disableRipple]="disableRipple" [attr.aria-label]="label"><mat-icon>menu</mat-icon></button>`;

export const Fab = Template.bind({});
Fab.args = {
    ...Basic.args,
    label: 'home',
};
Fab.parameters = {
    docs: {
        description: {
            story: 'This is a FAB button.',
        },
    },
};
Fab.template = `<button mat-fab [color]="color" [disabled]="disabled" [disableRipple]="disableRipple"><mat-icon>{{label}}</mat-icon></button>`;

export const MiniFab = Template.bind({});
MiniFab.args = {
    ...Basic.args,
    label: 'home',
};
MiniFab.parameters = {
    docs: {
        description: {
            story: 'This is a mini FAB button.',
        },
    },
};
MiniFab.template = `<button mat-mini-fab [color]="color" [disabled]="disabled" [disableRipple]="disableRipple"><mat-icon>{{label}}</mat-icon></button>`;
