use anchor_lang::prelude::*;

#[program]
mod lili_anchor_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, greeting: String) -> Result<()> {
        require!(greeting.len() <= 64, LiliError::MessageTooLong);
        let account = &mut ctx.accounts.greeting_account;
        account.authority = ctx.accounts.authority.key();
        account.message = greeting;
        Ok(())
    }

    pub fn update(ctx: Context<Update>, greeting: String) -> Result<()> {
        require!(greeting.len() <= 64, LiliError::MessageTooLong);
        let account = &mut ctx.accounts.greeting_account;
        require_keys_eq!(account.authority, ctx.accounts.authority.key(), LiliError::Unauthorized);
        account.message = greeting;
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct GreetingAccount {
    pub authority: Pubkey,
    #[max_len(64)]
    pub message: String,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + GreetingAccount::INIT_SPACE)]
    pub greeting_account: Account<'info, GreetingAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub greeting_account: Account<'info, GreetingAccount>,
    pub authority: Signer<'info>,
}

#[error_code]
pub enum LiliError {
    #[msg("Greeting must be 64 characters or fewer")]
    MessageTooLong,
    #[msg("Only the authority can update the greeting")]
    Unauthorized,
}
