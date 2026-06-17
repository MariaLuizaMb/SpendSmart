
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Categoria
 * 
 */
export type Categoria = $Result.DefaultSelection<Prisma.$CategoriaPayload>
/**
 * Model Lancamento
 * 
 */
export type Lancamento = $Result.DefaultSelection<Prisma.$LancamentoPayload>
/**
 * Model Conta
 * 
 */
export type Conta = $Result.DefaultSelection<Prisma.$ContaPayload>
/**
 * Model Orcamento
 * 
 */
export type Orcamento = $Result.DefaultSelection<Prisma.$OrcamentoPayload>
/**
 * Model AnalyticJob
 * 
 */
export type AnalyticJob = $Result.DefaultSelection<Prisma.$AnalyticJobPayload>
/**
 * Model Insight
 * 
 */
export type Insight = $Result.DefaultSelection<Prisma.$InsightPayload>
/**
 * Model FinancialAlert
 * 
 */
export type FinancialAlert = $Result.DefaultSelection<Prisma.$FinancialAlertPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TipoCategoria: {
  DESPESA: 'DESPESA',
  RECEITA: 'RECEITA'
};

export type TipoCategoria = (typeof TipoCategoria)[keyof typeof TipoCategoria]


export const TipoLancamento: {
  DESPESA: 'DESPESA',
  RECEITA: 'RECEITA'
};

export type TipoLancamento = (typeof TipoLancamento)[keyof typeof TipoLancamento]


export const TipoRecorrencia: {
  NENHUMA: 'NENHUMA',
  DIARIA: 'DIARIA',
  SEMANAL: 'SEMANAL',
  MENSAL: 'MENSAL',
  ANUAL: 'ANUAL'
};

export type TipoRecorrencia = (typeof TipoRecorrencia)[keyof typeof TipoRecorrencia]


export const TipoContaBancaria: {
  CONTA_CORRENTE: 'CONTA_CORRENTE',
  POUPANCA: 'POUPANCA',
  CARTEIRA_DINHEIRO: 'CARTEIRA_DINHEIRO',
  CARTEIRA_DIGITAL: 'CARTEIRA_DIGITAL',
  OUTRA: 'OUTRA'
};

export type TipoContaBancaria = (typeof TipoContaBancaria)[keyof typeof TipoContaBancaria]


export const ModeloCartao: {
  NUBANK: 'NUBANK',
  MERCADO_PAGO: 'MERCADO_PAGO',
  CAIXA: 'CAIXA',
  PICPAY: 'PICPAY',
  DEFAULT: 'DEFAULT'
};

export type ModeloCartao = (typeof ModeloCartao)[keyof typeof ModeloCartao]

}

export type TipoCategoria = $Enums.TipoCategoria

export const TipoCategoria: typeof $Enums.TipoCategoria

export type TipoLancamento = $Enums.TipoLancamento

export const TipoLancamento: typeof $Enums.TipoLancamento

export type TipoRecorrencia = $Enums.TipoRecorrencia

export const TipoRecorrencia: typeof $Enums.TipoRecorrencia

export type TipoContaBancaria = $Enums.TipoContaBancaria

export const TipoContaBancaria: typeof $Enums.TipoContaBancaria

export type ModeloCartao = $Enums.ModeloCartao

