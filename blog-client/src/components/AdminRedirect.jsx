import { useEffect } from "react";

export default function AdminRedirect() {
  useEffect(() => {
    window.location.href = "https://blog-admin-petra-78.netlify.app";
  }, []);

  return null;
}
