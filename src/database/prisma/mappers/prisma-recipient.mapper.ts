import { $Enums, Recipient as PrismaRecipient } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { Recipient, RecipientStatus } from 'src/entities/recipient.entity';

export class PrismaRecipientMapper {
  static toPrisma(raw: Recipient): PrismaRecipient {
    return {
      id: raw.id.toString(),
      email: raw.email,
      name: raw.name,
      status: $Enums[raw.status],
    };
  }

  static toDomain(raw: PrismaRecipient): Recipient {
    return Recipient.create(
      {
        email: raw.email,
        name: raw.name,
        status: RecipientStatus[raw.status],
      },
      new UniqueEntityID(raw.id),
    );
  }
}
