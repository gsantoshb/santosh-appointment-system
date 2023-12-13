import React, { useState, useEffect } from "react";
import EmailPrompt from "./EmailPrompt";
import VerifyOtp from "./VerifyOtp";
import AppointmentCalendar from "./AppointmentCalendar";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const AppointmentBookingPage = () => {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClientComponentClient()

    const sendOtp = async (userEmail) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOtp({ email: userEmail });
      if (error) {
        console.error(error);
        alert("Error sending OTP");
        return;
      }
      setIsOtpSent(true);
      setOtp(data.otp);
      setEmail(userEmail);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (userOtp) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ email: email,token: userOtp, type: 'magiclink'});
      if (error) {
        console.error(error);
        setVerificationError("Invalid OTP");
        return;
      }
      // User successfully verified
      setIsOtpSent(true);
      setVerificationError("");
      setIsOtpVerified(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isOtpSent) {
    return (
      <EmailPrompt onSubmit={sendOtp} email={email} setEmail={setEmail} />
    );
  }

  return (
    <div>
      {verificationError && <p className="text-red-500">{verificationError}</p>}
      {!isOtpVerified && <VerifyOtp otp={otp} onVerify={verifyOtp} />}
      {isOtpVerified && <AppointmentCalendar />}
    </div>
  );
};

export default AppointmentBookingPage;
