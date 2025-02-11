import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateKidDto {
 /**
   * The URL of the new kid
   * 
   * @example John Lee
   */
  @IsString()
  @IsNotEmpty()
  name: string

   /**
   * The address of the kid
   * 
   * @example 1201 Busapest Vörösmarty u 12
   */

  @IsString()
  @IsNotEmpty()
  address: string

   /**
   * Was kid good or bad
   * 
   * @example Yes
   */

  @IsBoolean()
  @IsNotEmpty()
  wasGood: boolean

   /**
   * The toy the kid wants
   * 
   * @example Mobilephone
   */

  @IsString()
  @IsOptional()
  wantedToy?: string
}
