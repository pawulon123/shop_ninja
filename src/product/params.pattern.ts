import {  IsAlphanumeric, Matches } from 'class-validator';
export class ParamsPattern{

        @IsAlphanumeric()
    pattern: string;
}