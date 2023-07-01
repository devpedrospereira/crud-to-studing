/* eslint-disable prettier/prettier */
import { IsInt, IsString, Length, MaxLength, Min } from 'class-validator';

export class PersonSchema {
  @IsString()
  @MaxLength(150)
  name: string;

  @IsInt()
  @Min(1)
  age: number;
  
  @IsString()
  @Length(11)
  document: string;
}
