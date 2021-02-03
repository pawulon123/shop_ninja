import {  IsAlphanumeric, Matches } from 'class-validator';
export class paramsValid{

        @IsAlphanumeric()
    pattern: string;
}