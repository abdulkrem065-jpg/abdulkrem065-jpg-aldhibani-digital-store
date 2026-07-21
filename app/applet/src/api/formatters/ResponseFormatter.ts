export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
    meta: {
        timestamp: string;
        version: string;
    };
}

export class ResponseFormatter {
    public static success<T>(data: T, version: string = '1.0'): ApiResponse<T> {
        return {
            success: true,
            data,
            meta: {
                timestamp: new Date().toISOString(),
                version
            }
        };
    }

    public static error(message: string, code: string = 'INTERNAL_ERROR', details?: any, version: string = '1.0'): ApiResponse<null> {
        return {
            success: false,
            error: {
                code,
                message,
                details
            },
            meta: {
                timestamp: new Date().toISOString(),
                version
            }
        };
    }
}
