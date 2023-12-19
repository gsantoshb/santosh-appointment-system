import React, { useState, useEffect } from "react";
import EmailPrompt from "./EmailPrompt";
import VerifyOtp from "./VerifyOtp";
import AppointmentCalendar from "./AppointmentCalendar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const AppointmentBookingPage = () => {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClientComponentClient();

  const sendOtp = async (userEmail) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: userEmail,
      });
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
      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: userOtp,
        type: "magiclink",
      });
      if (error) {
        console.error(error);
        setVerificationError("Invalid OTP");
        return;
      }
      // User successfully verified
      setIsOtpSent(true);
      setVerificationError("");
      setIsOtpVerified(true);

       // OTP verification successful, get user information from auth.users
    const { data: authUser, error: authError } = await supabase.auth.getUser();

    if (authError) {
      throw new Error(
        `Error getting auth user information: ${authError.message}`
      );
    }

    if (!authUser) {
      throw new Error(`User with email ${email} not found in auth.users`);
    }

    const userId = authUser.user.id;

    // OTP verification successful, check if the user is already in public.users
    const { data: existingUser, error: selectError } = await supabase
      .from("users")
      .select("id, email")
      .eq("id", userId)
      .single();

    // If user doesn't exist in public.users, insert the user
    if (!existingUser) {
      const { data: insertedUser, error: insertError } = await supabase
        .from("users")
        .upsert([{ id: userId, email }], { onConflict: ["id"] });

      if (insertError) {
        throw new Error(`Error inserting user: ${insertError.message}`);
      }

      console.log("User inserted into public.users:", insertedUser);
    } else {
      console.log("User already exists in public.users:", existingUser);
    }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isOtpSent) {
    return <EmailPrompt onSubmit={sendOtp} email={email} setEmail={setEmail} />;
  }

  return (
    <div>
      {verificationError && <p className="text-red-500">{verificationError}</p>}
      {!isOtpVerified && <VerifyOtp otp={otp} onVerify={verifyOtp} />}
      {isOtpVerified && <AppointmentCalendar />}
      {/* <AppointmentCalendar /> */}
    </div>
  );
};

export default AppointmentBookingPage;
