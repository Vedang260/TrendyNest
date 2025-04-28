import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Addresses } from "../entities/address.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAddressDto } from "../dtos/createAddress.dto";
import { UpdateAddressDto } from "../dtos/updateAddress.dto";

@Injectable()
export class AddressesRepository{
    constructor(
        @InjectRepository(Addresses)
        private readonly addressRepository: Repository<Addresses>,
    ) {}

    // add new address
    async addNewAddress(createAddressDto: CreateAddressDto): Promise<Addresses | null>{
        try{
            const newAddress = this.addressRepository.create(createAddressDto);
            return this.addressRepository.save(newAddress);
        }catch(error){
            console.error('Error in creating a new Address: ', error.message);
            throw new InternalServerErrorException('Error in creating new address');
        }
    }

    // Check if address exists
    async checkAddressExists(createAddressDto: CreateAddressDto): Promise<Addresses | null> {
        try {
            const existingAddress = await this.addressRepository.findOne({
                where: {
                    street: createAddressDto.street,
                    city: createAddressDto.city,
                    state: createAddressDto.state,
                    pincode: createAddressDto.pincode,
                },
            });

            return existingAddress; // Returns Address object if found, otherwise null
        } catch (error) {
            console.error('Error in checking if Address exists: ', error.message);
            throw new InternalServerErrorException('Error in checking address existence');
        }
    }

    async updateAddress(addressId: string, updateAddressDto: UpdateAddressDto): Promise<boolean>{
        try{
            const result = await this.addressRepository.update({ addressId}, updateAddressDto);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in updating Address: ', error.message);
            throw new InternalServerErrorException('Error in updating Address');
        }
    }

}