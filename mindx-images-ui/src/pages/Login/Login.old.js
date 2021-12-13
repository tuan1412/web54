import React from "react";
import { AuthLayout } from "../../components/Layout";
import request from "../../api/request";

export default function Login() {
  // const [username, setUsername] = React.useState('');
  // const [password, setPassword] = React.useState('');

  // const handleChangeUsername = (e) => {
  //   const { value } = e.target;
  //   setUsername(value);
  // }

  // const handleChangePassword = (e) => {
  //   const { value } = e.target;
  //   setPassword(value);
  // }
  const [formState, setFormState] = React.useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({
    username: '',
    password: '',
  });

  const [submited, setSubmited] = React.useState(false);
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (!formState.username && submited) {
      setErrors(prevError => ({
        ...prevError,
        username: 'Username is required'
      }))
    } else {
      setErrors(prevError => ({
        ...prevError,
        username: ''
      }))
    }
  }, [formState.username, submited])

  const handleChangeForm = (e) => {
    const { value, name } = e.target;

    setFormState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    alert(inputRef.current.value);
    // setSubmited(true);

    // const { username, password } = formState;
    // try {
    //   const res = await request({
    //     url: "/auth/login",
    //     method: "POST",
    //     data: { username, password },
    //   });

    //   console.log(res);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  console.log("render");
  return (
    <AuthLayout>
      <div className="border p-3" style={{ width: 500 }}>
        <h1>MindX Form</h1>
        <form onSubmit={handleSubmitForm}>
          <div className="mb-3">
            <label htmlFor="test" className="form-label">
              Test
            </label>
            <input
              type="text"
              defaultValue="Test"
              ref={inputRef}
              className="form-control"
              name="test"
              id="test"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email
            </label>
            <input
              type="text"
              value={formState.username}
              onChange={handleChangeForm}
              className="form-control"
              name="username"
              id="username"
            />
            {errors.username && <p style={{ color: 'red'}}>{errors.username}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChangeForm}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!inputRef.current?.value}>
            Submit
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
