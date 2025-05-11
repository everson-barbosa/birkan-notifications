import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export enum RecipientStatus {
  CREATED = 'CREATED',
  ACTIVED = 'ACTIVED',
  INACTIVED = 'INACTIVED',
}

interface RecipientProps {
  readonly email: string;
  readonly name: string;
  readonly status: RecipientStatus;
}

export class Recipient extends Entity<RecipientProps> {
  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
  }

  get status() {
    return this.props.status;
  }

  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient(
      {
        ...props,
      },
      id,
    );

    return recipient;
  }
}
