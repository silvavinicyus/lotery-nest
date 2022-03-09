import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { UserModel } from 'src/users/user.model';
import { UserService } from 'src/users/users.service';

@Injectable()
export class IsAdmin implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextGql = GqlExecutionContext.create(context);
    const user: UserModel = contextGql.getContext().req.user;
    let isAdmin = false;

    const { authorizations } = user;

    authorizations.forEach((authorization) => {
      if (authorization.permission.type === 'admin') {
        isAdmin = true;
      }
    });

    if (isAdmin) {
      return true;
    }

    throw new ForbiddenException(
      "This user doesn't have this kind of permission",
    );
  }
}
