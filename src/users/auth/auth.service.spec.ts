import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users.service';
import { User } from '../entities';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AUTH service', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      findUserByEmail: () => Promise.resolve([]),
      createUser: (email: string, password: string) =>
        Promise.resolve({
          id: 1,
          email,
          password,
        } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    //create fake copy of users service

    expect(service).toBeDefined();
  });

  it('creates new user with hashed and salted password', async () => {
    const user = await service.signup('testing@purposes.email', 'testing');

    expect(user.password).not.toEqual('testing');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.findUserByEmail = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    await expect(
      service.signup('testing@purposes.email', 'testing'),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws error if signin is called with an unused email', async () => {
    await expect(
      service.signin('unused@email.com', 'unusedpassword'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws error if an invalid password is provided', async () => {
    fakeUsersService.findUserByEmail = () =>
      Promise.resolve([
        { email: 'asdf@asdf.com', password: 'laskdjf' } as User,
      ]);
    await expect(
      service.signin('laskdjf@alskdfj.com', 'passowrd'),
    ).rejects.toThrow(BadRequestException);
  });
});
