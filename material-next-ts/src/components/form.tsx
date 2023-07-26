import { Button } from '@mui/material';
import { defaultFields } from '@tutim/fields';
import { TutimWizard, TutimProvider, useWizard, useWizardContext, useStep , WizardProvider} from '@tutim/headless';
import { FormConfig, PartialFormConfig } from '@tutim/types'

const config: FormConfig = {
  // Use https://app.tutim.io to create and manage rich schemas with no-code
  fields: [
    {
      key: 'firstName',
      label: 'First Name',
      type: 'text',
      isRequired: true,
      tooltip: 'A tooltip',
      helperText: 'A helper text',
      placeholder: 'A placeholder',
    },
    {
      key: 'lastName',
      isRequired: true,
      label: 'Last Name',
      type: 'text',
    },
    { key: 'email', isRequired: true, label: 'Email', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'text' },
    { key: 'additional', label: 'additional', type: 'text', isRequired: true },
  ],
  wizard: {
    steps: [
      {
        label: 'Basic',
        fields: ['firstName', 'lastName'],
      },
      {
        label: 'Contact',
        fields: ['email', 'phone'],
      },
      {
        label: 'Additional',
        fields: ['additional'],
      },
    ],
    orientation: 'vertical',
  },
  meta: {
    title: 'Basic Wizard',
  },
};

export const HeadlessWizard = (): JSX.Element => {
  const wizardContext = useWizard({ initialValues: { email: 'one' }, onSubmit: console.log, config });

  return (
    <WizardProvider wizardContext={wizardContext}>
      <ContextedWizard />
    </WizardProvider>
  );
};

const ContextedWizard = () => {
  const wizard = useWizardContext();

  return <ContextedStep key={`step${wizard.activeStep}`} />;
};

const contextOptions = {
  clientId: '2',

};

const ContextedStep = () => {
  const context = useWizardContext();
  const step = useStep();
  return (
    <div>
      <p>my step is {context.activeStep}</p>
      {step.form.fields}
      <Button onClick={step.goBack} disabled={!step.form.formState.isValid || step.isFirstStep}>
        Go Back
      </Button>
      <Button onClick={step.goNext} disabled={!step.form.formState.isValid}>
        {step.isLastStep ? 'Submit' : 'Go Next'}
      </Button>
    </div>
  );
};
const FormComponent = () => {

  const handleSubmit = (formData: any) => {
    console.log(formData);
    // Handle form submission logic here
  };

  const handleCancel = () => {
    // Handle form cancellation logic here
  };


  return (
    <TutimProvider fieldComponents={defaultFields} options={contextOptions}>
      <HeadlessWizard />
    </TutimProvider>
  );
};

export default FormComponent;