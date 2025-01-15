"use client";
import { toast } from "react-toastify";
import React, { useEffect, useState } from 'react';

export default function RootPage() {
  const [hasShownToast, setHasShownToast] = useState(false);
  useEffect(() => {
      if (!hasShownToast) {
        setHasShownToast(true);
        toast.error('Точка не найдена!');
      }
    }, [hasShownToast]);
  return <div></div>;
}