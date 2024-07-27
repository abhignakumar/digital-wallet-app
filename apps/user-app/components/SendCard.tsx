"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { p2pTransfer } from "../lib/actions/p2pTransfer";
import { useRouter } from "next/navigation";

export const SendCard = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState(0);
  return (
    <div>
      <Card title="Send">
        <div className="min-w-72 pt-2">
          <TextInput
            onChange={(value) => {
              setPhoneNumber(value);
            }}
            label="Phone Number"
            placeholder="Enter a phone number"
          ></TextInput>
          <TextInput
            onChange={(value) => {
              setAmount(Number(value));
            }}
            label="Amount"
            placeholder="Enter amount"
          ></TextInput>
          <div className="flex justify-center pt-4">
            <Button
              onClick={async () => {
                await p2pTransfer(phoneNumber, amount);
                router.push("/transfer");
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
