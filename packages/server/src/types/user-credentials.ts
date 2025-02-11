export interface SignUpCredentials extends ReadableStream<Uint8Array> {
    username: string;
    email: string;
    password: string;
    cpassword: string
}

export interface SignInCredentials extends ReadableStream<Uint8Array> {
    identifier: string;
    password: string;
}