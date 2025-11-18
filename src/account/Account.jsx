import { Link } from "react-router";
import { useState, useEffect } from "react";

import { getAccount } from "../api/users";
import { useAuth } from "../auth/AuthContext";
import Reservations from "./Reservations";

import "./account.css";

export default function Account() {
  const { token } = useAuth();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const syncAccount = async () => {
      const data = await getAccount(token);
      setAccount(data);
    };
    syncAccount();
  }, [token]);

  if (!token)
    return (
      <p>
        Please <Link to="/login">log in</Link> to see youer account.
      </p>
    );

  if (!account) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <header>
        <h1>Welcome, {account.firstname}!</h1>
        <p>Your email on file with us is {account.email}.</p>
      </header>
      <section>
        <h2>Your reservations</h2>
        <Reservations />
      </section>
    </>
  );
}
