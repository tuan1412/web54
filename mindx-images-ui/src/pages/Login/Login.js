import React from "react";
import { AuthLayout } from "../../components/Layout";
import request from "../../api/request";
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().email("Not email").required("Required"),
  password: yup.string().min(6).required(),
}).required();

function SubmitButton({ control, errors }) {
  const formState = useWatch({ control });

  const hasVal = !Object.keys(formState).some(key => !formState[key]);
  const hasError = Object.keys(errors).length > 0;
  const disabled = !hasVal || hasError;
  
  return (
    <button type="submit" className="btn btn-primary" disabled={disabled}>
      Submit
    </button>
  )
}

function InputPassword({ control, ...props}) {
  const username = useWatch({ control, name: 'username' });
 
  const [show, setShow] = React.useState(false);

  const isShowComp = username === 'admin@gmail.com';

  if (!isShowComp) return null;

  return (
    <div>
      <input type={show ? 'text' : 'password'} {...props} />
      <span onClick={() => setShow(preShow => !preShow)}>Mắt</span>
    </div>
  )
}

export default function Login() {
  const { 
    register, 
    handleSubmit,
    control,
    setValue,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      username: 'tuan@gmail.com',
      password: '123456'
    },
    resolver: yupResolver(schema)
  });

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setValue('username', '5s@gmail.com');
  //   }, 5000)
  // }, [])

  const onSubmit = async data => {
    const { username, password } = data;
    try {
      const res = await request({
        url: "/auth/login",
        method: "POST",
        data: { username, password },
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("render");
  return (
    <AuthLayout>
      <div className="border p-3" style={{ width: 500 }}>
        <h1>MindX Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email
            </label>
            <input
              type="text"
              className={`form-control ${errors.username?.message ? 'is-invalid' : ''}`}
              id="username"
              {...register("username", { required: true })}
            />
            {errors.username?.message && 
              <div className="invalid-feedback">{errors.username?.message}</div>
            } 
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password?.message ? 'is-invalid' : ''}`}
              id="password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password?.message && 
              <div className="invalid-feedback">{errors.password?.message}</div>
            } 
          </div>
          <InputPassword control={control} />
          <SubmitButton control={control} errors={errors} />
        </form>
      </div>
    </AuthLayout>
  );
}
