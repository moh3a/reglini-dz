import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { DangerDialog, SuccessDialog } from "../elements/Dialog";
import Loading from "../Loading";

const AccountVerification = ({
  token,
}: {
  token: string | string[] | undefined;
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const verify = useCallback(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      try {
        const { data } = await axios.post(
          `/api/auth/verifycredentials/${token}`,
          {},
          config
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
      {loading && <Loading text="Your account is being verified.." />}
      {success && <SuccessDialog>{success}</SuccessDialog>}
      {error && <DangerDialog>{error}</DangerDialog>}
    </>
  );
};

export default AccountVerification;
