// import {
//   Transaction,
//   SystemProgram,
//   LAMPORTS_PER_SOL,
//   PublicKey,
//   Connection,
// } from "@solana/web3.js";

// import { useWallet } from "@solana/wallet-adapter-react";



// import the above code into the frontend.ts file

// const { sendTransaction, publicKey, signTransaction } = useWallet();
// const connection = new Connection("https://api.devnet.solana.com");
// const recipientPubKey = "9H1AF4T4K9tHCuSnbgyGHUL6KZfbDLBAgFDAhaSGPxB3";
// const transactions = new Transaction().add(
//   SystemProgram.transfer({
//     fromPubkey: publicKey,
//     toPubkey: new PublicKey(recipientPubKey),
//     lamports: LAMPORTS_PER_SOL * 0.1,
//   })
// );
// const recoveredTransaction = Transaction.from(
//   Buffer.from(
//     "AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWLP9+AZivuxynPkBOsIs7JSSGsH97maqzrQUWUKUMO7OWqzeKIgUaPioBxlKBk618U3HOUCYUD0TxJ93MhsgIAgADB+nyiKp/CryPjFJaHUja5GCJydtebOyVTjNFV6D4x+gS2byfY20Zr0V2QZF0+6188EqtXbWNomxwwTXB6BoHOHASqNGqXAh93NjRDbY1LJgtA5E1dQG/h6eOMWg+Xs3LvldRaGHYaR7buup1TzRYjS+llhidmB+ufhLGs/TeViGCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXPsycx5mIB7pOy47XPTPSOaKSLZfRcz1WRYQe2emnSQbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpc+1jTFmd7rVBQvPlEVmeOIC92Qg8h5uTYvmV8vlIvUMCBAIAAQwCAAAAAOH1BQAAAAAGBAIFAwEKDAAtMQEAAAAABg==",
//     "base64"
//   )
// );
// const clickHandler = async () => {
//   const signedTransaction = await signTransaction!(recoveredTransaction);
//   const tx = await connection.sendRawTransaction(signedTransaction.serialize());
//   console.log(tx);
// };
