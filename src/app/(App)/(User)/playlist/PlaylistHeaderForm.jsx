/* eslint-disable no-extra-boolean-cast */
"use client";
import { useState } from "react";
import { description, domain, title } from "../../../../utils/constants";
import { getObject, head, keys } from "../../../../utils/javascript";
import { formFieldsValidations } from "../../../../utils/validation";
import RTForm from "../../../../shared/RTForm";
import RTFormField from "../../../../shared/RTFormField";
import { BookOpenText, Captions, Nfc } from "lucide-react";

const fieldsArray = [
  {
    type: "text",
    name: title,
    icon: <BookOpenText size={15} />,
    pattern: "notEmpty",
    label: "Title",
    placeholder: "Playlist title ",
    error: ["Title is mandatory"],
  },
  {
    type: "text",
    name: domain,
    label: "Domain (optional)",
    placeholder: "Domain maths,preparation,programming... ",
    icon: <Nfc size={15} />,
  },
  {
    type: "textarea",
    name: description,
    label: "Description (optional)",
    placeholder: "Plalist description/instructions ",
    rows: 10,
    cols: 6,
    icon: <Captions />,
  },
];
const defaultState = {
  title: "",
  Description: "",
  domain: "",
};

const PlaylistHeaderForm = ({
  formValues = defaultState,
  handleHeadChange,
}) => {
  const [errors, setErrors] = useState(defaultState);
  const [values, setValues] = useState(formValues);

  const validate = (name, value) => {
    const { pattern, error } = getObject(fieldsArray, name);
    const isValid = formFieldsValidations(pattern, value);

    if (!isValid) {
      return head(error);
    }
    return null;
  };

  const isFormValid = () => {
    let isValid = true;
    const errorObj = {};
    keys(values)?.forEach((key) => {
      const validationError = validate(key, values[key]);
      errorObj[key] = validationError;
      if (validationError) {
        isValid = false;
      }
    });
    setErrors(errorObj);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      return handleHeadChange(values);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="  shadow-sm shadow-gray-600 rounded-md bg-white p-5 pb-10 w-[500px]">
        <h1 className="font-bold text-2xl">Playlist Titles</h1>
        <div className="mt-5">
          <RTForm>
            <RTFormField
              attributes={fieldsArray}
              handleChange={handleChange}
              formError={errors}
              formValues={values}
            />
          </RTForm>
        </div>
        <div className="flex w-full justify-end">
          <button
            onClick={handleSave}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-orange-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 md:hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeaderForm;
