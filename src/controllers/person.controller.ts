/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PersonEntity } from "src/models/person.entities";
import { PersonSchema } from "src/schemas/person.schemas";
import { Repository } from "typeorm";

@Controller('/person')
export class PersonController {
  constructor(
    @InjectRepository(PersonEntity)private model:Repository<PersonEntity>
    ){}

  @Get()
  public async listAll(): Promise<{data: PersonEntity[]}> {
    const listAll = await this.model.find()
    return { data: listAll };
  }
  @Get(':id')
  public async listById(@Param('id', ParseIntPipe) id: number ): Promise<{data: PersonEntity}> {
    const person = await this.model.findOne({ where: {id}  })
    if (!person) {
      throw new NotFoundException(`Não foi possível dados com o id: ${id}`)
    }
    return { data: person };
  }
  @Post()
  public async create(@Body() body: PersonSchema): Promise<{data: PersonEntity}> {
    const personCreated = await this.model.save(body)
    return { data: personCreated };
  }

  @Put(':id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() body: PersonSchema): Promise<{data: PersonEntity}> {
    const person = await this.model.findOne({ where: {id}  })

    if (!person) {
      throw new NotFoundException(`Não foi possível dados com o id: ${id}`)
    }

    await this.model.update({id},body)

    const personUpdated = await this.model.findOne({ where: {id}  })
    
    return { data: personUpdated };
  }
  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<{data: PersonEntity[]}> {
    const person = await this.model.findOne({ where: {id}})
    
    if (!person) {
      throw new NotFoundException(`Não foi possível dados com o id: ${id}`)
    }

    await this.model.delete(id)
    
    const listAllUpdated = await this.model.find()

    return { data: listAllUpdated };
  }
}
