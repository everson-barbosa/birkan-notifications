import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

interface RecipientProps {
  readonly email: string;
  readonly name: string;
}

export class Recipient extends Entity<RecipientProps> {
  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
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
