"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { Select } from "@repo/ui/select";
import { Button } from "@repo/ui/button";
import { createOnRampTransaction } from "../lib/actions/createOnRampTransaction";

export const AddMoneyCard = () => {
  const [banks, setBanks] =
    useState<[{ id: number; name: string; paymentUrl: string }]>();
  const [redirectUrl, setRedirectUrl] = useState("");
  const [bankProviderId, setBankProviderId] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/banks");
      if (response.data.message !== "Error") {
        setBanks(response.data.banks);
        setRedirectUrl(response.data.banks[0].paymentUrl);
        setBankProviderId(response.data.banks[0].id);
      }
    };
    fetchData();
  }, []);

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label="Amount"
          placeholder="Enter Amount"
          onChange={(value) => {
            setAmount(Number(value));
          }}
        />
        <div className="py-2 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectUrl(
              banks?.find((bank) => bank.id === Number(value))?.paymentUrl || ""
            );
            setBankProviderId(Number(value));
          }}
          options={banks?.map((bank) => ({ key: bank.id, value: bank.name }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createOnRampTransaction(bankProviderId, amount);
              window.open(redirectUrl, "_blank");
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