export const ModeloCartao: typeof $Enums.ModeloCartao

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categoria`: Exposes CRUD operations for the **Categoria** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categorias
    * const categorias = await prisma.categoria.findMany()
    * ```
    */
  get categoria(): Prisma.CategoriaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lancamento`: Exposes CRUD operations for the **Lancamento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lancamentos
    * const lancamentos = await prisma.lancamento.findMany()
    * ```
    */
  get lancamento(): Prisma.LancamentoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conta`: Exposes CRUD operations for the **Conta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contas
    * const contas = await prisma.conta.findMany()
    * ```
    */
  get conta(): Prisma.ContaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orcamento`: Exposes CRUD operations for the **Orcamento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orcamentos
    * const orcamentos = await prisma.orcamento.findMany()
    * ```
    */
  get orcamento(): Prisma.OrcamentoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.analyticJob`: Exposes CRUD operations for the **AnalyticJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnalyticJobs
    * const analyticJobs = await prisma.analyticJob.findMany()
    * ```
    */
  get analyticJob(): Prisma.AnalyticJobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.insight`: Exposes CRUD operations for the **Insight** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Insights
    * const insights = await prisma.insight.findMany()
    * ```
    */
  get insight(): Prisma.InsightDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.financialAlert`: Exposes CRUD operations for the **FinancialAlert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FinancialAlerts
    * const financialAlerts = await prisma.financialAlert.findMany()
    * ```
    */
  get financialAlert(): Prisma.FinancialAlertDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Usuario: 'Usuario',
    Categoria: 'Categoria',
    Lancamento: 'Lancamento',
    Conta: 'Conta',
    Orcamento: 'Orcamento',
    AnalyticJob: 'AnalyticJob',
    Insight: 'Insight',
    FinancialAlert: 'FinancialAlert',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuario" | "categoria" | "lancamento" | "conta" | "orcamento" | "analyticJob" | "insight" | "financialAlert" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Categoria: {
        payload: Prisma.$CategoriaPayload<ExtArgs>
        fields: Prisma.CategoriaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoriaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoriaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findFirst: {
            args: Prisma.CategoriaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoriaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findMany: {
            args: Prisma.CategoriaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          create: {
            args: Prisma.CategoriaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          createMany: {
            args: Prisma.CategoriaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoriaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          delete: {
            args: Prisma.CategoriaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          update: {
            args: Prisma.CategoriaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          deleteMany: {
            args: Prisma.CategoriaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoriaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoriaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          upsert: {
            args: Prisma.CategoriaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          aggregate: {
            args: Prisma.CategoriaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoria>
          }
          groupBy: {
            args: Prisma.CategoriaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriaGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoriaCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriaCountAggregateOutputType> | number
          }
        }
      }
      Lancamento: {
        payload: Prisma.$LancamentoPayload<ExtArgs>
        fields: Prisma.LancamentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LancamentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LancamentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>
          }
          findFirst: {
            args: Prisma.LancamentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LancamentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>
          }
          findMany: {
            args: Prisma.LancamentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>[]
          }
          create: {
            args: Prisma.LancamentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>
          }
          createMany: {
            args: Prisma.LancamentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LancamentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>[]
          }
          delete: {
            args: Prisma.LancamentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>
          }
          update: {
            args: Prisma.LancamentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>
          }
          deleteMany: {
            args: Prisma.LancamentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LancamentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LancamentoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>[]
          }
          upsert: {
            args: Prisma.LancamentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>
          }
          aggregate: {
            args: Prisma.LancamentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLancamento>
          }
          groupBy: {
            args: Prisma.LancamentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<LancamentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.LancamentoCountArgs<ExtArgs>
            result: $Utils.Optional<LancamentoCountAggregateOutputType> | number
          }
        }
      }
      Conta: {
        payload: Prisma.$ContaPayload<ExtArgs>
        fields: Prisma.ContaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContaPayload>
          }
          findFirst: {
            args: Prisma.ContaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContaPayload>
          }
          findMany: {
            args: Prisma.ContaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContaPayload>[]
          }
          create: {
            args: Prisma.ContaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContaPayload>
          }
          createMany: {
            args: Prisma.ContaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContaPayload>[]
          }
          delete: {
            args: Prisma.ContaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContaPayload>
          }
          update: {
            args: Prisma.ContaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContaPayload>
          }
          deleteMany: {
            args: Prisma.ContaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContaPayload>[]
          }
          upsert: {
            args: Prisma.ContaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContaPayload>
          }
          aggregate: {
            args: Prisma.ContaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConta>
          }
          groupBy: {
            args: Prisma.ContaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContaCountArgs<ExtArgs>
            result: $Utils.Optional<ContaCountAggregateOutputType> | number
          }
        }
      }
      Orcamento: {
        payload: Prisma.$OrcamentoPayload<ExtArgs>
        fields: Prisma.OrcamentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrcamentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrcamentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrcamentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrcamentoPayload>
          }
          findFirst: {
            args: Prisma.OrcamentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrcamentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrcamentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrcamentoPayload>
          }
          findMany: {
            args: Prisma.OrcamentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrcamentoPayload>[]
          }
          create: {
            args: Prisma.OrcamentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrcamentoPayload>
          }
          createMany: {
            args: Prisma.OrcamentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrcamentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrcamentoPayload>[]
          }
          delete: {
            args: Prisma.OrcamentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrcamentoPayload>
          }
          update: {
            args: Prisma.OrcamentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrcamentoPayload>
          }
          deleteMany: {
            args: Prisma.OrcamentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrcamentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrcamentoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrcamentoPayload>[]
          }
          upsert: {
            args: Prisma.OrcamentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrcamentoPayload>
          }
          aggregate: {
            args: Prisma.OrcamentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrcamento>
          }
          groupBy: {
            args: Prisma.OrcamentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrcamentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrcamentoCountArgs<ExtArgs>
            result: $Utils.Optional<OrcamentoCountAggregateOutputType> | number
          }
        }
      }
      AnalyticJob: {
        payload: Prisma.$AnalyticJobPayload<ExtArgs>
        fields: Prisma.AnalyticJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalyticJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalyticJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticJobPayload>
          }
          findFirst: {
            args: Prisma.AnalyticJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalyticJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticJobPayload>
          }
          findMany: {
            args: Prisma.AnalyticJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticJobPayload>[]
          }
          create: {
            args: Prisma.AnalyticJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticJobPayload>
          }
          createMany: {
            args: Prisma.AnalyticJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnalyticJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticJobPayload>[]
          }
          delete: {
            args: Prisma.AnalyticJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticJobPayload>
          }
          update: {
            args: Prisma.AnalyticJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticJobPayload>
          }
          deleteMany: {
            args: Prisma.AnalyticJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalyticJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnalyticJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticJobPayload>[]
          }
          upsert: {
            args: Prisma.AnalyticJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticJobPayload>
          }
          aggregate: {
            args: Prisma.AnalyticJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalyticJob>
          }
          groupBy: {
            args: Prisma.AnalyticJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalyticJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalyticJobCountArgs<ExtArgs>
            result: $Utils.Optional<AnalyticJobCountAggregateOutputType> | number
          }
        }
      }
      Insight: {
        payload: Prisma.$InsightPayload<ExtArgs>
        fields: Prisma.InsightFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InsightFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InsightFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>
          }
          findFirst: {
            args: Prisma.InsightFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InsightFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>
          }
          findMany: {
            args: Prisma.InsightFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>[]
          }
          create: {
            args: Prisma.InsightCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>
          }
          createMany: {
            args: Prisma.InsightCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InsightCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>[]
          }
          delete: {
            args: Prisma.InsightDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>
          }
          update: {
            args: Prisma.InsightUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>
          }
          deleteMany: {
            args: Prisma.InsightDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InsightUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InsightUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>[]
          }
          upsert: {
            args: Prisma.InsightUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsightPayload>
          }
          aggregate: {
            args: Prisma.InsightAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInsight>
          }
          groupBy: {
            args: Prisma.InsightGroupByArgs<ExtArgs>
            result: $Utils.Optional<InsightGroupByOutputType>[]
          }
          count: {
            args: Prisma.InsightCountArgs<ExtArgs>
            result: $Utils.Optional<InsightCountAggregateOutputType> | number
          }
        }
      }
      FinancialAlert: {
        payload: Prisma.$FinancialAlertPayload<ExtArgs>
        fields: Prisma.FinancialAlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FinancialAlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialAlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FinancialAlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialAlertPayload>
          }
          findFirst: {
            args: Prisma.FinancialAlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialAlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FinancialAlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialAlertPayload>
          }
          findMany: {
            args: Prisma.FinancialAlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialAlertPayload>[]
          }
          create: {
            args: Prisma.FinancialAlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialAlertPayload>
          }
          createMany: {
            args: Prisma.FinancialAlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FinancialAlertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialAlertPayload>[]
          }
          delete: {
            args: Prisma.FinancialAlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialAlertPayload>
          }
          update: {
            args: Prisma.FinancialAlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialAlertPayload>
          }
          deleteMany: {
            args: Prisma.FinancialAlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FinancialAlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FinancialAlertUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialAlertPayload>[]
          }
          upsert: {
            args: Prisma.FinancialAlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FinancialAlertPayload>
          }
          aggregate: {
            args: Prisma.FinancialAlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFinancialAlert>
          }
          groupBy: {
            args: Prisma.FinancialAlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<FinancialAlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.FinancialAlertCountArgs<ExtArgs>
            result: $Utils.Optional<FinancialAlertCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    usuario?: UsuarioOmit
    categoria?: CategoriaOmit
    lancamento?: LancamentoOmit
    conta?: ContaOmit
    orcamento?: OrcamentoOmit
    analyticJob?: AnalyticJobOmit
    insight?: InsightOmit
    financialAlert?: FinancialAlertOmit
    notification?: NotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    categorias: number
    lancamentos: number
    orcamentos: number
    contas: number
    analyticJobs: number
    insights: number
    alertas: number
    notificacoes: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categorias?: boolean | UsuarioCountOutputTypeCountCategoriasArgs
    lancamentos?: boolean | UsuarioCountOutputTypeCountLancamentosArgs
    orcamentos?: boolean | UsuarioCountOutputTypeCountOrcamentosArgs
    contas?: boolean | UsuarioCountOutputTypeCountContasArgs
    analyticJobs?: boolean | UsuarioCountOutputTypeCountAnalyticJobsArgs
    insights?: boolean | UsuarioCountOutputTypeCountInsightsArgs
    alertas?: boolean | UsuarioCountOutputTypeCountAlertasArgs
    notificacoes?: boolean | UsuarioCountOutputTypeCountNotificacoesArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountCategoriasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriaWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountLancamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LancamentoWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountOrcamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrcamentoWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountContasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContaWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountAnalyticJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticJobWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountInsightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InsightWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountAlertasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinancialAlertWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountNotificacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type CategoriaCountOutputType
   */

  export type CategoriaCountOutputType = {
    lancamentos: number
    orcamentos: number
  }

  export type CategoriaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamentos?: boolean | CategoriaCountOutputTypeCountLancamentosArgs
    orcamentos?: boolean | CategoriaCountOutputTypeCountOrcamentosArgs
  }

  // Custom InputTypes
  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriaCountOutputType
     */
    select?: CategoriaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeCountLancamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LancamentoWhereInput
  }

  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeCountOrcamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrcamentoWhereInput
  }


  /**
   * Count Type ContaCountOutputType
   */

  export type ContaCountOutputType = {
    lancamentos: number
  }

  export type ContaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamentos?: boolean | ContaCountOutputTypeCountLancamentosArgs
  }

  // Custom InputTypes
  /**
   * ContaCountOutputType without action
   */
  export type ContaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContaCountOutputType
     */
    select?: ContaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContaCountOutputType without action
   */
  export type ContaCountOutputTypeCountLancamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LancamentoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: string | null
    nome: string | null
    email: string | null
    senhaHash: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    email: string | null
    senhaHash: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    nome: number
    email: number
    senhaHash: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senhaHash?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senhaHash?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senhaHash?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: string
    nome: string
    email: string
    senhaHash: string
    criadoEm: Date
    atualizadoEm: Date
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senhaHash?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    categorias?: boolean | Usuario$categoriasArgs<ExtArgs>
    lancamentos?: boolean | Usuario$lancamentosArgs<ExtArgs>
    orcamentos?: boolean | Usuario$orcamentosArgs<ExtArgs>
    contas?: boolean | Usuario$contasArgs<ExtArgs>
    analyticJobs?: boolean | Usuario$analyticJobsArgs<ExtArgs>
    insights?: boolean | Usuario$insightsArgs<ExtArgs>
    alertas?: boolean | Usuario$alertasArgs<ExtArgs>
    notificacoes?: boolean | Usuario$notificacoesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senhaHash?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senhaHash?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    nome?: boolean
    email?: boolean
    senhaHash?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "email" | "senhaHash" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categorias?: boolean | Usuario$categoriasArgs<ExtArgs>
    lancamentos?: boolean | Usuario$lancamentosArgs<ExtArgs>
    orcamentos?: boolean | Usuario$orcamentosArgs<ExtArgs>
    contas?: boolean | Usuario$contasArgs<ExtArgs>
    analyticJobs?: boolean | Usuario$analyticJobsArgs<ExtArgs>
    insights?: boolean | Usuario$insightsArgs<ExtArgs>
    alertas?: boolean | Usuario$alertasArgs<ExtArgs>
    notificacoes?: boolean | Usuario$notificacoesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      categorias: Prisma.$CategoriaPayload<ExtArgs>[]
      lancamentos: Prisma.$LancamentoPayload<ExtArgs>[]
      orcamentos: Prisma.$OrcamentoPayload<ExtArgs>[]
      contas: Prisma.$ContaPayload<ExtArgs>[]
      analyticJobs: Prisma.$AnalyticJobPayload<ExtArgs>[]
      insights: Prisma.$InsightPayload<ExtArgs>[]
      alertas: Prisma.$FinancialAlertPayload<ExtArgs>[]
      notificacoes: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      email: string
      senhaHash: string
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categorias<T extends Usuario$categoriasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$categoriasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lancamentos<T extends Usuario$lancamentosArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$lancamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orcamentos<T extends Usuario$orcamentosArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$orcamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrcamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    contas<T extends Usuario$contasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$contasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    analyticJobs<T extends Usuario$analyticJobsArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$analyticJobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    insights<T extends Usuario$insightsArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$insightsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    alertas<T extends Usuario$alertasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$alertasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialAlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notificacoes<T extends Usuario$notificacoesArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$notificacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'String'>
    readonly nome: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly senhaHash: FieldRef<"Usuario", 'String'>
    readonly criadoEm: FieldRef<"Usuario", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.categorias
   */
  export type Usuario$categoriasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    where?: CategoriaWhereInput
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    cursor?: CategoriaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Usuario.lancamentos
   */
  export type Usuario$lancamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lancamento
     */
    omit?: LancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    where?: LancamentoWhereInput
    orderBy?: LancamentoOrderByWithRelationInput | LancamentoOrderByWithRelationInput[]
    cursor?: LancamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * Usuario.orcamentos
   */
  export type Usuario$orcamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orcamento
     */
    select?: OrcamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orcamento
     */
    omit?: OrcamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrcamentoInclude<ExtArgs> | null
    where?: OrcamentoWhereInput
    orderBy?: OrcamentoOrderByWithRelationInput | OrcamentoOrderByWithRelationInput[]
    cursor?: OrcamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrcamentoScalarFieldEnum | OrcamentoScalarFieldEnum[]
  }

  /**
   * Usuario.contas
   */
  export type Usuario$contasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conta
     */
    select?: ContaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conta
     */
    omit?: ContaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContaInclude<ExtArgs> | null
    where?: ContaWhereInput
    orderBy?: ContaOrderByWithRelationInput | ContaOrderByWithRelationInput[]
    cursor?: ContaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContaScalarFieldEnum | ContaScalarFieldEnum[]
  }

  /**
   * Usuario.analyticJobs
   */
  export type Usuario$analyticJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticJob
     */
    select?: AnalyticJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticJob
     */
    omit?: AnalyticJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticJobInclude<ExtArgs> | null
    where?: AnalyticJobWhereInput
    orderBy?: AnalyticJobOrderByWithRelationInput | AnalyticJobOrderByWithRelationInput[]
    cursor?: AnalyticJobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalyticJobScalarFieldEnum | AnalyticJobScalarFieldEnum[]
  }

  /**
   * Usuario.insights
   */
  export type Usuario$insightsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    where?: InsightWhereInput
    orderBy?: InsightOrderByWithRelationInput | InsightOrderByWithRelationInput[]
    cursor?: InsightWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InsightScalarFieldEnum | InsightScalarFieldEnum[]
  }

  /**
   * Usuario.alertas
   */
  export type Usuario$alertasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialAlert
     */
    select?: FinancialAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialAlert
     */
    omit?: FinancialAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialAlertInclude<ExtArgs> | null
    where?: FinancialAlertWhereInput
    orderBy?: FinancialAlertOrderByWithRelationInput | FinancialAlertOrderByWithRelationInput[]
    cursor?: FinancialAlertWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FinancialAlertScalarFieldEnum | FinancialAlertScalarFieldEnum[]
  }

  /**
   * Usuario.notificacoes
   */
  export type Usuario$notificacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Categoria
   */

  export type AggregateCategoria = {
    _count: CategoriaCountAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  export type CategoriaMinAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    nome: string | null
    tipo: $Enums.TipoCategoria | null
    ehPadrao: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type CategoriaMaxAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    nome: string | null
    tipo: $Enums.TipoCategoria | null
    ehPadrao: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type CategoriaCountAggregateOutputType = {
    id: number
    idUsuario: number
    nome: number
    tipo: number
    ehPadrao: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type CategoriaMinAggregateInputType = {
    id?: true
    idUsuario?: true
    nome?: true
    tipo?: true
    ehPadrao?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type CategoriaMaxAggregateInputType = {
    id?: true
    idUsuario?: true
    nome?: true
    tipo?: true
    ehPadrao?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type CategoriaCountAggregateInputType = {
    id?: true
    idUsuario?: true
    nome?: true
    tipo?: true
    ehPadrao?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type CategoriaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categoria to aggregate.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categorias
    **/
    _count?: true | CategoriaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriaMaxAggregateInputType
  }

  export type GetCategoriaAggregateType<T extends CategoriaAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoria]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoria[P]>
      : GetScalarType<T[P], AggregateCategoria[P]>
  }




  export type CategoriaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriaWhereInput
    orderBy?: CategoriaOrderByWithAggregationInput | CategoriaOrderByWithAggregationInput[]
    by: CategoriaScalarFieldEnum[] | CategoriaScalarFieldEnum
    having?: CategoriaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriaCountAggregateInputType | true
    _min?: CategoriaMinAggregateInputType
    _max?: CategoriaMaxAggregateInputType
  }

  export type CategoriaGroupByOutputType = {
    id: string
    idUsuario: string | null
    nome: string
    tipo: $Enums.TipoCategoria
    ehPadrao: boolean
    criadoEm: Date
    atualizadoEm: Date
    _count: CategoriaCountAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  type GetCategoriaGroupByPayload<T extends CategoriaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
        }
      >
    >


  export type CategoriaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    nome?: boolean
    tipo?: boolean
    ehPadrao?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    usuario?: boolean | Categoria$usuarioArgs<ExtArgs>
    lancamentos?: boolean | Categoria$lancamentosArgs<ExtArgs>
    orcamentos?: boolean | Categoria$orcamentosArgs<ExtArgs>
    _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    nome?: boolean
    tipo?: boolean
    ehPadrao?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    usuario?: boolean | Categoria$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    nome?: boolean
    tipo?: boolean
    ehPadrao?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    usuario?: boolean | Categoria$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectScalar = {
    id?: boolean
    idUsuario?: boolean
    nome?: boolean
    tipo?: boolean
    ehPadrao?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type CategoriaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idUsuario" | "nome" | "tipo" | "ehPadrao" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["categoria"]>
  export type CategoriaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | Categoria$usuarioArgs<ExtArgs>
    lancamentos?: boolean | Categoria$lancamentosArgs<ExtArgs>
    orcamentos?: boolean | Categoria$orcamentosArgs<ExtArgs>
    _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoriaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | Categoria$usuarioArgs<ExtArgs>
  }
  export type CategoriaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | Categoria$usuarioArgs<ExtArgs>
  }

  export type $CategoriaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Categoria"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs> | null
      lancamentos: Prisma.$LancamentoPayload<ExtArgs>[]
      orcamentos: Prisma.$OrcamentoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idUsuario: string | null
      nome: string
      tipo: $Enums.TipoCategoria
      ehPadrao: boolean
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["categoria"]>
    composites: {}
  }

  type CategoriaGetPayload<S extends boolean | null | undefined | CategoriaDefaultArgs> = $Result.GetResult<Prisma.$CategoriaPayload, S>

  type CategoriaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoriaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoriaCountAggregateInputType | true
    }

  export interface CategoriaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Categoria'], meta: { name: 'Categoria' } }
    /**
     * Find zero or one Categoria that matches the filter.
     * @param {CategoriaFindUniqueArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoriaFindUniqueArgs>(args: SelectSubset<T, CategoriaFindUniqueArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categoria that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoriaFindUniqueOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoriaFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoriaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoriaFindFirstArgs>(args?: SelectSubset<T, CategoriaFindFirstArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoriaFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoriaFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categorias
     * const categorias = await prisma.categoria.findMany()
     * 
     * // Get first 10 Categorias
     * const categorias = await prisma.categoria.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriaWithIdOnly = await prisma.categoria.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoriaFindManyArgs>(args?: SelectSubset<T, CategoriaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categoria.
     * @param {CategoriaCreateArgs} args - Arguments to create a Categoria.
     * @example
     * // Create one Categoria
     * const Categoria = await prisma.categoria.create({
     *   data: {
     *     // ... data to create a Categoria
     *   }
     * })
     * 
     */
    create<T extends CategoriaCreateArgs>(args: SelectSubset<T, CategoriaCreateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categorias.
     * @param {CategoriaCreateManyArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoriaCreateManyArgs>(args?: SelectSubset<T, CategoriaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categorias and returns the data saved in the database.
     * @param {CategoriaCreateManyAndReturnArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categorias and only return the `id`
     * const categoriaWithIdOnly = await prisma.categoria.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoriaCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoriaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categoria.
     * @param {CategoriaDeleteArgs} args - Arguments to delete one Categoria.
     * @example
     * // Delete one Categoria
     * const Categoria = await prisma.categoria.delete({
     *   where: {
     *     // ... filter to delete one Categoria
     *   }
     * })
     * 
     */
    delete<T extends CategoriaDeleteArgs>(args: SelectSubset<T, CategoriaDeleteArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categoria.
     * @param {CategoriaUpdateArgs} args - Arguments to update one Categoria.
     * @example
     * // Update one Categoria
     * const categoria = await prisma.categoria.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoriaUpdateArgs>(args: SelectSubset<T, CategoriaUpdateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categorias.
     * @param {CategoriaDeleteManyArgs} args - Arguments to filter Categorias to delete.
     * @example
     * // Delete a few Categorias
     * const { count } = await prisma.categoria.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoriaDeleteManyArgs>(args?: SelectSubset<T, CategoriaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoriaUpdateManyArgs>(args: SelectSubset<T, CategoriaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias and returns the data updated in the database.
     * @param {CategoriaUpdateManyAndReturnArgs} args - Arguments to update many Categorias.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categorias and only return the `id`
     * const categoriaWithIdOnly = await prisma.categoria.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoriaUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoriaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categoria.
     * @param {CategoriaUpsertArgs} args - Arguments to update or create a Categoria.
     * @example
     * // Update or create a Categoria
     * const categoria = await prisma.categoria.upsert({
     *   create: {
     *     // ... data to create a Categoria
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categoria we want to update
     *   }
     * })
     */
    upsert<T extends CategoriaUpsertArgs>(args: SelectSubset<T, CategoriaUpsertArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaCountArgs} args - Arguments to filter Categorias to count.
     * @example
     * // Count the number of Categorias
     * const count = await prisma.categoria.count({
     *   where: {
     *     // ... the filter for the Categorias we want to count
     *   }
     * })
    **/
    count<T extends CategoriaCountArgs>(
      args?: Subset<T, CategoriaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriaAggregateArgs>(args: Subset<T, CategoriaAggregateArgs>): Prisma.PrismaPromise<GetCategoriaAggregateType<T>>

    /**
     * Group by Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoriaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoriaGroupByArgs['orderBy'] }
        : { orderBy?: CategoriaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoriaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Categoria model
   */
  readonly fields: CategoriaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Categoria.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoriaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends Categoria$usuarioArgs<ExtArgs> = {}>(args?: Subset<T, Categoria$usuarioArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    lancamentos<T extends Categoria$lancamentosArgs<ExtArgs> = {}>(args?: Subset<T, Categoria$lancamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orcamentos<T extends Categoria$orcamentosArgs<ExtArgs> = {}>(args?: Subset<T, Categoria$orcamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrcamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Categoria model
   */
  interface CategoriaFieldRefs {
    readonly id: FieldRef<"Categoria", 'String'>
    readonly idUsuario: FieldRef<"Categoria", 'String'>
    readonly nome: FieldRef<"Categoria", 'String'>
    readonly tipo: FieldRef<"Categoria", 'TipoCategoria'>
    readonly ehPadrao: FieldRef<"Categoria", 'Boolean'>
    readonly criadoEm: FieldRef<"Categoria", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Categoria", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Categoria findUnique
   */
  export type CategoriaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findUniqueOrThrow
   */
  export type CategoriaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findFirst
   */
  export type CategoriaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findFirstOrThrow
   */
  export type CategoriaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findMany
   */
  export type CategoriaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categorias to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria create
   */
  export type CategoriaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to create a Categoria.
     */
    data: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
  }

  /**
   * Categoria createMany
   */
  export type CategoriaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categoria createManyAndReturn
   */
  export type CategoriaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Categoria update
   */
  export type CategoriaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to update a Categoria.
     */
    data: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
    /**
     * Choose, which Categoria to update.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria updateMany
   */
  export type CategoriaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
  }

  /**
   * Categoria updateManyAndReturn
   */
  export type CategoriaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Categoria upsert
   */
  export type CategoriaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The filter to search for the Categoria to update in case it exists.
     */
    where: CategoriaWhereUniqueInput
    /**
     * In case the Categoria found by the `where` argument doesn't exist, create a new Categoria with this data.
     */
    create: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
    /**
     * In case the Categoria was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
  }

  /**
   * Categoria delete
   */
  export type CategoriaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter which Categoria to delete.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria deleteMany
   */
  export type CategoriaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categorias to delete
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to delete.
     */
    limit?: number
  }

  /**
   * Categoria.usuario
   */
  export type Categoria$usuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
  }

  /**
   * Categoria.lancamentos
   */
  export type Categoria$lancamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lancamento
     */
    omit?: LancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    where?: LancamentoWhereInput
    orderBy?: LancamentoOrderByWithRelationInput | LancamentoOrderByWithRelationInput[]
    cursor?: LancamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * Categoria.orcamentos
   */
  export type Categoria$orcamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orcamento
     */
    select?: OrcamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orcamento
     */
    omit?: OrcamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrcamentoInclude<ExtArgs> | null
    where?: OrcamentoWhereInput
    orderBy?: OrcamentoOrderByWithRelationInput | OrcamentoOrderByWithRelationInput[]
    cursor?: OrcamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrcamentoScalarFieldEnum | OrcamentoScalarFieldEnum[]
  }

  /**
   * Categoria without action
   */
  export type CategoriaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
  }


  /**
   * Model Lancamento
   */

  export type AggregateLancamento = {
    _count: LancamentoCountAggregateOutputType | null
    _avg: LancamentoAvgAggregateOutputType | null
    _sum: LancamentoSumAggregateOutputType | null
    _min: LancamentoMinAggregateOutputType | null
    _max: LancamentoMaxAggregateOutputType | null
  }

  export type LancamentoAvgAggregateOutputType = {
    valor: Decimal | null
  }

  export type LancamentoSumAggregateOutputType = {
    valor: Decimal | null
  }

  export type LancamentoMinAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    idCategoria: string | null
    idConta: string | null
    valor: Decimal | null
    dataTransacao: Date | null
    recorrencia: $Enums.TipoRecorrencia | null
    tipo: $Enums.TipoLancamento | null
    descricao: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type LancamentoMaxAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    idCategoria: string | null
    idConta: string | null
    valor: Decimal | null
    dataTransacao: Date | null
    recorrencia: $Enums.TipoRecorrencia | null
    tipo: $Enums.TipoLancamento | null
    descricao: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type LancamentoCountAggregateOutputType = {
    id: number
    idUsuario: number
    idCategoria: number
    idConta: number
    valor: number
    dataTransacao: number
    recorrencia: number
    tipo: number
    descricao: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type LancamentoAvgAggregateInputType = {
    valor?: true
  }

  export type LancamentoSumAggregateInputType = {
    valor?: true
  }

  export type LancamentoMinAggregateInputType = {
    id?: true
    idUsuario?: true
    idCategoria?: true
    idConta?: true
    valor?: true
    dataTransacao?: true
    recorrencia?: true
    tipo?: true
    descricao?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type LancamentoMaxAggregateInputType = {
    id?: true
    idUsuario?: true
    idCategoria?: true
    idConta?: true
    valor?: true
    dataTransacao?: true
    recorrencia?: true
    tipo?: true
    descricao?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type LancamentoCountAggregateInputType = {
    id?: true
    idUsuario?: true
    idCategoria?: true
    idConta?: true
    valor?: true
    dataTransacao?: true
    recorrencia?: true
    tipo?: true
    descricao?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type LancamentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lancamento to aggregate.
     */
    where?: LancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lancamentos to fetch.
     */
    orderBy?: LancamentoOrderByWithRelationInput | LancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lancamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lancamentos
    **/
    _count?: true | LancamentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LancamentoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LancamentoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LancamentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LancamentoMaxAggregateInputType
  }

  export type GetLancamentoAggregateType<T extends LancamentoAggregateArgs> = {
        [P in keyof T & keyof AggregateLancamento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLancamento[P]>
      : GetScalarType<T[P], AggregateLancamento[P]>
  }




  export type LancamentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LancamentoWhereInput
    orderBy?: LancamentoOrderByWithAggregationInput | LancamentoOrderByWithAggregationInput[]
    by: LancamentoScalarFieldEnum[] | LancamentoScalarFieldEnum
    having?: LancamentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LancamentoCountAggregateInputType | true
    _avg?: LancamentoAvgAggregateInputType
    _sum?: LancamentoSumAggregateInputType
    _min?: LancamentoMinAggregateInputType
    _max?: LancamentoMaxAggregateInputType
  }

  export type LancamentoGroupByOutputType = {
    id: string
    idUsuario: string
    idCategoria: string
    idConta: string | null
    valor: Decimal
    dataTransacao: Date
    recorrencia: $Enums.TipoRecorrencia
    tipo: $Enums.TipoLancamento
    descricao: string | null
    criadoEm: Date
    atualizadoEm: Date
    _count: LancamentoCountAggregateOutputType | null
    _avg: LancamentoAvgAggregateOutputType | null
    _sum: LancamentoSumAggregateOutputType | null
    _min: LancamentoMinAggregateOutputType | null
    _max: LancamentoMaxAggregateOutputType | null
  }

  type GetLancamentoGroupByPayload<T extends LancamentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LancamentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LancamentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LancamentoGroupByOutputType[P]>
            : GetScalarType<T[P], LancamentoGroupByOutputType[P]>
        }
      >
    >


  export type LancamentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    idCategoria?: boolean
    idConta?: boolean
    valor?: boolean
    dataTransacao?: boolean
    recorrencia?: boolean
    tipo?: boolean
    descricao?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    conta?: boolean | Lancamento$contaArgs<ExtArgs>
  }, ExtArgs["result"]["lancamento"]>

  export type LancamentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    idCategoria?: boolean
    idConta?: boolean
    valor?: boolean
    dataTransacao?: boolean
    recorrencia?: boolean
    tipo?: boolean
    descricao?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    conta?: boolean | Lancamento$contaArgs<ExtArgs>
  }, ExtArgs["result"]["lancamento"]>

  export type LancamentoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    idCategoria?: boolean
    idConta?: boolean
    valor?: boolean
    dataTransacao?: boolean
    recorrencia?: boolean
    tipo?: boolean
    descricao?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    conta?: boolean | Lancamento$contaArgs<ExtArgs>
  }, ExtArgs["result"]["lancamento"]>

  export type LancamentoSelectScalar = {
    id?: boolean
    idUsuario?: boolean
    idCategoria?: boolean
    idConta?: boolean
    valor?: boolean
    dataTransacao?: boolean
    recorrencia?: boolean
    tipo?: boolean
    descricao?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type LancamentoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idUsuario" | "idCategoria" | "idConta" | "valor" | "dataTransacao" | "recorrencia" | "tipo" | "descricao" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["lancamento"]>
  export type LancamentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    conta?: boolean | Lancamento$contaArgs<ExtArgs>
  }
  export type LancamentoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    conta?: boolean | Lancamento$contaArgs<ExtArgs>
  }
  export type LancamentoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    conta?: boolean | Lancamento$contaArgs<ExtArgs>
  }

  export type $LancamentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lancamento"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      categoria: Prisma.$CategoriaPayload<ExtArgs>
      conta: Prisma.$ContaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idUsuario: string
      idCategoria: string
      idConta: string | null
      valor: Prisma.Decimal
      dataTransacao: Date
      recorrencia: $Enums.TipoRecorrencia
      tipo: $Enums.TipoLancamento
      descricao: string | null
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["lancamento"]>
    composites: {}
  }

  type LancamentoGetPayload<S extends boolean | null | undefined | LancamentoDefaultArgs> = $Result.GetResult<Prisma.$LancamentoPayload, S>

  type LancamentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LancamentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LancamentoCountAggregateInputType | true
    }

  export interface LancamentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lancamento'], meta: { name: 'Lancamento' } }
    /**
     * Find zero or one Lancamento that matches the filter.
     * @param {LancamentoFindUniqueArgs} args - Arguments to find a Lancamento
     * @example
     * // Get one Lancamento
     * const lancamento = await prisma.lancamento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LancamentoFindUniqueArgs>(args: SelectSubset<T, LancamentoFindUniqueArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lancamento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LancamentoFindUniqueOrThrowArgs} args - Arguments to find a Lancamento
     * @example
     * // Get one Lancamento
     * const lancamento = await prisma.lancamento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LancamentoFindUniqueOrThrowArgs>(args: SelectSubset<T, LancamentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lancamento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoFindFirstArgs} args - Arguments to find a Lancamento
     * @example
     * // Get one Lancamento
     * const lancamento = await prisma.lancamento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LancamentoFindFirstArgs>(args?: SelectSubset<T, LancamentoFindFirstArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lancamento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoFindFirstOrThrowArgs} args - Arguments to find a Lancamento
     * @example
     * // Get one Lancamento
     * const lancamento = await prisma.lancamento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LancamentoFindFirstOrThrowArgs>(args?: SelectSubset<T, LancamentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Lancamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lancamentos
     * const lancamentos = await prisma.lancamento.findMany()
     * 
     * // Get first 10 Lancamentos
     * const lancamentos = await prisma.lancamento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lancamentoWithIdOnly = await prisma.lancamento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LancamentoFindManyArgs>(args?: SelectSubset<T, LancamentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lancamento.
     * @param {LancamentoCreateArgs} args - Arguments to create a Lancamento.
     * @example
     * // Create one Lancamento
     * const Lancamento = await prisma.lancamento.create({
     *   data: {
     *     // ... data to create a Lancamento
     *   }
     * })
     * 
     */
    create<T extends LancamentoCreateArgs>(args: SelectSubset<T, LancamentoCreateArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Lancamentos.
     * @param {LancamentoCreateManyArgs} args - Arguments to create many Lancamentos.
     * @example
     * // Create many Lancamentos
     * const lancamento = await prisma.lancamento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LancamentoCreateManyArgs>(args?: SelectSubset<T, LancamentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lancamentos and returns the data saved in the database.
     * @param {LancamentoCreateManyAndReturnArgs} args - Arguments to create many Lancamentos.
     * @example
     * // Create many Lancamentos
     * const lancamento = await prisma.lancamento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lancamentos and only return the `id`
     * const lancamentoWithIdOnly = await prisma.lancamento.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LancamentoCreateManyAndReturnArgs>(args?: SelectSubset<T, LancamentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lancamento.
     * @param {LancamentoDeleteArgs} args - Arguments to delete one Lancamento.
     * @example
     * // Delete one Lancamento
     * const Lancamento = await prisma.lancamento.delete({
     *   where: {
     *     // ... filter to delete one Lancamento
     *   }
     * })
     * 
     */
    delete<T extends LancamentoDeleteArgs>(args: SelectSubset<T, LancamentoDeleteArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lancamento.
     * @param {LancamentoUpdateArgs} args - Arguments to update one Lancamento.
     * @example
     * // Update one Lancamento
     * const lancamento = await prisma.lancamento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LancamentoUpdateArgs>(args: SelectSubset<T, LancamentoUpdateArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Lancamentos.
     * @param {LancamentoDeleteManyArgs} args - Arguments to filter Lancamentos to delete.
     * @example
     * // Delete a few Lancamentos
     * const { count } = await prisma.lancamento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LancamentoDeleteManyArgs>(args?: SelectSubset<T, LancamentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lancamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lancamentos
     * const lancamento = await prisma.lancamento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LancamentoUpdateManyArgs>(args: SelectSubset<T, LancamentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lancamentos and returns the data updated in the database.
     * @param {LancamentoUpdateManyAndReturnArgs} args - Arguments to update many Lancamentos.
     * @example
     * // Update many Lancamentos
     * const lancamento = await prisma.lancamento.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Lancamentos and only return the `id`
     * const lancamentoWithIdOnly = await prisma.lancamento.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LancamentoUpdateManyAndReturnArgs>(args: SelectSubset<T, LancamentoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lancamento.
     * @param {LancamentoUpsertArgs} args - Arguments to update or create a Lancamento.
     * @example
     * // Update or create a Lancamento
     * const lancamento = await prisma.lancamento.upsert({
     *   create: {
     *     // ... data to create a Lancamento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lancamento we want to update
     *   }
     * })
     */
    upsert<T extends LancamentoUpsertArgs>(args: SelectSubset<T, LancamentoUpsertArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Lancamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoCountArgs} args - Arguments to filter Lancamentos to count.
     * @example
     * // Count the number of Lancamentos
     * const count = await prisma.lancamento.count({
     *   where: {
     *     // ... the filter for the Lancamentos we want to count
     *   }
     * })
    **/
    count<T extends LancamentoCountArgs>(
      args?: Subset<T, LancamentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LancamentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lancamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LancamentoAggregateArgs>(args: Subset<T, LancamentoAggregateArgs>): Prisma.PrismaPromise<GetLancamentoAggregateType<T>>

    /**
     * Group by Lancamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LancamentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LancamentoGroupByArgs['orderBy'] }
        : { orderBy?: LancamentoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LancamentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLancamentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lancamento model
   */
  readonly fields: LancamentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lancamento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LancamentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    categoria<T extends CategoriaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoriaDefaultArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    conta<T extends Lancamento$contaArgs<ExtArgs> = {}>(args?: Subset<T, Lancamento$contaArgs<ExtArgs>>): Prisma__ContaClient<$Result.GetResult<Prisma.$ContaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lancamento model
   */
  interface LancamentoFieldRefs {
    readonly id: FieldRef<"Lancamento", 'String'>
    readonly idUsuario: FieldRef<"Lancamento", 'String'>
    readonly idCategoria: FieldRef<"Lancamento", 'String'>
    readonly idConta: FieldRef<"Lancamento", 'String'>
    readonly valor: FieldRef<"Lancamento", 'Decimal'>
    readonly dataTransacao: FieldRef<"Lancamento", 'DateTime'>
    readonly recorrencia: FieldRef<"Lancamento", 'TipoRecorrencia'>
    readonly tipo: FieldRef<"Lancamento", 'TipoLancamento'>
    readonly descricao: FieldRef<"Lancamento", 'String'>
    readonly criadoEm: FieldRef<"Lancamento", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Lancamento", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lancamento findUnique
   */
  export type LancamentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lancamento
     */
    omit?: LancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * Filter, which Lancamento to fetch.
     */
    where: LancamentoWhereUniqueInput
  }

  /**
   * Lancamento findUniqueOrThrow
   */
  export type LancamentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lancamento
     */
    omit?: LancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * Filter, which Lancamento to fetch.
     */
    where: LancamentoWhereUniqueInput
  }

  /**
   * Lancamento findFirst
   */
  export type LancamentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lancamento
     */
    omit?: LancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * Filter, which Lancamento to fetch.
     */
    where?: LancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lancamentos to fetch.
     */
    orderBy?: LancamentoOrderByWithRelationInput | LancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lancamentos.
     */
    cursor?: LancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lancamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lancamentos.
     */
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * Lancamento findFirstOrThrow
   */
  export type LancamentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lancamento
     */
    omit?: LancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * Filter, which Lancamento to fetch.
     */
    where?: LancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lancamentos to fetch.
     */
    orderBy?: LancamentoOrderByWithRelationInput | LancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lancamentos.
     */
    cursor?: LancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lancamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lancamentos.
     */
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * Lancamento findMany
   */
  export type LancamentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lancamento
     */
    omit?: LancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * Filter, which Lancamentos to fetch.
     */
    where?: LancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lancamentos to fetch.
     */
    orderBy?: LancamentoOrderByWithRelationInput | LancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lancamentos.
     */
    cursor?: LancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lancamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lancamentos.
     */
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * Lancamento create
   */
  export type LancamentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lancamento
     */
    omit?: LancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * The data needed to create a Lancamento.
     */
    data: XOR<LancamentoCreateInput, LancamentoUncheckedCreateInput>
  }

  /**
   * Lancamento createMany
   */
  export type LancamentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lancamentos.
     */
    data: LancamentoCreateManyInput | LancamentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lancamento createManyAndReturn
   */
  export type LancamentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lancamento
     */
    omit?: LancamentoOmit<ExtArgs> | null
    /**
     * The data used to create many Lancamentos.
     */
    data: LancamentoCreateManyInput | LancamentoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lancamento update
   */
  export type LancamentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lancamento
     */
    omit?: LancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * The data needed to update a Lancamento.
     */
    data: XOR<LancamentoUpdateInput, LancamentoUncheckedUpdateInput>
    /**
     * Choose, which Lancamento to update.
     */
    where: LancamentoWhereUniqueInput
  }

  /**
   * Lancamento updateMany
   */
  export type LancamentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lancamentos.
     */
    data: XOR<LancamentoUpdateManyMutationInput, LancamentoUncheckedUpdateManyInput>
    /**
     * Filter which Lancamentos to update
     */
    where?: LancamentoWhereInput
    /**
     * Limit how many Lancamentos to update.
     */
    limit?: number
  }

  /**
   * Lancamento updateManyAndReturn
   */
  export type LancamentoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lancamento
     */
    omit?: LancamentoOmit<ExtArgs> | null
    /**
     * The data used to update Lancamentos.
     */
    data: XOR<LancamentoUpdateManyMutationInput, LancamentoUncheckedUpdateManyInput>
    /**
     * Filter which Lancamentos to update
     */
    where?: LancamentoWhereInput
    /**
     * Limit how many Lancamentos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lancamento upsert
   */
  export type LancamentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lancamento
     */
    omit?: LancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * The filter to search for the Lancamento to update in case it exists.
     */
    where: LancamentoWhereUniqueInput
    /**
     * In case the Lancamento found by the `where` argument doesn't exist, create a new Lancamento with this data.
     */
    create: XOR<LancamentoCreateInput, LancamentoUncheckedCreateInput>
    /**
     * In case the Lancamento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LancamentoUpdateInput, LancamentoUncheckedUpdateInput>
  }

  /**
   * Lancamento delete
   */
  export type LancamentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lancamento
     */
    omit?: LancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * Filter which Lancamento to delete.
     */
    where: LancamentoWhereUniqueInput
  }

  /**
   * Lancamento deleteMany
   */
  export type LancamentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lancamentos to delete
     */
    where?: LancamentoWhereInput
    /**
     * Limit how many Lancamentos to delete.
     */
    limit?: number
  }

  /**
   * Lancamento.conta
   */
  export type Lancamento$contaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conta
     */
    select?: ContaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conta
     */
    omit?: ContaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContaInclude<ExtArgs> | null
    where?: ContaWhereInput
  }

  /**
   * Lancamento without action
   */
  export type LancamentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lancamento
     */
    omit?: LancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
  }


  /**
   * Model Conta
   */

  export type AggregateConta = {
    _count: ContaCountAggregateOutputType | null
    _avg: ContaAvgAggregateOutputType | null
    _sum: ContaSumAggregateOutputType | null
    _min: ContaMinAggregateOutputType | null
    _max: ContaMaxAggregateOutputType | null
  }

  export type ContaAvgAggregateOutputType = {
    saldoInicial: Decimal | null
  }

  export type ContaSumAggregateOutputType = {
    saldoInicial: Decimal | null
  }

  export type ContaMinAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    nome: string | null
    tipo: $Enums.TipoContaBancaria | null
    saldoInicial: Decimal | null
    modeloCartao: $Enums.ModeloCartao | null
    descricao: string | null
    ativa: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type ContaMaxAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    nome: string | null
    tipo: $Enums.TipoContaBancaria | null
    saldoInicial: Decimal | null
    modeloCartao: $Enums.ModeloCartao | null
    descricao: string | null
    ativa: boolean | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type ContaCountAggregateOutputType = {
    id: number
    idUsuario: number
    nome: number
    tipo: number
    saldoInicial: number
    modeloCartao: number
    descricao: number
    ativa: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type ContaAvgAggregateInputType = {
    saldoInicial?: true
  }

  export type ContaSumAggregateInputType = {
    saldoInicial?: true
  }

  export type ContaMinAggregateInputType = {
    id?: true
    idUsuario?: true
    nome?: true
    tipo?: true
    saldoInicial?: true
    modeloCartao?: true
    descricao?: true
    ativa?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type ContaMaxAggregateInputType = {
    id?: true
    idUsuario?: true
    nome?: true
    tipo?: true
    saldoInicial?: true
    modeloCartao?: true
    descricao?: true
    ativa?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type ContaCountAggregateInputType = {
    id?: true
    idUsuario?: true
    nome?: true
    tipo?: true
    saldoInicial?: true
    modeloCartao?: true
    descricao?: true
    ativa?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type ContaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conta to aggregate.
     */
    where?: ContaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contas to fetch.
     */
    orderBy?: ContaOrderByWithRelationInput | ContaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contas
    **/
    _count?: true | ContaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContaMaxAggregateInputType
  }

  export type GetContaAggregateType<T extends ContaAggregateArgs> = {
        [P in keyof T & keyof AggregateConta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConta[P]>
      : GetScalarType<T[P], AggregateConta[P]>
  }




  export type ContaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContaWhereInput
    orderBy?: ContaOrderByWithAggregationInput | ContaOrderByWithAggregationInput[]
    by: ContaScalarFieldEnum[] | ContaScalarFieldEnum
    having?: ContaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContaCountAggregateInputType | true
    _avg?: ContaAvgAggregateInputType
    _sum?: ContaSumAggregateInputType
    _min?: ContaMinAggregateInputType
    _max?: ContaMaxAggregateInputType
  }

  export type ContaGroupByOutputType = {
    id: string
    idUsuario: string
    nome: string
    tipo: $Enums.TipoContaBancaria
    saldoInicial: Decimal
    modeloCartao: $Enums.ModeloCartao
    descricao: string | null
    ativa: boolean
    criadoEm: Date
    atualizadoEm: Date
    _count: ContaCountAggregateOutputType | null
    _avg: ContaAvgAggregateOutputType | null
    _sum: ContaSumAggregateOutputType | null
    _min: ContaMinAggregateOutputType | null
    _max: ContaMaxAggregateOutputType | null
  }

  type GetContaGroupByPayload<T extends ContaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContaGroupByOutputType[P]>
            : GetScalarType<T[P], ContaGroupByOutputType[P]>
        }
      >
    >


  export type ContaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    nome?: boolean
    tipo?: boolean
    saldoInicial?: boolean
    modeloCartao?: boolean
    descricao?: boolean
    ativa?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    lancamentos?: boolean | Conta$lancamentosArgs<ExtArgs>
    _count?: boolean | ContaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conta"]>

  export type ContaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    nome?: boolean
    tipo?: boolean
    saldoInicial?: boolean
    modeloCartao?: boolean
    descricao?: boolean
    ativa?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conta"]>

  export type ContaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    nome?: boolean
    tipo?: boolean
    saldoInicial?: boolean
    modeloCartao?: boolean
    descricao?: boolean
    ativa?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conta"]>

  export type ContaSelectScalar = {
    id?: boolean
    idUsuario?: boolean
    nome?: boolean
    tipo?: boolean
    saldoInicial?: boolean
    modeloCartao?: boolean
    descricao?: boolean
    ativa?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type ContaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idUsuario" | "nome" | "tipo" | "saldoInicial" | "modeloCartao" | "descricao" | "ativa" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["conta"]>
  export type ContaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    lancamentos?: boolean | Conta$lancamentosArgs<ExtArgs>
    _count?: boolean | ContaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type ContaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $ContaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conta"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      lancamentos: Prisma.$LancamentoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idUsuario: string
      nome: string
      tipo: $Enums.TipoContaBancaria
      saldoInicial: Prisma.Decimal
      modeloCartao: $Enums.ModeloCartao
      descricao: string | null
      ativa: boolean
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["conta"]>
    composites: {}
  }

  type ContaGetPayload<S extends boolean | null | undefined | ContaDefaultArgs> = $Result.GetResult<Prisma.$ContaPayload, S>

  type ContaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContaCountAggregateInputType | true
    }

  export interface ContaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conta'], meta: { name: 'Conta' } }
    /**
     * Find zero or one Conta that matches the filter.
     * @param {ContaFindUniqueArgs} args - Arguments to find a Conta
     * @example
     * // Get one Conta
     * const conta = await prisma.conta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContaFindUniqueArgs>(args: SelectSubset<T, ContaFindUniqueArgs<ExtArgs>>): Prisma__ContaClient<$Result.GetResult<Prisma.$ContaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContaFindUniqueOrThrowArgs} args - Arguments to find a Conta
     * @example
     * // Get one Conta
     * const conta = await prisma.conta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContaFindUniqueOrThrowArgs>(args: SelectSubset<T, ContaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContaClient<$Result.GetResult<Prisma.$ContaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContaFindFirstArgs} args - Arguments to find a Conta
     * @example
     * // Get one Conta
     * const conta = await prisma.conta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContaFindFirstArgs>(args?: SelectSubset<T, ContaFindFirstArgs<ExtArgs>>): Prisma__ContaClient<$Result.GetResult<Prisma.$ContaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContaFindFirstOrThrowArgs} args - Arguments to find a Conta
     * @example
     * // Get one Conta
     * const conta = await prisma.conta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContaFindFirstOrThrowArgs>(args?: SelectSubset<T, ContaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContaClient<$Result.GetResult<Prisma.$ContaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contas
     * const contas = await prisma.conta.findMany()
     * 
     * // Get first 10 Contas
     * const contas = await prisma.conta.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contaWithIdOnly = await prisma.conta.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContaFindManyArgs>(args?: SelectSubset<T, ContaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conta.
     * @param {ContaCreateArgs} args - Arguments to create a Conta.
     * @example
     * // Create one Conta
     * const Conta = await prisma.conta.create({
     *   data: {
     *     // ... data to create a Conta
     *   }
     * })
     * 
     */
    create<T extends ContaCreateArgs>(args: SelectSubset<T, ContaCreateArgs<ExtArgs>>): Prisma__ContaClient<$Result.GetResult<Prisma.$ContaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contas.
     * @param {ContaCreateManyArgs} args - Arguments to create many Contas.
     * @example
     * // Create many Contas
     * const conta = await prisma.conta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContaCreateManyArgs>(args?: SelectSubset<T, ContaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contas and returns the data saved in the database.
     * @param {ContaCreateManyAndReturnArgs} args - Arguments to create many Contas.
     * @example
     * // Create many Contas
     * const conta = await prisma.conta.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contas and only return the `id`
     * const contaWithIdOnly = await prisma.conta.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContaCreateManyAndReturnArgs>(args?: SelectSubset<T, ContaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conta.
     * @param {ContaDeleteArgs} args - Arguments to delete one Conta.
     * @example
     * // Delete one Conta
     * const Conta = await prisma.conta.delete({
     *   where: {
     *     // ... filter to delete one Conta
     *   }
     * })
     * 
     */
    delete<T extends ContaDeleteArgs>(args: SelectSubset<T, ContaDeleteArgs<ExtArgs>>): Prisma__ContaClient<$Result.GetResult<Prisma.$ContaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conta.
     * @param {ContaUpdateArgs} args - Arguments to update one Conta.
     * @example
     * // Update one Conta
     * const conta = await prisma.conta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContaUpdateArgs>(args: SelectSubset<T, ContaUpdateArgs<ExtArgs>>): Prisma__ContaClient<$Result.GetResult<Prisma.$ContaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contas.
     * @param {ContaDeleteManyArgs} args - Arguments to filter Contas to delete.
     * @example
     * // Delete a few Contas
     * const { count } = await prisma.conta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContaDeleteManyArgs>(args?: SelectSubset<T, ContaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contas
     * const conta = await prisma.conta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContaUpdateManyArgs>(args: SelectSubset<T, ContaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contas and returns the data updated in the database.
     * @param {ContaUpdateManyAndReturnArgs} args - Arguments to update many Contas.
     * @example
     * // Update many Contas
     * const conta = await prisma.conta.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contas and only return the `id`
     * const contaWithIdOnly = await prisma.conta.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContaUpdateManyAndReturnArgs>(args: SelectSubset<T, ContaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conta.
     * @param {ContaUpsertArgs} args - Arguments to update or create a Conta.
     * @example
     * // Update or create a Conta
     * const conta = await prisma.conta.upsert({
     *   create: {
     *     // ... data to create a Conta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conta we want to update
     *   }
     * })
     */
    upsert<T extends ContaUpsertArgs>(args: SelectSubset<T, ContaUpsertArgs<ExtArgs>>): Prisma__ContaClient<$Result.GetResult<Prisma.$ContaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContaCountArgs} args - Arguments to filter Contas to count.
     * @example
     * // Count the number of Contas
     * const count = await prisma.conta.count({
     *   where: {
     *     // ... the filter for the Contas we want to count
     *   }
     * })
    **/
    count<T extends ContaCountArgs>(
      args?: Subset<T, ContaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContaAggregateArgs>(args: Subset<T, ContaAggregateArgs>): Prisma.PrismaPromise<GetContaAggregateType<T>>

    /**
     * Group by Conta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContaGroupByArgs['orderBy'] }
        : { orderBy?: ContaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conta model
   */
  readonly fields: ContaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    lancamentos<T extends Conta$lancamentosArgs<ExtArgs> = {}>(args?: Subset<T, Conta$lancamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conta model
   */
  interface ContaFieldRefs {
    readonly id: FieldRef<"Conta", 'String'>
    readonly idUsuario: FieldRef<"Conta", 'String'>
    readonly nome: FieldRef<"Conta", 'String'>
    readonly tipo: FieldRef<"Conta", 'TipoContaBancaria'>
    readonly saldoInicial: FieldRef<"Conta", 'Decimal'>
    readonly modeloCartao: FieldRef<"Conta", 'ModeloCartao'>
    readonly descricao: FieldRef<"Conta", 'String'>
    readonly ativa: FieldRef<"Conta", 'Boolean'>
    readonly criadoEm: FieldRef<"Conta", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Conta", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conta findUnique
   */
  export type ContaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conta
     */
    select?: ContaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conta
     */
    omit?: ContaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContaInclude<ExtArgs> | null
    /**
     * Filter, which Conta to fetch.
     */
    where: ContaWhereUniqueInput
  }

  /**
   * Conta findUniqueOrThrow
   */
  export type ContaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conta
     */
    select?: ContaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conta
     */
    omit?: ContaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContaInclude<ExtArgs> | null
    /**
     * Filter, which Conta to fetch.
     */
    where: ContaWhereUniqueInput
  }

  /**
   * Conta findFirst
   */
  export type ContaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conta
     */
    select?: ContaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conta
     */
    omit?: ContaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContaInclude<ExtArgs> | null
    /**
     * Filter, which Conta to fetch.
     */
    where?: ContaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contas to fetch.
     */
    orderBy?: ContaOrderByWithRelationInput | ContaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contas.
     */
    cursor?: ContaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contas.
     */
    distinct?: ContaScalarFieldEnum | ContaScalarFieldEnum[]
  }

  /**
   * Conta findFirstOrThrow
   */
  export type ContaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conta
     */
    select?: ContaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conta
     */
    omit?: ContaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContaInclude<ExtArgs> | null
    /**
     * Filter, which Conta to fetch.
     */
    where?: ContaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contas to fetch.
     */
    orderBy?: ContaOrderByWithRelationInput | ContaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contas.
     */
    cursor?: ContaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contas.
     */
    distinct?: ContaScalarFieldEnum | ContaScalarFieldEnum[]
  }

  /**
   * Conta findMany
   */
  export type ContaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conta
     */
    select?: ContaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conta
     */
    omit?: ContaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContaInclude<ExtArgs> | null
    /**
     * Filter, which Contas to fetch.
     */
    where?: ContaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contas to fetch.
     */
    orderBy?: ContaOrderByWithRelationInput | ContaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contas.
     */
    cursor?: ContaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contas.
     */
    distinct?: ContaScalarFieldEnum | ContaScalarFieldEnum[]
  }

  /**
   * Conta create
   */
  export type ContaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conta
     */
    select?: ContaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conta
     */
    omit?: ContaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContaInclude<ExtArgs> | null
    /**
     * The data needed to create a Conta.
     */
    data: XOR<ContaCreateInput, ContaUncheckedCreateInput>
  }

  /**
   * Conta createMany
   */
  export type ContaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contas.
     */
    data: ContaCreateManyInput | ContaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conta createManyAndReturn
   */
  export type ContaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conta
     */
    select?: ContaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conta
     */
    omit?: ContaOmit<ExtArgs> | null
    /**
     * The data used to create many Contas.
     */
    data: ContaCreateManyInput | ContaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conta update
   */
  export type ContaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conta
     */
    select?: ContaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conta
     */
    omit?: ContaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContaInclude<ExtArgs> | null
    /**
     * The data needed to update a Conta.
     */
    data: XOR<ContaUpdateInput, ContaUncheckedUpdateInput>
    /**
     * Choose, which Conta to update.
     */
    where: ContaWhereUniqueInput
  }

  /**
   * Conta updateMany
   */
  export type ContaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contas.
     */
    data: XOR<ContaUpdateManyMutationInput, ContaUncheckedUpdateManyInput>
    /**
     * Filter which Contas to update
     */
    where?: ContaWhereInput
    /**
     * Limit how many Contas to update.
     */
    limit?: number
  }

  /**
   * Conta updateManyAndReturn
   */
  export type ContaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conta
     */
    select?: ContaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conta
     */
    omit?: ContaOmit<ExtArgs> | null
    /**
     * The data used to update Contas.
     */
    data: XOR<ContaUpdateManyMutationInput, ContaUncheckedUpdateManyInput>
    /**
     * Filter which Contas to update
     */
    where?: ContaWhereInput
    /**
     * Limit how many Contas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conta upsert
   */
  export type ContaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conta
     */
    select?: ContaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conta
     */
    omit?: ContaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContaInclude<ExtArgs> | null
    /**
     * The filter to search for the Conta to update in case it exists.
     */
    where: ContaWhereUniqueInput
    /**
     * In case the Conta found by the `where` argument doesn't exist, create a new Conta with this data.
     */
    create: XOR<ContaCreateInput, ContaUncheckedCreateInput>
    /**
     * In case the Conta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContaUpdateInput, ContaUncheckedUpdateInput>
  }

  /**
   * Conta delete
   */
  export type ContaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conta
     */
    select?: ContaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conta
     */
    omit?: ContaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContaInclude<ExtArgs> | null
    /**
     * Filter which Conta to delete.
     */
    where: ContaWhereUniqueInput
  }

  /**
   * Conta deleteMany
   */
  export type ContaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contas to delete
     */
    where?: ContaWhereInput
    /**
     * Limit how many Contas to delete.
     */
    limit?: number
  }

  /**
   * Conta.lancamentos
   */
  export type Conta$lancamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lancamento
     */
    omit?: LancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    where?: LancamentoWhereInput
    orderBy?: LancamentoOrderByWithRelationInput | LancamentoOrderByWithRelationInput[]
    cursor?: LancamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * Conta without action
   */
  export type ContaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conta
     */
    select?: ContaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conta
     */
    omit?: ContaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContaInclude<ExtArgs> | null
  }


  /**
   * Model Orcamento
   */

  export type AggregateOrcamento = {
    _count: OrcamentoCountAggregateOutputType | null
    _avg: OrcamentoAvgAggregateOutputType | null
    _sum: OrcamentoSumAggregateOutputType | null
    _min: OrcamentoMinAggregateOutputType | null
    _max: OrcamentoMaxAggregateOutputType | null
  }

  export type OrcamentoAvgAggregateOutputType = {
    valor: Decimal | null
    mes: number | null
    ano: number | null
  }

  export type OrcamentoSumAggregateOutputType = {
    valor: Decimal | null
    mes: number | null
    ano: number | null
  }

  export type OrcamentoMinAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    idCategoria: string | null
    valor: Decimal | null
    mes: number | null
    ano: number | null
    descricao: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type OrcamentoMaxAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    idCategoria: string | null
    valor: Decimal | null
    mes: number | null
    ano: number | null
    descricao: string | null
    criadoEm: Date | null
    atualizadoEm: Date | null
  }

  export type OrcamentoCountAggregateOutputType = {
    id: number
    idUsuario: number
    idCategoria: number
    valor: number
    mes: number
    ano: number
    descricao: number
    criadoEm: number
    atualizadoEm: number
    _all: number
  }


  export type OrcamentoAvgAggregateInputType = {
    valor?: true
    mes?: true
    ano?: true
  }

  export type OrcamentoSumAggregateInputType = {
    valor?: true
    mes?: true
    ano?: true
  }

  export type OrcamentoMinAggregateInputType = {
    id?: true
    idUsuario?: true
    idCategoria?: true
    valor?: true
    mes?: true
    ano?: true
    descricao?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type OrcamentoMaxAggregateInputType = {
    id?: true
    idUsuario?: true
    idCategoria?: true
    valor?: true
    mes?: true
    ano?: true
    descricao?: true
    criadoEm?: true
    atualizadoEm?: true
  }

  export type OrcamentoCountAggregateInputType = {
    id?: true
    idUsuario?: true
    idCategoria?: true
    valor?: true
    mes?: true
    ano?: true
    descricao?: true
    criadoEm?: true
    atualizadoEm?: true
    _all?: true
  }

  export type OrcamentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orcamento to aggregate.
     */
    where?: OrcamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orcamentos to fetch.
     */
    orderBy?: OrcamentoOrderByWithRelationInput | OrcamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrcamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orcamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orcamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orcamentos
    **/
    _count?: true | OrcamentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrcamentoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrcamentoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrcamentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrcamentoMaxAggregateInputType
  }

  export type GetOrcamentoAggregateType<T extends OrcamentoAggregateArgs> = {
        [P in keyof T & keyof AggregateOrcamento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrcamento[P]>
      : GetScalarType<T[P], AggregateOrcamento[P]>
  }




  export type OrcamentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrcamentoWhereInput
    orderBy?: OrcamentoOrderByWithAggregationInput | OrcamentoOrderByWithAggregationInput[]
    by: OrcamentoScalarFieldEnum[] | OrcamentoScalarFieldEnum
    having?: OrcamentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrcamentoCountAggregateInputType | true
    _avg?: OrcamentoAvgAggregateInputType
    _sum?: OrcamentoSumAggregateInputType
    _min?: OrcamentoMinAggregateInputType
    _max?: OrcamentoMaxAggregateInputType
  }

  export type OrcamentoGroupByOutputType = {
    id: string
    idUsuario: string
    idCategoria: string | null
    valor: Decimal
    mes: number
    ano: number
    descricao: string | null
    criadoEm: Date
    atualizadoEm: Date
    _count: OrcamentoCountAggregateOutputType | null
    _avg: OrcamentoAvgAggregateOutputType | null
    _sum: OrcamentoSumAggregateOutputType | null
    _min: OrcamentoMinAggregateOutputType | null
    _max: OrcamentoMaxAggregateOutputType | null
  }

  type GetOrcamentoGroupByPayload<T extends OrcamentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrcamentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrcamentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrcamentoGroupByOutputType[P]>
            : GetScalarType<T[P], OrcamentoGroupByOutputType[P]>
        }
      >
    >


  export type OrcamentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    idCategoria?: boolean
    valor?: boolean
    mes?: boolean
    ano?: boolean
    descricao?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    categoria?: boolean | Orcamento$categoriaArgs<ExtArgs>
  }, ExtArgs["result"]["orcamento"]>

  export type OrcamentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    idCategoria?: boolean
    valor?: boolean
    mes?: boolean
    ano?: boolean
    descricao?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    categoria?: boolean | Orcamento$categoriaArgs<ExtArgs>
  }, ExtArgs["result"]["orcamento"]>

  export type OrcamentoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    idCategoria?: boolean
    valor?: boolean
    mes?: boolean
    ano?: boolean
    descricao?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    categoria?: boolean | Orcamento$categoriaArgs<ExtArgs>
  }, ExtArgs["result"]["orcamento"]>

  export type OrcamentoSelectScalar = {
    id?: boolean
    idUsuario?: boolean
    idCategoria?: boolean
    valor?: boolean
    mes?: boolean
    ano?: boolean
    descricao?: boolean
    criadoEm?: boolean
    atualizadoEm?: boolean
  }

  export type OrcamentoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idUsuario" | "idCategoria" | "valor" | "mes" | "ano" | "descricao" | "criadoEm" | "atualizadoEm", ExtArgs["result"]["orcamento"]>
  export type OrcamentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    categoria?: boolean | Orcamento$categoriaArgs<ExtArgs>
  }
  export type OrcamentoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    categoria?: boolean | Orcamento$categoriaArgs<ExtArgs>
  }
  export type OrcamentoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    categoria?: boolean | Orcamento$categoriaArgs<ExtArgs>
  }

  export type $OrcamentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Orcamento"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      categoria: Prisma.$CategoriaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idUsuario: string
      idCategoria: string | null
      valor: Prisma.Decimal
      mes: number
      ano: number
      descricao: string | null
      criadoEm: Date
      atualizadoEm: Date
    }, ExtArgs["result"]["orcamento"]>
    composites: {}
  }

  type OrcamentoGetPayload<S extends boolean | null | undefined | OrcamentoDefaultArgs> = $Result.GetResult<Prisma.$OrcamentoPayload, S>

  type OrcamentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrcamentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrcamentoCountAggregateInputType | true
    }

  export interface OrcamentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Orcamento'], meta: { name: 'Orcamento' } }
    /**
     * Find zero or one Orcamento that matches the filter.
     * @param {OrcamentoFindUniqueArgs} args - Arguments to find a Orcamento
     * @example
     * // Get one Orcamento
     * const orcamento = await prisma.orcamento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrcamentoFindUniqueArgs>(args: SelectSubset<T, OrcamentoFindUniqueArgs<ExtArgs>>): Prisma__OrcamentoClient<$Result.GetResult<Prisma.$OrcamentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Orcamento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrcamentoFindUniqueOrThrowArgs} args - Arguments to find a Orcamento
     * @example
     * // Get one Orcamento
     * const orcamento = await prisma.orcamento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrcamentoFindUniqueOrThrowArgs>(args: SelectSubset<T, OrcamentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrcamentoClient<$Result.GetResult<Prisma.$OrcamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Orcamento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrcamentoFindFirstArgs} args - Arguments to find a Orcamento
     * @example
     * // Get one Orcamento
     * const orcamento = await prisma.orcamento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrcamentoFindFirstArgs>(args?: SelectSubset<T, OrcamentoFindFirstArgs<ExtArgs>>): Prisma__OrcamentoClient<$Result.GetResult<Prisma.$OrcamentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Orcamento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrcamentoFindFirstOrThrowArgs} args - Arguments to find a Orcamento
     * @example
     * // Get one Orcamento
     * const orcamento = await prisma.orcamento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrcamentoFindFirstOrThrowArgs>(args?: SelectSubset<T, OrcamentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrcamentoClient<$Result.GetResult<Prisma.$OrcamentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orcamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrcamentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orcamentos
     * const orcamentos = await prisma.orcamento.findMany()
     * 
     * // Get first 10 Orcamentos
     * const orcamentos = await prisma.orcamento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orcamentoWithIdOnly = await prisma.orcamento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrcamentoFindManyArgs>(args?: SelectSubset<T, OrcamentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrcamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Orcamento.
     * @param {OrcamentoCreateArgs} args - Arguments to create a Orcamento.
     * @example
     * // Create one Orcamento
     * const Orcamento = await prisma.orcamento.create({
     *   data: {
     *     // ... data to create a Orcamento
     *   }
     * })
     * 
     */
    create<T extends OrcamentoCreateArgs>(args: SelectSubset<T, OrcamentoCreateArgs<ExtArgs>>): Prisma__OrcamentoClient<$Result.GetResult<Prisma.$OrcamentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orcamentos.
     * @param {OrcamentoCreateManyArgs} args - Arguments to create many Orcamentos.
     * @example
     * // Create many Orcamentos
     * const orcamento = await prisma.orcamento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrcamentoCreateManyArgs>(args?: SelectSubset<T, OrcamentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orcamentos and returns the data saved in the database.
     * @param {OrcamentoCreateManyAndReturnArgs} args - Arguments to create many Orcamentos.
     * @example
     * // Create many Orcamentos
     * const orcamento = await prisma.orcamento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orcamentos and only return the `id`
     * const orcamentoWithIdOnly = await prisma.orcamento.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrcamentoCreateManyAndReturnArgs>(args?: SelectSubset<T, OrcamentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrcamentoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Orcamento.
     * @param {OrcamentoDeleteArgs} args - Arguments to delete one Orcamento.
     * @example
     * // Delete one Orcamento
     * const Orcamento = await prisma.orcamento.delete({
     *   where: {
     *     // ... filter to delete one Orcamento
     *   }
     * })
     * 
     */
    delete<T extends OrcamentoDeleteArgs>(args: SelectSubset<T, OrcamentoDeleteArgs<ExtArgs>>): Prisma__OrcamentoClient<$Result.GetResult<Prisma.$OrcamentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Orcamento.
     * @param {OrcamentoUpdateArgs} args - Arguments to update one Orcamento.
     * @example
     * // Update one Orcamento
     * const orcamento = await prisma.orcamento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrcamentoUpdateArgs>(args: SelectSubset<T, OrcamentoUpdateArgs<ExtArgs>>): Prisma__OrcamentoClient<$Result.GetResult<Prisma.$OrcamentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orcamentos.
     * @param {OrcamentoDeleteManyArgs} args - Arguments to filter Orcamentos to delete.
     * @example
     * // Delete a few Orcamentos
     * const { count } = await prisma.orcamento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrcamentoDeleteManyArgs>(args?: SelectSubset<T, OrcamentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orcamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrcamentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orcamentos
     * const orcamento = await prisma.orcamento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrcamentoUpdateManyArgs>(args: SelectSubset<T, OrcamentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orcamentos and returns the data updated in the database.
     * @param {OrcamentoUpdateManyAndReturnArgs} args - Arguments to update many Orcamentos.
     * @example
     * // Update many Orcamentos
     * const orcamento = await prisma.orcamento.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orcamentos and only return the `id`
     * const orcamentoWithIdOnly = await prisma.orcamento.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrcamentoUpdateManyAndReturnArgs>(args: SelectSubset<T, OrcamentoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrcamentoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Orcamento.
     * @param {OrcamentoUpsertArgs} args - Arguments to update or create a Orcamento.
     * @example
     * // Update or create a Orcamento
     * const orcamento = await prisma.orcamento.upsert({
     *   create: {
     *     // ... data to create a Orcamento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Orcamento we want to update
     *   }
     * })
     */
    upsert<T extends OrcamentoUpsertArgs>(args: SelectSubset<T, OrcamentoUpsertArgs<ExtArgs>>): Prisma__OrcamentoClient<$Result.GetResult<Prisma.$OrcamentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orcamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrcamentoCountArgs} args - Arguments to filter Orcamentos to count.
     * @example
     * // Count the number of Orcamentos
     * const count = await prisma.orcamento.count({
     *   where: {
     *     // ... the filter for the Orcamentos we want to count
     *   }
     * })
    **/
    count<T extends OrcamentoCountArgs>(
      args?: Subset<T, OrcamentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrcamentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Orcamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrcamentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrcamentoAggregateArgs>(args: Subset<T, OrcamentoAggregateArgs>): Prisma.PrismaPromise<GetOrcamentoAggregateType<T>>

    /**
     * Group by Orcamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrcamentoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrcamentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrcamentoGroupByArgs['orderBy'] }
        : { orderBy?: OrcamentoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrcamentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrcamentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Orcamento model
   */
  readonly fields: OrcamentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Orcamento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrcamentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    categoria<T extends Orcamento$categoriaArgs<ExtArgs> = {}>(args?: Subset<T, Orcamento$categoriaArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Orcamento model
   */
  interface OrcamentoFieldRefs {
    readonly id: FieldRef<"Orcamento", 'String'>
    readonly idUsuario: FieldRef<"Orcamento", 'String'>
    readonly idCategoria: FieldRef<"Orcamento", 'String'>
    readonly valor: FieldRef<"Orcamento", 'Decimal'>
    readonly mes: FieldRef<"Orcamento", 'Int'>
    readonly ano: FieldRef<"Orcamento", 'Int'>
    readonly descricao: FieldRef<"Orcamento", 'String'>
    readonly criadoEm: FieldRef<"Orcamento", 'DateTime'>
    readonly atualizadoEm: FieldRef<"Orcamento", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Orcamento findUnique
   */
  export type OrcamentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orcamento
     */
    select?: OrcamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orcamento
     */
    omit?: OrcamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrcamentoInclude<ExtArgs> | null
    /**
     * Filter, which Orcamento to fetch.
     */
    where: OrcamentoWhereUniqueInput
  }

  /**
   * Orcamento findUniqueOrThrow
   */
  export type OrcamentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orcamento
     */
    select?: OrcamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orcamento
     */
    omit?: OrcamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrcamentoInclude<ExtArgs> | null
    /**
     * Filter, which Orcamento to fetch.
     */
    where: OrcamentoWhereUniqueInput
  }

  /**
   * Orcamento findFirst
   */
  export type OrcamentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orcamento
     */
    select?: OrcamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orcamento
     */
    omit?: OrcamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrcamentoInclude<ExtArgs> | null
    /**
     * Filter, which Orcamento to fetch.
     */
    where?: OrcamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orcamentos to fetch.
     */
    orderBy?: OrcamentoOrderByWithRelationInput | OrcamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orcamentos.
     */
    cursor?: OrcamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orcamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orcamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orcamentos.
     */
    distinct?: OrcamentoScalarFieldEnum | OrcamentoScalarFieldEnum[]
  }

  /**
   * Orcamento findFirstOrThrow
   */
  export type OrcamentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orcamento
     */
    select?: OrcamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orcamento
     */
    omit?: OrcamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrcamentoInclude<ExtArgs> | null
    /**
     * Filter, which Orcamento to fetch.
     */
    where?: OrcamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orcamentos to fetch.
     */
    orderBy?: OrcamentoOrderByWithRelationInput | OrcamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orcamentos.
     */
    cursor?: OrcamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orcamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orcamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orcamentos.
     */
    distinct?: OrcamentoScalarFieldEnum | OrcamentoScalarFieldEnum[]
  }

  /**
   * Orcamento findMany
   */
  export type OrcamentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orcamento
     */
    select?: OrcamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orcamento
     */
    omit?: OrcamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrcamentoInclude<ExtArgs> | null
    /**
     * Filter, which Orcamentos to fetch.
     */
    where?: OrcamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orcamentos to fetch.
     */
    orderBy?: OrcamentoOrderByWithRelationInput | OrcamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orcamentos.
     */
    cursor?: OrcamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orcamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orcamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orcamentos.
     */
    distinct?: OrcamentoScalarFieldEnum | OrcamentoScalarFieldEnum[]
  }

  /**
   * Orcamento create
   */
  export type OrcamentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orcamento
     */
    select?: OrcamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orcamento
     */
    omit?: OrcamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrcamentoInclude<ExtArgs> | null
    /**
     * The data needed to create a Orcamento.
     */
    data: XOR<OrcamentoCreateInput, OrcamentoUncheckedCreateInput>
  }

  /**
   * Orcamento createMany
   */
  export type OrcamentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orcamentos.
     */
    data: OrcamentoCreateManyInput | OrcamentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Orcamento createManyAndReturn
   */
  export type OrcamentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orcamento
     */
    select?: OrcamentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Orcamento
     */
    omit?: OrcamentoOmit<ExtArgs> | null
    /**
     * The data used to create many Orcamentos.
     */
    data: OrcamentoCreateManyInput | OrcamentoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrcamentoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Orcamento update
   */
  export type OrcamentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orcamento
     */
    select?: OrcamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orcamento
     */
    omit?: OrcamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrcamentoInclude<ExtArgs> | null
    /**
     * The data needed to update a Orcamento.
     */
    data: XOR<OrcamentoUpdateInput, OrcamentoUncheckedUpdateInput>
    /**
     * Choose, which Orcamento to update.
     */
    where: OrcamentoWhereUniqueInput
  }

  /**
   * Orcamento updateMany
   */
  export type OrcamentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orcamentos.
     */
    data: XOR<OrcamentoUpdateManyMutationInput, OrcamentoUncheckedUpdateManyInput>
    /**
     * Filter which Orcamentos to update
     */
    where?: OrcamentoWhereInput
    /**
     * Limit how many Orcamentos to update.
     */
    limit?: number
  }

  /**
   * Orcamento updateManyAndReturn
   */
  export type OrcamentoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orcamento
     */
    select?: OrcamentoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Orcamento
     */
    omit?: OrcamentoOmit<ExtArgs> | null
    /**
     * The data used to update Orcamentos.
     */
    data: XOR<OrcamentoUpdateManyMutationInput, OrcamentoUncheckedUpdateManyInput>
    /**
     * Filter which Orcamentos to update
     */
    where?: OrcamentoWhereInput
    /**
     * Limit how many Orcamentos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrcamentoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Orcamento upsert
   */
  export type OrcamentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orcamento
     */
    select?: OrcamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orcamento
     */
    omit?: OrcamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrcamentoInclude<ExtArgs> | null
    /**
     * The filter to search for the Orcamento to update in case it exists.
     */
    where: OrcamentoWhereUniqueInput
    /**
     * In case the Orcamento found by the `where` argument doesn't exist, create a new Orcamento with this data.
     */
    create: XOR<OrcamentoCreateInput, OrcamentoUncheckedCreateInput>
    /**
     * In case the Orcamento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrcamentoUpdateInput, OrcamentoUncheckedUpdateInput>
  }

  /**
   * Orcamento delete
   */
  export type OrcamentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orcamento
     */
    select?: OrcamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orcamento
     */
    omit?: OrcamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrcamentoInclude<ExtArgs> | null
    /**
     * Filter which Orcamento to delete.
     */
    where: OrcamentoWhereUniqueInput
  }

  /**
   * Orcamento deleteMany
   */
  export type OrcamentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orcamentos to delete
     */
    where?: OrcamentoWhereInput
    /**
     * Limit how many Orcamentos to delete.
     */
    limit?: number
  }

  /**
   * Orcamento.categoria
   */
  export type Orcamento$categoriaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    where?: CategoriaWhereInput
  }

  /**
   * Orcamento without action
   */
  export type OrcamentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orcamento
     */
    select?: OrcamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Orcamento
     */
    omit?: OrcamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrcamentoInclude<ExtArgs> | null
  }


  /**
   * Model AnalyticJob
   */

  export type AggregateAnalyticJob = {
    _count: AnalyticJobCountAggregateOutputType | null
    _min: AnalyticJobMinAggregateOutputType | null
    _max: AnalyticJobMaxAggregateOutputType | null
  }

  export type AnalyticJobMinAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    tipo: string | null
    status: string | null
    erro: string | null
    criadoEm: Date | null
    iniciadoEm: Date | null
    finalizadoEm: Date | null
  }

  export type AnalyticJobMaxAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    tipo: string | null
    status: string | null
    erro: string | null
    criadoEm: Date | null
    iniciadoEm: Date | null
    finalizadoEm: Date | null
  }

  export type AnalyticJobCountAggregateOutputType = {
    id: number
    idUsuario: number
    tipo: number
    status: number
    payload: number
    resultado: number
    erro: number
    criadoEm: number
    iniciadoEm: number
    finalizadoEm: number
    _all: number
  }


  export type AnalyticJobMinAggregateInputType = {
    id?: true
    idUsuario?: true
    tipo?: true
    status?: true
    erro?: true
    criadoEm?: true
    iniciadoEm?: true
    finalizadoEm?: true
  }

  export type AnalyticJobMaxAggregateInputType = {
    id?: true
    idUsuario?: true
    tipo?: true
    status?: true
    erro?: true
    criadoEm?: true
    iniciadoEm?: true
    finalizadoEm?: true
  }

  export type AnalyticJobCountAggregateInputType = {
    id?: true
    idUsuario?: true
    tipo?: true
    status?: true
    payload?: true
    resultado?: true
    erro?: true
    criadoEm?: true
    iniciadoEm?: true
    finalizadoEm?: true
    _all?: true
  }

  export type AnalyticJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticJob to aggregate.
     */
    where?: AnalyticJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticJobs to fetch.
     */
    orderBy?: AnalyticJobOrderByWithRelationInput | AnalyticJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalyticJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnalyticJobs
    **/
    _count?: true | AnalyticJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalyticJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalyticJobMaxAggregateInputType
  }

  export type GetAnalyticJobAggregateType<T extends AnalyticJobAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalyticJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalyticJob[P]>
      : GetScalarType<T[P], AggregateAnalyticJob[P]>
  }




  export type AnalyticJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticJobWhereInput
    orderBy?: AnalyticJobOrderByWithAggregationInput | AnalyticJobOrderByWithAggregationInput[]
    by: AnalyticJobScalarFieldEnum[] | AnalyticJobScalarFieldEnum
    having?: AnalyticJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalyticJobCountAggregateInputType | true
    _min?: AnalyticJobMinAggregateInputType
    _max?: AnalyticJobMaxAggregateInputType
  }

  export type AnalyticJobGroupByOutputType = {
    id: string
    idUsuario: string
    tipo: string
    status: string
    payload: JsonValue
    resultado: JsonValue | null
    erro: string | null
    criadoEm: Date
    iniciadoEm: Date | null
    finalizadoEm: Date | null
    _count: AnalyticJobCountAggregateOutputType | null
    _min: AnalyticJobMinAggregateOutputType | null
    _max: AnalyticJobMaxAggregateOutputType | null
  }

  type GetAnalyticJobGroupByPayload<T extends AnalyticJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalyticJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalyticJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalyticJobGroupByOutputType[P]>
            : GetScalarType<T[P], AnalyticJobGroupByOutputType[P]>
        }
      >
    >


  export type AnalyticJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    status?: boolean
    payload?: boolean
    resultado?: boolean
    erro?: boolean
    criadoEm?: boolean
    iniciadoEm?: boolean
    finalizadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticJob"]>

  export type AnalyticJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    status?: boolean
    payload?: boolean
    resultado?: boolean
    erro?: boolean
    criadoEm?: boolean
    iniciadoEm?: boolean
    finalizadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticJob"]>

  export type AnalyticJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    status?: boolean
    payload?: boolean
    resultado?: boolean
    erro?: boolean
    criadoEm?: boolean
    iniciadoEm?: boolean
    finalizadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticJob"]>

  export type AnalyticJobSelectScalar = {
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    status?: boolean
    payload?: boolean
    resultado?: boolean
    erro?: boolean
    criadoEm?: boolean
    iniciadoEm?: boolean
    finalizadoEm?: boolean
  }

  export type AnalyticJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idUsuario" | "tipo" | "status" | "payload" | "resultado" | "erro" | "criadoEm" | "iniciadoEm" | "finalizadoEm", ExtArgs["result"]["analyticJob"]>
  export type AnalyticJobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type AnalyticJobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type AnalyticJobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $AnalyticJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnalyticJob"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idUsuario: string
      tipo: string
      status: string
      payload: Prisma.JsonValue
      resultado: Prisma.JsonValue | null
      erro: string | null
      criadoEm: Date
      iniciadoEm: Date | null
      finalizadoEm: Date | null
    }, ExtArgs["result"]["analyticJob"]>
    composites: {}
  }

  type AnalyticJobGetPayload<S extends boolean | null | undefined | AnalyticJobDefaultArgs> = $Result.GetResult<Prisma.$AnalyticJobPayload, S>

  type AnalyticJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnalyticJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnalyticJobCountAggregateInputType | true
    }

  export interface AnalyticJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnalyticJob'], meta: { name: 'AnalyticJob' } }
    /**
     * Find zero or one AnalyticJob that matches the filter.
     * @param {AnalyticJobFindUniqueArgs} args - Arguments to find a AnalyticJob
     * @example
     * // Get one AnalyticJob
     * const analyticJob = await prisma.analyticJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalyticJobFindUniqueArgs>(args: SelectSubset<T, AnalyticJobFindUniqueArgs<ExtArgs>>): Prisma__AnalyticJobClient<$Result.GetResult<Prisma.$AnalyticJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnalyticJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnalyticJobFindUniqueOrThrowArgs} args - Arguments to find a AnalyticJob
     * @example
     * // Get one AnalyticJob
     * const analyticJob = await prisma.analyticJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalyticJobFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalyticJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalyticJobClient<$Result.GetResult<Prisma.$AnalyticJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalyticJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticJobFindFirstArgs} args - Arguments to find a AnalyticJob
     * @example
     * // Get one AnalyticJob
     * const analyticJob = await prisma.analyticJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalyticJobFindFirstArgs>(args?: SelectSubset<T, AnalyticJobFindFirstArgs<ExtArgs>>): Prisma__AnalyticJobClient<$Result.GetResult<Prisma.$AnalyticJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalyticJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticJobFindFirstOrThrowArgs} args - Arguments to find a AnalyticJob
     * @example
     * // Get one AnalyticJob
     * const analyticJob = await prisma.analyticJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalyticJobFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalyticJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalyticJobClient<$Result.GetResult<Prisma.$AnalyticJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnalyticJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnalyticJobs
     * const analyticJobs = await prisma.analyticJob.findMany()
     * 
     * // Get first 10 AnalyticJobs
     * const analyticJobs = await prisma.analyticJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analyticJobWithIdOnly = await prisma.analyticJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalyticJobFindManyArgs>(args?: SelectSubset<T, AnalyticJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnalyticJob.
     * @param {AnalyticJobCreateArgs} args - Arguments to create a AnalyticJob.
     * @example
     * // Create one AnalyticJob
     * const AnalyticJob = await prisma.analyticJob.create({
     *   data: {
     *     // ... data to create a AnalyticJob
     *   }
     * })
     * 
     */
    create<T extends AnalyticJobCreateArgs>(args: SelectSubset<T, AnalyticJobCreateArgs<ExtArgs>>): Prisma__AnalyticJobClient<$Result.GetResult<Prisma.$AnalyticJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnalyticJobs.
     * @param {AnalyticJobCreateManyArgs} args - Arguments to create many AnalyticJobs.
     * @example
     * // Create many AnalyticJobs
     * const analyticJob = await prisma.analyticJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalyticJobCreateManyArgs>(args?: SelectSubset<T, AnalyticJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnalyticJobs and returns the data saved in the database.
     * @param {AnalyticJobCreateManyAndReturnArgs} args - Arguments to create many AnalyticJobs.
     * @example
     * // Create many AnalyticJobs
     * const analyticJob = await prisma.analyticJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnalyticJobs and only return the `id`
     * const analyticJobWithIdOnly = await prisma.analyticJob.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnalyticJobCreateManyAndReturnArgs>(args?: SelectSubset<T, AnalyticJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AnalyticJob.
     * @param {AnalyticJobDeleteArgs} args - Arguments to delete one AnalyticJob.
     * @example
     * // Delete one AnalyticJob
     * const AnalyticJob = await prisma.analyticJob.delete({
     *   where: {
     *     // ... filter to delete one AnalyticJob
     *   }
     * })
     * 
     */
    delete<T extends AnalyticJobDeleteArgs>(args: SelectSubset<T, AnalyticJobDeleteArgs<ExtArgs>>): Prisma__AnalyticJobClient<$Result.GetResult<Prisma.$AnalyticJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnalyticJob.
     * @param {AnalyticJobUpdateArgs} args - Arguments to update one AnalyticJob.
     * @example
     * // Update one AnalyticJob
     * const analyticJob = await prisma.analyticJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalyticJobUpdateArgs>(args: SelectSubset<T, AnalyticJobUpdateArgs<ExtArgs>>): Prisma__AnalyticJobClient<$Result.GetResult<Prisma.$AnalyticJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnalyticJobs.
     * @param {AnalyticJobDeleteManyArgs} args - Arguments to filter AnalyticJobs to delete.
     * @example
     * // Delete a few AnalyticJobs
     * const { count } = await prisma.analyticJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalyticJobDeleteManyArgs>(args?: SelectSubset<T, AnalyticJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalyticJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnalyticJobs
     * const analyticJob = await prisma.analyticJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalyticJobUpdateManyArgs>(args: SelectSubset<T, AnalyticJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalyticJobs and returns the data updated in the database.
     * @param {AnalyticJobUpdateManyAndReturnArgs} args - Arguments to update many AnalyticJobs.
     * @example
     * // Update many AnalyticJobs
     * const analyticJob = await prisma.analyticJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AnalyticJobs and only return the `id`
     * const analyticJobWithIdOnly = await prisma.analyticJob.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnalyticJobUpdateManyAndReturnArgs>(args: SelectSubset<T, AnalyticJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AnalyticJob.
     * @param {AnalyticJobUpsertArgs} args - Arguments to update or create a AnalyticJob.
     * @example
     * // Update or create a AnalyticJob
     * const analyticJob = await prisma.analyticJob.upsert({
     *   create: {
     *     // ... data to create a AnalyticJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnalyticJob we want to update
     *   }
     * })
     */
    upsert<T extends AnalyticJobUpsertArgs>(args: SelectSubset<T, AnalyticJobUpsertArgs<ExtArgs>>): Prisma__AnalyticJobClient<$Result.GetResult<Prisma.$AnalyticJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnalyticJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticJobCountArgs} args - Arguments to filter AnalyticJobs to count.
     * @example
     * // Count the number of AnalyticJobs
     * const count = await prisma.analyticJob.count({
     *   where: {
     *     // ... the filter for the AnalyticJobs we want to count
     *   }
     * })
    **/
    count<T extends AnalyticJobCountArgs>(
      args?: Subset<T, AnalyticJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalyticJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnalyticJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnalyticJobAggregateArgs>(args: Subset<T, AnalyticJobAggregateArgs>): Prisma.PrismaPromise<GetAnalyticJobAggregateType<T>>

    /**
     * Group by AnalyticJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticJobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnalyticJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalyticJobGroupByArgs['orderBy'] }
        : { orderBy?: AnalyticJobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnalyticJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalyticJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnalyticJob model
   */
  readonly fields: AnalyticJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnalyticJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalyticJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnalyticJob model
   */
  interface AnalyticJobFieldRefs {
    readonly id: FieldRef<"AnalyticJob", 'String'>
    readonly idUsuario: FieldRef<"AnalyticJob", 'String'>
    readonly tipo: FieldRef<"AnalyticJob", 'String'>
    readonly status: FieldRef<"AnalyticJob", 'String'>
    readonly payload: FieldRef<"AnalyticJob", 'Json'>
    readonly resultado: FieldRef<"AnalyticJob", 'Json'>
    readonly erro: FieldRef<"AnalyticJob", 'String'>
    readonly criadoEm: FieldRef<"AnalyticJob", 'DateTime'>
    readonly iniciadoEm: FieldRef<"AnalyticJob", 'DateTime'>
    readonly finalizadoEm: FieldRef<"AnalyticJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnalyticJob findUnique
   */
  export type AnalyticJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticJob
     */
    select?: AnalyticJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticJob
     */
    omit?: AnalyticJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticJobInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticJob to fetch.
     */
    where: AnalyticJobWhereUniqueInput
  }

  /**
   * AnalyticJob findUniqueOrThrow
   */
  export type AnalyticJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticJob
     */
    select?: AnalyticJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticJob
     */
    omit?: AnalyticJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticJobInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticJob to fetch.
     */
    where: AnalyticJobWhereUniqueInput
  }

  /**
   * AnalyticJob findFirst
   */
  export type AnalyticJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticJob
     */
    select?: AnalyticJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticJob
     */
    omit?: AnalyticJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticJobInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticJob to fetch.
     */
    where?: AnalyticJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticJobs to fetch.
     */
    orderBy?: AnalyticJobOrderByWithRelationInput | AnalyticJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticJobs.
     */
    cursor?: AnalyticJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticJobs.
     */
    distinct?: AnalyticJobScalarFieldEnum | AnalyticJobScalarFieldEnum[]
  }

  /**
   * AnalyticJob findFirstOrThrow
   */
  export type AnalyticJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticJob
     */
    select?: AnalyticJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticJob
     */
    omit?: AnalyticJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticJobInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticJob to fetch.
     */
    where?: AnalyticJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticJobs to fetch.
     */
    orderBy?: AnalyticJobOrderByWithRelationInput | AnalyticJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticJobs.
     */
    cursor?: AnalyticJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticJobs.
     */
    distinct?: AnalyticJobScalarFieldEnum | AnalyticJobScalarFieldEnum[]
  }

  /**
   * AnalyticJob findMany
   */
  export type AnalyticJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticJob
     */
    select?: AnalyticJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticJob
     */
    omit?: AnalyticJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticJobInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticJobs to fetch.
     */
    where?: AnalyticJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticJobs to fetch.
     */
    orderBy?: AnalyticJobOrderByWithRelationInput | AnalyticJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnalyticJobs.
     */
    cursor?: AnalyticJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticJobs.
     */
    distinct?: AnalyticJobScalarFieldEnum | AnalyticJobScalarFieldEnum[]
  }

  /**
   * AnalyticJob create
   */
  export type AnalyticJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticJob
     */
    select?: AnalyticJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticJob
     */
    omit?: AnalyticJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticJobInclude<ExtArgs> | null
    /**
     * The data needed to create a AnalyticJob.
     */
    data: XOR<AnalyticJobCreateInput, AnalyticJobUncheckedCreateInput>
  }

  /**
   * AnalyticJob createMany
   */
  export type AnalyticJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnalyticJobs.
     */
    data: AnalyticJobCreateManyInput | AnalyticJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnalyticJob createManyAndReturn
   */
  export type AnalyticJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticJob
     */
    select?: AnalyticJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticJob
     */
    omit?: AnalyticJobOmit<ExtArgs> | null
    /**
     * The data used to create many AnalyticJobs.
     */
    data: AnalyticJobCreateManyInput | AnalyticJobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticJobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnalyticJob update
   */
  export type AnalyticJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticJob
     */
    select?: AnalyticJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticJob
     */
    omit?: AnalyticJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticJobInclude<ExtArgs> | null
    /**
     * The data needed to update a AnalyticJob.
     */
    data: XOR<AnalyticJobUpdateInput, AnalyticJobUncheckedUpdateInput>
    /**
     * Choose, which AnalyticJob to update.
     */
    where: AnalyticJobWhereUniqueInput
  }

  /**
   * AnalyticJob updateMany
   */
  export type AnalyticJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnalyticJobs.
     */
    data: XOR<AnalyticJobUpdateManyMutationInput, AnalyticJobUncheckedUpdateManyInput>
    /**
     * Filter which AnalyticJobs to update
     */
    where?: AnalyticJobWhereInput
    /**
     * Limit how many AnalyticJobs to update.
     */
    limit?: number
  }

  /**
   * AnalyticJob updateManyAndReturn
   */
  export type AnalyticJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticJob
     */
    select?: AnalyticJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticJob
     */
    omit?: AnalyticJobOmit<ExtArgs> | null
    /**
     * The data used to update AnalyticJobs.
     */
    data: XOR<AnalyticJobUpdateManyMutationInput, AnalyticJobUncheckedUpdateManyInput>
    /**
     * Filter which AnalyticJobs to update
     */
    where?: AnalyticJobWhereInput
    /**
     * Limit how many AnalyticJobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticJobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnalyticJob upsert
   */
  export type AnalyticJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticJob
     */
    select?: AnalyticJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticJob
     */
    omit?: AnalyticJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticJobInclude<ExtArgs> | null
    /**
     * The filter to search for the AnalyticJob to update in case it exists.
     */
    where: AnalyticJobWhereUniqueInput
    /**
     * In case the AnalyticJob found by the `where` argument doesn't exist, create a new AnalyticJob with this data.
     */
    create: XOR<AnalyticJobCreateInput, AnalyticJobUncheckedCreateInput>
    /**
     * In case the AnalyticJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalyticJobUpdateInput, AnalyticJobUncheckedUpdateInput>
  }

  /**
   * AnalyticJob delete
   */
  export type AnalyticJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticJob
     */
    select?: AnalyticJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticJob
     */
    omit?: AnalyticJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticJobInclude<ExtArgs> | null
    /**
     * Filter which AnalyticJob to delete.
     */
    where: AnalyticJobWhereUniqueInput
  }

  /**
   * AnalyticJob deleteMany
   */
  export type AnalyticJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticJobs to delete
     */
    where?: AnalyticJobWhereInput
    /**
     * Limit how many AnalyticJobs to delete.
     */
    limit?: number
  }

  /**
   * AnalyticJob without action
   */
  export type AnalyticJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticJob
     */
    select?: AnalyticJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticJob
     */
    omit?: AnalyticJobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticJobInclude<ExtArgs> | null
  }


  /**
   * Model Insight
   */

  export type AggregateInsight = {
    _count: InsightCountAggregateOutputType | null
    _min: InsightMinAggregateOutputType | null
    _max: InsightMaxAggregateOutputType | null
  }

  export type InsightMinAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    tipo: string | null
    titulo: string | null
    descricao: string | null
    criadoEm: Date | null
  }

  export type InsightMaxAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    tipo: string | null
    titulo: string | null
    descricao: string | null
    criadoEm: Date | null
  }

  export type InsightCountAggregateOutputType = {
    id: number
    idUsuario: number
    tipo: number
    titulo: number
    descricao: number
    dados: number
    criadoEm: number
    _all: number
  }


  export type InsightMinAggregateInputType = {
    id?: true
    idUsuario?: true
    tipo?: true
    titulo?: true
    descricao?: true
    criadoEm?: true
  }

  export type InsightMaxAggregateInputType = {
    id?: true
    idUsuario?: true
    tipo?: true
    titulo?: true
    descricao?: true
    criadoEm?: true
  }

  export type InsightCountAggregateInputType = {
    id?: true
    idUsuario?: true
    tipo?: true
    titulo?: true
    descricao?: true
    dados?: true
    criadoEm?: true
    _all?: true
  }

  export type InsightAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Insight to aggregate.
     */
    where?: InsightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Insights to fetch.
     */
    orderBy?: InsightOrderByWithRelationInput | InsightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InsightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Insights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Insights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Insights
    **/
    _count?: true | InsightCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InsightMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InsightMaxAggregateInputType
  }

  export type GetInsightAggregateType<T extends InsightAggregateArgs> = {
        [P in keyof T & keyof AggregateInsight]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInsight[P]>
      : GetScalarType<T[P], AggregateInsight[P]>
  }




  export type InsightGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InsightWhereInput
    orderBy?: InsightOrderByWithAggregationInput | InsightOrderByWithAggregationInput[]
    by: InsightScalarFieldEnum[] | InsightScalarFieldEnum
    having?: InsightScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InsightCountAggregateInputType | true
    _min?: InsightMinAggregateInputType
    _max?: InsightMaxAggregateInputType
  }

  export type InsightGroupByOutputType = {
    id: string
    idUsuario: string
    tipo: string
    titulo: string
    descricao: string
    dados: JsonValue | null
    criadoEm: Date
    _count: InsightCountAggregateOutputType | null
    _min: InsightMinAggregateOutputType | null
    _max: InsightMaxAggregateOutputType | null
  }

  type GetInsightGroupByPayload<T extends InsightGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InsightGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InsightGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InsightGroupByOutputType[P]>
            : GetScalarType<T[P], InsightGroupByOutputType[P]>
        }
      >
    >


  export type InsightSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    titulo?: boolean
    descricao?: boolean
    dados?: boolean
    criadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["insight"]>

  export type InsightSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    titulo?: boolean
    descricao?: boolean
    dados?: boolean
    criadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["insight"]>

  export type InsightSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    titulo?: boolean
    descricao?: boolean
    dados?: boolean
    criadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["insight"]>

  export type InsightSelectScalar = {
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    titulo?: boolean
    descricao?: boolean
    dados?: boolean
    criadoEm?: boolean
  }

  export type InsightOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idUsuario" | "tipo" | "titulo" | "descricao" | "dados" | "criadoEm", ExtArgs["result"]["insight"]>
  export type InsightInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type InsightIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type InsightIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $InsightPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Insight"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idUsuario: string
      tipo: string
      titulo: string
      descricao: string
      dados: Prisma.JsonValue | null
      criadoEm: Date
    }, ExtArgs["result"]["insight"]>
    composites: {}
  }

  type InsightGetPayload<S extends boolean | null | undefined | InsightDefaultArgs> = $Result.GetResult<Prisma.$InsightPayload, S>

  type InsightCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InsightFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InsightCountAggregateInputType | true
    }

  export interface InsightDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Insight'], meta: { name: 'Insight' } }
    /**
     * Find zero or one Insight that matches the filter.
     * @param {InsightFindUniqueArgs} args - Arguments to find a Insight
     * @example
     * // Get one Insight
     * const insight = await prisma.insight.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InsightFindUniqueArgs>(args: SelectSubset<T, InsightFindUniqueArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Insight that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InsightFindUniqueOrThrowArgs} args - Arguments to find a Insight
     * @example
     * // Get one Insight
     * const insight = await prisma.insight.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InsightFindUniqueOrThrowArgs>(args: SelectSubset<T, InsightFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Insight that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsightFindFirstArgs} args - Arguments to find a Insight
     * @example
     * // Get one Insight
     * const insight = await prisma.insight.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InsightFindFirstArgs>(args?: SelectSubset<T, InsightFindFirstArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Insight that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsightFindFirstOrThrowArgs} args - Arguments to find a Insight
     * @example
     * // Get one Insight
     * const insight = await prisma.insight.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InsightFindFirstOrThrowArgs>(args?: SelectSubset<T, InsightFindFirstOrThrowArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Insights that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsightFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Insights
     * const insights = await prisma.insight.findMany()
     * 
     * // Get first 10 Insights
     * const insights = await prisma.insight.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const insightWithIdOnly = await prisma.insight.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InsightFindManyArgs>(args?: SelectSubset<T, InsightFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Insight.
     * @param {InsightCreateArgs} args - Arguments to create a Insight.
     * @example
     * // Create one Insight
     * const Insight = await prisma.insight.create({
     *   data: {
     *     // ... data to create a Insight
     *   }
     * })
     * 
     */
    create<T extends InsightCreateArgs>(args: SelectSubset<T, InsightCreateArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Insights.
     * @param {InsightCreateManyArgs} args - Arguments to create many Insights.
     * @example
     * // Create many Insights
     * const insight = await prisma.insight.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InsightCreateManyArgs>(args?: SelectSubset<T, InsightCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Insights and returns the data saved in the database.
     * @param {InsightCreateManyAndReturnArgs} args - Arguments to create many Insights.
     * @example
     * // Create many Insights
     * const insight = await prisma.insight.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Insights and only return the `id`
     * const insightWithIdOnly = await prisma.insight.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InsightCreateManyAndReturnArgs>(args?: SelectSubset<T, InsightCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Insight.
     * @param {InsightDeleteArgs} args - Arguments to delete one Insight.
     * @example
     * // Delete one Insight
     * const Insight = await prisma.insight.delete({
     *   where: {
     *     // ... filter to delete one Insight
     *   }
     * })
     * 
     */
    delete<T extends InsightDeleteArgs>(args: SelectSubset<T, InsightDeleteArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Insight.
     * @param {InsightUpdateArgs} args - Arguments to update one Insight.
     * @example
     * // Update one Insight
     * const insight = await prisma.insight.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InsightUpdateArgs>(args: SelectSubset<T, InsightUpdateArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Insights.
     * @param {InsightDeleteManyArgs} args - Arguments to filter Insights to delete.
     * @example
     * // Delete a few Insights
     * const { count } = await prisma.insight.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InsightDeleteManyArgs>(args?: SelectSubset<T, InsightDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Insights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsightUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Insights
     * const insight = await prisma.insight.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InsightUpdateManyArgs>(args: SelectSubset<T, InsightUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Insights and returns the data updated in the database.
     * @param {InsightUpdateManyAndReturnArgs} args - Arguments to update many Insights.
     * @example
     * // Update many Insights
     * const insight = await prisma.insight.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Insights and only return the `id`
     * const insightWithIdOnly = await prisma.insight.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InsightUpdateManyAndReturnArgs>(args: SelectSubset<T, InsightUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Insight.
     * @param {InsightUpsertArgs} args - Arguments to update or create a Insight.
     * @example
     * // Update or create a Insight
     * const insight = await prisma.insight.upsert({
     *   create: {
     *     // ... data to create a Insight
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Insight we want to update
     *   }
     * })
     */
    upsert<T extends InsightUpsertArgs>(args: SelectSubset<T, InsightUpsertArgs<ExtArgs>>): Prisma__InsightClient<$Result.GetResult<Prisma.$InsightPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Insights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsightCountArgs} args - Arguments to filter Insights to count.
     * @example
     * // Count the number of Insights
     * const count = await prisma.insight.count({
     *   where: {
     *     // ... the filter for the Insights we want to count
     *   }
     * })
    **/
    count<T extends InsightCountArgs>(
      args?: Subset<T, InsightCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InsightCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Insight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsightAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InsightAggregateArgs>(args: Subset<T, InsightAggregateArgs>): Prisma.PrismaPromise<GetInsightAggregateType<T>>

    /**
     * Group by Insight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsightGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InsightGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InsightGroupByArgs['orderBy'] }
        : { orderBy?: InsightGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InsightGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInsightGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Insight model
   */
  readonly fields: InsightFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Insight.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InsightClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Insight model
   */
  interface InsightFieldRefs {
    readonly id: FieldRef<"Insight", 'String'>
    readonly idUsuario: FieldRef<"Insight", 'String'>
    readonly tipo: FieldRef<"Insight", 'String'>
    readonly titulo: FieldRef<"Insight", 'String'>
    readonly descricao: FieldRef<"Insight", 'String'>
    readonly dados: FieldRef<"Insight", 'Json'>
    readonly criadoEm: FieldRef<"Insight", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Insight findUnique
   */
  export type InsightFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * Filter, which Insight to fetch.
     */
    where: InsightWhereUniqueInput
  }

  /**
   * Insight findUniqueOrThrow
   */
  export type InsightFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * Filter, which Insight to fetch.
     */
    where: InsightWhereUniqueInput
  }

  /**
   * Insight findFirst
   */
  export type InsightFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * Filter, which Insight to fetch.
     */
    where?: InsightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Insights to fetch.
     */
    orderBy?: InsightOrderByWithRelationInput | InsightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Insights.
     */
    cursor?: InsightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Insights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Insights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Insights.
     */
    distinct?: InsightScalarFieldEnum | InsightScalarFieldEnum[]
  }

  /**
   * Insight findFirstOrThrow
   */
  export type InsightFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * Filter, which Insight to fetch.
     */
    where?: InsightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Insights to fetch.
     */
    orderBy?: InsightOrderByWithRelationInput | InsightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Insights.
     */
    cursor?: InsightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Insights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Insights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Insights.
     */
    distinct?: InsightScalarFieldEnum | InsightScalarFieldEnum[]
  }

  /**
   * Insight findMany
   */
  export type InsightFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * Filter, which Insights to fetch.
     */
    where?: InsightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Insights to fetch.
     */
    orderBy?: InsightOrderByWithRelationInput | InsightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Insights.
     */
    cursor?: InsightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Insights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Insights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Insights.
     */
    distinct?: InsightScalarFieldEnum | InsightScalarFieldEnum[]
  }

  /**
   * Insight create
   */
  export type InsightCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * The data needed to create a Insight.
     */
    data: XOR<InsightCreateInput, InsightUncheckedCreateInput>
  }

  /**
   * Insight createMany
   */
  export type InsightCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Insights.
     */
    data: InsightCreateManyInput | InsightCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Insight createManyAndReturn
   */
  export type InsightCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * The data used to create many Insights.
     */
    data: InsightCreateManyInput | InsightCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Insight update
   */
  export type InsightUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * The data needed to update a Insight.
     */
    data: XOR<InsightUpdateInput, InsightUncheckedUpdateInput>
    /**
     * Choose, which Insight to update.
     */
    where: InsightWhereUniqueInput
  }

  /**
   * Insight updateMany
   */
  export type InsightUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Insights.
     */
    data: XOR<InsightUpdateManyMutationInput, InsightUncheckedUpdateManyInput>
    /**
     * Filter which Insights to update
     */
    where?: InsightWhereInput
    /**
     * Limit how many Insights to update.
     */
    limit?: number
  }

  /**
   * Insight updateManyAndReturn
   */
  export type InsightUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * The data used to update Insights.
     */
    data: XOR<InsightUpdateManyMutationInput, InsightUncheckedUpdateManyInput>
    /**
     * Filter which Insights to update
     */
    where?: InsightWhereInput
    /**
     * Limit how many Insights to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Insight upsert
   */
  export type InsightUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * The filter to search for the Insight to update in case it exists.
     */
    where: InsightWhereUniqueInput
    /**
     * In case the Insight found by the `where` argument doesn't exist, create a new Insight with this data.
     */
    create: XOR<InsightCreateInput, InsightUncheckedCreateInput>
    /**
     * In case the Insight was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InsightUpdateInput, InsightUncheckedUpdateInput>
  }

  /**
   * Insight delete
   */
  export type InsightDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
    /**
     * Filter which Insight to delete.
     */
    where: InsightWhereUniqueInput
  }

  /**
   * Insight deleteMany
   */
  export type InsightDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Insights to delete
     */
    where?: InsightWhereInput
    /**
     * Limit how many Insights to delete.
     */
    limit?: number
  }

  /**
   * Insight without action
   */
  export type InsightDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Insight
     */
    select?: InsightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Insight
     */
    omit?: InsightOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InsightInclude<ExtArgs> | null
  }


  /**
   * Model FinancialAlert
   */

  export type AggregateFinancialAlert = {
    _count: FinancialAlertCountAggregateOutputType | null
    _min: FinancialAlertMinAggregateOutputType | null
    _max: FinancialAlertMaxAggregateOutputType | null
  }

  export type FinancialAlertMinAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    tipo: string | null
    severidade: string | null
    titulo: string | null
    mensagem: string | null
    lidoEm: Date | null
    criadoEm: Date | null
  }

  export type FinancialAlertMaxAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    tipo: string | null
    severidade: string | null
    titulo: string | null
    mensagem: string | null
    lidoEm: Date | null
    criadoEm: Date | null
  }

  export type FinancialAlertCountAggregateOutputType = {
    id: number
    idUsuario: number
    tipo: number
    severidade: number
    titulo: number
    mensagem: number
    dados: number
    lidoEm: number
    criadoEm: number
    _all: number
  }


  export type FinancialAlertMinAggregateInputType = {
    id?: true
    idUsuario?: true
    tipo?: true
    severidade?: true
    titulo?: true
    mensagem?: true
    lidoEm?: true
    criadoEm?: true
  }

  export type FinancialAlertMaxAggregateInputType = {
    id?: true
    idUsuario?: true
    tipo?: true
    severidade?: true
    titulo?: true
    mensagem?: true
    lidoEm?: true
    criadoEm?: true
  }

  export type FinancialAlertCountAggregateInputType = {
    id?: true
    idUsuario?: true
    tipo?: true
    severidade?: true
    titulo?: true
    mensagem?: true
    dados?: true
    lidoEm?: true
    criadoEm?: true
    _all?: true
  }

  export type FinancialAlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FinancialAlert to aggregate.
     */
    where?: FinancialAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialAlerts to fetch.
     */
    orderBy?: FinancialAlertOrderByWithRelationInput | FinancialAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FinancialAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FinancialAlerts
    **/
    _count?: true | FinancialAlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FinancialAlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FinancialAlertMaxAggregateInputType
  }

  export type GetFinancialAlertAggregateType<T extends FinancialAlertAggregateArgs> = {
        [P in keyof T & keyof AggregateFinancialAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFinancialAlert[P]>
      : GetScalarType<T[P], AggregateFinancialAlert[P]>
  }




  export type FinancialAlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FinancialAlertWhereInput
    orderBy?: FinancialAlertOrderByWithAggregationInput | FinancialAlertOrderByWithAggregationInput[]
    by: FinancialAlertScalarFieldEnum[] | FinancialAlertScalarFieldEnum
    having?: FinancialAlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FinancialAlertCountAggregateInputType | true
    _min?: FinancialAlertMinAggregateInputType
    _max?: FinancialAlertMaxAggregateInputType
  }

  export type FinancialAlertGroupByOutputType = {
    id: string
    idUsuario: string
    tipo: string
    severidade: string
    titulo: string
    mensagem: string
    dados: JsonValue | null
    lidoEm: Date | null
    criadoEm: Date
    _count: FinancialAlertCountAggregateOutputType | null
    _min: FinancialAlertMinAggregateOutputType | null
    _max: FinancialAlertMaxAggregateOutputType | null
  }

  type GetFinancialAlertGroupByPayload<T extends FinancialAlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FinancialAlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FinancialAlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FinancialAlertGroupByOutputType[P]>
            : GetScalarType<T[P], FinancialAlertGroupByOutputType[P]>
        }
      >
    >


  export type FinancialAlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    severidade?: boolean
    titulo?: boolean
    mensagem?: boolean
    dados?: boolean
    lidoEm?: boolean
    criadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["financialAlert"]>

  export type FinancialAlertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    severidade?: boolean
    titulo?: boolean
    mensagem?: boolean
    dados?: boolean
    lidoEm?: boolean
    criadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["financialAlert"]>

  export type FinancialAlertSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    severidade?: boolean
    titulo?: boolean
    mensagem?: boolean
    dados?: boolean
    lidoEm?: boolean
    criadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["financialAlert"]>

  export type FinancialAlertSelectScalar = {
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    severidade?: boolean
    titulo?: boolean
    mensagem?: boolean
    dados?: boolean
    lidoEm?: boolean
    criadoEm?: boolean
  }

  export type FinancialAlertOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idUsuario" | "tipo" | "severidade" | "titulo" | "mensagem" | "dados" | "lidoEm" | "criadoEm", ExtArgs["result"]["financialAlert"]>
  export type FinancialAlertInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type FinancialAlertIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type FinancialAlertIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $FinancialAlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FinancialAlert"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idUsuario: string
      tipo: string
      severidade: string
      titulo: string
      mensagem: string
      dados: Prisma.JsonValue | null
      lidoEm: Date | null
      criadoEm: Date
    }, ExtArgs["result"]["financialAlert"]>
    composites: {}
  }

  type FinancialAlertGetPayload<S extends boolean | null | undefined | FinancialAlertDefaultArgs> = $Result.GetResult<Prisma.$FinancialAlertPayload, S>

  type FinancialAlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FinancialAlertFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FinancialAlertCountAggregateInputType | true
    }

  export interface FinancialAlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FinancialAlert'], meta: { name: 'FinancialAlert' } }
    /**
     * Find zero or one FinancialAlert that matches the filter.
     * @param {FinancialAlertFindUniqueArgs} args - Arguments to find a FinancialAlert
     * @example
     * // Get one FinancialAlert
     * const financialAlert = await prisma.financialAlert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FinancialAlertFindUniqueArgs>(args: SelectSubset<T, FinancialAlertFindUniqueArgs<ExtArgs>>): Prisma__FinancialAlertClient<$Result.GetResult<Prisma.$FinancialAlertPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FinancialAlert that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FinancialAlertFindUniqueOrThrowArgs} args - Arguments to find a FinancialAlert
     * @example
     * // Get one FinancialAlert
     * const financialAlert = await prisma.financialAlert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FinancialAlertFindUniqueOrThrowArgs>(args: SelectSubset<T, FinancialAlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FinancialAlertClient<$Result.GetResult<Prisma.$FinancialAlertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FinancialAlert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialAlertFindFirstArgs} args - Arguments to find a FinancialAlert
     * @example
     * // Get one FinancialAlert
     * const financialAlert = await prisma.financialAlert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FinancialAlertFindFirstArgs>(args?: SelectSubset<T, FinancialAlertFindFirstArgs<ExtArgs>>): Prisma__FinancialAlertClient<$Result.GetResult<Prisma.$FinancialAlertPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FinancialAlert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialAlertFindFirstOrThrowArgs} args - Arguments to find a FinancialAlert
     * @example
     * // Get one FinancialAlert
     * const financialAlert = await prisma.financialAlert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FinancialAlertFindFirstOrThrowArgs>(args?: SelectSubset<T, FinancialAlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__FinancialAlertClient<$Result.GetResult<Prisma.$FinancialAlertPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FinancialAlerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialAlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FinancialAlerts
     * const financialAlerts = await prisma.financialAlert.findMany()
     * 
     * // Get first 10 FinancialAlerts
     * const financialAlerts = await prisma.financialAlert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const financialAlertWithIdOnly = await prisma.financialAlert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FinancialAlertFindManyArgs>(args?: SelectSubset<T, FinancialAlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialAlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FinancialAlert.
     * @param {FinancialAlertCreateArgs} args - Arguments to create a FinancialAlert.
     * @example
     * // Create one FinancialAlert
     * const FinancialAlert = await prisma.financialAlert.create({
     *   data: {
     *     // ... data to create a FinancialAlert
     *   }
     * })
     * 
     */
    create<T extends FinancialAlertCreateArgs>(args: SelectSubset<T, FinancialAlertCreateArgs<ExtArgs>>): Prisma__FinancialAlertClient<$Result.GetResult<Prisma.$FinancialAlertPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FinancialAlerts.
     * @param {FinancialAlertCreateManyArgs} args - Arguments to create many FinancialAlerts.
     * @example
     * // Create many FinancialAlerts
     * const financialAlert = await prisma.financialAlert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FinancialAlertCreateManyArgs>(args?: SelectSubset<T, FinancialAlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FinancialAlerts and returns the data saved in the database.
     * @param {FinancialAlertCreateManyAndReturnArgs} args - Arguments to create many FinancialAlerts.
     * @example
     * // Create many FinancialAlerts
     * const financialAlert = await prisma.financialAlert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FinancialAlerts and only return the `id`
     * const financialAlertWithIdOnly = await prisma.financialAlert.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FinancialAlertCreateManyAndReturnArgs>(args?: SelectSubset<T, FinancialAlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialAlertPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FinancialAlert.
     * @param {FinancialAlertDeleteArgs} args - Arguments to delete one FinancialAlert.
     * @example
     * // Delete one FinancialAlert
     * const FinancialAlert = await prisma.financialAlert.delete({
     *   where: {
     *     // ... filter to delete one FinancialAlert
     *   }
     * })
     * 
     */
    delete<T extends FinancialAlertDeleteArgs>(args: SelectSubset<T, FinancialAlertDeleteArgs<ExtArgs>>): Prisma__FinancialAlertClient<$Result.GetResult<Prisma.$FinancialAlertPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FinancialAlert.
     * @param {FinancialAlertUpdateArgs} args - Arguments to update one FinancialAlert.
     * @example
     * // Update one FinancialAlert
     * const financialAlert = await prisma.financialAlert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FinancialAlertUpdateArgs>(args: SelectSubset<T, FinancialAlertUpdateArgs<ExtArgs>>): Prisma__FinancialAlertClient<$Result.GetResult<Prisma.$FinancialAlertPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FinancialAlerts.
     * @param {FinancialAlertDeleteManyArgs} args - Arguments to filter FinancialAlerts to delete.
     * @example
     * // Delete a few FinancialAlerts
     * const { count } = await prisma.financialAlert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FinancialAlertDeleteManyArgs>(args?: SelectSubset<T, FinancialAlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FinancialAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialAlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FinancialAlerts
     * const financialAlert = await prisma.financialAlert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FinancialAlertUpdateManyArgs>(args: SelectSubset<T, FinancialAlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FinancialAlerts and returns the data updated in the database.
     * @param {FinancialAlertUpdateManyAndReturnArgs} args - Arguments to update many FinancialAlerts.
     * @example
     * // Update many FinancialAlerts
     * const financialAlert = await prisma.financialAlert.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FinancialAlerts and only return the `id`
     * const financialAlertWithIdOnly = await prisma.financialAlert.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FinancialAlertUpdateManyAndReturnArgs>(args: SelectSubset<T, FinancialAlertUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FinancialAlertPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FinancialAlert.
     * @param {FinancialAlertUpsertArgs} args - Arguments to update or create a FinancialAlert.
     * @example
     * // Update or create a FinancialAlert
     * const financialAlert = await prisma.financialAlert.upsert({
     *   create: {
     *     // ... data to create a FinancialAlert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FinancialAlert we want to update
     *   }
     * })
     */
    upsert<T extends FinancialAlertUpsertArgs>(args: SelectSubset<T, FinancialAlertUpsertArgs<ExtArgs>>): Prisma__FinancialAlertClient<$Result.GetResult<Prisma.$FinancialAlertPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FinancialAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialAlertCountArgs} args - Arguments to filter FinancialAlerts to count.
     * @example
     * // Count the number of FinancialAlerts
     * const count = await prisma.financialAlert.count({
     *   where: {
     *     // ... the filter for the FinancialAlerts we want to count
     *   }
     * })
    **/
    count<T extends FinancialAlertCountArgs>(
      args?: Subset<T, FinancialAlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FinancialAlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FinancialAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialAlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FinancialAlertAggregateArgs>(args: Subset<T, FinancialAlertAggregateArgs>): Prisma.PrismaPromise<GetFinancialAlertAggregateType<T>>

    /**
     * Group by FinancialAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FinancialAlertGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FinancialAlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FinancialAlertGroupByArgs['orderBy'] }
        : { orderBy?: FinancialAlertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FinancialAlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinancialAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FinancialAlert model
   */
  readonly fields: FinancialAlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FinancialAlert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FinancialAlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FinancialAlert model
   */
  interface FinancialAlertFieldRefs {
    readonly id: FieldRef<"FinancialAlert", 'String'>
    readonly idUsuario: FieldRef<"FinancialAlert", 'String'>
    readonly tipo: FieldRef<"FinancialAlert", 'String'>
    readonly severidade: FieldRef<"FinancialAlert", 'String'>
    readonly titulo: FieldRef<"FinancialAlert", 'String'>
    readonly mensagem: FieldRef<"FinancialAlert", 'String'>
    readonly dados: FieldRef<"FinancialAlert", 'Json'>
    readonly lidoEm: FieldRef<"FinancialAlert", 'DateTime'>
    readonly criadoEm: FieldRef<"FinancialAlert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FinancialAlert findUnique
   */
  export type FinancialAlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialAlert
     */
    select?: FinancialAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialAlert
     */
    omit?: FinancialAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialAlertInclude<ExtArgs> | null
    /**
     * Filter, which FinancialAlert to fetch.
     */
    where: FinancialAlertWhereUniqueInput
  }

  /**
   * FinancialAlert findUniqueOrThrow
   */
  export type FinancialAlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialAlert
     */
    select?: FinancialAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialAlert
     */
    omit?: FinancialAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialAlertInclude<ExtArgs> | null
    /**
     * Filter, which FinancialAlert to fetch.
     */
    where: FinancialAlertWhereUniqueInput
  }

  /**
   * FinancialAlert findFirst
   */
  export type FinancialAlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialAlert
     */
    select?: FinancialAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialAlert
     */
    omit?: FinancialAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialAlertInclude<ExtArgs> | null
    /**
     * Filter, which FinancialAlert to fetch.
     */
    where?: FinancialAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialAlerts to fetch.
     */
    orderBy?: FinancialAlertOrderByWithRelationInput | FinancialAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FinancialAlerts.
     */
    cursor?: FinancialAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinancialAlerts.
     */
    distinct?: FinancialAlertScalarFieldEnum | FinancialAlertScalarFieldEnum[]
  }

  /**
   * FinancialAlert findFirstOrThrow
   */
  export type FinancialAlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialAlert
     */
    select?: FinancialAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialAlert
     */
    omit?: FinancialAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialAlertInclude<ExtArgs> | null
    /**
     * Filter, which FinancialAlert to fetch.
     */
    where?: FinancialAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialAlerts to fetch.
     */
    orderBy?: FinancialAlertOrderByWithRelationInput | FinancialAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FinancialAlerts.
     */
    cursor?: FinancialAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinancialAlerts.
     */
    distinct?: FinancialAlertScalarFieldEnum | FinancialAlertScalarFieldEnum[]
  }

  /**
   * FinancialAlert findMany
   */
  export type FinancialAlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialAlert
     */
    select?: FinancialAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialAlert
     */
    omit?: FinancialAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialAlertInclude<ExtArgs> | null
    /**
     * Filter, which FinancialAlerts to fetch.
     */
    where?: FinancialAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FinancialAlerts to fetch.
     */
    orderBy?: FinancialAlertOrderByWithRelationInput | FinancialAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FinancialAlerts.
     */
    cursor?: FinancialAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FinancialAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FinancialAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FinancialAlerts.
     */
    distinct?: FinancialAlertScalarFieldEnum | FinancialAlertScalarFieldEnum[]
  }

  /**
   * FinancialAlert create
   */
  export type FinancialAlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialAlert
     */
    select?: FinancialAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialAlert
     */
    omit?: FinancialAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialAlertInclude<ExtArgs> | null
    /**
     * The data needed to create a FinancialAlert.
     */
    data: XOR<FinancialAlertCreateInput, FinancialAlertUncheckedCreateInput>
  }

  /**
   * FinancialAlert createMany
   */
  export type FinancialAlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FinancialAlerts.
     */
    data: FinancialAlertCreateManyInput | FinancialAlertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FinancialAlert createManyAndReturn
   */
  export type FinancialAlertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialAlert
     */
    select?: FinancialAlertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialAlert
     */
    omit?: FinancialAlertOmit<ExtArgs> | null
    /**
     * The data used to create many FinancialAlerts.
     */
    data: FinancialAlertCreateManyInput | FinancialAlertCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialAlertIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FinancialAlert update
   */
  export type FinancialAlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialAlert
     */
    select?: FinancialAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialAlert
     */
    omit?: FinancialAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialAlertInclude<ExtArgs> | null
    /**
     * The data needed to update a FinancialAlert.
     */
    data: XOR<FinancialAlertUpdateInput, FinancialAlertUncheckedUpdateInput>
    /**
     * Choose, which FinancialAlert to update.
     */
    where: FinancialAlertWhereUniqueInput
  }

  /**
   * FinancialAlert updateMany
   */
  export type FinancialAlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FinancialAlerts.
     */
    data: XOR<FinancialAlertUpdateManyMutationInput, FinancialAlertUncheckedUpdateManyInput>
    /**
     * Filter which FinancialAlerts to update
     */
    where?: FinancialAlertWhereInput
    /**
     * Limit how many FinancialAlerts to update.
     */
    limit?: number
  }

  /**
   * FinancialAlert updateManyAndReturn
   */
  export type FinancialAlertUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialAlert
     */
    select?: FinancialAlertSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialAlert
     */
    omit?: FinancialAlertOmit<ExtArgs> | null
    /**
     * The data used to update FinancialAlerts.
     */
    data: XOR<FinancialAlertUpdateManyMutationInput, FinancialAlertUncheckedUpdateManyInput>
    /**
     * Filter which FinancialAlerts to update
     */
    where?: FinancialAlertWhereInput
    /**
     * Limit how many FinancialAlerts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialAlertIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FinancialAlert upsert
   */
  export type FinancialAlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialAlert
     */
    select?: FinancialAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialAlert
     */
    omit?: FinancialAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialAlertInclude<ExtArgs> | null
    /**
     * The filter to search for the FinancialAlert to update in case it exists.
     */
    where: FinancialAlertWhereUniqueInput
    /**
     * In case the FinancialAlert found by the `where` argument doesn't exist, create a new FinancialAlert with this data.
     */
    create: XOR<FinancialAlertCreateInput, FinancialAlertUncheckedCreateInput>
    /**
     * In case the FinancialAlert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FinancialAlertUpdateInput, FinancialAlertUncheckedUpdateInput>
  }

  /**
   * FinancialAlert delete
   */
  export type FinancialAlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialAlert
     */
    select?: FinancialAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialAlert
     */
    omit?: FinancialAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialAlertInclude<ExtArgs> | null
    /**
     * Filter which FinancialAlert to delete.
     */
    where: FinancialAlertWhereUniqueInput
  }

  /**
   * FinancialAlert deleteMany
   */
  export type FinancialAlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FinancialAlerts to delete
     */
    where?: FinancialAlertWhereInput
    /**
     * Limit how many FinancialAlerts to delete.
     */
    limit?: number
  }

  /**
   * FinancialAlert without action
   */
  export type FinancialAlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FinancialAlert
     */
    select?: FinancialAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FinancialAlert
     */
    omit?: FinancialAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FinancialAlertInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    tipo: string | null
    titulo: string | null
    mensagem: string | null
    canal: string | null
    status: string | null
    enviadaEm: Date | null
    lidaEm: Date | null
    erro: string | null
    criadoEm: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    idUsuario: string | null
    tipo: string | null
    titulo: string | null
    mensagem: string | null
    canal: string | null
    status: string | null
    enviadaEm: Date | null
    lidaEm: Date | null
    erro: string | null
    criadoEm: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    idUsuario: number
    tipo: number
    titulo: number
    mensagem: number
    canal: number
    status: number
    dados: number
    enviadaEm: number
    lidaEm: number
    erro: number
    criadoEm: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    idUsuario?: true
    tipo?: true
    titulo?: true
    mensagem?: true
    canal?: true
    status?: true
    enviadaEm?: true
    lidaEm?: true
    erro?: true
    criadoEm?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    idUsuario?: true
    tipo?: true
    titulo?: true
    mensagem?: true
    canal?: true
    status?: true
    enviadaEm?: true
    lidaEm?: true
    erro?: true
    criadoEm?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    idUsuario?: true
    tipo?: true
    titulo?: true
    mensagem?: true
    canal?: true
    status?: true
    dados?: true
    enviadaEm?: true
    lidaEm?: true
    erro?: true
    criadoEm?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    idUsuario: string
    tipo: string
    titulo: string
    mensagem: string
    canal: string
    status: string
    dados: JsonValue | null
    enviadaEm: Date | null
    lidaEm: Date | null
    erro: string | null
    criadoEm: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    titulo?: boolean
    mensagem?: boolean
    canal?: boolean
    status?: boolean
    dados?: boolean
    enviadaEm?: boolean
    lidaEm?: boolean
    erro?: boolean
    criadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    titulo?: boolean
    mensagem?: boolean
    canal?: boolean
    status?: boolean
    dados?: boolean
    enviadaEm?: boolean
    lidaEm?: boolean
    erro?: boolean
    criadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    titulo?: boolean
    mensagem?: boolean
    canal?: boolean
    status?: boolean
    dados?: boolean
    enviadaEm?: boolean
    lidaEm?: boolean
    erro?: boolean
    criadoEm?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    idUsuario?: boolean
    tipo?: boolean
    titulo?: boolean
    mensagem?: boolean
    canal?: boolean
    status?: boolean
    dados?: boolean
    enviadaEm?: boolean
    lidaEm?: boolean
    erro?: boolean
    criadoEm?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idUsuario" | "tipo" | "titulo" | "mensagem" | "canal" | "status" | "dados" | "enviadaEm" | "lidaEm" | "erro" | "criadoEm", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idUsuario: string
      tipo: string
      titulo: string
      mensagem: string
      canal: string
      status: string
      dados: Prisma.JsonValue | null
      enviadaEm: Date | null
      lidaEm: Date | null
      erro: string | null
      criadoEm: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly idUsuario: FieldRef<"Notification", 'String'>
    readonly tipo: FieldRef<"Notification", 'String'>
    readonly titulo: FieldRef<"Notification", 'String'>
    readonly mensagem: FieldRef<"Notification", 'String'>
    readonly canal: FieldRef<"Notification", 'String'>
    readonly status: FieldRef<"Notification", 'String'>
    readonly dados: FieldRef<"Notification", 'Json'>
    readonly enviadaEm: FieldRef<"Notification", 'DateTime'>
    readonly lidaEm: FieldRef<"Notification", 'DateTime'>
    readonly erro: FieldRef<"Notification", 'String'>
    readonly criadoEm: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    email: 'email',
    senhaHash: 'senhaHash',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const CategoriaScalarFieldEnum: {
    id: 'id',
    idUsuario: 'idUsuario',
    nome: 'nome',
    tipo: 'tipo',
    ehPadrao: 'ehPadrao',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type CategoriaScalarFieldEnum = (typeof CategoriaScalarFieldEnum)[keyof typeof CategoriaScalarFieldEnum]


  export const LancamentoScalarFieldEnum: {
    id: 'id',
    idUsuario: 'idUsuario',
    idCategoria: 'idCategoria',
    idConta: 'idConta',
    valor: 'valor',
    dataTransacao: 'dataTransacao',
    recorrencia: 'recorrencia',
    tipo: 'tipo',
    descricao: 'descricao',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type LancamentoScalarFieldEnum = (typeof LancamentoScalarFieldEnum)[keyof typeof LancamentoScalarFieldEnum]


  export const ContaScalarFieldEnum: {
    id: 'id',
    idUsuario: 'idUsuario',
    nome: 'nome',
    tipo: 'tipo',
    saldoInicial: 'saldoInicial',
    modeloCartao: 'modeloCartao',
    descricao: 'descricao',
    ativa: 'ativa',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type ContaScalarFieldEnum = (typeof ContaScalarFieldEnum)[keyof typeof ContaScalarFieldEnum]


  export const OrcamentoScalarFieldEnum: {
    id: 'id',
    idUsuario: 'idUsuario',
    idCategoria: 'idCategoria',
    valor: 'valor',
    mes: 'mes',
    ano: 'ano',
    descricao: 'descricao',
    criadoEm: 'criadoEm',
    atualizadoEm: 'atualizadoEm'
  };

  export type OrcamentoScalarFieldEnum = (typeof OrcamentoScalarFieldEnum)[keyof typeof OrcamentoScalarFieldEnum]


  export const AnalyticJobScalarFieldEnum: {
    id: 'id',
    idUsuario: 'idUsuario',
    tipo: 'tipo',
    status: 'status',
    payload: 'payload',
    resultado: 'resultado',
    erro: 'erro',
    criadoEm: 'criadoEm',
    iniciadoEm: 'iniciadoEm',
    finalizadoEm: 'finalizadoEm'
  };

  export type AnalyticJobScalarFieldEnum = (typeof AnalyticJobScalarFieldEnum)[keyof typeof AnalyticJobScalarFieldEnum]


  export const InsightScalarFieldEnum: {
    id: 'id',
    idUsuario: 'idUsuario',
    tipo: 'tipo',
    titulo: 'titulo',
    descricao: 'descricao',
    dados: 'dados',
    criadoEm: 'criadoEm'
  };

  export type InsightScalarFieldEnum = (typeof InsightScalarFieldEnum)[keyof typeof InsightScalarFieldEnum]


  export const FinancialAlertScalarFieldEnum: {
    id: 'id',
    idUsuario: 'idUsuario',
    tipo: 'tipo',
    severidade: 'severidade',
    titulo: 'titulo',
    mensagem: 'mensagem',
    dados: 'dados',
    lidoEm: 'lidoEm',
    criadoEm: 'criadoEm'
  };

  export type FinancialAlertScalarFieldEnum = (typeof FinancialAlertScalarFieldEnum)[keyof typeof FinancialAlertScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    idUsuario: 'idUsuario',
    tipo: 'tipo',
    titulo: 'titulo',
    mensagem: 'mensagem',
    canal: 'canal',
    status: 'status',
    dados: 'dados',
    enviadaEm: 'enviadaEm',
    lidaEm: 'lidaEm',
    erro: 'erro',
    criadoEm: 'criadoEm'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TipoCategoria'
   */
  export type EnumTipoCategoriaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoCategoria'>
    


  /**
   * Reference to a field of type 'TipoCategoria[]'
   */
  export type ListEnumTipoCategoriaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoCategoria[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'TipoRecorrencia'
   */
  export type EnumTipoRecorrenciaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoRecorrencia'>
    


  /**
   * Reference to a field of type 'TipoRecorrencia[]'
   */
  export type ListEnumTipoRecorrenciaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoRecorrencia[]'>
    


  /**
   * Reference to a field of type 'TipoLancamento'
   */
  export type EnumTipoLancamentoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoLancamento'>
    


  /**
   * Reference to a field of type 'TipoLancamento[]'
   */
  export type ListEnumTipoLancamentoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoLancamento[]'>
    


  /**
   * Reference to a field of type 'TipoContaBancaria'
   */
  export type EnumTipoContaBancariaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoContaBancaria'>
    


  /**
   * Reference to a field of type 'TipoContaBancaria[]'
   */
  export type ListEnumTipoContaBancariaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoContaBancaria[]'>
    


  /**
   * Reference to a field of type 'ModeloCartao'
   */
  export type EnumModeloCartaoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModeloCartao'>
    


  /**
   * Reference to a field of type 'ModeloCartao[]'
   */
  export type ListEnumModeloCartaoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModeloCartao[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: StringFilter<"Usuario"> | string
    nome?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    senhaHash?: StringFilter<"Usuario"> | string
    criadoEm?: DateTimeFilter<"Usuario"> | Date | string
    atualizadoEm?: DateTimeFilter<"Usuario"> | Date | string
    categorias?: CategoriaListRelationFilter
    lancamentos?: LancamentoListRelationFilter
    orcamentos?: OrcamentoListRelationFilter
    contas?: ContaListRelationFilter
    analyticJobs?: AnalyticJobListRelationFilter
    insights?: InsightListRelationFilter
    alertas?: FinancialAlertListRelationFilter
    notificacoes?: NotificationListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senhaHash?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    categorias?: CategoriaOrderByRelationAggregateInput
    lancamentos?: LancamentoOrderByRelationAggregateInput
    orcamentos?: OrcamentoOrderByRelationAggregateInput
    contas?: ContaOrderByRelationAggregateInput
    analyticJobs?: AnalyticJobOrderByRelationAggregateInput
    insights?: InsightOrderByRelationAggregateInput
    alertas?: FinancialAlertOrderByRelationAggregateInput
    notificacoes?: NotificationOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nome?: StringFilter<"Usuario"> | string
    senhaHash?: StringFilter<"Usuario"> | string
    criadoEm?: DateTimeFilter<"Usuario"> | Date | string
    atualizadoEm?: DateTimeFilter<"Usuario"> | Date | string
    categorias?: CategoriaListRelationFilter
    lancamentos?: LancamentoListRelationFilter
    orcamentos?: OrcamentoListRelationFilter
    contas?: ContaListRelationFilter
    analyticJobs?: AnalyticJobListRelationFilter
    insights?: InsightListRelationFilter
    alertas?: FinancialAlertListRelationFilter
    notificacoes?: NotificationListRelationFilter
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senhaHash?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Usuario"> | string
    nome?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    senhaHash?: StringWithAggregatesFilter<"Usuario"> | string
    criadoEm?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type CategoriaWhereInput = {
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    id?: StringFilter<"Categoria"> | string
    idUsuario?: StringNullableFilter<"Categoria"> | string | null
    nome?: StringFilter<"Categoria"> | string
    tipo?: EnumTipoCategoriaFilter<"Categoria"> | $Enums.TipoCategoria
    ehPadrao?: BoolFilter<"Categoria"> | boolean
    criadoEm?: DateTimeFilter<"Categoria"> | Date | string
    atualizadoEm?: DateTimeFilter<"Categoria"> | Date | string
    usuario?: XOR<UsuarioNullableScalarRelationFilter, UsuarioWhereInput> | null
    lancamentos?: LancamentoListRelationFilter
    orcamentos?: OrcamentoListRelationFilter
  }

  export type CategoriaOrderByWithRelationInput = {
    id?: SortOrder
    idUsuario?: SortOrderInput | SortOrder
    nome?: SortOrder
    tipo?: SortOrder
    ehPadrao?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    lancamentos?: LancamentoOrderByRelationAggregateInput
    orcamentos?: OrcamentoOrderByRelationAggregateInput
  }

  export type CategoriaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    idUsuario?: StringNullableFilter<"Categoria"> | string | null
    nome?: StringFilter<"Categoria"> | string
    tipo?: EnumTipoCategoriaFilter<"Categoria"> | $Enums.TipoCategoria
    ehPadrao?: BoolFilter<"Categoria"> | boolean
    criadoEm?: DateTimeFilter<"Categoria"> | Date | string
    atualizadoEm?: DateTimeFilter<"Categoria"> | Date | string
    usuario?: XOR<UsuarioNullableScalarRelationFilter, UsuarioWhereInput> | null
    lancamentos?: LancamentoListRelationFilter
    orcamentos?: OrcamentoListRelationFilter
  }, "id">

  export type CategoriaOrderByWithAggregationInput = {
    id?: SortOrder
    idUsuario?: SortOrderInput | SortOrder
    nome?: SortOrder
    tipo?: SortOrder
    ehPadrao?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: CategoriaCountOrderByAggregateInput
    _max?: CategoriaMaxOrderByAggregateInput
    _min?: CategoriaMinOrderByAggregateInput
  }

  export type CategoriaScalarWhereWithAggregatesInput = {
    AND?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    OR?: CategoriaScalarWhereWithAggregatesInput[]
    NOT?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Categoria"> | string
    idUsuario?: StringNullableWithAggregatesFilter<"Categoria"> | string | null
    nome?: StringWithAggregatesFilter<"Categoria"> | string
    tipo?: EnumTipoCategoriaWithAggregatesFilter<"Categoria"> | $Enums.TipoCategoria
    ehPadrao?: BoolWithAggregatesFilter<"Categoria"> | boolean
    criadoEm?: DateTimeWithAggregatesFilter<"Categoria"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Categoria"> | Date | string
  }

  export type LancamentoWhereInput = {
    AND?: LancamentoWhereInput | LancamentoWhereInput[]
    OR?: LancamentoWhereInput[]
    NOT?: LancamentoWhereInput | LancamentoWhereInput[]
    id?: StringFilter<"Lancamento"> | string
    idUsuario?: StringFilter<"Lancamento"> | string
    idCategoria?: StringFilter<"Lancamento"> | string
    idConta?: StringNullableFilter<"Lancamento"> | string | null
    valor?: DecimalFilter<"Lancamento"> | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFilter<"Lancamento"> | Date | string
    recorrencia?: EnumTipoRecorrenciaFilter<"Lancamento"> | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFilter<"Lancamento"> | $Enums.TipoLancamento
    descricao?: StringNullableFilter<"Lancamento"> | string | null
    criadoEm?: DateTimeFilter<"Lancamento"> | Date | string
    atualizadoEm?: DateTimeFilter<"Lancamento"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
    conta?: XOR<ContaNullableScalarRelationFilter, ContaWhereInput> | null
  }

  export type LancamentoOrderByWithRelationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    idCategoria?: SortOrder
    idConta?: SortOrderInput | SortOrder
    valor?: SortOrder
    dataTransacao?: SortOrder
    recorrencia?: SortOrder
    tipo?: SortOrder
    descricao?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    categoria?: CategoriaOrderByWithRelationInput
    conta?: ContaOrderByWithRelationInput
  }

  export type LancamentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LancamentoWhereInput | LancamentoWhereInput[]
    OR?: LancamentoWhereInput[]
    NOT?: LancamentoWhereInput | LancamentoWhereInput[]
    idUsuario?: StringFilter<"Lancamento"> | string
    idCategoria?: StringFilter<"Lancamento"> | string
    idConta?: StringNullableFilter<"Lancamento"> | string | null
    valor?: DecimalFilter<"Lancamento"> | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFilter<"Lancamento"> | Date | string
    recorrencia?: EnumTipoRecorrenciaFilter<"Lancamento"> | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFilter<"Lancamento"> | $Enums.TipoLancamento
    descricao?: StringNullableFilter<"Lancamento"> | string | null
    criadoEm?: DateTimeFilter<"Lancamento"> | Date | string
    atualizadoEm?: DateTimeFilter<"Lancamento"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
    conta?: XOR<ContaNullableScalarRelationFilter, ContaWhereInput> | null
  }, "id">

  export type LancamentoOrderByWithAggregationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    idCategoria?: SortOrder
    idConta?: SortOrderInput | SortOrder
    valor?: SortOrder
    dataTransacao?: SortOrder
    recorrencia?: SortOrder
    tipo?: SortOrder
    descricao?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: LancamentoCountOrderByAggregateInput
    _avg?: LancamentoAvgOrderByAggregateInput
    _max?: LancamentoMaxOrderByAggregateInput
    _min?: LancamentoMinOrderByAggregateInput
    _sum?: LancamentoSumOrderByAggregateInput
  }

  export type LancamentoScalarWhereWithAggregatesInput = {
    AND?: LancamentoScalarWhereWithAggregatesInput | LancamentoScalarWhereWithAggregatesInput[]
    OR?: LancamentoScalarWhereWithAggregatesInput[]
    NOT?: LancamentoScalarWhereWithAggregatesInput | LancamentoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lancamento"> | string
    idUsuario?: StringWithAggregatesFilter<"Lancamento"> | string
    idCategoria?: StringWithAggregatesFilter<"Lancamento"> | string
    idConta?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    valor?: DecimalWithAggregatesFilter<"Lancamento"> | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeWithAggregatesFilter<"Lancamento"> | Date | string
    recorrencia?: EnumTipoRecorrenciaWithAggregatesFilter<"Lancamento"> | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoWithAggregatesFilter<"Lancamento"> | $Enums.TipoLancamento
    descricao?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"Lancamento"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Lancamento"> | Date | string
  }

  export type ContaWhereInput = {
    AND?: ContaWhereInput | ContaWhereInput[]
    OR?: ContaWhereInput[]
    NOT?: ContaWhereInput | ContaWhereInput[]
    id?: StringFilter<"Conta"> | string
    idUsuario?: StringFilter<"Conta"> | string
    nome?: StringFilter<"Conta"> | string
    tipo?: EnumTipoContaBancariaFilter<"Conta"> | $Enums.TipoContaBancaria
    saldoInicial?: DecimalFilter<"Conta"> | Decimal | DecimalJsLike | number | string
    modeloCartao?: EnumModeloCartaoFilter<"Conta"> | $Enums.ModeloCartao
    descricao?: StringNullableFilter<"Conta"> | string | null
    ativa?: BoolFilter<"Conta"> | boolean
    criadoEm?: DateTimeFilter<"Conta"> | Date | string
    atualizadoEm?: DateTimeFilter<"Conta"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    lancamentos?: LancamentoListRelationFilter
  }

  export type ContaOrderByWithRelationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    nome?: SortOrder
    tipo?: SortOrder
    saldoInicial?: SortOrder
    modeloCartao?: SortOrder
    descricao?: SortOrderInput | SortOrder
    ativa?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    lancamentos?: LancamentoOrderByRelationAggregateInput
  }

  export type ContaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idUsuario_nome?: ContaIdUsuarioNomeCompoundUniqueInput
    AND?: ContaWhereInput | ContaWhereInput[]
    OR?: ContaWhereInput[]
    NOT?: ContaWhereInput | ContaWhereInput[]
    idUsuario?: StringFilter<"Conta"> | string
    nome?: StringFilter<"Conta"> | string
    tipo?: EnumTipoContaBancariaFilter<"Conta"> | $Enums.TipoContaBancaria
    saldoInicial?: DecimalFilter<"Conta"> | Decimal | DecimalJsLike | number | string
    modeloCartao?: EnumModeloCartaoFilter<"Conta"> | $Enums.ModeloCartao
    descricao?: StringNullableFilter<"Conta"> | string | null
    ativa?: BoolFilter<"Conta"> | boolean
    criadoEm?: DateTimeFilter<"Conta"> | Date | string
    atualizadoEm?: DateTimeFilter<"Conta"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    lancamentos?: LancamentoListRelationFilter
  }, "id" | "idUsuario_nome">

  export type ContaOrderByWithAggregationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    nome?: SortOrder
    tipo?: SortOrder
    saldoInicial?: SortOrder
    modeloCartao?: SortOrder
    descricao?: SortOrderInput | SortOrder
    ativa?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: ContaCountOrderByAggregateInput
    _avg?: ContaAvgOrderByAggregateInput
    _max?: ContaMaxOrderByAggregateInput
    _min?: ContaMinOrderByAggregateInput
    _sum?: ContaSumOrderByAggregateInput
  }

  export type ContaScalarWhereWithAggregatesInput = {
    AND?: ContaScalarWhereWithAggregatesInput | ContaScalarWhereWithAggregatesInput[]
    OR?: ContaScalarWhereWithAggregatesInput[]
    NOT?: ContaScalarWhereWithAggregatesInput | ContaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conta"> | string
    idUsuario?: StringWithAggregatesFilter<"Conta"> | string
    nome?: StringWithAggregatesFilter<"Conta"> | string
    tipo?: EnumTipoContaBancariaWithAggregatesFilter<"Conta"> | $Enums.TipoContaBancaria
    saldoInicial?: DecimalWithAggregatesFilter<"Conta"> | Decimal | DecimalJsLike | number | string
    modeloCartao?: EnumModeloCartaoWithAggregatesFilter<"Conta"> | $Enums.ModeloCartao
    descricao?: StringNullableWithAggregatesFilter<"Conta"> | string | null
    ativa?: BoolWithAggregatesFilter<"Conta"> | boolean
    criadoEm?: DateTimeWithAggregatesFilter<"Conta"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Conta"> | Date | string
  }

  export type OrcamentoWhereInput = {
    AND?: OrcamentoWhereInput | OrcamentoWhereInput[]
    OR?: OrcamentoWhereInput[]
    NOT?: OrcamentoWhereInput | OrcamentoWhereInput[]
    id?: StringFilter<"Orcamento"> | string
    idUsuario?: StringFilter<"Orcamento"> | string
    idCategoria?: StringNullableFilter<"Orcamento"> | string | null
    valor?: DecimalFilter<"Orcamento"> | Decimal | DecimalJsLike | number | string
    mes?: IntFilter<"Orcamento"> | number
    ano?: IntFilter<"Orcamento"> | number
    descricao?: StringNullableFilter<"Orcamento"> | string | null
    criadoEm?: DateTimeFilter<"Orcamento"> | Date | string
    atualizadoEm?: DateTimeFilter<"Orcamento"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    categoria?: XOR<CategoriaNullableScalarRelationFilter, CategoriaWhereInput> | null
  }

  export type OrcamentoOrderByWithRelationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    idCategoria?: SortOrderInput | SortOrder
    valor?: SortOrder
    mes?: SortOrder
    ano?: SortOrder
    descricao?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    categoria?: CategoriaOrderByWithRelationInput
  }

  export type OrcamentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrcamentoWhereInput | OrcamentoWhereInput[]
    OR?: OrcamentoWhereInput[]
    NOT?: OrcamentoWhereInput | OrcamentoWhereInput[]
    idUsuario?: StringFilter<"Orcamento"> | string
    idCategoria?: StringNullableFilter<"Orcamento"> | string | null
    valor?: DecimalFilter<"Orcamento"> | Decimal | DecimalJsLike | number | string
    mes?: IntFilter<"Orcamento"> | number
    ano?: IntFilter<"Orcamento"> | number
    descricao?: StringNullableFilter<"Orcamento"> | string | null
    criadoEm?: DateTimeFilter<"Orcamento"> | Date | string
    atualizadoEm?: DateTimeFilter<"Orcamento"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    categoria?: XOR<CategoriaNullableScalarRelationFilter, CategoriaWhereInput> | null
  }, "id">

  export type OrcamentoOrderByWithAggregationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    idCategoria?: SortOrderInput | SortOrder
    valor?: SortOrder
    mes?: SortOrder
    ano?: SortOrder
    descricao?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
    _count?: OrcamentoCountOrderByAggregateInput
    _avg?: OrcamentoAvgOrderByAggregateInput
    _max?: OrcamentoMaxOrderByAggregateInput
    _min?: OrcamentoMinOrderByAggregateInput
    _sum?: OrcamentoSumOrderByAggregateInput
  }

  export type OrcamentoScalarWhereWithAggregatesInput = {
    AND?: OrcamentoScalarWhereWithAggregatesInput | OrcamentoScalarWhereWithAggregatesInput[]
    OR?: OrcamentoScalarWhereWithAggregatesInput[]
    NOT?: OrcamentoScalarWhereWithAggregatesInput | OrcamentoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Orcamento"> | string
    idUsuario?: StringWithAggregatesFilter<"Orcamento"> | string
    idCategoria?: StringNullableWithAggregatesFilter<"Orcamento"> | string | null
    valor?: DecimalWithAggregatesFilter<"Orcamento"> | Decimal | DecimalJsLike | number | string
    mes?: IntWithAggregatesFilter<"Orcamento"> | number
    ano?: IntWithAggregatesFilter<"Orcamento"> | number
    descricao?: StringNullableWithAggregatesFilter<"Orcamento"> | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"Orcamento"> | Date | string
    atualizadoEm?: DateTimeWithAggregatesFilter<"Orcamento"> | Date | string
  }

  export type AnalyticJobWhereInput = {
    AND?: AnalyticJobWhereInput | AnalyticJobWhereInput[]
    OR?: AnalyticJobWhereInput[]
    NOT?: AnalyticJobWhereInput | AnalyticJobWhereInput[]
    id?: StringFilter<"AnalyticJob"> | string
    idUsuario?: StringFilter<"AnalyticJob"> | string
    tipo?: StringFilter<"AnalyticJob"> | string
    status?: StringFilter<"AnalyticJob"> | string
    payload?: JsonFilter<"AnalyticJob">
    resultado?: JsonNullableFilter<"AnalyticJob">
    erro?: StringNullableFilter<"AnalyticJob"> | string | null
    criadoEm?: DateTimeFilter<"AnalyticJob"> | Date | string
    iniciadoEm?: DateTimeNullableFilter<"AnalyticJob"> | Date | string | null
    finalizadoEm?: DateTimeNullableFilter<"AnalyticJob"> | Date | string | null
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type AnalyticJobOrderByWithRelationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    status?: SortOrder
    payload?: SortOrder
    resultado?: SortOrderInput | SortOrder
    erro?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    iniciadoEm?: SortOrderInput | SortOrder
    finalizadoEm?: SortOrderInput | SortOrder
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type AnalyticJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnalyticJobWhereInput | AnalyticJobWhereInput[]
    OR?: AnalyticJobWhereInput[]
    NOT?: AnalyticJobWhereInput | AnalyticJobWhereInput[]
    idUsuario?: StringFilter<"AnalyticJob"> | string
    tipo?: StringFilter<"AnalyticJob"> | string
    status?: StringFilter<"AnalyticJob"> | string
    payload?: JsonFilter<"AnalyticJob">
    resultado?: JsonNullableFilter<"AnalyticJob">
    erro?: StringNullableFilter<"AnalyticJob"> | string | null
    criadoEm?: DateTimeFilter<"AnalyticJob"> | Date | string
    iniciadoEm?: DateTimeNullableFilter<"AnalyticJob"> | Date | string | null
    finalizadoEm?: DateTimeNullableFilter<"AnalyticJob"> | Date | string | null
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id">

  export type AnalyticJobOrderByWithAggregationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    status?: SortOrder
    payload?: SortOrder
    resultado?: SortOrderInput | SortOrder
    erro?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    iniciadoEm?: SortOrderInput | SortOrder
    finalizadoEm?: SortOrderInput | SortOrder
    _count?: AnalyticJobCountOrderByAggregateInput
    _max?: AnalyticJobMaxOrderByAggregateInput
    _min?: AnalyticJobMinOrderByAggregateInput
  }

  export type AnalyticJobScalarWhereWithAggregatesInput = {
    AND?: AnalyticJobScalarWhereWithAggregatesInput | AnalyticJobScalarWhereWithAggregatesInput[]
    OR?: AnalyticJobScalarWhereWithAggregatesInput[]
    NOT?: AnalyticJobScalarWhereWithAggregatesInput | AnalyticJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnalyticJob"> | string
    idUsuario?: StringWithAggregatesFilter<"AnalyticJob"> | string
    tipo?: StringWithAggregatesFilter<"AnalyticJob"> | string
    status?: StringWithAggregatesFilter<"AnalyticJob"> | string
    payload?: JsonWithAggregatesFilter<"AnalyticJob">
    resultado?: JsonNullableWithAggregatesFilter<"AnalyticJob">
    erro?: StringNullableWithAggregatesFilter<"AnalyticJob"> | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"AnalyticJob"> | Date | string
    iniciadoEm?: DateTimeNullableWithAggregatesFilter<"AnalyticJob"> | Date | string | null
    finalizadoEm?: DateTimeNullableWithAggregatesFilter<"AnalyticJob"> | Date | string | null
  }

  export type InsightWhereInput = {
    AND?: InsightWhereInput | InsightWhereInput[]
    OR?: InsightWhereInput[]
    NOT?: InsightWhereInput | InsightWhereInput[]
    id?: StringFilter<"Insight"> | string
    idUsuario?: StringFilter<"Insight"> | string
    tipo?: StringFilter<"Insight"> | string
    titulo?: StringFilter<"Insight"> | string
    descricao?: StringFilter<"Insight"> | string
    dados?: JsonNullableFilter<"Insight">
    criadoEm?: DateTimeFilter<"Insight"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type InsightOrderByWithRelationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    dados?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type InsightWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InsightWhereInput | InsightWhereInput[]
    OR?: InsightWhereInput[]
    NOT?: InsightWhereInput | InsightWhereInput[]
    idUsuario?: StringFilter<"Insight"> | string
    tipo?: StringFilter<"Insight"> | string
    titulo?: StringFilter<"Insight"> | string
    descricao?: StringFilter<"Insight"> | string
    dados?: JsonNullableFilter<"Insight">
    criadoEm?: DateTimeFilter<"Insight"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id">

  export type InsightOrderByWithAggregationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    dados?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    _count?: InsightCountOrderByAggregateInput
    _max?: InsightMaxOrderByAggregateInput
    _min?: InsightMinOrderByAggregateInput
  }

  export type InsightScalarWhereWithAggregatesInput = {
    AND?: InsightScalarWhereWithAggregatesInput | InsightScalarWhereWithAggregatesInput[]
    OR?: InsightScalarWhereWithAggregatesInput[]
    NOT?: InsightScalarWhereWithAggregatesInput | InsightScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Insight"> | string
    idUsuario?: StringWithAggregatesFilter<"Insight"> | string
    tipo?: StringWithAggregatesFilter<"Insight"> | string
    titulo?: StringWithAggregatesFilter<"Insight"> | string
    descricao?: StringWithAggregatesFilter<"Insight"> | string
    dados?: JsonNullableWithAggregatesFilter<"Insight">
    criadoEm?: DateTimeWithAggregatesFilter<"Insight"> | Date | string
  }

  export type FinancialAlertWhereInput = {
    AND?: FinancialAlertWhereInput | FinancialAlertWhereInput[]
    OR?: FinancialAlertWhereInput[]
    NOT?: FinancialAlertWhereInput | FinancialAlertWhereInput[]
    id?: StringFilter<"FinancialAlert"> | string
    idUsuario?: StringFilter<"FinancialAlert"> | string
    tipo?: StringFilter<"FinancialAlert"> | string
    severidade?: StringFilter<"FinancialAlert"> | string
    titulo?: StringFilter<"FinancialAlert"> | string
    mensagem?: StringFilter<"FinancialAlert"> | string
    dados?: JsonNullableFilter<"FinancialAlert">
    lidoEm?: DateTimeNullableFilter<"FinancialAlert"> | Date | string | null
    criadoEm?: DateTimeFilter<"FinancialAlert"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type FinancialAlertOrderByWithRelationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    severidade?: SortOrder
    titulo?: SortOrder
    mensagem?: SortOrder
    dados?: SortOrderInput | SortOrder
    lidoEm?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type FinancialAlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FinancialAlertWhereInput | FinancialAlertWhereInput[]
    OR?: FinancialAlertWhereInput[]
    NOT?: FinancialAlertWhereInput | FinancialAlertWhereInput[]
    idUsuario?: StringFilter<"FinancialAlert"> | string
    tipo?: StringFilter<"FinancialAlert"> | string
    severidade?: StringFilter<"FinancialAlert"> | string
    titulo?: StringFilter<"FinancialAlert"> | string
    mensagem?: StringFilter<"FinancialAlert"> | string
    dados?: JsonNullableFilter<"FinancialAlert">
    lidoEm?: DateTimeNullableFilter<"FinancialAlert"> | Date | string | null
    criadoEm?: DateTimeFilter<"FinancialAlert"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id">

  export type FinancialAlertOrderByWithAggregationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    severidade?: SortOrder
    titulo?: SortOrder
    mensagem?: SortOrder
    dados?: SortOrderInput | SortOrder
    lidoEm?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    _count?: FinancialAlertCountOrderByAggregateInput
    _max?: FinancialAlertMaxOrderByAggregateInput
    _min?: FinancialAlertMinOrderByAggregateInput
  }

  export type FinancialAlertScalarWhereWithAggregatesInput = {
    AND?: FinancialAlertScalarWhereWithAggregatesInput | FinancialAlertScalarWhereWithAggregatesInput[]
    OR?: FinancialAlertScalarWhereWithAggregatesInput[]
    NOT?: FinancialAlertScalarWhereWithAggregatesInput | FinancialAlertScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FinancialAlert"> | string
    idUsuario?: StringWithAggregatesFilter<"FinancialAlert"> | string
    tipo?: StringWithAggregatesFilter<"FinancialAlert"> | string
    severidade?: StringWithAggregatesFilter<"FinancialAlert"> | string
    titulo?: StringWithAggregatesFilter<"FinancialAlert"> | string
    mensagem?: StringWithAggregatesFilter<"FinancialAlert"> | string
    dados?: JsonNullableWithAggregatesFilter<"FinancialAlert">
    lidoEm?: DateTimeNullableWithAggregatesFilter<"FinancialAlert"> | Date | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"FinancialAlert"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    idUsuario?: StringFilter<"Notification"> | string
    tipo?: StringFilter<"Notification"> | string
    titulo?: StringFilter<"Notification"> | string
    mensagem?: StringFilter<"Notification"> | string
    canal?: StringFilter<"Notification"> | string
    status?: StringFilter<"Notification"> | string
    dados?: JsonNullableFilter<"Notification">
    enviadaEm?: DateTimeNullableFilter<"Notification"> | Date | string | null
    lidaEm?: DateTimeNullableFilter<"Notification"> | Date | string | null
    erro?: StringNullableFilter<"Notification"> | string | null
    criadoEm?: DateTimeFilter<"Notification"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    titulo?: SortOrder
    mensagem?: SortOrder
    canal?: SortOrder
    status?: SortOrder
    dados?: SortOrderInput | SortOrder
    enviadaEm?: SortOrderInput | SortOrder
    lidaEm?: SortOrderInput | SortOrder
    erro?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    idUsuario?: StringFilter<"Notification"> | string
    tipo?: StringFilter<"Notification"> | string
    titulo?: StringFilter<"Notification"> | string
    mensagem?: StringFilter<"Notification"> | string
    canal?: StringFilter<"Notification"> | string
    status?: StringFilter<"Notification"> | string
    dados?: JsonNullableFilter<"Notification">
    enviadaEm?: DateTimeNullableFilter<"Notification"> | Date | string | null
    lidaEm?: DateTimeNullableFilter<"Notification"> | Date | string | null
    erro?: StringNullableFilter<"Notification"> | string | null
    criadoEm?: DateTimeFilter<"Notification"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    titulo?: SortOrder
    mensagem?: SortOrder
    canal?: SortOrder
    status?: SortOrder
    dados?: SortOrderInput | SortOrder
    enviadaEm?: SortOrderInput | SortOrder
    lidaEm?: SortOrderInput | SortOrder
    erro?: SortOrderInput | SortOrder
    criadoEm?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    idUsuario?: StringWithAggregatesFilter<"Notification"> | string
    tipo?: StringWithAggregatesFilter<"Notification"> | string
    titulo?: StringWithAggregatesFilter<"Notification"> | string
    mensagem?: StringWithAggregatesFilter<"Notification"> | string
    canal?: StringWithAggregatesFilter<"Notification"> | string
    status?: StringWithAggregatesFilter<"Notification"> | string
    dados?: JsonNullableWithAggregatesFilter<"Notification">
    enviadaEm?: DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
    lidaEm?: DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
    erro?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    criadoEm?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type UsuarioCreateInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaCreateNestedManyWithoutUsuarioInput
    lancamentos?: LancamentoCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoCreateNestedManyWithoutUsuarioInput
    contas?: ContaCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobCreateNestedManyWithoutUsuarioInput
    insights?: InsightCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaUncheckedCreateNestedManyWithoutUsuarioInput
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoUncheckedCreateNestedManyWithoutUsuarioInput
    contas?: ContaUncheckedCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobUncheckedCreateNestedManyWithoutUsuarioInput
    insights?: InsightUncheckedCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertUncheckedCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUpdateManyWithoutUsuarioNestedInput
    lancamentos?: LancamentoUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUncheckedUpdateManyWithoutUsuarioNestedInput
    lancamentos?: LancamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUncheckedUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUncheckedUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUncheckedUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaCreateInput = {
    id?: string
    nome: string
    tipo: $Enums.TipoCategoria
    ehPadrao?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario?: UsuarioCreateNestedOneWithoutCategoriasInput
    lancamentos?: LancamentoCreateNestedManyWithoutCategoriaInput
    orcamentos?: OrcamentoCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUncheckedCreateInput = {
    id?: string
    idUsuario?: string | null
    nome: string
    tipo: $Enums.TipoCategoria
    ehPadrao?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutCategoriaInput
    orcamentos?: OrcamentoUncheckedCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoCategoriaFieldUpdateOperationsInput | $Enums.TipoCategoria
    ehPadrao?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneWithoutCategoriasNestedInput
    lancamentos?: LancamentoUpdateManyWithoutCategoriaNestedInput
    orcamentos?: OrcamentoUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoCategoriaFieldUpdateOperationsInput | $Enums.TipoCategoria
    ehPadrao?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUncheckedUpdateManyWithoutCategoriaNestedInput
    orcamentos?: OrcamentoUncheckedUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaCreateManyInput = {
    id?: string
    idUsuario?: string | null
    nome: string
    tipo: $Enums.TipoCategoria
    ehPadrao?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type CategoriaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoCategoriaFieldUpdateOperationsInput | $Enums.TipoCategoria
    ehPadrao?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoCategoriaFieldUpdateOperationsInput | $Enums.TipoCategoria
    ehPadrao?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LancamentoCreateInput = {
    id?: string
    valor: Decimal | DecimalJsLike | number | string
    dataTransacao: Date | string
    recorrencia?: $Enums.TipoRecorrencia
    tipo: $Enums.TipoLancamento
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario: UsuarioCreateNestedOneWithoutLancamentosInput
    categoria: CategoriaCreateNestedOneWithoutLancamentosInput
    conta?: ContaCreateNestedOneWithoutLancamentosInput
  }

  export type LancamentoUncheckedCreateInput = {
    id?: string
    idUsuario: string
    idCategoria: string
    idConta?: string | null
    valor: Decimal | DecimalJsLike | number | string
    dataTransacao: Date | string
    recorrencia?: $Enums.TipoRecorrencia
    tipo: $Enums.TipoLancamento
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type LancamentoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFieldUpdateOperationsInput | Date | string
    recorrencia?: EnumTipoRecorrenciaFieldUpdateOperationsInput | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFieldUpdateOperationsInput | $Enums.TipoLancamento
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutLancamentosNestedInput
    categoria?: CategoriaUpdateOneRequiredWithoutLancamentosNestedInput
    conta?: ContaUpdateOneWithoutLancamentosNestedInput
  }

  export type LancamentoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    idCategoria?: StringFieldUpdateOperationsInput | string
    idConta?: NullableStringFieldUpdateOperationsInput | string | null
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFieldUpdateOperationsInput | Date | string
    recorrencia?: EnumTipoRecorrenciaFieldUpdateOperationsInput | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFieldUpdateOperationsInput | $Enums.TipoLancamento
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LancamentoCreateManyInput = {
    id?: string
    idUsuario: string
    idCategoria: string
    idConta?: string | null
    valor: Decimal | DecimalJsLike | number | string
    dataTransacao: Date | string
    recorrencia?: $Enums.TipoRecorrencia
    tipo: $Enums.TipoLancamento
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type LancamentoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFieldUpdateOperationsInput | Date | string
    recorrencia?: EnumTipoRecorrenciaFieldUpdateOperationsInput | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFieldUpdateOperationsInput | $Enums.TipoLancamento
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LancamentoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    idCategoria?: StringFieldUpdateOperationsInput | string
    idConta?: NullableStringFieldUpdateOperationsInput | string | null
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFieldUpdateOperationsInput | Date | string
    recorrencia?: EnumTipoRecorrenciaFieldUpdateOperationsInput | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFieldUpdateOperationsInput | $Enums.TipoLancamento
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContaCreateInput = {
    id?: string
    nome: string
    tipo: $Enums.TipoContaBancaria
    saldoInicial: Decimal | DecimalJsLike | number | string
    modeloCartao?: $Enums.ModeloCartao
    descricao?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario: UsuarioCreateNestedOneWithoutContasInput
    lancamentos?: LancamentoCreateNestedManyWithoutContaInput
  }

  export type ContaUncheckedCreateInput = {
    id?: string
    idUsuario: string
    nome: string
    tipo: $Enums.TipoContaBancaria
    saldoInicial: Decimal | DecimalJsLike | number | string
    modeloCartao?: $Enums.ModeloCartao
    descricao?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutContaInput
  }

  export type ContaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoContaBancariaFieldUpdateOperationsInput | $Enums.TipoContaBancaria
    saldoInicial?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    modeloCartao?: EnumModeloCartaoFieldUpdateOperationsInput | $Enums.ModeloCartao
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutContasNestedInput
    lancamentos?: LancamentoUpdateManyWithoutContaNestedInput
  }

  export type ContaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoContaBancariaFieldUpdateOperationsInput | $Enums.TipoContaBancaria
    saldoInicial?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    modeloCartao?: EnumModeloCartaoFieldUpdateOperationsInput | $Enums.ModeloCartao
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUncheckedUpdateManyWithoutContaNestedInput
  }

  export type ContaCreateManyInput = {
    id?: string
    idUsuario: string
    nome: string
    tipo: $Enums.TipoContaBancaria
    saldoInicial: Decimal | DecimalJsLike | number | string
    modeloCartao?: $Enums.ModeloCartao
    descricao?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ContaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoContaBancariaFieldUpdateOperationsInput | $Enums.TipoContaBancaria
    saldoInicial?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    modeloCartao?: EnumModeloCartaoFieldUpdateOperationsInput | $Enums.ModeloCartao
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoContaBancariaFieldUpdateOperationsInput | $Enums.TipoContaBancaria
    saldoInicial?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    modeloCartao?: EnumModeloCartaoFieldUpdateOperationsInput | $Enums.ModeloCartao
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrcamentoCreateInput = {
    id?: string
    valor: Decimal | DecimalJsLike | number | string
    mes: number
    ano: number
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario: UsuarioCreateNestedOneWithoutOrcamentosInput
    categoria?: CategoriaCreateNestedOneWithoutOrcamentosInput
  }

  export type OrcamentoUncheckedCreateInput = {
    id?: string
    idUsuario: string
    idCategoria?: string | null
    valor: Decimal | DecimalJsLike | number | string
    mes: number
    ano: number
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type OrcamentoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    mes?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutOrcamentosNestedInput
    categoria?: CategoriaUpdateOneWithoutOrcamentosNestedInput
  }

  export type OrcamentoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    idCategoria?: NullableStringFieldUpdateOperationsInput | string | null
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    mes?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrcamentoCreateManyInput = {
    id?: string
    idUsuario: string
    idCategoria?: string | null
    valor: Decimal | DecimalJsLike | number | string
    mes: number
    ano: number
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type OrcamentoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    mes?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrcamentoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    idCategoria?: NullableStringFieldUpdateOperationsInput | string | null
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    mes?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticJobCreateInput = {
    id?: string
    tipo: string
    status: string
    payload: JsonNullValueInput | InputJsonValue
    resultado?: NullableJsonNullValueInput | InputJsonValue
    erro?: string | null
    criadoEm?: Date | string
    iniciadoEm?: Date | string | null
    finalizadoEm?: Date | string | null
    usuario: UsuarioCreateNestedOneWithoutAnalyticJobsInput
  }

  export type AnalyticJobUncheckedCreateInput = {
    id?: string
    idUsuario: string
    tipo: string
    status: string
    payload: JsonNullValueInput | InputJsonValue
    resultado?: NullableJsonNullValueInput | InputJsonValue
    erro?: string | null
    criadoEm?: Date | string
    iniciadoEm?: Date | string | null
    finalizadoEm?: Date | string | null
  }

  export type AnalyticJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    resultado?: NullableJsonNullValueInput | InputJsonValue
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    iniciadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalizadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    usuario?: UsuarioUpdateOneRequiredWithoutAnalyticJobsNestedInput
  }

  export type AnalyticJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    resultado?: NullableJsonNullValueInput | InputJsonValue
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    iniciadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalizadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnalyticJobCreateManyInput = {
    id?: string
    idUsuario: string
    tipo: string
    status: string
    payload: JsonNullValueInput | InputJsonValue
    resultado?: NullableJsonNullValueInput | InputJsonValue
    erro?: string | null
    criadoEm?: Date | string
    iniciadoEm?: Date | string | null
    finalizadoEm?: Date | string | null
  }

  export type AnalyticJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    resultado?: NullableJsonNullValueInput | InputJsonValue
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    iniciadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalizadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnalyticJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    resultado?: NullableJsonNullValueInput | InputJsonValue
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    iniciadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalizadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InsightCreateInput = {
    id?: string
    tipo: string
    titulo: string
    descricao: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: Date | string
    usuario: UsuarioCreateNestedOneWithoutInsightsInput
  }

  export type InsightUncheckedCreateInput = {
    id?: string
    idUsuario: string
    tipo: string
    titulo: string
    descricao: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: Date | string
  }

  export type InsightUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutInsightsNestedInput
  }

  export type InsightUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsightCreateManyInput = {
    id?: string
    idUsuario: string
    tipo: string
    titulo: string
    descricao: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: Date | string
  }

  export type InsightUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsightUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinancialAlertCreateInput = {
    id?: string
    tipo: string
    severidade: string
    titulo: string
    mensagem: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    lidoEm?: Date | string | null
    criadoEm?: Date | string
    usuario: UsuarioCreateNestedOneWithoutAlertasInput
  }

  export type FinancialAlertUncheckedCreateInput = {
    id?: string
    idUsuario: string
    tipo: string
    severidade: string
    titulo: string
    mensagem: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    lidoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type FinancialAlertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    severidade?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    lidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutAlertasNestedInput
  }

  export type FinancialAlertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    severidade?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    lidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinancialAlertCreateManyInput = {
    id?: string
    idUsuario: string
    tipo: string
    severidade: string
    titulo: string
    mensagem: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    lidoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type FinancialAlertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    severidade?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    lidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinancialAlertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    severidade?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    lidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    tipo: string
    titulo: string
    mensagem: string
    canal: string
    status: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    enviadaEm?: Date | string | null
    lidaEm?: Date | string | null
    erro?: string | null
    criadoEm?: Date | string
    usuario: UsuarioCreateNestedOneWithoutNotificacoesInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    idUsuario: string
    tipo: string
    titulo: string
    mensagem: string
    canal: string
    status: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    enviadaEm?: Date | string | null
    lidaEm?: Date | string | null
    erro?: string | null
    criadoEm?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    canal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    enviadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutNotificacoesNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    canal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    enviadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    idUsuario: string
    tipo: string
    titulo: string
    mensagem: string
    canal: string
    status: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    enviadaEm?: Date | string | null
    lidaEm?: Date | string | null
    erro?: string | null
    criadoEm?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    canal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    enviadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    canal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    enviadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CategoriaListRelationFilter = {
    every?: CategoriaWhereInput
    some?: CategoriaWhereInput
    none?: CategoriaWhereInput
  }

  export type LancamentoListRelationFilter = {
    every?: LancamentoWhereInput
    some?: LancamentoWhereInput
    none?: LancamentoWhereInput
  }

  export type OrcamentoListRelationFilter = {
    every?: OrcamentoWhereInput
    some?: OrcamentoWhereInput
    none?: OrcamentoWhereInput
  }

  export type ContaListRelationFilter = {
    every?: ContaWhereInput
    some?: ContaWhereInput
    none?: ContaWhereInput
  }

  export type AnalyticJobListRelationFilter = {
    every?: AnalyticJobWhereInput
    some?: AnalyticJobWhereInput
    none?: AnalyticJobWhereInput
  }

  export type InsightListRelationFilter = {
    every?: InsightWhereInput
    some?: InsightWhereInput
    none?: InsightWhereInput
  }

  export type FinancialAlertListRelationFilter = {
    every?: FinancialAlertWhereInput
    some?: FinancialAlertWhereInput
    none?: FinancialAlertWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type CategoriaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LancamentoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrcamentoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnalyticJobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InsightOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FinancialAlertOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senhaHash?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senhaHash?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senhaHash?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumTipoCategoriaFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoCategoria | EnumTipoCategoriaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoCategoria[] | ListEnumTipoCategoriaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoCategoria[] | ListEnumTipoCategoriaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoCategoriaFilter<$PrismaModel> | $Enums.TipoCategoria
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UsuarioNullableScalarRelationFilter = {
    is?: UsuarioWhereInput | null
    isNot?: UsuarioWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CategoriaCountOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    nome?: SortOrder
    tipo?: SortOrder
    ehPadrao?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type CategoriaMaxOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    nome?: SortOrder
    tipo?: SortOrder
    ehPadrao?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type CategoriaMinOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    nome?: SortOrder
    tipo?: SortOrder
    ehPadrao?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumTipoCategoriaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoCategoria | EnumTipoCategoriaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoCategoria[] | ListEnumTipoCategoriaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoCategoria[] | ListEnumTipoCategoriaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoCategoriaWithAggregatesFilter<$PrismaModel> | $Enums.TipoCategoria
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoCategoriaFilter<$PrismaModel>
    _max?: NestedEnumTipoCategoriaFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumTipoRecorrenciaFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoRecorrencia | EnumTipoRecorrenciaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoRecorrencia[] | ListEnumTipoRecorrenciaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoRecorrencia[] | ListEnumTipoRecorrenciaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoRecorrenciaFilter<$PrismaModel> | $Enums.TipoRecorrencia
  }

  export type EnumTipoLancamentoFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoLancamento | EnumTipoLancamentoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoLancamento[] | ListEnumTipoLancamentoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoLancamento[] | ListEnumTipoLancamentoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoLancamentoFilter<$PrismaModel> | $Enums.TipoLancamento
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type CategoriaScalarRelationFilter = {
    is?: CategoriaWhereInput
    isNot?: CategoriaWhereInput
  }

  export type ContaNullableScalarRelationFilter = {
    is?: ContaWhereInput | null
    isNot?: ContaWhereInput | null
  }

  export type LancamentoCountOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    idCategoria?: SortOrder
    idConta?: SortOrder
    valor?: SortOrder
    dataTransacao?: SortOrder
    recorrencia?: SortOrder
    tipo?: SortOrder
    descricao?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type LancamentoAvgOrderByAggregateInput = {
    valor?: SortOrder
  }

  export type LancamentoMaxOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    idCategoria?: SortOrder
    idConta?: SortOrder
    valor?: SortOrder
    dataTransacao?: SortOrder
    recorrencia?: SortOrder
    tipo?: SortOrder
    descricao?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type LancamentoMinOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    idCategoria?: SortOrder
    idConta?: SortOrder
    valor?: SortOrder
    dataTransacao?: SortOrder
    recorrencia?: SortOrder
    tipo?: SortOrder
    descricao?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type LancamentoSumOrderByAggregateInput = {
    valor?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumTipoRecorrenciaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoRecorrencia | EnumTipoRecorrenciaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoRecorrencia[] | ListEnumTipoRecorrenciaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoRecorrencia[] | ListEnumTipoRecorrenciaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoRecorrenciaWithAggregatesFilter<$PrismaModel> | $Enums.TipoRecorrencia
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoRecorrenciaFilter<$PrismaModel>
    _max?: NestedEnumTipoRecorrenciaFilter<$PrismaModel>
  }

  export type EnumTipoLancamentoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoLancamento | EnumTipoLancamentoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoLancamento[] | ListEnumTipoLancamentoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoLancamento[] | ListEnumTipoLancamentoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoLancamentoWithAggregatesFilter<$PrismaModel> | $Enums.TipoLancamento
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoLancamentoFilter<$PrismaModel>
    _max?: NestedEnumTipoLancamentoFilter<$PrismaModel>
  }

  export type EnumTipoContaBancariaFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoContaBancaria | EnumTipoContaBancariaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoContaBancaria[] | ListEnumTipoContaBancariaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoContaBancaria[] | ListEnumTipoContaBancariaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoContaBancariaFilter<$PrismaModel> | $Enums.TipoContaBancaria
  }

  export type EnumModeloCartaoFilter<$PrismaModel = never> = {
    equals?: $Enums.ModeloCartao | EnumModeloCartaoFieldRefInput<$PrismaModel>
    in?: $Enums.ModeloCartao[] | ListEnumModeloCartaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModeloCartao[] | ListEnumModeloCartaoFieldRefInput<$PrismaModel>
    not?: NestedEnumModeloCartaoFilter<$PrismaModel> | $Enums.ModeloCartao
  }

  export type ContaIdUsuarioNomeCompoundUniqueInput = {
    idUsuario: string
    nome: string
  }

  export type ContaCountOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    nome?: SortOrder
    tipo?: SortOrder
    saldoInicial?: SortOrder
    modeloCartao?: SortOrder
    descricao?: SortOrder
    ativa?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type ContaAvgOrderByAggregateInput = {
    saldoInicial?: SortOrder
  }

  export type ContaMaxOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    nome?: SortOrder
    tipo?: SortOrder
    saldoInicial?: SortOrder
    modeloCartao?: SortOrder
    descricao?: SortOrder
    ativa?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type ContaMinOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    nome?: SortOrder
    tipo?: SortOrder
    saldoInicial?: SortOrder
    modeloCartao?: SortOrder
    descricao?: SortOrder
    ativa?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type ContaSumOrderByAggregateInput = {
    saldoInicial?: SortOrder
  }

  export type EnumTipoContaBancariaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoContaBancaria | EnumTipoContaBancariaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoContaBancaria[] | ListEnumTipoContaBancariaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoContaBancaria[] | ListEnumTipoContaBancariaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoContaBancariaWithAggregatesFilter<$PrismaModel> | $Enums.TipoContaBancaria
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoContaBancariaFilter<$PrismaModel>
    _max?: NestedEnumTipoContaBancariaFilter<$PrismaModel>
  }

  export type EnumModeloCartaoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModeloCartao | EnumModeloCartaoFieldRefInput<$PrismaModel>
    in?: $Enums.ModeloCartao[] | ListEnumModeloCartaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModeloCartao[] | ListEnumModeloCartaoFieldRefInput<$PrismaModel>
    not?: NestedEnumModeloCartaoWithAggregatesFilter<$PrismaModel> | $Enums.ModeloCartao
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModeloCartaoFilter<$PrismaModel>
    _max?: NestedEnumModeloCartaoFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CategoriaNullableScalarRelationFilter = {
    is?: CategoriaWhereInput | null
    isNot?: CategoriaWhereInput | null
  }

  export type OrcamentoCountOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    idCategoria?: SortOrder
    valor?: SortOrder
    mes?: SortOrder
    ano?: SortOrder
    descricao?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type OrcamentoAvgOrderByAggregateInput = {
    valor?: SortOrder
    mes?: SortOrder
    ano?: SortOrder
  }

  export type OrcamentoMaxOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    idCategoria?: SortOrder
    valor?: SortOrder
    mes?: SortOrder
    ano?: SortOrder
    descricao?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type OrcamentoMinOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    idCategoria?: SortOrder
    valor?: SortOrder
    mes?: SortOrder
    ano?: SortOrder
    descricao?: SortOrder
    criadoEm?: SortOrder
    atualizadoEm?: SortOrder
  }

  export type OrcamentoSumOrderByAggregateInput = {
    valor?: SortOrder
    mes?: SortOrder
    ano?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AnalyticJobCountOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    status?: SortOrder
    payload?: SortOrder
    resultado?: SortOrder
    erro?: SortOrder
    criadoEm?: SortOrder
    iniciadoEm?: SortOrder
    finalizadoEm?: SortOrder
  }

  export type AnalyticJobMaxOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    status?: SortOrder
    erro?: SortOrder
    criadoEm?: SortOrder
    iniciadoEm?: SortOrder
    finalizadoEm?: SortOrder
  }

  export type AnalyticJobMinOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    status?: SortOrder
    erro?: SortOrder
    criadoEm?: SortOrder
    iniciadoEm?: SortOrder
    finalizadoEm?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type InsightCountOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    dados?: SortOrder
    criadoEm?: SortOrder
  }

  export type InsightMaxOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    criadoEm?: SortOrder
  }

  export type InsightMinOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    titulo?: SortOrder
    descricao?: SortOrder
    criadoEm?: SortOrder
  }

  export type FinancialAlertCountOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    severidade?: SortOrder
    titulo?: SortOrder
    mensagem?: SortOrder
    dados?: SortOrder
    lidoEm?: SortOrder
    criadoEm?: SortOrder
  }

  export type FinancialAlertMaxOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    severidade?: SortOrder
    titulo?: SortOrder
    mensagem?: SortOrder
    lidoEm?: SortOrder
    criadoEm?: SortOrder
  }

  export type FinancialAlertMinOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    severidade?: SortOrder
    titulo?: SortOrder
    mensagem?: SortOrder
    lidoEm?: SortOrder
    criadoEm?: SortOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    titulo?: SortOrder
    mensagem?: SortOrder
    canal?: SortOrder
    status?: SortOrder
    dados?: SortOrder
    enviadaEm?: SortOrder
    lidaEm?: SortOrder
    erro?: SortOrder
    criadoEm?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    titulo?: SortOrder
    mensagem?: SortOrder
    canal?: SortOrder
    status?: SortOrder
    enviadaEm?: SortOrder
    lidaEm?: SortOrder
    erro?: SortOrder
    criadoEm?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    idUsuario?: SortOrder
    tipo?: SortOrder
    titulo?: SortOrder
    mensagem?: SortOrder
    canal?: SortOrder
    status?: SortOrder
    enviadaEm?: SortOrder
    lidaEm?: SortOrder
    erro?: SortOrder
    criadoEm?: SortOrder
  }

  export type CategoriaCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<CategoriaCreateWithoutUsuarioInput, CategoriaUncheckedCreateWithoutUsuarioInput> | CategoriaCreateWithoutUsuarioInput[] | CategoriaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CategoriaCreateOrConnectWithoutUsuarioInput | CategoriaCreateOrConnectWithoutUsuarioInput[]
    createMany?: CategoriaCreateManyUsuarioInputEnvelope
    connect?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
  }

  export type LancamentoCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<LancamentoCreateWithoutUsuarioInput, LancamentoUncheckedCreateWithoutUsuarioInput> | LancamentoCreateWithoutUsuarioInput[] | LancamentoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutUsuarioInput | LancamentoCreateOrConnectWithoutUsuarioInput[]
    createMany?: LancamentoCreateManyUsuarioInputEnvelope
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
  }

  export type OrcamentoCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<OrcamentoCreateWithoutUsuarioInput, OrcamentoUncheckedCreateWithoutUsuarioInput> | OrcamentoCreateWithoutUsuarioInput[] | OrcamentoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: OrcamentoCreateOrConnectWithoutUsuarioInput | OrcamentoCreateOrConnectWithoutUsuarioInput[]
    createMany?: OrcamentoCreateManyUsuarioInputEnvelope
    connect?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
  }

  export type ContaCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<ContaCreateWithoutUsuarioInput, ContaUncheckedCreateWithoutUsuarioInput> | ContaCreateWithoutUsuarioInput[] | ContaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: ContaCreateOrConnectWithoutUsuarioInput | ContaCreateOrConnectWithoutUsuarioInput[]
    createMany?: ContaCreateManyUsuarioInputEnvelope
    connect?: ContaWhereUniqueInput | ContaWhereUniqueInput[]
  }

  export type AnalyticJobCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<AnalyticJobCreateWithoutUsuarioInput, AnalyticJobUncheckedCreateWithoutUsuarioInput> | AnalyticJobCreateWithoutUsuarioInput[] | AnalyticJobUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: AnalyticJobCreateOrConnectWithoutUsuarioInput | AnalyticJobCreateOrConnectWithoutUsuarioInput[]
    createMany?: AnalyticJobCreateManyUsuarioInputEnvelope
    connect?: AnalyticJobWhereUniqueInput | AnalyticJobWhereUniqueInput[]
  }

  export type InsightCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<InsightCreateWithoutUsuarioInput, InsightUncheckedCreateWithoutUsuarioInput> | InsightCreateWithoutUsuarioInput[] | InsightUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: InsightCreateOrConnectWithoutUsuarioInput | InsightCreateOrConnectWithoutUsuarioInput[]
    createMany?: InsightCreateManyUsuarioInputEnvelope
    connect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
  }

  export type FinancialAlertCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<FinancialAlertCreateWithoutUsuarioInput, FinancialAlertUncheckedCreateWithoutUsuarioInput> | FinancialAlertCreateWithoutUsuarioInput[] | FinancialAlertUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: FinancialAlertCreateOrConnectWithoutUsuarioInput | FinancialAlertCreateOrConnectWithoutUsuarioInput[]
    createMany?: FinancialAlertCreateManyUsuarioInputEnvelope
    connect?: FinancialAlertWhereUniqueInput | FinancialAlertWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<NotificationCreateWithoutUsuarioInput, NotificationUncheckedCreateWithoutUsuarioInput> | NotificationCreateWithoutUsuarioInput[] | NotificationUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUsuarioInput | NotificationCreateOrConnectWithoutUsuarioInput[]
    createMany?: NotificationCreateManyUsuarioInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type CategoriaUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<CategoriaCreateWithoutUsuarioInput, CategoriaUncheckedCreateWithoutUsuarioInput> | CategoriaCreateWithoutUsuarioInput[] | CategoriaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CategoriaCreateOrConnectWithoutUsuarioInput | CategoriaCreateOrConnectWithoutUsuarioInput[]
    createMany?: CategoriaCreateManyUsuarioInputEnvelope
    connect?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
  }

  export type LancamentoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<LancamentoCreateWithoutUsuarioInput, LancamentoUncheckedCreateWithoutUsuarioInput> | LancamentoCreateWithoutUsuarioInput[] | LancamentoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutUsuarioInput | LancamentoCreateOrConnectWithoutUsuarioInput[]
    createMany?: LancamentoCreateManyUsuarioInputEnvelope
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
  }

  export type OrcamentoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<OrcamentoCreateWithoutUsuarioInput, OrcamentoUncheckedCreateWithoutUsuarioInput> | OrcamentoCreateWithoutUsuarioInput[] | OrcamentoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: OrcamentoCreateOrConnectWithoutUsuarioInput | OrcamentoCreateOrConnectWithoutUsuarioInput[]
    createMany?: OrcamentoCreateManyUsuarioInputEnvelope
    connect?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
  }

  export type ContaUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<ContaCreateWithoutUsuarioInput, ContaUncheckedCreateWithoutUsuarioInput> | ContaCreateWithoutUsuarioInput[] | ContaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: ContaCreateOrConnectWithoutUsuarioInput | ContaCreateOrConnectWithoutUsuarioInput[]
    createMany?: ContaCreateManyUsuarioInputEnvelope
    connect?: ContaWhereUniqueInput | ContaWhereUniqueInput[]
  }

  export type AnalyticJobUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<AnalyticJobCreateWithoutUsuarioInput, AnalyticJobUncheckedCreateWithoutUsuarioInput> | AnalyticJobCreateWithoutUsuarioInput[] | AnalyticJobUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: AnalyticJobCreateOrConnectWithoutUsuarioInput | AnalyticJobCreateOrConnectWithoutUsuarioInput[]
    createMany?: AnalyticJobCreateManyUsuarioInputEnvelope
    connect?: AnalyticJobWhereUniqueInput | AnalyticJobWhereUniqueInput[]
  }

  export type InsightUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<InsightCreateWithoutUsuarioInput, InsightUncheckedCreateWithoutUsuarioInput> | InsightCreateWithoutUsuarioInput[] | InsightUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: InsightCreateOrConnectWithoutUsuarioInput | InsightCreateOrConnectWithoutUsuarioInput[]
    createMany?: InsightCreateManyUsuarioInputEnvelope
    connect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
  }

  export type FinancialAlertUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<FinancialAlertCreateWithoutUsuarioInput, FinancialAlertUncheckedCreateWithoutUsuarioInput> | FinancialAlertCreateWithoutUsuarioInput[] | FinancialAlertUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: FinancialAlertCreateOrConnectWithoutUsuarioInput | FinancialAlertCreateOrConnectWithoutUsuarioInput[]
    createMany?: FinancialAlertCreateManyUsuarioInputEnvelope
    connect?: FinancialAlertWhereUniqueInput | FinancialAlertWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<NotificationCreateWithoutUsuarioInput, NotificationUncheckedCreateWithoutUsuarioInput> | NotificationCreateWithoutUsuarioInput[] | NotificationUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUsuarioInput | NotificationCreateOrConnectWithoutUsuarioInput[]
    createMany?: NotificationCreateManyUsuarioInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CategoriaUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<CategoriaCreateWithoutUsuarioInput, CategoriaUncheckedCreateWithoutUsuarioInput> | CategoriaCreateWithoutUsuarioInput[] | CategoriaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CategoriaCreateOrConnectWithoutUsuarioInput | CategoriaCreateOrConnectWithoutUsuarioInput[]
    upsert?: CategoriaUpsertWithWhereUniqueWithoutUsuarioInput | CategoriaUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: CategoriaCreateManyUsuarioInputEnvelope
    set?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    disconnect?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    delete?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    connect?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    update?: CategoriaUpdateWithWhereUniqueWithoutUsuarioInput | CategoriaUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: CategoriaUpdateManyWithWhereWithoutUsuarioInput | CategoriaUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: CategoriaScalarWhereInput | CategoriaScalarWhereInput[]
  }

  export type LancamentoUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<LancamentoCreateWithoutUsuarioInput, LancamentoUncheckedCreateWithoutUsuarioInput> | LancamentoCreateWithoutUsuarioInput[] | LancamentoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutUsuarioInput | LancamentoCreateOrConnectWithoutUsuarioInput[]
    upsert?: LancamentoUpsertWithWhereUniqueWithoutUsuarioInput | LancamentoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: LancamentoCreateManyUsuarioInputEnvelope
    set?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    disconnect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    delete?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    update?: LancamentoUpdateWithWhereUniqueWithoutUsuarioInput | LancamentoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: LancamentoUpdateManyWithWhereWithoutUsuarioInput | LancamentoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
  }

  export type OrcamentoUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<OrcamentoCreateWithoutUsuarioInput, OrcamentoUncheckedCreateWithoutUsuarioInput> | OrcamentoCreateWithoutUsuarioInput[] | OrcamentoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: OrcamentoCreateOrConnectWithoutUsuarioInput | OrcamentoCreateOrConnectWithoutUsuarioInput[]
    upsert?: OrcamentoUpsertWithWhereUniqueWithoutUsuarioInput | OrcamentoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: OrcamentoCreateManyUsuarioInputEnvelope
    set?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    disconnect?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    delete?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    connect?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    update?: OrcamentoUpdateWithWhereUniqueWithoutUsuarioInput | OrcamentoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: OrcamentoUpdateManyWithWhereWithoutUsuarioInput | OrcamentoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: OrcamentoScalarWhereInput | OrcamentoScalarWhereInput[]
  }

  export type ContaUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<ContaCreateWithoutUsuarioInput, ContaUncheckedCreateWithoutUsuarioInput> | ContaCreateWithoutUsuarioInput[] | ContaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: ContaCreateOrConnectWithoutUsuarioInput | ContaCreateOrConnectWithoutUsuarioInput[]
    upsert?: ContaUpsertWithWhereUniqueWithoutUsuarioInput | ContaUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: ContaCreateManyUsuarioInputEnvelope
    set?: ContaWhereUniqueInput | ContaWhereUniqueInput[]
    disconnect?: ContaWhereUniqueInput | ContaWhereUniqueInput[]
    delete?: ContaWhereUniqueInput | ContaWhereUniqueInput[]
    connect?: ContaWhereUniqueInput | ContaWhereUniqueInput[]
    update?: ContaUpdateWithWhereUniqueWithoutUsuarioInput | ContaUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: ContaUpdateManyWithWhereWithoutUsuarioInput | ContaUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: ContaScalarWhereInput | ContaScalarWhereInput[]
  }

  export type AnalyticJobUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<AnalyticJobCreateWithoutUsuarioInput, AnalyticJobUncheckedCreateWithoutUsuarioInput> | AnalyticJobCreateWithoutUsuarioInput[] | AnalyticJobUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: AnalyticJobCreateOrConnectWithoutUsuarioInput | AnalyticJobCreateOrConnectWithoutUsuarioInput[]
    upsert?: AnalyticJobUpsertWithWhereUniqueWithoutUsuarioInput | AnalyticJobUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: AnalyticJobCreateManyUsuarioInputEnvelope
    set?: AnalyticJobWhereUniqueInput | AnalyticJobWhereUniqueInput[]
    disconnect?: AnalyticJobWhereUniqueInput | AnalyticJobWhereUniqueInput[]
    delete?: AnalyticJobWhereUniqueInput | AnalyticJobWhereUniqueInput[]
    connect?: AnalyticJobWhereUniqueInput | AnalyticJobWhereUniqueInput[]
    update?: AnalyticJobUpdateWithWhereUniqueWithoutUsuarioInput | AnalyticJobUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: AnalyticJobUpdateManyWithWhereWithoutUsuarioInput | AnalyticJobUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: AnalyticJobScalarWhereInput | AnalyticJobScalarWhereInput[]
  }

  export type InsightUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<InsightCreateWithoutUsuarioInput, InsightUncheckedCreateWithoutUsuarioInput> | InsightCreateWithoutUsuarioInput[] | InsightUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: InsightCreateOrConnectWithoutUsuarioInput | InsightCreateOrConnectWithoutUsuarioInput[]
    upsert?: InsightUpsertWithWhereUniqueWithoutUsuarioInput | InsightUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: InsightCreateManyUsuarioInputEnvelope
    set?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    disconnect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    delete?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    connect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    update?: InsightUpdateWithWhereUniqueWithoutUsuarioInput | InsightUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: InsightUpdateManyWithWhereWithoutUsuarioInput | InsightUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: InsightScalarWhereInput | InsightScalarWhereInput[]
  }

  export type FinancialAlertUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<FinancialAlertCreateWithoutUsuarioInput, FinancialAlertUncheckedCreateWithoutUsuarioInput> | FinancialAlertCreateWithoutUsuarioInput[] | FinancialAlertUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: FinancialAlertCreateOrConnectWithoutUsuarioInput | FinancialAlertCreateOrConnectWithoutUsuarioInput[]
    upsert?: FinancialAlertUpsertWithWhereUniqueWithoutUsuarioInput | FinancialAlertUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: FinancialAlertCreateManyUsuarioInputEnvelope
    set?: FinancialAlertWhereUniqueInput | FinancialAlertWhereUniqueInput[]
    disconnect?: FinancialAlertWhereUniqueInput | FinancialAlertWhereUniqueInput[]
    delete?: FinancialAlertWhereUniqueInput | FinancialAlertWhereUniqueInput[]
    connect?: FinancialAlertWhereUniqueInput | FinancialAlertWhereUniqueInput[]
    update?: FinancialAlertUpdateWithWhereUniqueWithoutUsuarioInput | FinancialAlertUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: FinancialAlertUpdateManyWithWhereWithoutUsuarioInput | FinancialAlertUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: FinancialAlertScalarWhereInput | FinancialAlertScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<NotificationCreateWithoutUsuarioInput, NotificationUncheckedCreateWithoutUsuarioInput> | NotificationCreateWithoutUsuarioInput[] | NotificationUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUsuarioInput | NotificationCreateOrConnectWithoutUsuarioInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUsuarioInput | NotificationUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: NotificationCreateManyUsuarioInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUsuarioInput | NotificationUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUsuarioInput | NotificationUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type CategoriaUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<CategoriaCreateWithoutUsuarioInput, CategoriaUncheckedCreateWithoutUsuarioInput> | CategoriaCreateWithoutUsuarioInput[] | CategoriaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: CategoriaCreateOrConnectWithoutUsuarioInput | CategoriaCreateOrConnectWithoutUsuarioInput[]
    upsert?: CategoriaUpsertWithWhereUniqueWithoutUsuarioInput | CategoriaUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: CategoriaCreateManyUsuarioInputEnvelope
    set?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    disconnect?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    delete?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    connect?: CategoriaWhereUniqueInput | CategoriaWhereUniqueInput[]
    update?: CategoriaUpdateWithWhereUniqueWithoutUsuarioInput | CategoriaUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: CategoriaUpdateManyWithWhereWithoutUsuarioInput | CategoriaUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: CategoriaScalarWhereInput | CategoriaScalarWhereInput[]
  }

  export type LancamentoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<LancamentoCreateWithoutUsuarioInput, LancamentoUncheckedCreateWithoutUsuarioInput> | LancamentoCreateWithoutUsuarioInput[] | LancamentoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutUsuarioInput | LancamentoCreateOrConnectWithoutUsuarioInput[]
    upsert?: LancamentoUpsertWithWhereUniqueWithoutUsuarioInput | LancamentoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: LancamentoCreateManyUsuarioInputEnvelope
    set?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    disconnect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    delete?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    update?: LancamentoUpdateWithWhereUniqueWithoutUsuarioInput | LancamentoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: LancamentoUpdateManyWithWhereWithoutUsuarioInput | LancamentoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
  }

  export type OrcamentoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<OrcamentoCreateWithoutUsuarioInput, OrcamentoUncheckedCreateWithoutUsuarioInput> | OrcamentoCreateWithoutUsuarioInput[] | OrcamentoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: OrcamentoCreateOrConnectWithoutUsuarioInput | OrcamentoCreateOrConnectWithoutUsuarioInput[]
    upsert?: OrcamentoUpsertWithWhereUniqueWithoutUsuarioInput | OrcamentoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: OrcamentoCreateManyUsuarioInputEnvelope
    set?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    disconnect?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    delete?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    connect?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    update?: OrcamentoUpdateWithWhereUniqueWithoutUsuarioInput | OrcamentoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: OrcamentoUpdateManyWithWhereWithoutUsuarioInput | OrcamentoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: OrcamentoScalarWhereInput | OrcamentoScalarWhereInput[]
  }

  export type ContaUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<ContaCreateWithoutUsuarioInput, ContaUncheckedCreateWithoutUsuarioInput> | ContaCreateWithoutUsuarioInput[] | ContaUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: ContaCreateOrConnectWithoutUsuarioInput | ContaCreateOrConnectWithoutUsuarioInput[]
    upsert?: ContaUpsertWithWhereUniqueWithoutUsuarioInput | ContaUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: ContaCreateManyUsuarioInputEnvelope
    set?: ContaWhereUniqueInput | ContaWhereUniqueInput[]
    disconnect?: ContaWhereUniqueInput | ContaWhereUniqueInput[]
    delete?: ContaWhereUniqueInput | ContaWhereUniqueInput[]
    connect?: ContaWhereUniqueInput | ContaWhereUniqueInput[]
    update?: ContaUpdateWithWhereUniqueWithoutUsuarioInput | ContaUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: ContaUpdateManyWithWhereWithoutUsuarioInput | ContaUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: ContaScalarWhereInput | ContaScalarWhereInput[]
  }

  export type AnalyticJobUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<AnalyticJobCreateWithoutUsuarioInput, AnalyticJobUncheckedCreateWithoutUsuarioInput> | AnalyticJobCreateWithoutUsuarioInput[] | AnalyticJobUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: AnalyticJobCreateOrConnectWithoutUsuarioInput | AnalyticJobCreateOrConnectWithoutUsuarioInput[]
    upsert?: AnalyticJobUpsertWithWhereUniqueWithoutUsuarioInput | AnalyticJobUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: AnalyticJobCreateManyUsuarioInputEnvelope
    set?: AnalyticJobWhereUniqueInput | AnalyticJobWhereUniqueInput[]
    disconnect?: AnalyticJobWhereUniqueInput | AnalyticJobWhereUniqueInput[]
    delete?: AnalyticJobWhereUniqueInput | AnalyticJobWhereUniqueInput[]
    connect?: AnalyticJobWhereUniqueInput | AnalyticJobWhereUniqueInput[]
    update?: AnalyticJobUpdateWithWhereUniqueWithoutUsuarioInput | AnalyticJobUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: AnalyticJobUpdateManyWithWhereWithoutUsuarioInput | AnalyticJobUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: AnalyticJobScalarWhereInput | AnalyticJobScalarWhereInput[]
  }

  export type InsightUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<InsightCreateWithoutUsuarioInput, InsightUncheckedCreateWithoutUsuarioInput> | InsightCreateWithoutUsuarioInput[] | InsightUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: InsightCreateOrConnectWithoutUsuarioInput | InsightCreateOrConnectWithoutUsuarioInput[]
    upsert?: InsightUpsertWithWhereUniqueWithoutUsuarioInput | InsightUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: InsightCreateManyUsuarioInputEnvelope
    set?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    disconnect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    delete?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    connect?: InsightWhereUniqueInput | InsightWhereUniqueInput[]
    update?: InsightUpdateWithWhereUniqueWithoutUsuarioInput | InsightUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: InsightUpdateManyWithWhereWithoutUsuarioInput | InsightUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: InsightScalarWhereInput | InsightScalarWhereInput[]
  }

  export type FinancialAlertUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<FinancialAlertCreateWithoutUsuarioInput, FinancialAlertUncheckedCreateWithoutUsuarioInput> | FinancialAlertCreateWithoutUsuarioInput[] | FinancialAlertUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: FinancialAlertCreateOrConnectWithoutUsuarioInput | FinancialAlertCreateOrConnectWithoutUsuarioInput[]
    upsert?: FinancialAlertUpsertWithWhereUniqueWithoutUsuarioInput | FinancialAlertUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: FinancialAlertCreateManyUsuarioInputEnvelope
    set?: FinancialAlertWhereUniqueInput | FinancialAlertWhereUniqueInput[]
    disconnect?: FinancialAlertWhereUniqueInput | FinancialAlertWhereUniqueInput[]
    delete?: FinancialAlertWhereUniqueInput | FinancialAlertWhereUniqueInput[]
    connect?: FinancialAlertWhereUniqueInput | FinancialAlertWhereUniqueInput[]
    update?: FinancialAlertUpdateWithWhereUniqueWithoutUsuarioInput | FinancialAlertUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: FinancialAlertUpdateManyWithWhereWithoutUsuarioInput | FinancialAlertUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: FinancialAlertScalarWhereInput | FinancialAlertScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<NotificationCreateWithoutUsuarioInput, NotificationUncheckedCreateWithoutUsuarioInput> | NotificationCreateWithoutUsuarioInput[] | NotificationUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUsuarioInput | NotificationCreateOrConnectWithoutUsuarioInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUsuarioInput | NotificationUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: NotificationCreateManyUsuarioInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUsuarioInput | NotificationUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUsuarioInput | NotificationUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutCategoriasInput = {
    create?: XOR<UsuarioCreateWithoutCategoriasInput, UsuarioUncheckedCreateWithoutCategoriasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutCategoriasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type LancamentoCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<LancamentoCreateWithoutCategoriaInput, LancamentoUncheckedCreateWithoutCategoriaInput> | LancamentoCreateWithoutCategoriaInput[] | LancamentoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutCategoriaInput | LancamentoCreateOrConnectWithoutCategoriaInput[]
    createMany?: LancamentoCreateManyCategoriaInputEnvelope
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
  }

  export type OrcamentoCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<OrcamentoCreateWithoutCategoriaInput, OrcamentoUncheckedCreateWithoutCategoriaInput> | OrcamentoCreateWithoutCategoriaInput[] | OrcamentoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: OrcamentoCreateOrConnectWithoutCategoriaInput | OrcamentoCreateOrConnectWithoutCategoriaInput[]
    createMany?: OrcamentoCreateManyCategoriaInputEnvelope
    connect?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
  }

  export type LancamentoUncheckedCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<LancamentoCreateWithoutCategoriaInput, LancamentoUncheckedCreateWithoutCategoriaInput> | LancamentoCreateWithoutCategoriaInput[] | LancamentoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutCategoriaInput | LancamentoCreateOrConnectWithoutCategoriaInput[]
    createMany?: LancamentoCreateManyCategoriaInputEnvelope
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
  }

  export type OrcamentoUncheckedCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<OrcamentoCreateWithoutCategoriaInput, OrcamentoUncheckedCreateWithoutCategoriaInput> | OrcamentoCreateWithoutCategoriaInput[] | OrcamentoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: OrcamentoCreateOrConnectWithoutCategoriaInput | OrcamentoCreateOrConnectWithoutCategoriaInput[]
    createMany?: OrcamentoCreateManyCategoriaInputEnvelope
    connect?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
  }

  export type EnumTipoCategoriaFieldUpdateOperationsInput = {
    set?: $Enums.TipoCategoria
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UsuarioUpdateOneWithoutCategoriasNestedInput = {
    create?: XOR<UsuarioCreateWithoutCategoriasInput, UsuarioUncheckedCreateWithoutCategoriasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutCategoriasInput
    upsert?: UsuarioUpsertWithoutCategoriasInput
    disconnect?: UsuarioWhereInput | boolean
    delete?: UsuarioWhereInput | boolean
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutCategoriasInput, UsuarioUpdateWithoutCategoriasInput>, UsuarioUncheckedUpdateWithoutCategoriasInput>
  }

  export type LancamentoUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<LancamentoCreateWithoutCategoriaInput, LancamentoUncheckedCreateWithoutCategoriaInput> | LancamentoCreateWithoutCategoriaInput[] | LancamentoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutCategoriaInput | LancamentoCreateOrConnectWithoutCategoriaInput[]
    upsert?: LancamentoUpsertWithWhereUniqueWithoutCategoriaInput | LancamentoUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: LancamentoCreateManyCategoriaInputEnvelope
    set?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    disconnect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    delete?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    update?: LancamentoUpdateWithWhereUniqueWithoutCategoriaInput | LancamentoUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: LancamentoUpdateManyWithWhereWithoutCategoriaInput | LancamentoUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
  }

  export type OrcamentoUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<OrcamentoCreateWithoutCategoriaInput, OrcamentoUncheckedCreateWithoutCategoriaInput> | OrcamentoCreateWithoutCategoriaInput[] | OrcamentoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: OrcamentoCreateOrConnectWithoutCategoriaInput | OrcamentoCreateOrConnectWithoutCategoriaInput[]
    upsert?: OrcamentoUpsertWithWhereUniqueWithoutCategoriaInput | OrcamentoUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: OrcamentoCreateManyCategoriaInputEnvelope
    set?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    disconnect?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    delete?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    connect?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    update?: OrcamentoUpdateWithWhereUniqueWithoutCategoriaInput | OrcamentoUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: OrcamentoUpdateManyWithWhereWithoutCategoriaInput | OrcamentoUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: OrcamentoScalarWhereInput | OrcamentoScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type LancamentoUncheckedUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<LancamentoCreateWithoutCategoriaInput, LancamentoUncheckedCreateWithoutCategoriaInput> | LancamentoCreateWithoutCategoriaInput[] | LancamentoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutCategoriaInput | LancamentoCreateOrConnectWithoutCategoriaInput[]
    upsert?: LancamentoUpsertWithWhereUniqueWithoutCategoriaInput | LancamentoUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: LancamentoCreateManyCategoriaInputEnvelope
    set?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    disconnect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    delete?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    update?: LancamentoUpdateWithWhereUniqueWithoutCategoriaInput | LancamentoUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: LancamentoUpdateManyWithWhereWithoutCategoriaInput | LancamentoUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
  }

  export type OrcamentoUncheckedUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<OrcamentoCreateWithoutCategoriaInput, OrcamentoUncheckedCreateWithoutCategoriaInput> | OrcamentoCreateWithoutCategoriaInput[] | OrcamentoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: OrcamentoCreateOrConnectWithoutCategoriaInput | OrcamentoCreateOrConnectWithoutCategoriaInput[]
    upsert?: OrcamentoUpsertWithWhereUniqueWithoutCategoriaInput | OrcamentoUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: OrcamentoCreateManyCategoriaInputEnvelope
    set?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    disconnect?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    delete?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    connect?: OrcamentoWhereUniqueInput | OrcamentoWhereUniqueInput[]
    update?: OrcamentoUpdateWithWhereUniqueWithoutCategoriaInput | OrcamentoUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: OrcamentoUpdateManyWithWhereWithoutCategoriaInput | OrcamentoUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: OrcamentoScalarWhereInput | OrcamentoScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutLancamentosInput = {
    create?: XOR<UsuarioCreateWithoutLancamentosInput, UsuarioUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutLancamentosInput
    connect?: UsuarioWhereUniqueInput
  }

  export type CategoriaCreateNestedOneWithoutLancamentosInput = {
    create?: XOR<CategoriaCreateWithoutLancamentosInput, CategoriaUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutLancamentosInput
    connect?: CategoriaWhereUniqueInput
  }

  export type ContaCreateNestedOneWithoutLancamentosInput = {
    create?: XOR<ContaCreateWithoutLancamentosInput, ContaUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: ContaCreateOrConnectWithoutLancamentosInput
    connect?: ContaWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumTipoRecorrenciaFieldUpdateOperationsInput = {
    set?: $Enums.TipoRecorrencia
  }

  export type EnumTipoLancamentoFieldUpdateOperationsInput = {
    set?: $Enums.TipoLancamento
  }

  export type UsuarioUpdateOneRequiredWithoutLancamentosNestedInput = {
    create?: XOR<UsuarioCreateWithoutLancamentosInput, UsuarioUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutLancamentosInput
    upsert?: UsuarioUpsertWithoutLancamentosInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutLancamentosInput, UsuarioUpdateWithoutLancamentosInput>, UsuarioUncheckedUpdateWithoutLancamentosInput>
  }

  export type CategoriaUpdateOneRequiredWithoutLancamentosNestedInput = {
    create?: XOR<CategoriaCreateWithoutLancamentosInput, CategoriaUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutLancamentosInput
    upsert?: CategoriaUpsertWithoutLancamentosInput
    connect?: CategoriaWhereUniqueInput
    update?: XOR<XOR<CategoriaUpdateToOneWithWhereWithoutLancamentosInput, CategoriaUpdateWithoutLancamentosInput>, CategoriaUncheckedUpdateWithoutLancamentosInput>
  }

  export type ContaUpdateOneWithoutLancamentosNestedInput = {
    create?: XOR<ContaCreateWithoutLancamentosInput, ContaUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: ContaCreateOrConnectWithoutLancamentosInput
    upsert?: ContaUpsertWithoutLancamentosInput
    disconnect?: ContaWhereInput | boolean
    delete?: ContaWhereInput | boolean
    connect?: ContaWhereUniqueInput
    update?: XOR<XOR<ContaUpdateToOneWithWhereWithoutLancamentosInput, ContaUpdateWithoutLancamentosInput>, ContaUncheckedUpdateWithoutLancamentosInput>
  }

  export type UsuarioCreateNestedOneWithoutContasInput = {
    create?: XOR<UsuarioCreateWithoutContasInput, UsuarioUncheckedCreateWithoutContasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutContasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type LancamentoCreateNestedManyWithoutContaInput = {
    create?: XOR<LancamentoCreateWithoutContaInput, LancamentoUncheckedCreateWithoutContaInput> | LancamentoCreateWithoutContaInput[] | LancamentoUncheckedCreateWithoutContaInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutContaInput | LancamentoCreateOrConnectWithoutContaInput[]
    createMany?: LancamentoCreateManyContaInputEnvelope
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
  }

  export type LancamentoUncheckedCreateNestedManyWithoutContaInput = {
    create?: XOR<LancamentoCreateWithoutContaInput, LancamentoUncheckedCreateWithoutContaInput> | LancamentoCreateWithoutContaInput[] | LancamentoUncheckedCreateWithoutContaInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutContaInput | LancamentoCreateOrConnectWithoutContaInput[]
    createMany?: LancamentoCreateManyContaInputEnvelope
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
  }

  export type EnumTipoContaBancariaFieldUpdateOperationsInput = {
    set?: $Enums.TipoContaBancaria
  }

  export type EnumModeloCartaoFieldUpdateOperationsInput = {
    set?: $Enums.ModeloCartao
  }

  export type UsuarioUpdateOneRequiredWithoutContasNestedInput = {
    create?: XOR<UsuarioCreateWithoutContasInput, UsuarioUncheckedCreateWithoutContasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutContasInput
    upsert?: UsuarioUpsertWithoutContasInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutContasInput, UsuarioUpdateWithoutContasInput>, UsuarioUncheckedUpdateWithoutContasInput>
  }

  export type LancamentoUpdateManyWithoutContaNestedInput = {
    create?: XOR<LancamentoCreateWithoutContaInput, LancamentoUncheckedCreateWithoutContaInput> | LancamentoCreateWithoutContaInput[] | LancamentoUncheckedCreateWithoutContaInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutContaInput | LancamentoCreateOrConnectWithoutContaInput[]
    upsert?: LancamentoUpsertWithWhereUniqueWithoutContaInput | LancamentoUpsertWithWhereUniqueWithoutContaInput[]
    createMany?: LancamentoCreateManyContaInputEnvelope
    set?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    disconnect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    delete?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    update?: LancamentoUpdateWithWhereUniqueWithoutContaInput | LancamentoUpdateWithWhereUniqueWithoutContaInput[]
    updateMany?: LancamentoUpdateManyWithWhereWithoutContaInput | LancamentoUpdateManyWithWhereWithoutContaInput[]
    deleteMany?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
  }

  export type LancamentoUncheckedUpdateManyWithoutContaNestedInput = {
    create?: XOR<LancamentoCreateWithoutContaInput, LancamentoUncheckedCreateWithoutContaInput> | LancamentoCreateWithoutContaInput[] | LancamentoUncheckedCreateWithoutContaInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutContaInput | LancamentoCreateOrConnectWithoutContaInput[]
    upsert?: LancamentoUpsertWithWhereUniqueWithoutContaInput | LancamentoUpsertWithWhereUniqueWithoutContaInput[]
    createMany?: LancamentoCreateManyContaInputEnvelope
    set?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    disconnect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    delete?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    update?: LancamentoUpdateWithWhereUniqueWithoutContaInput | LancamentoUpdateWithWhereUniqueWithoutContaInput[]
    updateMany?: LancamentoUpdateManyWithWhereWithoutContaInput | LancamentoUpdateManyWithWhereWithoutContaInput[]
    deleteMany?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutOrcamentosInput = {
    create?: XOR<UsuarioCreateWithoutOrcamentosInput, UsuarioUncheckedCreateWithoutOrcamentosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutOrcamentosInput
    connect?: UsuarioWhereUniqueInput
  }

  export type CategoriaCreateNestedOneWithoutOrcamentosInput = {
    create?: XOR<CategoriaCreateWithoutOrcamentosInput, CategoriaUncheckedCreateWithoutOrcamentosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutOrcamentosInput
    connect?: CategoriaWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UsuarioUpdateOneRequiredWithoutOrcamentosNestedInput = {
    create?: XOR<UsuarioCreateWithoutOrcamentosInput, UsuarioUncheckedCreateWithoutOrcamentosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutOrcamentosInput
    upsert?: UsuarioUpsertWithoutOrcamentosInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutOrcamentosInput, UsuarioUpdateWithoutOrcamentosInput>, UsuarioUncheckedUpdateWithoutOrcamentosInput>
  }

  export type CategoriaUpdateOneWithoutOrcamentosNestedInput = {
    create?: XOR<CategoriaCreateWithoutOrcamentosInput, CategoriaUncheckedCreateWithoutOrcamentosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutOrcamentosInput
    upsert?: CategoriaUpsertWithoutOrcamentosInput
    disconnect?: CategoriaWhereInput | boolean
    delete?: CategoriaWhereInput | boolean
    connect?: CategoriaWhereUniqueInput
    update?: XOR<XOR<CategoriaUpdateToOneWithWhereWithoutOrcamentosInput, CategoriaUpdateWithoutOrcamentosInput>, CategoriaUncheckedUpdateWithoutOrcamentosInput>
  }

  export type UsuarioCreateNestedOneWithoutAnalyticJobsInput = {
    create?: XOR<UsuarioCreateWithoutAnalyticJobsInput, UsuarioUncheckedCreateWithoutAnalyticJobsInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutAnalyticJobsInput
    connect?: UsuarioWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UsuarioUpdateOneRequiredWithoutAnalyticJobsNestedInput = {
    create?: XOR<UsuarioCreateWithoutAnalyticJobsInput, UsuarioUncheckedCreateWithoutAnalyticJobsInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutAnalyticJobsInput
    upsert?: UsuarioUpsertWithoutAnalyticJobsInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutAnalyticJobsInput, UsuarioUpdateWithoutAnalyticJobsInput>, UsuarioUncheckedUpdateWithoutAnalyticJobsInput>
  }

  export type UsuarioCreateNestedOneWithoutInsightsInput = {
    create?: XOR<UsuarioCreateWithoutInsightsInput, UsuarioUncheckedCreateWithoutInsightsInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutInsightsInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutInsightsNestedInput = {
    create?: XOR<UsuarioCreateWithoutInsightsInput, UsuarioUncheckedCreateWithoutInsightsInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutInsightsInput
    upsert?: UsuarioUpsertWithoutInsightsInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutInsightsInput, UsuarioUpdateWithoutInsightsInput>, UsuarioUncheckedUpdateWithoutInsightsInput>
  }

  export type UsuarioCreateNestedOneWithoutAlertasInput = {
    create?: XOR<UsuarioCreateWithoutAlertasInput, UsuarioUncheckedCreateWithoutAlertasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutAlertasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutAlertasNestedInput = {
    create?: XOR<UsuarioCreateWithoutAlertasInput, UsuarioUncheckedCreateWithoutAlertasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutAlertasInput
    upsert?: UsuarioUpsertWithoutAlertasInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutAlertasInput, UsuarioUpdateWithoutAlertasInput>, UsuarioUncheckedUpdateWithoutAlertasInput>
  }

  export type UsuarioCreateNestedOneWithoutNotificacoesInput = {
    create?: XOR<UsuarioCreateWithoutNotificacoesInput, UsuarioUncheckedCreateWithoutNotificacoesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutNotificacoesInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutNotificacoesNestedInput = {
    create?: XOR<UsuarioCreateWithoutNotificacoesInput, UsuarioUncheckedCreateWithoutNotificacoesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutNotificacoesInput
    upsert?: UsuarioUpsertWithoutNotificacoesInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutNotificacoesInput, UsuarioUpdateWithoutNotificacoesInput>, UsuarioUncheckedUpdateWithoutNotificacoesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumTipoCategoriaFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoCategoria | EnumTipoCategoriaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoCategoria[] | ListEnumTipoCategoriaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoCategoria[] | ListEnumTipoCategoriaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoCategoriaFilter<$PrismaModel> | $Enums.TipoCategoria
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumTipoCategoriaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoCategoria | EnumTipoCategoriaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoCategoria[] | ListEnumTipoCategoriaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoCategoria[] | ListEnumTipoCategoriaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoCategoriaWithAggregatesFilter<$PrismaModel> | $Enums.TipoCategoria
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoCategoriaFilter<$PrismaModel>
    _max?: NestedEnumTipoCategoriaFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumTipoRecorrenciaFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoRecorrencia | EnumTipoRecorrenciaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoRecorrencia[] | ListEnumTipoRecorrenciaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoRecorrencia[] | ListEnumTipoRecorrenciaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoRecorrenciaFilter<$PrismaModel> | $Enums.TipoRecorrencia
  }

  export type NestedEnumTipoLancamentoFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoLancamento | EnumTipoLancamentoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoLancamento[] | ListEnumTipoLancamentoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoLancamento[] | ListEnumTipoLancamentoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoLancamentoFilter<$PrismaModel> | $Enums.TipoLancamento
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumTipoRecorrenciaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoRecorrencia | EnumTipoRecorrenciaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoRecorrencia[] | ListEnumTipoRecorrenciaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoRecorrencia[] | ListEnumTipoRecorrenciaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoRecorrenciaWithAggregatesFilter<$PrismaModel> | $Enums.TipoRecorrencia
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoRecorrenciaFilter<$PrismaModel>
    _max?: NestedEnumTipoRecorrenciaFilter<$PrismaModel>
  }

  export type NestedEnumTipoLancamentoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoLancamento | EnumTipoLancamentoFieldRefInput<$PrismaModel>
    in?: $Enums.TipoLancamento[] | ListEnumTipoLancamentoFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoLancamento[] | ListEnumTipoLancamentoFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoLancamentoWithAggregatesFilter<$PrismaModel> | $Enums.TipoLancamento
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoLancamentoFilter<$PrismaModel>
    _max?: NestedEnumTipoLancamentoFilter<$PrismaModel>
  }

  export type NestedEnumTipoContaBancariaFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoContaBancaria | EnumTipoContaBancariaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoContaBancaria[] | ListEnumTipoContaBancariaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoContaBancaria[] | ListEnumTipoContaBancariaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoContaBancariaFilter<$PrismaModel> | $Enums.TipoContaBancaria
  }

  export type NestedEnumModeloCartaoFilter<$PrismaModel = never> = {
    equals?: $Enums.ModeloCartao | EnumModeloCartaoFieldRefInput<$PrismaModel>
    in?: $Enums.ModeloCartao[] | ListEnumModeloCartaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModeloCartao[] | ListEnumModeloCartaoFieldRefInput<$PrismaModel>
    not?: NestedEnumModeloCartaoFilter<$PrismaModel> | $Enums.ModeloCartao
  }

  export type NestedEnumTipoContaBancariaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoContaBancaria | EnumTipoContaBancariaFieldRefInput<$PrismaModel>
    in?: $Enums.TipoContaBancaria[] | ListEnumTipoContaBancariaFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoContaBancaria[] | ListEnumTipoContaBancariaFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoContaBancariaWithAggregatesFilter<$PrismaModel> | $Enums.TipoContaBancaria
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoContaBancariaFilter<$PrismaModel>
    _max?: NestedEnumTipoContaBancariaFilter<$PrismaModel>
  }

  export type NestedEnumModeloCartaoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModeloCartao | EnumModeloCartaoFieldRefInput<$PrismaModel>
    in?: $Enums.ModeloCartao[] | ListEnumModeloCartaoFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModeloCartao[] | ListEnumModeloCartaoFieldRefInput<$PrismaModel>
    not?: NestedEnumModeloCartaoWithAggregatesFilter<$PrismaModel> | $Enums.ModeloCartao
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModeloCartaoFilter<$PrismaModel>
    _max?: NestedEnumModeloCartaoFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CategoriaCreateWithoutUsuarioInput = {
    id?: string
    nome: string
    tipo: $Enums.TipoCategoria
    ehPadrao?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    lancamentos?: LancamentoCreateNestedManyWithoutCategoriaInput
    orcamentos?: OrcamentoCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUncheckedCreateWithoutUsuarioInput = {
    id?: string
    nome: string
    tipo: $Enums.TipoCategoria
    ehPadrao?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutCategoriaInput
    orcamentos?: OrcamentoUncheckedCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaCreateOrConnectWithoutUsuarioInput = {
    where: CategoriaWhereUniqueInput
    create: XOR<CategoriaCreateWithoutUsuarioInput, CategoriaUncheckedCreateWithoutUsuarioInput>
  }

  export type CategoriaCreateManyUsuarioInputEnvelope = {
    data: CategoriaCreateManyUsuarioInput | CategoriaCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type LancamentoCreateWithoutUsuarioInput = {
    id?: string
    valor: Decimal | DecimalJsLike | number | string
    dataTransacao: Date | string
    recorrencia?: $Enums.TipoRecorrencia
    tipo: $Enums.TipoLancamento
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categoria: CategoriaCreateNestedOneWithoutLancamentosInput
    conta?: ContaCreateNestedOneWithoutLancamentosInput
  }

  export type LancamentoUncheckedCreateWithoutUsuarioInput = {
    id?: string
    idCategoria: string
    idConta?: string | null
    valor: Decimal | DecimalJsLike | number | string
    dataTransacao: Date | string
    recorrencia?: $Enums.TipoRecorrencia
    tipo: $Enums.TipoLancamento
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type LancamentoCreateOrConnectWithoutUsuarioInput = {
    where: LancamentoWhereUniqueInput
    create: XOR<LancamentoCreateWithoutUsuarioInput, LancamentoUncheckedCreateWithoutUsuarioInput>
  }

  export type LancamentoCreateManyUsuarioInputEnvelope = {
    data: LancamentoCreateManyUsuarioInput | LancamentoCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type OrcamentoCreateWithoutUsuarioInput = {
    id?: string
    valor: Decimal | DecimalJsLike | number | string
    mes: number
    ano: number
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categoria?: CategoriaCreateNestedOneWithoutOrcamentosInput
  }

  export type OrcamentoUncheckedCreateWithoutUsuarioInput = {
    id?: string
    idCategoria?: string | null
    valor: Decimal | DecimalJsLike | number | string
    mes: number
    ano: number
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type OrcamentoCreateOrConnectWithoutUsuarioInput = {
    where: OrcamentoWhereUniqueInput
    create: XOR<OrcamentoCreateWithoutUsuarioInput, OrcamentoUncheckedCreateWithoutUsuarioInput>
  }

  export type OrcamentoCreateManyUsuarioInputEnvelope = {
    data: OrcamentoCreateManyUsuarioInput | OrcamentoCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type ContaCreateWithoutUsuarioInput = {
    id?: string
    nome: string
    tipo: $Enums.TipoContaBancaria
    saldoInicial: Decimal | DecimalJsLike | number | string
    modeloCartao?: $Enums.ModeloCartao
    descricao?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    lancamentos?: LancamentoCreateNestedManyWithoutContaInput
  }

  export type ContaUncheckedCreateWithoutUsuarioInput = {
    id?: string
    nome: string
    tipo: $Enums.TipoContaBancaria
    saldoInicial: Decimal | DecimalJsLike | number | string
    modeloCartao?: $Enums.ModeloCartao
    descricao?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutContaInput
  }

  export type ContaCreateOrConnectWithoutUsuarioInput = {
    where: ContaWhereUniqueInput
    create: XOR<ContaCreateWithoutUsuarioInput, ContaUncheckedCreateWithoutUsuarioInput>
  }

  export type ContaCreateManyUsuarioInputEnvelope = {
    data: ContaCreateManyUsuarioInput | ContaCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type AnalyticJobCreateWithoutUsuarioInput = {
    id?: string
    tipo: string
    status: string
    payload: JsonNullValueInput | InputJsonValue
    resultado?: NullableJsonNullValueInput | InputJsonValue
    erro?: string | null
    criadoEm?: Date | string
    iniciadoEm?: Date | string | null
    finalizadoEm?: Date | string | null
  }

  export type AnalyticJobUncheckedCreateWithoutUsuarioInput = {
    id?: string
    tipo: string
    status: string
    payload: JsonNullValueInput | InputJsonValue
    resultado?: NullableJsonNullValueInput | InputJsonValue
    erro?: string | null
    criadoEm?: Date | string
    iniciadoEm?: Date | string | null
    finalizadoEm?: Date | string | null
  }

  export type AnalyticJobCreateOrConnectWithoutUsuarioInput = {
    where: AnalyticJobWhereUniqueInput
    create: XOR<AnalyticJobCreateWithoutUsuarioInput, AnalyticJobUncheckedCreateWithoutUsuarioInput>
  }

  export type AnalyticJobCreateManyUsuarioInputEnvelope = {
    data: AnalyticJobCreateManyUsuarioInput | AnalyticJobCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type InsightCreateWithoutUsuarioInput = {
    id?: string
    tipo: string
    titulo: string
    descricao: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: Date | string
  }

  export type InsightUncheckedCreateWithoutUsuarioInput = {
    id?: string
    tipo: string
    titulo: string
    descricao: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: Date | string
  }

  export type InsightCreateOrConnectWithoutUsuarioInput = {
    where: InsightWhereUniqueInput
    create: XOR<InsightCreateWithoutUsuarioInput, InsightUncheckedCreateWithoutUsuarioInput>
  }

  export type InsightCreateManyUsuarioInputEnvelope = {
    data: InsightCreateManyUsuarioInput | InsightCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type FinancialAlertCreateWithoutUsuarioInput = {
    id?: string
    tipo: string
    severidade: string
    titulo: string
    mensagem: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    lidoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type FinancialAlertUncheckedCreateWithoutUsuarioInput = {
    id?: string
    tipo: string
    severidade: string
    titulo: string
    mensagem: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    lidoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type FinancialAlertCreateOrConnectWithoutUsuarioInput = {
    where: FinancialAlertWhereUniqueInput
    create: XOR<FinancialAlertCreateWithoutUsuarioInput, FinancialAlertUncheckedCreateWithoutUsuarioInput>
  }

  export type FinancialAlertCreateManyUsuarioInputEnvelope = {
    data: FinancialAlertCreateManyUsuarioInput | FinancialAlertCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUsuarioInput = {
    id?: string
    tipo: string
    titulo: string
    mensagem: string
    canal: string
    status: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    enviadaEm?: Date | string | null
    lidaEm?: Date | string | null
    erro?: string | null
    criadoEm?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUsuarioInput = {
    id?: string
    tipo: string
    titulo: string
    mensagem: string
    canal: string
    status: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    enviadaEm?: Date | string | null
    lidaEm?: Date | string | null
    erro?: string | null
    criadoEm?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUsuarioInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUsuarioInput, NotificationUncheckedCreateWithoutUsuarioInput>
  }

  export type NotificationCreateManyUsuarioInputEnvelope = {
    data: NotificationCreateManyUsuarioInput | NotificationCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type CategoriaUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: CategoriaWhereUniqueInput
    update: XOR<CategoriaUpdateWithoutUsuarioInput, CategoriaUncheckedUpdateWithoutUsuarioInput>
    create: XOR<CategoriaCreateWithoutUsuarioInput, CategoriaUncheckedCreateWithoutUsuarioInput>
  }

  export type CategoriaUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: CategoriaWhereUniqueInput
    data: XOR<CategoriaUpdateWithoutUsuarioInput, CategoriaUncheckedUpdateWithoutUsuarioInput>
  }

  export type CategoriaUpdateManyWithWhereWithoutUsuarioInput = {
    where: CategoriaScalarWhereInput
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type CategoriaScalarWhereInput = {
    AND?: CategoriaScalarWhereInput | CategoriaScalarWhereInput[]
    OR?: CategoriaScalarWhereInput[]
    NOT?: CategoriaScalarWhereInput | CategoriaScalarWhereInput[]
    id?: StringFilter<"Categoria"> | string
    idUsuario?: StringNullableFilter<"Categoria"> | string | null
    nome?: StringFilter<"Categoria"> | string
    tipo?: EnumTipoCategoriaFilter<"Categoria"> | $Enums.TipoCategoria
    ehPadrao?: BoolFilter<"Categoria"> | boolean
    criadoEm?: DateTimeFilter<"Categoria"> | Date | string
    atualizadoEm?: DateTimeFilter<"Categoria"> | Date | string
  }

  export type LancamentoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: LancamentoWhereUniqueInput
    update: XOR<LancamentoUpdateWithoutUsuarioInput, LancamentoUncheckedUpdateWithoutUsuarioInput>
    create: XOR<LancamentoCreateWithoutUsuarioInput, LancamentoUncheckedCreateWithoutUsuarioInput>
  }

  export type LancamentoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: LancamentoWhereUniqueInput
    data: XOR<LancamentoUpdateWithoutUsuarioInput, LancamentoUncheckedUpdateWithoutUsuarioInput>
  }

  export type LancamentoUpdateManyWithWhereWithoutUsuarioInput = {
    where: LancamentoScalarWhereInput
    data: XOR<LancamentoUpdateManyMutationInput, LancamentoUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type LancamentoScalarWhereInput = {
    AND?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
    OR?: LancamentoScalarWhereInput[]
    NOT?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
    id?: StringFilter<"Lancamento"> | string
    idUsuario?: StringFilter<"Lancamento"> | string
    idCategoria?: StringFilter<"Lancamento"> | string
    idConta?: StringNullableFilter<"Lancamento"> | string | null
    valor?: DecimalFilter<"Lancamento"> | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFilter<"Lancamento"> | Date | string
    recorrencia?: EnumTipoRecorrenciaFilter<"Lancamento"> | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFilter<"Lancamento"> | $Enums.TipoLancamento
    descricao?: StringNullableFilter<"Lancamento"> | string | null
    criadoEm?: DateTimeFilter<"Lancamento"> | Date | string
    atualizadoEm?: DateTimeFilter<"Lancamento"> | Date | string
  }

  export type OrcamentoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: OrcamentoWhereUniqueInput
    update: XOR<OrcamentoUpdateWithoutUsuarioInput, OrcamentoUncheckedUpdateWithoutUsuarioInput>
    create: XOR<OrcamentoCreateWithoutUsuarioInput, OrcamentoUncheckedCreateWithoutUsuarioInput>
  }

  export type OrcamentoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: OrcamentoWhereUniqueInput
    data: XOR<OrcamentoUpdateWithoutUsuarioInput, OrcamentoUncheckedUpdateWithoutUsuarioInput>
  }

  export type OrcamentoUpdateManyWithWhereWithoutUsuarioInput = {
    where: OrcamentoScalarWhereInput
    data: XOR<OrcamentoUpdateManyMutationInput, OrcamentoUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type OrcamentoScalarWhereInput = {
    AND?: OrcamentoScalarWhereInput | OrcamentoScalarWhereInput[]
    OR?: OrcamentoScalarWhereInput[]
    NOT?: OrcamentoScalarWhereInput | OrcamentoScalarWhereInput[]
    id?: StringFilter<"Orcamento"> | string
    idUsuario?: StringFilter<"Orcamento"> | string
    idCategoria?: StringNullableFilter<"Orcamento"> | string | null
    valor?: DecimalFilter<"Orcamento"> | Decimal | DecimalJsLike | number | string
    mes?: IntFilter<"Orcamento"> | number
    ano?: IntFilter<"Orcamento"> | number
    descricao?: StringNullableFilter<"Orcamento"> | string | null
    criadoEm?: DateTimeFilter<"Orcamento"> | Date | string
    atualizadoEm?: DateTimeFilter<"Orcamento"> | Date | string
  }

  export type ContaUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: ContaWhereUniqueInput
    update: XOR<ContaUpdateWithoutUsuarioInput, ContaUncheckedUpdateWithoutUsuarioInput>
    create: XOR<ContaCreateWithoutUsuarioInput, ContaUncheckedCreateWithoutUsuarioInput>
  }

  export type ContaUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: ContaWhereUniqueInput
    data: XOR<ContaUpdateWithoutUsuarioInput, ContaUncheckedUpdateWithoutUsuarioInput>
  }

  export type ContaUpdateManyWithWhereWithoutUsuarioInput = {
    where: ContaScalarWhereInput
    data: XOR<ContaUpdateManyMutationInput, ContaUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type ContaScalarWhereInput = {
    AND?: ContaScalarWhereInput | ContaScalarWhereInput[]
    OR?: ContaScalarWhereInput[]
    NOT?: ContaScalarWhereInput | ContaScalarWhereInput[]
    id?: StringFilter<"Conta"> | string
    idUsuario?: StringFilter<"Conta"> | string
    nome?: StringFilter<"Conta"> | string
    tipo?: EnumTipoContaBancariaFilter<"Conta"> | $Enums.TipoContaBancaria
    saldoInicial?: DecimalFilter<"Conta"> | Decimal | DecimalJsLike | number | string
    modeloCartao?: EnumModeloCartaoFilter<"Conta"> | $Enums.ModeloCartao
    descricao?: StringNullableFilter<"Conta"> | string | null
    ativa?: BoolFilter<"Conta"> | boolean
    criadoEm?: DateTimeFilter<"Conta"> | Date | string
    atualizadoEm?: DateTimeFilter<"Conta"> | Date | string
  }

  export type AnalyticJobUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: AnalyticJobWhereUniqueInput
    update: XOR<AnalyticJobUpdateWithoutUsuarioInput, AnalyticJobUncheckedUpdateWithoutUsuarioInput>
    create: XOR<AnalyticJobCreateWithoutUsuarioInput, AnalyticJobUncheckedCreateWithoutUsuarioInput>
  }

  export type AnalyticJobUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: AnalyticJobWhereUniqueInput
    data: XOR<AnalyticJobUpdateWithoutUsuarioInput, AnalyticJobUncheckedUpdateWithoutUsuarioInput>
  }

  export type AnalyticJobUpdateManyWithWhereWithoutUsuarioInput = {
    where: AnalyticJobScalarWhereInput
    data: XOR<AnalyticJobUpdateManyMutationInput, AnalyticJobUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type AnalyticJobScalarWhereInput = {
    AND?: AnalyticJobScalarWhereInput | AnalyticJobScalarWhereInput[]
    OR?: AnalyticJobScalarWhereInput[]
    NOT?: AnalyticJobScalarWhereInput | AnalyticJobScalarWhereInput[]
    id?: StringFilter<"AnalyticJob"> | string
    idUsuario?: StringFilter<"AnalyticJob"> | string
    tipo?: StringFilter<"AnalyticJob"> | string
    status?: StringFilter<"AnalyticJob"> | string
    payload?: JsonFilter<"AnalyticJob">
    resultado?: JsonNullableFilter<"AnalyticJob">
    erro?: StringNullableFilter<"AnalyticJob"> | string | null
    criadoEm?: DateTimeFilter<"AnalyticJob"> | Date | string
    iniciadoEm?: DateTimeNullableFilter<"AnalyticJob"> | Date | string | null
    finalizadoEm?: DateTimeNullableFilter<"AnalyticJob"> | Date | string | null
  }

  export type InsightUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: InsightWhereUniqueInput
    update: XOR<InsightUpdateWithoutUsuarioInput, InsightUncheckedUpdateWithoutUsuarioInput>
    create: XOR<InsightCreateWithoutUsuarioInput, InsightUncheckedCreateWithoutUsuarioInput>
  }

  export type InsightUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: InsightWhereUniqueInput
    data: XOR<InsightUpdateWithoutUsuarioInput, InsightUncheckedUpdateWithoutUsuarioInput>
  }

  export type InsightUpdateManyWithWhereWithoutUsuarioInput = {
    where: InsightScalarWhereInput
    data: XOR<InsightUpdateManyMutationInput, InsightUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type InsightScalarWhereInput = {
    AND?: InsightScalarWhereInput | InsightScalarWhereInput[]
    OR?: InsightScalarWhereInput[]
    NOT?: InsightScalarWhereInput | InsightScalarWhereInput[]
    id?: StringFilter<"Insight"> | string
    idUsuario?: StringFilter<"Insight"> | string
    tipo?: StringFilter<"Insight"> | string
    titulo?: StringFilter<"Insight"> | string
    descricao?: StringFilter<"Insight"> | string
    dados?: JsonNullableFilter<"Insight">
    criadoEm?: DateTimeFilter<"Insight"> | Date | string
  }

  export type FinancialAlertUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: FinancialAlertWhereUniqueInput
    update: XOR<FinancialAlertUpdateWithoutUsuarioInput, FinancialAlertUncheckedUpdateWithoutUsuarioInput>
    create: XOR<FinancialAlertCreateWithoutUsuarioInput, FinancialAlertUncheckedCreateWithoutUsuarioInput>
  }

  export type FinancialAlertUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: FinancialAlertWhereUniqueInput
    data: XOR<FinancialAlertUpdateWithoutUsuarioInput, FinancialAlertUncheckedUpdateWithoutUsuarioInput>
  }

  export type FinancialAlertUpdateManyWithWhereWithoutUsuarioInput = {
    where: FinancialAlertScalarWhereInput
    data: XOR<FinancialAlertUpdateManyMutationInput, FinancialAlertUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type FinancialAlertScalarWhereInput = {
    AND?: FinancialAlertScalarWhereInput | FinancialAlertScalarWhereInput[]
    OR?: FinancialAlertScalarWhereInput[]
    NOT?: FinancialAlertScalarWhereInput | FinancialAlertScalarWhereInput[]
    id?: StringFilter<"FinancialAlert"> | string
    idUsuario?: StringFilter<"FinancialAlert"> | string
    tipo?: StringFilter<"FinancialAlert"> | string
    severidade?: StringFilter<"FinancialAlert"> | string
    titulo?: StringFilter<"FinancialAlert"> | string
    mensagem?: StringFilter<"FinancialAlert"> | string
    dados?: JsonNullableFilter<"FinancialAlert">
    lidoEm?: DateTimeNullableFilter<"FinancialAlert"> | Date | string | null
    criadoEm?: DateTimeFilter<"FinancialAlert"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUsuarioInput, NotificationUncheckedUpdateWithoutUsuarioInput>
    create: XOR<NotificationCreateWithoutUsuarioInput, NotificationUncheckedCreateWithoutUsuarioInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUsuarioInput, NotificationUncheckedUpdateWithoutUsuarioInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUsuarioInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    idUsuario?: StringFilter<"Notification"> | string
    tipo?: StringFilter<"Notification"> | string
    titulo?: StringFilter<"Notification"> | string
    mensagem?: StringFilter<"Notification"> | string
    canal?: StringFilter<"Notification"> | string
    status?: StringFilter<"Notification"> | string
    dados?: JsonNullableFilter<"Notification">
    enviadaEm?: DateTimeNullableFilter<"Notification"> | Date | string | null
    lidaEm?: DateTimeNullableFilter<"Notification"> | Date | string | null
    erro?: StringNullableFilter<"Notification"> | string | null
    criadoEm?: DateTimeFilter<"Notification"> | Date | string
  }

  export type UsuarioCreateWithoutCategoriasInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    lancamentos?: LancamentoCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoCreateNestedManyWithoutUsuarioInput
    contas?: ContaCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobCreateNestedManyWithoutUsuarioInput
    insights?: InsightCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutCategoriasInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoUncheckedCreateNestedManyWithoutUsuarioInput
    contas?: ContaUncheckedCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobUncheckedCreateNestedManyWithoutUsuarioInput
    insights?: InsightUncheckedCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertUncheckedCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutCategoriasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutCategoriasInput, UsuarioUncheckedCreateWithoutCategoriasInput>
  }

  export type LancamentoCreateWithoutCategoriaInput = {
    id?: string
    valor: Decimal | DecimalJsLike | number | string
    dataTransacao: Date | string
    recorrencia?: $Enums.TipoRecorrencia
    tipo: $Enums.TipoLancamento
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario: UsuarioCreateNestedOneWithoutLancamentosInput
    conta?: ContaCreateNestedOneWithoutLancamentosInput
  }

  export type LancamentoUncheckedCreateWithoutCategoriaInput = {
    id?: string
    idUsuario: string
    idConta?: string | null
    valor: Decimal | DecimalJsLike | number | string
    dataTransacao: Date | string
    recorrencia?: $Enums.TipoRecorrencia
    tipo: $Enums.TipoLancamento
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type LancamentoCreateOrConnectWithoutCategoriaInput = {
    where: LancamentoWhereUniqueInput
    create: XOR<LancamentoCreateWithoutCategoriaInput, LancamentoUncheckedCreateWithoutCategoriaInput>
  }

  export type LancamentoCreateManyCategoriaInputEnvelope = {
    data: LancamentoCreateManyCategoriaInput | LancamentoCreateManyCategoriaInput[]
    skipDuplicates?: boolean
  }

  export type OrcamentoCreateWithoutCategoriaInput = {
    id?: string
    valor: Decimal | DecimalJsLike | number | string
    mes: number
    ano: number
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario: UsuarioCreateNestedOneWithoutOrcamentosInput
  }

  export type OrcamentoUncheckedCreateWithoutCategoriaInput = {
    id?: string
    idUsuario: string
    valor: Decimal | DecimalJsLike | number | string
    mes: number
    ano: number
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type OrcamentoCreateOrConnectWithoutCategoriaInput = {
    where: OrcamentoWhereUniqueInput
    create: XOR<OrcamentoCreateWithoutCategoriaInput, OrcamentoUncheckedCreateWithoutCategoriaInput>
  }

  export type OrcamentoCreateManyCategoriaInputEnvelope = {
    data: OrcamentoCreateManyCategoriaInput | OrcamentoCreateManyCategoriaInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithoutCategoriasInput = {
    update: XOR<UsuarioUpdateWithoutCategoriasInput, UsuarioUncheckedUpdateWithoutCategoriasInput>
    create: XOR<UsuarioCreateWithoutCategoriasInput, UsuarioUncheckedCreateWithoutCategoriasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutCategoriasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutCategoriasInput, UsuarioUncheckedUpdateWithoutCategoriasInput>
  }

  export type UsuarioUpdateWithoutCategoriasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutCategoriasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUncheckedUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUncheckedUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUncheckedUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type LancamentoUpsertWithWhereUniqueWithoutCategoriaInput = {
    where: LancamentoWhereUniqueInput
    update: XOR<LancamentoUpdateWithoutCategoriaInput, LancamentoUncheckedUpdateWithoutCategoriaInput>
    create: XOR<LancamentoCreateWithoutCategoriaInput, LancamentoUncheckedCreateWithoutCategoriaInput>
  }

  export type LancamentoUpdateWithWhereUniqueWithoutCategoriaInput = {
    where: LancamentoWhereUniqueInput
    data: XOR<LancamentoUpdateWithoutCategoriaInput, LancamentoUncheckedUpdateWithoutCategoriaInput>
  }

  export type LancamentoUpdateManyWithWhereWithoutCategoriaInput = {
    where: LancamentoScalarWhereInput
    data: XOR<LancamentoUpdateManyMutationInput, LancamentoUncheckedUpdateManyWithoutCategoriaInput>
  }

  export type OrcamentoUpsertWithWhereUniqueWithoutCategoriaInput = {
    where: OrcamentoWhereUniqueInput
    update: XOR<OrcamentoUpdateWithoutCategoriaInput, OrcamentoUncheckedUpdateWithoutCategoriaInput>
    create: XOR<OrcamentoCreateWithoutCategoriaInput, OrcamentoUncheckedCreateWithoutCategoriaInput>
  }

  export type OrcamentoUpdateWithWhereUniqueWithoutCategoriaInput = {
    where: OrcamentoWhereUniqueInput
    data: XOR<OrcamentoUpdateWithoutCategoriaInput, OrcamentoUncheckedUpdateWithoutCategoriaInput>
  }

  export type OrcamentoUpdateManyWithWhereWithoutCategoriaInput = {
    where: OrcamentoScalarWhereInput
    data: XOR<OrcamentoUpdateManyMutationInput, OrcamentoUncheckedUpdateManyWithoutCategoriaInput>
  }

  export type UsuarioCreateWithoutLancamentosInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoCreateNestedManyWithoutUsuarioInput
    contas?: ContaCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobCreateNestedManyWithoutUsuarioInput
    insights?: InsightCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutLancamentosInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaUncheckedCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoUncheckedCreateNestedManyWithoutUsuarioInput
    contas?: ContaUncheckedCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobUncheckedCreateNestedManyWithoutUsuarioInput
    insights?: InsightUncheckedCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertUncheckedCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutLancamentosInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutLancamentosInput, UsuarioUncheckedCreateWithoutLancamentosInput>
  }

  export type CategoriaCreateWithoutLancamentosInput = {
    id?: string
    nome: string
    tipo: $Enums.TipoCategoria
    ehPadrao?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario?: UsuarioCreateNestedOneWithoutCategoriasInput
    orcamentos?: OrcamentoCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUncheckedCreateWithoutLancamentosInput = {
    id?: string
    idUsuario?: string | null
    nome: string
    tipo: $Enums.TipoCategoria
    ehPadrao?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    orcamentos?: OrcamentoUncheckedCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaCreateOrConnectWithoutLancamentosInput = {
    where: CategoriaWhereUniqueInput
    create: XOR<CategoriaCreateWithoutLancamentosInput, CategoriaUncheckedCreateWithoutLancamentosInput>
  }

  export type ContaCreateWithoutLancamentosInput = {
    id?: string
    nome: string
    tipo: $Enums.TipoContaBancaria
    saldoInicial: Decimal | DecimalJsLike | number | string
    modeloCartao?: $Enums.ModeloCartao
    descricao?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario: UsuarioCreateNestedOneWithoutContasInput
  }

  export type ContaUncheckedCreateWithoutLancamentosInput = {
    id?: string
    idUsuario: string
    nome: string
    tipo: $Enums.TipoContaBancaria
    saldoInicial: Decimal | DecimalJsLike | number | string
    modeloCartao?: $Enums.ModeloCartao
    descricao?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ContaCreateOrConnectWithoutLancamentosInput = {
    where: ContaWhereUniqueInput
    create: XOR<ContaCreateWithoutLancamentosInput, ContaUncheckedCreateWithoutLancamentosInput>
  }

  export type UsuarioUpsertWithoutLancamentosInput = {
    update: XOR<UsuarioUpdateWithoutLancamentosInput, UsuarioUncheckedUpdateWithoutLancamentosInput>
    create: XOR<UsuarioCreateWithoutLancamentosInput, UsuarioUncheckedCreateWithoutLancamentosInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutLancamentosInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutLancamentosInput, UsuarioUncheckedUpdateWithoutLancamentosInput>
  }

  export type UsuarioUpdateWithoutLancamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutLancamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUncheckedUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUncheckedUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUncheckedUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUncheckedUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type CategoriaUpsertWithoutLancamentosInput = {
    update: XOR<CategoriaUpdateWithoutLancamentosInput, CategoriaUncheckedUpdateWithoutLancamentosInput>
    create: XOR<CategoriaCreateWithoutLancamentosInput, CategoriaUncheckedCreateWithoutLancamentosInput>
    where?: CategoriaWhereInput
  }

  export type CategoriaUpdateToOneWithWhereWithoutLancamentosInput = {
    where?: CategoriaWhereInput
    data: XOR<CategoriaUpdateWithoutLancamentosInput, CategoriaUncheckedUpdateWithoutLancamentosInput>
  }

  export type CategoriaUpdateWithoutLancamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoCategoriaFieldUpdateOperationsInput | $Enums.TipoCategoria
    ehPadrao?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneWithoutCategoriasNestedInput
    orcamentos?: OrcamentoUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaUncheckedUpdateWithoutLancamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoCategoriaFieldUpdateOperationsInput | $Enums.TipoCategoria
    ehPadrao?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    orcamentos?: OrcamentoUncheckedUpdateManyWithoutCategoriaNestedInput
  }

  export type ContaUpsertWithoutLancamentosInput = {
    update: XOR<ContaUpdateWithoutLancamentosInput, ContaUncheckedUpdateWithoutLancamentosInput>
    create: XOR<ContaCreateWithoutLancamentosInput, ContaUncheckedCreateWithoutLancamentosInput>
    where?: ContaWhereInput
  }

  export type ContaUpdateToOneWithWhereWithoutLancamentosInput = {
    where?: ContaWhereInput
    data: XOR<ContaUpdateWithoutLancamentosInput, ContaUncheckedUpdateWithoutLancamentosInput>
  }

  export type ContaUpdateWithoutLancamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoContaBancariaFieldUpdateOperationsInput | $Enums.TipoContaBancaria
    saldoInicial?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    modeloCartao?: EnumModeloCartaoFieldUpdateOperationsInput | $Enums.ModeloCartao
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutContasNestedInput
  }

  export type ContaUncheckedUpdateWithoutLancamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoContaBancariaFieldUpdateOperationsInput | $Enums.TipoContaBancaria
    saldoInicial?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    modeloCartao?: EnumModeloCartaoFieldUpdateOperationsInput | $Enums.ModeloCartao
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateWithoutContasInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaCreateNestedManyWithoutUsuarioInput
    lancamentos?: LancamentoCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobCreateNestedManyWithoutUsuarioInput
    insights?: InsightCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutContasInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaUncheckedCreateNestedManyWithoutUsuarioInput
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoUncheckedCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobUncheckedCreateNestedManyWithoutUsuarioInput
    insights?: InsightUncheckedCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertUncheckedCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutContasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutContasInput, UsuarioUncheckedCreateWithoutContasInput>
  }

  export type LancamentoCreateWithoutContaInput = {
    id?: string
    valor: Decimal | DecimalJsLike | number | string
    dataTransacao: Date | string
    recorrencia?: $Enums.TipoRecorrencia
    tipo: $Enums.TipoLancamento
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario: UsuarioCreateNestedOneWithoutLancamentosInput
    categoria: CategoriaCreateNestedOneWithoutLancamentosInput
  }

  export type LancamentoUncheckedCreateWithoutContaInput = {
    id?: string
    idUsuario: string
    idCategoria: string
    valor: Decimal | DecimalJsLike | number | string
    dataTransacao: Date | string
    recorrencia?: $Enums.TipoRecorrencia
    tipo: $Enums.TipoLancamento
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type LancamentoCreateOrConnectWithoutContaInput = {
    where: LancamentoWhereUniqueInput
    create: XOR<LancamentoCreateWithoutContaInput, LancamentoUncheckedCreateWithoutContaInput>
  }

  export type LancamentoCreateManyContaInputEnvelope = {
    data: LancamentoCreateManyContaInput | LancamentoCreateManyContaInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithoutContasInput = {
    update: XOR<UsuarioUpdateWithoutContasInput, UsuarioUncheckedUpdateWithoutContasInput>
    create: XOR<UsuarioCreateWithoutContasInput, UsuarioUncheckedCreateWithoutContasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutContasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutContasInput, UsuarioUncheckedUpdateWithoutContasInput>
  }

  export type UsuarioUpdateWithoutContasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUpdateManyWithoutUsuarioNestedInput
    lancamentos?: LancamentoUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutContasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUncheckedUpdateManyWithoutUsuarioNestedInput
    lancamentos?: LancamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUncheckedUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUncheckedUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type LancamentoUpsertWithWhereUniqueWithoutContaInput = {
    where: LancamentoWhereUniqueInput
    update: XOR<LancamentoUpdateWithoutContaInput, LancamentoUncheckedUpdateWithoutContaInput>
    create: XOR<LancamentoCreateWithoutContaInput, LancamentoUncheckedCreateWithoutContaInput>
  }

  export type LancamentoUpdateWithWhereUniqueWithoutContaInput = {
    where: LancamentoWhereUniqueInput
    data: XOR<LancamentoUpdateWithoutContaInput, LancamentoUncheckedUpdateWithoutContaInput>
  }

  export type LancamentoUpdateManyWithWhereWithoutContaInput = {
    where: LancamentoScalarWhereInput
    data: XOR<LancamentoUpdateManyMutationInput, LancamentoUncheckedUpdateManyWithoutContaInput>
  }

  export type UsuarioCreateWithoutOrcamentosInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaCreateNestedManyWithoutUsuarioInput
    lancamentos?: LancamentoCreateNestedManyWithoutUsuarioInput
    contas?: ContaCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobCreateNestedManyWithoutUsuarioInput
    insights?: InsightCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutOrcamentosInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaUncheckedCreateNestedManyWithoutUsuarioInput
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutUsuarioInput
    contas?: ContaUncheckedCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobUncheckedCreateNestedManyWithoutUsuarioInput
    insights?: InsightUncheckedCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertUncheckedCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutOrcamentosInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutOrcamentosInput, UsuarioUncheckedCreateWithoutOrcamentosInput>
  }

  export type CategoriaCreateWithoutOrcamentosInput = {
    id?: string
    nome: string
    tipo: $Enums.TipoCategoria
    ehPadrao?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    usuario?: UsuarioCreateNestedOneWithoutCategoriasInput
    lancamentos?: LancamentoCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUncheckedCreateWithoutOrcamentosInput = {
    id?: string
    idUsuario?: string | null
    nome: string
    tipo: $Enums.TipoCategoria
    ehPadrao?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaCreateOrConnectWithoutOrcamentosInput = {
    where: CategoriaWhereUniqueInput
    create: XOR<CategoriaCreateWithoutOrcamentosInput, CategoriaUncheckedCreateWithoutOrcamentosInput>
  }

  export type UsuarioUpsertWithoutOrcamentosInput = {
    update: XOR<UsuarioUpdateWithoutOrcamentosInput, UsuarioUncheckedUpdateWithoutOrcamentosInput>
    create: XOR<UsuarioCreateWithoutOrcamentosInput, UsuarioUncheckedCreateWithoutOrcamentosInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutOrcamentosInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutOrcamentosInput, UsuarioUncheckedUpdateWithoutOrcamentosInput>
  }

  export type UsuarioUpdateWithoutOrcamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUpdateManyWithoutUsuarioNestedInput
    lancamentos?: LancamentoUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutOrcamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUncheckedUpdateManyWithoutUsuarioNestedInput
    lancamentos?: LancamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUncheckedUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUncheckedUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUncheckedUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type CategoriaUpsertWithoutOrcamentosInput = {
    update: XOR<CategoriaUpdateWithoutOrcamentosInput, CategoriaUncheckedUpdateWithoutOrcamentosInput>
    create: XOR<CategoriaCreateWithoutOrcamentosInput, CategoriaUncheckedCreateWithoutOrcamentosInput>
    where?: CategoriaWhereInput
  }

  export type CategoriaUpdateToOneWithWhereWithoutOrcamentosInput = {
    where?: CategoriaWhereInput
    data: XOR<CategoriaUpdateWithoutOrcamentosInput, CategoriaUncheckedUpdateWithoutOrcamentosInput>
  }

  export type CategoriaUpdateWithoutOrcamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoCategoriaFieldUpdateOperationsInput | $Enums.TipoCategoria
    ehPadrao?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneWithoutCategoriasNestedInput
    lancamentos?: LancamentoUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaUncheckedUpdateWithoutOrcamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoCategoriaFieldUpdateOperationsInput | $Enums.TipoCategoria
    ehPadrao?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUncheckedUpdateManyWithoutCategoriaNestedInput
  }

  export type UsuarioCreateWithoutAnalyticJobsInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaCreateNestedManyWithoutUsuarioInput
    lancamentos?: LancamentoCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoCreateNestedManyWithoutUsuarioInput
    contas?: ContaCreateNestedManyWithoutUsuarioInput
    insights?: InsightCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutAnalyticJobsInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaUncheckedCreateNestedManyWithoutUsuarioInput
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoUncheckedCreateNestedManyWithoutUsuarioInput
    contas?: ContaUncheckedCreateNestedManyWithoutUsuarioInput
    insights?: InsightUncheckedCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertUncheckedCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutAnalyticJobsInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutAnalyticJobsInput, UsuarioUncheckedCreateWithoutAnalyticJobsInput>
  }

  export type UsuarioUpsertWithoutAnalyticJobsInput = {
    update: XOR<UsuarioUpdateWithoutAnalyticJobsInput, UsuarioUncheckedUpdateWithoutAnalyticJobsInput>
    create: XOR<UsuarioCreateWithoutAnalyticJobsInput, UsuarioUncheckedCreateWithoutAnalyticJobsInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutAnalyticJobsInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutAnalyticJobsInput, UsuarioUncheckedUpdateWithoutAnalyticJobsInput>
  }

  export type UsuarioUpdateWithoutAnalyticJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUpdateManyWithoutUsuarioNestedInput
    lancamentos?: LancamentoUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutAnalyticJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUncheckedUpdateManyWithoutUsuarioNestedInput
    lancamentos?: LancamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUncheckedUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUncheckedUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateWithoutInsightsInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaCreateNestedManyWithoutUsuarioInput
    lancamentos?: LancamentoCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoCreateNestedManyWithoutUsuarioInput
    contas?: ContaCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutInsightsInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaUncheckedCreateNestedManyWithoutUsuarioInput
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoUncheckedCreateNestedManyWithoutUsuarioInput
    contas?: ContaUncheckedCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobUncheckedCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertUncheckedCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutInsightsInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutInsightsInput, UsuarioUncheckedCreateWithoutInsightsInput>
  }

  export type UsuarioUpsertWithoutInsightsInput = {
    update: XOR<UsuarioUpdateWithoutInsightsInput, UsuarioUncheckedUpdateWithoutInsightsInput>
    create: XOR<UsuarioCreateWithoutInsightsInput, UsuarioUncheckedCreateWithoutInsightsInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutInsightsInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutInsightsInput, UsuarioUncheckedUpdateWithoutInsightsInput>
  }

  export type UsuarioUpdateWithoutInsightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUpdateManyWithoutUsuarioNestedInput
    lancamentos?: LancamentoUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutInsightsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUncheckedUpdateManyWithoutUsuarioNestedInput
    lancamentos?: LancamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUncheckedUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUncheckedUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateWithoutAlertasInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaCreateNestedManyWithoutUsuarioInput
    lancamentos?: LancamentoCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoCreateNestedManyWithoutUsuarioInput
    contas?: ContaCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobCreateNestedManyWithoutUsuarioInput
    insights?: InsightCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutAlertasInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaUncheckedCreateNestedManyWithoutUsuarioInput
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoUncheckedCreateNestedManyWithoutUsuarioInput
    contas?: ContaUncheckedCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobUncheckedCreateNestedManyWithoutUsuarioInput
    insights?: InsightUncheckedCreateNestedManyWithoutUsuarioInput
    notificacoes?: NotificationUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutAlertasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutAlertasInput, UsuarioUncheckedCreateWithoutAlertasInput>
  }

  export type UsuarioUpsertWithoutAlertasInput = {
    update: XOR<UsuarioUpdateWithoutAlertasInput, UsuarioUncheckedUpdateWithoutAlertasInput>
    create: XOR<UsuarioCreateWithoutAlertasInput, UsuarioUncheckedCreateWithoutAlertasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutAlertasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutAlertasInput, UsuarioUncheckedUpdateWithoutAlertasInput>
  }

  export type UsuarioUpdateWithoutAlertasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUpdateManyWithoutUsuarioNestedInput
    lancamentos?: LancamentoUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutAlertasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUncheckedUpdateManyWithoutUsuarioNestedInput
    lancamentos?: LancamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUncheckedUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUncheckedUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUncheckedUpdateManyWithoutUsuarioNestedInput
    notificacoes?: NotificationUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateWithoutNotificacoesInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaCreateNestedManyWithoutUsuarioInput
    lancamentos?: LancamentoCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoCreateNestedManyWithoutUsuarioInput
    contas?: ContaCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobCreateNestedManyWithoutUsuarioInput
    insights?: InsightCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutNotificacoesInput = {
    id?: string
    nome: string
    email: string
    senhaHash: string
    criadoEm?: Date | string
    atualizadoEm?: Date | string
    categorias?: CategoriaUncheckedCreateNestedManyWithoutUsuarioInput
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutUsuarioInput
    orcamentos?: OrcamentoUncheckedCreateNestedManyWithoutUsuarioInput
    contas?: ContaUncheckedCreateNestedManyWithoutUsuarioInput
    analyticJobs?: AnalyticJobUncheckedCreateNestedManyWithoutUsuarioInput
    insights?: InsightUncheckedCreateNestedManyWithoutUsuarioInput
    alertas?: FinancialAlertUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutNotificacoesInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutNotificacoesInput, UsuarioUncheckedCreateWithoutNotificacoesInput>
  }

  export type UsuarioUpsertWithoutNotificacoesInput = {
    update: XOR<UsuarioUpdateWithoutNotificacoesInput, UsuarioUncheckedUpdateWithoutNotificacoesInput>
    create: XOR<UsuarioCreateWithoutNotificacoesInput, UsuarioUncheckedCreateWithoutNotificacoesInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutNotificacoesInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutNotificacoesInput, UsuarioUncheckedUpdateWithoutNotificacoesInput>
  }

  export type UsuarioUpdateWithoutNotificacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUpdateManyWithoutUsuarioNestedInput
    lancamentos?: LancamentoUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutNotificacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senhaHash?: StringFieldUpdateOperationsInput | string
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categorias?: CategoriaUncheckedUpdateManyWithoutUsuarioNestedInput
    lancamentos?: LancamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    orcamentos?: OrcamentoUncheckedUpdateManyWithoutUsuarioNestedInput
    contas?: ContaUncheckedUpdateManyWithoutUsuarioNestedInput
    analyticJobs?: AnalyticJobUncheckedUpdateManyWithoutUsuarioNestedInput
    insights?: InsightUncheckedUpdateManyWithoutUsuarioNestedInput
    alertas?: FinancialAlertUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type CategoriaCreateManyUsuarioInput = {
    id?: string
    nome: string
    tipo: $Enums.TipoCategoria
    ehPadrao?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type LancamentoCreateManyUsuarioInput = {
    id?: string
    idCategoria: string
    idConta?: string | null
    valor: Decimal | DecimalJsLike | number | string
    dataTransacao: Date | string
    recorrencia?: $Enums.TipoRecorrencia
    tipo: $Enums.TipoLancamento
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type OrcamentoCreateManyUsuarioInput = {
    id?: string
    idCategoria?: string | null
    valor: Decimal | DecimalJsLike | number | string
    mes: number
    ano: number
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type ContaCreateManyUsuarioInput = {
    id?: string
    nome: string
    tipo: $Enums.TipoContaBancaria
    saldoInicial: Decimal | DecimalJsLike | number | string
    modeloCartao?: $Enums.ModeloCartao
    descricao?: string | null
    ativa?: boolean
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type AnalyticJobCreateManyUsuarioInput = {
    id?: string
    tipo: string
    status: string
    payload: JsonNullValueInput | InputJsonValue
    resultado?: NullableJsonNullValueInput | InputJsonValue
    erro?: string | null
    criadoEm?: Date | string
    iniciadoEm?: Date | string | null
    finalizadoEm?: Date | string | null
  }

  export type InsightCreateManyUsuarioInput = {
    id?: string
    tipo: string
    titulo: string
    descricao: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: Date | string
  }

  export type FinancialAlertCreateManyUsuarioInput = {
    id?: string
    tipo: string
    severidade: string
    titulo: string
    mensagem: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    lidoEm?: Date | string | null
    criadoEm?: Date | string
  }

  export type NotificationCreateManyUsuarioInput = {
    id?: string
    tipo: string
    titulo: string
    mensagem: string
    canal: string
    status: string
    dados?: NullableJsonNullValueInput | InputJsonValue
    enviadaEm?: Date | string | null
    lidaEm?: Date | string | null
    erro?: string | null
    criadoEm?: Date | string
  }

  export type CategoriaUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoCategoriaFieldUpdateOperationsInput | $Enums.TipoCategoria
    ehPadrao?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUpdateManyWithoutCategoriaNestedInput
    orcamentos?: OrcamentoUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoCategoriaFieldUpdateOperationsInput | $Enums.TipoCategoria
    ehPadrao?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUncheckedUpdateManyWithoutCategoriaNestedInput
    orcamentos?: OrcamentoUncheckedUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaUncheckedUpdateManyWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoCategoriaFieldUpdateOperationsInput | $Enums.TipoCategoria
    ehPadrao?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LancamentoUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFieldUpdateOperationsInput | Date | string
    recorrencia?: EnumTipoRecorrenciaFieldUpdateOperationsInput | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFieldUpdateOperationsInput | $Enums.TipoLancamento
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: CategoriaUpdateOneRequiredWithoutLancamentosNestedInput
    conta?: ContaUpdateOneWithoutLancamentosNestedInput
  }

  export type LancamentoUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCategoria?: StringFieldUpdateOperationsInput | string
    idConta?: NullableStringFieldUpdateOperationsInput | string | null
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFieldUpdateOperationsInput | Date | string
    recorrencia?: EnumTipoRecorrenciaFieldUpdateOperationsInput | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFieldUpdateOperationsInput | $Enums.TipoLancamento
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LancamentoUncheckedUpdateManyWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCategoria?: StringFieldUpdateOperationsInput | string
    idConta?: NullableStringFieldUpdateOperationsInput | string | null
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFieldUpdateOperationsInput | Date | string
    recorrencia?: EnumTipoRecorrenciaFieldUpdateOperationsInput | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFieldUpdateOperationsInput | $Enums.TipoLancamento
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrcamentoUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    mes?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: CategoriaUpdateOneWithoutOrcamentosNestedInput
  }

  export type OrcamentoUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCategoria?: NullableStringFieldUpdateOperationsInput | string | null
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    mes?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrcamentoUncheckedUpdateManyWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    idCategoria?: NullableStringFieldUpdateOperationsInput | string | null
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    mes?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContaUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoContaBancariaFieldUpdateOperationsInput | $Enums.TipoContaBancaria
    saldoInicial?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    modeloCartao?: EnumModeloCartaoFieldUpdateOperationsInput | $Enums.ModeloCartao
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUpdateManyWithoutContaNestedInput
  }

  export type ContaUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoContaBancariaFieldUpdateOperationsInput | $Enums.TipoContaBancaria
    saldoInicial?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    modeloCartao?: EnumModeloCartaoFieldUpdateOperationsInput | $Enums.ModeloCartao
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUncheckedUpdateManyWithoutContaNestedInput
  }

  export type ContaUncheckedUpdateManyWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoContaBancariaFieldUpdateOperationsInput | $Enums.TipoContaBancaria
    saldoInicial?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    modeloCartao?: EnumModeloCartaoFieldUpdateOperationsInput | $Enums.ModeloCartao
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    ativa?: BoolFieldUpdateOperationsInput | boolean
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticJobUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    resultado?: NullableJsonNullValueInput | InputJsonValue
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    iniciadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalizadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnalyticJobUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    resultado?: NullableJsonNullValueInput | InputJsonValue
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    iniciadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalizadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnalyticJobUncheckedUpdateManyWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    resultado?: NullableJsonNullValueInput | InputJsonValue
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    iniciadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finalizadoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InsightUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsightUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsightUncheckedUpdateManyWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinancialAlertUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    severidade?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    lidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinancialAlertUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    severidade?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    lidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FinancialAlertUncheckedUpdateManyWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    severidade?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    lidoEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    canal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    enviadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    canal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    enviadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    mensagem?: StringFieldUpdateOperationsInput | string
    canal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    dados?: NullableJsonNullValueInput | InputJsonValue
    enviadaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lidaEm?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    erro?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LancamentoCreateManyCategoriaInput = {
    id?: string
    idUsuario: string
    idConta?: string | null
    valor: Decimal | DecimalJsLike | number | string
    dataTransacao: Date | string
    recorrencia?: $Enums.TipoRecorrencia
    tipo: $Enums.TipoLancamento
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type OrcamentoCreateManyCategoriaInput = {
    id?: string
    idUsuario: string
    valor: Decimal | DecimalJsLike | number | string
    mes: number
    ano: number
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type LancamentoUpdateWithoutCategoriaInput = {
    id?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFieldUpdateOperationsInput | Date | string
    recorrencia?: EnumTipoRecorrenciaFieldUpdateOperationsInput | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFieldUpdateOperationsInput | $Enums.TipoLancamento
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutLancamentosNestedInput
    conta?: ContaUpdateOneWithoutLancamentosNestedInput
  }

  export type LancamentoUncheckedUpdateWithoutCategoriaInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    idConta?: NullableStringFieldUpdateOperationsInput | string | null
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFieldUpdateOperationsInput | Date | string
    recorrencia?: EnumTipoRecorrenciaFieldUpdateOperationsInput | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFieldUpdateOperationsInput | $Enums.TipoLancamento
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LancamentoUncheckedUpdateManyWithoutCategoriaInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    idConta?: NullableStringFieldUpdateOperationsInput | string | null
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFieldUpdateOperationsInput | Date | string
    recorrencia?: EnumTipoRecorrenciaFieldUpdateOperationsInput | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFieldUpdateOperationsInput | $Enums.TipoLancamento
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrcamentoUpdateWithoutCategoriaInput = {
    id?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    mes?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutOrcamentosNestedInput
  }

  export type OrcamentoUncheckedUpdateWithoutCategoriaInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    mes?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrcamentoUncheckedUpdateManyWithoutCategoriaInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    mes?: IntFieldUpdateOperationsInput | number
    ano?: IntFieldUpdateOperationsInput | number
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LancamentoCreateManyContaInput = {
    id?: string
    idUsuario: string
    idCategoria: string
    valor: Decimal | DecimalJsLike | number | string
    dataTransacao: Date | string
    recorrencia?: $Enums.TipoRecorrencia
    tipo: $Enums.TipoLancamento
    descricao?: string | null
    criadoEm?: Date | string
    atualizadoEm?: Date | string
  }

  export type LancamentoUpdateWithoutContaInput = {
    id?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFieldUpdateOperationsInput | Date | string
    recorrencia?: EnumTipoRecorrenciaFieldUpdateOperationsInput | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFieldUpdateOperationsInput | $Enums.TipoLancamento
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutLancamentosNestedInput
    categoria?: CategoriaUpdateOneRequiredWithoutLancamentosNestedInput
  }

  export type LancamentoUncheckedUpdateWithoutContaInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    idCategoria?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFieldUpdateOperationsInput | Date | string
    recorrencia?: EnumTipoRecorrenciaFieldUpdateOperationsInput | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFieldUpdateOperationsInput | $Enums.TipoLancamento
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LancamentoUncheckedUpdateManyWithoutContaInput = {
    id?: StringFieldUpdateOperationsInput | string
    idUsuario?: StringFieldUpdateOperationsInput | string
    idCategoria?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dataTransacao?: DateTimeFieldUpdateOperationsInput | Date | string
    recorrencia?: EnumTipoRecorrenciaFieldUpdateOperationsInput | $Enums.TipoRecorrencia
    tipo?: EnumTipoLancamentoFieldUpdateOperationsInput | $Enums.TipoLancamento
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    criadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
    atualizadoEm?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}