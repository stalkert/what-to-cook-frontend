export type Direction = 'ASC' | 'DESC';

export interface UserBrief {
  id: number;
  username: string;
  name: string;
  sex: string;
  age: number;
  city: string;
}

export interface ListQueryParams {
  page: number;
  size: number;
  field?: string;
  direction?: Direction;
}

export interface List<DataType> {
  content: DataType[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface UserList {
  token: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  sex: string;
  targetSex: string;
  age: number;
  minAge: number;
  maxAge: number;
  city: string;
  description: string;
  purposeOfDating: string;
  communicationForm: string;
  isActive: boolean;
  lastKnownChatId: number;
  language: {
    id: number;
    code: string;
    name: string;
    emoji: string;
    fullName: string;
  };
  photos: [
    {
      fileId: string;
      fileUniqueId: string;
      width: string;
      height: string;
      fileSize: string;
      filePath: string;
      photoLob: string;
    },
  ];
}
