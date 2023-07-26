import { Field, FieldConfig } from '@tutim/types';

export const CustomField2: Field = ({ inputProps, fieldConfig }) => {
  const { value, onChange } = inputProps;
  const onClick = () => onChange(value + 1);
  return (
    <button type="button" onClick={onClick}>
      {fieldConfig.label}: {value}
    </button>
  );
};

export const customFieldConfig2: FieldConfig = {
  key: 'clicker2',
  label: 'Click Me 2',
  type: 'custom-field-2',
  defaultValue: 0,
  Field: CustomField2,
};