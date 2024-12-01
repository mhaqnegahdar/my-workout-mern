import { ZodError } from "zod";

export function handleZodError(err: ZodError) {
    // Extract error details from the ZodError issues array
    const emptyFields = err.issues.map((issue) => ({
        field: issue.path.join('.'), // Converts path array to a string for readability
        message: issue.message
    }));

    // Generate a single error response with detailed messages for each invalid field
    return {
        error: 'Validation failed. Please correct the following fields:',
        details: emptyFields
    };
}