'use client';
import React from "react";

// "global" ui-config
import { UIMetaProvider, useUIMeta } from '@ui-schema/ui-schema/UIMeta';
// for data-stores / data-binding
import { UIStoreProvider, createEmptyStore, createStore } from '@ui-schema/ui-schema/UIStore';
import { storeUpdater } from '@ui-schema/ui-schema/storeUpdater';

// util for `PluginStack` rendering
import { injectPluginStack } from '@ui-schema/ui-schema/applyPluginStack';

// for validity checking
import { isInvalid } from '@ui-schema/ui-schema/ValidityReporter';
// for deep immutables
import { createOrderedMap } from '@ui-schema/ui-schema/Utils/createMap';
// for `t` keyword support / basic in-schema translation
import { relTranslator } from '@ui-schema/ui-schema/Translate/relT';

// import the widgets for your design-system.
import { Step, Stepper, widgets } from "@ui-schema/ds-material";

// root-level grid container
import { GridContainer } from "@ui-schema/ds-material/GridContainer";
import { Button } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { browserT } from "./t";


// Empty Demo Schema & Data/Values
const schema1 = {
  type: 'object',
  title: 'headline',
  properties: {
    stepper: {
      type: 'object',
      widget: 'Stepper',
      properties: {
        'step-1': {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 3,
              view: {
                sizeMd: 6,
              },
            },
            surname: {
              type: 'string',
              view: {
                sizeMd: 6,
              },
            },
          },
          required: [

            'surname'
          ],
          
        },
        'step-2': {
          type: 'object',
          widget: 'Step',
          properties: {
            topics: {
              type: 'array',
              widget: 'SelectMulti',
              view: {
                sizeMd: 3,
              },
              items: {
                oneOf: [
                  { const: 'theater' },
                  { const: 'crime' },
                  { const: 'sci-fi' },
                  { const: 'horror' },
                ],
              },
            },
          },
        },
        'step-3': {
          type: 'object',
          widget: 'Step',
          properties: {
            accepted: {
              type: 'boolean',
            },
          },
        },
      },
    },
    headline: {
      type: 'string',
      view: {
        sizeXs: 6,
        sizeSm: 6,
        sizeMd: 6,
        sizeLg: 6,
        sizeLx: 6,
      },
    },
    qty: {
      type: 'number',
      minimum: 2,
      maximum: 15,
      view: {
        sizeMd: 3,
      },
    },
    length: {
      type: 'number',
      multipleOf: 2,
      view: {
        sizeMd: 3,
      },
    },
    text: {
      type: 'string',
      widget: 'Text',
      view: {
        sizeMd: 6,
      },
    },
    usaPhone: {
      type: 'string',
      // only valid for: (888)555-1212 or 555-1212
      pattern: '^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$',
      view: {
        sizeMd: 3,
      },
    },
    style: {
      type: 'object',
      view: {
        sizeMd: 3,
      },
      properties: {
        center_items: {
          type: 'boolean',
          default: true,
          view: {
            sizeMd: 12,
          },
        },
        center_item_content: {
          type: 'boolean',
          view: {
            sizeMd: 12,
          },
        },
      },
      required: [
        'center_item_content',
      ],
    },
    // todo: `@ui-schema/material-richtext` was removed before 0.3.0-beta - as DraftJS is abandoned and is not compatible with immutable v4
    /*rich_text: {
        type: "string",
        widget: "RichText",
        view: {
            sizeMd: 12,
        }
    },*/
    layouts: {
      type: 'array',
      widget: 'OptionsCheck',
      view: {
        sizeMd: 3,
      },
      items: {
        oneOf: [
          {
            const: 'sidebar_left',
            t: {
              de: {
                title: 'Linke Sidebar',
              },
              en: {
                title: 'Left Sidebar',
              },
            },
          }, {
            const: 'sidebar_right',
          }, {
            const: 'notice',
          }, {
            const: 'content',
          }, {
            const: 'footer',
          },
        ],
      },
      default: [
        'sidebar_left',
      ],
    },
    sizeDef: {
      type: 'string',
      widget: 'OptionsRadio',
      default: 'middle',
      view: {
        sizeMd: 3,
      },
      enum: [
        'small',
        'middle',
        'big',
      ],
    },
    age: {
      type: 'string',
      widget: 'Select',
      //default: "adult",
      view: {
        sizeMd: 3,
      },
      enum: [
        'child',
        'teen',
        'adult',
        '50plus',
      ],
    },
  },
  required: [
    'layouts',
    'size',
  ],
}

const values = {};

const customWidgets = { ...widgets }
customWidgets.custom = {
  ...widgets.custom,
  Stepper: Stepper,
  Step: Step,
}

const data1 = {
  stepper: { "step-1": { name: "Max" } ,},
  headline: "Some Demo Content Headline"
};

// wire up the grid container component with the render engine:
const GridStack = injectPluginStack(GridContainer)

export const Generator = () => {
  // Create a state with the data, transforming into immutable on first mount
  const [showValidity, setShowValidity] = React.useState(false)
  const [store, setStore] = React.useState(() => createStore(createOrderedMap(data1)));
  const [schema, setSchema] = React.useState(() => createOrderedMap(schema1));


  React.useEffect(() => {
    // simulating getting `schema` and `data` from an API
    /*setTimeout(() => {
            setStore(createStore(createOrderedMap(data1)));
            setSchema(createOrderedMap(schema1));
        }, 1200);*/
  }, [setStore, setSchema]);

  const onChange = React.useCallback(
    (actions: any) => {
      
      setStore(storeUpdater(actions));
    },
    [setStore]
  );

  if (!store || !schema)
    return (
      <div style={{ textAlign: "center", margin: "75px 0" }}>
        <Refresh className={"refresh-spin"} fontSize={"large"} />
        <p>Loading Schema & Data</p>
      </div>
    );


  return (
    // move `UIMetaProvider` somewhere higher in your app, use one meta provider for multiple store providers
    <>
      <UIMetaProvider
        widgets={customWidgets}
        t={browserT}
      >
        <UIStoreProvider
          store={store}
          onChange={onChange}
          showValidity={showValidity}
        >
          <GridStack isRoot schema={schema}  />
        </UIStoreProvider>
      </UIMetaProvider>
      <Button
        style={{ marginTop: 24 }}
        onClick={() => {
          console.log(
            "data-store: ",
            store.getValues() ? store.getValues().toJS() : undefined
          );
          console.log("is-invalid: ", !!isInvalid(store.getValidity()));
          isInvalid(store.getValidity())
            ? setShowValidity(true)
            : console.log("should do some action here");
        }}
        variant={"contained"}
      >
        Send!
      </Button>
    </>
  )
};

