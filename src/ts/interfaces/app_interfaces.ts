interface PersonAttributes {
  id: string;
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: string;
}

interface ConversationAttributes {
  id: string;
  name?: string;
  avatar?: string;
  members: Array<{ id: string; type: string }>;
  messages: Array<{
    sender: {
      id: string;
      type: string;
    };
    content: String;
    createdAt?: Date;
    updatedAt?: Date;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

export { PersonAttributes, ConversationAttributes };
