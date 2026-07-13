import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { string } from 'zod';



@Schema({
  timestamps: true,
})
export class Product {
  @Prop({
     type:String,
    required: true,
    unique:true,
    trim: true,
  })
  name: string;

    @Prop({
  type:string,
  })
  overview: string;
 @Prop([{
    required: true,
 
    type:String}]
  )
images!:string[]

  @Prop({
     type:Number,
    required: true,
   
  })
  stocke: Number;




@Prop({
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: "Category", 
})
Categories!:string[]

@Prop({
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: "Brand", 
})
Brand!:string[]


@Prop({
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: "Admin", 
})
createdBy!: string; 

}

export const ProductSchema = SchemaFactory.createForClass(Product);
export const BrandModel=MongooseModule.forFeature([
    {name:Product.name,schema:ProductSchema}
])