import User from 'App/Models/User'

declare module '@ioc:Adonis/Addons/Auth' {
  interface ProvidersList {
    user: {
      implementation: LucidProviderContract<typeof User>
      config: LucidProviderConfig<typeof User>
    }
  }

  interface GuardsList {
    user_guard: {
      implementation: OATGuardContract<'user', 'user_guard'>
      config: OATGuardConfig<'user'>
    }
  }
}
