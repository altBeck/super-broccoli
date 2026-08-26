"use client";

import { useEffect, useState } from "react";

function formatLocalTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

export function LiveTime() {
  const [time, setTime] = useState("05:42 PM");

  useEffect(() => {
    const update = () => setTime(formatLocalTime());
    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return <time suppressHydrationWarning>{time}</time>;
}
