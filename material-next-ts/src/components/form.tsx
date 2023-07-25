import { defaultFields } from '@tutim/fields';
import { TutimWizard, TutimProvider } from '@tutim/headless';
import { FormConfig, PartialFormConfig } from '@tutim/types'

const config: FormConfig = {
    // Use https://app.tutim.io to create and manage rich schemas with no-code
    fields: [
        
        {//@ts-ignore
            key: 'firstName', label: 'First Name', type: 'text', isRequired: true, tooltip: 'A tooltip', fieldState: { error: { message: 'This field is required' } }, "validations": {
                "minLength": { "value": 5, "message": "Minimo 5 letras" },
                "pattern": { "value": "^(john)", "message": "Has to start with john" }
            }
        },
        { key: 'lastName', label: 'Last Name', type: 'text' },
    ],
};

interface IFormSubmit {
    data: any;
    schema: FormConfig | PartialFormConfig;
}

interface IFormComponent {

}

const FormComponent = () => {

    const handleSubmit = (formData: any) => {
        console.log(formData);
        // Handle form submission logic here
    };

    const handleCancel = () => {
        // Handle form cancellation logic here
    };


    return (
        <TutimProvider fieldComponents={defaultFields} options={{ clientId: "eceba07e-d3cd-4b16-a10f-46442290c4aa" }}>
            <TutimWizard onSubmit={handleSubmit} config={config} />
        </TutimProvider>
    );
};

export default FormComponent;