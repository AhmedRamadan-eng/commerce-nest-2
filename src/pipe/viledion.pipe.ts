    
// import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
// import { error } from 'console';
// import { issue } from 'node_modules/zod/v4/core/util.cjs';
// import { ZodType } from 'zod';


// @Injectable()
// export class customValidationPipe implements PipeTransform<any> {
//   // constructor(private schema: ZodType) {}

//    async transform(value: any, {metatype}: ArgumentMetadata) {
//     console.log(value);

//     // const [firstname, lastname] = value.name.split(" ");

//     // if (!firstname || !lastname) {
//     //   throw new BadRequestException("Invalid name format");
//     // }

//     // value.firstname = firstname;
//     // value.lastname = lastname;

//     // const result = this.schema.safeParse(value);

//     // if (!result.success) {
//     //   const errors = result.error.issues.map((issue) => ({
//     //     field: issue.path.join("."),
//     //     message: issue.message,
//     //   }));

//     //   throw new BadRequestException({
//     //     message: "validation Error",
//     //     errors,
//     //   });
//     // }

//     // return result.data;






//   }
// }

import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class customValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
