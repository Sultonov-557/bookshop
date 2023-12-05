import { IsNumber } from 'class-validator';

export class CreateSavedDto {
  @IsNumber()
  userID: number;
  @IsNumber()
  bookID: number;
}
