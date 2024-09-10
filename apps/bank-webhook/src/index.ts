import prisma from "@repo/db";
import express from "express";
import z from "zod";

const app = express();
app.use(express.json());

const paymentDetailsSchema = z.object({
  token: z.string(),
  userId: z.number().positive(),
  amount: z.number().positive(),
});

app.post("/paymentAppWebHook", async (req, res) => {
  const bankSecret = req.body.bankSecret;
  if (!z.string().safeParse(bankSecret).success)
    return res.json({
      message: "Bank Secret is invalid.",
    });
  const bankDetails = await prisma.bankProvider.findUnique({
    where: {
      secret: bankSecret,
    },
  });
  if (!bankDetails)
    return res.json({
      message: "Bank Secret is incorrect.",
    });
  const paymentDetails: {
    token: string;
    userId: number;
    amount: number;
  } = {
    token: req.body.token,
    userId: req.body.userIdentifier,
    amount: req.body.amount,
  };
  const paymentDetailsValidation =
    paymentDetailsSchema.safeParse(paymentDetails);
  if (!paymentDetailsValidation.success)
    return res.json({
      message: "Payment Details are invalid.",
    });

  try {
    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: paymentDetails.userId,
        },
        data: {
          amount: {
            increment: paymentDetails.amount,
          },
        },
      }),
      prisma.onRampTransaction.update({
        where: {
          token: paymentDetails.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    return res.json({
      message: "Captured",
    });
  } catch (e) {
    console.log(e);
    await prisma.onRampTransaction.update({
      where: {
        token: paymentDetails.token,
      },
      data: {
        status: "Failed",
      },
    });
    res.status(411).json({
      message: "Error while processing the request.",
    });
  }
});

app.listen(3005, () => {
  console.log("Listening on port 3005 ...");
});

// {
//   bankSecret: string,
//   token: string,
//   userIdentifier: number,
//   amount: number
// }

// "build": "esbuild ./src/index.ts --bundle --platform=node --outfile=dist/index.js",
// "start": "nodemon src/index.ts",
