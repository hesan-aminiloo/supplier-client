import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from '@src/components';
import { useEffect, useState } from 'react';
import { Colors } from '@src/style/helpers/variables/colors';

import { ModalDrawer as ModalDrawerComponent } from './ModalDrawer';

const defaultExport: ComponentMeta<typeof ModalDrawerComponent> = {
  title: 'Components/Modals/ModalDrawer',
  component: ModalDrawerComponent,
  argTypes: {
    backdrop: {
      description: 'Whether the modal or drawer has a backdrop',
      type: 'boolean',
      defaultValue: true,
      table: {
        category: 'Backdrop',
        defaultValue: { summary: true },
      },
    },
    backdropColor: {
      description: 'The color of the backdrop',
      type: 'string',
      control: 'color',
      defaultValue: Colors.gray900,
      table: {
        category: 'Backdrop',
        defaultValue: { summary: Colors.gray900 },
      },
    },
    shouldBackdropClose: {
      description: 'Closing the modal or drawer on clicking the backdrop',
      type: 'boolean',
      table: {
        category: 'Backdrop',
        defaultValue: { summary: true },
      },
    },
    backdropClassName: {
      description: 'The CSS class for the backdrop',
      type: 'string',
      table: {
        category: 'Backdrop',
      },
    },
    className: {
      description: 'The CSS class for the modal or drawer',
      type: 'string',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      description: 'The content of the modal or drawer',
      type: { required: true, name: 'other', value: 'React.ReactNode' },
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    type: {
      description: 'The type of the component that is a modal or drawer',
      type: { required: true, name: 'string' },
      table: {
        type: { summary: 'string' },
      },
    },
    escClose: {
      description: 'Closing the modal or drawer on press the escape key',
      type: 'boolean',
      defaultValue: true,
      table: {
        defaultValue: { summary: true },
      },
    },
    id: {
      description: 'The ID of the modal or drawer',
      type: 'string',
      table: {
        defaultValue: { summary: 'modal-drawer-####' },
        type: { summary: 'string' },
      },
    },
    isFullHeight: {
      description:
        "Whether the height of modal or drawer is full or auto. It's work on drawer when placement is a bottom or top",
      type: 'boolean',
      defaultValue: false,
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isOpen: {
      description: 'Whether the modal or drawer opened or closed',
      type: 'boolean',
      defaultValue: false,
      table: {
        defaultValue: { summary: false },
      },
    },
    target: {
      description:
        "The target of the modal or drawer. It's a CSS selector. If the selector doesn't exist in DOM, the target will be document.body",
      type: 'string',
      defaultValue: '#root',
      table: {
        defaultValue: { summary: '#root' },
      },
    },
    'aria-labelledby': {
      description: "It's an aria-labelledby accessibility attribute",
      type: 'string',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
    'aria-describedby': {
      description: "It's an aria-describedby accessibility attribute",
      type: 'string',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
    onOpened: {
      description: 'Called when the backdrop is opened',
      type: 'function',
      table: {
        category: 'Events',
      },
    },
    onClosed: {
      description: 'Called when the backdrop is closed',
      type: 'function',
      table: {
        category: 'Events',
      },
    },
    placement: {
      description: 'Specifies the drawer opened from the top, bottom, right, or left side of the screen',
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      defaultValue: 'right',
      table: {
        defaultValue: { summary: 'right' },
      },
    },
    width: {
      description:
        "The width of the drawer. It's based on percentage. It applies when the placement of the drawer is left or right",
      type: 'number',
      defaultValue: 28,
      table: {
        defaultValue: { summary: 28 },
      },
    },
  },
};
export default defaultExport;

const NormalChildren = () => (
  <>
    <div className="px-4 pt-4 overflow-auto">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt?
      <br />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt?
      <br />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt?
      <br />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt?
      <br />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt?
      <br />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt?
      <br />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt?
      <br />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt?
      <br />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt?
      <br />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt?
      <br />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt?
      <br />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt? Lorem
      ipsum dolor sit amet consectetur, adipisicing elit. Architecto, incidunt recusandae. Soluta magni provident
      dolorum alias, sapiente, quia quos vitae omnis, ullam tenetur aut velit vero officiis quo aperiam sunt?
      <br />
    </div>
  </>
);

const WithSectionsChildren = () => (
  <>
    <div style={{ height: 100, backgroundColor: 'blue' }}>Header</div>
    <div
      style={{ height: 'calc(100% - 200px)' }}
      className="px-4 pt-4 overflow-auto"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero
      repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam
      doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet
      incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum
      amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam
      voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat
      dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus
      voluptatibus! Blanditiis.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero
      repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam
      doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet
      incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum
      amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam
      voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat
      dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus
      voluptatibus! Blanditiis.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero
      repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam
      doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet
      incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum
      amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam
      voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat
      dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus
      voluptatibus! Blanditiis.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero
      repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam
      doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet
      incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum
      amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam
      voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat
      dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus
      voluptatibus! Blanditiis.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero
      repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam
      doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet
      incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum
      amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam
      voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat
      dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus
      voluptatibus! Blanditiis.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero
      repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam
      doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet
      incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum
      amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam
      voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat
      dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus
      voluptatibus! Blanditiis.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero
      repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam
      doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet
      incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum
      amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam
      voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat
      dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus
      voluptatibus! Blanditiis.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero
      repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam
      doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet
      incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum
      amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam
      voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat
      dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus
      voluptatibus! Blanditiis.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero
      repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam
      doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet
      incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum
      amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam
      voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat
      dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus
      voluptatibus! Blanditiis.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero
      repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam
      doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet
      incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum
      amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam
      voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat
      dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus
      voluptatibus! Blanditiis.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero
      repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam
      doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet
      incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum
      amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam
      voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat
      dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus
      voluptatibus! Blanditiis.
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero
      repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam
      doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil eveniet
      incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam voluptatem fugiat deserunt cum
      amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat dignissimos consequatur laboriosam
      voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus voluptatibus! Blanditiis. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Nihil eveniet incidunt, quibusdam expedita libero repellat
      dignissimos consequatur laboriosam voluptatem fugiat deserunt cum amet quae voluptate et aliquam doloribus
      voluptatibus! Blanditiis.
    </div>
    <div
      style={{
        // flex: 1,
        height: 100,
        backgroundColor: 'red',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <div style={{ backgroundColor: 'white', color: 'black', flex: 1, padding: 20 }}>item</div>
      <div style={{ backgroundColor: 'white', color: 'black', flex: 1, padding: 20 }}>item</div>
    </div>
  </>
);

const Template: ComponentStory<typeof ModalDrawerComponent> = ({ isOpen = false, children, ...args }) => {
  const [isOpenState, setIsOpenState] = useState<boolean>(isOpen);

  useEffect(() => {
    setIsOpenState(isOpen);
  }, [isOpen]);

  return (
    <>
      <div>
        <Button
          className="mx-auto"
          variant="solid"
          color="primary"
          onClick={() => setIsOpenState(true)}
          data-testid="open-drawer"
        >
          open
        </Button>
      </div>
      <ModalDrawerComponent
        {...args}
        isOpen={isOpenState}
        onClosed={() => setIsOpenState(false)}
      >
        {children}
      </ModalDrawerComponent>
    </>
  );
};

export const Drawer: ComponentStory<typeof ModalDrawerComponent> = Template.bind({});
Drawer.args = {
  type: 'drawer',
  children: <NormalChildren />,
};

export const DrawerWithSections: ComponentStory<typeof ModalDrawerComponent> = Template.bind({});
DrawerWithSections.args = {
  type: 'drawer',
  isOpen: true,
  children: <WithSectionsChildren />,
};
