import { FormControl, FormGroup } from '@angular/forms';

export class PasswordValidator {
    static areEqual(myForm: FormGroup) {
        let val;
        let valid = true;

        for (const key in myForm.controls) {
            if (myForm.controls.hasOwnProperty(key)) {
                console.log(key);
                const control: FormControl = <FormControl>myForm.controls[key];
                if (val === undefined) {
                    val = control.value;
                } else {
                    if (val !== control.value) {
                        valid = false;
                        break;
                    }
                }
            }
        }
        if (valid) {
            return null;
        }
        return {
            areEqual: true
        };
    }
}
