import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from 'src/db/models/category.model';
import { Model } from 'mongoose';


@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
private readonly categoryModel: Model<CategoryDocument>
  ) {}

  async create(dto: CreateCategoryDto, logoUrl: string, adminId: string)
  {
    const categoryExists = await this.categoryModel.findOne({
      name: dto.name,
    });

    if (categoryExists) throw new ConflictException("Category Already Exists");

    const newCategory = new this.categoryModel({
      ...dto,
      logo: logoUrl,
  createdBy: adminId
    });
    return newCategory.save();
  }


  async update(dto: UpdateCategoryDto, logoUrl: string|undefined, id: string)
  {
   
  const updateedpaylaod={...dto};
  if(logoUrl)updateedpaylaod.logo=logoUrl;

const ubdated=await this.categoryModel.findByIdAndUpdate(
  id,
  updateedpaylaod,
  {new:true}
)

if(!ubdated)
throw new NotFoundException("category doc  not fond")
return ubdated

  }

async findAll(){
return this.categoryModel.find().populate("createdBy")}


async findById(id: string) {
  const category = await this.categoryModel
    .findById(id)
 .populate("createdBy");

  if (!category) throw new NotFoundException("Category not found");

  return category;
}



}
