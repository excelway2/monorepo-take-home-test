import { Injectable } from '@nestjs/common';
import {PrismaClient} from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super(
      {
        datasources: {
          db: {
            url: "postgresql://supercandidate:ultrasecretpassword@localhost:5438/takehometestDB?schema=public",
          },
        },
      }
    );
  }
}
