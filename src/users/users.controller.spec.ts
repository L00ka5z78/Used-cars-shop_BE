import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth';
import { User } from './entities';

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
      // signin: () => {}
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
});
