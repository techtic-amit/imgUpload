
import { IsNotEmpty } from 'class-validator';

export class ForgotPasswordDTO {

    /**
    * Email parameter
    */
    @IsNotEmpty({
        message: "The email should not be empty"
    })

    email: string;

    type: string;
}
