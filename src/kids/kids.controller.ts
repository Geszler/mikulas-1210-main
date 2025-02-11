import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { KidsService } from './kids.service';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { ApiBadRequestResponse, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Kid } from './entities/kid.entity';

@Controller('kids')
export class KidsController {
  constructor(private readonly kidsService: KidsService) {}

  /**
   * Adds new kid database
   * 
   * @param createVideoDto The data of the new kid
   * @returns All of the data, including the generated fields
   */

  @Post()
  @ApiResponse({
    status:201,
    description: "The kid was created succesfully",
    type:Kid,
    example: {
      id:1,
      name:"Jhon Lee",
      address:'1201 Budapest, Vörösmarty utca 12',
      wasGood: true,
      wantedToy: 'BasketBall'
    }
  })

  @ApiBadRequestResponse({
    description: 'A validation error occured'
  })

  create(@Body() createKidDto: CreateKidDto) {
    return this.kidsService.create(createKidDto);
  }

  @Get()
  findAll() {
    return this.kidsService.findAll();
  }

   /**
   * Returns the data of a given video
   * 
   * @param id The ID of the video
   * @returns 
   */

   @ApiParam({
    name: 'id',
    description: 'The ID of the kid',
    type: 'number'
  })

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const kid = await this.kidsService.findOne(+id);
    if (kid == null) {
      throw new NotFoundException("Nincs ilyen gyerek")
    }
    return kid;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKidDto: UpdateKidDto) {
    return this.kidsService.update(+id, updateKidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kidsService.remove(+id);
  }
}
