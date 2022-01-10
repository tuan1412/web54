import React from 'react';
import { AuthLayout } from '../../components/Layout';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/userSlice';

const schema = yup
  .object({
    username: yup.string().email('Not email').required('Required'),
    password: yup
      .string()
      .min(6)
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        'Password must have at least digit, character'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Password not match')
      .required(),
  })
  .required();

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [status, setStatus] = React.useState('idle');
  const dispatch = useDispatch();

  const isLoading = status === 'loading';

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      setStatus('loading');
      await dispatch(register({ username, password })).unwrap();
    } catch (err) {
      setStatus('error');
      console.log(err);
    }
  };

  console.log('render');
  return (
    <AuthLayout>
      <div className="border p-3" style={{ width: 500 }}>
        <h1>MindX Form Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.username?.message ? 'is-invalid' : ''
              }`}
              id="username"
              {...register('username')}
            />
            {errors.username?.message && (
              <div className="invalid-feedback">{errors.username?.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${
                errors.password?.message ? 'is-invalid' : ''
              }`}
              id="password"
              {...register('password')}
            />
            {errors.password?.message && (
              <div className="invalid-feedback">{errors.password?.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm password
            </label>
            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword?.message ? 'is-invalid' : ''
              }`}
              id="confirmPassword"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword?.message && (
              <div className="invalid-feedback">
                {errors.confirmPassword?.message}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link className="btn btn-link" to="/login">
            Login
          </Link>
          <a href="http://www.google.com">Đi tới google</a>
        </form>
      </div>
    </AuthLayout>
  );
}
