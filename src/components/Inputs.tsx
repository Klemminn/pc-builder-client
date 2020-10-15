import React, { useState } from 'react';
import ReactMultiSelect from '@khanacademy/react-multi-select';
import { Input } from 'reactstrap';

type SelectProps = {
  options: any;
  placeholder?: string;
  onChange?(selected: string[]): void;
};

export const Select: React.FC<SelectProps> = ({
  options,
  placeholder,
  onChange,
  ...rest
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <ReactMultiSelect
      options={options}
      selected={selected}
      onSelectedChanged={(selectedOptions: string[]) => {
        setSelected(selectedOptions);
        onChange?.(selectedOptions);
      }}
      disableSearch
      hasSelectAll={false}
      overrideStrings={{
        selectSomeItems: placeholder,
        allItemsAreSelected: 'Allt valið',
      }}
      {...rest}
    />
  );
};

type TextInputProps = {
  onChange?(value: string): void;
  placeholder?: string;
};

export const TextInput: React.FC<TextInputProps> = ({ onChange, ...rest }) => (
  <Input
    onChange={(event) => onChange?.(event?.target?.value ?? '')}
    {...rest}
  />
);
