import { SetMetadata } from '@nestjs/common';

export const Roles = (...Role: string[]) => SetMetadata('role', Role)
