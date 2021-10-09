import React, { useState, useEffect, useRef } from "react";
import "./form.css";

const Form = () => {
  const initialState = {
    name: "",
    address: "",
    gender: "male",
    birthday: "",
    email: "",
    phone: "",
    courses: [],
    username: "",
    password: "",
    rePassword: "",
    note: "",
    avatar: "",
  };

  const initialStateError = {
    nameError: "",
    birthdayError: "",
    emailError: "",
    usernameError: "",
    passwordError: "",
    rePasswordError: "",
  };

  const [info, setInfo] = useState(() => {
    return initialState;
  });

  const [error, setError] = useState(initialStateError);

  const focusName = useRef();

  const {
    name,
    address,
    birthday,
    email,
    phone,
    username,
    password,
    rePassword,
    note,
  } = info;

  //2-way binding
  const handleInfo = (e) => {
    const { value, name } = e.target;
    if (name === "courses") {
      setInfo({ ...info, courses: [...info.courses, value] });
    } else {
      setInfo({ ...info, [name]: value });
    }
  };

  //Remove space and capitilize first character each word
  const handleBlurName = (e) => {
    let replaceSpace = e.target.value;

    replaceSpace = replaceSpace.replace(/\s+/g, " ").trim();

    const capitals = replaceSpace
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1));

    setInfo({ ...info, name: capitals.join(" ") });
  };

  //Validate email
  const validateEmail = (email) => {
    const re = /^\w+@[a-zA-Z_]+\.[a-zA-Z]+$/;
    return re.test(String(email).toLowerCase());
  };
  const handleBlurEmail = () => {
    if (!validateEmail(email)) {
      setError({ ...error, emailError: "Email nhập chưa đúng định dạng." });
    } else {
      setError({ ...error, emailError: "" });
    }
  };

  //Check repassword equal password or not
  const handleBlurPassword = () => {
    if (password !== rePassword) {
      setError({ ...error, rePasswordError: "Mật khẩu gõ lại không đúng." });
    } else {
      setError({ ...error, rePasswordError: "" });
    }
  };

  //Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!name) {
      errors.nameError = "Tên chưa được nhập.";
    }
    if (!birthday) {
      errors.birthdayError = "Ngày sinh chưa được nhập.";
    }
    if (!email) {
      errors.emailError = "Email chưa được nhập.";
    } else if (!validateEmail(email)) {
      errors.emailError = "Email nhập chưa đúng định dạng.";
    }
    if (!username) {
      errors.usernameError = "Tên sử dụng chưa được nhập.";
    }
    if (!password) {
      errors.passwordError = "Mật khẩu chưa được nhập.";
    }
    if (!rePassword) {
      errors.rePasswordError = "Mật khẩu gõ lại chưa được nhập.";
    } else if (rePassword !== password) {
      errors.rePasswordError = "Mật khẩu gõ lại không đúng.";
    }
    setError(errors);
  };

  //Focus when first access web
  useEffect(() => {
    focusName.current.focus();
  }, []);

  //Auto add splash in birthday field
  useEffect(() => {
    let formatBirthday = birthday;
    if (
      (!isNaN(parseInt(formatBirthday.substring(0, 3))) &&
        formatBirthday.length === 2) ||
      (!isNaN(parseInt(formatBirthday.substring(3, 5))) &&
        formatBirthday.length === 5)
    ) {
      formatBirthday += "/";
      setInfo((info) => ({ ...info, birthday: formatBirthday }));
    }
  }, [birthday]);

  return (
    <div className="container-form">
      <form onSubmit={handleSubmit}>
        <h1>Form nhập</h1>
        <div className="form-group">
          <label htmlFor="name" className="label">
            Họ tên:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            ref={focusName}
            className="required-input"
            value={name}
            onChange={handleInfo}
            onBlur={handleBlurName}
          />
          <small>{error.nameError && error.nameError}</small>
        </div>

        <div className="form-group">
          <label htmlFor="address" className="label">
            Địa chỉ:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={handleInfo}
          />
        </div>

        <div className="form-group">
          <span className="label">Giới tính: </span>
          <div className="radio-checkbox">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={handleInfo}
            />
            <label htmlFor="male">Nam</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleInfo}
            />
            <label htmlFor="female">Nữ</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="birthday" className="label">
            Ngày sinh:
          </label>
          <input
            type="text"
            id="birthday"
            name="birthday"
            className="required-input"
            placeholder="nn/tt/nnnn"
            value={birthday}
            onChange={handleInfo}
          />
          <small>{error.birthdayError && error.birthdayError}</small>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            onBlur={handleBlurEmail}
            className="required-input"
            value={email}
            onChange={handleInfo}
          />
          <small>{error.emailError && error.emailError}</small>
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="label">
            Điện thoại:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={handleInfo}
          />
        </div>

        <div className="form-group">
          <span className="label">Khoá đăng ký: </span>
          <div className="radio-checkbox">
            <input
              type="checkbox"
              id="english"
              name="courses"
              value="english"
              onChange={handleInfo}
            />
            <label htmlFor="english">Tiếng Anh</label>
            <input
              type="checkbox"
              id="admin"
              name="courses"
              value="admin"
              onChange={handleInfo}
            />
            <label htmlFor="admin">Quản trị</label>
            <input
              type="checkbox"
              id="it"
              name="courses"
              value="it"
              onChange={handleInfo}
            />
            <label htmlFor="it">CNTT</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="username" className="label">
            Tên sử dụng:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="required-input"
            value={username}
            onChange={handleInfo}
          />
          <small>{error.usernameError && error.usernameError}</small>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="label">
            Mật khẩu:
          </label>
          <input
            type="password"
            id="password"
            className="required-input"
            name="password"
            value={password}
            onChange={handleInfo}
          />
          <small>{error.passwordError && error.passwordError}</small>
        </div>

        <div className="form-group">
          <label htmlFor="rePassword" className="label">
            Gõ lại mật khẩu:
          </label>
          <input
            type="password"
            id="re-password"
            name="rePassword"
            value={rePassword}
            className="required-input"
            onBlur={handleBlurPassword}
            onChange={handleInfo}
          />
          <small>{error.rePasswordError && error.rePasswordError}</small>
        </div>

        <div className="form-group">
          <label htmlFor="note" className="label">
            Ghi chú:
          </label>
          <textarea id="note" value={note} name="note" onChange={handleInfo} />
        </div>

        <div className="form-group">
          <label htmlFor="avatar" className="label">
            Ảnh chân dung:
          </label>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            id="avatar"
            name="avatar"
            onChange={handleInfo}
          />
        </div>

        <div className="form-group buttons">
          <button type="submit">Chấp nhận</button>
          <button>Bỏ qua</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
