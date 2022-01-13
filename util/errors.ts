const errors = {
  noName: { error: "Name must be provided" },
  emailInvalid: { error: "Email is invalid" },
  emailTaken: { error: "Email is already in use" },
  password: { error: "Password must be at least 8 characters" },
  passConf: { error: "Passwords do not match" },
  unAuth: { error: "You are unauthorised to make this request" },
  badLogin: { error: "Email or password is incorrect" },
  noUser: { error: "User doesn't exist" },
  noBody: { error: "No request body sent" },
  serverErr: { error: "Server-side error" },
};

export default errors;
