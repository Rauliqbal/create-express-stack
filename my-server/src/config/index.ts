interface Config {
    nodeEnv : string
    port : number
}

export const config: Config = {
    nodeEnv : process.env.NODE_ENV || 'development',
    port : Number(process.env.PORT) || 3000,

}
