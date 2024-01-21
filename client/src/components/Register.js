import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Field,
  FormElement,
  FieldWrapper,
} from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Card, CardBody } from "@progress/kendo-react-layout";
import { register } from "../services/api";

const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const emailValidator = (value) =>
  emailRegex.test(value) ? "" : "Please enter a valid email.";

const Register = () => {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    try {
      const { data } = await register(event);
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="signin-container">
      <Card
        style={{
          width: 500,
          boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
          marginTop: "15px",
        }}
      >
        <CardBody>
          <Form
            onSubmit={handleSubmit}
            render={(formRenderProps) => (
              <FormElement
                style={{
                  maxWidth: 650,
                }}
              >
                <fieldset className={"k-form-fieldset"}>
                  <legend className={"k-form-legend"}>
                    <strong>
                      <span>Create Account</span>
                    </strong>
                  </legend>

                  <FieldWrapper>
                    <div className="k-form-field-wrap">
                      <Field
                        name={"name"}
                        type={"text"}
                        component={Input}
                        labelClassName={"k-form-label"}
                        label={"Name"}
                        validator={(value) =>
                          value ? "" : "Please enter name."
                        }
                        onChange={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </FieldWrapper>
                  <FieldWrapper>
                    <div className="k-form-field-wrap">
                      <Field
                        name={"email"}
                        type={"email"}
                        component={Input}
                        labelClassName={"k-form-label"}
                        label={"Email"}
                        validator={emailValidator}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </FieldWrapper>

                  <FieldWrapper>
                    <div className="k-form-field-wrap">
                      <Field
                        name={"password"}
                        type={"password"}
                        component={Input}
                        labelClassName={"k-form-label"}
                        label={"Password"}
                        validator={(value) =>
                          value ? "" : "Please enter a password."
                        }
                        onChange={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </FieldWrapper>
                </fieldset>

                <div className="k-form-buttons">
                  <button
                    type={"submit"}
                    themeColor={"primary"}
                    className="k-button k-button-md "
                    disabled={!formRenderProps.allowSubmit}
                  >
                    Register
                  </button>
                </div>
                <br />
                <p>
                  Have already an account ? <Link to="/">Login</Link>
                </p>
              </FormElement>
            )}
          />
          <ToastContainer />
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
