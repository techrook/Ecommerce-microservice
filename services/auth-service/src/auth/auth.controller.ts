import { Controller, Post, Body, Req, Res, Get, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/DTOs/register.dto';
import { LoginDto } from 'src/DTOs/login.dto';
import { AuthGuard } from './guards/session-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto, @Req() req: Request, @Res() res: Response) {
    const user = await this.auth.register(dto.email, dto.password);
    (req.session as any).userId = (user as any).id;
    (req.session as any).role = (user as any).role;
    return res.status(201).json(user);
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req: Request, @Res() res: Response) {
    const user = await this.auth.login(dto.email, dto.password);
    (req.session as any).userId = (user as any).id;
    (req.session as any).role = (user as any).role;
    return res.json(user);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        // clear cookie on response
        res.clearCookie('connect.sid', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });
        if (err) {
          res.status(500).json({ ok: false });
          return resolve(null);
        }
        res.json({ ok: true });
        resolve(null);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    const session = req.session as any;
    // return minimal info — or fetch from DB if needed
    return { userId: session.userId, role: session.role };
  }
}

