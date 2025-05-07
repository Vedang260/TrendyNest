import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { couponType } from "src/common/enums/couponType.enums";
import { discountType } from "src/common/enums/discountType.enums";

export class CreateCouponDto{
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    discountType: discountType;

    @IsNotEmpty()
    discountValue: number;

    @IsNotEmpty()
    validFrom: Date;

    @IsNotEmpty()
    validTo: Date;

    @IsNotEmpty()
    couponType: couponType;

    @IsOptional()
    minPurchaseAmount?: number;
}