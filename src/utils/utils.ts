import { BadRequestException } from "@nestjs/common";
import { ValidationError } from "class-validator";

export const fieldExceptionFactory = (errors: ValidationError[]) => { 
    const formattedErrors = errors.map(err => ({ 
        field: err.property, 
        errors: Object.values(err.constraints || {}), 
    })); 
    return new BadRequestException(formattedErrors); 
}