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
import { widgets } from "@ui-schema/ds-material";

// root-level grid container
import { GridContainer } from "@ui-schema/ds-material/GridContainer";


// Empty Demo Schema & Data/Values
const schema = createOrderedMap({
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 3
    },
    "comment": {
      "type": "string",
      "widget": "Text",
      "view": {
        "rows": 3
      }
    },
    "accept_privacy": {
      "type": "boolean"
    }
  },
  "required": [
    "accept_privacy"
  ]
});

const values = {};

// wire up the grid container component with the render engine:
const GridStack = injectPluginStack(GridContainer)

export const Generator = () => {
  // Create a state with the data, transforming into immutable on first mount
  const [store, setStore] = React.useState(() => createStore(createOrderedMap(values)));

  // or create empty store, based on the schema type:
  // const [store, setStore] = React.useState(() => createEmptyStore(schema.get('type'));

  const onChange = React.useCallback((actions: any) => {
    setStore(storeUpdater(actions))
  }, [setStore])

  return (
    // move `UIMetaProvider` somewhere higher in your app, use one meta provider for multiple store providers
    <UIMetaProvider
      widgets={widgets}
      t={relTranslator}
    >
      <UIStoreProvider
        store={store}
        onChange={onChange}
        showValidity={true}
      >
        <GridStack isRoot schema={schema} />
      </UIStoreProvider>
    </UIMetaProvider>
  )
};