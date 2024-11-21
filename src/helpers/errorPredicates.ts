import {log} from "node:util";

export function isErrorWithMessage(error: unknown): error is {data:{errorMessage:string} } {
    return (
        typeof error === 'object' &&
        error != null &&
        'data' in error &&
        typeof error.data === 'object'&&
        (error as any).data != null&&
        'errorMessage' in  (error as any).data &&
        (typeof ((error as any).data as any).errorMessage === 'string')
    )
}
export function getMessageFromError(error: unknown):string{
    console.log(error)
    if(isErrorWithMessage(error)){
        return error.data.errorMessage;
    }
    return ''
}
