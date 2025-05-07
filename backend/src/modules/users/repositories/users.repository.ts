import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UserRole } from 'src/common/enums/roles.enums';
import { Roles } from 'src/common/decorators/roles.decorator';

@Injectable()
export class UsersRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}        

    // finds the user by email
    async findUserByEmail(email: string): Promise<User | null> {
        try{
            return this.userRepository.findOne({ where: { email } });
        }catch(error){
            console.error('Error in finding user by email: ', error.message);
            throw new InternalServerErrorException('Error in finding user by email');
        }
    }

    // creates new user 
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try{
            const user = this.userRepository.create(createUserDto);
            return this.userRepository.save(user);
        }catch(error){
            console.error('Error in creating new user ', error.message);
            throw new InternalServerErrorException('Error in creating new user');
        }
    }

    // deletes a user
    async deleteUser(id: string): Promise<boolean> {
        try{
            const result = await this.userRepository.delete(id);
            return result.affected ? result.affected > 0 : false;
        }catch(error){
            console.error('Error in deleting a user ', error.message);
            throw new InternalServerErrorException('Error in deleting a user');
        }
    }

    // get all users
    async findAll(): Promise<User[]> {
      try{
        return this.userRepository.find({
            select: ['id', 'username', 'email', 'role'], // only desired fields
            where: {
                role: Not(UserRole.ADMIN) // exclude admins
            }
        });
      }
      catch(error){
        throw error;
      }
    }
    
    // finds a particular User based on user_id
    async findOne(id: string): Promise<User | null> {
      return this.userRepository.findOne({ where: { id } });
    }

    // find all the customers & DOB=today
    async findCustomersDOB() {
        try{
            const today = new Date();
            const todayMonth = today.getMonth(); // 0-based
            const todayDate = today.getDate();
            return await this.userRepository
            .createQueryBuilder('user')
            .select(['user.id', 'user.email'])
            .where('MONTH(user.dob) = :month', { todayMonth })
            .andWhere('DAY(user.dob) = :day', { todayDate})
            .getMany();
        }catch(error){
            console.error('Error in finding the customers whose birthday is today: ', error.message);
            throw new InternalServerErrorException('Error in finding the customers with the dob');
        }
    }
}