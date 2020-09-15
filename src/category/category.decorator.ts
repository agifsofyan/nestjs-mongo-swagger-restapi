import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DCategory = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const topic = request.topic;

    return data ? topic && topic[data] : topic;
  },
);