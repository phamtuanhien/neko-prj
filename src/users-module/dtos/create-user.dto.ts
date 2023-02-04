export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  avatarUrl?: string;
}

export default CreateUserDto;
