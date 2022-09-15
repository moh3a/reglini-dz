import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "../layout/Loading";
import AlertMessage from "../elements/AlertMessage";

const AccountVerification = ({
  token,
}: {
  token: string | string[] | undefined;
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [message, setMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (router.locale === "en") {
      setMessage("Your account is being verified...");
    } else if (router.locale === "fr") {
      setMessage("Votre compte est en cours de vérification...");
    } else if (router.locale === "ar") {
      setMessage("يتم التحقق من حسابك");
    }
  }, [router.locale]);

  const verify = useCallback(async () => {
    if (token) {
      try {
        const { data } = await axios.post(
          `/api/auth/verifycredentials/${token}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(false);
        if (data.success) {
          setSuccess(data.message);
          setTimeout(() => {
            setSuccess("");
            router.push("/account");
          }, 3000);
        } else if (!data.success) {
          setError(data.message);
          setTimeout(() => {
            setError("");
            router.push("/account");
          }, 5000);
        }
      } catch (error: any) {
        setLoading(false);
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  }, [token, router]);

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <>
      {loading && <Loading text={message} />}
      {success && <AlertMessage type="success" message={success} />}
      {error && <AlertMessage type="error" message={error} />}
    </>
  );
};

export default AccountVerification;
