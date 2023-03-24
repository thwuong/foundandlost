import React, { useEffect, useState } from "react";

function useLoading() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const intervalLoading = setInterval(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearInterval(intervalLoading);
    };
  }, []);
  return loading;
}

export { useLoading };
