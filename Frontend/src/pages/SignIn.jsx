import React from "react";


const SignIn = () => {
    return (
        <main className="form-signin w-100 m-auto">
            <form>
                <img
                    className="mb-4"
                    src="/docs/5.3/assets/brand/bootstrap-logo.svg"
                    alt=""
                    width={72}
                    height={57}
                />
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        fdprocessedid="lhays"
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        fdprocessedid="xdj7rl"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-check text-start my-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue="remember-me"
                        id="flexCheckDefault"
                    />
                    <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                    >
                        Remember me
                    </label>
                </div>
                <button
                    className="btn btn-primary w-100 py-2"
                    type="submit"
                    fdprocessedid="6cow98"
                >
                    Sign in
                </button>
                <p className="mt-5 mb-3 text-body-secondary">© 2017–2026</p>
            </form>
        </main>
    );
};

export default SignIn;
