import React from "react";
import { Link } from 'react-router-dom';
import { AuthLayout } from "../../components/Layout";
import request from "../../api/request";
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useAuth from '../../hooks/useAuth';

const schema = yup.object({
  username: yup.string().required("Required"),
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

export default function Login() {
  const { 
    register, 
    handleSubmit,
    control,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      username: 'tuan1',
      password: '123456'
    },
    resolver: yupResolver(schema)
  });
  const { setUser } = useAuth();

  const onSubmit = async data => {
    const { username, password } = data;
    try {
      const res = await request({
        url: "/auth/login",
        method: "POST",
        data: { username, password },
      });

      if (res.success) {
        const { token, username, _id } = res.data;
        localStorage.setItem("token", token);
        setUser({
          _id,
          username
        })

      }
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
          <SubmitButton control={control} errors={errors} />
        
          <Link className="btn btn-link" to="/register">Signup</Link>
        </form>
      </div>
    </AuthLayout>
  );
}
