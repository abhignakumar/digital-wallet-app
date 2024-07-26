"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { Select } from "@repo/ui/select";
import { Button } from "@repo/ui/button";

export const AddMoneyCard = () => {
  const [banks, setBanks] = useState<[{ name: string; paymentUrl: string }]>();
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3001/api/banks");
      if (response.data.message !== "Error") {
        setBanks(response.data.banks);
        setRedirectUrl(response.data.banks[0].paymentUrl);
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
          onChange={() => {}}
        />
        <div className="py-2 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectUrl(
              banks?.find((bank) => bank.name === value)?.paymentUrl || ""
            );
          }}
          options={banks?.map((bank) => ({ key: bank.name, value: bank.name }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => {
              window.location.href = redirectUrl;
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
