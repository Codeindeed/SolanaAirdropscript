import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  getMint,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import base58 from "bs58";



const PayandSendToken = async (TOKENRECIEVER: string, TOKENSENDER: Keypair) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const tokenReciever = new PublicKey(TOKENRECIEVER);
  const tokenSender = TOKENSENDER;

  const tokenAddress = new PublicKey(
    "2ZjvBvHJE4sxmdmBydu58eAFU9FmPNm5LMbJVv1qkKN8"
  );
  const bobTokenAddress = await getAssociatedTokenAddress(
    tokenAddress,
    tokenSender.publicKey
  );

  // Alice may not have a token account, so Bob creates one if not
  const aliceTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    tokenSender, // Bob pays the fee to create it
    tokenAddress, // which token the account is for
    tokenReciever // who the token account is for
  );

  // Get the details about the token mint
  const tokenMint = await getMint(connection, tokenAddress);

  // Get a recent blockhash to include in the transaction
  const { blockhash } = await connection.getLatestBlockhash("finalized");

  const transaction = new Transaction({
    recentBlockhash: blockhash,
    // Alice pays the transaction fee
    feePayer: tokenReciever,
  });

  // Transfer 0.01 SOL from Alice -> Bob
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: tokenReciever,
      toPubkey: tokenSender.publicKey,
      lamports: 0.1 * LAMPORTS_PER_SOL,
    })
  );

  // Transfer 1 token from Bob -> Alice
  transaction.add(
    createTransferCheckedInstruction(
      bobTokenAddress, // source
      tokenAddress, // mint
      aliceTokenAccount.address, // destination
      tokenSender.publicKey, // owner of source account
      20 * 10 ** tokenMint.decimals, // amount to transfer
      tokenMint.decimals // decimals of token
    )
  );

  // Partial sign as Bob
  transaction.partialSign(tokenSender);

  // Serialize the transaction and convert to base64 to return it
  const serializedTransaction = transaction.serialize({
    // We will need Alice to deserialize and sign the transaction
    requireAllSignatures: false,
  });
  const transactionBase64 = serializedTransaction.toString("base64");
  console.log(transactionBase64);

  return transactionBase64;
};
