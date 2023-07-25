import React from 'react';
​
// Import Schema UI Provider and Render engine
import {isInvalid} from '@ui-schema/ui-schema/ValidityReporter';
import {createOrderedMap} from '@ui-schema/ui-schema/Utils/createMap';
import {UIStoreProvider, createStore} from '@ui-schema/ui-schema/UIStore';
import {storeUpdater} from '@ui-schema/ui-schema/storeUpdater';
import {UIMetaProvider, useUIMeta} from '@ui-schema/ui-schema/UIMeta';
// new in `0.4.0-alpha.1`:
// import {injectPluginStack} from '@ui-schema/ui-schema/applyPluginStack';
// deprecated since `0.4.0-alpha.1`:
import {UIRootRenderer} from '@ui-schema/ui-schema/UIRootRenderer';
// basic in-schema translator / `t` keyword support
import {relTranslator} from '@ui-schema/ui-schema/Translate/relT';
// Get the widgets binding for your design-system
import {widgets} from '@ui-schema/ds-material/widgetsBinding';
// new in `0.4.0-alpha.1`:
// import {GridContainer} from '@ui-schema/ds-material/GridContainer';
​
// could be fetched from some API or bundled with the app
const schemaBase = {
    type: 'object',
    properties: {
        country: {
            type: 'string',
            widget: 'Select',
            enum: [
                'usa',
                'canada',
                'eu'
            ],
            default: 'eu',
            tt: 'upper'
        },
        name: {
            type: 'string',
            maxLength: 20,
        }
    },
    required: [
        'country',
        'name',
    ],
};
​
// or fetch from API
const data = {};
​
// for `>=0.4.0-alpha.1`:
// const GridStack = injectPluginStack(GridContainer)
​
export const DemoForm = () => {
    // optional state for display errors/validity
    const [showValidity, setShowValidity] = React.useState(false);
​
    // needed variables and setters for the render engine, create wherever you like
    const [store, setStore] = React.useState(() => createStore(createOrderedMap(data)));
    const [schema/*, setSchema*/] = React.useState(() => createOrderedMap(schemaBase));
​
    // `useUIMeta` can be used safely, without performance impact (`useUI` has a performance impact)
    const {widgets, t} = useUIMeta()
​
    const onChange = React.useCallback((actions:any) => {
        setStore(storeUpdater(actions))
    }, [setStore])
​
    return <>
        <UIStoreProvider
            store={store}
            onChange={onChange}
            showValidity={showValidity}
        >
            {/*
              * for `>=0.4.0-alpha.1`:
              */}
            {/*<GridStack isRoot schema={schema}/>*}
​
            {/*
              * deprecated since `0.4.0-alpha.1`:
              */}
            <UIRootRenderer schema={schema}/>
        </UIStoreProvider>
​
        <button
            /* show the validity only at submit (or pass `true` to `showValidity`) */
            onClick={() =>
                isInvalid(store.getValidity()) ?
                    setShowValidity(true) :
                    console.log('doingSomeAction:', store.valuesToJS())
            }
        >send!
        </button>
    </>
};
​
export default function App() {
    return <UIMetaProvider
        widgets={widgets}
        t={relTranslator}
        // never pass down functions like this - always use e.g. `React.useCallback`, check performance docs for more
        //t={(text, context, schema) => {/* add translations */}}
    >
    </UIMetaProvider>
}