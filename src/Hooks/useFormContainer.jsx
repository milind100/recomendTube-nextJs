"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, setFormError } from "../reducers/formReducer/formSlice";
import { getObject, head, keys, last } from "../utils/javascript";
import { formFieldsValidations } from "../utils/validation";
import { notEmpty } from "../utils/regex";

const useFormContainer = ({ attributes, reduxStateNames, defaultValues }) => {
  const dispatch = useDispatch();

  const formValues = useSelector(
    (state) => state.form.formValues?.[reduxStateNames.parent]
  );
  const formError = useSelector(
    (state) => state.form.formError?.[reduxStateNames.parent]
  );

  useEffect(() => {
    if (!formValues) {
      dispatch(
        setFormData({
          parent: reduxStateNames?.parent,
          value: defaultValues,
        })
      );
    }
  }, [defaultValues]);

  const validate = (name, value) => {
    const { isRequired, pattern, error } = getObject(attributes, name);

    const res = formFieldsValidations(pattern, value, formValues?.password);
    if (isRequired) {
      if (typeof value === "object") {
        return null;
      }
      if (!notEmpty(value)) {
        return head(error);
      }
    } else if (!!value && !res) {
      return last(error);
    }
    if (isRequired && !res) {
      return last(error);
    }
    return null;
  };

  const isFormValid = () => {
    let isValid = true;
    const errorObj = {};
    keys(formValues)?.forEach((curKey) => {
      const validatiton =
        formError?.[curKey] ?? validate(curKey, formValues?.[curKey]);
      errorObj[curKey] = validatiton;
      if (validatiton) {
        isValid = false;
      }
    });

    dispatch(
      setFormError({
        parent: reduxStateNames.parent,
        value: { ...formError, ...errorObj },
      })
    );
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(
      setFormData({
        parent: reduxStateNames.parent,
        value: { ...formValues, [name]: value },
      })
    );

    dispatch(
      setFormError({
        parent: reduxStateNames.parent,
        value: {
          ...formError,
          [name]: validate(name, value),
          ...(name === "password" &&
            formError?.["confirmPassword"] &&
            formValues?.confirmPassword === value && { confirmPassword: null }),
        },
      })
    );
  };

  const setManualFieldError = (name, errorMsg) => {
    dispatch(
      setFormError({
        parent: reduxStateNames.parent,
        value: { ...formError, [name]: errorMsg },
      })
    );
  };

  const resetDefaultStates = () => {
    dispatch(
      setFormData({
        parent: reduxStateNames?.parent,
        value: defaultValues,
      })
    );
    dispatch(
      setFormError({
        parent: reduxStateNames.parent,
        value: defaultValues,
      })
    );
  };

  return {
    handleChange,
    formValues,
    formError,
    isFormValid,
    resetDefaultStates,
    setManualFieldError,
  };
};

export default useFormContainer;
