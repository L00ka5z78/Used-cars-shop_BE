import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth';
import { User } from './entities';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOneUserById: (id: number) => {
        return Promise.resolve({
          id,
          email: 'test@test.com',
          password: '123abc',
        } as User);
      },
      findUserByEmail: (email: string) => {
        return Promise.resolve([
          { id: 1, email, password: 'randompass' } as User,
        ]);
      },
      // updateUser: (id: number, attrs: Partial<User>) => {
      //   return Promise.resolve([{id: 1, email, password: 'randompass'} as User])

      // },
      removeUser: (id: number) => {
        return Promise.resolve({ id } as User);
      },
    };
    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('listAllusers returns a list of users with given email', async () => {
    const users = await controller.listAllUsers('abc@abc.abc');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('abc@abc.abc');
  });

  it('find user by id returns user with given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findOneUserById throws an error if user with given id is not found', async () => {
    fakeUsersService.findOneUserById = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      { email: 'test@email.com', password: 'abc123' },
      session,
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
