import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ActivateAccount() {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      fetch("/api/auth/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => setMessage(data.message))
        .catch(() => setMessage("Có lỗi xảy ra, vui lòng thử lại."));
    }
  }, [token]);

  return (
    <div className="text-center mt-10">
      <h2 className="text-xl font-semibold">{message}</h2>
      <button className="mt-5 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => router.push("/dang-nhap")}>
        Quay lại đăng nhập
      </button>
    </div>
  );
}
