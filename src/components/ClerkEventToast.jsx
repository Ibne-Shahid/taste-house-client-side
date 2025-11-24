"use client";

import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";

export default function ClerkEventsToast() {
  const { userId } = useAuth();

  const prevUserId = useRef(null);

  useEffect(() => {
    if (userId && prevUserId.current === null) {
      toast.success("Logged in successfully!");
    }

    prevUserId.current = userId;
  }, [userId]);

  return null;
}
