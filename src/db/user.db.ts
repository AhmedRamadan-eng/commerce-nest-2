import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { retry } from 'rxjs';
import { defaultEnums, GenderEnums, ProviderEnums } from 'src/common/enums/enums.service';
import { HydratedDocument, model } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop()
  phone: string;

  @Prop()
  age: number;

  @Prop()
  address?: string;

  @Prop()
  DOB?: Date;

  @Prop({
    enum: Object.values(GenderEnums),
    required: true,
  })
  gender: GenderEnums;

  @Prop({
    enum: Object.values(ProviderEnums),
    default: ProviderEnums.System,
  })
  provider: ProviderEnums;

rEnums;

  @Prop({
    enum: Object.values(defaultEnums),
    default:defaultEnums.Admin,
  })
  default: defaultEnums;




}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserSchema.pre('save', function () {
  this.password = bcrypt.hashSync(
    this.password,
    Number(process.env.SALT),
  );
});



export const userModel = model('user',UserSchema);