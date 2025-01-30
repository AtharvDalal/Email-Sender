"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [emails, setEmails] = useState("");
  const [status, setStatus] = useState("");

  const sendEmails = async () => {
    setStatus("Sending emails...");

    const emailList = emails.split(",").map((email) => email.trim());

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emails: emailList }),
    });

    if (response.ok) {
      setStatus("Emails sent successfully!");
    } else {
      setStatus("Failed to send emails. Try again.");
    }
  };

  return (
    <div
      style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}
    >
      <h1>Cold Email Sender</h1>
      <textarea
        rows={5}
        cols={40}
        placeholder="Enter HR emails,"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
      />

      <br />
      <Button
        onClick={sendEmails}
        style={{ color: "white", marginTop: "10px", padding: "10px" }}
      >
        Send Emails
      </Button>
      <p>{status}</p>
    </div>
  );
}
