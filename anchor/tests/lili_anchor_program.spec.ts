import * as anchor from "@coral-xyz/anchor";
import { expect } from "chai";
import { LiliAnchorProgram } from "../../packages/sdk/src/generated";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.LiliAnchorProgram as anchor.Program<LiliAnchorProgram>;

describe("anchor program", () => {
  it("initializes account", async () => {
    const greetingAccount = anchor.web3.Keypair.generate();
    await program.methods
      .initialize("Hello Anchor")
      .accounts({
        greetingAccount: greetingAccount.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([greetingAccount])
      .rpc();

    const account = await program.account.greetingAccount.fetch(greetingAccount.publicKey);
    expect(account.message).to.equal("Hello Anchor");
  });
});
