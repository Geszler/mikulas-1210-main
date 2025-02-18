import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { KidsService } from './kids.service';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { ApiBadRequestResponse, ApiResponse, ApiParam, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Kid } from './entities/kid.entity';

@ApiTags('kids')
@Controller('kids')
export class KidsController {
  constructor(private readonly kidsService: KidsService) {}

  /**
   * Adds a new kid to the database
   * 
   * @param createKidDto The data of the new kid
   * @returns The created kid data, including generated fields
   */
  @Post()
  @ApiOperation({ summary: 'Create a new kid' })
  create(@Body() createKidDto: CreateKidDto): Promise<Kid> {
    return this.kidsService.create(createKidDto);
  }

  /**
   * Retrieves all kids from the database
   * 
   * @returns An array of all kids
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all kids' })
  findAll(): Promise<Kid[]> {
    return this.kidsService.findAll();
  }

  /**
   * Retrieves a kid by their ID
   * 
   * @param id The ID of the kid
   * @returns The data of the specified kid
   */
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a kid by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the kid', type: 'number' })
  async findOne(@Param('id') id: string): Promise<Kid> {
    const kid = await this.kidsService.findOne(+id);
    if (!kid) {
      throw new NotFoundException('Kid not found');
    }
    return kid;
  }

  /**
   * Updates a kid's data by their ID
   * 
   * @param id The ID of the kid
   * @param updateKidDto The new data for the kid
   * @returns The updated kid data
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a kid by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the kid', type: 'number' })
  update(
    @Param('id') id: string,
    @Body() updateKidDto: UpdateKidDto,
  ): Promise<Kid> {
    return this.kidsService.update(+id, updateKidDto);
  }

  /**
   * Deletes a kid by their ID
   * 
   * @param id The ID of the kid
   * @returns A confirmation message
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a kid by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the kid', type: 'number' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.kidsService.remove(+id); 
  }
}
