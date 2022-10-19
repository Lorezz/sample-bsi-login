import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppContext, ActionTypes, AuthObj } from 'lib/context';

export default function Login() {
  const router = useRouter();
  const { dispatch } = useAppContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  type FormValues = {
    email: string;
    password: string;
  };

  async function login({
    email,
    password,
  }: FormValues): Promise<AuthObj | null> {
    console.log('login', email, password);
    await sleep(2000);
    let result = null;
    if (email == 'jad@zaza.it' && password == 'fava') {
      result = {
        firstName: 'jad',
        lastName: 'zaza',
        email: 'jad@zaza.it',
        token: 'xxxx',
      };
    }
    console.log('RESULT', result);
    return result;
  }

  const signIn = async (formData: FormValues): Promise<void> => {
    console.log('formData', formData);
    try {
      const result = await login(formData); //await api.signIn(formData);
      if (result) {
        dispatch({ type: ActionTypes.SET_AUTH, data: result });
        router.push(`/private-area`);
      } else {
        setError('Autentication Error');
      }
    } catch (error) {
      console.error(error);
      setError('Autentication Error');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setLoading(true);
    setError(null);
    signIn(data);
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Please provide a valid email')
      .required('Required'),
    password: yup.string().required('Required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 mt-5 pt-5">
          <div className="row">
            <div className="col-12">
              <h4>Login to proceed</h4>
              <hr />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="form-control"
                />
                <p className="text-danger">{errors.email?.message}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-4">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  className="form-control"
                />
                <p className="text-danger">{errors.password?.message}</p>
              </div>
            </div>
          </div>
          {error && (
            <div className="row mt-3">
              <div className="col-12">
                <div className="text-danger">{error}</div>
              </div>
            </div>
          )}
          <div className="row mt-3">
            <div className="col-12">
              {loading ? (
                <div className="btn btn-primary disabled">loading...</div>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Invia form
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
